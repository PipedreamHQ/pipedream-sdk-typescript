import type { CreateTokenResponse } from "../../api/index.js";
import type { TokenProvider } from "./TokenProvider.js";

export type TokenCallback = (opts: { externalUserId: string }) => Promise<CreateTokenResponse>;

export class ConnectTokenProvider implements TokenProvider {
    private readonly _tokenCallback: TokenCallback;
    private _externalUserId?: string;
    private _token?: string;
    private _tokenExpiresAt?: Date;
    private _tokenRequest?: Promise<string>;

    constructor({ tokenCallback, externalUserId }: { tokenCallback: TokenCallback; externalUserId: string }) {
        if (!externalUserId) {
            throw new Error("The external user ID cannot be blank");
        }

        if (typeof tokenCallback !== "function") {
            throw new Error("The token callback must be a function");
        }

        this._externalUserId = externalUserId;
        this._tokenCallback = tokenCallback;
    }

    get externalUserId(): string | undefined {
        return this._externalUserId;
    }

    public async getToken(): Promise<string> {
        if (this._token && this._tokenExpiresAt && this._tokenExpiresAt > new Date()) {
            return this._token;
        }

        if (this._tokenRequest) {
            return this._tokenRequest;
        }

        const tokenCallback = this._tokenCallback;
        const externalUserId = this._externalUserId;

        if (!tokenCallback) {
            throw new Error("No token callback provided");
        }
        if (!externalUserId) {
            throw new Error("No external user ID provided");
        }

        // Ensure only one token request is in-flight at a time.
        this._tokenRequest = (async () => {
            const { token, expiresAt } = await tokenCallback({
                externalUserId,
            });
            this._token = token;
            this._tokenExpiresAt = expiresAt;
            this._tokenRequest = undefined;
            return token;
        })();

        return this._tokenRequest;
    }

    public refresh() {
        this._token = undefined;
    }
}
