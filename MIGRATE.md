<!-- markdownlint-disable MD024 -->
# Migrating from v1.x

This guide will help you migrate your existing Pipedream SDK v1.x integration to
the latest version.

## Table of contents

- [Migrating from v1.x](#migrating-from-v1x)
  - [Table of contents](#table-of-contents)
  - [Deprecation](#deprecation)
  - [Breaking changes](#breaking-changes)
  - [Client initialization](#client-initialization)
    - [Server-side](#server-side)
      - [v1.x (old)](#v1x-old)
      - [v2.x (new)](#v2x-new)
    - [Browser-side](#browser-side)
      - [v1.x (old)](#v1x-old-1)
      - [v2.x (new)](#v2x-new-1)
    - [Environment variables](#environment-variables)
  - [Method migration](#method-migration)
    - [Method and parameter naming](#method-and-parameter-naming)
    - [Migration examples](#migration-examples)
      - [Running actions](#running-actions)
        - [v1.x (old)](#v1x-old-2)
        - [v2.x (new)](#v2x-new-2)
      - [Deploying triggers](#deploying-triggers)
        - [v1.x (old)](#v1x-old-3)
        - [v2.x (new)](#v2x-new-3)
      - [Managing accounts](#managing-accounts)
        - [v1.x (old)](#v1x-old-4)
        - [v2.x (new)](#v2x-new-4)
      - [Creating connect tokens](#creating-connect-tokens)
        - [v1.x (old)](#v1x-old-5)
        - [v2.x (new)](#v2x-new-5)
      - [Validating connect tokens](#validating-connect-tokens)
        - [v1.x (old)](#v1x-old-6)
        - [v2.x (new)](#v2x-new-6)
      - [Configuring component props](#configuring-component-props)
        - [v1.x (old)](#v1x-old-7)
        - [v2.x (new)](#v2x-new-7)
      - [Deleting accounts](#deleting-accounts)
        - [v1.x (old)](#v1x-old-8)
        - [v2.x (new)](#v2x-new-8)
      - [Getting project info](#getting-project-info)
        - [v1.x (old)](#v1x-old-9)
        - [v2.x (new)](#v2x-new-9)
      - [Making proxy requests](#making-proxy-requests)
        - [v1.x (old)](#v1x-old-10)
        - [v2.x (new)](#v2x-new-10)
      - [Invoking workflows](#invoking-workflows)
        - [v1.x (old)](#v1x-old-11)
        - [v2.x (new)](#v2x-new-11)
  - [Namespace mapping](#namespace-mapping)
  - [New features in v2.x](#new-features-in-v2x)
    - [Full TypeScript support](#full-typescript-support)
    - [Pagination support](#pagination-support)
    - [Enhanced error handling](#enhanced-error-handling)
    - [Request options](#request-options)
    - [Abort signals](#abort-signals)
    - [Raw response access](#raw-response-access)
  - [Additional namespaces](#additional-namespaces)
  - [Partial migration](#partial-migration)
  - [Important removed functionality](#important-removed-functionality)
  - [Migration checklist](#migration-checklist)

## Deprecation

The v1.x version of the Pipedream SDK is now deprecated. This means that no
changes will be made to this version unless there are critical security issues.
We recommend that you migrate to the latest version of the SDK to take advantage
of new features, improvements, and bug fixes if possible.

## Breaking changes

The new SDK version introduces several breaking changes that you need to be
aware of when migrating from v1.x. Below is a summary of the most significant
changes:

- **Namespaced Methods**: Methods are now namespaced by the resource they act
  upon. For example, instead of using `client.runAction()`, you now use
  `client.actions.run()`.
- **Snake Case Naming Convention**: Method arguments now follow the `snake_case`
  naming convention to align with our [OpenAPI
  spec](https://api.pipedream.com/api-docs/swagger.json).
- **Client Initialization**: The `createBackendClient()` and
  `createFrontendClient()` methods have been replaced with a new
  `PipedreamClient` class.
- **TypeScript Types**: All TypeScript types are now exported for better type
  safety.
- **Authentication Changes**: The `rawAccessToken()` method has been replaced
  with the `oauthTokens.create()` namespace.
- **Environment Variables**: The SDK now supports automatic configuration via
  environment variables (see below).

## Client initialization

### Server-side

For server-side applications, we recommend using the `PipedreamClient` wrapper
class, which simplifies OAuth token management.

#### v1.x (old)

```javascript
import { createBackendClient } from '@pipedream/sdk';

const client = createBackendClient({
  credentials: {
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
  },
  projectId: 'your-project-id',
  environment: 'development', // or 'production'
});
```

#### v2.x (new)

```javascript
import { PipedreamClient } from '@pipedream/sdk';

const client = new PipedreamClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  projectId: 'your-project-id',
  projectEnvironment: 'development', // or 'production'
});
```

### Browser-side

For browser-side applications, you should use the `PipedreamClient` class and
authenticate using a `connect_token` obtained from your backend.

#### v1.x (old)

```javascript
import { createFrontendClient } from '@pipedream/sdk';

const frontendClient = createFrontendClient({
  environment: 'development',
  credentials: {
    token: 'connect-token-from-backend',
  },
});
```

#### v2.x (new)

```javascript
import { PipedreamClient } from '@pipedream/sdk';

const frontendClient = new PipedreamClient({
  token: 'connect-token-from-backend',
  projectId: 'your-project-id',
  projectEnvironment: 'development', // or 'production'
});
```

### Environment variables

The v2.x SDK supports automatic configuration via environment variables:

```javascript
// These environment variables are automatically used if set:
// PIPEDREAM_CLIENT_ID
// PIPEDREAM_CLIENT_SECRET
// PIPEDREAM_PROJECT_ID
// PIPEDREAM_PROJECT_ENVIRONMENT (defaults to 'production')

// You can initialize the client with minimal configuration
const client = new PipedreamClient({
  projectId: 'your-project-id', // Can also come from PIPEDREAM_PROJECT_ID
});
```

## Method migration

### Method and parameter naming

In v2.x, all methods are namespaced and all method parameters are in
`snake_case`. For example, `client.runAction({ externalUserId: '...' })` becomes
`client.actions.run({ external_user_id: '...' })`. This aligns to what's stated
the [OpenAPI spec](https://api.pipedream.com/api-docs/swagger.json), but does
**not apply** to the following arguments:

1. Client constructor parameters like `clientId`, `clientSecret`, and
   `projectId`.
2. The props listed under `configured_props` (the naming follows whatever the
   corresponding component defines).
3. Request meta-arguments like `timeoutInSeconds`, `maxRetries`, and `headers`.

### Migration examples

#### Running actions

##### v1.x (old)

```javascript
const result = await client.runAction({
  externalUserId: 'jverce',
  actionId: 'gitlab-list-commits',
  configuredProps: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
    projectId: 45672541,
    refName: 'main',
  },
});
```

##### v2.x (new)

```javascript
const result = await client.actions.run({
  external_user_id: 'jverce',
  id: 'gitlab-list-commits',
  configured_props: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
    projectId: 45672541,
    refName: 'main',
  },
});
```

#### Deploying triggers

##### v1.x (old)

```javascript
const trigger = await client.deployTrigger({
  externalUserId: 'jverce',
  triggerId: 'gitlab-new-issue',
  configuredProps: {
    gitlab: {
      authProvisionId: 'apn_kVh9AoD',
    },
    projectId: 45672541,
  },
  webhookUrl: 'https://events.example.com/gitlab-new-issue',
});
```

##### v2.x (new)

```javascript
const trigger = await client.triggers.deploy({
  external_user_id: 'jverce',
  id: 'gitlab-new-issue',
  configured_props: {
    gitlab: {
      authProvisionId: 'apn_kVh9AoD',
    },
    projectId: 45672541,
  },
  webhook_url: 'https://events.example.com/gitlab-new-issue',
});
```

#### Managing accounts

##### v1.x (old)

```javascript
// List accounts
const accounts = await client.getAccounts({
  external_user_id: 'jverce',
  include_credentials: true,
});

// Get specific account
const account = await client.getAccountById('apn_kVh9AoD', {
  include_credentials: true,
});
```

##### v2.x (new)

```javascript
// List accounts
const accounts = await client.accounts.list({
  external_user_id: 'jverce',
  include_credentials: true,
});

// Get specific account
const account = await client.accounts.retrieve('apn_kVh9AoD', {
  include_credentials: true,
});
```

#### Creating connect tokens

##### v1.x (old)

```javascript
const token = await client.createConnectToken({
  external_user_id: 'jverce',
});
```

##### v2.x (new)

```javascript
const token = await client.tokens.create({
  external_user_id: 'jverce',
});
```

#### Validating connect tokens

##### v1.x (old)

```javascript
// validateConnectToken was available in v1.x
const isValid = await client.validateConnectToken({
  token: 'connect-token-to-validate',
});
```

##### v2.x (new)

```javascript
const validation = await client.tokens.validate({
  token: 'connect-token-to-validate',
});
```

#### Configuring component props

##### v1.x (old)

```javascript
const response = await client.configureComponent({
  externalUserId: 'jverce',
  componentId: 'gitlab-new-issue',
  propName: 'projectId',
  configuredProps: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
  },
});
```

##### v2.x (new)

```javascript
const response = await client.components.configureProp({
  external_user_id: 'jverce',
  id: 'gitlab-new-issue',
  prop_name: 'projectId',
  configured_props: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
  },
});
```

#### Deleting accounts

##### v1.x (old)

```javascript
// Delete specific account
await client.deleteAccount('account-id');

// Delete all accounts for an app
await client.deleteAccountsByApp('app-id');

// Delete external user
await client.deleteExternalUser('jverce');
```

##### v2.x (new)

```javascript
// Delete specific account
await client.accounts.delete('account-id');

// Delete all accounts for an app - functionality removed
// Consider using accounts.list() and deleting individually

// Delete external user - use users namespace
await client.users.delete({
  external_user_id: 'jverce',
});
```

#### Getting project info

##### v1.x (old)

```javascript
const projectInfo = await client.getProjectInfo();
console.log(projectInfo.apps);
```

##### v2.x (new)

```javascript
const project = await client.projects.retrieve();
console.log(project);
```

#### Making proxy requests

##### v1.x (old)

```javascript
// v1.x uses a single method with two parameters
const response = await client.makeProxyRequest({
  searchParams: {
    external_user_id: 'jverce',
    account_id: 'apn_kVh9AoD',
  },
}, {
  url: 'https://api.example.com/data',
  options: {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  },
});

// POST request with body
const postResponse = await client.makeProxyRequest({
  searchParams: {
    external_user_id: 'jverce',
    account_id: 'apn_kVh9AoD',
  },
}, {
  url: 'https://api.example.com/users',
  options: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'John Doe' }),
  },
});
```

##### v2.x (new)

```javascript
// v2.x uses separate methods for each HTTP verb
const response = await client.proxy.get({
  external_user_id: 'jverce',
  account_id: 'apn_kVh9AoD',
  url: 'https://api.example.com/data',
  headers: {
    'Accept': 'application/json',
  },
  params: {}, // Additional query parameters if needed
});

// POST request with body
const postResponse = await client.proxy.post({
  external_user_id: 'jverce',
  account_id: 'apn_kVh9AoD',
  url: 'https://api.example.com/users',
  body: { name: 'John Doe' }, // Body is passed as an object, not a string
  headers: {
    'Content-Type': 'application/json',
  },
});

// Other HTTP methods are available
await client.proxy.put({ /* ... */ });
await client.proxy.delete({ /* ... */ });
await client.proxy.patch({ /* ... */ });
```

#### Invoking workflows

##### v1.x (old)

```javascript
// Invoke a workflow
const response = await client.invokeWorkflow(
  'https://your-endpoint.m.pipedream.net',
  {
    foo: 123,
    bar: 'abc',
  },
  HTTPAuthType.OAuth // Optional auth type
);

// Invoke a workflow for an external user
const response = await client.invokeWorkflowForExternalUser(
  'https://your-workflow-url.m.pipedream.net',
  'jverce', // external user ID as second parameter
  {
    foo: 123,
    bar: 'abc',
  }
);
```

##### v2.x (new)

```javascript
// Invoke a workflow
const response = await client.workflows.invoke({
  urlOrEndpoint: 'https://your-endpoint.m.pipedream.net',
  body: {
    foo: 123,
    bar: 'abc',
  },
  headers: {
    'Accept': 'application/json',
  },
}, Pipedream.HTTPAuthType.OAuth);

// Invoke a workflow for an external user
const response = await client.workflows.invokeForExternalUser({
  urlOrEndpoint: 'https://your-workflow-url.m.pipedream.net',
  externalUserId: 'jverce', // now part of the options object
  body: {
    foo: 123,
    bar: 'abc',
  },
});
```

## Namespace mapping

Here's a complete list of how v1.x methods map to v2.x namespaced methods:

| v1.x Method                       | v2.x Method                          |
| --------------------------------- | ------------------------------------ |
| `runAction()`                     | `actions.run()`                      |
| `getAccounts()`                   | `accounts.list()`                    |
| `getAccountById()`                | `accounts.retrieve()`                |
| `deleteAccount()`                 | `accounts.delete()`                  |
| `deleteAccountsByApp()`           | Not available (use list + delete)    |
| `deleteExternalUser()`            | `users.delete()`                     |
| `createConnectToken()`            | `tokens.create()`                    |
| `validateConnectToken()`          | `tokens.validate()`                  |
| `deployTrigger()`                 | `triggers.deploy()`                  |
| `getDeployedTriggers()`           | `deployedTriggers.list()`            |
| `getDeployedTrigger()`            | `deployedTriggers.retrieve()`        |
| `updateDeployedTrigger()`         | `deployedTriggers.update()`          |
| `deleteDeployedTrigger()`         | `deployedTriggers.delete()`          |
| `getTriggerEvents()`              | `deployedTriggers.listEvents()`      |
| `getTriggerWebhooks()`            | `deployedTriggers.listWebhooks()`    |
| `updateTriggerWebhooks()`         | `deployedTriggers.updateWebhooks()`  |
| `getTriggerWorkflows()`           | `deployedTriggers.listWorkflows()`   |
| `updateTriggerWorkflows()`        | `deployedTriggers.updateWorkflows()` |
| `getUsers()`                      | `users.list()`                       |
| `getUser()`                       | `users.retrieve()`                   |
| `getApps()`                       | `apps.list()`                        |
| `getApp()`                        | `apps.retrieve()`                    |
| `getComponents()`                 | `components.list()`                  |
| `getComponent()`                  | `components.retrieve()`              |
| `configureComponent()`            | `components.configureProp()`         |
| `reloadComponentProps()`          | `components.reloadProps()`           |
| `getProjectInfo()`                | `projects.retrieve()`                |
| `makeProxyRequest()`              | `proxy.get()`, `proxy.post()`, etc.  |
| `invokeWorkflow()`                | `workflows.invoke()`                 |
| `invokeWorkflowForExternalUser()` | `workflows.invokeForExternalUser()`  |
| `rawAccessToken()`                | Not available (managed internally)   |

## New features in v2.x

The v2.x SDK includes several new features not available in v1.x:

### Full TypeScript support

```typescript
import { type RunActionResponse } from '@pipedream/sdk';

const result: RunActionResponse = await client.actions.run({
  external_user_id: 'jverce',
  id: 'gitlab-list-commits',
  configured_props: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
    projectId: 45672541,
    refName: 'main',
  },
});
```

### Pagination support

```javascript
// Automatic pagination
for await (const account of client.accounts.list({
  external_user_id: 'jverce',
})) {
  console.log(account);
}

// Manual pagination
const firstPage = await client.accounts.list({
  external_user_id: 'jverce',
  limit: 20,
});

if (firstPage.hasNextPage()) {
  const nextPage = await firstPage.getNextPage();
  console.log(nextPage.data);
}
```

### Enhanced error handling

```javascript
import { PipedreamError } from '@pipedream/sdk';

try {
  await client.actions.run({
    external_user_id: 'jverce',
    id: 'gitlab-list-commits',
    configured_props: {
      gitlab: { authProvisionId: 'apn_kVh9AoD' },
      projectId: 45672541,
      refName: 'main',
    },
  });
} catch (error) {
  if (error instanceof PipedreamError) {
    console.error('API Error:', error.status, error.message);
  }
}
```

### Request options

```javascript
// Custom timeout
const result = await client.actions.run({
  external_user_id: 'jverce',
  id: 'gitlab-list-commits',
  configured_props: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
    projectId: 45672541,
    refName: 'main',
  },
}, {
  timeoutInSeconds: 30,
});

// Retry configuration
const result = await client.actions.run({
  external_user_id: 'jverce',
  id: 'gitlab-list-commits',
  configured_props: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
    projectId: 45672541,
    refName: 'main',
  },
}, {
  maxRetries: 3,
});

// Custom headers
const result = await client.actions.run({
  external_user_id: 'jverce',
  id: 'gitlab-list-commits',
  configured_props: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
    projectId: 45672541,
    refName: 'main',
  },
}, {
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

### Abort signals

```javascript
const controller = new AbortController();

// Abort after 5 seconds
setTimeout(() => controller.abort(), 5000);

try {
  const result = await client.actions.run({
    external_user_id: 'jverce',
    id: 'gitlab-list-commits',
    configured_props: {
      gitlab: { authProvisionId: 'apn_kVh9AoD' },
      projectId: 45672541,
      refName: 'main',
    },
  }, {
    abortSignal: controller.signal,
  });
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was aborted');
  }
}
```

### Raw response access

```javascript
const response = await client.actions.run({
  external_user_id: 'jverce',
  id: 'gitlab-list-commits',
  configured_props: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
    projectId: 45672541,
    refName: 'main',
  },
}, {
  includeRawResponse: true,
});

console.log(response.data); // Parsed response data
console.log(response.rawResponse); // Original Response object
```

## Additional namespaces

The v2.x SDK includes several new namespaces not available in v1.x:

- `apps` - Browse available apps and integrations
- `appCategories` - List app categories
- `components` - Work with components
- `deployedTriggers.listEvents()` - List events for a deployed trigger
- `deployedTriggers.listWebhooks()` - List webhooks for a deployed trigger
- `deployedTriggers.listWorkflows()` - List workflows for a deployed trigger
- `projects` - Get project information
- `proxy` - Work with HTTP proxy endpoints
- `triggers` - Additional trigger operations beyond deployment
- `users` - User information
- `oauthTokens` - OAuth token management
- `workflows` - Invoke workflows

## Partial migration

If you are unable to migrate all your code at once, you can use the new SDK
alongside the old one by leveraging package aliases. This allows you to migrate
incrementally without breaking your existing codebase. To do this, you can
install the new SDK with an alias:

```bash
npm install @pipedream/sdk-v2@npm:@pipedream/sdk@^2.0.0 --save
```

Then, in your code, you can import the new SDK with the alias:

```javascript
import { createBackendClient } from '@pipedream/sdk';
import { PipedreamClient } from '@pipedream/sdk-v2';

const clientOpts = {
  credentials: {
    clientId,
    clientSecret,
  },
  projectId,
  environment,
}

const client = createBackendClient(clientOpts);
const newClient = new PipedreamClient({
  ...clientOpts.credentials,
  projectEnvironment: clientOpts.environment,
  projectId: clientOpts.projectId,
});

// Use old client for existing code
const oldResult = await client.runAction({
  externalUserId: 'jverce',
  actionId: 'gitlab-list-commits',
  configuredProps: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
    projectId: 45672541,
    refName: 'main',
  },
});

// Use new client for migrated code
const newResult = await newClient.actions.run({
  external_user_id: 'jverce',
  id: 'gitlab-list-commits',
  configured_props: {
    gitlab: { authProvisionId: 'apn_kVh9AoD' },
    projectId: 45672541,
    refName: 'main',
  },
});
```

## Important removed functionality

Some methods from v1.x have been removed or changed significantly in v2.x:

1. **`deleteAccountsByApp()`** - This bulk deletion method is no longer
   available. You'll need to list accounts for an app and delete them
   individually.

2. **`rawAccessToken()`** - Direct access token retrieval has been removed. The
   v2.x SDK manages OAuth tokens internally and doesn't expose them directly. If
   you need to make authenticated requests, use the built-in methods or the
   proxy namespace.

3. **Alternative method names** - The v1.x SDK provided alternative method names
   (e.g., `actionRun()` as an alias for `runAction()`). These are no longer
   available in v2.x.

4. **`userId` parameter** - The deprecated `userId` parameter has been removed.
   Always use `external_user_id` instead.

## Migration checklist

- [ ] Update import statements from `createBackendClient`/`createFrontendClient`
  to `PipedreamClient`.
- [ ] Update client initialization to use `new PipedreamClient()` for both
  server-side and browser-side.
- [ ] Convert all method calls to use namespaced format (e.g.,
  `client.actions.run()`).
- [ ] Update all parameter names from camelCase to snake_case.
- [ ] Pass `external_user_id` to methods instead of setting it on the client.
- [ ] Update error handling to use `PipedreamError` type.
- [ ] Review and implement new features like pagination and request options
  where beneficial.
- [ ] Replace any usage of removed methods with their alternatives.
- [ ] Update any code using `rawAccessToken()` to use the OAuth tokens
  namespace.
- [ ] Test all migrated code thoroughly.
- [ ] Remove the old SDK dependency once migration is complete.
