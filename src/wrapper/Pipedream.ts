import { ProjectEnvironment } from "../api/index.js";
import { WorkflowsClient } from "../api/resources/workflows/client/Client.js";
import { PipedreamClient } from "../Client.js";
import type { TokenProvider } from "../core/auth/TokenProvider.js";
import { PipedreamEnvironment } from "../environments.js";

export type PipedreamClientOpts = Pick<
    PipedreamClient.Options,
    "baseUrl" | "clientId" | "clientSecret" | "privateKey" | "keyId" | "headers" | "projectEnvironment"
> & {
    /**
     * The unique identifier for the project. This field is required, passed
     * either explicitly or by setting the `PIPEDREAM_PROJECT_ID` environment
     * variable.
     */
    projectId?: string;

    /**
     * Optional token provider for authentication.
     */
    tokenProvider?: TokenProvider;

    /**
     * Optional custom domain for workflow execution.
     */
    workflowDomain?: string;
};

export class Pipedream extends PipedreamClient {
    private _workflowDomain?: string;
    private _workflows: WorkflowsClient | undefined;

    public constructor(opts: PipedreamClientOpts = {}) {
        const {
            baseUrl = process.env.PIPEDREAM_BASE_URL ?? PipedreamEnvironment.Prod,
            headers,
            projectEnvironment = process.env.PIPEDREAM_PROJECT_ENVIRONMENT,
            projectId = process.env.PIPEDREAM_PROJECT_ID ?? "",
            workflowDomain = process.env.PIPEDREAM_WORKFLOW_DOMAIN,
        } = opts || {};

        if (
            projectEnvironment != null &&
            projectEnvironment !== ProjectEnvironment.Production &&
            projectEnvironment !== ProjectEnvironment.Development
        ) {
            throw new Error(
                `Project environment must be either '${ProjectEnvironment.Production}' or '${ProjectEnvironment.Development}'`,
            );
        }

        const clientOpts: PipedreamClient.Options = {
            baseUrl,
            headers,
            projectEnvironment,
            projectId,
        };

        if ("tokenProvider" in opts) {
            clientOpts.tokenProvider = opts.tokenProvider;
        } else {
            const clientId = opts.clientId ?? process.env.PIPEDREAM_CLIENT_ID;
            if (opts.clientSecret && opts.privateKey) {
                throw new Error("Pass either clientSecret or privateKey, not both");
            }
            // Explicit credentials win over environment variables; otherwise
            // read whichever of the two the environment provides.
            let { clientSecret, privateKey } = opts;
            if (!clientSecret && !privateKey) {
                clientSecret = process.env.PIPEDREAM_CLIENT_SECRET;
                privateKey = process.env.PIPEDREAM_PRIVATE_KEY;
                if (clientSecret && privateKey) {
                    throw new Error(
                        "Both PIPEDREAM_CLIENT_SECRET and PIPEDREAM_PRIVATE_KEY are set; set only the one your client uses",
                    );
                }
            }

            if (!clientId || !(clientSecret || privateKey)) {
                throw new Error(
                    "A client ID and either a client secret or a private key are required and cannot be blank",
                );
            }

            if (!projectId) {
                // Project ID is required here because it cannot be inferred
                // from the client ID/secret, as opposed to the case with access
                // tokens.
                throw new Error("Project ID cannot be blank");
            }

            // Default to production for client ID/secret auth
            clientOpts.projectEnvironment ??= ProjectEnvironment.Production;

            clientOpts.clientId = clientId;
            if (privateKey) {
                clientOpts.privateKey = privateKey;
                clientOpts.keyId = opts.keyId ?? process.env.PIPEDREAM_KEY_ID;
            } else {
                clientOpts.clientSecret = clientSecret;
            }
        }

        super(clientOpts);

        this._workflowDomain = workflowDomain;
    }

    /**
     * Returns an access token that can be used to authenticate API requests
     *
     * @returns A promise that resolves to the access token string.
     */
    public get rawAccessToken(): Promise<string> {
        return this._tokenProvider.getToken();
    }

    public get workflows(): WorkflowsClient {
        return (this._workflows ??= new WorkflowsClient({
            ...this._options,
            token: async () => await this._tokenProvider.getToken(),
            workflowDomain: this._workflowDomain,
        }));
    }
}
