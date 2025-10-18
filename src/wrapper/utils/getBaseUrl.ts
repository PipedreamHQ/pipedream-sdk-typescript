import { PipedreamEnvironment } from "../../environments.js";

/**
 * Returns the base URL for the Pipedream API based on the provided environment.
 * It replaces any placeholders in the environment string with corresponding
 * environment variables.
 *
 * @param environment - The Pipedream environment string.
 * @returns The base URL for the Pipedream API.
 */
export const getBaseUrl = (environment: PipedreamEnvironment): string =>
    environment.replace(/\$\{(\w+)\}/g, (_, name) => process.env[name] ?? "");
