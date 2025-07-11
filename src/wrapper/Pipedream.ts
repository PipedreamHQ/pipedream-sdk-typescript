import { PipedreamClient } from "../Client";
import { PipedreamEnvironment } from "../environments";

/**
 * OAuth credentials for your Pipedream account, containing client ID and
 * secret.
 */
export type OAuthCredentials = {
  clientId: string;
  clientSecret: string;
};

export type AccessToken = {
  accessToken: string;
};

/**
 * The environment in which the server client is running.
 */
export type ProjectEnvironment = "development" | "production";

export interface BackendOpts {
  credentials: OAuthCredentials | AccessToken;
  environment: ProjectEnvironment;
  projectId: string;
  apiEnvironment?: PipedreamEnvironment;
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
  environment.replace(/\${(\w+)}/g, (_, name) => process.env[name] ?? "");

export class Pipedream extends PipedreamClient {
  public constructor(opts: BackendOpts) {
    // @ts-ignore
    const { clientId = process.env.PIPEDREAM_CLIENT_ID, clientSecret = process.env.PIPEDREAM_CLIENT_SECRET } =
      opts.credentials ?? {};
    if (!clientId || !clientSecret) {
      throw new Error("OAuth client ID and secret are required");
    }

    const {
      environment: xPdEnvironment = process.env.PIPEDREAM_PROJECT_ENVIRONMENT,
      projectId = process.env.PIPEDREAM_PROJECT_ID,
      apiEnvironment: environment = PipedreamEnvironment.Prod,
    } = opts;
    if (!xPdEnvironment) {
      throw new Error("Project environment is required");
    }
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    const baseUrl = getBaseUrl(environment);

    super({
      baseUrl,
      clientId,
      clientSecret,
      projectId,
      xPdEnvironment,
    });
  }
}
