# Changelog

## [2.3.8] - 2026-02-25

### Fixed

- **`environment` option now works in browser bundles.** Previously, `getBaseUrl.browser.ts` was hardcoded to always return `PipedreamEnvironment.Prod` (`https://api.pipedream.com`), ignoring the `environment` argument entirely. This meant that passing `environment: PipedreamEnvironment.Canary` (or any custom environment URL) to `createFrontendClient` had no effect — all browser API requests were silently routed to production regardless.

  `getBaseUrl.browser.ts` now returns the `environment` argument as-is, matching the intent of the Node.js version (minus `${VAR}` placeholder substitution, which requires `process.env` and is not supported in browser contexts).

  **Before (broken):**
  ```ts
  // Browser requests always went to api.pipedream.com regardless of this option
  const client = createFrontendClient({
    environment: PipedreamEnvironment.Canary,
    // ...
  });
  ```

  **After (fixed):**
  ```ts
  // Browser requests now correctly go to api2.pipedream.com
  const client = createFrontendClient({
    environment: PipedreamEnvironment.Canary,
    // ...
  });
  ```

  Note: `PipedreamEnvironment.Dev` (which uses a `${DEV_NAMESPACE}` placeholder) is still not supported in the browser, as `process.env` is not available in browser contexts.
