// This code is meant to be run client-side. Never provide project keys to the
// browser client, or make API requests to the Pipedream API to fetch
// credentials. The browser client is meant for initiating browser-specific
// operations, like connecting accounts via Pipedream Connect.

// Browser-specific imports that avoid Node.js dependencies
export type * from "../api/types/index.js";
import { ConnectTokenProvider, TokenCallback } from "../core/auth/index.js";
import { type Account, type App, PipedreamClient as BackendClient, PipedreamEnvironment } from "../index.js";
import { PipedreamClientOpts as BackendClientOpts } from "../wrapper/Pipedream.js";

/**
 * Options for creating a browser-side client. This is used to configure the
 * PipedreamClient instance.
 */
export type PipedreamClientOpts = Omit<BackendClientOpts, "clientId" | "clientSecret" | "tokenProvider"> & {
    /**
     * The frontend host URL. Used by Pipedream employees only. Defaults to
     * "pipedream.com" if not provided.
     */
    frontendHost?: string;

    /**
     * Will be called whenever we need a new token.
     *
     * The callback function should return the response from
     * `serverClient.tokens.create`.
     */
    tokenCallback?: TokenCallback;

    /**
     * An external user ID associated with the token.
     */
    externalUserId?: string;
};

/**
 * The result of a successful connection.
 */
export type ConnectResult = {
    /**
     * The unique identifier of the connected account.
     */
    id: Account["id"];
};

/**
 * The status when the Connect dialog is closed.
 */
export type ConnectStatus = {
    /**
     * Whether the connection was successful (account was connected).
     */
    successful: boolean;

    /**
     * Whether the connection process was completed (vs user closing early).
     */
    completed: boolean;
};

/**
 * Custom error class for handling connection errors.
 */
export class ConnectError extends Error {}

/**
 * Options for starting the connection process.
 */
export type StartConnectOpts = {
    /**
     * The token used for authenticating the connection.
     *
     * Optional if the client was already initialized with a token
     */
    token?: string;

    /**
     * The app to connect to
     */
    app: App["nameSlug"];

    /**
     * The OAuth app ID to connect to.
     */
    oauthAppId?: App["id"];

    /**
     * Callback function to be called upon successful connection.
     *
     * @param res - The result of the connection.
     */
    onSuccess?: (res: ConnectResult) => void;

    /**
     * Callback function to be called if an error occurs during the connection.
     *
     * @param err - The error that occurred during the connection.
     */
    onError?: (err: ConnectError) => void;

    /**
     * Callback function to be called when the Connect iFrame is closed.
     *
     * @param status - The status of the connection when closed.
     */
    onClose?: (status: ConnectStatus) => void;
};

/**
 * Creates a new instance of `PipedreamClient` with the provided options.
 *
 * @example
 * ```typescript
    const client = createFrontendClient({
      tokenCallback,
      externalUserId,
    });
 * ```
 * @param opts - The options for creating the browser client.
 * @returns A new instance of `PipedreamClient`.
 */
export function createFrontendClient(
    opts: PipedreamClientOpts & {
        /**
         * The Connect token used for authenticating the connection. Useful if you
         * don't need to refresh it (e.g. if the client will be used in read-only
         * requests).
         */
        token?: string;
    },
) {
    const {
        // These are some dummy values that would produce a blank Connect token,
        // in case the user does not need to make any API requests other than
        // connecting an external user's account.
        externalUserId = "",
        token = "",
        tokenCallback = () => Promise.resolve({ token, expiresAt: new Date(), connectLinkUrl: "" }),
    } = opts || {};
    return new PipedreamClient({
        ...opts,
        externalUserId,
        tokenCallback,
    });
}

/**
 * A client for interacting with the Pipedream Connect API from the browser.
 */
export class PipedreamClient extends BackendClient {
    private baseURL: string;
    private iframeURL: string;
    private iframe?: HTMLIFrameElement;
    private iframeId = 0;

