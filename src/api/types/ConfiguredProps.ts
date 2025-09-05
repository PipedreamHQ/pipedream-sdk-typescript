import type * as Pipedream from "./index.js";

export type ConfigurableProps = Readonly<Pipedream.ConfigurableProp[]>;

export type PropTypeMap = {
    alert: never;
    any: Pipedream.ConfiguredPropValueAny;
    app: Pipedream.ConfiguredPropValueApp;
    boolean: Pipedream.ConfiguredPropValueBoolean;
    integer: Pipedream.ConfiguredPropValueInteger;
    object: Pipedream.ConfiguredPropValueObject;
    string: Pipedream.ConfiguredPropValueString;
    "string[]": Pipedream.ConfiguredPropValueStringArray;
    sql: Pipedream.ConfiguredPropValueSql;
};
export type PropValue<T extends Pipedream.ConfigurableProp["type"]> = T extends keyof PropTypeMap
    ? PropTypeMap[T]
    : never;

/**
 * The configured properties of the component
 */
export type ConfiguredProps<T extends ConfigurableProps = ConfigurableProps> = {
    [K in T[number] as K["name"]]?: PropValue<K["type"]>;
};
