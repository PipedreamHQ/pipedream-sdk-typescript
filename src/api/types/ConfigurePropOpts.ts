/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Request options for configuring a component's prop
 */
export interface ConfigurePropOpts {
    /** The component ID */
    id: string;
    /** The external user ID */
    external_user_id: string;
    /** The name of the prop to configure */
    prop_name: string;
    /** Whether this operation should block until completion */
    blocking?: boolean;
    /** The configured properties for the component */
    configured_props?: Record<string, unknown>;
    /** The ID for dynamic props */
    dynamic_props_id?: string;
    /** Handle for async operations */
    async_handle?: string;
    /** Page number for paginated results */
    page?: number;
    /** Previous context for pagination */
    prev_context?: Record<string, unknown>;
    /** Search query for filtering options */
    query?: string;
}
