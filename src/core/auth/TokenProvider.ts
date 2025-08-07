export interface TokenProvider {
    getToken(): Promise<string>;
}
