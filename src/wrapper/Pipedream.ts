import { ProjectEnvironment } from "../api/index.js";
import { Workflows } from "../api/resources/workflows/client/Client.js";
import { PipedreamClient } from "../Client.js";
import { PipedreamEnvironment } from "../environments.js";

/**
 * Configuration options for initializing a Pipedream client.
 */
export interface PipedreamClientOpts {
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
   * The unique identifier for the project. This field is required.
   */
  projectId: string;

  /**
   * Optional custom domain for workflow execution.
   */
  workflowDomain?: string;
}

/**
 * Returns the base URL for the Pipedream API based on the provided environment.
 * It replaces any placeholders in the environment string with corresponding
 * environment variables.
 *
 * @param environment - The Pipedream environment string.
 * @returns The base URL for the Pipedream API.
 */
const getBaseUrl = (environment: PipedreamEnvironment) =>
  environment.replace(/\$\{(\w+)\}/g, (_, name) => process.env[name] ?? "");

export class Pipedream extends PipedreamClient {
  private _workflowDomain?: string;
  private _workflows: Workflows | undefined;

  public constructor(opts: PipedreamClientOpts) {
    const {
      clientId = process.env.PIPEDREAM_CLIENT_ID,
      clientSecret = process.env.PIPEDREAM_CLIENT_SECRET,
      environment = PipedreamEnvironment.Prod,
      projectEnvironment = process.env.PIPEDREAM_PROJECT_ENVIRONMENT ?? "production",
      projectId = process.env.PIPEDREAM_PROJECT_ID,
      workflowDomain,
    } = opts || {};
    if (!projectEnvironment) {
      throw new Error("Project environment cannot be empty");
    }
    if (projectEnvironment !== "production" && projectEnvironment !== "development") {
      throw new Error("Project environment must be either 'production' or 'development'");
    }
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    const baseUrl = getBaseUrl(environment);

    super({
      baseUrl,
      clientId,
      clientSecret,
      environment,
      projectEnvironment,
      projectId,
    });

    this._workflowDomain = workflowDomain;
  }

  /**
   * Returns an access token that can be used to authenticate API requests
   *
   * @returns A promise that resolves to the access token string.
   */
  public get rawAccessToken(): Promise<string> {
    return this._oauthTokenProvider.getToken();
  }

  public get workflows(): Workflows {
    return (this._workflows ??= new Workflows({
      ...this._options,
      token: async () => await this._oauthTokenProvider.getToken(),
      workflowDomain: this._workflowDomain,
    }));
  }
}
