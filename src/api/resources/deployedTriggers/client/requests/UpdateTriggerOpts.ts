/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         external_user_id: "external_user_id"
 *     }
 */
export interface UpdateTriggerOpts {
    /**
     * The external user ID who owns the trigger
     */
    external_user_id: string;
    /** Whether the trigger should be active */
    active?: boolean;
    /** The configured properties for the trigger */
    configured_props?: Record<string, unknown>;
    /** The name of the trigger */
    name?: string;
}
