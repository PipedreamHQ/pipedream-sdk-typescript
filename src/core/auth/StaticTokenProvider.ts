import type { TokenProvider } from "./TokenProvider.js";

export class StaticTokenProvider implements TokenProvider {
    private readonly _token: string;

    constructor(token: string) {
        this._token = token;
    }

    public async getToken(): Promise<string> {
        return this._token;
    }
}
