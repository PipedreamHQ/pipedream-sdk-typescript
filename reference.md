# Reference
## AppCategories
<details><summary><code>client.appCategories.<a href="/src/api/resources/appCategories/client/Client.ts">list</a>() -> Pipedream.ListAppCategoriesResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all available categories for integrated apps
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.appCategories.list();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `AppCategories.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.appCategories.<a href="/src/api/resources/appCategories/client/Client.ts">retrieve</a>(id) -> Pipedream.GetAppCategoryResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get details of a specific app category by its ID
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.appCategories.retrieve("id");

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**id:** `string` — The ID of the app category to retrieve
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `AppCategories.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Apps
<details><summary><code>client.apps.<a href="/src/api/resources/apps/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;Pipedream.App&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all available apps with optional filtering and sorting
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.apps.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q",
    sortKey: "name",
    sortDirection: "asc",
    hasComponents: true,
    hasActions: true,
    hasTriggers: true
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.apps.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q",
    sortKey: "name",
    sortDirection: "asc",
    hasComponents: true,
    hasActions: true,
    hasTriggers: true
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.AppsListRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Apps.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.apps.<a href="/src/api/resources/apps/client/Client.ts">retrieve</a>(appId) -> Pipedream.GetAppResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get detailed information about a specific app by ID or name slug
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.apps.retrieve("app_id");

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**appId:** `string` — The name slug or ID of the app (e.g., 'slack', 'github')
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Apps.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Accounts
<details><summary><code>client.accounts.<a href="/src/api/resources/accounts/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;Pipedream.Account&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all connected accounts for the project with optional filtering
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.accounts.list({
    externalUserId: "external_user_id",
    oauthAppId: "oauth_app_id",
    after: "after",
    before: "before",
    limit: 1,
    app: "app",
    includeCredentials: true
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.accounts.list({
    externalUserId: "external_user_id",
    oauthAppId: "oauth_app_id",
    after: "after",
    before: "before",
    limit: 1,
    app: "app",
    includeCredentials: true
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.AccountsListRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Accounts.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.accounts.<a href="/src/api/resources/accounts/client/Client.ts">create</a>({ ...params }) -> Pipedream.Account</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Connect a new account for an external user in the project
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.create({
    externalUserId: "external_user_id",
    oauthAppId: "oauth_app_id",
    appSlug: "app_slug",
    cfmapJson: "cfmap_json",
    connectToken: "connect_token"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.CreateAccountOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Accounts.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.accounts.<a href="/src/api/resources/accounts/client/Client.ts">retrieve</a>(accountId, { ...params }) -> Pipedream.Account</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the details for a specific connected account
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.retrieve("account_id", {
    includeCredentials: true
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**accountId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.AccountsRetrieveRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Accounts.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.accounts.<a href="/src/api/resources/accounts/client/Client.ts">delete</a>(accountId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove a connected account and its associated credentials
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.delete("account_id");

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**accountId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Accounts.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.accounts.<a href="/src/api/resources/accounts/client/Client.ts">deleteByApp</a>(appId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove all connected accounts for a specific app
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.deleteByApp("app_id");

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**appId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Accounts.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Users
<details><summary><code>client.users.<a href="/src/api/resources/users/client/Client.ts">deleteExternalUser</a>(externalUserId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove an external user and all their associated accounts and resources
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.users.deleteExternalUser("external_user_id");

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**externalUserId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.users.<a href="/src/api/resources/users/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;Pipedream.ExternalUser&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all external users for the project
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.users.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q"
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.users.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.UsersListRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Users.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Components
<details><summary><code>client.components.<a href="/src/api/resources/components/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;Pipedream.Component&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve available components with optional search and app filtering
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.components.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q",
    app: "app",
    registry: "public",
    componentType: "trigger"
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.components.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q",
    app: "app",
    registry: "public",
    componentType: "trigger"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.ComponentsListRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Components.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.components.<a href="/src/api/resources/components/client/Client.ts">retrieve</a>(componentId, { ...params }) -> Pipedream.GetComponentResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get detailed configuration for a specific component by its key
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.components.retrieve("component_id", {
    version: "1.2.3"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**componentId:** `string` — The key that uniquely identifies the component (e.g., 'slack-send-message')
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.ComponentsRetrieveRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Components.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.components.<a href="/src/api/resources/components/client/Client.ts">configureProp</a>({ ...params }) -> Pipedream.ConfigurePropResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve remote options for a given prop for a component
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.components.configureProp({
    id: "id",
    externalUserId: "external_user_id",
    propName: "prop_name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.ConfigurePropOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Components.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.components.<a href="/src/api/resources/components/client/Client.ts">reloadProps</a>({ ...params }) -> Pipedream.ReloadPropsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Reload the prop definition based on the currently configured props
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.components.reloadProps({
    id: "id",
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.ReloadPropsOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Components.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Actions
<details><summary><code>client.actions.<a href="/src/api/resources/actions/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;Pipedream.Component&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve available actions with optional search and app filtering
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.actions.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q",
    app: "app",
    registry: "public"
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.actions.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q",
    app: "app",
    registry: "public"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.ActionsListRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/api/resources/actions/client/Client.ts">retrieve</a>(componentId, { ...params }) -> Pipedream.GetComponentResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get detailed configuration for a specific action by its key
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.retrieve("component_id", {
    version: "1.2.3"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**componentId:** `string` — The key that uniquely identifies the component (e.g., 'slack-send-message')
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.ActionsRetrieveRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/api/resources/actions/client/Client.ts">configureProp</a>({ ...params }) -> Pipedream.ConfigurePropResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve remote options for a given prop for a action
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.configureProp({
    id: "id",
    externalUserId: "external_user_id",
    propName: "prop_name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.ConfigurePropOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/api/resources/actions/client/Client.ts">reloadProps</a>({ ...params }) -> Pipedream.ReloadPropsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Reload the prop definition based on the currently configured props
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.reloadProps({
    id: "id",
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.ReloadPropsOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.actions.<a href="/src/api/resources/actions/client/Client.ts">run</a>({ ...params }) -> Pipedream.RunActionResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Execute an action with the provided configuration and return results
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.run({
    id: "id",
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.RunActionOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Actions.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Triggers
<details><summary><code>client.triggers.<a href="/src/api/resources/triggers/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;Pipedream.Component&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve available triggers with optional search and app filtering
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.triggers.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q",
    app: "app",
    registry: "public"
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.triggers.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q",
    app: "app",
    registry: "public"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.TriggersListRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Triggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.triggers.<a href="/src/api/resources/triggers/client/Client.ts">retrieve</a>(componentId, { ...params }) -> Pipedream.GetComponentResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get detailed configuration for a specific trigger by its key
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.triggers.retrieve("component_id", {
    version: "1.2.3"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**componentId:** `string` — The key that uniquely identifies the component (e.g., 'slack-send-message')
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.TriggersRetrieveRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Triggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.triggers.<a href="/src/api/resources/triggers/client/Client.ts">configureProp</a>({ ...params }) -> Pipedream.ConfigurePropResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve remote options for a given prop for a trigger
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.triggers.configureProp({
    id: "id",
    externalUserId: "external_user_id",
    propName: "prop_name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.ConfigurePropOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Triggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.triggers.<a href="/src/api/resources/triggers/client/Client.ts">reloadProps</a>({ ...params }) -> Pipedream.ReloadPropsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Reload the prop definition based on the currently configured props
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.triggers.reloadProps({
    id: "id",
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.ReloadPropsOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Triggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.triggers.<a href="/src/api/resources/triggers/client/Client.ts">deploy</a>({ ...params }) -> Pipedream.DeployTriggerResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Deploy a trigger to listen for and emit events
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.triggers.deploy({
    id: "id",
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.DeployTriggerOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Triggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## DeployedTriggers
<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;Pipedream.Emitter&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve all deployed triggers for a specific external user
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.deployedTriggers.list({
    after: "after",
    before: "before",
    limit: 1,
    externalUserId: "external_user_id",
    emitterType: "email"
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.deployedTriggers.list({
    after: "after",
    before: "before",
    limit: 1,
    externalUserId: "external_user_id",
    emitterType: "email"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.DeployedTriggersListRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">retrieve</a>(triggerId, { ...params }) -> Pipedream.GetTriggerResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get details of a specific deployed trigger by its ID
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.retrieve("trigger_id", {
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.DeployedTriggersRetrieveRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">update</a>(triggerId, { ...params }) -> Pipedream.GetTriggerResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Modify the configuration of a deployed trigger, including active status
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.update("trigger_id", {
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.UpdateTriggerOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">delete</a>(triggerId, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove a deployed trigger and stop receiving events
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.delete("trigger_id", {
    externalUserId: "external_user_id",
    ignoreHookErrors: true
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.DeployedTriggersDeleteRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">listEvents</a>(triggerId, { ...params }) -> Pipedream.GetTriggerEventsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve recent events emitted by a deployed trigger
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.listEvents("trigger_id", {
    externalUserId: "external_user_id",
    n: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.DeployedTriggersListEventsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">listWorkflows</a>(triggerId, { ...params }) -> Pipedream.GetTriggerWorkflowsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get workflows connected to receive events from this trigger
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.listWorkflows("trigger_id", {
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.DeployedTriggersListWorkflowsRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">updateWorkflows</a>(triggerId, { ...params }) -> Pipedream.GetTriggerWorkflowsResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Connect or disconnect workflows to receive trigger events
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.updateWorkflows("trigger_id", {
    externalUserId: "external_user_id",
    workflowIds: ["workflow_ids"]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.UpdateTriggerWorkflowsOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">listWebhooks</a>(triggerId, { ...params }) -> Pipedream.GetTriggerWebhooksResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get webhook URLs configured to receive trigger events
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.listWebhooks("trigger_id", {
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.DeployedTriggersListWebhooksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">updateWebhooks</a>(triggerId, { ...params }) -> Pipedream.GetTriggerWebhooksResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Configure webhook URLs to receive trigger events. `signing_key` is only returned for OAuth-authenticated requests.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.updateWebhooks("trigger_id", {
    externalUserId: "external_user_id",
    webhookUrls: ["webhook_urls"]
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.UpdateTriggerWebhooksOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">retrieveWebhook</a>(triggerId, webhookId, { ...params }) -> Pipedream.GetWebhookWithSigningKeyResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve a specific webhook for a deployed trigger, including its signing key
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.retrieveWebhook("trigger_id", "webhook_id", {
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**webhookId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.DeployedTriggersRetrieveWebhookRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">regenerateWebhookSigningKey</a>(triggerId, webhookId, { ...params }) -> Pipedream.GetWebhookWithSigningKeyResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Regenerate the signing key for a specific webhook on a deployed trigger
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.regenerateWebhookSigningKey("trigger_id", "webhook_id", {
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**triggerId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**webhookId:** `string` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.DeployedTriggersRegenerateWebhookSigningKeyRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `DeployedTriggers.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## ProjectEnvironment
<details><summary><code>client.projectEnvironment.<a href="/src/api/resources/projectEnvironment/client/Client.ts">retrieveWebhook</a>() -> Pipedream.GetWebhookResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve the webhook configured for a project environment
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projectEnvironment.retrieveWebhook();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `ProjectEnvironment.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projectEnvironment.<a href="/src/api/resources/projectEnvironment/client/Client.ts">updateWebhook</a>({ ...params }) -> Pipedream.SetWebhookResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create or update the webhook URL for a project environment. Creating a webhook returns `signing_key`; updating an existing webhook does not.
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projectEnvironment.updateWebhook({
    url: "url"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.SetWebhookOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `ProjectEnvironment.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projectEnvironment.<a href="/src/api/resources/projectEnvironment/client/Client.ts">deleteWebhook</a>() -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Remove the webhook configured for a project environment
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projectEnvironment.deleteWebhook();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `ProjectEnvironment.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projectEnvironment.<a href="/src/api/resources/projectEnvironment/client/Client.ts">regenerateWebhookSigningKey</a>() -> Pipedream.GetWebhookWithSigningKeyResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Regenerate the signing key for the project environment webhook
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projectEnvironment.regenerateWebhookSigningKey();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `ProjectEnvironment.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Projects
<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">list</a>({ ...params }) -> core.Page&lt;Pipedream.Project&gt;</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

List the projects that are available to the authenticated Connect client
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.projects.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q"
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
let page = await client.projects.list({
    after: "after",
    before: "before",
    limit: 1,
    q: "q"
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.ProjectsListRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Projects.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">create</a>({ ...params }) -> Pipedream.Project</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Create a new project for the authenticated workspace
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.create({
    name: "name"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.CreateProjectOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Projects.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">retrieve</a>(projectId) -> Pipedream.Project</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Get the project details for a specific project
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.retrieve("project_id");

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**projectId:** `string` — The project ID, which starts with `proj_`.
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Projects.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">delete</a>(projectId) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Delete a project owned by the authenticated workspace
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.delete("project_id");

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**projectId:** `string` — The project ID, which starts with `proj_`.
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Projects.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">update</a>(projectId, { ...params }) -> Pipedream.Project</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Update project details or application information
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.update("project_id");

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**projectId:** `string` — The project ID, which starts with `proj_`.
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.UpdateProjectOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Projects.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">updateLogo</a>(projectId, { ...params }) -> void</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Upload or replace the project logo
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.updateLogo("project_id", {
    logo: "data:image/png;base64,AAAAAA..."
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**projectId:** `string` — The project ID, which starts with `proj_`.
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.UpdateProjectLogoOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Projects.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">retrieveInfo</a>() -> Pipedream.ProjectInfoResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve project configuration and environment details
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.projects.retrieveInfo();

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**requestOptions:** `Projects.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## FileStash
<details><summary><code>client.fileStash.<a href="/src/api/resources/fileStash/client/Client.ts">downloadFile</a>({ ...params }) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Download a file from File Stash
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.fileStash.downloadFile({
    s3Key: "s3_key"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.FileStashDownloadFileRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `FileStash.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Proxy
<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">get</a>(url64, { ...params }) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Forward an authenticated GET request to an external API using an external user's account credentials
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.get("url_64", {
    externalUserId: "external_user_id",
    accountId: "account_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**url64:** `string` — Base64-encoded target URL
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.ProxyGetRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Proxy.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">post</a>(url64, { ...params }) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Forward an authenticated POST request to an external API using an external user's account credentials
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.post("url_64", {
    externalUserId: "external_user_id",
    accountId: "account_id",
    body: {
        "string": {
            "key": "value"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**url64:** `string` — Base64-encoded target URL
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.ProxyPostRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Proxy.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">put</a>(url64, { ...params }) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Forward an authenticated PUT request to an external API using an external user's account credentials
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.put("url_64", {
    externalUserId: "external_user_id",
    accountId: "account_id",
    body: {
        "string": {
            "key": "value"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**url64:** `string` — Base64-encoded target URL
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.ProxyPutRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Proxy.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">delete</a>(url64, { ...params }) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Forward an authenticated DELETE request to an external API using an external user's account credentials
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.delete("url_64", {
    externalUserId: "external_user_id",
    accountId: "account_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**url64:** `string` — Base64-encoded target URL
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.ProxyDeleteRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Proxy.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">patch</a>(url64, { ...params }) -> core.BinaryResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Forward an authenticated PATCH request to an external API using an external user's account credentials
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.patch("url_64", {
    externalUserId: "external_user_id",
    accountId: "account_id",
    body: {
        "string": {
            "key": "value"
        }
    }
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**url64:** `string` — Base64-encoded target URL
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.ProxyPatchRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Proxy.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Tokens
<details><summary><code>client.tokens.<a href="/src/api/resources/tokens/client/Client.ts">create</a>({ ...params }) -> Pipedream.CreateTokenResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Generate a Connect token to use for client-side authentication
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokens.create({
    externalUserId: "external_user_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.CreateTokenOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tokens.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tokens.<a href="/src/api/resources/tokens/client/Client.ts">validate</a>(ctok, { ...params }) -> Pipedream.ValidateTokenResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Confirm the validity of a Connect token
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokens.validate("ctok", {
    appId: "app_id",
    oauthAppId: "oauth_app_id"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**ctok:** `Pipedream.ConnectToken` 
    
</dd>
</dl>

<dl>
<dd>

**request:** `Pipedream.TokensValidateRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Tokens.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Usage
<details><summary><code>client.usage.<a href="/src/api/resources/usage/client/Client.ts">list</a>({ ...params }) -> Pipedream.ConnectUsageResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Retrieve Connect usage records for a time window
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.usage.list({
    startTs: 1,
    endTs: 1
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.UsageListRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Usage.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## OauthTokens
<details><summary><code>client.oauthTokens.<a href="/src/api/resources/oauthTokens/client/Client.ts">create</a>({ ...params }) -> Pipedream.CreateOAuthTokenResponse</code></summary>
<dl>
<dd>

#### 📝 Description

<dl>
<dd>

<dl>
<dd>

Exchange OAuth credentials for an access token
</dd>
</dl>
</dd>
</dl>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.oauthTokens.create({
    clientId: "client_id",
    clientSecret: "client_secret"
});

```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.CreateOAuthTokenOpts` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `OauthTokens.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

## Workflows

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">invoke</a>({ ...params }, authType?) -> unknown</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
// Invoke with URL
await client.workflows.invoke({
    urlOrEndpoint: "https://en-your-endpoint.m.pipedream.net",
    body: {
        foo: 123,
        bar: "abc",
        baz: null,
    },
    headers: {
        Accept: "application/json",
    },
});

// Invoke with endpoint ID
await client.workflows.invoke({
    urlOrEndpoint: "en123",
    body: {
        message: "Hello, World!",
    },
}, Pipedream.HTTPAuthType.OAuth);
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.InvokeWorkflowOpts`

</dd>
</dl>

<dl>
<dd>

**authType:** `Pipedream.HTTPAuthType` — The type of authorization to use for the request (defaults to None)

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>

<details><summary><code>client.workflows.<a href="/src/api/resources/workflows/client/Client.ts">invokeForExternalUser</a>({ ...params }) -> unknown</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.workflows.invokeForExternalUser({
    urlOrEndpoint: "https://your-workflow-url.m.pipedream.net",
    externalUserId: "your-external-user-id",
    body: {
        foo: 123,
        bar: "abc",
        baz: null,
    },
    headers: {
        Accept: "application/json",
    },
});
```

</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `Pipedream.InvokeWorkflowForExternalUserOpts`

</dd>
</dl>

<dl>
<dd>

**requestOptions:** `Workflows.RequestOptions`

</dd>
</dl>
</dd>
</dl>

</dd>
</dl>
</details>
