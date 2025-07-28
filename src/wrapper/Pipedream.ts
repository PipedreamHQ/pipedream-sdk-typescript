import { ProjectEnvironment } from "../api/index.js";
import { Workflows } from "../api/resources/workflows/client/Client.js";
import { PipedreamClient } from "../Client.js";
import * as environments from "../environments.js";

export interface BackendOpts {
  clientId?: string;
  clientSecret?: string;
  environment?: environments.PipedreamEnvironment;
  projectEnvironment?: ProjectEnvironment;
  projectId: string;
  workflowDomain?: string;
}

function expandEnvVars(template: string) {
  return template.replace(/\$\{(\w+)\}/g, (_, key) => process.env[key] ?? "");
}

export class Pipedream extends PipedreamClient {
  private _workflowDomain?: string;
  private _workflows: Workflows | undefined;

  public constructor(opts: BackendOpts) {
    const {
      clientId = process.env.PIPEDREAM_CLIENT_ID,
      clientSecret = process.env.PIPEDREAM_CLIENT_SECRET,
      environment: rawEnvironment = environments.PipedreamEnvironment.Prod,
      projectEnvironment = process.env.PIPEDREAM_PROJECT_ENVIRONMENT ?? "production",
      projectId = process.env.PIPEDREAM_PROJECT_ID,
      workflowDomain,
    } = opts;
    if (!projectEnvironment) {
      throw new Error("Project environment cannot be empty");
    }
    if (projectEnvironment !== "production" && projectEnvironment !== "development") {
      throw new Error("Project environment must be either 'production' or 'development'");
    }
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    const environment = expandEnvVars(rawEnvironment.toString());

    super({
      clientId,
      clientSecret,
      environment,
      projectEnvironment,
      projectId,
    });

    this._workflowDomain = workflowDomain;
  }

  public get workflows(): Workflows {
    return (this._workflows ??= new Workflows({
      ...this._options,
      token: async () => await this._oauthTokenProvider.getToken(),
      workflowDomain: this._workflowDomain,
    }));
  }
}
