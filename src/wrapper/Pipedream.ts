import { ProjectEnvironment } from "../api";
import { PipedreamClient } from "../Client";
import { PipedreamEnvironment } from "../environments";

export interface BackendOpts {
  clientId?: string;
  clientSecret?: string;
  environment?: PipedreamEnvironment;
  projectEnvironment?: ProjectEnvironment;
  projectId: string;
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
    const {
      clientId = process.env.PIPEDREAM_CLIENT_ID,
      clientSecret = process.env.PIPEDREAM_CLIENT_SECRET,
      environment = PipedreamEnvironment.Prod,
      projectEnvironment = process.env.PIPEDREAM_PROJECT_ENVIRONMENT ?? "production",
      projectId = process.env.PIPEDREAM_PROJECT_ID,
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
  }
}
