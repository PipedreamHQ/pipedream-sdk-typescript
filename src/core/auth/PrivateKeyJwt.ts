// Client assertions for private_key_jwt client authentication (RFC 7523): an
// OAuth client that registered a public key authenticates at the token
// endpoint with a short-lived JWT signed by the matching private key, instead
// of a client secret. Server-side only: requires Node's crypto module.

import type { KeyObject } from "crypto";

export const CLIENT_ASSERTION_TYPE = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" as const;

// Assertions are single-use and only need to outlive one token request.
const ASSERTION_LIFETIME_SECONDS = 60;

type SigningAlgorithm = "ES256" | "RS256";

interface SigningKey {
    key: KeyObject;
    alg: SigningAlgorithm;
    // The `kid` of a JWK private key, used when no keyId is configured.
    kid?: string;
}

export interface ClientAssertionOptions {
    clientId: string;
    /**
     * The private key: a PEM string (PKCS#8, or PKCS#1 / SEC1) or a JWK as a
     * JSON string. EC P-256 keys sign with ES256, RSA keys with RS256.
     */
    privateKey: string;
    /** Sent as the JWT `kid` header. Defaults to the JWK's `kid`, if any. */
    keyId?: string;
    /** The authorization server's issuer identifier, sent as `aud`. */
    audience: string;
}

/**
 * Returns a function that signs a new client assertion on every call: a JWT
 * with `iss` and `sub` set to the client ID, the given `aud`, a 60-second
 * lifetime, and a random single-use `jti`. The key is parsed (and validated)
 * once, on the first call.
 */
export function createClientAssertionSigner(options: ClientAssertionOptions): () => Promise<string> {
    let signingKey: Promise<SigningKey> | undefined;
    return async () => {
        signingKey ??= loadSigningKey(options.privateKey);
        const { key, alg, kid } = await signingKey;
        const { sign, randomUUID } = await import("crypto");

        const now = Math.floor(Date.now() / 1000);
        const keyId = options.keyId ?? kid;
        const header = { alg, typ: "client-authentication+jwt", ...(keyId ? { kid: keyId } : {}) };
        const claims = {
            iss: options.clientId,
            sub: options.clientId,
            aud: options.audience,
            iat: now,
            exp: now + ASSERTION_LIFETIME_SECONDS,
            jti: randomUUID(),
        };
        const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
        // JWS ES256 signatures are the raw r||s pair (IEEE P1363), not DER.
        const signature = sign("sha256", Buffer.from(signingInput), {
            key,
            ...(alg === "ES256" ? { dsaEncoding: "ieee-p1363" as const } : {}),
        });
        return `${signingInput}.${base64url(signature)}`;
    };
}

async function loadSigningKey(privateKey: string): Promise<SigningKey> {
    const { createPrivateKey } = await import("crypto");
    const text = privateKey.trim();

    let key: KeyObject;
    let kid: string | undefined;
    try {
        if (text.startsWith("{")) {
            const jwk = JSON.parse(text);
            kid = typeof jwk.kid === "string" ? jwk.kid : undefined;
            key = createPrivateKey({ key: jwk, format: "jwk" });
        } else {
            key = createPrivateKey(text);
        }
    } catch {
        throw new Error(
            "privateKey must be a private key in PEM format or a JWK (JSON). If you passed a public key, pass the private key instead.",
        );
    }

    if (key.asymmetricKeyType === "ec" && key.asymmetricKeyDetails?.namedCurve === "prime256v1") {
        return { key, alg: "ES256", kid };
    }
    if (key.asymmetricKeyType === "rsa") {
        return { key, alg: "RS256", kid };
    }
    throw new Error("privateKey must be an EC P-256 key (ES256) or an RSA key (RS256)");
}

function base64url(value: string | Buffer): string {
    return Buffer.from(value).toString("base64url");
}
