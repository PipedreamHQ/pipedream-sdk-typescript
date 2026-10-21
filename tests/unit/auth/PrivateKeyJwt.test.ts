import { createPublicKey, generateKeyPairSync, type KeyObject, verify } from "crypto";
import { PipedreamClient as BaseClient } from "../../../src/Client";
import { createClientAssertionSigner } from "../../../src/core/auth/PrivateKeyJwt";
import type { TokenProvider } from "../../../src/core/auth/TokenProvider";
import { Pipedream } from "../../../src/wrapper/Pipedream";

const ASSERTION_TYPE = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer";

function ecKeyPem(): string {
    return generateKeyPairSync("ec", { namedCurve: "P-256" }).privateKey.export({
        type: "pkcs8",
        format: "pem",
    }) as string;
}

function decode(jwt: string) {
    const [header, payload, signature] = jwt.split(".");
    return {
        header: JSON.parse(Buffer.from(header, "base64url").toString()),
        claims: JSON.parse(Buffer.from(payload, "base64url").toString()),
        signingInput: `${header}.${payload}`,
        signature: Buffer.from(signature, "base64url"),
    };
}

function verifies(jwt: string, publicKey: KeyObject): boolean {
    const { header, signingInput, signature } = decode(jwt);
    return verify(
        "sha256",
        Buffer.from(signingInput),
        {
            key: publicKey,
            ...(header.alg === "ES256" ? { dsaEncoding: "ieee-p1363" as const } : {}),
        },
        signature,
    );
}

describe("createClientAssertionSigner", () => {
    it("signs an ES256 assertion with the client's claims and a fresh jti each time", async () => {
        // Arrange
        const pem = ecKeyPem();
        const sign = createClientAssertionSigner({
            clientId: "client_123",
            privateKey: pem,
            audience: "https://api.pipedream.com",
        });

        // Act
        const first = await sign();
        const second = await sign();

        // Assert
        const { header, claims } = decode(first);
        expect(header).toEqual({ alg: "ES256", typ: "client-authentication+jwt" });
        expect(claims).toMatchObject({ iss: "client_123", sub: "client_123", aud: "https://api.pipedream.com" });
        expect(claims.exp - claims.iat).toBe(60);
        expect(Math.abs(claims.iat - Date.now() / 1000)).toBeLessThan(5);
        expect(verifies(first, createPublicKey(pem))).toBe(true);
        expect(decode(second).claims.jti).not.toBe(claims.jti);
    });

    it("signs RS256 with an RSA key and sends keyId as kid", async () => {
        // Arrange
        const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
        const sign = createClientAssertionSigner({
            clientId: "c",
            privateKey: privateKey.export({ type: "pkcs1", format: "pem" }) as string,
            keyId: "key-2026",
            audience: "https://api.pipedream.com",
        });

        // Act
        const jwt = await sign();

        // Assert
        expect(decode(jwt).header).toMatchObject({ alg: "RS256", kid: "key-2026" });
        expect(verifies(jwt, publicKey)).toBe(true);
    });

    it("accepts a JWK private key and uses its kid", async () => {
        // Arrange
        const { privateKey, publicKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
        const jwk = { ...privateKey.export({ format: "jwk" }), kid: "jwk-kid" };
        const sign = createClientAssertionSigner({
            clientId: "c",
            privateKey: JSON.stringify(jwk),
            audience: "https://api.pipedream.com",
        });

        // Act
        const jwt = await sign();

        // Assert
        expect(decode(jwt).header.kid).toBe("jwk-kid");
        expect(verifies(jwt, publicKey)).toBe(true);
    });

    it.each([
        [
            "a public key",
            () => generateKeyPairSync("ec", { namedCurve: "P-256" }).publicKey.export({ type: "spki", format: "pem" }),
        ],
        [
            "a P-384 key",
            () =>
                generateKeyPairSync("ec", { namedCurve: "P-384" }).privateKey.export({ type: "pkcs8", format: "pem" }),
        ],
        ["an Ed25519 key", () => generateKeyPairSync("ed25519").privateKey.export({ type: "pkcs8", format: "pem" })],
        ["garbage", () => "not a key"],
    ])("rejects %s", async (_label, key) => {
        // Arrange
        const sign = createClientAssertionSigner({
            clientId: "c",
            privateKey: key() as string,
            audience: "https://api.pipedream.com",
        });

        // Act / Assert
        await expect(sign()).rejects.toThrow(/privateKey must be/);
    });
});

describe("PipedreamClient with privateKey", () => {
    type Call = { url: string; body: Record<string, string> };

    // A fetch stand-in for the token endpoint: answers with the given statuses
    // in order (the last one repeats) and records each request.
    function tokenEndpoint(statuses: number[] = [200]) {
        const calls: Call[] = [];
        const fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
            calls.push({ url: String(input), body: JSON.parse(String(init?.body)) });
            const status = statuses[Math.min(calls.length - 1, statuses.length - 1)];
            const body =
                status === 200
                    ? { access_token: `token-${calls.length}`, token_type: "bearer", expires_in: 3600 }
                    : { error: status === 401 ? "invalid_client" : "temporarily_unavailable" };
            return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
        };
        return { calls, fetch: fetch as typeof globalThis.fetch };
    }

    function tokenProvider(client: BaseClient): TokenProvider {
        return (client as unknown as { _tokenProvider: TokenProvider })._tokenProvider;
    }

    function newClient(fetch: typeof globalThis.fetch, privateKey = ecKeyPem()) {
        return new BaseClient({
            projectId: "proj_123",
            projectEnvironment: "production",
            baseUrl: "https://api.example.com/",
            clientId: "client_123",
            privateKey,
            keyId: "kid-1",
            fetch,
        });
    }

    it("authenticates with a client assertion instead of a secret, and caches the token", async () => {
        // Arrange
        const pem = ecKeyPem();
        const { calls, fetch } = tokenEndpoint();
        const client = newClient(fetch, pem);

        // Act
        const first = await tokenProvider(client).getToken();
        const second = await tokenProvider(client).getToken();

        // Assert
        expect(first).toBe("token-1");
        expect(second).toBe("token-1");
        expect(calls).toHaveLength(1);
        expect(calls[0].url).toBe("https://api.example.com/v1/oauth/token");
        const { client_assertion, ...rest } = calls[0].body;
        expect(rest).toEqual({
            grant_type: "client_credentials",
            client_id: "client_123",
            client_assertion_type: ASSERTION_TYPE,
        });
        const { header, claims } = decode(client_assertion);
        expect(header.kid).toBe("kid-1");
        // The audience is the API's issuer: the base URL's origin.
        expect(claims).toMatchObject({ iss: "client_123", sub: "client_123", aud: "https://api.example.com" });
        expect(verifies(client_assertion, createPublicKey(pem))).toBe(true);
    });

    it("retries a transient failure with a newly signed assertion", async () => {
        // Arrange
        const { calls, fetch } = tokenEndpoint([503, 200]);
        const client = newClient(fetch);

        // Act
        const token = await tokenProvider(client).getToken();

        // Assert
        expect(token).toBe("token-2");
        expect(calls).toHaveLength(2);
        const jtis = calls.map((call) => decode(call.body.client_assertion).claims.jti);
        expect(jtis[0]).not.toBe(jtis[1]);
    });

    it("does not retry a rejected assertion", async () => {
        // Arrange
        const { calls, fetch } = tokenEndpoint([401]);
        const client = newClient(fetch);

        // Act / Assert
        await expect(tokenProvider(client).getToken()).rejects.toThrow();
        expect(calls).toHaveLength(1);
    });

    it("refuses a client secret and a private key together", () => {
        // Act / Assert
        expect(
            () =>
                new BaseClient({
                    projectId: "p",
                    clientId: "c",
                    clientSecret: "s",
                    privateKey: ecKeyPem(),
                }),
        ).toThrow("Pass either clientSecret or privateKey, not both");
    });
});

