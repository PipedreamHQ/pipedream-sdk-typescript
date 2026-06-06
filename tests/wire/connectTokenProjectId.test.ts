import { PipedreamClient } from "../../src/Client";
import { StaticTokenProvider } from "../../src/core/auth/StaticTokenProvider";
import { mockServerPool } from "../mock-server/MockServerPool";

// When authenticating with a Connect token, the caller doesn't pass a project
// ID (the backend derives it from the token), so `projectId` is "". That would
// otherwise produce "/v1/connect//<resource>" URLs; the base client wraps fetch
// to collapse the empty segment back to "/v1/connect/<resource>".
describe("Connect token project ID path normalization", () => {
    const emptyAccountsBody = {
        data: [],
        page_info: { count: 0, total_count: 0, start_cursor: "", end_cursor: "" },
    };

    test("collapses the empty project-ID segment for connect requests", async () => {
        const server = mockServerPool.createServer();

        const client = new PipedreamClient({
            maxRetries: 0,
            projectId: "",
            projectEnvironment: "test",
            environment: server.baseUrl,
            tokenProvider: new StaticTokenProvider("ctok"),
        });

        server
            .mockEndpoint()
            .get("/v1/connect/accounts")
            .respondWith()
            .statusCode(200)
            .jsonBody(emptyAccountsBody)
            .build();

        // If the empty segment weren't collapsed, the request would hit
        // "/v1/connect//accounts", the mock wouldn't match, and this would reject.
        const page = await client.accounts.list({ externalUserId: "external_user_id" });
        expect(page.data).toEqual([]);
    });

    test("passes the normalized URL to a user-supplied fetch", async () => {
        const server = mockServerPool.createServer();

        const calledUrls: string[] = [];
        const spyFetch: typeof fetch = (input, init) => {
            calledUrls.push(typeof input === "string" ? input : input.toString());
            return globalThis.fetch(input, init);
        };

        const client = new PipedreamClient({
            maxRetries: 0,
            projectId: "",
            projectEnvironment: "test",
            environment: server.baseUrl,
            tokenProvider: new StaticTokenProvider("ctok"),
            fetch: spyFetch,
        });

        server
            .mockEndpoint()
            .get("/v1/connect/accounts")
            .respondWith()
            .statusCode(200)
            .jsonBody(emptyAccountsBody)
            .build();

        await client.accounts.list({ externalUserId: "external_user_id" });

        expect(calledUrls.some((url) => url.includes("/v1/connect/accounts"))).toBe(true);
        expect(calledUrls.some((url) => url.includes("/v1/connect//accounts"))).toBe(false);
    });

    test("leaves a non-empty project ID untouched", async () => {
        const server = mockServerPool.createServer();

        const client = new PipedreamClient({
            maxRetries: 0,
            projectId: "p_explicit",
            projectEnvironment: "test",
            environment: server.baseUrl,
            tokenProvider: new StaticTokenProvider("ctok"),
        });

        server
            .mockEndpoint()
            .get("/v1/connect/p_explicit/accounts")
            .respondWith()
            .statusCode(200)
            .jsonBody(emptyAccountsBody)
            .build();

        const page = await client.accounts.list({ externalUserId: "external_user_id" });
        expect(page.data).toEqual([]);
    });
});
