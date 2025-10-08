import type { TokenProvider } from "../core/auth/TokenProvider.js";
import { ProjectEnvironment } from "../api/index.js";
import { Workflows } from "../api/resources/workflows/client/Client.js";
import { PipedreamClient } from "../Client.js";
import { PipedreamEnvironment } from "../environments.js";

export type PipedreamClientOpts = {
    /**
     * Optional client ID for authentication.
     */
    clientId?: string;

    /**
     * Optional client secret for authentication.
     */
    clientSecret?: string;

    /**
     * The Pipedream environment to connect to.
     */
    environment?: PipedreamEnvironment;

    /**
     * The project environment configuration.
     */
    projectEnvironment?: ProjectEnvironment;

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

/**
 * Returns the base URL for the Pipedream API based on the provided environment.
 * It replaces any placeholders in the environment string with corresponding
 * environment variables.
 *
 * @param environment - The Pipedream environment string.
 * @returns The base URL for the Pipedream API.
 */
const getBaseUrl = (environment: PipedreamEnvironment) => {
    const replacements = { DEV_NAMESPACE: process.env.DEV_NAMESPACE};
    environment.replace(/\$\{(\w+)}/g, (_, name: keyof typeof replacements) => replacements[name] ?? "");
}

export class Pipedream extends PipedreamClient {
    private _workflowDomain?: string;
    private _workflows: Workflows | undefined;

    public constructor(opts: PipedreamClientOpts = {}) {
        const {
            environment = PipedreamEnvironment.Prod,
            projectEnvironment = process.env.PIPEDREAM_PROJECT_ENVIRONMENT ?? ProjectEnvironment.Production,
            projectId = process.env.PIPEDREAM_PROJECT_ID,
            workflowDomain,
        } = opts || {};

        if (!projectEnvironment) {
            throw new Error("Project environment cannot be empty");
        }
        if (
            projectEnvironment !== ProjectEnvironment.Production &&
            projectEnvironment !== ProjectEnvironment.Development
        ) {
            throw new Error(
                `Project environment must be either '${ProjectEnvironment.Production}' or '${ProjectEnvironment.Development}'`,
            );
        }

        const baseUrl = getBaseUrl(environment);
        const clientOpts: PipedreamClient.Options = {
            baseUrl,
            environment,
            projectEnvironment,
            projectId: projectId ?? "",
        };

        if ("tokenProvider" in opts) {
            clientOpts.tokenProvider = opts.tokenProvider;
            clientOpts.projectId = "";
        } else {
            const { clientId = process.env.PIPEDREAM_CLIENT_ID, clientSecret = process.env.PIPEDREAM_CLIENT_SECRET } =
                opts || {};

            if (!clientId || !clientSecret) {
                throw new Error("Client ID and secret are both required and cannot be blank");
            }

            if (!projectId) {
                // Project ID is required here because it cannot be inferred
                // from the client ID/secret, as opposed to the case with access
                // tokens.
                throw new Error("Project ID cannot be blank");
            }

            clientOpts.clientId = clientId;
            clientOpts.clientSecret = clientSecret;
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

    public get workflows(): Workflows {
        return (this._workflows ??= new Workflows({
            ...this._options,
            token: async () => await this._tokenProvider.getToken(),
            workflowDomain: this._workflowDomain,
        }));
    }
}