describe("Pipedream (public client) credential resolution", () => {
    const ENV_KEYS = [
        "PIPEDREAM_CLIENT_ID",
        "PIPEDREAM_CLIENT_SECRET",
        "PIPEDREAM_PRIVATE_KEY",
        "PIPEDREAM_KEY_ID",
        "PIPEDREAM_PROJECT_ID",
    ];
    const saved: Record<string, string | undefined> = {};

    beforeEach(() => {
        for (const key of ENV_KEYS) {
            saved[key] = process.env[key];
            delete process.env[key];
        }
    });

    afterEach(() => {
        for (const key of ENV_KEYS) {
            if (saved[key] === undefined) delete process.env[key];
            else process.env[key] = saved[key];
        }
    });

    it("accepts a private key instead of a client secret", () => {
        // Act / Assert
        expect(() => new Pipedream({ clientId: "c", privateKey: ecKeyPem(), projectId: "p" })).not.toThrow();
    });

    it("reads PIPEDREAM_PRIVATE_KEY from the environment", () => {
        // Arrange
        process.env.PIPEDREAM_CLIENT_ID = "c";
        process.env.PIPEDREAM_PRIVATE_KEY = ecKeyPem();
        process.env.PIPEDREAM_PROJECT_ID = "p";

        // Act / Assert
        expect(() => new Pipedream()).not.toThrow();
    });

    it("refuses both credentials, whether passed or from the environment", () => {
        // Act / Assert
        expect(
            () => new Pipedream({ clientId: "c", clientSecret: "s", privateKey: ecKeyPem(), projectId: "p" }),
        ).toThrow("not both");
        process.env.PIPEDREAM_CLIENT_SECRET = "s";
        process.env.PIPEDREAM_PRIVATE_KEY = ecKeyPem();
        expect(() => new Pipedream({ clientId: "c", projectId: "p" })).toThrow("set only the one your client uses");
    });

    it("lets an explicit credential override the other one in the environment", () => {
        // Arrange
        process.env.PIPEDREAM_CLIENT_SECRET = "from-env";

        // Act / Assert
        expect(() => new Pipedream({ clientId: "c", privateKey: ecKeyPem(), projectId: "p" })).not.toThrow();
    });

    it("still requires some credential", () => {
        // Act / Assert
        expect(() => new Pipedream({ clientId: "c", projectId: "p" })).toThrow(
            "either a client secret or a private key",
        );
    });
});