    /**
     * Constructs a new `PipedreamClient` instance.
     *
     * @param opts - The options for configuring the browser client.
     */
    constructor(opts: PipedreamClientOpts) {
        const {
            environment = PipedreamEnvironment.Prod,
            externalUserId,
            projectEnvironment,
            tokenCallback,
            workflowDomain,
        } = opts || {};

        if (!externalUserId) {
            throw new Error("The external user ID cannot be blank");
        }

        if (typeof tokenCallback !== "function") {
            throw new Error("The token callback must be a function");
        }

        const tokenProvider = new ConnectTokenProvider({
            externalUserId,
            tokenCallback,
        });

        super({
            environment,
            projectEnvironment,
            projectId: "",
            tokenProvider,
            workflowDomain,
        });

        this.baseURL = `https://${opts.frontendHost || "pipedream.com"}`;
        this.iframeURL = `${this.baseURL}/_static/connect.html`;
    }

    /**
     * Initiates the process of connecting an account.
     *
     * @param opts - The options for starting the connection process.
     *
     * @example
     * ```typescript
     * client.connectAccount({
     *   token: "your-token",
     *   app: "your-app-id",
     *   onSuccess: (res) => {
     *     console.log("Connected account ID:", res.id);
     *   },
     *   onError: (err) => {
     *     console.error("Connection error:", err);
     *   },
     *   onClose: (status) => {
     *     if (!status.successful) {
     *       console.log("User closed without connecting");
     *     }
     *   },
     * });
     * ```
     */
    public async connectAccount(opts: StartConnectOpts) {
        let connectionSuccessful = false;
        let connectionCompleted = false;

        const onMessage = (e: MessageEvent) => {
            switch (e.data?.type) {
                case "success":
                    connectionSuccessful = true;
                    connectionCompleted = true;
                    opts.onSuccess?.({
                        id: e.data?.authProvisionId,
                    });
                    break;
                case "error":
                    connectionCompleted = true;
                    opts.onError?.(new ConnectError(e.data.error));
                    break;
                case "close":
                    this.cleanup(onMessage);
                    opts.onClose?.({
                        successful: connectionSuccessful,
                        completed: connectionCompleted,
                    });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("message", onMessage);

        try {
            await this.createIframe(opts);
        } catch (err) {
            opts.onError?.(err as ConnectError);
        }

        // The token expires once it's used to create a connected account. We
        // need to get a new token for the next requests.
        (this._tokenProvider as ConnectTokenProvider).refresh();
    }

    /**
     * Cleans up the iframe and message event listener after the connection
     * process is complete.
     *
     * @param onMessage - The message event handler to remove.
     */
    private cleanup(onMessage: (e: MessageEvent) => void) {
        this.iframe?.remove();
        window.removeEventListener("message", onMessage);
    }

    /**
     * Creates an iframe for the connection process and appends it to the document
     * body.
     *
     * @param opts - The options for starting the connection process.
     *
     * @throws {ConnectError} If the app option is not a string.
     */
    private async createIframe(opts: StartConnectOpts) {
        const token = opts.token || (await this._tokenProvider.getToken());
        const qp = new URLSearchParams({
            token,
        });

        if (typeof opts.app === "string") {
            qp.set("app", opts.app);
        } else {
            throw new ConnectError("Object app not yet supported");
        }

        if (opts.oauthAppId) {
            qp.set("oauthAppId", opts.oauthAppId);
        }

        const iframe = document.createElement("iframe");
        iframe.id = `pipedream-connect-iframe-${this.iframeId++}`;
        iframe.title = "Pipedream Connect";
        iframe.src = `${this.iframeURL}?${qp.toString()}`;
        iframe.style.cssText = "position:fixed;inset:0;z-index:2147483647;border:0;display:block;overflow:hidden auto";
        iframe.width = "100%";
        iframe.height = "100%";

        iframe.onload = () => {
            this.iframe = iframe;
        };

        document.body.appendChild(iframe);
    }
}
