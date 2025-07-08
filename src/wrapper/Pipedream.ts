import { PipedreamClient } from "../Client";
import * as environments from "../environments";

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
  apiEnvironment?: environments.PipedreamEnvironment;
}

export class Pipedream extends PipedreamClient {
  public constructor(opts: BackendOpts) {
    // @ts-ignore
    const { clientId = process.env.PIPEDREAM_CLIENT_ID, clientSecret = process.env.PIPEDREAM_CLIENT_SECRET } =
      opts.credentials;
    if (!clientId || !clientSecret) {
      throw new Error("OAuth client ID and secret are required");
    }

    const {
      environment: xPdEnvironment = process.env.PIPEDREAM_PROJECT_ENVIRONMENT,
      projectId = process.env.PIPEDREAM_PROJECT_ID,
      apiEnvironment: environment = environments.PipedreamEnvironment.Prod,
    } = opts;
    if (!xPdEnvironment) {
      throw new Error("Project environment is required");
    }
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    super({
      clientId,
      clientSecret,
      environment,
      xPdEnvironment,
      projectId,
    });
  }
}
