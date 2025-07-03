# Reference

## AppCategories

<details><summary><code>client.appCategories.<a href="/src/api/resources/appCategories/client/Client.ts">list</a>() -> Pipedream.ListAppCategoriesResponse</code></summary>
<dl>
<dd>

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

<details><summary><code>client.apps.<a href="/src/api/resources/apps/client/Client.ts">list</a>({ ...params }) -> core.Page<Pipedream.App></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.apps.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.apps.list();
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

<details><summary><code>client.accounts.<a href="/src/api/resources/accounts/client/Client.ts">list</a>({ ...params }) -> core.Page<Pipedream.Account></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.accounts.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.accounts.list();
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.create({
    app_slug: "app_slug",
    cfmap_json: "cfmap_json",
    connect_token: "connect_token",
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

**request:** `Pipedream.CreateAccountRequest`

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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.accounts.retrieve("account_id");
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

## Components

<details><summary><code>client.components.<a href="/src/api/resources/components/client/Client.ts">list</a>({ ...params }) -> core.Page<Pipedream.Component></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.components.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.components.list();
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

<details><summary><code>client.components.<a href="/src/api/resources/components/client/Client.ts">retrieve</a>(componentId) -> Pipedream.GetComponentResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.components.retrieve("component_id");
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.components.configureProp({
    body: {
        id: "id",
        external_user_id: "external_user_id",
        prop_name: "prop_name",
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

**request:** `Pipedream.ComponentsConfigurePropRequest`

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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.components.reloadProps({
    body: {
        id: "id",
        external_user_id: "external_user_id",
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

**request:** `Pipedream.ComponentsReloadPropsRequest`

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

<details><summary><code>client.actions.<a href="/src/api/resources/actions/client/Client.ts">list</a>({ ...params }) -> core.Page<Pipedream.Component></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.actions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.actions.list();
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

<details><summary><code>client.actions.<a href="/src/api/resources/actions/client/Client.ts">retrieve</a>(componentId) -> Pipedream.GetComponentResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.retrieve("component_id");
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.configureProp({
    body: {
        id: "id",
        external_user_id: "external_user_id",
        prop_name: "prop_name",
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

**request:** `Pipedream.ActionsConfigurePropRequest`

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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.reloadProps({
    body: {
        id: "id",
        external_user_id: "external_user_id",
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

**request:** `Pipedream.ActionsReloadPropsRequest`

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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.actions.run({
    id: "id",
    external_user_id: "external_user_id",
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

<details><summary><code>client.triggers.<a href="/src/api/resources/triggers/client/Client.ts">list</a>({ ...params }) -> core.Page<Pipedream.Component></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.triggers.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.triggers.list();
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

<details><summary><code>client.triggers.<a href="/src/api/resources/triggers/client/Client.ts">retrieve</a>(componentId) -> Pipedream.GetComponentResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.triggers.retrieve("component_id");
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.triggers.configureProp({
    body: {
        id: "id",
        external_user_id: "external_user_id",
        prop_name: "prop_name",
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

**request:** `Pipedream.TriggersConfigurePropRequest`

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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.triggers.reloadProps({
    body: {
        id: "id",
        external_user_id: "external_user_id",
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

**request:** `Pipedream.TriggersReloadPropsRequest`

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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.triggers.deploy({
    id: "id",
    external_user_id: "external_user_id",
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

<details><summary><code>client.deployedTriggers.<a href="/src/api/resources/deployedTriggers/client/Client.ts">list</a>({ ...params }) -> core.Page<Pipedream.DeployedComponent></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
const response = await client.deployedTriggers.list({
    external_user_id: "external_user_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.deployedTriggers.list({
    external_user_id: "external_user_id",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.retrieve("trigger_id", {
    external_user_id: "external_user_id",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.update("trigger_id", {
    external_user_id: "external_user_id",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.delete("trigger_id", {
    external_user_id: "external_user_id",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.listEvents("trigger_id", {
    external_user_id: "external_user_id",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.listWorkflows("trigger_id", {
    external_user_id: "external_user_id",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.updateWorkflows("trigger_id", {
    external_user_id: "external_user_id",
    workflow_ids: ["workflow_ids"],
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.listWebhooks("trigger_id", {
    external_user_id: "external_user_id",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.deployedTriggers.updateWebhooks("trigger_id", {
    external_user_id: "external_user_id",
    webhook_urls: ["webhook_urls"],
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

## Projects

<details><summary><code>client.projects.<a href="/src/api/resources/projects/client/Client.ts">retrieveInfo</a>() -> Pipedream.ProjectInfoResponse</code></summary>
<dl>
<dd>

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

## Proxy

<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">get</a>(url64, { ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.get("url_64", {
    external_user_id: "external_user_id",
    account_id: "account_id",
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

<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">post</a>(url64, { ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.post("url_64", {
    external_user_id: "external_user_id",
    account_id: "account_id",
    body: {
        key: "value",
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

<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">put</a>(url64, { ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.put("url_64", {
    external_user_id: "external_user_id",
    account_id: "account_id",
    body: {
        key: "value",
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

<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">delete</a>(url64, { ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.delete("url_64", {
    external_user_id: "external_user_id",
    account_id: "account_id",
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

<details><summary><code>client.proxy.<a href="/src/api/resources/proxy/client/Client.ts">patch</a>(url64, { ...params }) -> Record<string, unknown></code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.proxy.patch("url_64", {
    external_user_id: "external_user_id",
    account_id: "account_id",
    body: {
        key: "value",
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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokens.create({
    external_user_id: "external_user_id",
    project_id: "project_id",
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

**request:** `Pipedream.CreateTokenRequest`

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

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tokens.validate("ctok");
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

**ctok:** `string`

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

## OauthTokens

<details><summary><code>client.oauthTokens.<a href="/src/api/resources/oauthTokens/client/Client.ts">create</a>({ ...params }) -> Pipedream.CreateOAuthTokenResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.oauthTokens.create({
    client_id: "client_id",
    client_secret: "client_secret",
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
