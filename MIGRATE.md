<!-- markdownlint-disable MD024 -->
# Migrating from v2.x

This guide will help you migrate your existing Pipedream SDK v2.x integration to
the latest version. If you are still on v1.x, start with the [v1.x migration
guide](./MIGRATE-v1.md) first.

## Table of contents

- [Migrating from v2.x](#migrating-from-v2x)
  - [Table of contents](#table-of-contents)
  - [Deprecation](#deprecation)
  - [Breaking changes](#breaking-changes)
  - [Unchanged in v3.x](#unchanged-in-v3x)
  - [Type migration](#type-migration)
    - [`ConfigurableProp` namespace removed](#configurableprop-namespace-removed)
      - [v2.x (old)](#v2x-old)
      - [v3.x (new)](#v3x-new)
    - [`ConfigurablePropBase` no longer in the inheritance chain](#configurablepropbase-no-longer-in-the-inheritance-chain)
      - [v2.x (old)](#v2x-old-1)
      - [v3.x (new)](#v3x-new-1)
    - [`Emitter` namespace removed](#emitter-namespace-removed)
      - [v2.x (old)](#v2x-old-2)
      - [v3.x (new)](#v3x-new-2)
    - [Narrowing emitters with the new `type` discriminator](#narrowing-emitters-with-the-new-type-discriminator)
      - [v2.x (old)](#v2x-old-3)
      - [v3.x (new)](#v3x-new-3)
    - [Discord configurable prop types removed](#discord-configurable-prop-types-removed)
      - [v2.x (old)](#v2x-old-4)
      - [v3.x (new)](#v3x-new-4)
  - [Type mapping](#type-mapping)
  - [New features in v3.x](#new-features-in-v3x)
    - [Flatter, easier-to-narrow discriminated unions](#flatter-easier-to-narrow-discriminated-unions)
    - [Explicit `type` field on emitter members](#explicit-type-field-on-emitter-members)
  - [Partial migration](#partial-migration)
  - [Important removed functionality](#important-removed-functionality)
  - [Migration checklist](#migration-checklist)

## Deprecation

The v2.x version of the Pipedream SDK is now deprecated. This means that no
changes will be made to this version unless there are critical security issues.
We recommend that you migrate to the latest version of the SDK to take advantage
of new features, improvements, and bug fixes if possible.

## Breaking changes

The v3.x SDK is a focused type-system release. The runtime behavior, network
calls, environment variables, and public method surface are all unchanged from
v2.x — the only changes you need to make are to TypeScript code that imports or
narrows the affected types. Below is a summary of the breaking changes:

- **Flattened `ConfigurableProp` union**: The `ConfigurableProp` namespace has
  been removed. Variants like `Pipedream.ConfigurableProp.Alert` are now
  imported directly as `Pipedream.ConfigurablePropAlert`.
- **Flattened `Emitter` union**: The `Emitter` namespace has been removed.
  `Pipedream.Emitter.DeployedComponent` is now `Pipedream.DeployedComponent`,
  and likewise for `HttpInterface` and `TimerInterface`.
- **`ConfigurablePropBase` no longer extended**: Each
  `ConfigurableProp{Variant}` interface now inlines the base fields (`name`,
  `label`, `description`, `optional`, `disabled`, `readOnly`, `hidden`,
  `remoteOptions`, `useQuery`, `reloadProps`, `withLabel`) and includes its
  literal `type` field directly. The shape of values your code receives is
  unchanged, but any code that references `ConfigurablePropBase` directly must
  be updated.
- **Discord prop types removed**: `ConfigurablePropDiscord` and
  `ConfigurablePropDiscordType` have been removed. Use the existing
  `ConfigurablePropDiscordChannel` and `ConfigurablePropDiscordChannelArray`
  variants instead.
- **`type` discriminator added to emitter members**: `DeployedComponent`,
  `HttpInterface`, and `TimerInterface` each now carry a literal `type` field
  (`"DeployedComponent"`, `"HttpInterface"`, `"TimerInterface"`). This is
  additive on responses you read, but if your code constructs these objects by
  hand you'll need to include the new field.

## Unchanged in v3.x

To save you time scanning the rest of this guide, the following remain identical
to v2.x:

- Client initialization (`new PipedreamClient({ … })`) and all constructor
  options (`clientId`, `clientSecret`, `projectId`, `projectEnvironment`,
  `workflowDomain`, `tokenCallback`, etc.).
- All environment variables (`PIPEDREAM_CLIENT_ID`, `PIPEDREAM_CLIENT_SECRET`,
  `PIPEDREAM_PROJECT_ID`, `PIPEDREAM_PROJECT_ENVIRONMENT`, `PIPEDREAM_BASE_URL`,
  `PIPEDREAM_WORKFLOW_DOMAIN`).
- All namespaced method names and signatures (`client.actions.run()`,
  `client.proxy.get()`, `client.workflows.invoke()`, etc.).
- Browser/server entrypoints (`@pipedream/sdk`, `@pipedream/sdk/browser`,
  `@pipedream/sdk/server`).
- Pagination, request options, abort signals, and `.withRawResponse()` chaining.
- The `PipedreamError` class and error-handling shape.

If your v2.x code does not import any `ConfigurableProp*` or `Emitter*` types
explicitly, it will most likely compile against v3.x without changes.

## Type migration

### `ConfigurableProp` namespace removed

The `ConfigurableProp` discriminated union now references the per-variant
interfaces directly instead of nesting them under a namespace.

#### v2.x (old)

```typescript
import { Pipedream } from '@pipedream/sdk';

function describeProp(prop: Pipedream.ConfigurableProp) {
  if (prop.type === 'alert') {
    const alert: Pipedream.ConfigurableProp.Alert = prop;
    return alert.content;
  }
  if (prop.type === 'app') {
    const app: Pipedream.ConfigurableProp.App = prop;
    return app.name;
  }
}
```

#### v3.x (new)

```typescript
import { Pipedream } from '@pipedream/sdk';

function describeProp(prop: Pipedream.ConfigurableProp) {
  if (prop.type === 'alert') {
    const alert: Pipedream.ConfigurablePropAlert = prop;
    return alert.content;
  }
  if (prop.type === 'app') {
    const app: Pipedream.ConfigurablePropApp = prop;
    return app.name;
  }
}
```

A complete name-by-name table is in [Type mapping](#type-mapping) below.

### `ConfigurablePropBase` no longer in the inheritance chain

Each `ConfigurableProp{Variant}` interface used to extend
`ConfigurablePropBase`. In v3.x, the base fields are inlined into every variant
and the literal `type` field is part of the variant interface itself. The fields
you can read from a value are unchanged — only code that references
`ConfigurablePropBase` directly needs to be updated.

#### v2.x (old)

```typescript
import { type Pipedream } from '@pipedream/sdk';

// `ConfigurablePropBase` could be used to type any "shared" prop fields
function isOptional(prop: Pipedream.ConfigurablePropBase): boolean {
  return prop.optional ?? false;
}
```

#### v3.x (new)

```typescript
import { type Pipedream } from '@pipedream/sdk';

// Use the union directly — every variant carries the previously-shared fields
function isOptional(prop: Pipedream.ConfigurableProp): boolean {
  return prop.optional ?? false;
}
```

### `Emitter` namespace removed

Same flattening as `ConfigurableProp`: `Pipedream.Emitter` is now a union of the
underlying types directly, with no namespaced wrappers.

#### v2.x (old)

```typescript
import { Pipedream } from '@pipedream/sdk';

function emitterId(e: Pipedream.Emitter): string {
  if (e.type === 'DeployedComponent') {
    const dc: Pipedream.Emitter.DeployedComponent = e;
    return dc.id;
  }
  if (e.type === 'HttpInterface') {
    const http: Pipedream.Emitter.HttpInterface = e;
    return http.id;
  }
  const timer: Pipedream.Emitter.TimerInterface = e;
  return timer.id;
}
```

#### v3.x (new)

```typescript
import { Pipedream } from '@pipedream/sdk';

function emitterId(e: Pipedream.Emitter): string {
  if (e.type === 'DeployedComponent') {
    const dc: Pipedream.DeployedComponent = e;
    return dc.id;
  }
  if (e.type === 'HttpInterface') {
    const http: Pipedream.HttpInterface = e;
    return http.id;
  }
  const timer: Pipedream.TimerInterface = e;
  return timer.id;
}
```

### Narrowing emitters with the new `type` discriminator

`DeployedComponent`, `HttpInterface`, and `TimerInterface` each gained a literal
`type` field. This makes the `Emitter` union narrowable via the standard
discriminated-union pattern. The field is always present on responses, so
existing code that consumed these types will see the new field on objects it
already had — typically a transparent change. The only caveat is if your code
constructs these objects by hand (e.g. for tests or fixtures), in which case the
`type` field is now required.

#### v2.x (old)

```typescript
const fixture: Pipedream.DeployedComponent = {
  id: 'dc_1',
  ownerId: 'u_1',
  componentId: 'c_1',
  componentKey: 'k_1',
  configurableProps: [],
  configuredProps: {},
  active: true,
  createdAt: 1,
  updatedAt: 1,
  name: 'fixture',
  nameSlug: 'fixture',
};
```

#### v3.x (new)

```typescript
const fixture: Pipedream.DeployedComponent = {
  type: 'DeployedComponent', // now required
  id: 'dc_1',
  ownerId: 'u_1',
  componentId: 'c_1',
  componentKey: 'k_1',
  configurableProps: [],
  configuredProps: {},
  active: true,
  createdAt: 1,
  updatedAt: 1,
  name: 'fixture',
  nameSlug: 'fixture',
};
```

### Discord configurable prop types removed

The generic `ConfigurablePropDiscord` wrapper and its
`ConfigurablePropDiscordType` enum have been removed. The concrete variants that
were already exported in v2.x — `ConfigurablePropDiscordChannel` and
`ConfigurablePropDiscordChannelArray` — remain and should be used directly.

#### v2.x (old)

```typescript
import { type Pipedream } from '@pipedream/sdk';

function isDiscordChannelProp(p: Pipedream.ConfigurableProp): boolean {
  return (p as Pipedream.ConfigurablePropDiscord).type ===
    Pipedream.ConfigurablePropDiscordType.DiscordChannel;
}
```

#### v3.x (new)

```typescript
import { type Pipedream } from '@pipedream/sdk';

function isDiscordChannelProp(p: Pipedream.ConfigurableProp): boolean {
  return p.type === '$.discord.channel';
}

// Or, with full type narrowing:
function asDiscordChannel(
  p: Pipedream.ConfigurableProp,
): Pipedream.ConfigurablePropDiscordChannel | undefined {
  return p.type === '$.discord.channel' ? p : undefined;
}
```

## Type mapping

Here's a complete list of how v2.x namespaced types map to v3.x flat types:

| v2.x Type                              | v3.x Type                                      |
| -------------------------------------- | ---------------------------------------------- |
| `ConfigurableProp.Alert`               | `ConfigurablePropAlert`                        |
| `ConfigurableProp.Any`                 | `ConfigurablePropAny`                          |
| `ConfigurableProp.App`                 | `ConfigurablePropApp`                          |
| `ConfigurableProp.Boolean`             | `ConfigurablePropBoolean`                      |
| `ConfigurableProp.DataStore`           | `ConfigurablePropDataStore`                    |
| `ConfigurableProp.Dir`                 | `ConfigurablePropDir`                          |
| `ConfigurableProp.InterfaceTimer`      | `ConfigurablePropTimer`                        |
| `ConfigurableProp.InterfaceApphook`    | `ConfigurablePropApphook`                      |
| `ConfigurableProp.IntegerArray`        | `ConfigurablePropIntegerArray`                 |
| `ConfigurableProp.InterfaceHttp`       | `ConfigurablePropHttp`                         |
| `ConfigurableProp.HttpRequest`         | `ConfigurablePropHttpRequest`                  |
| `ConfigurableProp.ServiceDb`           | `ConfigurablePropDb`                           |
| `ConfigurableProp.Sql`                 | `ConfigurablePropSql`                          |
| `ConfigurableProp.AirtableBaseId`      | `ConfigurablePropAirtableBaseId`               |
| `ConfigurableProp.AirtableTableId`     | `ConfigurablePropAirtableTableId`              |
| `ConfigurableProp.AirtableViewId`      | `ConfigurablePropAirtableViewId`               |
| `ConfigurableProp.AirtableFieldId`     | `ConfigurablePropAirtableFieldId`              |
| `ConfigurableProp.DiscordChannel`      | `ConfigurablePropDiscordChannel`               |
| `ConfigurableProp.DiscordChannelArray` | `ConfigurablePropDiscordChannelArray`          |
| `ConfigurableProp.Integer`             | `ConfigurablePropInteger`                      |
| `ConfigurableProp.Object`              | `ConfigurablePropObject`                       |
| `ConfigurableProp.String`              | `ConfigurablePropString`                       |
| `ConfigurableProp.StringArray`         | `ConfigurablePropStringArray`                  |
| `ConfigurablePropBase`                 | Removed (fields inlined per variant)           |
| `ConfigurablePropDiscord`              | Removed (use `ConfigurablePropDiscordChannel`) |
| `ConfigurablePropDiscordType`          | Removed (use the literal `type` strings)       |
| `Emitter.DeployedComponent`            | `DeployedComponent`                            |
| `Emitter.HttpInterface`                | `HttpInterface`                                |
| `Emitter.TimerInterface`               | `TimerInterface`                               |

## New features in v3.x

The v3.x SDK does not introduce new endpoints or new methods. The improvements
are entirely in the type system:

### Flatter, easier-to-narrow discriminated unions

Each `ConfigurableProp{Variant}` interface now stands on its own, with the
literal `type` field declared on the variant itself rather than imposed by a
nested namespace wrapper. This means TypeScript narrows
`Pipedream.ConfigurableProp` cleanly with a plain `switch (prop.type)` or `if
(prop.type === 'alert')` — without any namespace gymnastics — and IDE
autocomplete surfaces every prop field directly.

```typescript
import { type Pipedream } from '@pipedream/sdk';

function summarize(prop: Pipedream.ConfigurableProp): string {
  switch (prop.type) {
    case 'alert':
      return prop.content; // narrowed to ConfigurablePropAlert
    case 'string':
      return prop.label ?? prop.name; // narrowed to ConfigurablePropString
    case 'integer':
      return String(prop.default ?? prop.name);
    default:
      return prop.name;
  }
}
```

### Explicit `type` field on emitter members

`DeployedComponent`, `HttpInterface`, and `TimerInterface` now each carry a
literal `type` field, which makes `Pipedream.Emitter` narrowable the same way:

```typescript
import { type Pipedream } from '@pipedream/sdk';

function describe(e: Pipedream.Emitter): string {
  switch (e.type) {
    case 'DeployedComponent':
      return `component ${e.componentKey}`;
    case 'HttpInterface':
      return `http ${e.id}`;
    case 'TimerInterface':
      return `timer ${e.id}`;
  }
}
```

## Partial migration

If you are unable to migrate all your code at once, you can use the new SDK
alongside the old one by leveraging package aliases. This allows you to migrate
incrementally without breaking your existing codebase. To do this, you can
install the new SDK with an alias:

```bash
npm install @pipedream/sdk-v3@npm:@pipedream/sdk@^3.0.0 --save
```

Then, in your code, you can import each version separately:

```typescript
import { Pipedream as PipedreamV2 } from '@pipedream/sdk';
import { Pipedream as PipedreamV3, PipedreamClient } from '@pipedream/sdk-v3';

const client = new PipedreamClient({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  projectId: 'your-project-id',
  projectEnvironment: 'development',
});

// Old code continues to type-check against v2.x types
function legacyHandler(prop: PipedreamV2.ConfigurableProp.Alert) {
  return prop.content;
}

// Newly migrated code uses v3.x types
function migratedHandler(prop: PipedreamV3.ConfigurablePropAlert) {
  return prop.content;
}
```

## Important removed functionality

The following exports have been removed in v3.x:

1. **`ConfigurableProp` namespace members** (e.g.
   `Pipedream.ConfigurableProp.Alert`) — replaced by flat per-variant interfaces
   (e.g. `Pipedream.ConfigurablePropAlert`). See [Type mapping](#type-mapping).
2. **`Emitter` namespace members** (e.g. `Pipedream.Emitter.HttpInterface`) —
   replaced by direct references to the underlying types
   (`Pipedream.HttpInterface`).
3. **`ConfigurablePropBase`** — base fields are now inlined into each
   `ConfigurableProp{Variant}` interface. There is no longer a single shared
   base type.
4. **`ConfigurablePropDiscord`** — use the concrete variants
   `ConfigurablePropDiscordChannel` or `ConfigurablePropDiscordChannelArray`
   instead.
5. **`ConfigurablePropDiscordType`** — use the literal `type` strings (e.g.
   `'$.discord.channel'`) directly.

## Migration checklist

- [ ] Update imports of `Pipedream.ConfigurableProp.{Variant}` types to the flat
      `Pipedream.ConfigurableProp{Variant}` form.
- [ ] Update imports of `Pipedream.Emitter.{Member}` types to
      `Pipedream.{Member}` (e.g. `Pipedream.DeployedComponent`).
- [ ] Replace any references to `ConfigurablePropBase` with the
      `ConfigurableProp` union (or with the specific variant your code expects).
- [ ] Replace any usage of `ConfigurablePropDiscord` /
      `ConfigurablePropDiscordType` with `ConfigurablePropDiscordChannel` /
      `ConfigurablePropDiscordChannelArray` and the literal `type` strings.
- [ ] If you construct `DeployedComponent`, `HttpInterface`, or `TimerInterface`
      objects by hand (e.g. in tests or fixtures), add the new `type`
      discriminator field.
- [ ] Run `tsc --noEmit` to surface any remaining type-only call sites.
- [ ] Test all migrated code thoroughly.
- [ ] Remove the v2 SDK dependency once migration is complete.
