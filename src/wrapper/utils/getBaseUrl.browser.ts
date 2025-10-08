import { PipedreamEnvironment } from "../../environments.js";

/**
 * Returns the base URL for the Pipedream API based on the provided environment.
 * Browser-optimized version that returns the production environment directly.
 *
 * @returns The base URL for the Pipedream API.
 */
export const getBaseUrl = () => PipedreamEnvironment.Prod;
