import { t as ChalkInstance } from "./index-_BS3nWFN.mjs";
import { EventEmitter } from "node:events";
import { AxiosRequestConfig, AxiosResponse, RawAxiosResponseHeaders } from "axios";
import express from "express";

//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/json-schema.d.cts
type _JSONSchema = boolean | JSONSchema;
type JSONSchema = {
  [k: string]: unknown;
  $schema?: "https://json-schema.org/draft/2020-12/schema" | "http://json-schema.org/draft-07/schema#" | "http://json-schema.org/draft-04/schema#";
  $id?: string;
  $anchor?: string;
  $ref?: string;
  $dynamicRef?: string;
  $dynamicAnchor?: string;
  $vocabulary?: Record<string, boolean>;
  $comment?: string;
  $defs?: Record<string, JSONSchema>;
  type?: "object" | "array" | "string" | "number" | "boolean" | "null" | "integer";
  additionalItems?: _JSONSchema;
  unevaluatedItems?: _JSONSchema;
  prefixItems?: _JSONSchema[];
  items?: _JSONSchema | _JSONSchema[];
  contains?: _JSONSchema;
  additionalProperties?: _JSONSchema;
  unevaluatedProperties?: _JSONSchema;
  properties?: Record<string, _JSONSchema>;
  patternProperties?: Record<string, _JSONSchema>;
  dependentSchemas?: Record<string, _JSONSchema>;
  propertyNames?: _JSONSchema;
  if?: _JSONSchema;
  then?: _JSONSchema;
  else?: _JSONSchema;
  allOf?: JSONSchema[];
  anyOf?: JSONSchema[];
  oneOf?: JSONSchema[];
  not?: _JSONSchema;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number | boolean;
  minimum?: number;
  exclusiveMinimum?: number | boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxContains?: number;
  minContains?: number;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  dependentRequired?: Record<string, string[]>;
  enum?: Array<string | number | boolean | null>;
  const?: string | number | boolean | null;
  id?: string;
  title?: string;
  description?: string;
  default?: unknown;
  deprecated?: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  nullable?: boolean;
  examples?: unknown[];
  format?: string;
  contentMediaType?: string;
  contentEncoding?: string;
  contentSchema?: JSONSchema;
  _prefault?: unknown;
};
type BaseSchema = JSONSchema;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/standard-schema.d.cts
/** The Standard interface. */
interface StandardTypedV1<Input = unknown, Output = Input> {
  /** The Standard properties. */
  readonly "~standard": StandardTypedV1.Props<Input, Output>;
}
declare namespace StandardTypedV1 {
  /** The Standard properties interface. */
  interface Props<Input = unknown, Output = Input> {
    /** The version number of the standard. */
    readonly version: 1;
    /** The vendor name of the schema library. */
    readonly vendor: string;
    /** Inferred types associated with the schema. */
    readonly types?: Types<Input, Output> | undefined;
  }
  /** The Standard types interface. */
  interface Types<Input = unknown, Output = Input> {
    /** The input type of the schema. */
    readonly input: Input;
    /** The output type of the schema. */
    readonly output: Output;
  }
  /** Infers the input type of a Standard. */
  type InferInput<Schema extends StandardTypedV1> = NonNullable<Schema["~standard"]["types"]>["input"];
  /** Infers the output type of a Standard. */
  type InferOutput<Schema extends StandardTypedV1> = NonNullable<Schema["~standard"]["types"]>["output"];
}
/** The Standard Schema interface. */
interface StandardSchemaV1<Input = unknown, Output = Input> {
  /** The Standard Schema properties. */
  readonly "~standard": StandardSchemaV1.Props<Input, Output>;
}
declare namespace StandardSchemaV1 {
  /** The Standard Schema properties interface. */
  interface Props<Input = unknown, Output = Input> extends StandardTypedV1.Props<Input, Output> {
    /** Validates unknown input values. */
    readonly validate: (value: unknown, options?: StandardSchemaV1.Options | undefined) => Result<Output> | Promise<Result<Output>>;
  }
  /** The result interface of the validate function. */
  type Result<Output> = SuccessResult<Output> | FailureResult;
  /** The result interface if validation succeeds. */
  interface SuccessResult<Output> {
    /** The typed output value. */
    readonly value: Output;
    /** The absence of issues indicates success. */
    readonly issues?: undefined;
  }
  interface Options {
    /** Implicit support for additional vendor-specific parameters, if needed. */
    readonly libraryOptions?: Record<string, unknown> | undefined;
  }
  /** The result interface if validation fails. */
  interface FailureResult {
    /** The issues of failed validation. */
    readonly issues: ReadonlyArray<Issue>;
  }
  /** The issue interface of the failure output. */
  interface Issue {
    /** The error message of the issue. */
    readonly message: string;
    /** The path of the issue, if any. */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined;
  }
  /** The path segment interface of the issue. */
  interface PathSegment {
    /** The key representing a path segment. */
    readonly key: PropertyKey;
  }
  /** The Standard types interface. */
  interface Types<Input = unknown, Output = Input> extends StandardTypedV1.Types<Input, Output> {}
  /** Infers the input type of a Standard. */
  type InferInput<Schema extends StandardTypedV1> = StandardTypedV1.InferInput<Schema>;
  /** Infers the output type of a Standard. */
  type InferOutput<Schema extends StandardTypedV1> = StandardTypedV1.InferOutput<Schema>;
}
/** The Standard JSON Schema interface. */
interface StandardJSONSchemaV1<Input = unknown, Output = Input> {
  /** The Standard JSON Schema properties. */
  readonly "~standard": StandardJSONSchemaV1.Props<Input, Output>;
}
declare namespace StandardJSONSchemaV1 {
  /** The Standard JSON Schema properties interface. */
  interface Props<Input = unknown, Output = Input> extends StandardTypedV1.Props<Input, Output> {
    /** Methods for generating the input/output JSON Schema. */
    readonly jsonSchema: Converter;
  }
  /** The Standard JSON Schema converter interface. */
  interface Converter {
    /** Converts the input type to JSON Schema. May throw if conversion is not supported. */
    readonly input: (options: StandardJSONSchemaV1.Options) => Record<string, unknown>;
    /** Converts the output type to JSON Schema. May throw if conversion is not supported. */
    readonly output: (options: StandardJSONSchemaV1.Options) => Record<string, unknown>;
  }
  /** The target version of the generated JSON Schema.
   *
   * It is *strongly recommended* that implementers support `"draft-2020-12"` and `"draft-07"`, as they are both in wide use.
   *
   * The `"openapi-3.0"` target is intended as a standardized specifier for OpenAPI 3.0 which is a superset of JSON Schema `"draft-04"`.
   *
   * All other targets can be implemented on a best-effort basis. Libraries should throw if they don't support a specified target.
   */
  type Target = "draft-2020-12" | "draft-07" | "openapi-3.0" | ({} & string);
  /** The options for the input/output methods. */
  interface Options {
    /** Specifies the target version of the generated JSON Schema. Support for all versions is on a best-effort basis. If a given version is not supported, the library should throw. */
    readonly target: Target;
    /** Implicit support for additional vendor-specific parameters, if needed. */
    readonly libraryOptions?: Record<string, unknown> | undefined;
  }
  /** The Standard types interface. */
  interface Types<Input = unknown, Output = Input> extends StandardTypedV1.Types<Input, Output> {}
  /** Infers the input type of a Standard. */
  type InferInput<Schema extends StandardTypedV1> = StandardTypedV1.InferInput<Schema>;
  /** Infers the output type of a Standard. */
  type InferOutput<Schema extends StandardTypedV1> = StandardTypedV1.InferOutput<Schema>;
}
interface StandardSchemaWithJSONProps<Input = unknown, Output = Input> extends StandardSchemaV1.Props<Input, Output>, StandardJSONSchemaV1.Props<Input, Output> {}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/registries.d.cts
declare const $output: unique symbol;
type $output = typeof $output;
declare const $input: unique symbol;
type $input = typeof $input;
type $replace<Meta, S extends $ZodType> = Meta extends $output ? output<S> : Meta extends $input ? input<S> : Meta extends (infer M)[] ? $replace<M, S>[] : Meta extends ((...args: infer P) => infer R) ? (...args: { [K in keyof P]: $replace<P[K], S> }) => $replace<R, S> : Meta extends object ? { [K in keyof Meta]: $replace<Meta[K], S> } : Meta;
type MetadataType = object | undefined;
declare class $ZodRegistry<Meta extends MetadataType = MetadataType, Schema extends $ZodType = $ZodType> {
  _meta: Meta;
  _schema: Schema;
  _map: WeakMap<Schema, $replace<Meta, Schema>>;
  _idmap: Map<string, Schema>;
  add<S extends Schema>(schema: S, ..._meta: undefined extends Meta ? [$replace<Meta, S>?] : [$replace<Meta, S>]): this;
  clear(): this;
  remove(schema: Schema): this;
  get<S extends Schema>(schema: S): $replace<Meta, S> | undefined;
  has(schema: Schema): boolean;
}
interface JSONSchemaMeta {
  id?: string | undefined;
  title?: string | undefined;
  description?: string | undefined;
  deprecated?: boolean | undefined;
  [k: string]: unknown;
}
interface GlobalMeta extends JSONSchemaMeta {}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/to-json-schema.d.cts
type Processor<T extends $ZodType = $ZodType> = (schema: T, ctx: ToJSONSchemaContext, json: BaseSchema, params: ProcessParams) => void;
interface JSONSchemaGeneratorParams {
  processors: Record<string, Processor>;
  /** A registry used to look up metadata for each schema. Any schema with an `id` property will be extracted as a $def.
   *  @default globalRegistry */
  metadata?: $ZodRegistry<Record<string, any>>;
  /** The JSON Schema version to target.
   * - `"draft-2020-12"` — Default. JSON Schema Draft 2020-12
   * - `"draft-07"` — JSON Schema Draft 7
   * - `"draft-04"` — JSON Schema Draft 4
   * - `"openapi-3.0"` — OpenAPI 3.0 Schema Object */
  target?: "draft-04" | "draft-07" | "draft-2020-12" | "openapi-3.0" | ({} & string) | undefined;
  /** How to handle unrepresentable types.
   * - `"throw"` — Default. Unrepresentable types throw an error
   * - `"any"` — Unrepresentable types become `{}` */
  unrepresentable?: "throw" | "any";
  /** Arbitrary custom logic that can be used to modify the generated JSON Schema. */
  override?: (ctx: {
    zodSchema: $ZodTypes;
    jsonSchema: BaseSchema;
    path: (string | number)[];
  }) => void;
  /** Whether to extract the `"input"` or `"output"` type. Relevant to transforms, defaults, coerced primitives, etc.
   * - `"output"` — Default. Convert the output schema.
   * - `"input"` — Convert the input schema. */
  io?: "input" | "output";
  cycles?: "ref" | "throw";
  reused?: "ref" | "inline";
  external?: {
    registry: $ZodRegistry<{
      id?: string | undefined;
    }>;
    uri?: ((id: string) => string) | undefined;
    defs: Record<string, BaseSchema>;
  } | undefined;
}
/**
 * Parameters for the toJSONSchema function.
 */
type ToJSONSchemaParams = Omit<JSONSchemaGeneratorParams, "processors" | "external">;
interface ProcessParams {
  schemaPath: $ZodType[];
  path: (string | number)[];
}
interface Seen {
  /** JSON Schema result for this Zod schema */
  schema: BaseSchema;
  /** A cached version of the schema that doesn't get overwritten during ref resolution */
  def?: BaseSchema;
  defId?: string | undefined;
  /** Number of times this schema was encountered during traversal */
  count: number;
  /** Cycle path */
  cycle?: (string | number)[] | undefined;
  isParent?: boolean | undefined;
  /** Schema to inherit JSON Schema properties from (set by processor for wrappers) */
  ref?: $ZodType | null;
  /** JSON Schema property path for this schema */
  path?: (string | number)[] | undefined;
}
interface ToJSONSchemaContext {
  processors: Record<string, Processor>;
  metadataRegistry: $ZodRegistry<Record<string, any>>;
  target: "draft-04" | "draft-07" | "draft-2020-12" | "openapi-3.0" | ({} & string);
  unrepresentable: "throw" | "any";
  override: (ctx: {
    zodSchema: $ZodType;
    jsonSchema: BaseSchema;
    path: (string | number)[];
  }) => void;
  io: "input" | "output";
  counter: number;
  seen: Map<$ZodType, Seen>;
  cycles: "ref" | "throw";
  reused: "ref" | "inline";
  external?: {
    registry: $ZodRegistry<{
      id?: string | undefined;
    }>;
    uri?: ((id: string) => string) | undefined;
    defs: Record<string, BaseSchema>;
  } | undefined;
}
type ZodStandardSchemaWithJSON$1<T> = StandardSchemaWithJSONProps<input<T>, output<T>>;
interface ZodStandardJSONSchemaPayload<T> extends BaseSchema {
  "~standard": ZodStandardSchemaWithJSON$1<T>;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/util.d.cts
type MimeTypes = "application/json" | "application/xml" | "application/x-www-form-urlencoded" | "application/javascript" | "application/pdf" | "application/zip" | "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/msword" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/vnd.ms-powerpoint" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "application/octet-stream" | "application/graphql" | "text/html" | "text/plain" | "text/css" | "text/javascript" | "text/csv" | "image/png" | "image/jpeg" | "image/gif" | "image/svg+xml" | "image/webp" | "audio/mpeg" | "audio/ogg" | "audio/wav" | "audio/webm" | "video/mp4" | "video/webm" | "video/ogg" | "font/woff" | "font/woff2" | "font/ttf" | "font/otf" | "multipart/form-data" | (string & {});
type IsAny<T> = 0 extends 1 & T ? true : false;
type Omit$1<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type MakePartial<T, K extends keyof T> = Omit$1<T, K> & InexactPartial<Pick<T, K>>;
type NoUndefined<T> = T extends undefined ? never : T;
type LoosePartial<T extends object> = InexactPartial<T> & {
  [k: string]: unknown;
};
type InexactPartial<T> = { [P in keyof T]?: T[P] | undefined };
type BuiltIn = (((...args: any[]) => any) | (new (...args: any[]) => any)) | {
  readonly [Symbol.toStringTag]: string;
} | Date | Error | Generator | Promise<unknown> | RegExp;
type MakeReadonly<T> = T extends Map<infer K, infer V> ? ReadonlyMap<K, V> : T extends Set<infer V> ? ReadonlySet<V> : T extends [infer Head, ...infer Tail] ? readonly [Head, ...Tail] : T extends Array<infer V> ? ReadonlyArray<V> : T extends BuiltIn ? T : Readonly<T>;
type Identity<T> = T;
type Flatten<T> = Identity<{ [k in keyof T]: T[k] }>;
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type TupleItems = ReadonlyArray<SomeType>;
type AnyFunc = (...args: any[]) => any;
type MaybeAsync<T> = T | Promise<T>;
type EnumValue = string | number;
type EnumLike = Readonly<Record<string, EnumValue>>;
type Literal = string | number | bigint | boolean | null | undefined;
type Primitive = string | number | symbol | bigint | boolean | null | undefined;
type HasLength = {
  length: number;
};
type PropValues = Record<string, Set<Primitive>>;
type PrimitiveSet = Set<Primitive>;
type EmptyToNever<T> = keyof T extends never ? never : T;
declare abstract class Class {
  constructor(..._args: any[]);
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/versions.d.cts
declare const version: {
  readonly major: 4;
  readonly minor: 3;
  readonly patch: number;
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/schemas.d.cts
interface ParseContext<T extends $ZodIssueBase = never> {
  /** Customize error messages. */
  readonly error?: $ZodErrorMap<T>;
  /** Include the `input` field in issue objects. Default `false`. */
  readonly reportInput?: boolean;
  /** Skip eval-based fast path. Default `false`. */
  readonly jitless?: boolean;
}
/** @internal */
interface ParseContextInternal<T extends $ZodIssueBase = never> extends ParseContext<T> {
  readonly async?: boolean | undefined;
  readonly direction?: "forward" | "backward";
  readonly skipChecks?: boolean;
}
interface ParsePayload<T = unknown> {
  value: T;
  issues: $ZodRawIssue[];
  /** A may to mark a whole payload as aborted. Used in codecs/pipes. */
  aborted?: boolean;
}
type CheckFn<T> = (input: ParsePayload<T>) => MaybeAsync<void>;
interface $ZodTypeDef {
  type: "string" | "number" | "int" | "boolean" | "bigint" | "symbol" | "null" | "undefined" | "void" | "never" | "any" | "unknown" | "date" | "object" | "record" | "file" | "array" | "tuple" | "union" | "intersection" | "map" | "set" | "enum" | "literal" | "nullable" | "optional" | "nonoptional" | "success" | "transform" | "default" | "prefault" | "catch" | "nan" | "pipe" | "readonly" | "template_literal" | "promise" | "lazy" | "function" | "custom";
  error?: $ZodErrorMap<never> | undefined;
  checks?: $ZodCheck<never>[];
}
interface _$ZodTypeInternals {
  /** The `@zod/core` version of this schema */
  version: typeof version;
  /** Schema definition. */
  def: $ZodTypeDef;
  /** @internal Randomly generated ID for this schema. */
  /** @internal List of deferred initializers. */
  deferred: AnyFunc[] | undefined;
  /** @internal Parses input and runs all checks (refinements). */
  run(payload: ParsePayload<any>, ctx: ParseContextInternal): MaybeAsync<ParsePayload>;
  /** @internal Parses input, doesn't run checks. */
  parse(payload: ParsePayload<any>, ctx: ParseContextInternal): MaybeAsync<ParsePayload>;
  /** @internal  Stores identifiers for the set of traits implemented by this schema. */
  traits: Set<string>;
  /** @internal Indicates that a schema output type should be considered optional inside objects.
   * @default Required
   */
  /** @internal */
  optin?: "optional" | undefined;
  /** @internal */
  optout?: "optional" | undefined;
  /** @internal The set of literal values that will pass validation. Must be an exhaustive set. Used to determine optionality in z.record().
   *
   * Defined on: enum, const, literal, null, undefined
   * Passthrough: optional, nullable, branded, default, catch, pipe
   * Todo: unions?
   */
  values?: PrimitiveSet | undefined;
  /** Default value bubbled up from  */
  /** @internal A set of literal discriminators used for the fast path in discriminated unions. */
  propValues?: PropValues | undefined;
  /** @internal This flag indicates that a schema validation can be represented with a regular expression. Used to determine allowable schemas in z.templateLiteral(). */
  pattern: RegExp | undefined;
  /** @internal The constructor function of this schema. */
  constr: new (def: any) => $ZodType;
  /** @internal A catchall object for bag metadata related to this schema. Commonly modified by checks using `onattach`. */
  bag: Record<string, unknown>;
  /** @internal The set of issues this schema might throw during type checking. */
  isst: $ZodIssueBase;
  /** @internal Subject to change, not a public API. */
  processJSONSchema?: ((ctx: ToJSONSchemaContext, json: BaseSchema, params: ProcessParams) => void) | undefined;
  /** An optional method used to override `toJSONSchema` logic. */
  toJSONSchema?: () => unknown;
  /** @internal The parent of this schema. Only set during certain clone operations. */
  parent?: $ZodType | undefined;
}
/** @internal */
interface $ZodTypeInternals<out O = unknown, out I = unknown> extends _$ZodTypeInternals {
  /** @internal The inferred output type */
  output: O;
  /** @internal The inferred input type */
  input: I;
}
type $ZodStandardSchema<T> = StandardSchemaV1.Props<input<T>, output<T>>;
type SomeType = {
  _zod: _$ZodTypeInternals;
};
interface $ZodType<O = unknown, I = unknown, Internals extends $ZodTypeInternals<O, I> = $ZodTypeInternals<O, I>> {
  _zod: Internals;
  "~standard": $ZodStandardSchema<this>;
}
interface _$ZodType<T extends $ZodTypeInternals = $ZodTypeInternals> extends $ZodType<T["output"], T["input"], T> {}
declare const $ZodType: $constructor<$ZodType>;
interface $ZodStringDef extends $ZodTypeDef {
  type: "string";
  coerce?: boolean;
  checks?: $ZodCheck<string>[];
}
interface $ZodStringInternals<Input> extends $ZodTypeInternals<string, Input> {
  def: $ZodStringDef;
  /** @deprecated Internal API, use with caution (not deprecated) */
  pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: number;
    maximum: number;
    patterns: Set<RegExp>;
    format: string;
    contentEncoding: string;
  }>;
}
interface $ZodString<Input = unknown> extends _$ZodType<$ZodStringInternals<Input>> {}
declare const $ZodString: $constructor<$ZodString>;
interface $ZodNumberDef extends $ZodTypeDef {
  type: "number";
  coerce?: boolean;
}
interface $ZodNumberInternals<Input = unknown> extends $ZodTypeInternals<number, Input> {
  def: $ZodNumberDef;
  /** @deprecated Internal API, use with caution (not deprecated) */
  pattern: RegExp;
  /** @deprecated Internal API, use with caution (not deprecated) */
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: number;
    maximum: number;
    exclusiveMinimum: number;
    exclusiveMaximum: number;
    format: string;
    pattern: RegExp;
  }>;
}
interface $ZodNumber<Input = unknown> extends $ZodType {
  _zod: $ZodNumberInternals<Input>;
}
declare const $ZodNumber: $constructor<$ZodNumber>;
interface $ZodBooleanDef extends $ZodTypeDef {
  type: "boolean";
  coerce?: boolean;
  checks?: $ZodCheck<boolean>[];
}
interface $ZodBooleanInternals<T = unknown> extends $ZodTypeInternals<boolean, T> {
  pattern: RegExp;
  def: $ZodBooleanDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodBoolean<T = unknown> extends $ZodType {
  _zod: $ZodBooleanInternals<T>;
}
declare const $ZodBoolean: $constructor<$ZodBoolean>;
interface $ZodBigIntDef extends $ZodTypeDef {
  type: "bigint";
  coerce?: boolean;
}
interface $ZodBigIntInternals<T = unknown> extends $ZodTypeInternals<bigint, T> {
  pattern: RegExp;
  /** @internal Internal API, use with caution */
  def: $ZodBigIntDef;
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: bigint;
    maximum: bigint;
    format: string;
  }>;
}
interface $ZodBigInt<T = unknown> extends $ZodType {
  _zod: $ZodBigIntInternals<T>;
}
declare const $ZodBigInt: $constructor<$ZodBigInt>;
interface $ZodSymbolDef extends $ZodTypeDef {
  type: "symbol";
}
interface $ZodSymbolInternals extends $ZodTypeInternals<symbol, symbol> {
  def: $ZodSymbolDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodSymbol extends $ZodType {
  _zod: $ZodSymbolInternals;
}
declare const $ZodSymbol: $constructor<$ZodSymbol>;
interface $ZodUndefinedDef extends $ZodTypeDef {
  type: "undefined";
}
interface $ZodUndefinedInternals extends $ZodTypeInternals<undefined, undefined> {
  pattern: RegExp;
  def: $ZodUndefinedDef;
  values: PrimitiveSet;
  isst: $ZodIssueInvalidType;
}
interface $ZodUndefined extends $ZodType {
  _zod: $ZodUndefinedInternals;
}
declare const $ZodUndefined: $constructor<$ZodUndefined>;
interface $ZodNullDef extends $ZodTypeDef {
  type: "null";
}
interface $ZodNullInternals extends $ZodTypeInternals<null, null> {
  pattern: RegExp;
  def: $ZodNullDef;
  values: PrimitiveSet;
  isst: $ZodIssueInvalidType;
}
interface $ZodNull extends $ZodType {
  _zod: $ZodNullInternals;
}
declare const $ZodNull: $constructor<$ZodNull>;
interface $ZodAnyDef extends $ZodTypeDef {
  type: "any";
}
interface $ZodAnyInternals extends $ZodTypeInternals<any, any> {
  def: $ZodAnyDef;
  isst: never;
}
interface $ZodAny extends $ZodType {
  _zod: $ZodAnyInternals;
}
declare const $ZodAny: $constructor<$ZodAny>;
interface $ZodUnknownDef extends $ZodTypeDef {
  type: "unknown";
}
interface $ZodUnknownInternals extends $ZodTypeInternals<unknown, unknown> {
  def: $ZodUnknownDef;
  isst: never;
}
interface $ZodUnknown extends $ZodType {
  _zod: $ZodUnknownInternals;
}
declare const $ZodUnknown: $constructor<$ZodUnknown>;
interface $ZodNeverDef extends $ZodTypeDef {
  type: "never";
}
interface $ZodNeverInternals extends $ZodTypeInternals<never, never> {
  def: $ZodNeverDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodNever extends $ZodType {
  _zod: $ZodNeverInternals;
}
declare const $ZodNever: $constructor<$ZodNever>;
interface $ZodVoidDef extends $ZodTypeDef {
  type: "void";
}
interface $ZodVoidInternals extends $ZodTypeInternals<void, void> {
  def: $ZodVoidDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodVoid extends $ZodType {
  _zod: $ZodVoidInternals;
}
declare const $ZodVoid: $constructor<$ZodVoid>;
interface $ZodDateDef extends $ZodTypeDef {
  type: "date";
  coerce?: boolean;
}
interface $ZodDateInternals<T = unknown> extends $ZodTypeInternals<Date, T> {
  def: $ZodDateDef;
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: Date;
    maximum: Date;
    format: string;
  }>;
}
interface $ZodDate<T = unknown> extends $ZodType {
  _zod: $ZodDateInternals<T>;
}
declare const $ZodDate: $constructor<$ZodDate>;
interface $ZodArrayDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "array";
  element: T;
}
interface $ZodArrayInternals<T extends SomeType = $ZodType> extends _$ZodTypeInternals {
  def: $ZodArrayDef<T>;
  isst: $ZodIssueInvalidType;
  output: output<T>[];
  input: input<T>[];
}
interface $ZodArray<T extends SomeType = $ZodType> extends $ZodType<any, any, $ZodArrayInternals<T>> {}
declare const $ZodArray: $constructor<$ZodArray>;
type OptionalOutSchema = {
  _zod: {
    optout: "optional";
  };
};
type OptionalInSchema = {
  _zod: {
    optin: "optional";
  };
};
type $InferObjectOutput<T extends $ZodLooseShape, Extra extends Record<string, unknown>> = string extends keyof T ? IsAny<T[keyof T]> extends true ? Record<string, unknown> : Record<string, output<T[keyof T]>> : keyof (T & Extra) extends never ? Record<string, never> : Prettify<{ -readonly [k in keyof T as T[k] extends OptionalOutSchema ? never : k]: T[k]["_zod"]["output"] } & { -readonly [k in keyof T as T[k] extends OptionalOutSchema ? k : never]?: T[k]["_zod"]["output"] } & Extra>;
type $InferObjectInput<T extends $ZodLooseShape, Extra extends Record<string, unknown>> = string extends keyof T ? IsAny<T[keyof T]> extends true ? Record<string, unknown> : Record<string, input<T[keyof T]>> : keyof (T & Extra) extends never ? Record<string, never> : Prettify<{ -readonly [k in keyof T as T[k] extends OptionalInSchema ? never : k]: T[k]["_zod"]["input"] } & { -readonly [k in keyof T as T[k] extends OptionalInSchema ? k : never]?: T[k]["_zod"]["input"] } & Extra>;
type $ZodObjectConfig = {
  out: Record<string, unknown>;
  in: Record<string, unknown>;
};
type $ZodShape = Readonly<{
  [k: string]: $ZodType;
}>;
interface $ZodObjectDef<Shape extends $ZodShape = $ZodShape> extends $ZodTypeDef {
  type: "object";
  shape: Shape;
  catchall?: $ZodType | undefined;
}
interface $ZodObjectInternals< /** @ts-ignore Cast variance */out Shape extends $ZodShape = $ZodShape, out Config extends $ZodObjectConfig = $ZodObjectConfig> extends _$ZodTypeInternals {
  def: $ZodObjectDef<Shape>;
  config: Config;
  isst: $ZodIssueInvalidType | $ZodIssueUnrecognizedKeys;
  propValues: PropValues;
  output: $InferObjectOutput<Shape, Config["out"]>;
  input: $InferObjectInput<Shape, Config["in"]>;
  optin?: "optional" | undefined;
  optout?: "optional" | undefined;
}
type $ZodLooseShape = Record<string, any>;
interface $ZodObject< /** @ts-ignore Cast variance */out Shape extends Readonly<$ZodShape> = Readonly<$ZodShape>, out Params extends $ZodObjectConfig = $ZodObjectConfig> extends $ZodType<any, any, $ZodObjectInternals<Shape, Params>> {}
declare const $ZodObject: $constructor<$ZodObject>;
type $InferUnionOutput<T extends SomeType> = T extends any ? output<T> : never;
type $InferUnionInput<T extends SomeType> = T extends any ? input<T> : never;
interface $ZodUnionDef<Options extends readonly SomeType[] = readonly $ZodType[]> extends $ZodTypeDef {
  type: "union";
  options: Options;
  inclusive?: boolean;
}
type IsOptionalIn<T extends SomeType> = T extends OptionalInSchema ? true : false;
type IsOptionalOut<T extends SomeType> = T extends OptionalOutSchema ? true : false;
interface $ZodUnionInternals<T extends readonly SomeType[] = readonly $ZodType[]> extends _$ZodTypeInternals {
  def: $ZodUnionDef<T>;
  isst: $ZodIssueInvalidUnion;
  pattern: T[number]["_zod"]["pattern"];
  values: T[number]["_zod"]["values"];
  output: $InferUnionOutput<T[number]>;
  input: $InferUnionInput<T[number]>;
  optin: IsOptionalIn<T[number]> extends false ? "optional" | undefined : "optional";
  optout: IsOptionalOut<T[number]> extends false ? "optional" | undefined : "optional";
}
interface $ZodUnion<T extends readonly SomeType[] = readonly $ZodType[]> extends $ZodType<any, any, $ZodUnionInternals<T>> {
  _zod: $ZodUnionInternals<T>;
}
declare const $ZodUnion: $constructor<$ZodUnion>;
interface $ZodIntersectionDef<Left extends SomeType = $ZodType, Right extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "intersection";
  left: Left;
  right: Right;
}
interface $ZodIntersectionInternals<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends _$ZodTypeInternals {
  def: $ZodIntersectionDef<A, B>;
  isst: never;
  optin: A["_zod"]["optin"] | B["_zod"]["optin"];
  optout: A["_zod"]["optout"] | B["_zod"]["optout"];
  output: output<A> & output<B>;
  input: input<A> & input<B>;
}
interface $ZodIntersection<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodIntersectionInternals<A, B>;
}
declare const $ZodIntersection: $constructor<$ZodIntersection>;
interface $ZodTupleDef<T extends TupleItems = readonly $ZodType[], Rest extends SomeType | null = $ZodType | null> extends $ZodTypeDef {
  type: "tuple";
  items: T;
  rest: Rest;
}
type $InferTupleInputType<T extends TupleItems, Rest extends SomeType | null> = [...TupleInputTypeWithOptionals<T>, ...(Rest extends SomeType ? input<Rest>[] : [])];
type TupleInputTypeNoOptionals<T extends TupleItems> = { [k in keyof T]: input<T[k]> };
type TupleInputTypeWithOptionals<T extends TupleItems> = T extends readonly [...infer Prefix extends SomeType[], infer Tail extends SomeType] ? Tail["_zod"]["optin"] extends "optional" ? [...TupleInputTypeWithOptionals<Prefix>, input<Tail>?] : TupleInputTypeNoOptionals<T> : [];
type $InferTupleOutputType<T extends TupleItems, Rest extends SomeType | null> = [...TupleOutputTypeWithOptionals<T>, ...(Rest extends SomeType ? output<Rest>[] : [])];
type TupleOutputTypeNoOptionals<T extends TupleItems> = { [k in keyof T]: output<T[k]> };
type TupleOutputTypeWithOptionals<T extends TupleItems> = T extends readonly [...infer Prefix extends SomeType[], infer Tail extends SomeType] ? Tail["_zod"]["optout"] extends "optional" ? [...TupleOutputTypeWithOptionals<Prefix>, output<Tail>?] : TupleOutputTypeNoOptionals<T> : [];
interface $ZodTupleInternals<T extends TupleItems = readonly $ZodType[], Rest extends SomeType | null = $ZodType | null> extends _$ZodTypeInternals {
  def: $ZodTupleDef<T, Rest>;
  isst: $ZodIssueInvalidType | $ZodIssueTooBig<unknown[]> | $ZodIssueTooSmall<unknown[]>;
  output: $InferTupleOutputType<T, Rest>;
  input: $InferTupleInputType<T, Rest>;
}
interface $ZodTuple<T extends TupleItems = readonly $ZodType[], Rest extends SomeType | null = $ZodType | null> extends $ZodType {
  _zod: $ZodTupleInternals<T, Rest>;
}
declare const $ZodTuple: $constructor<$ZodTuple>;
type $ZodRecordKey = $ZodType<string | number | symbol, unknown>;
interface $ZodRecordDef<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "record";
  keyType: Key;
  valueType: Value;
  /** @default "strict" - errors on keys not matching keyType. "loose" passes through non-matching keys unchanged. */
  mode?: "strict" | "loose";
}
type $InferZodRecordOutput<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> = Key extends $partial ? Partial<Record<output<Key>, output<Value>>> : Record<output<Key>, output<Value>>;
type $InferZodRecordInput<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> = Key extends $partial ? Partial<Record<input<Key> & PropertyKey, input<Value>>> : Record<input<Key> & PropertyKey, input<Value>>;
interface $ZodRecordInternals<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> extends $ZodTypeInternals<$InferZodRecordOutput<Key, Value>, $InferZodRecordInput<Key, Value>> {
  def: $ZodRecordDef<Key, Value>;
  isst: $ZodIssueInvalidType | $ZodIssueInvalidKey<Record<PropertyKey, unknown>>;
  optin?: "optional" | undefined;
  optout?: "optional" | undefined;
}
type $partial = {
  "~~partial": true;
};
interface $ZodRecord<Key extends $ZodRecordKey = $ZodRecordKey, Value extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodRecordInternals<Key, Value>;
}
declare const $ZodRecord: $constructor<$ZodRecord>;
interface $ZodMapDef<Key extends SomeType = $ZodType, Value extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "map";
  keyType: Key;
  valueType: Value;
}
interface $ZodMapInternals<Key extends SomeType = $ZodType, Value extends SomeType = $ZodType> extends $ZodTypeInternals<Map<output<Key>, output<Value>>, Map<input<Key>, input<Value>>> {
  def: $ZodMapDef<Key, Value>;
  isst: $ZodIssueInvalidType | $ZodIssueInvalidKey | $ZodIssueInvalidElement<unknown>;
  optin?: "optional" | undefined;
  optout?: "optional" | undefined;
}
interface $ZodMap<Key extends SomeType = $ZodType, Value extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodMapInternals<Key, Value>;
}
declare const $ZodMap: $constructor<$ZodMap>;
interface $ZodSetDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "set";
  valueType: T;
}
interface $ZodSetInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<Set<output<T>>, Set<input<T>>> {
  def: $ZodSetDef<T>;
  isst: $ZodIssueInvalidType;
  optin?: "optional" | undefined;
  optout?: "optional" | undefined;
}
interface $ZodSet<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodSetInternals<T>;
}
declare const $ZodSet: $constructor<$ZodSet>;
type $InferEnumOutput<T extends EnumLike> = T[keyof T] & {};
type $InferEnumInput<T extends EnumLike> = T[keyof T] & {};
interface $ZodEnumDef<T extends EnumLike = EnumLike> extends $ZodTypeDef {
  type: "enum";
  entries: T;
}
interface $ZodEnumInternals< /** @ts-ignore Cast variance */out T extends EnumLike = EnumLike> extends $ZodTypeInternals<$InferEnumOutput<T>, $InferEnumInput<T>> {
  def: $ZodEnumDef<T>;
  /** @deprecated Internal API, use with caution (not deprecated) */
  values: PrimitiveSet;
  /** @deprecated Internal API, use with caution (not deprecated) */
  pattern: RegExp;
  isst: $ZodIssueInvalidValue;
}
interface $ZodEnum<T extends EnumLike = EnumLike> extends $ZodType {
  _zod: $ZodEnumInternals<T>;
}
declare const $ZodEnum: $constructor<$ZodEnum>;
interface $ZodLiteralDef<T extends Literal> extends $ZodTypeDef {
  type: "literal";
  values: T[];
}
interface $ZodLiteralInternals<T extends Literal = Literal> extends $ZodTypeInternals<T, T> {
  def: $ZodLiteralDef<T>;
  values: Set<T>;
  pattern: RegExp;
  isst: $ZodIssueInvalidValue;
}
interface $ZodLiteral<T extends Literal = Literal> extends $ZodType {
  _zod: $ZodLiteralInternals<T>;
}
declare const $ZodLiteral: $constructor<$ZodLiteral>;
type _File = typeof globalThis extends {
  File: infer F extends new (...args: any[]) => any;
} ? InstanceType<F> : {};
/** Do not reference this directly. */
interface File extends _File {
  readonly type: string;
  readonly size: number;
}
interface $ZodFileDef extends $ZodTypeDef {
  type: "file";
}
interface $ZodFileInternals extends $ZodTypeInternals<File, File> {
  def: $ZodFileDef;
  isst: $ZodIssueInvalidType;
  bag: LoosePartial<{
    minimum: number;
    maximum: number;
    mime: MimeTypes[];
  }>;
}
interface $ZodFile extends $ZodType {
  _zod: $ZodFileInternals;
}
declare const $ZodFile: $constructor<$ZodFile>;
interface $ZodTransformDef extends $ZodTypeDef {
  type: "transform";
  transform: (input: unknown, payload: ParsePayload<unknown>) => MaybeAsync<unknown>;
}
interface $ZodTransformInternals<O = unknown, I = unknown> extends $ZodTypeInternals<O, I> {
  def: $ZodTransformDef;
  isst: never;
}
interface $ZodTransform<O = unknown, I = unknown> extends $ZodType {
  _zod: $ZodTransformInternals<O, I>;
}
declare const $ZodTransform: $constructor<$ZodTransform>;
interface $ZodOptionalDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "optional";
  innerType: T;
}
interface $ZodOptionalInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<output<T> | undefined, input<T> | undefined> {
  def: $ZodOptionalDef<T>;
  optin: "optional";
  optout: "optional";
  isst: never;
  values: T["_zod"]["values"];
  pattern: T["_zod"]["pattern"];
}
interface $ZodOptional<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodOptionalInternals<T>;
}
declare const $ZodOptional: $constructor<$ZodOptional>;
interface $ZodExactOptionalDef<T extends SomeType = $ZodType> extends $ZodOptionalDef<T> {}
interface $ZodExactOptionalInternals<T extends SomeType = $ZodType> extends $ZodOptionalInternals<T> {
  def: $ZodExactOptionalDef<T>;
  output: output<T>;
  input: input<T>;
}
interface $ZodExactOptional<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodExactOptionalInternals<T>;
}
declare const $ZodExactOptional: $constructor<$ZodExactOptional>;
interface $ZodNullableDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "nullable";
  innerType: T;
}
interface $ZodNullableInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<output<T> | null, input<T> | null> {
  def: $ZodNullableDef<T>;
  optin: T["_zod"]["optin"];
  optout: T["_zod"]["optout"];
  isst: never;
  values: T["_zod"]["values"];
  pattern: T["_zod"]["pattern"];
}
interface $ZodNullable<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodNullableInternals<T>;
}
declare const $ZodNullable: $constructor<$ZodNullable>;
interface $ZodDefaultDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "default";
  innerType: T;
  /** The default value. May be a getter. */
  defaultValue: NoUndefined<output<T>>;
}
interface $ZodDefaultInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<NoUndefined<output<T>>, input<T> | undefined> {
  def: $ZodDefaultDef<T>;
  optin: "optional";
  optout?: "optional" | undefined;
  isst: never;
  values: T["_zod"]["values"];
}
interface $ZodDefault<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodDefaultInternals<T>;
}
declare const $ZodDefault: $constructor<$ZodDefault>;
interface $ZodPrefaultDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "prefault";
  innerType: T;
  /** The default value. May be a getter. */
  defaultValue: input<T>;
}
interface $ZodPrefaultInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<NoUndefined<output<T>>, input<T> | undefined> {
  def: $ZodPrefaultDef<T>;
  optin: "optional";
  optout?: "optional" | undefined;
  isst: never;
  values: T["_zod"]["values"];
}
interface $ZodPrefault<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodPrefaultInternals<T>;
}
declare const $ZodPrefault: $constructor<$ZodPrefault>;
interface $ZodNonOptionalDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "nonoptional";
  innerType: T;
}
interface $ZodNonOptionalInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<NoUndefined<output<T>>, NoUndefined<input<T>>> {
  def: $ZodNonOptionalDef<T>;
  isst: $ZodIssueInvalidType;
  values: T["_zod"]["values"];
  optin: "optional" | undefined;
  optout: "optional" | undefined;
}
interface $ZodNonOptional<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodNonOptionalInternals<T>;
}
declare const $ZodNonOptional: $constructor<$ZodNonOptional>;
interface $ZodSuccessDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "success";
  innerType: T;
}
interface $ZodSuccessInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<boolean, input<T>> {
  def: $ZodSuccessDef<T>;
  isst: never;
  optin: T["_zod"]["optin"];
  optout: "optional" | undefined;
}
interface $ZodSuccess<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodSuccessInternals<T>;
}
declare const $ZodSuccess: $constructor<$ZodSuccess>;
interface $ZodCatchCtx extends ParsePayload {
  /** @deprecated Use `ctx.issues` */
  error: {
    issues: $ZodIssue[];
  };
  /** @deprecated Use `ctx.value` */
  input: unknown;
}
interface $ZodCatchDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "catch";
  innerType: T;
  catchValue: (ctx: $ZodCatchCtx) => unknown;
}
interface $ZodCatchInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<output<T>, input<T>> {
  def: $ZodCatchDef<T>;
  optin: T["_zod"]["optin"];
  optout: T["_zod"]["optout"];
  isst: never;
  values: T["_zod"]["values"];
}
interface $ZodCatch<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodCatchInternals<T>;
}
declare const $ZodCatch: $constructor<$ZodCatch>;
interface $ZodNaNDef extends $ZodTypeDef {
  type: "nan";
}
interface $ZodNaNInternals extends $ZodTypeInternals<number, number> {
  def: $ZodNaNDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodNaN extends $ZodType {
  _zod: $ZodNaNInternals;
}
declare const $ZodNaN: $constructor<$ZodNaN>;
interface $ZodPipeDef<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "pipe";
  in: A;
  out: B;
  /** Only defined inside $ZodCodec instances. */
  transform?: (value: output<A>, payload: ParsePayload<output<A>>) => MaybeAsync<input<B>>;
  /** Only defined inside $ZodCodec instances. */
  reverseTransform?: (value: input<B>, payload: ParsePayload<input<B>>) => MaybeAsync<output<A>>;
}
interface $ZodPipeInternals<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodTypeInternals<output<B>, input<A>> {
  def: $ZodPipeDef<A, B>;
  isst: never;
  values: A["_zod"]["values"];
  optin: A["_zod"]["optin"];
  optout: B["_zod"]["optout"];
  propValues: A["_zod"]["propValues"];
}
interface $ZodPipe<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodPipeInternals<A, B>;
}
declare const $ZodPipe: $constructor<$ZodPipe>;
interface $ZodReadonlyDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "readonly";
  innerType: T;
}
interface $ZodReadonlyInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<MakeReadonly<output<T>>, MakeReadonly<input<T>>> {
  def: $ZodReadonlyDef<T>;
  optin: T["_zod"]["optin"];
  optout: T["_zod"]["optout"];
  isst: never;
  propValues: T["_zod"]["propValues"];
  values: T["_zod"]["values"];
}
interface $ZodReadonly<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodReadonlyInternals<T>;
}
declare const $ZodReadonly: $constructor<$ZodReadonly>;
interface $ZodTemplateLiteralDef extends $ZodTypeDef {
  type: "template_literal";
  parts: $ZodTemplateLiteralPart[];
  format?: string | undefined;
}
interface $ZodTemplateLiteralInternals<Template extends string = string> extends $ZodTypeInternals<Template, Template> {
  pattern: RegExp;
  def: $ZodTemplateLiteralDef;
  isst: $ZodIssueInvalidType;
}
interface $ZodTemplateLiteral<Template extends string = string> extends $ZodType {
  _zod: $ZodTemplateLiteralInternals<Template>;
}
type LiteralPart = Exclude<Literal, symbol>;
interface SchemaPartInternals extends $ZodTypeInternals<LiteralPart, LiteralPart> {
  pattern: RegExp;
}
interface SchemaPart extends $ZodType {
  _zod: SchemaPartInternals;
}
type $ZodTemplateLiteralPart = LiteralPart | SchemaPart;
declare const $ZodTemplateLiteral: $constructor<$ZodTemplateLiteral>;
type $ZodFunctionArgs = $ZodType<unknown[], unknown[]>;
type $ZodFunctionIn = $ZodFunctionArgs;
type $ZodFunctionOut = $ZodType;
type $InferInnerFunctionType<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (...args: $ZodFunctionIn extends Args ? never[] : output<Args>) => input<Returns>;
type $InferInnerFunctionTypeAsync<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (...args: $ZodFunctionIn extends Args ? never[] : output<Args>) => MaybeAsync<input<Returns>>;
type $InferOuterFunctionType<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (...args: $ZodFunctionIn extends Args ? never[] : input<Args>) => output<Returns>;
type $InferOuterFunctionTypeAsync<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> = (...args: $ZodFunctionIn extends Args ? never[] : input<Args>) => Promise<output<Returns>>;
interface $ZodFunctionDef<In extends $ZodFunctionIn = $ZodFunctionIn, Out extends $ZodFunctionOut = $ZodFunctionOut> extends $ZodTypeDef {
  type: "function";
  input: In;
  output: Out;
}
interface $ZodFunctionInternals<Args extends $ZodFunctionIn, Returns extends $ZodFunctionOut> extends $ZodTypeInternals<$InferOuterFunctionType<Args, Returns>, $InferInnerFunctionType<Args, Returns>> {
  def: $ZodFunctionDef<Args, Returns>;
  isst: $ZodIssueInvalidType;
}
interface $ZodFunction<Args extends $ZodFunctionIn = $ZodFunctionIn, Returns extends $ZodFunctionOut = $ZodFunctionOut> extends $ZodType<any, any, $ZodFunctionInternals<Args, Returns>> {
  /** @deprecated */
  _def: $ZodFunctionDef<Args, Returns>;
  _input: $InferInnerFunctionType<Args, Returns>;
  _output: $InferOuterFunctionType<Args, Returns>;
  implement<F extends $InferInnerFunctionType<Args, Returns>>(func: F): (...args: Parameters<this["_output"]>) => ReturnType<F> extends ReturnType<this["_output"]> ? ReturnType<F> : ReturnType<this["_output"]>;
  implementAsync<F extends $InferInnerFunctionTypeAsync<Args, Returns>>(func: F): F extends $InferOuterFunctionTypeAsync<Args, Returns> ? F : $InferOuterFunctionTypeAsync<Args, Returns>;
  input<const Items extends TupleItems, const Rest extends $ZodFunctionOut = $ZodFunctionOut>(args: Items, rest?: Rest): $ZodFunction<$ZodTuple<Items, Rest>, Returns>;
  input<NewArgs extends $ZodFunctionIn>(args: NewArgs): $ZodFunction<NewArgs, Returns>;
  input(...args: any[]): $ZodFunction<any, Returns>;
  output<NewReturns extends $ZodType>(output: NewReturns): $ZodFunction<Args, NewReturns>;
}
declare const $ZodFunction: $constructor<$ZodFunction>;
interface $ZodPromiseDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "promise";
  innerType: T;
}
interface $ZodPromiseInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<Promise<output<T>>, MaybeAsync<input<T>>> {
  def: $ZodPromiseDef<T>;
  isst: never;
}
interface $ZodPromise<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodPromiseInternals<T>;
}
declare const $ZodPromise: $constructor<$ZodPromise>;
interface $ZodLazyDef<T extends SomeType = $ZodType> extends $ZodTypeDef {
  type: "lazy";
  getter: () => T;
}
interface $ZodLazyInternals<T extends SomeType = $ZodType> extends $ZodTypeInternals<output<T>, input<T>> {
  def: $ZodLazyDef<T>;
  isst: never;
  /** Auto-cached way to retrieve the inner schema */
  innerType: T;
  pattern: T["_zod"]["pattern"];
  propValues: T["_zod"]["propValues"];
  optin: T["_zod"]["optin"];
  optout: T["_zod"]["optout"];
}
interface $ZodLazy<T extends SomeType = $ZodType> extends $ZodType {
  _zod: $ZodLazyInternals<T>;
}
declare const $ZodLazy: $constructor<$ZodLazy>;
interface $ZodCustomDef<O = unknown> extends $ZodTypeDef, $ZodCheckDef {
  type: "custom";
  check: "custom";
  path?: PropertyKey[] | undefined;
  error?: $ZodErrorMap | undefined;
  params?: Record<string, any> | undefined;
  fn: (arg: O) => unknown;
}
interface $ZodCustomInternals<O = unknown, I = unknown> extends $ZodTypeInternals<O, I>, $ZodCheckInternals<O> {
  def: $ZodCustomDef;
  issc: $ZodIssue;
  isst: never;
  bag: LoosePartial<{
    Class: typeof Class;
  }>;
}
interface $ZodCustom<O = unknown, I = unknown> extends $ZodType {
  _zod: $ZodCustomInternals<O, I>;
}
declare const $ZodCustom: $constructor<$ZodCustom>;
type $ZodTypes = $ZodString | $ZodNumber | $ZodBigInt | $ZodBoolean | $ZodDate | $ZodSymbol | $ZodUndefined | $ZodNullable | $ZodNull | $ZodAny | $ZodUnknown | $ZodNever | $ZodVoid | $ZodArray | $ZodObject | $ZodUnion | $ZodIntersection | $ZodTuple | $ZodRecord | $ZodMap | $ZodSet | $ZodLiteral | $ZodEnum | $ZodFunction | $ZodPromise | $ZodLazy | $ZodOptional | $ZodDefault | $ZodPrefault | $ZodTemplateLiteral | $ZodCustom | $ZodTransform | $ZodNonOptional | $ZodReadonly | $ZodNaN | $ZodPipe | $ZodSuccess | $ZodCatch | $ZodFile;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/checks.d.cts
interface $ZodCheckDef {
  check: string;
  error?: $ZodErrorMap<never> | undefined;
  /** If true, no later checks will be executed if this check fails. Default `false`. */
  abort?: boolean | undefined;
  /** If provided, this check will only be executed if the function returns `true`. Defaults to `payload => z.util.isAborted(payload)`. */
  when?: ((payload: ParsePayload) => boolean) | undefined;
}
interface $ZodCheckInternals<T> {
  def: $ZodCheckDef;
  /** The set of issues this check might throw. */
  issc?: $ZodIssueBase;
  check(payload: ParsePayload<T>): MaybeAsync<void>;
  onattach: ((schema: $ZodType) => void)[];
}
interface $ZodCheck<in T = never> {
  _zod: $ZodCheckInternals<T>;
}
declare const $ZodCheck: $constructor<$ZodCheck<any>>;
interface $ZodCheckMaxLengthDef extends $ZodCheckDef {
  check: "max_length";
  maximum: number;
}
interface $ZodCheckMaxLengthInternals<T extends HasLength = HasLength> extends $ZodCheckInternals<T> {
  def: $ZodCheckMaxLengthDef;
  issc: $ZodIssueTooBig<T>;
}
interface $ZodCheckMaxLength<T extends HasLength = HasLength> extends $ZodCheck<T> {
  _zod: $ZodCheckMaxLengthInternals<T>;
}
declare const $ZodCheckMaxLength: $constructor<$ZodCheckMaxLength>;
interface $ZodCheckMinLengthDef extends $ZodCheckDef {
  check: "min_length";
  minimum: number;
}
interface $ZodCheckMinLengthInternals<T extends HasLength = HasLength> extends $ZodCheckInternals<T> {
  def: $ZodCheckMinLengthDef;
  issc: $ZodIssueTooSmall<T>;
}
interface $ZodCheckMinLength<T extends HasLength = HasLength> extends $ZodCheck<T> {
  _zod: $ZodCheckMinLengthInternals<T>;
}
declare const $ZodCheckMinLength: $constructor<$ZodCheckMinLength>;
interface $ZodCheckLengthEqualsDef extends $ZodCheckDef {
  check: "length_equals";
  length: number;
}
interface $ZodCheckLengthEqualsInternals<T extends HasLength = HasLength> extends $ZodCheckInternals<T> {
  def: $ZodCheckLengthEqualsDef;
  issc: $ZodIssueTooBig<T> | $ZodIssueTooSmall<T>;
}
interface $ZodCheckLengthEquals<T extends HasLength = HasLength> extends $ZodCheck<T> {
  _zod: $ZodCheckLengthEqualsInternals<T>;
}
declare const $ZodCheckLengthEquals: $constructor<$ZodCheckLengthEquals>;
type $ZodStringFormats = "email" | "url" | "emoji" | "uuid" | "guid" | "nanoid" | "cuid" | "cuid2" | "ulid" | "xid" | "ksuid" | "datetime" | "date" | "time" | "duration" | "ipv4" | "ipv6" | "cidrv4" | "cidrv6" | "base64" | "base64url" | "json_string" | "e164" | "lowercase" | "uppercase" | "regex" | "jwt" | "starts_with" | "ends_with" | "includes";
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/errors.d.cts
interface $ZodIssueBase {
  readonly code?: string;
  readonly input?: unknown;
  readonly path: PropertyKey[];
  readonly message: string;
}
type $ZodInvalidTypeExpected = "string" | "number" | "int" | "boolean" | "bigint" | "symbol" | "undefined" | "null" | "never" | "void" | "date" | "array" | "object" | "tuple" | "record" | "map" | "set" | "file" | "nonoptional" | "nan" | "function" | (string & {});
interface $ZodIssueInvalidType<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_type";
  readonly expected: $ZodInvalidTypeExpected;
  readonly input?: Input;
}
interface $ZodIssueTooBig<Input = unknown> extends $ZodIssueBase {
  readonly code: "too_big";
  readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
  readonly maximum: number | bigint;
  readonly inclusive?: boolean;
  readonly exact?: boolean;
  readonly input?: Input;
}
interface $ZodIssueTooSmall<Input = unknown> extends $ZodIssueBase {
  readonly code: "too_small";
  readonly origin: "number" | "int" | "bigint" | "date" | "string" | "array" | "set" | "file" | (string & {});
  readonly minimum: number | bigint;
  /** True if the allowable range includes the minimum */
  readonly inclusive?: boolean;
  /** True if the allowed value is fixed (e.g.` z.length(5)`), not a range (`z.minLength(5)`) */
  readonly exact?: boolean;
  readonly input?: Input;
}
interface $ZodIssueInvalidStringFormat extends $ZodIssueBase {
  readonly code: "invalid_format";
  readonly format: $ZodStringFormats | (string & {});
  readonly pattern?: string;
  readonly input?: string;
}
interface $ZodIssueNotMultipleOf<Input extends number | bigint = number | bigint> extends $ZodIssueBase {
  readonly code: "not_multiple_of";
  readonly divisor: number;
  readonly input?: Input;
}
interface $ZodIssueUnrecognizedKeys extends $ZodIssueBase {
  readonly code: "unrecognized_keys";
  readonly keys: string[];
  readonly input?: Record<string, unknown>;
}
interface $ZodIssueInvalidUnionNoMatch extends $ZodIssueBase {
  readonly code: "invalid_union";
  readonly errors: $ZodIssue[][];
  readonly input?: unknown;
  readonly discriminator?: string | undefined;
  readonly inclusive?: true;
}
interface $ZodIssueInvalidUnionMultipleMatch extends $ZodIssueBase {
  readonly code: "invalid_union";
  readonly errors: [];
  readonly input?: unknown;
  readonly discriminator?: string | undefined;
  readonly inclusive: false;
}
type $ZodIssueInvalidUnion = $ZodIssueInvalidUnionNoMatch | $ZodIssueInvalidUnionMultipleMatch;
interface $ZodIssueInvalidKey<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_key";
  readonly origin: "map" | "record";
  readonly issues: $ZodIssue[];
  readonly input?: Input;
}
interface $ZodIssueInvalidElement<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_element";
  readonly origin: "map" | "set";
  readonly key: unknown;
  readonly issues: $ZodIssue[];
  readonly input?: Input;
}
interface $ZodIssueInvalidValue<Input = unknown> extends $ZodIssueBase {
  readonly code: "invalid_value";
  readonly values: Primitive[];
  readonly input?: Input;
}
interface $ZodIssueCustom extends $ZodIssueBase {
  readonly code: "custom";
  readonly params?: Record<string, any> | undefined;
  readonly input?: unknown;
}
type $ZodIssue = $ZodIssueInvalidType | $ZodIssueTooBig | $ZodIssueTooSmall | $ZodIssueInvalidStringFormat | $ZodIssueNotMultipleOf | $ZodIssueUnrecognizedKeys | $ZodIssueInvalidUnion | $ZodIssueInvalidKey | $ZodIssueInvalidElement | $ZodIssueInvalidValue | $ZodIssueCustom;
type $ZodInternalIssue<T extends $ZodIssueBase = $ZodIssue> = T extends any ? RawIssue$1<T> : never;
type RawIssue$1<T extends $ZodIssueBase> = T extends any ? Flatten<MakePartial<T, "message" | "path"> & {
  /** The input data */readonly input: unknown; /** The schema or check that originated this issue. */
  readonly inst?: $ZodType | $ZodCheck; /** If `true`, Zod will continue executing checks/refinements after this issue. */
  readonly continue?: boolean | undefined;
} & Record<string, unknown>> : never;
type $ZodRawIssue<T extends $ZodIssueBase = $ZodIssue> = $ZodInternalIssue<T>;
interface $ZodErrorMap<T extends $ZodIssueBase = $ZodIssue> {
  (issue: $ZodRawIssue<T>): {
    message: string;
  } | string | undefined | null;
}
interface $ZodError<T = unknown> extends Error {
  type: T;
  issues: $ZodIssue[];
  _zod: {
    output: T;
    def: $ZodIssue[];
  };
  stack?: string;
  name: string;
}
declare const $ZodError: $constructor<$ZodError>;
type $ZodFlattenedError<T, U = string> = _FlattenedError<T, U>;
type _FlattenedError<T, U = string> = {
  formErrors: U[];
  fieldErrors: { [P in keyof T]?: U[] };
};
type _ZodFormattedError<T, U = string> = T extends [any, ...any[]] ? { [K in keyof T]?: $ZodFormattedError<T[K], U> } : T extends any[] ? {
  [k: number]: $ZodFormattedError<T[number], U>;
} : T extends object ? Flatten<{ [K in keyof T]?: $ZodFormattedError<T[K], U> }> : any;
type $ZodFormattedError<T, U = string> = {
  _errors: U[];
} & Flatten<_ZodFormattedError<T, U>>;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/core.d.cts
type ZodTrait = {
  _zod: {
    def: any;
    [k: string]: any;
  };
};
interface $constructor<T extends ZodTrait, D = T["_zod"]["def"]> {
  new (def: D): T;
  init(inst: T, def: D): asserts inst is T;
}
declare function $constructor<T extends ZodTrait, D = T["_zod"]["def"]>(name: string, initializer: (inst: T, def: D) => void, params?: {
  Parent?: typeof Class;
}): $constructor<T, D>;
declare const $brand: unique symbol;
type $brand<T extends string | number | symbol = string | number | symbol> = {
  [$brand]: { [k in T]: true };
};
type $ZodBranded<T extends SomeType, Brand extends string | number | symbol, Dir extends "in" | "out" | "inout" = "out"> = T & (Dir extends "inout" ? {
  _zod: {
    input: input<T> & $brand<Brand>;
    output: output<T> & $brand<Brand>;
  };
} : Dir extends "in" ? {
  _zod: {
    input: input<T> & $brand<Brand>;
  };
} : {
  _zod: {
    output: output<T> & $brand<Brand>;
  };
});
type input<T> = T extends {
  _zod: {
    input: any;
  };
} ? T["_zod"]["input"] : unknown;
type output<T> = T extends {
  _zod: {
    output: any;
  };
} ? T["_zod"]["output"] : unknown;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/core/api.d.cts
type Params$4<T extends $ZodType | $ZodCheck, IssueTypes extends $ZodIssueBase, OmitKeys extends keyof T["_zod"]["def"] = never> = Flatten<Partial<EmptyToNever<Omit<T["_zod"]["def"], OmitKeys> & ([IssueTypes] extends [never] ? {} : {
  error?: string | $ZodErrorMap<IssueTypes> | undefined; /** @deprecated This parameter is deprecated. Use `error` instead. */
  message?: string | undefined;
})>>>;
type TypeParams<T extends $ZodType = $ZodType & {
  _isst: never;
}, AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "checks" | "error"> = never> = Params$4<T, NonNullable<T["_zod"]["isst"]>, "type" | "checks" | "error" | AlsoOmit>;
type CheckParams<T extends $ZodCheck = $ZodCheck, // & { _issc: never },
AlsoOmit extends Exclude<keyof T["_zod"]["def"], "check" | "error"> = never> = Params$4<T, NonNullable<T["_zod"]["issc"]>, "check" | "error" | AlsoOmit>;
type CheckTypeParams<T extends $ZodType & $ZodCheck = $ZodType & $ZodCheck, AlsoOmit extends Exclude<keyof T["_zod"]["def"], "type" | "checks" | "error" | "check"> = never> = Params$4<T, NonNullable<T["_zod"]["isst"] | T["_zod"]["issc"]>, "type" | "checks" | "error" | "check" | AlsoOmit>;
type $ZodCheckMaxLengthParams = CheckParams<$ZodCheckMaxLength, "maximum" | "when">;
type $ZodCheckMinLengthParams = CheckParams<$ZodCheckMinLength, "minimum" | "when">;
type $ZodCheckLengthEqualsParams = CheckParams<$ZodCheckLengthEquals, "length" | "when">;
type $ZodNonOptionalParams = TypeParams<$ZodNonOptional, "innerType">;
type $ZodCustomParams = CheckTypeParams<$ZodCustom, "fn">;
type $ZodSuperRefineIssue<T extends $ZodIssueBase = $ZodIssue> = T extends any ? RawIssue<T> : never;
type RawIssue<T extends $ZodIssueBase> = T extends any ? Flatten<MakePartial<T, "message" | "path"> & {
  /** The schema or check that originated this issue. */readonly inst?: $ZodType | $ZodCheck; /** If `true`, Zod will execute subsequent checks/refinements instead of immediately aborting */
  readonly continue?: boolean | undefined;
} & Record<string, unknown>> : never;
interface $RefinementCtx<T = unknown> extends ParsePayload<T> {
  addIssue(arg: string | $ZodSuperRefineIssue): void;
}
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/errors.d.cts
/** An Error-like class used to store Zod validation issues.  */
interface ZodError<T = unknown> extends $ZodError<T> {
  /** @deprecated Use the `z.treeifyError(err)` function instead. */
  format(): $ZodFormattedError<T>;
  format<U>(mapper: (issue: $ZodIssue) => U): $ZodFormattedError<T, U>;
  /** @deprecated Use the `z.treeifyError(err)` function instead. */
  flatten(): $ZodFlattenedError<T>;
  flatten<U>(mapper: (issue: $ZodIssue) => U): $ZodFlattenedError<T, U>;
  /** @deprecated Push directly to `.issues` instead. */
  addIssue(issue: $ZodIssue): void;
  /** @deprecated Push directly to `.issues` instead. */
  addIssues(issues: $ZodIssue[]): void;
  /** @deprecated Check `err.issues.length === 0` instead. */
  isEmpty: boolean;
}
declare const ZodError: $constructor<ZodError>;
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/parse.d.cts
type ZodSafeParseResult<T> = ZodSafeParseSuccess<T> | ZodSafeParseError<T>;
type ZodSafeParseSuccess<T> = {
  success: true;
  data: T;
  error?: never;
};
type ZodSafeParseError<T> = {
  success: false;
  data?: never;
  error: ZodError<T>;
};
//#endregion
//#region ../../node_modules/.pnpm/zod@4.3.6/node_modules/zod/v4/classic/schemas.d.cts
type ZodStandardSchemaWithJSON<T> = StandardSchemaWithJSONProps<input<T>, output<T>>;
interface ZodType<out Output = unknown, out Input = unknown, out Internals extends $ZodTypeInternals<Output, Input> = $ZodTypeInternals<Output, Input>> extends $ZodType<Output, Input, Internals> {
  def: Internals["def"];
  type: Internals["def"]["type"];
  /** @deprecated Use `.def` instead. */
  _def: Internals["def"];
  /** @deprecated Use `z.output<typeof schema>` instead. */
  _output: Internals["output"];
  /** @deprecated Use `z.input<typeof schema>` instead. */
  _input: Internals["input"];
  "~standard": ZodStandardSchemaWithJSON<this>;
  /** Converts this schema to a JSON Schema representation. */
  toJSONSchema(params?: ToJSONSchemaParams): ZodStandardJSONSchemaPayload<this>;
  check(...checks: (CheckFn<output<this>> | $ZodCheck<output<this>>)[]): this;
  with(...checks: (CheckFn<output<this>> | $ZodCheck<output<this>>)[]): this;
  clone(def?: Internals["def"], params?: {
    parent: boolean;
  }): this;
  register<R extends $ZodRegistry>(registry: R, ...meta: this extends R["_schema"] ? undefined extends R["_meta"] ? [$replace<R["_meta"], this>?] : [$replace<R["_meta"], this>] : ["Incompatible schema"]): this;
  brand<T extends PropertyKey = PropertyKey, Dir extends "in" | "out" | "inout" = "out">(value?: T): PropertyKey extends T ? this : $ZodBranded<this, T, Dir>;
  parse(data: unknown, params?: ParseContext<$ZodIssue>): output<this>;
  safeParse(data: unknown, params?: ParseContext<$ZodIssue>): ZodSafeParseResult<output<this>>;
  parseAsync(data: unknown, params?: ParseContext<$ZodIssue>): Promise<output<this>>;
  safeParseAsync(data: unknown, params?: ParseContext<$ZodIssue>): Promise<ZodSafeParseResult<output<this>>>;
  spa: (data: unknown, params?: ParseContext<$ZodIssue>) => Promise<ZodSafeParseResult<output<this>>>;
  encode(data: output<this>, params?: ParseContext<$ZodIssue>): input<this>;
  decode(data: input<this>, params?: ParseContext<$ZodIssue>): output<this>;
  encodeAsync(data: output<this>, params?: ParseContext<$ZodIssue>): Promise<input<this>>;
  decodeAsync(data: input<this>, params?: ParseContext<$ZodIssue>): Promise<output<this>>;
  safeEncode(data: output<this>, params?: ParseContext<$ZodIssue>): ZodSafeParseResult<input<this>>;
  safeDecode(data: input<this>, params?: ParseContext<$ZodIssue>): ZodSafeParseResult<output<this>>;
  safeEncodeAsync(data: output<this>, params?: ParseContext<$ZodIssue>): Promise<ZodSafeParseResult<input<this>>>;
  safeDecodeAsync(data: input<this>, params?: ParseContext<$ZodIssue>): Promise<ZodSafeParseResult<output<this>>>;
  refine<Ch extends (arg: output<this>) => unknown | Promise<unknown>>(check: Ch, params?: string | $ZodCustomParams): Ch extends ((arg: any) => arg is infer R) ? this & ZodType<R, input<this>> : this;
  superRefine(refinement: (arg: output<this>, ctx: $RefinementCtx<output<this>>) => void | Promise<void>): this;
  overwrite(fn: (x: output<this>) => output<this>): this;
  optional(): ZodOptional<this>;
  exactOptional(): ZodExactOptional<this>;
  nonoptional(params?: string | $ZodNonOptionalParams): ZodNonOptional<this>;
  nullable(): ZodNullable<this>;
  nullish(): ZodOptional<ZodNullable<this>>;
  default(def: NoUndefined<output<this>>): ZodDefault<this>;
  default(def: () => NoUndefined<output<this>>): ZodDefault<this>;
  prefault(def: () => input<this>): ZodPrefault<this>;
  prefault(def: input<this>): ZodPrefault<this>;
  array(): ZodArray<this>;
  or<T extends SomeType>(option: T): ZodUnion<[this, T]>;
  and<T extends SomeType>(incoming: T): ZodIntersection<this, T>;
  transform<NewOut>(transform: (arg: output<this>, ctx: $RefinementCtx<output<this>>) => NewOut | Promise<NewOut>): ZodPipe<this, ZodTransform<Awaited<NewOut>, output<this>>>;
  catch(def: output<this>): ZodCatch<this>;
  catch(def: (ctx: $ZodCatchCtx) => output<this>): ZodCatch<this>;
  pipe<T extends $ZodType<any, output<this>>>(target: T | $ZodType<any, output<this>>): ZodPipe<this, T>;
  readonly(): ZodReadonly<this>;
  /** Returns a new instance that has been registered in `z.globalRegistry` with the specified description */
  describe(description: string): this;
  description?: string;
  /** Returns the metadata associated with this instance in `z.globalRegistry` */
  meta(): $replace<GlobalMeta, this> | undefined;
  /** Returns a new instance that has been registered in `z.globalRegistry` with the specified metadata */
  meta(data: $replace<GlobalMeta, this>): this;
  /** @deprecated Try safe-parsing `undefined` (this is what `isOptional` does internally):
   *
   * ```ts
   * const schema = z.string().optional();
   * const isOptional = schema.safeParse(undefined).success; // true
   * ```
   */
  isOptional(): boolean;
  /**
   * @deprecated Try safe-parsing `null` (this is what `isNullable` does internally):
   *
   * ```ts
   * const schema = z.string().nullable();
   * const isNullable = schema.safeParse(null).success; // true
   * ```
   */
  isNullable(): boolean;
  apply<T>(fn: (schema: this) => T): T;
}
interface _ZodType<out Internals extends $ZodTypeInternals = $ZodTypeInternals> extends ZodType<any, any, Internals> {}
declare const ZodType: $constructor<ZodType>;
interface ZodArray<T extends SomeType = $ZodType> extends _ZodType<$ZodArrayInternals<T>>, $ZodArray<T> {
  element: T;
  min(minLength: number, params?: string | $ZodCheckMinLengthParams): this;
  nonempty(params?: string | $ZodCheckMinLengthParams): this;
  max(maxLength: number, params?: string | $ZodCheckMaxLengthParams): this;
  length(len: number, params?: string | $ZodCheckLengthEqualsParams): this;
  unwrap(): T;
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodArray: $constructor<ZodArray>;
interface ZodUnion<T extends readonly SomeType[] = readonly $ZodType[]> extends _ZodType<$ZodUnionInternals<T>>, $ZodUnion<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  options: T;
}
declare const ZodUnion: $constructor<ZodUnion>;
interface ZodIntersection<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends _ZodType<$ZodIntersectionInternals<A, B>>, $ZodIntersection<A, B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodIntersection: $constructor<ZodIntersection>;
interface ZodTransform<O = unknown, I = unknown> extends _ZodType<$ZodTransformInternals<O, I>>, $ZodTransform<O, I> {
  "~standard": ZodStandardSchemaWithJSON<this>;
}
declare const ZodTransform: $constructor<ZodTransform>;
interface ZodOptional<T extends SomeType = $ZodType> extends _ZodType<$ZodOptionalInternals<T>>, $ZodOptional<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodOptional: $constructor<ZodOptional>;
interface ZodExactOptional<T extends SomeType = $ZodType> extends _ZodType<$ZodExactOptionalInternals<T>>, $ZodExactOptional<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodExactOptional: $constructor<ZodExactOptional>;
interface ZodNullable<T extends SomeType = $ZodType> extends _ZodType<$ZodNullableInternals<T>>, $ZodNullable<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodNullable: $constructor<ZodNullable>;
interface ZodDefault<T extends SomeType = $ZodType> extends _ZodType<$ZodDefaultInternals<T>>, $ZodDefault<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
  /** @deprecated Use `.unwrap()` instead. */
  removeDefault(): T;
}
declare const ZodDefault: $constructor<ZodDefault>;
interface ZodPrefault<T extends SomeType = $ZodType> extends _ZodType<$ZodPrefaultInternals<T>>, $ZodPrefault<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodPrefault: $constructor<ZodPrefault>;
interface ZodNonOptional<T extends SomeType = $ZodType> extends _ZodType<$ZodNonOptionalInternals<T>>, $ZodNonOptional<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodNonOptional: $constructor<ZodNonOptional>;
interface ZodCatch<T extends SomeType = $ZodType> extends _ZodType<$ZodCatchInternals<T>>, $ZodCatch<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
  /** @deprecated Use `.unwrap()` instead. */
  removeCatch(): T;
}
declare const ZodCatch: $constructor<ZodCatch>;
interface ZodPipe<A extends SomeType = $ZodType, B extends SomeType = $ZodType> extends _ZodType<$ZodPipeInternals<A, B>>, $ZodPipe<A, B> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  in: A;
  out: B;
}
declare const ZodPipe: $constructor<ZodPipe>;
interface ZodReadonly<T extends SomeType = $ZodType> extends _ZodType<$ZodReadonlyInternals<T>>, $ZodReadonly<T> {
  "~standard": ZodStandardSchemaWithJSON<this>;
  unwrap(): T;
}
declare const ZodReadonly: $constructor<ZodReadonly>;
//#endregion
//#region ../amagi/packages/core/dist/default/index.d.ts
//#region src/platform/bilibili/sign/wbi.d.ts
/**
 * 对请求链接进行 WBI 签名
 * @param BASEURL - 完整的请求地址，可以是字符串或 URL 对象
 * @param cookie - 有效的用户 Cookie 字符串
 * @returns 返回包含 WBI 签名的查询字符串
 * @throws 当获取 WBI 密钥失败或 URL 解析失败时抛出错误
 */
declare const wbi_sign: (BASEURL: string | URL, cookie: string) => Promise<string>; //#endregion
//#region src/platform/bilibili/sign/bv2av.d.ts
/**
 * av号转bv号
 * @param aid av号
 * @returns
 */
declare const av2bv: (aid: number) => `BV1${string}`;
/**
 * bv号转av号
 * @param bvid bv号
 * @returns
 */
declare const bv2av: (bvid: string) => number; //#endregion
//#region src/types/ReturnDataType/Bilibili/ProtobufDanmaku.d.ts
type BiliProtobufDanmaku = {
  code: number;
  data: DataData$27;
  message: string;
  [property: string]: any;
};
type DataData$27 = {
  elems: Elem[];
  [property: string]: any;
};
type Elem = {
  action: string;
  animation: string;
  attr: number;
  color: number;
  content: string;
  ctime: string;
  fontsize: number;
  id: string;
  idStr: string;
  midHash: string;
  mode: number;
  pool: number;
  progress: number;
  weight: number;
  [property: string]: any;
}; //#endregion
//#region src/platform/bilibili/sign/danmaku_proto.d.ts
/**
 * 解析弹幕分段响应
 * @param data - 二进制 protobuf 数据
 * @returns 解析后的弹幕数据
 */
declare function parseDmSegMobileReply(data: ArrayBuffer | Uint8Array): BiliProtobufDanmaku['data']['elems'][number]; //#endregion
//#region src/types/BilibiliAPIParams.d.ts
/**
 * B站 API 参数类型定义
 *
 * 定义所有 B站 API 方法的参数接口和类型映射
 *
 * @module types/BilibiliAPIParams
 */
/**
 * B站 API 方法参数映射接口
 *
 * 每个键对应一种 API 方法，值为该方法所需的参数接口
 */
interface BilibiliMethodOptionsMap {
  /** 获取单个视频信息 */
  VideoInfoParams: {
    methodType: 'videoInfo'; /** 稿件BVID */
    bvid: string;
  };
  /** 获取视频流下载信息 */
  VideoStreamParams: {
    methodType: 'videoStream'; /** 稿件AVID */
    avid: number; /** 稿件cid */
    cid: number;
  };
  /** 获取评论数据 */
  CommentParams: {
    methodType: 'comments'; /** 评论区类型代码，详见 [评论区类型代码](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/comment/readme.md#%E8%AF%84%E8%AE%BA%E5%8C%BA%E7%B1%BB%E5%9E%8B%E4%BB%A3%E7%A0%81) */
    type: CommentType; /** 稿件ID，也就是AV号去除前缀后的内容 */
    oid: string;
    /**
     * 获取的评论数量，默认20
     * @defaultValue 20
     */
    number?: number;
    /**
     * 排序方式
     * 默认为3
     * 0和3: 仅热度
     * 1: 按热度+按时间
     * 2: 仅时间
     * @defaultValue 3
     */
    mode?: 0 | 1 | 2 | 3;
    /**
     * 翻页信息，用于懒加载分页
     * 首次请求时不传，后续请求使用上次响应中的 data.cursor.pagination_reply.next_offset
     */
    pagination_str?: string;
    /**
     * 平台类型
     * @defaultValue 1
     */
    plat?: number; /** 当获取第一页评论时存在 */
    seek_rpid?: string;
    /**
     * web位置参数
     * @defaultValue 1315875
     */
    web_location?: string;
  };
  /** 获取指定评论的回复 */
  CommentReplyParams: {
    methodType: 'commentReplies'; /** 评论区类型代码，详见 [评论区类型代码](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/comment/readme.md#%E8%AF%84%E8%AE%BA%E5%8C%BA%E7%B1%BB%E5%9E%8B%E4%BB%A3%E7%A0%81) */
    type: CommentType; /** 目标评论区 ID，也就是AV号去除前缀后的内容 */
    oid: string; /** 根评论ID */
    root: string;
    /**
     * 获取的评论数量，默认20
     * @defaultValue 20
     */
    number?: number;
  };
  /** 获取用户相关数据 */
  UserParams: {
    methodType: 'userCard' | 'userDynamicList' | 'uploaderTotalViews' | 'userSpaceInfo'; /** UP主UID */
    host_mid: number;
  };
  /** 获取动态数据 */
  DynamicParams: {
    methodType: 'dynamicDetail' | 'dynamicCard'; /** 动态ID */
    dynamic_id: string;
  };
  /** 获取番剧基本信息 */
  BangumiInfoParams: {
    methodType: 'bangumiInfo'; /** 稿件ep_id，其含义为 {@link https://www.bilibili.com/anime/index | 番剧索引} 或 **我的追番** 中的番剧，对应网址中包含ss号，如：{@link https://www.bilibili.com/bangumi/play/ss33802} */
    season_id?: string; /** 稿件ep_id，番剧的某一集，对应网址中包含ep号，如：{@link https://www.bilibili.com/bangumi/play/ep330798} */
    ep_id?: string;
  };
  /** 获取番剧视频流信息 */
  BangumiStreamParams: {
    methodType: 'bangumiStream'; /** 稿件cid */
    cid: number; /** 稿件ep_id，番剧的某一集，对应网址中包含ep号，如：{@link https://www.bilibili.com/bangumi/play/ep330798} */
    ep_id: string;
  };
  /** 获取直播间信息 */
  LiveRoomParams: {
    methodType: 'liveRoomInfo' | 'liveRoomInit'; /** 直播间ID */
    room_id: string;
  };
  /** 查询二维码状态 */
  QrcodeParams: {
    methodType: 'qrcodeStatus'; /** 扫码登录秘钥 */
    qrcode_key: string;
  };
  /** 获取表情列表 */
  EmojiParams: {
    methodType: 'emojiList';
  };
  /** 获取登录基本信息 */
  LoginBaseInfoParams: {
    methodType: 'loginStatus';
  };
  /** 申请登录二维码 */
  GetQrcodeParams: {
    methodType: 'loginQrcode';
  };
  /** BV号转AV号 */
  Bv2AvParams: {
    methodType: 'bvToAv'; /** 视频BV号 */
    bvid: string;
  };
  /** AV号转BV号 */
  Av2BvParams: {
    methodType: 'avToBv'; /** 视频AV号 */
    avid: number;
  };
  /** 获取专栏正文内容 */
  ArticleParams: {
    methodType: 'articleContent';
    /**
     * 专栏ID
     * 如：{@link https://www.bilibili.com/read/cv43496899/?jump_opus=1}
     * 43496899 就是专栏ID
     * API Docs {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/article/view.md#获取专栏正文内容}
     */
    id: string;
  };
  /** 获取专栏显示卡片信息 */
  ArticleCardParams: {
    methodType: 'articleCards';
    /**
     * 被查询的 id 列表
     * 可传视频 **完整** AV/BV 号, 专栏 CV 号, 直播间长短 lv 号
     * API Docs {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/article/card.md#获取专栏显示卡片信息}
     */
    ids: string[] | string;
  };
  /** 获取专栏文章基本信息 */
  ArticleInfoParams: {
    methodType: 'articleInfo';
    /**
     * 专栏ID
     * 如：{@link https://www.bilibili.com/read/cv43496899/?jump_opus=1}
     * 43496899 就是专栏ID
     * API Docs {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/article/view.md#获取专栏文章基本信息}
     */
    id: string;
  };
  /** 获取文集基本信息 */
  ColumnInfoParams: {
    methodType: 'articleListInfo';
    /**
     * 文集rlid
     * 如：{@link https://www.bilibili.com/read/cv208340/?jump_opus=1}
     * 208340 就是文集rlid
     * API Docs {@link https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/article/articles.md#获取文集基本信息}
     */
    id: string;
  };
  /**
   * 获取实时弹幕
   * @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/danmaku/danmaku_proto.md
   */
  DanmakuParams: {
    methodType: 'videoDanmaku'; /** 稿件cid */
    cid: number;
    /**
     * 分段序号（从1开始），每6分钟为一段
     * @defaultValue 1
     */
    segment_index?: number;
  };
  /** 从 v_voucher 申请验证码 */
  ApplyVoucherCaptchaParams: {
    methodType: 'captchaFromVoucher'; /** CSRF Token (位于 Cookie 的 bili_jct) */
    csrf?: string; /** 结构为字符串 voucher_ 尾随一串以 - 为分隔符的小写 UUID */
    v_voucher: string;
  };
  /** 验证验证码结果 */
  ValidateCaptchaParams: {
    methodType: 'validateCaptcha'; /** CSRF Token (位于 Cookie 的 bili_jct) */
    csrf?: string; /** 极验3 https://www.geetest.com 的验证码 challenge */
    challenge: string; /** 验证码 token */
    token: string; /** 人机验证成功后的 validate 参数 */
    validate: string; /** 人机验证成功后的 seccode 参数，{validate}|jordan */
    seccode: string;
  };
}
/**
 * 评论区类型枚举
 *
 * 对应 CommentParams.type 与 CommentReplyParams.type
 * @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/comment/readme.md#评论区类型代码
 */
declare enum CommentType {
  /** 视频稿件：oid 为稿件 avid */
  Video = 1,
  /** 话题：oid 为话题 id */
  Topic = 2,
  /** 活动：oid 为活动 id */
  Activity = 4,
  /** 小视频：oid 为小视频 id */
  SmallVideo = 5,
  /** 小黑屋封禁信息：oid 为封禁公示 id */
  BlockInfo = 6,
  /** 公告信息：oid 为公告 id */
  Announcement = 7,
  /** 直播活动：oid 为直播间 id */
  LiveActivity = 8,
  /** 活动稿件：oid 含义未知 */
  ActivityVideo = 9,
  /** 直播公告：oid 含义未知 */
  LiveAnnouncement = 10,
  /** 相簿（图片动态）：oid 为相簿 id */
  Album = 11,
  /** 专栏：oid 为专栏 cvid */
  Article = 12,
  /** 票务：oid 含义未知 */
  Ticket = 13,
  /** 音频：oid 为音频 auid */
  Audio = 14,
  /** 风纪委员会：oid 为众裁项目 id */
  Jury = 15,
  /** 点评：oid 含义未知 */
  Review = 16,
  /** 动态（纯文字动态&分享）：oid 为动态 id */
  Dynamic = 17,
  /** 播单：oid 含义未知 */
  Playlist = 18,
  /** 音乐播单：oid 含义未知 */
  MusicPlaylist = 19,
  /** 漫画：oid 含义未知 */
  Comic1 = 20,
  /** 漫画：oid 含义未知 */
  Comic2 = 21,
  /** 漫画：oid 为漫画 mcid */
  Comic = 22,
  /** 课程：oid 为课程 epid */
  Course = 33
}
/**
 * B站方法类型到参数的映射
 *
 * 用于根据 methodType 字符串获取对应的参数类型
 */
type BilibiliMethodOptMap = {
  videoInfo: BilibiliMethodOptionsMap['VideoInfoParams'];
  videoStream: BilibiliMethodOptionsMap['VideoStreamParams'];
  comments: BilibiliMethodOptionsMap['CommentParams'];
  commentReplies: BilibiliMethodOptionsMap['CommentReplyParams'];
  userCard: BilibiliMethodOptionsMap['UserParams'];
  userDynamicList: BilibiliMethodOptionsMap['UserParams'];
  userSpaceInfo: BilibiliMethodOptionsMap['UserParams'];
  uploaderTotalViews: BilibiliMethodOptionsMap['UserParams'];
  emojiList: BilibiliMethodOptionsMap['EmojiParams'];
  bangumiInfo: BilibiliMethodOptionsMap['BangumiInfoParams'];
  bangumiStream: BilibiliMethodOptionsMap['BangumiStreamParams'];
  dynamicDetail: BilibiliMethodOptionsMap['DynamicParams'];
  dynamicCard: BilibiliMethodOptionsMap['DynamicParams'];
  liveRoomInfo: BilibiliMethodOptionsMap['LiveRoomParams'];
  liveRoomInit: BilibiliMethodOptionsMap['LiveRoomParams'];
  loginStatus: BilibiliMethodOptionsMap['LoginBaseInfoParams'];
  loginQrcode: BilibiliMethodOptionsMap['GetQrcodeParams'];
  qrcodeStatus: BilibiliMethodOptionsMap['QrcodeParams'];
  avToBv: BilibiliMethodOptionsMap['Av2BvParams'];
  bvToAv: BilibiliMethodOptionsMap['Bv2AvParams'];
  articleContent: BilibiliMethodOptionsMap['ArticleParams'];
  articleCards: BilibiliMethodOptionsMap['ArticleCardParams'];
  articleInfo: BilibiliMethodOptionsMap['ArticleInfoParams'];
  articleListInfo: BilibiliMethodOptionsMap['ColumnInfoParams'];
  captchaFromVoucher: BilibiliMethodOptionsMap['ApplyVoucherCaptchaParams'];
  validateCaptcha: BilibiliMethodOptionsMap['ValidateCaptchaParams'];
  videoDanmaku: BilibiliMethodOptionsMap['DanmakuParams'];
}; //#endregion
//#region src/validation/bilibili.d.ts
/** 视频信息参数验证 */
declare const BilibiliVideoParamsSchema: ZodType<BilibiliMethodOptionsMap['VideoInfoParams']>;
/** 视频流参数验证 */
declare const BilibiliVideoDownloadParamsSchema: ZodType<BilibiliMethodOptionsMap['VideoStreamParams']>;
/** 评论参数验证 */
declare const BilibiliCommentParamsSchema: ZodType<BilibiliMethodOptionsMap['CommentParams']>;
/** 评论回复参数验证 */
declare const BilibiliCommentReplyParamsSchema: ZodType<BilibiliMethodOptionsMap['CommentReplyParams']>;
/** 用户参数验证 */
declare const BilibiliUserParamsSchema: ZodType<BilibiliMethodOptionsMap['UserParams']>;
/** 表情参数验证 */
declare const BilibiliEmojiParamsSchema: ZodType<BilibiliMethodOptionsMap['EmojiParams']>;
/** 番剧信息参数验证 */
declare const BilibiliBangumiInfoParamsSchema: ZodType<BilibiliMethodOptionsMap['BangumiInfoParams']>;
/** 番剧流参数验证 */
declare const BilibiliBangumiStreamParamsSchema: ZodType<BilibiliMethodOptionsMap['BangumiStreamParams']>;
/** 动态参数验证 */
declare const BilibiliDynamicParamsSchema: ZodType<BilibiliMethodOptionsMap['DynamicParams']>;
/** 直播间参数验证 */
declare const BilibiliLiveParamsSchema: ZodType<BilibiliMethodOptionsMap['LiveRoomParams']>;
/** 登录状态参数验证 */
declare const BilibiliLoginParamsSchema: ZodType<BilibiliMethodOptionsMap['LoginBaseInfoParams']>;
/** 申请二维码参数验证 */
declare const BilibiliQrcodeParamsSchema: ZodType<BilibiliMethodOptionsMap['GetQrcodeParams']>;
/** 二维码状态参数验证 */
declare const BilibiliQrcodeStatusParamsSchema: ZodType<BilibiliMethodOptionsMap['QrcodeParams']>;
/** AV转BV参数验证 */
declare const BilibiliAv2BvParamsSchema: ZodType<BilibiliMethodOptionsMap['Av2BvParams']>;
/** BV转AV参数验证 */
declare const BilibiliBv2AvParamsSchema: ZodType<BilibiliMethodOptionsMap['Bv2AvParams']>;
/** 专栏内容参数验证 */
declare const BilibiliArticleParamsSchema: ZodType<BilibiliMethodOptionsMap['ArticleParams']>;
/** 专栏卡片参数验证 */
declare const BilibiliArticleCardParamsSchema: ZodType<BilibiliMethodOptionsMap['ArticleCardParams']>;
/** 专栏信息参数验证 */
declare const BilibiliArticleInfoParamsSchema: ZodType<BilibiliMethodOptionsMap['ArticleInfoParams']>;
/** 文集信息参数验证 */
declare const BilibiliColumnInfoParamsSchema: ZodType<BilibiliMethodOptionsMap['ColumnInfoParams']>;
/** 验证码申请参数验证 */
declare const BilibiliApplyCaptchaParamsSchema: ZodType<BilibiliMethodOptionsMap['ApplyVoucherCaptchaParams']>;
/** 验证码验证参数验证 */
declare const BilibiliValidateCaptchaParamsSchema: ZodType<BilibiliMethodOptionsMap['ValidateCaptchaParams']>;
/** 弹幕参数验证 */
declare const BilibiliDanmakuParamsSchema: ZodType<BilibiliMethodOptionsMap['DanmakuParams']>;
/** B站参数验证模式映射 */
declare const BilibiliValidationSchemas: {
  readonly videoInfo: ZodType<{
    methodType: "videoInfo";
    bvid: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "videoInfo";
    bvid: string;
  }, unknown>>;
  readonly videoStream: ZodType<{
    methodType: "videoStream";
    avid: number;
    cid: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "videoStream";
    avid: number;
    cid: number;
  }, unknown>>;
  readonly comments: ZodType<{
    methodType: "comments";
    type: CommentType;
    oid: string;
    number?: number;
    mode?: 0 | 1 | 2 | 3;
    pagination_str?: string;
    plat?: number;
    seek_rpid?: string;
    web_location?: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "comments";
    type: CommentType;
    oid: string;
    number?: number;
    mode?: 0 | 1 | 2 | 3;
    pagination_str?: string;
    plat?: number;
    seek_rpid?: string;
    web_location?: string;
  }, unknown>>;
  readonly commentReplies: ZodType<{
    methodType: "commentReplies";
    type: CommentType;
    oid: string;
    root: string;
    number?: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "commentReplies";
    type: CommentType;
    oid: string;
    root: string;
    number?: number;
  }, unknown>>;
  readonly userCard: ZodType<{
    methodType: "userCard" | "userDynamicList" | "uploaderTotalViews" | "userSpaceInfo";
    host_mid: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "userCard" | "userDynamicList" | "uploaderTotalViews" | "userSpaceInfo";
    host_mid: number;
  }, unknown>>;
  readonly userDynamicList: ZodType<{
    methodType: "userCard" | "userDynamicList" | "uploaderTotalViews" | "userSpaceInfo";
    host_mid: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "userCard" | "userDynamicList" | "uploaderTotalViews" | "userSpaceInfo";
    host_mid: number;
  }, unknown>>;
  readonly userSpaceInfo: ZodType<{
    methodType: "userCard" | "userDynamicList" | "uploaderTotalViews" | "userSpaceInfo";
    host_mid: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "userCard" | "userDynamicList" | "uploaderTotalViews" | "userSpaceInfo";
    host_mid: number;
  }, unknown>>;
  readonly emojiList: ZodType<{
    methodType: "emojiList";
  }, unknown, $ZodTypeInternals<{
    methodType: "emojiList";
  }, unknown>>;
  readonly bangumiInfo: ZodType<{
    methodType: "bangumiInfo";
    season_id?: string;
    ep_id?: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "bangumiInfo";
    season_id?: string;
    ep_id?: string;
  }, unknown>>;
  readonly bangumiStream: ZodType<{
    methodType: "bangumiStream";
    cid: number;
    ep_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "bangumiStream";
    cid: number;
    ep_id: string;
  }, unknown>>;
  readonly dynamicDetail: ZodType<{
    methodType: "dynamicDetail" | "dynamicCard";
    dynamic_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "dynamicDetail" | "dynamicCard";
    dynamic_id: string;
  }, unknown>>;
  readonly dynamicCard: ZodType<{
    methodType: "dynamicDetail" | "dynamicCard";
    dynamic_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "dynamicDetail" | "dynamicCard";
    dynamic_id: string;
  }, unknown>>;
  readonly liveRoomInfo: ZodType<{
    methodType: "liveRoomInfo" | "liveRoomInit";
    room_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "liveRoomInfo" | "liveRoomInit";
    room_id: string;
  }, unknown>>;
  readonly liveRoomInit: ZodType<{
    methodType: "liveRoomInfo" | "liveRoomInit";
    room_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "liveRoomInfo" | "liveRoomInit";
    room_id: string;
  }, unknown>>;
  readonly loginStatus: ZodType<{
    methodType: "loginStatus";
  }, unknown, $ZodTypeInternals<{
    methodType: "loginStatus";
  }, unknown>>;
  readonly loginQrcode: ZodType<{
    methodType: "loginQrcode";
  }, unknown, $ZodTypeInternals<{
    methodType: "loginQrcode";
  }, unknown>>;
  readonly qrcodeStatus: ZodType<{
    methodType: "qrcodeStatus";
    qrcode_key: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "qrcodeStatus";
    qrcode_key: string;
  }, unknown>>;
  readonly uploaderTotalViews: ZodType<{
    methodType: "userCard" | "userDynamicList" | "uploaderTotalViews" | "userSpaceInfo";
    host_mid: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "userCard" | "userDynamicList" | "uploaderTotalViews" | "userSpaceInfo";
    host_mid: number;
  }, unknown>>;
  readonly avToBv: ZodType<{
    methodType: "avToBv";
    avid: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "avToBv";
    avid: number;
  }, unknown>>;
  readonly bvToAv: ZodType<{
    methodType: "bvToAv";
    bvid: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "bvToAv";
    bvid: string;
  }, unknown>>;
  readonly articleContent: ZodType<{
    methodType: "articleContent";
    id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "articleContent";
    id: string;
  }, unknown>>;
  readonly articleCards: ZodType<{
    methodType: "articleCards";
    ids: string[] | string;
  }, unknown, $ZodTypeInternals<{
    methodType: "articleCards";
    ids: string[] | string;
  }, unknown>>;
  readonly articleInfo: ZodType<{
    methodType: "articleInfo";
    id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "articleInfo";
    id: string;
  }, unknown>>;
  readonly articleListInfo: ZodType<{
    methodType: "articleListInfo";
    id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "articleListInfo";
    id: string;
  }, unknown>>;
  readonly captchaFromVoucher: ZodType<{
    methodType: "captchaFromVoucher";
    csrf?: string;
    v_voucher: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "captchaFromVoucher";
    csrf?: string;
    v_voucher: string;
  }, unknown>>;
  readonly validateCaptcha: ZodType<{
    methodType: "validateCaptcha";
    csrf?: string;
    challenge: string;
    token: string;
    validate: string;
    seccode: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "validateCaptcha";
    csrf?: string;
    challenge: string;
    token: string;
    validate: string;
    seccode: string;
  }, unknown>>;
  readonly videoDanmaku: ZodType<{
    methodType: "videoDanmaku";
    cid: number;
    segment_index?: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "videoDanmaku";
    cid: number;
    segment_index?: number;
  }, unknown>>;
};
/** B站方法路由映射 */
declare const BilibiliMethodRoutes: {
  readonly videoInfo: "/fetch_one_video";
  readonly videoStream: "/fetch_video_playurl";
  readonly comments: "/fetch_work_comments";
  readonly commentReplies: "/fetch_comment_reply";
  readonly userCard: "/fetch_user_profile";
  readonly userDynamicList: "/fetch_user_dynamic";
  readonly userSpaceInfo: "/fetch_user_space_info";
  readonly emojiList: "/fetch_emoji_list";
  readonly bangumiInfo: "/fetch_bangumi_video_info";
  readonly bangumiStream: "/fetch_bangumi_video_playurl";
  readonly dynamicDetail: "/fetch_dynamic_info";
  readonly dynamicCard: "/fetch_dynamic_card";
  readonly liveRoomInfo: "/fetch_live_room_detail";
  readonly liveRoomInit: "/fetch_liveroom_def";
  readonly loginStatus: "/login_basic_info";
  readonly loginQrcode: "/new_login_qrcode";
  readonly qrcodeStatus: "/check_qrcode";
  readonly uploaderTotalViews: "/fetch_user_full_view";
  readonly avToBv: "/av_to_bv";
  readonly bvToAv: "/bv_to_av";
  readonly articleContent: "/fetch_article_content";
  readonly articleCards: "/fetch_article_card";
  readonly articleInfo: "/fetch_article_info";
  readonly articleListInfo: "/fetch_column_info";
  readonly captchaFromVoucher: "/apply_captcha";
  readonly validateCaptcha: "/validate_captcha";
  readonly videoDanmaku: "/fetch_danmaku";
};
/** B站方法类型 */
type BilibiliMethodType = keyof typeof BilibiliValidationSchemas; //#endregion
//#region src/types/DouyinAPIParams.d.ts
/**
 * 抖音 API 参数类型定义
 *
 * 定义所有抖音 API 方法的参数接口和类型映射
 *
 * @module types/DouyinAPIParams
 */
/**
 * 抖音 API 方法参数映射接口
 *
 * 每个键对应一种 API 方法，值为该方法所需的参数接口
 */
interface DouyinMethodOptionsMap {
  /** 获取指定评论的回复 */
  CommentReplyParams: {
    methodType: 'commentReplies'; /** 视频ID */
    aweme_id: string; /** 评论ID */
    comment_id: string;
    /**
     * 获取的评论数量
     * 默认情况下，如果指定的数量不足，则获取实际的评论数量。
     * @defaultValue 5
     */
    number?: number;
    /**
     * 游标，作用类似于翻页，根据上一次评论数量递增
     * @defaultValue 0
     */
    cursor?: number;
  };
  /** 获取用户相关数据 */
  UserParams: {
    methodType: 'userProfile'; /** 用户ID */
    sec_uid: string;
  };
  /** 获取用户列表数据（视频列表、喜欢列表、推荐列表） */
  UserListParams: {
    methodType: 'userVideoList' | 'userFavoriteList' | 'userRecommendList'; /** 用户ID */
    sec_uid: string;
    /**
     * 获取的数量
     * @defaultValue 18
     */
    number?: number; /** 游标，用于获取下一页，不用填。 */
    max_cursor?: string;
  };
  /** 获取作品数据 */
  WorkParams: {
    methodType: 'videoWork' | 'imageAlbumWork' | 'slidesWork' | 'parseWork' | 'textWork'; /** 视频ID、图集ID、合辑ID */
    aweme_id: string;
  };
  /** 获取评论数据 */
  CommentParams: {
    methodType: 'comments'; /** 视频ID */
    aweme_id: string;
    /**
     * 获取的评论数量
     * 默认情况下，如果指定的数量不足，则获取实际的评论数量。
     * @defaultValue 50
     */
    number?: number;
    /**
     * 游标，作用类似于翻页，根据上一次评论数量递增
     * @defaultValue 0
     */
    cursor?: number;
  };
  /** 获取音乐数据 */
  MusicParams: {
    methodType: 'musicInfo'; /** 音乐ID */
    music_id: string;
  };
  /** 获取直播间信息 */
  LiveRoomParams: {
    methodType: 'liveRoomInfo'; /** 直播间ID，可从用户主页信息信息响应中的room_id_str值取得 */
    room_id: string; /** 直播间真实房间号（可通过live.douyin.com/{web_rid}直接访问直播间），可在在用户主页信息响应中的room_data中获取 */
    web_rid: string;
  };
  /** 申请登录二维码 */
  QrcodeParams: {
    methodType: 'loginQrcode'; /** fp指纹 */
    verify_fp: string;
  };
  /** 获取热点词数据 */
  HotWordsParams: {
    methodType: 'suggestWords'; /** 搜索词 */
    query: string;
  };
  /** 搜索数据 */
  SearchParams: {
    methodType: 'search'; /** 搜索词 */
    query: string;
    /**
     * 搜索类型
     * @default 'general'
     */
    type?: 'general' | 'user' | 'video';
    /**
     * 搜索数量
     * @default 10
     */
    number?: number; /** 上次搜索的游标值 */
    search_id?: string;
  };
  /** 获取表情列表 */
  EmojiListParams: {
    methodType: 'emojiList';
  };
  /** 获取动态表情数据 */
  EmojiProParams: {
    methodType: 'dynamicEmojiList';
  };
  /** 获取弹幕数据 */
  DanmakuParams: {
    methodType: 'danmakuList'; /** 视频ID */
    aweme_id: string;
    /**
     * 弹幕查询的开始时间（毫秒）
     * 例如：设置为5000表示从视频第5秒开始获取弹幕
     * 不设置则从视频开头（0秒）开始获取
     * @default 0
     */
    start_time?: number;
    /**
     * 弹幕查询的结束时间（毫秒）
     * 例如：设置为10000表示获取到视频第10秒的弹幕
     * 不设置则获取到视频结束
     */
    end_time?: number; /** 视频总时长 */
    duration: number;
  };
  /** 获取视频作品数据 */
  VideoWorkParams: {
    methodType: 'videoWork'; /** 视频ID */
    aweme_id: string;
  };
  /** 获取图集作品数据 */
  ImageAlbumWorkParams: {
    methodType: 'imageAlbumWork'; /** 图集ID */
    aweme_id: string;
  };
  /** 获取合辑作品数据 */
  SlidesWorkParams: {
    methodType: 'slidesWork'; /** 合辑ID */
    aweme_id: string;
  };
}
/**
 * 抖音方法类型到参数的映射
 *
 * 用于根据 methodType 字符串获取对应的参数类型
 */
type DouyinMethodOptMap = {
  textWork: DouyinMethodOptionsMap['WorkParams'];
  videoWork: DouyinMethodOptionsMap['WorkParams'];
  imageAlbumWork: DouyinMethodOptionsMap['WorkParams'];
  slidesWork: DouyinMethodOptionsMap['WorkParams'];
  parseWork: DouyinMethodOptionsMap['WorkParams'];
  comments: DouyinMethodOptionsMap['CommentParams'];
  userProfile: DouyinMethodOptionsMap['UserParams'];
  userVideoList: DouyinMethodOptionsMap['UserListParams'];
  userFavoriteList: DouyinMethodOptionsMap['UserListParams'];
  userRecommendList: DouyinMethodOptionsMap['UserListParams'];
  suggestWords: DouyinMethodOptionsMap['HotWordsParams'];
  search: DouyinMethodOptionsMap['SearchParams'];
  musicInfo: DouyinMethodOptionsMap['MusicParams'];
  liveRoomInfo: DouyinMethodOptionsMap['LiveRoomParams'];
  loginQrcode: DouyinMethodOptionsMap['QrcodeParams'];
  emojiList: DouyinMethodOptionsMap['EmojiListParams'];
  dynamicEmojiList: DouyinMethodOptionsMap['EmojiProParams'];
  commentReplies: DouyinMethodOptionsMap['CommentReplyParams'];
  danmakuList: DouyinMethodOptionsMap['DanmakuParams'];
}; //#endregion
//#region src/validation/douyin.d.ts
/** 作品参数验证 */
declare const DouyinWorkParamsSchema: ZodType<DouyinMethodOptionsMap['WorkParams']>;
/** 评论参数验证 */
declare const DouyinCommentParamsSchema: ZodType<DouyinMethodOptionsMap['CommentParams']>;
/** 热点词参数验证 */
declare const DouyinHotWordsParamsSchema: ZodType<DouyinMethodOptionsMap['HotWordsParams']>;
/** 搜索参数验证 */
declare const DouyinSearchParamsSchema: ZodType<DouyinMethodOptionsMap['SearchParams']>;
/** 评论回复参数验证 */
declare const DouyinCommentReplyParamsSchema: ZodType<DouyinMethodOptionsMap['CommentReplyParams']>;
/** 用户参数验证 */
declare const DouyinUserParamsSchema: ZodType<DouyinMethodOptionsMap['UserParams']>;
/** 用户列表参数验证（视频列表、喜欢列表、推荐列表） */
declare const DouyinUserListParamsSchema: ZodType<DouyinMethodOptionsMap['UserListParams']>;
/** 音乐参数验证 */
declare const DouyinMusicParamsSchema: ZodType<DouyinMethodOptionsMap['MusicParams']>;
/** 直播间参数验证 */
declare const DouyinLiveRoomParamsSchema: ZodType<DouyinMethodOptionsMap['LiveRoomParams']>;
/** 二维码参数验证 */
declare const DouyinQrcodeParamsSchema: ZodType<DouyinMethodOptionsMap['QrcodeParams']>;
/** 表情列表参数验证 */
declare const DouyinEmojiListParamsSchema: ZodType<DouyinMethodOptionsMap['EmojiListParams']>;
/** 动态表情参数验证 */
declare const DouyinEmojiProParamsSchema: ZodType<DouyinMethodOptionsMap['EmojiProParams']>;
/** 弹幕参数验证 */
declare const DouyinDanmakuParamsSchema: ZodType<DouyinMethodOptionsMap['DanmakuParams']>;
/** 抖音参数验证模式映射 */
declare const DouyinValidationSchemas: {
  readonly textWork: ZodType<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown>>;
  readonly parseWork: ZodType<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown>>;
  readonly videoWork: ZodType<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown>>;
  readonly imageAlbumWork: ZodType<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown>>;
  readonly slidesWork: ZodType<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "videoWork" | "imageAlbumWork" | "slidesWork" | "parseWork" | "textWork";
    aweme_id: string;
  }, unknown>>;
  readonly comments: ZodType<{
    methodType: "comments";
    aweme_id: string;
    number?: number;
    cursor?: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "comments";
    aweme_id: string;
    number?: number;
    cursor?: number;
  }, unknown>>;
  readonly userProfile: ZodType<{
    methodType: "userProfile";
    sec_uid: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "userProfile";
    sec_uid: string;
  }, unknown>>;
  readonly userVideoList: ZodType<{
    methodType: "userVideoList" | "userFavoriteList" | "userRecommendList";
    sec_uid: string;
    number?: number;
    max_cursor?: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "userVideoList" | "userFavoriteList" | "userRecommendList";
    sec_uid: string;
    number?: number;
    max_cursor?: string;
  }, unknown>>;
  readonly userFavoriteList: ZodType<{
    methodType: "userVideoList" | "userFavoriteList" | "userRecommendList";
    sec_uid: string;
    number?: number;
    max_cursor?: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "userVideoList" | "userFavoriteList" | "userRecommendList";
    sec_uid: string;
    number?: number;
    max_cursor?: string;
  }, unknown>>;
  readonly userRecommendList: ZodType<{
    methodType: "userVideoList" | "userFavoriteList" | "userRecommendList";
    sec_uid: string;
    number?: number;
    max_cursor?: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "userVideoList" | "userFavoriteList" | "userRecommendList";
    sec_uid: string;
    number?: number;
    max_cursor?: string;
  }, unknown>>;
  readonly suggestWords: ZodType<{
    methodType: "suggestWords";
    query: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "suggestWords";
    query: string;
  }, unknown>>;
  readonly search: ZodType<{
    methodType: "search";
    query: string;
    type?: "general" | "user" | "video";
    number?: number;
    search_id?: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "search";
    query: string;
    type?: "general" | "user" | "video";
    number?: number;
    search_id?: string;
  }, unknown>>;
  readonly musicInfo: ZodType<{
    methodType: "musicInfo";
    music_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "musicInfo";
    music_id: string;
  }, unknown>>;
  readonly liveRoomInfo: ZodType<{
    methodType: "liveRoomInfo";
    room_id: string;
    web_rid: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "liveRoomInfo";
    room_id: string;
    web_rid: string;
  }, unknown>>;
  readonly loginQrcode: ZodType<{
    methodType: "loginQrcode";
    verify_fp: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "loginQrcode";
    verify_fp: string;
  }, unknown>>;
  readonly emojiList: ZodType<{
    methodType: "emojiList";
  }, unknown, $ZodTypeInternals<{
    methodType: "emojiList";
  }, unknown>>;
  readonly dynamicEmojiList: ZodType<{
    methodType: "dynamicEmojiList";
  }, unknown, $ZodTypeInternals<{
    methodType: "dynamicEmojiList";
  }, unknown>>;
  readonly commentReplies: ZodType<{
    methodType: "commentReplies";
    aweme_id: string;
    comment_id: string;
    number?: number;
    cursor?: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "commentReplies";
    aweme_id: string;
    comment_id: string;
    number?: number;
    cursor?: number;
  }, unknown>>;
  readonly danmakuList: ZodType<{
    methodType: "danmakuList";
    aweme_id: string;
    start_time?: number;
    end_time?: number;
    duration: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "danmakuList";
    aweme_id: string;
    start_time?: number;
    end_time?: number;
    duration: number;
  }, unknown>>;
};
/** 抖音方法路由映射 */
declare const DouyinMethodRoutes: {
  readonly parseWork: "/fetch_one_work";
  readonly textWork: "/fetch_one_work";
  readonly videoWork: "/fetch_one_work";
  readonly imageAlbumWork: "/fetch_one_work";
  readonly slidesWork: "/fetch_one_work";
  readonly comments: "/fetch_work_comments";
  readonly commentReplies: "/fetch_video_comment_replies";
  readonly userProfile: "/fetch_user_info";
  readonly userVideoList: "/fetch_user_post_videos";
  readonly userFavoriteList: "/fetch_user_favorite_list";
  readonly userRecommendList: "/fetch_user_recommend_list";
  readonly search: "/fetch_search_info";
  readonly suggestWords: "/fetch_suggest_words";
  readonly musicInfo: "/fetch_music_work";
  readonly emojiList: "/fetch_emoji_list";
  readonly dynamicEmojiList: "/fetch_emoji_pro_list";
  readonly liveRoomInfo: "/fetch_user_live_videos";
  readonly danmakuList: "/fetch_work_danmaku";
  readonly loginQrcode: "/fetch_login_qrcode";
};
/** 抖音方法类型 */
type DouyinMethodType = keyof typeof DouyinValidationSchemas; //#endregion
//#region src/types/KuaishouAPIParams.d.ts
/**
 * 快手 API 方法参数映射
 */
interface KuaishouMethodOptionsMap {
  VideoInfoParams: {
    methodType: 'videoWork'; /** 作品ID */
    photoId: string;
  };
  CommentParams: {
    methodType: 'comments'; /** 作品ID */
    photoId: string;
  };
  UserProfileParams: {
    methodType: 'userProfile'; /** 用户主页 principalId，可直接取 profile 页 URL 末段 */
    principalId: string;
  };
  UserWorkListParams: {
    methodType: 'userWorkList'; /** 用户主页 principalId，可直接取 profile 页 URL 末段 */
    principalId: string; /** 分页游标；为空时请求首屏作品列表 */
    pcursor?: string; /** 每页数量，默认 12 */
    count?: number;
  };
  LiveRoomInfoParams: {
    methodType: 'liveRoomInfo'; /** 直播间 principalId，可直接取 /u/{principalId} URL 末段 */
    principalId: string;
  };
  EmojiListParams: {
    methodType: 'emojiList';
  };
}
/**
 * 快手方法类型到参数的映射
 */
type KuaishouMethodOptMap = {
  videoWork: KuaishouMethodOptionsMap['VideoInfoParams'];
  comments: KuaishouMethodOptionsMap['CommentParams'];
  userProfile: KuaishouMethodOptionsMap['UserProfileParams'];
  userWorkList: KuaishouMethodOptionsMap['UserWorkListParams'];
  liveRoomInfo: KuaishouMethodOptionsMap['LiveRoomInfoParams'];
  emojiList: KuaishouMethodOptionsMap['EmojiListParams'];
}; //#endregion
//#region src/validation/kuaishou.d.ts
/**
 * 快手视频参数验证模式
 */
declare const KuaishouVideoParamsSchema: ZodType<KuaishouMethodOptionsMap['VideoInfoParams']>;
/**
 * 快手评论参数验证模式
 */
declare const KuaishouCommentParamsSchema: ZodType<KuaishouMethodOptionsMap['CommentParams']>;
/**
 * 快手用户主页参数验证模式
 */
declare const KuaishouUserProfileParamsSchema: ZodType<KuaishouMethodOptionsMap['UserProfileParams']>;
/**
 * 快手用户作品列表参数验证模式
 */
declare const KuaishouUserWorkListParamsSchema: ZodType<KuaishouMethodOptionsMap['UserWorkListParams']>;
/**
 * 快手直播间信息参数验证模式
 */
declare const KuaishouLiveRoomInfoParamsSchema: ZodType<KuaishouMethodOptionsMap['LiveRoomInfoParams']>;
/**
 * 快手表情参数验证模式
 */
declare const KuaishouEmojiParamsSchema: ZodType<KuaishouMethodOptionsMap['EmojiListParams']>;
/**
 * 快手参数验证模式映射
 */
declare const KuaishouValidationSchemas: {
  readonly videoWork: ZodType<{
    methodType: "videoWork";
    photoId: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "videoWork";
    photoId: string;
  }, unknown>>;
  readonly comments: ZodType<{
    methodType: "comments";
    photoId: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "comments";
    photoId: string;
  }, unknown>>;
  readonly userProfile: ZodType<{
    methodType: "userProfile";
    principalId: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "userProfile";
    principalId: string;
  }, unknown>>;
  readonly userWorkList: ZodType<{
    methodType: "userWorkList";
    principalId: string;
    pcursor?: string;
    count?: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "userWorkList";
    principalId: string;
    pcursor?: string;
    count?: number;
  }, unknown>>;
  readonly liveRoomInfo: ZodType<{
    methodType: "liveRoomInfo";
    principalId: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "liveRoomInfo";
    principalId: string;
  }, unknown>>;
  readonly emojiList: ZodType<{
    methodType: "emojiList";
  }, unknown, $ZodTypeInternals<{
    methodType: "emojiList";
  }, unknown>>;
};
/**
 * 快手方法路由映射
 */
declare const KuaishouMethodRoutes: {
  readonly videoWork: "/fetch_one_work";
  readonly comments: "/fetch_work_comments";
  readonly userProfile: "/fetch_user_profile";
  readonly userWorkList: "/fetch_user_work_list";
  readonly liveRoomInfo: "/fetch_live_room_info";
  readonly emojiList: "/fetch_emoji_list";
};
type KuaishouMethodType = keyof typeof KuaishouValidationSchemas; //#endregion
//#region src/types/XiaohongshuAPIParams.d.ts
/**
 * 小红书 API 方法参数映射
 */
interface XiaohongshuMethodOptionsMap {
  HomeFeedParams: {
    methodType: 'homeFeed'; /** 游标分数，用于分页 */
    cursor_score?: string; /** 每次请求的数量 */
    num?: number; /** 刷新类型 */
    refresh_type?: number; /** 笔记索引 */
    note_index?: number; /** 分类 */
    category?: string; /** 搜索关键词 */
    search_key?: string;
  };
  NoteParams: {
    methodType: 'noteDetail'; /** 笔记ID */
    note_id: string; /** 反爬的 X-Sec-Token 可从web地址中获取 */
    xsec_token: string;
  };
  CommentParams: {
    methodType: 'noteComments'; /** 笔记ID */
    note_id: string; /** 游标 */
    cursor?: string; /** 反爬的 X-Sec-Token 可从web地址中获取 */
    xsec_token: string;
  };
  UserParams: {
    methodType: 'userProfile'; /** 用户ID */
    user_id: string;
  };
  UserNoteParams: {
    methodType: 'userNoteList'; /** 用户ID */
    user_id: string; /** 上一页最后一条笔记的ID */
    cursor?: string;
    /**
     * 每次请求的数量
     * @default 30
     */
    num?: number;
  };
  EmojiListParams: {
    methodType: 'emojiList';
  };
  SearchNoteParams: {
    methodType: 'searchNotes'; /** 搜索关键词 */
    keyword: string; /** 页码 */
    page?: number; /** 每页数量 */
    page_size?: number; /** 排序类型 */
    sort?: SearchSortType; /** 笔记类型 */
    note_type?: SearchNoteType;
  };
}
/**
 * 小红书方法类型到参数的映射
 */
type XiaohongshuMethodOptMap = {
  homeFeed: XiaohongshuMethodOptionsMap['HomeFeedParams'];
  noteDetail: XiaohongshuMethodOptionsMap['NoteParams'];
  noteComments: XiaohongshuMethodOptionsMap['CommentParams'];
  userProfile: XiaohongshuMethodOptionsMap['UserParams'];
  userNoteList: XiaohongshuMethodOptionsMap['UserNoteParams'];
  emojiList: XiaohongshuMethodOptionsMap['EmojiListParams'];
  searchNotes: XiaohongshuMethodOptionsMap['SearchNoteParams'];
}; //#endregion
//#region src/platform/xiaohongshu/API.d.ts
/**
 * 根据 XiaohongshuMethodOptionsMap 创建一个新的类型，去除每个字段中的 methodType
 */
type XiaohongshuMethodOptionsWithoutMethodType = { [K in keyof XiaohongshuMethodOptionsMap]: Omit<XiaohongshuMethodOptionsMap[K], 'methodType'> };
/**
 * 搜索排序类型枚举
 */
declare enum SearchSortType {
  /**
   * 默认排序
   */
  GENERAL = "general",
  /**
   * 最受欢迎（按热度降序）
   */
  MOST_POPULAR = "popularity_descending",
  /**
   * 最新发布（按时间降序）
   */
  LATEST = "time_descending"
}
/**
 * 搜索笔记类型枚举
 */
declare enum SearchNoteType {
  /**
   * 默认（全部类型）
   */
  ALL = 0,
  /**
   * 仅视频
   */
  VIDEO = 1,
  /**
   * 仅图片
   */
  IMAGE = 2
}
/**
 * 小红书API地址配置
 */
declare const xiaohongshuApiUrls: {
  /**
   * 获取首页推荐数据的接口地址
   * @param data - 请求参数
   * @returns 完整的接口URL
   */
  homeFeed(data?: XiaohongshuMethodOptionsWithoutMethodType["HomeFeedParams"]): {
    apiPath: string;
    Url: string;
    Body: {
      cursor_score: string;
      num: number;
      refresh_type: number;
      note_index: number;
      category: string;
      search_key: string;
      image_formats: string[];
    };
  };
  /**
   * 获取单个笔记数据的接口地址
   * @param data - 请求参数
   * @returns 完整的接口URL
   */
  noteDetail(data: XiaohongshuMethodOptionsWithoutMethodType["NoteParams"]): {
    apiPath: string;
    Url: string;
    Body: {
      source_note_id: string;
      image_formats: string[];
      extra: {
        need_body_topic: string;
      };
      xsec_source: string;
      xsec_token: string;
    };
  };
  /**
   * 获取评论数据的接口地址
   * @param data - 请求参数
   * @returns 完整的接口URL
   */
  noteComments(data: XiaohongshuMethodOptionsWithoutMethodType["CommentParams"]): {
    apiPath: string;
    Url: string;
  };
  /**
   * 获取用户数据的接口地址
   * @param data - 请求参数
   * @returns 完整的接口URL
   */
  userProfile(data: XiaohongshuMethodOptionsWithoutMethodType["UserParams"]): {
    apiPath: string;
    Url: string;
  };
  /**
   * 获取用户笔记数据的接口地址
   * @param data - 请求参数
   * @returns 完整的接口URL
   */
  userNoteList(data: XiaohongshuMethodOptionsWithoutMethodType["UserNoteParams"]): {
    apiPath: string;
    Url: string;
  };
  /**
   * 获取笔记表情列表的接口地址
   * @param data - 请求参数
   * @returns 完整的接口URL
   */
  emojiList(data: XiaohongshuMethodOptionsWithoutMethodType["EmojiListParams"]): {
    apiPath: string;
    Url: string;
  };
  /**
   * 搜索笔记的接口地址
   * @param data - 请求参数
   * @returns 完整的接口URL
   */
  searchNotes(data: XiaohongshuMethodOptionsWithoutMethodType["SearchNoteParams"]): {
    apiPath: string;
    Body: {
      keyword: string;
      page: number;
      page_size: number;
      sort: SearchSortType;
      note_type: SearchNoteType;
      search_id: string;
      image_formats: string[];
    };
    Url: string;
  };
}; //#endregion
//#region src/validation/xiaohongshu.d.ts
/**
 * 小红书验证模式映射
 */
declare const XiaohongshuValidationSchemas: {
  readonly homeFeed: ZodType<{
    methodType: "homeFeed";
    cursor_score?: string;
    num?: number;
    refresh_type?: number;
    note_index?: number;
    category?: string;
    search_key?: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "homeFeed";
    cursor_score?: string;
    num?: number;
    refresh_type?: number;
    note_index?: number;
    category?: string;
    search_key?: string;
  }, unknown>>;
  readonly noteDetail: ZodType<{
    methodType: "noteDetail";
    note_id: string;
    xsec_token: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "noteDetail";
    note_id: string;
    xsec_token: string;
  }, unknown>>;
  readonly noteComments: ZodType<{
    methodType: "noteComments";
    note_id: string;
    cursor?: string;
    xsec_token: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "noteComments";
    note_id: string;
    cursor?: string;
    xsec_token: string;
  }, unknown>>;
  readonly userProfile: ZodType<{
    methodType: "userProfile";
    user_id: string;
  }, unknown, $ZodTypeInternals<{
    methodType: "userProfile";
    user_id: string;
  }, unknown>>;
  readonly userNoteList: ZodType<{
    methodType: "userNoteList";
    user_id: string;
    cursor?: string;
    num?: number;
  }, unknown, $ZodTypeInternals<{
    methodType: "userNoteList";
    user_id: string;
    cursor?: string;
    num?: number;
  }, unknown>>;
  readonly emojiList: ZodType<{
    methodType: "emojiList";
  }, unknown, $ZodTypeInternals<{
    methodType: "emojiList";
  }, unknown>>;
  readonly searchNotes: ZodType<{
    methodType: "searchNotes";
    keyword: string;
    page?: number;
    page_size?: number;
    sort?: SearchSortType;
    note_type?: SearchNoteType;
  }, unknown, $ZodTypeInternals<{
    methodType: "searchNotes";
    keyword: string;
    page?: number;
    page_size?: number;
    sort?: SearchSortType;
    note_type?: SearchNoteType;
  }, unknown>>;
};
/**
 * 小红书方法路由映射
 */
declare const XiaohongshuMethodRoutes: {
  readonly homeFeed: "/fetch_home_feed";
  readonly noteDetail: "/fetch_one_note";
  readonly noteComments: "/fetch_note_comments";
  readonly userProfile: "/fetch_user_profile";
  readonly userNoteList: "/fetch_user_notes";
  readonly emojiList: "/fetch_emoji_list";
  readonly searchNotes: "/fetch_search_notes";
};
type XiaohongshuMethodType = keyof typeof XiaohongshuValidationSchemas; //#endregion
//#region src/types/NetworksConfigType.d.ts
type NetworksConfigType = {
  /**
   * 请求地址
   */
  url: string;
  /**
   * 请求方法
   */
  method?: string;
  /**
   * 请求头
   */
  headers?: any;
  /**
   * 返回数据类型，默认json
   */
  responseType?: string;
  /**
   * 请求体
   */
  body?: object | string;
  /**
   * 超时时间，单位毫秒
   */
  timeout?: number;
  /**
   * 默认跟随重定向到: 'follow'，不跟随: manual
   */
  redirect?: RequestRedirect;
  /**
   * 拓展参数，该次请求数据什么数据类型，注意是平台接口的类型定义，不是请求参数
   */
  methodType?: string;
};
/** API标准化HTTP请求错误类型 */
type ErrorDetail = {
  /**
   * 错误描述信息
   */
  errorDescription: string;
  /**
   * 请求类型
   */
  requestType: string;
  /**
   * 请求URL地址
   */
  requestUrl: string;
  /**
   * 接口响应数据的 code 属性
   * 个别平台可能不存在
   */
  responseCode?: string;
};
/** 未知错误 */
declare enum amagiAPIErrorCode {
  /** 未知错误 */
  UNKNOWN = "UNKNOWN_ERROR"
}
/** 抖音平台API错误码 */
declare enum douoyinAPIErrorCode {
  /** Cookie无效或已过期 */
  COOKIE = "INVALID_COOKIE",
  /** 内容被隐藏或下架 */
  FILTER = "CONTENT_FILTERED",
  /** 当前用户未开播 */
  NOT_LIVE = "USER_NOT_LIVE",
  /** 未知错误 */
  UNKNOWN = "UNKNOWN_ERROR"
}
/** B站平台API错误码 */
declare enum bilibiliAPIErrorCode {
  /** 应用程序不存在或已被封禁 */
  APP_NOT_FOUND = "-1",
  /** Access Key 错误 */
  ACCESS_KEY_ERROR = "-2",
  /** API 校验密匙错误 */
  API_KEY_ERROR = "-3",
  /** 调用方对该Method没有权限 */
  METHOD_NOT_PERMITTED = "-4",
  /** 账号未登录 */
  NOT_LOGGED_IN = "-101",
  /** 账号被封停 */
  ACCOUNT_BANNED = "-102",
  /** 积分不足 */
  POINTS_INSUFFICIENT = "-103",
  /** 硬币不足 */
  COINS_INSUFFICIENT = "-104",
  /** 验证码错误 */
  CAPTCHA_ERROR = "-105",
  /** 账号非正式会员或在适应期 */
  MEMBERSHIP_LIMITED = "-106",
  /** 应用不存在或者被封禁 */
  APP_BANNED = "-107",
  /** 未绑定手机 */
  PHONE_NOT_BOUND = "-108",
  /** 未绑定手机 */
  PHONE_NOT_BOUND_2 = "-110",
  /** csrf 校验失败 */
  CSRF_ERROR = "-111",
  /** 系统升级中 */
  SYSTEM_UPDATING = "-112",
  /** 账号尚未实名认证 */
  NOT_REAL_NAME_VERIFIED = "-113",
  /** 请先绑定手机 */
  NEED_BIND_PHONE = "-114",
  /** 请先完成实名认证 */
  NEED_REAL_NAME_VERIFICATION = "-115",
  /** 木有改动 */
  NO_CHANGE = "-304",
  /** 撞车跳转 */
  CONFLICT_REDIRECT = "-307",
  /** 风控校验失败 (UA 或 wbi 参数不合法) */
  RISK_CONTROL_FAILED = "-352",
  /** 请求错误 */
  BAD_REQUEST = "-400",
  /** 未认证 (或非法请求) */
  UNAUTHORIZED = "-401",
  /** 访问权限不足 */
  FORBIDDEN = "-403",
  /** 啥都木有 */
  NOT_FOUND = "-404",
  /** 不支持该方法 */
  METHOD_NOT_ALLOWED = "-405",
  /** 冲突 */
  CONFLICT = "-409",
  /** 请求被拦截 (客户端 ip 被服务端风控) */
  IP_BLOCKED = "-412",
  /** 服务器错误 */
  SERVER_ERROR = "-500",
  /** 过载保护,服务暂不可用 */
  SERVICE_UNAVAILABLE = "-503",
  /** 服务调用超时 */
  GATEWAY_TIMEOUT = "-504",
  /** 超出限制 */
  RATE_LIMITED = "-509",
  /** 上传文件不存在 */
  FILE_NOT_FOUND = "-616",
  /** 上传文件太大 */
  FILE_TOO_LARGE = "-617",
  /** 登录失败次数太多 */
  LOGIN_ATTEMPTS_EXCEEDED = "-625",
  /** 用户不存在 */
  USER_NOT_FOUND = "-626",
  /** 密码太弱 */
  WEAK_PASSWORD = "-628",
  /** 用户名或密码错误 */
  INVALID_CREDENTIALS = "-629",
  /** 操作对象数量限制 */
  OBJECT_LIMIT_EXCEEDED = "-632",
  /** 被锁定 */
  ACCOUNT_LOCKED = "-643",
  /** 用户等级太低 */
  USER_LEVEL_TOO_LOW = "-650",
  /** 重复的用户 */
  DUPLICATE_USER = "-652",
  /** Token 过期 */
  TOKEN_EXPIRED = "-658",
  /** 密码时间戳过期 */
  PASSWORD_TIMESTAMP_EXPIRED = "-662",
  /** 地理区域限制 */
  GEO_RESTRICTED = "-688",
  /** 版权限制 */
  COPYRIGHT_RESTRICTED = "-689",
  /** 扣节操失败 */
  REPUTATION_DEDUCTION_FAILED = "-701",
  /** 请求过于频繁，请稍后再试 */
  TOO_MANY_REQUESTS = "-799",
  /** 服务器开小差了 */
  SERVER_TEMPORARILY_UNAVAILABLE = "-8888",
  /** 未知错误 */
  UNKNOWN = "UNKNOWN"
}
/** 快手平台API错误码 */
declare enum kuaishouAPIErrorCode {
  /** Cookie无效或已过期 */
  COOKIE = "INVALID_COOKIE",
  /** 未知错误 */
  UNKNOWN = "UNKNOWN_ERROR"
}
/** 小红书平台API错误码 */
declare enum xiaohongshuAPIErrorCode {
  /** Cookie无效或已过期 */
  COOKIE = "INVALID_COOKIE",
  /** 未知错误 */
  UNKNOWN = "UNKNOWN_ERROR",
  /** 非法请求 */
  ILLEGAL_REQUEST = 500,
  /** 检测到帐号异常，请稍后重试 */
  ACCOUNT_ABNORMAL = 300011,
  /** 网络连接异常，请检查网络设置后重试 */
  NETWORK_ERROR = 300012,
  /** 访问频次异常，请勿频繁操作 */
  FREQUENCY_ERROR = 300013,
  /** 浏览器异常，请尝试更换浏览器后重试 */
  BROWSER_ERROR = 300015
} //#endregion
//#region src/types/ReturnDataType/Bilibili/ArticleCard.d.ts
type ArticleCard = {
  code: number;
  data: DataData$26;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$26 = {
  av2: Av2;
  cv1: Cv1;
  cv2: Cv2;
  lv5440: Lv5440;
  [property: string]: any;
};
type Av2 = {
  aid: number;
  bvid: string;
  cid: number;
  copyright: number;
  cover43: string;
  ctime: number;
  desc: string;
  dimension: Dimension;
  duration: number;
  dynamic: string;
  owner: Owner$1;
  pic: string;
  pubdate: number;
  rights: Rights$1;
  short_link_v2: string;
  stat: Stat$3;
  state: number;
  tid: number;
  title: string;
  tname: string;
  videos: number;
  vt_switch: boolean;
  [property: string]: any;
};
type Dimension = {
  height: number;
  rotate: number;
  width: number;
  [property: string]: any;
};
type Owner$1 = {
  face: string;
  mid: number;
  name: string;
  [property: string]: any;
};
type Rights$1 = {
  arc_pay: number;
  autoplay: number;
  bp: number;
  download: number;
  elec: number;
  hd5: number;
  is_cooperation: number;
  movie: number;
  no_background: number;
  no_reprint: number;
  pay: number;
  pay_free_watch: number;
  ugc_pay: number;
  ugc_pay_preview: number;
  [property: string]: any;
};
type Stat$3 = {
  aid: number;
  coin: number;
  danmaku: number;
  dislike: number;
  favorite: number;
  his_rank: number;
  like: number;
  now_rank: number;
  reply: number;
  share: number;
  view: number;
  vt: number;
  vv: number;
  [property: string]: any;
};
type Cv1 = {
  act_id: number;
  apply_time: string;
  attributes: number;
  authenMark: null;
  author: Cv1Author;
  banner_url: string;
  categories: PurpleCategory$1[];
  category: FluffyCategory;
  check_state: number;
  check_time: string;
  content_pic_list: null;
  cover_avid: number;
  ctime: number;
  dispute: null;
  dynamic: string;
  id: number;
  image_urls: string[];
  is_like: boolean;
  list: List$1;
  media: Cv1Media;
  mtime: number;
  origin_image_urls: string[];
  origin_template_id: number;
  original: number;
  private_pub: number;
  publish_time: number;
  reprint: number;
  state: number;
  stats: Cv1Stats;
  summary: string;
  template_id: number;
  title: string;
  top_video_info: null;
  type: number;
  words: number;
  [property: string]: any;
};
type Cv1Author = {
  face: string;
  fans: number;
  level: number;
  mid: number;
  name: string;
  nameplate: PurpleNameplate$1;
  official_verify: PurpleOfficialVerify$5;
  pendant: PurplePendant$5;
  vip: PurpleVip$5;
  [property: string]: any;
};
type PurpleNameplate$1 = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type PurpleOfficialVerify$5 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type PurplePendant$5 = {
  expire: number;
  image: string;
  name: string;
  pid: number;
  [property: string]: any;
};
type PurpleVip$5 = {
  avatar_subscript: number;
  due_date: number;
  label: PurpleLabel$5;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  vip_pay_type: number;
  [property: string]: any;
};
type PurpleLabel$5 = {
  label_theme: string;
  path: string;
  text: string;
  [property: string]: any;
};
type PurpleCategory$1 = {
  id: number;
  name: string;
  parent_id: number;
  [property: string]: any;
};
type FluffyCategory = {
  id: number;
  name: string;
  parent_id: number;
  [property: string]: any;
};
type List$1 = {
  apply_time: string;
  articles_count: number;
  check_time: string;
  ctime: number;
  id: number;
  image_url: string;
  mid: number;
  name: string;
  publish_time: number;
  read: number;
  reason: string;
  state: number;
  summary: string;
  update_time: number;
  words: number;
  [property: string]: any;
};
type Cv1Media = {
  area: string;
  cover: string;
  media_id: number;
  score: number;
  season_id: number;
  spoiler: number;
  title: string;
  type_id: number;
  type_name: string;
  [property: string]: any;
};
type Cv1Stats = {
  coin: number;
  dislike: number;
  dynamic: number;
  favorite: number;
  like: number;
  reply: number;
  share: number;
  view: number;
  [property: string]: any;
};
type Cv2 = {
  act_id: number;
  apply_time: string;
  authenMark: null;
  author: Cv2Author;
  banner_url: string;
  categories: TentacledCategory[];
  category: StickyCategory;
  check_state: number;
  check_time: string;
  content_pic_list: null;
  cover_avid: number;
  ctime: number;
  dispute: null;
  id: number;
  image_urls: string[];
  is_like: boolean;
  list: null;
  media: Cv2Media;
  mtime: number;
  origin_image_urls: string[];
  origin_template_id: number;
  original: number;
  private_pub: number;
  publish_time: number;
  reprint: number;
  state: number;
  stats: Cv2Stats;
  summary: string;
  template_id: number;
  title: string;
  top_video_info: null;
  type: number;
  words: number;
  [property: string]: any;
};
type Cv2Author = {
  face: string;
  fans: number;
  level: number;
  mid: number;
  name: string;
  nameplate: FluffyNameplate$1;
  official_verify: FluffyOfficialVerify$5;
  pendant: FluffyPendant$5;
  vip: FluffyVip$5;
  [property: string]: any;
};
type FluffyNameplate$1 = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type FluffyOfficialVerify$5 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type FluffyPendant$5 = {
  expire: number;
  image: string;
  name: string;
  pid: number;
  [property: string]: any;
};
type FluffyVip$5 = {
  avatar_subscript: number;
  due_date: number;
  label: FluffyLabel$5;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  vip_pay_type: number;
  [property: string]: any;
};
type FluffyLabel$5 = {
  label_theme: string;
  path: string;
  text: string;
  [property: string]: any;
};
type TentacledCategory = {
  id: number;
  name: string;
  parent_id: number;
  [property: string]: any;
};
type StickyCategory = {
  id: number;
  name: string;
  parent_id: number;
  [property: string]: any;
};
type Cv2Media = {
  area: string;
  cover: string;
  media_id: number;
  score: number;
  season_id: number;
  spoiler: number;
  title: string;
  type_id: number;
  type_name: string;
  [property: string]: any;
};
type Cv2Stats = {
  coin: number;
  dislike: number;
  dynamic: number;
  favorite: number;
  like: number;
  reply: number;
  share: number;
  view: number;
  [property: string]: any;
};
type Lv5440 = {
  area_v2_name: string;
  cover: string;
  face: string;
  live_status: number;
  online: number;
  pendent_ru: string;
  pendent_ru_color: string;
  pendent_ru_pic: string;
  role: number;
  room_id: number;
  title: string;
  uid: number;
  uname: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/ArticleContent.d.ts
type ArticleContent = {
  code: number;
  data: DataData$25;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$25 = {
  act_id: number;
  apply_time: string;
  authenMark: null;
  author: Author$10;
  banner_url: string;
  categories: CategoryElement[];
  category: PurpleCategory;
  check_state: number;
  check_time: string;
  content: string;
  content_pic_list: null;
  cover_avid: number;
  ctime: number;
  dispute: null;
  dyn_id_str: string;
  id: number;
  image_urls: string[];
  is_like: boolean;
  keywords: string;
  list: null;
  media: Media;
  mtime: number;
  opus: Opus$5;
  origin_image_urls: string[];
  origin_template_id: number;
  original: number;
  private_pub: number;
  publish_time: number;
  reprint: number;
  state: number;
  stats: Stats$1;
  summary: string;
  template_id: number;
  title: string;
  top_video_info: null;
  total_art_num: number;
  type: number;
  version_id: number;
  words: number;
  [property: string]: any;
};
type Author$10 = {
  face: string;
  fans: number;
  level: number;
  mid: number;
  name: string;
  nameplate: Nameplate$4;
  official_verify: OfficialVerify$9;
  pendant: Pendant$10;
  vip: Vip$10;
  [property: string]: any;
};
type Nameplate$4 = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type OfficialVerify$9 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type Pendant$10 = {
  expire: number;
  image: string;
  name: string;
  pid: number;
  [property: string]: any;
};
type Vip$10 = {
  avatar_subscript: number;
  due_date: number;
  label: Label$10;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  vip_pay_type: number;
  [property: string]: any;
};
type Label$10 = {
  label_theme: string;
  path: string;
  text: string;
  [property: string]: any;
};
type CategoryElement = {
  id: number;
  name: string;
  parent_id: number;
  [property: string]: any;
};
type PurpleCategory = {
  id: number;
  name: string;
  parent_id: number;
  [property: string]: any;
};
type Media = {
  area: string;
  cover: string;
  media_id: number;
  score: number;
  season_id: number;
  spoiler: number;
  title: string;
  type_id: number;
  type_name: string;
  [property: string]: any;
};
type Opus$5 = {
  article: Article$1;
  content: Content$1;
  opus_id: number;
  opus_source: number;
  pub_info: PubInfo;
  title: string;
  translate_result: TranslateResult;
  version: Version;
  [property: string]: any;
};
type Article$1 = {
  category_id: number;
  cover: Cover$8[];
  [property: string]: any;
};
type Cover$8 = {
  height?: number;
  size?: number;
  url?: string;
  width?: number;
  [property: string]: any;
};
type Content$1 = {
  paragraphs: Paragraph[];
  [property: string]: any;
};
type Paragraph = {
  para_type: number;
  pic: ParagraphPic;
  text: Text$1;
  [property: string]: any;
};
type ParagraphPic = {
  pics: PicElement[];
  style: number;
  [property: string]: any;
};
type PicElement = {
  height: number;
  size: number;
  url: string;
  width: number;
  [property: string]: any;
};
type Text$1 = {
  nodes: Node[];
  [property: string]: any;
};
type Node = {
  node_type: number;
  word: Word$9;
  [property: string]: any;
};
type Word$9 = {
  font_level: string;
  font_size: number;
  style: Style;
  words: string;
  [property: string]: any;
};
type Style = {
  bold: boolean;
  [property: string]: any;
};
type PubInfo = {
  pub_time: number;
  uid: number;
  [property: string]: any;
};
type TranslateResult = {
  lang_match_result: number;
  source_lang: string;
  state: number;
  [property: string]: any;
};
type Version = {
  cvid: number;
  version_id: number;
  [property: string]: any;
};
type Stats$1 = {
  coin: number;
  dislike: number;
  dynamic: number;
  favorite: number;
  like: number;
  reply: number;
  share: number;
  view: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/ArticleInfo.d.ts
type ArticleInfo = {
  code: number;
  data: DataData$24;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$24 = {
  attention: boolean;
  author_name: string;
  banner_url: string;
  coin: number;
  disable_share: boolean;
  favorite: boolean;
  image_urls: string[];
  in_list: boolean;
  is_author: boolean;
  like: number;
  location: string;
  mid: number;
  next: number;
  origin_image_urls: string[];
  pre: number;
  share_channels: ShareChannel[];
  shareable: boolean;
  show_later_watch: boolean;
  show_small_window: boolean;
  stats: Stats;
  title: string;
  type: number;
  video_url: string;
  [property: string]: any;
};
type ShareChannel = {
  name: string;
  picture: string;
  share_channel: string;
  [property: string]: any;
};
type Stats = {
  coin: number;
  dislike: number;
  dynamic: number;
  favorite: number;
  like: number;
  reply: number;
  share: number;
  view: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/AV2BV.d.ts
type BiliAv2Bv = {
  code: number;
  data: Data$15;
  message: string;
  [property: string]: any;
};
type Data$15 = {
  bvid: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/BangumiVideoInfo.d.ts
type BiliBangumiVideoInfo = {
  code: number;
  message: string;
  result: Result$5;
  [property: string]: any;
};
type Result$5 = {
  activity: Activity$5;
  actors: string;
  alias: string;
  areas: Area[];
  bkg_cover: string;
  cover: string;
  delivery_fragment_video: boolean;
  enable_vt: boolean;
  episodes: ResultEpisode[];
  evaluate: string;
  freya: Freya;
  hide_ep_vv_vt_dm: number;
  icon_font: ResultIconFont;
  jp_title: string;
  link: string;
  media_id: number;
  mode: number;
  new_ep: ResultNewEp;
  payment: Payment;
  play_strategy: PlayStrategy;
  positive: Positive;
  publish: Publish;
  rating: Rating;
  record: string;
  rights: ResultRights;
  season_id: number;
  season_title: string;
  seasons: Season[];
  section: Section[];
  series: Series$1;
  share_copy: string;
  share_sub_title: string;
  share_url: string;
  show: Show;
  show_season_type: number;
  square_cover: string;
  staff: string;
  stat: ResultStat;
  status: number;
  styles: string[];
  subtitle: string;
  title: string;
  total: number;
  type: number;
  up_info: UpInfo;
  user_status: UserStatus;
  [property: string]: any;
};
type Activity$5 = {
  head_bg_url: string;
  id: number;
  title: string;
  [property: string]: any;
};
type Area = {
  id?: number;
  name?: string;
  [property: string]: any;
};
type ResultEpisode = {
  aid: number;
  badge: string;
  badge_info: PurpleBadgeInfo;
  badge_type: number;
  bvid: string;
  cid: number;
  cover: string;
  dimension: PurpleDimension;
  duration: number;
  enable_vt: boolean;
  ep_id: number;
  from: string;
  id: number;
  is_view_hide: boolean;
  link: string;
  long_title: string;
  pub_time: number;
  pv: number;
  release_date: string;
  rights: PurpleRights;
  section_type: number;
  share_copy: string;
  share_url: string;
  short_link: string;
  show_title: string;
  showDrmLoginDialog: boolean;
  status: number;
  subtitle: string;
  title: string;
  vid: string;
  [property: string]: any;
};
type PurpleBadgeInfo = {
  bg_color: string;
  bg_color_night: string;
  text: string;
  [property: string]: any;
};
type PurpleDimension = {
  height: number;
  rotate: number;
  width: number;
  [property: string]: any;
};
type PurpleRights = {
  allow_demand: number;
  allow_dm: number;
  allow_download: number;
  area_limit: number;
  [property: string]: any;
};
type Freya = {
  bubble_desc: string;
  bubble_show_cnt: number;
  icon_show: number;
  [property: string]: any;
};
type ResultIconFont = {
  name: string;
  text: string;
  [property: string]: any;
};
type ResultNewEp = {
  desc: string;
  id: number;
  is_new: number;
  title: string;
  [property: string]: any;
};
type Payment = {
  discount: number;
  pay_type: PayType;
  price: string;
  promotion: string;
  tip: string;
  view_start_time: number;
  vip_discount: number;
  vip_first_promotion: string;
  vip_price: string;
  vip_promotion: string;
  [property: string]: any;
};
type PayType = {
  allow_discount: number;
  allow_pack: number;
  allow_ticket: number;
  allow_time_limit: number;
  allow_vip_discount: number;
  forbid_bb: number;
  [property: string]: any;
};
type PlayStrategy = {
  strategies: string[];
  [property: string]: any;
};
type Positive = {
  id: number;
  title: string;
  [property: string]: any;
};
type Publish = {
  is_finish: number;
  is_started: number;
  pub_time: string;
  pub_time_show: string;
  unknow_pub_date: number;
  weekday: number;
  [property: string]: any;
};
type Rating = {
  count: number;
  score: number;
  [property: string]: any;
};
type ResultRights = {
  allow_bp: number;
  allow_bp_rank: number;
  allow_download: number;
  allow_review: number;
  area_limit: number;
  ban_area_show: number;
  can_watch: number;
  copyright: string;
  forbid_pre: number;
  freya_white: number;
  is_cover_show: number;
  is_preview: number;
  only_vip_download: number;
  resource: string;
  watch_platform: number;
  [property: string]: any;
};
type Season = {
  badge?: string;
  badge_info?: SeasonBadgeInfo;
  badge_type?: number;
  cover?: string;
  enable_vt?: boolean;
  horizontal_cover_1610?: string;
  horizontal_cover_169?: string;
  icon_font?: SeasonIconFont;
  media_id?: number;
  new_ep?: SeasonNewEp;
  season_id?: number;
  season_title?: string;
  season_type?: number;
  stat?: SeasonStat;
  [property: string]: any;
};
type SeasonBadgeInfo = {
  bg_color: string;
  bg_color_night: string;
  text: string;
  [property: string]: any;
};
type SeasonIconFont = {
  name: string;
  text: string;
  [property: string]: any;
};
type SeasonNewEp = {
  cover: string;
  id: number;
  index_show: string;
  [property: string]: any;
};
type SeasonStat = {
  favorites: number;
  series_follow: number;
  views: number;
  vt: number;
  [property: string]: any;
};
type Section = {
  attr: number;
  episode_id: number;
  episode_ids: string[];
  episodes: SectionEpisode[];
  id: number;
  title: string;
  type: number;
  type2: number;
  [property: string]: any;
};
type SectionEpisode = {
  aid: number;
  badge: string;
  badge_info: FluffyBadgeInfo;
  badge_type: number;
  bvid: string;
  cid: number;
  cover: string;
  dimension: FluffyDimension;
  duration: number;
  enable_vt: boolean;
  ep_id: number;
  from: string;
  icon_font: EpisodeIconFont;
  id: number;
  is_view_hide: boolean;
  link: string;
  long_title: string;
  pub_time: number;
  pv: number;
  release_date: string;
  rights: FluffyRights;
  section_type: number;
  share_copy: string;
  share_url: string;
  short_link: string;
  show_title: string;
  showDrmLoginDialog: boolean;
  stat: EpisodeStat;
  stat_for_unity: StatForUnity;
  status: number;
  subtitle: string;
  title: string;
  vid: string;
  [property: string]: any;
};
type FluffyBadgeInfo = {
  bg_color: string;
  bg_color_night: string;
  text: string;
  [property: string]: any;
};
type FluffyDimension = {
  height: number;
  rotate: number;
  width: number;
  [property: string]: any;
};
type EpisodeIconFont = {
  name: string;
  text: string;
  [property: string]: any;
};
type FluffyRights = {
  allow_demand: number;
  allow_dm: number;
  allow_download: number;
  area_limit: number;
  [property: string]: any;
};
type EpisodeStat = {
  coin: number;
  danmakus: number;
  likes: number;
  play: number;
  reply: number;
  vt: number;
  [property: string]: any;
};
type StatForUnity = {
  coin: number;
  danmaku: Danmaku;
  likes: number;
  reply: number;
  vt: Vt;
  [property: string]: any;
};
type Danmaku = {
  icon: string;
  pure_text: string;
  text: string;
  value: number;
  [property: string]: any;
};
type Vt = {
  icon: string;
  pure_text: string;
  text: string;
  value: number;
  [property: string]: any;
};
type Series$1 = {
  display_type: number;
  series_id: number;
  series_title: string;
  [property: string]: any;
};
type Show = {
  wide_screen: number;
  [property: string]: any;
};
type ResultStat = {
  coins: number;
  danmakus: number;
  favorite: number;
  favorites: number;
  follow_text: string;
  likes: number;
  reply: number;
  share: number;
  views: number;
  vt: number;
  [property: string]: any;
};
type UpInfo = {
  avatar: string;
  avatar_subscript_url: string;
  follower: number;
  is_follow: number;
  mid: number;
  nickname_color: string;
  pendant: Pendant$9;
  theme_type: number;
  uname: string;
  verify_type: number;
  vip_label: VipLabel;
  vip_status: number;
  vip_type: number;
  [property: string]: any;
};
type Pendant$9 = {
  image: string;
  name: string;
  pid: number;
  [property: string]: any;
};
type VipLabel = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  text: string;
  text_color: string;
  [property: string]: any;
};
type UserStatus = {
  area_limit: number;
  ban_area_show: number;
  follow: number;
  follow_status: number;
  login: number;
  pay: number;
  pay_pack_paid: number;
  progress: Progress;
  sponsor: number;
  vip_info: VipInfo;
  [property: string]: any;
};
type Progress = {
  last_ep_id: number;
  last_ep_index: string;
  last_time: number;
  [property: string]: any;
};
type VipInfo = {
  due_date: number;
  status: number;
  type: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/BangumiVideoPlayurlIsLogin.d.ts
/** 番剧下载地址（已登录） */
type BiliBangumiVideoPlayurlIsLogin = {
  code: number;
  message: string;
  result: Result$4;
  [property: string]: any;
};
type Result$4 = {
  accept_description: string[];
  accept_format: string;
  accept_quality: number[];
  bp: number;
  clip_info_list: string[];
  code: number;
  dash: Dash$1;
  durls: string[];
  fnval: number;
  fnver: number;
  format: string;
  from: string;
  has_paid: boolean;
  is_drm: boolean;
  is_preview: number;
  message: string;
  no_rexcode: number;
  quality: number;
  record_info: RecordInfo$1;
  result: string;
  seek_param: string;
  seek_type: string;
  status: number;
  support_formats: SupportFormat$3[];
  timelength: number;
  type: string;
  video_codecid: number;
  video_project: boolean;
  vip_status: number;
  vip_type: number;
  [property: string]: any;
};
type Dash$1 = {
  audio: Audio$4[];
  dolby: Dolby$1;
  duration: number;
  min_buffer_time: number;
  minBufferTime: number;
  video: Video$8[];
  [property: string]: any;
};
type Audio$4 = {
  backup_url: string[];
  backupUrl: string[];
  bandwidth: number;
  base_url: string;
  baseUrl: string;
  codecid: number;
  codecs: string;
  frame_rate: string;
  frameRate: string;
  height: number;
  id: number;
  md5: string;
  mime_type: string;
  mimeType: string;
  sar: string;
  segment_base: AudioSegmentBaseObject$1;
  SegmentBase: AudioSegmentBase$1;
  size: number;
  start_with_sap: number;
  startWithSAP: number;
  width: number;
  [property: string]: any;
};
type AudioSegmentBase$1 = {
  indexRange: string;
  Initialization: string;
  [property: string]: any;
};
type AudioSegmentBaseObject$1 = {
  index_range: string;
  initialization: string;
  [property: string]: any;
};
type Dolby$1 = {
  audio: string[];
  type: number;
  [property: string]: any;
};
type Video$8 = {
  backup_url: string[];
  backupUrl: string[];
  bandwidth: number;
  base_url: string;
  baseUrl: string;
  codecid: number;
  codecs: string;
  frame_rate: string;
  frameRate: string;
  height: number;
  id: number;
  md5: string;
  mime_type: string;
  mimeType: string;
  sar: string;
  segment_base: VideoSegmentBaseObject$1;
  SegmentBase: VideoSegmentBase$1;
  size: number;
  start_with_sap: number;
  startWithSAP: number;
  width: number;
  [property: string]: any;
};
type VideoSegmentBase$1 = {
  indexRange: string;
  Initialization: string;
  [property: string]: any;
};
type VideoSegmentBaseObject$1 = {
  index_range: string;
  initialization: string;
  [property: string]: any;
};
type RecordInfo$1 = {
  record: string;
  record_icon: string;
  [property: string]: any;
};
type SupportFormat$3 = {
  codecs: string[];
  description: string;
  display_desc: string;
  format: string;
  has_preview: boolean;
  need_login: boolean;
  need_vip: boolean;
  new_description: string;
  quality: number;
  sub_description: string;
  superscript: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/BangumiVideoPlayurlNoLogin.d.ts
/** 番剧下载地址（未登录） */
type BiliBangumiVideoPlayurlNoLogin = {
  code: number;
  message: string;
  result: Result$3;
  [property: string]: any;
};
type Result$3 = {
  accept_description: string[];
  accept_format: string;
  accept_quality: number[];
  bp: number;
  clip_info_list: string[];
  code: number;
  durl: Durl$1[];
  durls: string[];
  fnval: number;
  fnver: number;
  format: string;
  from: string;
  has_paid: boolean;
  is_drm: boolean;
  is_preview: number;
  message: string;
  no_rexcode: number;
  quality: number;
  record_info: RecordInfo;
  result: string;
  seek_param: string;
  seek_type: string;
  status: number;
  support_formats: SupportFormat$2[];
  timelength: number;
  type: string;
  video_codecid: number;
  video_project: boolean;
  [property: string]: any;
};
type Durl$1 = {
  ahead?: string;
  backup_url?: string[];
  length?: number;
  md5?: string;
  order?: number;
  size?: number;
  url?: string;
  vhead?: string;
  [property: string]: any;
};
type RecordInfo = {
  record: string;
  record_icon: string;
  [property: string]: any;
};
type SupportFormat$2 = {
  codecs: string[];
  description: string;
  display_desc: string;
  format: string;
  has_preview: boolean;
  need_login?: boolean;
  new_description: string;
  quality: number;
  sub_description: string;
  superscript: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/EmojiList.d.ts
type BiliEmojiList = {
  code: number;
  data: Data$14;
  message: string;
  ttl: number;
  [property: string]: any;
};
type Data$14 = {
  packages: Package[];
  setting: Setting;
  [property: string]: any;
};
type Package = {
  attr: number;
  emote: Emote$1[];
  flags: PackageFlags;
  id: number;
  label: null;
  meta: PackageMeta;
  mtime: number;
  package_sub_title: string;
  ref_mid: number;
  resource_type: number;
  text: string;
  type: number;
  url: string;
  [property: string]: any;
};
type Emote$1 = {
  activity: null;
  attr: number;
  flags: EmoteFlags;
  gif_url: string;
  id: number;
  meta: EmoteMeta;
  mtime: number;
  package_id: number;
  text: string;
  type: number;
  url: string;
  [property: string]: any;
};
type EmoteFlags = {
  no_access: boolean;
  unlocked: boolean;
  [property: string]: any;
};
type EmoteMeta = {
  alias: string;
  gif_url?: string;
  size: number;
  suggest: string[];
  [property: string]: any;
};
type PackageFlags = {
  added: boolean;
  preview?: boolean;
  [property: string]: any;
};
type PackageMeta = {
  item_id: number;
  size: number;
  [property: string]: any;
};
type Setting = {
  attr: number;
  focus_pkg_id: number;
  recent_limit: number;
  schema: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/BiliCommentReply.d.ts
type BiliCommentReply = {
  code: number;
  data: DataData$23;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$23 = {
  assist: number;
  blacklist: number;
  callbacks: {
    [key: string]: any;
  };
  cm_info: CmInfo$1;
  config: Config$1;
  control: Control$1;
  cursor: Cursor$1;
  effects: Effects$1;
  note: number;
  replies: Reply[];
  top: Top$1;
  top_replies: string[];
  upper: Upper;
  vote: number;
  [property: string]: any;
};
type CmInfo$1 = {
  ads: Ads$1;
  [property: string]: any;
};
type Ads$1 = {
  4763: The4763[];
  [property: string]: any;
};
type The4763 = {
  activity_type?: number;
  ad_cb?: string;
  ad_desc?: string;
  adver_name?: string;
  agency?: string;
  area?: number;
  cm_mark?: number;
  contract_id?: string;
  creative_id?: number;
  creative_type?: number;
  epid?: number;
  id?: number;
  intro?: string;
  is_ad?: boolean;
  is_ad_loc?: boolean;
  label?: string;
  litpic?: string;
  mid?: string;
  name?: string;
  null_frame?: boolean;
  pic?: string;
  pic_main_color?: string;
  pos_num?: number;
  request_id?: string;
  server_type?: number;
  show_url?: string;
  src_id?: number;
  stime?: number;
  style?: number;
  sub_title?: string;
  title?: string;
  url?: string;
  [property: string]: any;
};
type Config$1 = {
  read_only: boolean;
  show_up_flag: boolean;
  showtopic: number;
  [property: string]: any;
};
type Control$1 = {
  answer_guide_android_url: string;
  answer_guide_icon_url: string;
  answer_guide_ios_url: string;
  answer_guide_text: string;
  bg_text: string;
  child_input_text: string;
  disable_jump_emote: boolean;
  empty_page: null;
  enable_charged: boolean;
  enable_cm_biz_helper: boolean;
  giveup_input_text: string;
  input_disable: boolean;
  preload_resources: null;
  root_input_text: string;
  screenshot_icon_state: number;
  show_text: string;
  show_type: number;
  upload_picture_icon_state: number;
  web_selection: boolean;
  [property: string]: any;
};
type Cursor$1 = {
  all_count: number;
  is_begin: boolean;
  is_end: boolean;
  mode: number;
  mode_text: string;
  name: string;
  next: number;
  pagination_reply: PaginationReply$1;
  prev: number;
  session_id: string;
  support_mode: number[];
  [property: string]: any;
};
type PaginationReply$1 = {
  next_offset: string;
  [property: string]: any;
};
type Effects$1 = {
  preloading: string;
  [property: string]: any;
};
type Reply = {
  action: number;
  assist: number;
  attr: number;
  content: Content;
  count: number;
  ctime: number;
  dialog: number;
  dialog_str: string;
  dynamic_id: number;
  dynamic_id_str: string;
  fansgrade: number;
  folder: Folder;
  invisible: boolean;
  like: number;
  member: Member;
  mid: number;
  mid_str: string;
  note_cvid_str: string;
  oid: number;
  oid_str: string;
  parent: number;
  parent_str: string;
  rcount: number;
  replies: string[];
  reply_control: ReplyControl;
  root: number;
  root_str: string;
  rpid: number;
  rpid_str: string;
  state: number;
  track_info: string;
  type: number;
  up_action: UpAction;
  [property: string]: any;
};
type Content = {
  emote?: Record<string, BiliEmojiList['data']['packages'][number]>;
  jump_url: {
    [key: string]: any;
  };
  max_line: number;
  members: string[];
  message: string;
  picture_scale: number;
  pictures: Picture$1[];
  [property: string]: any;
};
type Picture$1 = {
  img_height: number;
  img_size: number;
  img_src: string;
  img_width: number;
  play_gif_thumbnail?: boolean;
  top_right_icon?: string;
  [property: string]: any;
};
type Folder = {
  has_folded: boolean;
  is_folded: boolean;
  rule: string;
  [property: string]: any;
};
type Member = {
  avatar: string;
  avatar_item: AvatarItem;
  contract_desc: string;
  face_nft_new: number;
  fans_detail: null | FansDetail;
  is_contractor: boolean;
  is_senior_member: number;
  level_info: LevelInfo$2;
  mid: string;
  nameplate: Nameplate$3;
  nft_interaction: null;
  official_verify: OfficialVerify$8;
  pendant: MemberPendant;
  rank: string;
  senior: Senior;
  sex: string;
  sign: string;
  uname: string;
  user_sailing: UserSailing;
  user_sailing_v2: UserSailingV2;
  vip: Vip$9;
  [property: string]: any;
};
type AvatarItem = {
  container_size: ContainerSize$5;
  fallback_layers: FallbackLayers$5;
  mid: string;
  [property: string]: any;
};
type ContainerSize$5 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FallbackLayers$5 = {
  is_critical_group: boolean;
  layers: Layer$5[];
  [property: string]: any;
};
type Layer$5 = {
  general_spec: GeneralSpec$5;
  layer_config: LayerConfig$5;
  resource: Resource$5;
  visible: boolean;
  [property: string]: any;
};
type GeneralSpec$5 = {
  pos_spec: PosSpec$5;
  render_spec: RenderSpec$5;
  size_spec: SizeSpec$5;
  [property: string]: any;
};
type PosSpec$5 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type RenderSpec$5 = {
  opacity: number;
  [property: string]: any;
};
type SizeSpec$5 = {
  height: number;
  width: number;
  [property: string]: any;
};
type LayerConfig$5 = {
  is_critical: boolean;
  tags: Tags$5;
  [property: string]: any;
};
type Tags$5 = {
  AVATAR_LAYER: {
    [key: string]: any;
  };
  GENERAL_CFG: GeneralCFG$5;
  ICON_LAYER?: {
    [key: string]: any;
  };
  PENDENT_LAYER?: {
    [key: string]: any;
  };
  [property: string]: any;
};
type GeneralCFG$5 = {
  config_type: number;
  general_config: GeneralConfig$5;
  [property: string]: any;
};
type GeneralConfig$5 = {
  web_css_style: WebcssStyle$5;
  [property: string]: any;
};
type WebcssStyle$5 = {
  'background-color'?: string;
  border?: string;
  borderRadius: string;
  boxSizing?: string;
  [property: string]: any;
};
type Resource$5 = {
  res_image: ResImage$5;
  res_type: number;
  [property: string]: any;
};
type ResImage$5 = {
  image_src: ImageSrc$5;
  [property: string]: any;
};
type ImageSrc$5 = {
  local?: number;
  placeholder: number;
  remote: Remote$5;
  src_type: number;
  [property: string]: any;
};
type Remote$5 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type FansDetail = {
  guard_icon: string;
  guard_level: number;
  honor_icon: string;
  intimacy: number;
  is_receive: number;
  level: number;
  master_status: number;
  medal_color: number;
  medal_color_border: number;
  medal_color_end: number;
  medal_color_level: number;
  medal_color_name: number;
  medal_id: number;
  medal_level_bg_color: number;
  medal_name: string;
  score: number;
  uid: number;
  [property: string]: any;
};
type LevelInfo$2 = {
  current_exp: number;
  current_level: number;
  current_min: number;
  next_exp: number;
  [property: string]: any;
};
type Nameplate$3 = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type OfficialVerify$8 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type MemberPendant = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type Senior = {
  status: number;
  [property: string]: any;
};
type UserSailing = {
  cardbg: Cardbg;
  cardbg_with_focus: null;
  pendant: null | PendantPendant;
  [property: string]: any;
};
type Cardbg = {
  fan: CardbgFan;
  id: number;
  image: string;
  image_group: null;
  jump_url: string;
  name: string;
  type: string;
  [property: string]: any;
};
type CardbgFan = {
  color: string;
  color_format: PurpleColorFormat;
  is_fan: number;
  name: string;
  num_desc: string;
  num_prefix: string;
  number: number;
  [property: string]: any;
};
type PurpleColorFormat = {
  colors: string[];
  end_point: string;
  gradients: number[];
  start_point: string;
  [property: string]: any;
};
type PendantPendant = {
  id: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  jump_url: string;
  name: string;
  type: string;
  [property: string]: any;
};
type UserSailingV2 = {
  card_bg: CardBg;
  pendant?: UserSailingV2Pendant;
  [property: string]: any;
};
type CardBg = {
  fan: CardBgFan;
  id: number;
  image: string;
  jump_url: string;
  name: string;
  type: string;
  [property: string]: any;
};
type CardBgFan = {
  color: string;
  color_format: FluffyColorFormat;
  is_fan: number;
  name?: string;
  num_desc: string;
  num_prefix: string;
  number: number;
  [property: string]: any;
};
type FluffyColorFormat = {
  colors: string[];
  end_point: string;
  gradients: number[];
  start_point: string;
  [property: string]: any;
};
type UserSailingV2Pendant = {
  id: number;
  image: string;
  image_enhance: string;
  name: string;
  type: string;
  [property: string]: any;
};
type Vip$9 = {
  accessStatus: number;
  avatar_subscript: number;
  dueRemark: string;
  label: Label$9;
  nickname_color: string;
  themeType: number;
  vipDueDate: number;
  vipStatus: number;
  vipStatusWarn: string;
  vipType: number;
  [property: string]: any;
};
type Label$9 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type ReplyControl = {
  biz_scene: string;
  is_note_v2: boolean;
  location: string;
  max_line: number;
  sub_reply_entry_text: string;
  sub_reply_title_text: string;
  time_desc: string;
  translation_switch: number;
  [property: string]: any;
};
type UpAction = {
  like: boolean;
  reply: boolean;
  [property: string]: any;
};
type Top$1 = {
  admin: null;
  upper: null;
  vote: null;
  [property: string]: any;
};
type Upper = {
  mid: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/BV2AV.d.ts
type BiliBv2AV = {
  code: number;
  data: Data$13;
  message: string;
  [property: string]: any;
};
type Data$13 = {
  aid: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Captcha/ApplyCaptcha.d.ts
type ApplyCaptcha = {
  code: number;
  data: DataData$22;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$22 = {
  biliword: null;
  geetest: Geetest;
  phone: null;
  sms: null;
  sms_mo: null;
  token: string;
  type: string;
  [property: string]: any;
};
type Geetest = {
  challenge: string;
  gt: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Captcha/ValidateCaptcha.d.ts
type ValidateCaptcha = {
  code: number;
  data: DataData$21;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$21 = {
  grisk_id: string;
  is_valid: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/ColumnInfo.d.ts
type ColumnInfo = {
  code: number;
  data: DataData$20;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$20 = {
  articles: null;
  attention: boolean;
  author: Author$9;
  last: Last$1;
  list: List;
  [property: string]: any;
};
type Author$9 = {
  face: string;
  fans: number;
  level: number;
  mid: number;
  name: string;
  nameplate: Nameplate$2;
  official_verify: OfficialVerify$7;
  pendant: Pendant$8;
  vip: Vip$8;
  [property: string]: any;
};
type Nameplate$2 = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type OfficialVerify$7 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type Pendant$8 = {
  expire: number;
  image: string;
  name: string;
  pid: number;
  [property: string]: any;
};
type Vip$8 = {
  avatar_subscript: number;
  due_date: number;
  label: Label$8;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  vip_pay_type: number;
  [property: string]: any;
};
type Label$8 = {
  label_theme: string;
  path: string;
  text: string;
  [property: string]: any;
};
type Last$1 = {
  attributes: number;
  author_uid: number;
  categories: string[];
  category: Category;
  dyn_id_str: string;
  id: number;
  image_urls: string[];
  only_fans: number;
  publish_time: number;
  state: number;
  summary: string;
  title: string;
  type: number;
  words: number;
  [property: string]: any;
};
type Category = {
  id: number;
  name: string;
  parent_id: number;
  [property: string]: any;
};
type List = {
  apply_time: string;
  articles_count: number;
  check_time: string;
  ctime: number;
  id: number;
  image_url: string;
  mid: number;
  name: string;
  publish_time: number;
  read: number;
  reason: string;
  state: number;
  summary: string;
  update_time: number;
  words: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/DynamicCard.d.ts
type BiliDynamicCard = {
  code: number;
  data: Data$12;
  message: string;
  ttl: number;
  [property: string]: any;
};
type Data$12 = {
  card: DataCard;
  [property: string]: any;
};
type DataCard = {
  card: string;
  desc: Desc$5;
  display: Display$1;
  extend_json: string;
  [property: string]: any;
};
type Desc$5 = {
  acl: number;
  bvid: string;
  comment: number;
  dynamic_id: number;
  dynamic_id_str: string;
  inner_id: number;
  is_liked: number;
  like: number;
  orig_dy_id: number;
  orig_dy_id_str: string;
  orig_type: number;
  origin: null;
  pre_dy_id: number;
  pre_dy_id_str: string;
  previous: null;
  r_type: number;
  repost: number;
  rid: number;
  rid_str: string;
  spec_type: number;
  status: number;
  stype: number;
  timestamp: number;
  type: number;
  uid: number;
  uid_type: number;
  user_profile: UserProfile;
  view: number;
  [property: string]: any;
};
type UserProfile = {
  card: UserProfileCard;
  info: Info$1;
  level_info: LevelInfo$1;
  pendant: Pendant$7;
  rank: string;
  sign: string;
  vip: Vip$7;
  [property: string]: any;
};
type UserProfileCard = {
  official_verify: OfficialVerify$6;
  [property: string]: any;
};
type OfficialVerify$6 = {
  type: number;
  [property: string]: any;
};
type Info$1 = {
  face: string;
  uid: number;
  uname: string;
  [property: string]: any;
};
type LevelInfo$1 = {
  current_exp: number;
  current_level: number;
  current_min: number;
  next_exp: string;
  [property: string]: any;
};
type Pendant$7 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  name: string;
  pid: number;
  [property: string]: any;
};
type Vip$7 = {
  accessStatus: number;
  avatar_subscript: number;
  avatar_subscript_url: string;
  dueRemark: string;
  label: Label$7;
  nickname_color: string;
  role: number;
  themeType: number;
  vipDueDate: number;
  vipStatus: number;
  vipStatusWarn: string;
  vipType: number;
  [property: string]: any;
};
type Label$7 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  [property: string]: any;
};
type Display$1 = {
  emoji_info: null;
  highlight: null;
  live_info: null;
  origin: null;
  relation: Relation;
  usr_action_txt: string;
  [property: string]: any;
};
type Relation = {
  is_follow: number;
  is_followed: number;
  status: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/DynamicInfo.d.ts
declare enum DynamicType {
  AV = "DYNAMIC_TYPE_AV",
  DRAW = "DYNAMIC_TYPE_DRAW",
  WORD = "DYNAMIC_TYPE_WORD",
  LIVE_RCMD = "DYNAMIC_TYPE_LIVE_RCMD",
  FORWARD = "DYNAMIC_TYPE_FORWARD",
  ARTICLE = "DYNAMIC_TYPE_ARTICLE"
}
type BiliDynamicInfoUnion = DynamicTypeAV | DynamicTypeDraw | DynamicTypeWord | DynamicTypeLiveRcmd | DynamicTypeForwardUnion | DynamicTypeArticle;
type DynamicTypeItemMap$1 = {
  [DynamicType.AV]: DynamicTypeAV['data']['item'];
  [DynamicType.DRAW]: DynamicTypeDraw['data']['item'];
  [DynamicType.WORD]: DynamicTypeWord['data']['item'];
  [DynamicType.LIVE_RCMD]: DynamicTypeLiveRcmd['data']['item'];
  [DynamicType.FORWARD]: DynamicTypeForwardUnion['data']['item'];
  [DynamicType.ARTICLE]: DynamicTypeArticle['data']['item'];
};
type DataData$19<T extends DynamicType> = {
  item: DynamicTypeItemMap$1[T];
};
type BiliDynamicInfo<T extends DynamicType> = {
  code: number;
  data: DataData$19<T>;
  message: string;
  ttl: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/LiveRoomDef.d.ts
type BiliLiveRoomDef = {
  code: number;
  data: Data$11;
  message: string;
  msg: string;
  [property: string]: any;
};
type Data$11 = {
  encrypted: boolean;
  hidden_till: number;
  is_hidden: boolean;
  is_locked: boolean;
  is_portrait: boolean;
  is_sp: number;
  live_status: number;
  live_time: number;
  lock_till: number;
  need_p2p: number;
  pwd_verified: boolean;
  room_id: number;
  room_shield: number;
  short_id: number;
  special_type: number;
  uid: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/LiveRoomDetail.d.ts
type BiliLiveRoomDetail = {
  code: number;
  data: Data$10;
  message: string;
  msg: string;
  [property: string]: any;
};
type Data$10 = {
  allow_change_area_time: number;
  allow_upload_cover_time: number;
  area_id: number;
  area_name: string;
  area_pendants: string;
  attention: number;
  background: string;
  battle_id: number;
  description: string;
  hot_words: string[];
  hot_words_status: number;
  is_anchor: number;
  is_portrait: boolean;
  is_strict_room: boolean;
  keyframe: string;
  live_status: number;
  live_time: string;
  new_pendants: NewPendants;
  old_area_id: number;
  online: number;
  parent_area_id: number;
  parent_area_name: string;
  pendants: string;
  pk_id: number;
  pk_status: number;
  room_id: number;
  room_silent_level: number;
  room_silent_second: number;
  room_silent_type: string;
  short_id: number;
  studio_info: StudioInfo;
  tags: string;
  title: string;
  uid: number;
  up_session: string;
  user_cover: string;
  verify: string;
  [property: string]: any;
};
type NewPendants = {
  badge: Badge$2;
  frame: Frame;
  mobile_badge: null;
  mobile_frame: MobileFrame;
  [property: string]: any;
};
type Badge$2 = {
  desc: string;
  name: string;
  position: number;
  value: string;
  [property: string]: any;
};
type Frame = {
  area: number;
  area_old: number;
  bg_color: string;
  bg_pic: string;
  desc: string;
  name: string;
  position: number;
  use_old_area: boolean;
  value: string;
  [property: string]: any;
};
type MobileFrame = {
  area: number;
  area_old: number;
  bg_color: string;
  bg_pic: string;
  desc: string;
  name: string;
  position: number;
  use_old_area: boolean;
  value: string;
  [property: string]: any;
};
type StudioInfo = {
  master_list: string[];
  status: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Login/CheckQrcode.d.ts
type BiliCheckQrcode = {
  code: number;
  data: PurpleData;
  message: string;
  [property: string]: any;
};
type PurpleData = {
  data: FluffyData;
  headers: AxiosResponse['headers'];
  [property: string]: any;
};
type FluffyData = {
  code: number;
  message: string;
  refresh_token: string;
  timestamp: number;
  url: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Login/NewLoginQrcode.d.ts
type BiliNewLoginQrcode = {
  code: number;
  data: Data$9;
  message: string;
  ttl: number;
  [property: string]: any;
};
type Data$9 = {
  qrcode_key: string;
  url: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/OneWork.d.ts
type BiliOneWork = {
  code: number;
  data: Data$8;
  message: string;
  ttl: number;
  [property: string]: any;
};
type Data$8 = {
  aid: number;
  argue_info: ArgueInfo;
  bvid: string;
  cid: number;
  copyright: number;
  ctime: number;
  desc: string;
  desc_v2: DescV2[];
  dimension: DataDimension;
  disable_show_up_info: boolean;
  duration: number;
  dynamic: string;
  enable_vt: number;
  honor_reply: {
    [key: string]: any;
  };
  is_chargeable_season: boolean;
  is_season_display: boolean;
  is_story: boolean;
  is_story_play: number;
  is_upower_exclusive: boolean;
  is_upower_play: boolean;
  is_upower_preview: boolean;
  is_view_self: boolean;
  like_icon: string;
  need_jump_bv: boolean;
  no_cache: boolean;
  owner: Owner;
  pages: Page[];
  pic: string;
  premiere: null;
  pubdate: number;
  rights: Rights;
  stat: Stat$2;
  state: number;
  subtitle: Subtitle;
  teenage_mode: number;
  tid: number;
  tid_v2: number;
  title: string;
  tname: string;
  tname_v2: string;
  user_garb: UserGarb;
  videos: number;
  vt_display: string;
  [property: string]: any;
};
type ArgueInfo = {
  argue_link: string;
  argue_msg: string;
  argue_type: number;
  [property: string]: any;
};
type DescV2 = {
  biz_id?: number;
  raw_text?: string;
  type?: number;
  [property: string]: any;
};
type DataDimension = {
  height: number;
  rotate: number;
  width: number;
  [property: string]: any;
};
type Owner = {
  face: string;
  mid: number;
  name: string;
  [property: string]: any;
};
type Page = {
  cid?: number;
  dimension?: PageDimension;
  duration?: number;
  first_frame?: string;
  from?: string;
  page?: number;
  part?: string;
  vid?: string;
  weblink?: string;
  [property: string]: any;
};
type PageDimension = {
  height: number;
  rotate: number;
  width: number;
  [property: string]: any;
};
type Rights = {
  arc_pay: number;
  autoplay: number;
  bp: number;
  clean_mode: number;
  download: number;
  elec: number;
  free_watch: number;
  hd5: number;
  is_360: number;
  is_cooperation: number;
  is_stein_gate: number;
  movie: number;
  no_background: number;
  no_reprint: number;
  no_share: number;
  pay: number;
  ugc_pay: number;
  ugc_pay_preview: number;
  [property: string]: any;
};
type Stat$2 = {
  aid: number;
  coin: number;
  danmaku: number;
  dislike: number;
  evaluation: string;
  favorite: number;
  his_rank: number;
  like: number;
  now_rank: number;
  reply: number;
  share: number;
  view: number;
  vt: number;
  [property: string]: any;
};
type Subtitle = {
  allow_submit: boolean;
  list: string[];
  [property: string]: any;
};
type UserGarb = {
  url_image_ani_cut: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/UserDynamic.d.ts
type BiliUserDynamic = {
  code: number;
  data: DataData$18;
  message: string;
  ttl: number;
  [property: string]: any;
};
type AVItem = DynamicTypeAV['data']['item'];
type DrawItem = DynamicTypeDraw['data']['item'];
type WordItem = DynamicTypeWord['data']['item'];
type LiveRcmdItem = DynamicTypeLiveRcmd['data']['item'];
type ForwardItem = DynamicTypeForwardUnion['data']['item'];
type ArticleItem = DynamicTypeArticle['data']['item'];
type DynamicTypeItemMap = {
  [DynamicType.AV]: AVItem;
  [DynamicType.DRAW]: DrawItem;
  [DynamicType.WORD]: WordItem;
  [DynamicType.LIVE_RCMD]: LiveRcmdItem;
  [DynamicType.FORWARD]: ForwardItem;
  [DynamicType.ARTICLE]: ArticleItem;
};
type DataData$18<T extends DynamicType = DynamicType> = {
  has_more: boolean;
  items: DynamicTypeItemMap[T][];
  offset: string;
  update_baseline: string;
  update_num: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/UserFullView.d.ts
type BiliUserFullView = {
  code: number;
  data: Data$7;
  message: string;
  ttl: number;
  [property: string]: any;
};
type Data$7 = {
  archive: Archive$2;
  article: Article;
  likes: number;
  [property: string]: any;
};
type Archive$2 = {
  enable_vt: number;
  view: number;
  vt: number;
  [property: string]: any;
};
type Article = {
  view: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/UserProfile.d.ts
type BiliUserProfile = {
  code: number;
  data: Data$6;
  message: string;
  ttl: number;
  [property: string]: any;
};
type Data$6 = {
  archive_count: number;
  article_count: number;
  card: Card;
  follower: number;
  following: boolean;
  like_num: number;
  space: Space;
  [property: string]: any;
};
type Card = {
  approve: boolean;
  article: number;
  attention: number;
  attentions: string[];
  birthday: string;
  description: string;
  DisplayRank: string;
  face: string;
  face_nft: number;
  face_nft_type: number;
  fans: number;
  friend: number;
  is_senior_member: number;
  level_info: LevelInfo;
  mid: string;
  name: string;
  name_render: null;
  nameplate: Nameplate$1;
  Official: Official$1;
  official_verify: OfficialVerify$5;
  pendant: Pendant$6;
  place: string;
  rank: string;
  regtime: number;
  sex: string;
  sign: string;
  spacesta: number;
  vip: Vip$6;
  [property: string]: any;
};
type Official$1 = {
  desc: string;
  role: number;
  title: string;
  type: number;
  [property: string]: any;
};
type LevelInfo = {
  current_exp: number;
  current_level: number;
  current_min: number;
  next_exp: number;
  [property: string]: any;
};
type Nameplate$1 = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type OfficialVerify$5 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type Pendant$6 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type Vip$6 = {
  avatar_icon: AvatarIcon$1;
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: Label$6;
  nickname_color: string;
  role: number;
  status: number;
  theme_type: number;
  tv_due_date: number;
  tv_vip_pay_type: number;
  tv_vip_status: number;
  type: number;
  vip_pay_type: number;
  vipStatus: number;
  vipType: number;
  [property: string]: any;
};
type AvatarIcon$1 = {
  icon_resource: IconResource;
  icon_type: number;
  [property: string]: any;
};
type IconResource = {
  type: number;
  url: string;
  [property: string]: any;
};
type Label$6 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type Space = {
  l_img: string;
  s_img: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/UserSpaceInfo.d.ts
type UserSpaceInfo = {
  code: number;
  data: DataData$17;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$17 = {
  attestation: Attestation;
  birthday: string;
  certificate_show: boolean;
  coins: number;
  contract: Contract;
  control: number;
  elec: Elec;
  face: string;
  face_nft: number;
  face_nft_type: number;
  fans_badge: boolean;
  fans_medal: FansMedal;
  gaia_data: null;
  gaia_res_type: number;
  is_followed: boolean;
  is_risk: boolean;
  is_senior_member: number;
  jointime: number;
  level: number;
  live_room: LiveRoom;
  mcn_info: null;
  mid: number;
  moral: number;
  name: string;
  name_render: null;
  nameplate: Nameplate;
  official: Official;
  pendant: Pendant$5;
  profession: Profession;
  rank: number;
  school: null;
  series: Series;
  sex: string;
  sign: string;
  silence: number;
  sys_notice: {
    [key: string]: any;
  };
  tags: null;
  theme: null;
  top_photo: string;
  top_photo_v2: TopPhotoV2;
  user_honour_info: UserHonourInfo;
  vip: Vip$5;
  [property: string]: any;
};
type Attestation = {
  common_info: CommonInfo;
  desc: string;
  icon: string;
  splice_info: SpliceInfo;
  type: number;
  [property: string]: any;
};
type CommonInfo = {
  prefix: string;
  prefix_title: string;
  title: string;
  [property: string]: any;
};
type SpliceInfo = {
  title: string;
  [property: string]: any;
};
type Contract = {
  is_display: boolean;
  is_follow_display: boolean;
  [property: string]: any;
};
type Elec = {
  show_info: ShowInfo;
  [property: string]: any;
};
type ShowInfo = {
  icon: string;
  jump_url: string;
  jump_url_web: string;
  list: null;
  long_title: string;
  show: boolean;
  state: number;
  title: string;
  total: number;
  upower_count_show: boolean;
  [property: string]: any;
};
type FansMedal = {
  detail: null;
  medal: null;
  show: boolean;
  wear: boolean;
  [property: string]: any;
};
type LiveRoom = {
  broadcast_type: number;
  cover: string;
  liveStatus: number;
  roomid: number;
  roomStatus: number;
  roundStatus: number;
  title: string;
  url: string;
  watched_show: WatchedShow;
  [property: string]: any;
};
type WatchedShow = {
  icon: string;
  icon_location: string;
  icon_web: string;
  num: number;
  switch: boolean;
  text_large: string;
  text_small: string;
  [property: string]: any;
};
type Nameplate = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type Official = {
  desc: string;
  role: number;
  title: string;
  type: number;
  [property: string]: any;
};
type Pendant$5 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type Profession = {
  department: string;
  is_show: number;
  name: string;
  title: string;
  [property: string]: any;
};
type Series = {
  show_upgrade_window: boolean;
  user_upgrade_status: number;
  [property: string]: any;
};
type TopPhotoV2 = {
  l_200h_img: string;
  l_img: string;
  sid: number;
  [property: string]: any;
};
type UserHonourInfo = {
  colour: null;
  is_latest_100honour: number;
  mid: number;
  tags: string[];
  [property: string]: any;
};
type Vip$5 = {
  avatar_icon: AvatarIcon;
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: Label$5;
  nickname_color: string;
  ott_info: OttInfo;
  role: number;
  status: number;
  super_vip: SuperVip;
  theme_type: number;
  tv_due_date: number;
  tv_vip_pay_type: number;
  tv_vip_status: number;
  type: number;
  vip_pay_type: number;
  [property: string]: any;
};
type AvatarIcon = {
  icon_resource: {
    [key: string]: any;
  };
  icon_type: number;
  [property: string]: any;
};
type Label$5 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_goto: LabelGoto;
  label_id: number;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type LabelGoto = {
  mobile: string;
  pc_web: string;
  [property: string]: any;
};
type OttInfo = {
  overdue_time: number;
  pay_channel_id: string;
  pay_type: number;
  status: number;
  vip_type: number;
  [property: string]: any;
};
type SuperVip = {
  is_super_vip: boolean;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/VideoPlayurlIsLogin.d.ts
/** 视频下载地址（已登录） */
type BiliVideoPlayurlIsLogin = {
  code: number;
  data: Data$5;
  message: string;
  ttl: number;
  [property: string]: any;
};
type Data$5 = {
  accept_description: string[];
  accept_format: string;
  accept_quality: number[];
  dash: Dash;
  format: string;
  from: string;
  high_format: null;
  last_play_cid: number;
  last_play_time: number;
  message: string;
  quality: number;
  result: string;
  seek_param: string;
  seek_type: string;
  support_formats: SupportFormat$1[];
  timelength: number;
  video_codecid: number;
  view_info: null;
  [property: string]: any;
};
type Dash = {
  audio: Audio$3[];
  dolby: Dolby;
  duration: number;
  flac: null;
  min_buffer_time: number;
  minBufferTime: number;
  video: Video$7[];
  [property: string]: any;
};
type Audio$3 = {
  backup_url: string[];
  backupUrl: string[];
  bandwidth: number;
  base_url: string;
  baseUrl: string;
  codecid: number;
  codecs: string;
  frame_rate: string;
  frameRate: string;
  height: number;
  id: number;
  mime_type: string;
  mimeType: string;
  sar: string;
  segment_base: AudioSegmentBaseObject;
  SegmentBase: AudioSegmentBase;
  start_with_sap: number;
  startWithSap: number;
  width: number;
  [property: string]: any;
};
type AudioSegmentBase = {
  indexRange: string;
  Initialization: string;
  [property: string]: any;
};
type AudioSegmentBaseObject = {
  index_range: string;
  initialization: string;
  [property: string]: any;
};
type Dolby = {
  audio: null;
  type: number;
  [property: string]: any;
};
type Video$7 = {
  backup_url: string[];
  backupUrl: string[];
  bandwidth: number;
  base_url: string;
  baseUrl: string;
  codecid: number;
  codecs: string;
  frame_rate: string;
  frameRate: string;
  height: number;
  id: number;
  mime_type: string;
  mimeType: string;
  sar: string;
  segment_base: VideoSegmentBaseObject;
  SegmentBase: VideoSegmentBase;
  start_with_sap: number;
  startWithSap: number;
  width: number;
  [property: string]: any;
};
type VideoSegmentBase = {
  indexRange: string;
  Initialization: string;
  [property: string]: any;
};
type VideoSegmentBaseObject = {
  index_range: string;
  initialization: string;
  [property: string]: any;
};
type SupportFormat$1 = {
  codecs: string[];
  display_desc: string;
  format: string;
  new_description: string;
  quality: number;
  superscript: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/VideoPlayurlNoLogin.d.ts
/** 视频下载地址（未登录） */
type BiliBiliVideoPlayurlNoLogin = {
  code: number;
  data: Data$4;
  message: string;
  ttl: number;
  [property: string]: any;
};
type Data$4 = {
  accept_description: string[];
  accept_format: string;
  accept_quality: number[];
  durl: Durl[];
  format: string;
  from: string;
  high_format: null;
  last_play_cid: number;
  last_play_time: number;
  message: string;
  quality: number;
  result: string;
  seek_param: string;
  seek_type: string;
  support_formats: SupportFormat[];
  timelength: number;
  video_codecid: number;
  view_info: null;
  [property: string]: any;
};
type Durl = {
  ahead?: string;
  backup_url?: null;
  length?: number;
  order?: number;
  size?: number;
  url?: string;
  vhead?: string;
  [property: string]: any;
};
type SupportFormat = {
  codecs?: null;
  display_desc?: string;
  format?: string;
  new_description?: string;
  quality?: number;
  superscript?: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/WorkComments.d.ts
type BiliWorkComments = {
  code: number;
  data: DataData$16;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$16 = {
  assist: number;
  blacklist: number;
  callbacks: {
    [key: string]: any;
  };
  cm_info: CmInfo;
  config: Config;
  control: Control;
  cursor: Cursor;
  effects: Effects;
  note: number;
  replies: DataReply[];
  top: Top;
  top_replies: TopReply[];
  upper: DataUpper;
  vote: number;
  [property: string]: any;
};
type CmInfo = {
  ads: Ads;
  [property: string]: any;
};
type Ads = {
  4765: The4765[];
  [property: string]: any;
};
type The4765 = {
  activity_type?: number;
  ad_cb?: string;
  ad_desc?: string;
  adver_name?: string;
  agency?: string;
  area?: number;
  cm_mark?: number;
  contract_id?: string;
  creative_id?: number;
  creative_type?: number;
  epid?: number;
  id?: number;
  intro?: string;
  is_ad?: boolean;
  is_ad_loc?: boolean;
  label?: string;
  litpic?: string;
  mid?: string;
  name?: string;
  null_frame?: boolean;
  pic?: string;
  pic_main_color?: string;
  pos_num?: number;
  request_id?: string;
  server_type?: number;
  show_url?: string;
  src_id?: number;
  stime?: number;
  style?: number;
  sub_title?: string;
  title?: string;
  url?: string;
  [property: string]: any;
};
type Config = {
  read_only: boolean;
  show_up_flag: boolean;
  showtopic: number;
  [property: string]: any;
};
type Control = {
  answer_guide_android_url: string;
  answer_guide_icon_url: string;
  answer_guide_ios_url: string;
  answer_guide_text: string;
  bg_text: string;
  child_input_text: string;
  disable_jump_emote: boolean;
  empty_page: null;
  enable_charged: boolean;
  enable_cm_biz_helper: boolean;
  giveup_input_text: string;
  input_disable: boolean;
  preload_resources: null;
  root_input_text: string;
  screenshot_icon_state: number;
  show_text: string;
  show_type: number;
  upload_picture_icon_state: number;
  web_selection: boolean;
  [property: string]: any;
};
type Cursor = {
  all_count: number;
  is_begin: boolean;
  is_end: boolean;
  mode: number;
  mode_text: string;
  name: string;
  next: number;
  pagination_reply: PaginationReply;
  prev: number;
  session_id: string;
  support_mode: number[];
  [property: string]: any;
};
type PaginationReply = {
  next_offset: string;
  [property: string]: any;
};
type Effects = {
  preloading: string;
  [property: string]: any;
};
type DataReply = {
  action: number;
  assist: number;
  attr: number;
  content: PurpleContent;
  count: number;
  ctime: number;
  dialog: number;
  dialog_str: string;
  dynamic_id_str: string;
  fansgrade: number;
  folder: PurpleFolder;
  invisible: boolean;
  like: number;
  member: PurpleMember;
  mid: number;
  mid_str: string;
  note_cvid_str: string;
  oid: number;
  oid_str: string;
  parent: number;
  parent_str: string;
  rcount: number;
  replies: ReplyReply[];
  reply_control: FluffyReplyControl;
  root: number;
  root_str: string;
  rpid: number;
  rpid_str: string;
  state: number;
  track_info: string;
  type: number;
  up_action: FluffyUpAction;
  [property: string]: any;
};
type PurpleContent = {
  jump_url: {
    [key: string]: any;
  };
  max_line: number;
  members: string[];
  message: string;
  [property: string]: any;
};
type PurpleFolder = {
  has_folded: boolean;
  is_folded: boolean;
  rule: string;
  [property: string]: any;
};
type PurpleMember = {
  avatar: string;
  avatar_item: PurpleAvatarItem;
  contract_desc: string;
  face_nft_new: number;
  fans_detail: null;
  is_contractor: boolean;
  is_senior_member: number;
  level_info: PurpleLevelInfo;
  mid: string;
  nameplate: PurpleNameplate;
  nft_interaction: null;
  official_verify: PurpleOfficialVerify$4;
  pendant: PurplePendant$4;
  rank: string;
  senior: {
    [key: string]: any;
  };
  sex: string;
  sign: string;
  uname: string;
  user_sailing: PurpleUserSailing;
  user_sailing_v2: {
    [key: string]: any;
  };
  vip: PurpleVip$4;
  [property: string]: any;
};
type PurpleAvatarItem = {
  container_size: PurpleContainerSize$4;
  fallback_layers: PurpleFallbackLayers$4;
  mid: string;
  [property: string]: any;
};
type PurpleContainerSize$4 = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleFallbackLayers$4 = {
  is_critical_group: boolean;
  layers: PurpleLayer$4[];
  [property: string]: any;
};
type PurpleLayer$4 = {
  general_spec: PurpleGeneralSpec$4;
  layer_config: PurpleLayerConfig$4;
  resource: PurpleResource$4;
  visible: boolean;
  [property: string]: any;
};
type PurpleGeneralSpec$4 = {
  pos_spec: PurplePosSpec$4;
  render_spec: PurpleRenderSpec$4;
  size_spec: PurpleSizeSpec$4;
  [property: string]: any;
};
type PurplePosSpec$4 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type PurpleRenderSpec$4 = {
  opacity: number;
  [property: string]: any;
};
type PurpleSizeSpec$4 = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleLayerConfig$4 = {
  is_critical: boolean;
  tags: PurpleTags$4;
  [property: string]: any;
};
type PurpleTags$4 = {
  AVATAR_LAYER: {
    [key: string]: any;
  };
  GENERAL_CFG: PurpleGENERALCFG$4;
  ICON_LAYER?: {
    [key: string]: any;
  };
  [property: string]: any;
};
type PurpleGENERALCFG$4 = {
  config_type: number;
  general_config: PurpleGeneralConfig$4;
  [property: string]: any;
};
type PurpleGeneralConfig$4 = {
  web_css_style: PurpleWebcssStyle$4;
  [property: string]: any;
};
type PurpleWebcssStyle$4 = {
  'background-color'?: string;
  border?: string;
  borderRadius: string;
  boxSizing?: string;
  [property: string]: any;
};
type PurpleResource$4 = {
  res_image: PurpleResImage$4;
  res_type: number;
  [property: string]: any;
};
type PurpleResImage$4 = {
  image_src: PurpleImageSrc$4;
  [property: string]: any;
};
type PurpleImageSrc$4 = {
  local?: number;
  placeholder: number;
  remote: PurpleRemote$4;
  src_type: number;
  [property: string]: any;
};
type PurpleRemote$4 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type PurpleLevelInfo = {
  current_exp: number;
  current_level: number;
  current_min: number;
  next_exp: number;
  [property: string]: any;
};
type PurpleNameplate = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type PurpleOfficialVerify$4 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type PurplePendant$4 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type PurpleUserSailing = {
  cardbg: null;
  cardbg_with_focus: null;
  pendant: null;
  [property: string]: any;
};
type PurpleVip$4 = {
  accessStatus: number;
  avatar_subscript: number;
  dueRemark: string;
  label: PurpleLabel$4;
  nickname_color: string;
  themeType: number;
  vipDueDate: number;
  vipStatus: number;
  vipStatusWarn: string;
  vipType: number;
  [property: string]: any;
};
type PurpleLabel$4 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type ReplyReply = {
  action: number;
  assist: number;
  attr: number;
  content: FluffyContent;
  count: number;
  ctime: number;
  dialog: number;
  dialog_str: string;
  dynamic_id_str: string;
  fansgrade: number;
  folder: FluffyFolder;
  invisible: boolean;
  like: number;
  member: FluffyMember;
  mid: number;
  mid_str: string;
  note_cvid_str: string;
  oid: number;
  oid_str: string;
  parent: number;
  parent_str: string;
  rcount: number;
  replies: null;
  reply_control: PurpleReplyControl;
  root: number;
  root_str: string;
  rpid: number;
  rpid_str: string;
  state: number;
  track_info: string;
  type: number;
  up_action: PurpleUpAction;
  [property: string]: any;
};
type FluffyContent = {
  emote?: Emote;
  jump_url: {
    [key: string]: any;
  };
  max_line: number;
  members: string[];
  message: string;
  [property: string]: any;
};
type Emote = {
  '[呲牙]': 呲牙;
  [property: string]: any;
};
type 呲牙 = {
  attr: number;
  id: number;
  jump_title: string;
  meta: Meta;
  mtime: number;
  package_id: number;
  state: number;
  text: string;
  type: number;
  url: string;
  [property: string]: any;
};
type Meta = {
  size: number;
  suggest: string[];
  [property: string]: any;
};
type FluffyFolder = {
  has_folded: boolean;
  is_folded: boolean;
  rule: string;
  [property: string]: any;
};
type FluffyMember = {
  avatar: string;
  avatar_item: FluffyAvatarItem;
  contract_desc: string;
  face_nft_new: number;
  fans_detail: null;
  is_contractor: boolean;
  is_senior_member: number;
  level_info: FluffyLevelInfo;
  mid: string;
  nameplate: FluffyNameplate;
  nft_interaction: null;
  official_verify: FluffyOfficialVerify$4;
  pendant: FluffyPendant$4;
  rank: string;
  senior: {
    [key: string]: any;
  };
  sex: string;
  sign: string;
  uname: string;
  user_sailing: FluffyUserSailing;
  user_sailing_v2: {
    [key: string]: any;
  };
  vip: FluffyVip$4;
  [property: string]: any;
};
type FluffyAvatarItem = {
  container_size: FluffyContainerSize$4;
  fallback_layers: FluffyFallbackLayers$4;
  mid: string;
  [property: string]: any;
};
type FluffyContainerSize$4 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyFallbackLayers$4 = {
  is_critical_group: boolean;
  layers: FluffyLayer$4[];
  [property: string]: any;
};
type FluffyLayer$4 = {
  general_spec: FluffyGeneralSpec$4;
  layer_config: FluffyLayerConfig$4;
  resource: FluffyResource$4;
  visible: boolean;
  [property: string]: any;
};
type FluffyGeneralSpec$4 = {
  pos_spec: FluffyPosSpec$4;
  render_spec: FluffyRenderSpec$4;
  size_spec: FluffySizeSpec$4;
  [property: string]: any;
};
type FluffyPosSpec$4 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type FluffyRenderSpec$4 = {
  opacity: number;
  [property: string]: any;
};
type FluffySizeSpec$4 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyLayerConfig$4 = {
  is_critical?: boolean;
  tags: FluffyTags$4;
  [property: string]: any;
};
type FluffyTags$4 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: FluffyGENERALCFG$4;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type FluffyGENERALCFG$4 = {
  config_type: number;
  general_config: FluffyGeneralConfig$4;
  [property: string]: any;
};
type FluffyGeneralConfig$4 = {
  web_css_style: FluffyWebcssStyle$4;
  [property: string]: any;
};
type FluffyWebcssStyle$4 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type FluffyResource$4 = {
  res_image: FluffyResImage$4;
  res_type: number;
  [property: string]: any;
};
type FluffyResImage$4 = {
  image_src: FluffyImageSrc$4;
  [property: string]: any;
};
type FluffyImageSrc$4 = {
  local: number;
  placeholder?: number;
  remote?: FluffyRemote$4;
  src_type: number;
  [property: string]: any;
};
type FluffyRemote$4 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type FluffyLevelInfo = {
  current_exp: number;
  current_level: number;
  current_min: number;
  next_exp: number;
  [property: string]: any;
};
type FluffyNameplate = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type FluffyOfficialVerify$4 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type FluffyPendant$4 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type FluffyUserSailing = {
  cardbg: null;
  cardbg_with_focus: null;
  pendant: null;
  [property: string]: any;
};
type FluffyVip$4 = {
  accessStatus: number;
  avatar_subscript: number;
  dueRemark: string;
  label: FluffyLabel$4;
  nickname_color: string;
  themeType: number;
  vipDueDate: number;
  vipStatus: number;
  vipStatusWarn: string;
  vipType: number;
  [property: string]: any;
};
type FluffyLabel$4 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type PurpleReplyControl = {
  location: string;
  max_line: number;
  time_desc: string;
  translation_switch: number;
  [property: string]: any;
};
type PurpleUpAction = {
  like: boolean;
  reply: boolean;
  [property: string]: any;
};
type FluffyReplyControl = {
  location: string;
  max_line: number;
  sub_reply_entry_text: string;
  sub_reply_title_text: string;
  time_desc: string;
  translation_switch: number;
  up_reply: boolean;
  [property: string]: any;
};
type FluffyUpAction = {
  like: boolean;
  reply: boolean;
  [property: string]: any;
};
type Top = {
  admin: null;
  upper: TopUpper;
  vote: null;
  [property: string]: any;
};
type TopUpper = {
  action: number;
  assist: number;
  attr: number;
  content: UpperContent;
  count: number;
  ctime: number;
  dialog: number;
  dialog_str: string;
  dynamic_id_str: string;
  fansgrade: number;
  folder: UpperFolder;
  invisible: boolean;
  like: number;
  member: UpperMember;
  mid: number;
  mid_str: string;
  note_cvid_str: string;
  oid: number;
  oid_str: string;
  parent: number;
  parent_str: string;
  rcount: number;
  replies: UpperReply[];
  reply_control: UpperReplyControl;
  root: number;
  root_str: string;
  rpid: number;
  rpid_str: string;
  state: number;
  track_info: string;
  type: number;
  up_action: UpperUpAction;
  [property: string]: any;
};
type UpperContent = {
  jump_url: PurpleJumpurl;
  max_line: number;
  members: string[];
  message: string;
  [property: string]: any;
};
type PurpleJumpurl = {
  'https://b23.tv/mall-31Qhv-71b88': PurplehttpsB23TvMall31Qhv71B88;
  'https://b23.tv/mall-31Qhv-72Hhp': PurplehttpsB23TvMall31Qhv72Hhp;
  [property: string]: any;
};
type PurplehttpsB23TvMall31Qhv71B88 = {
  app_name: string;
  app_package_name: string;
  app_url_schema: string;
  click_report: string;
  exposure_report: string;
  extra: PurpleExtra$2;
  icon_position: number;
  is_half_screen: boolean;
  match_once: boolean;
  pc_url: string;
  prefix_icon: string;
  state: number;
  title: string;
  underline: boolean;
  [property: string]: any;
};
type PurpleExtra$2 = {
  goods_click_report: string;
  goods_cm_control: number;
  goods_exposure_report: string;
  goods_item_id: number;
  goods_show_type: number;
  is_word_search: boolean;
  [property: string]: any;
};
type PurplehttpsB23TvMall31Qhv72Hhp = {
  app_name: string;
  app_package_name: string;
  app_url_schema: string;
  click_report: string;
  exposure_report: string;
  extra: FluffyExtra$2;
  icon_position: number;
  is_half_screen: boolean;
  match_once: boolean;
  pc_url: string;
  prefix_icon: string;
  state: number;
  title: string;
  underline: boolean;
  [property: string]: any;
};
type FluffyExtra$2 = {
  goods_click_report: string;
  goods_cm_control: number;
  goods_exposure_report: string;
  goods_item_id: number;
  goods_show_type: number;
  is_word_search: boolean;
  [property: string]: any;
};
type UpperFolder = {
  has_folded: boolean;
  is_folded: boolean;
  rule: string;
  [property: string]: any;
};
type UpperMember = {
  avatar: string;
  avatar_item: TentacledAvatarItem;
  contract_desc: string;
  face_nft_new: number;
  fans_detail: null;
  is_contractor: boolean;
  is_senior_member: number;
  level_info: TentacledLevelInfo;
  mid: string;
  nameplate: TentacledNameplate;
  nft_interaction: null;
  official_verify: TentacledOfficialVerify;
  pendant: TentacledPendant;
  rank: string;
  senior: {
    [key: string]: any;
  };
  sex: string;
  sign: string;
  uname: string;
  user_sailing: TentacledUserSailing;
  user_sailing_v2: {
    [key: string]: any;
  };
  vip: TentacledVip;
  [property: string]: any;
};
type TentacledAvatarItem = {
  container_size: TentacledContainerSize;
  fallback_layers: TentacledFallbackLayers;
  mid: string;
  [property: string]: any;
};
type TentacledContainerSize = {
  height: number;
  width: number;
  [property: string]: any;
};
type TentacledFallbackLayers = {
  is_critical_group: boolean;
  layers: TentacledLayer[];
  [property: string]: any;
};
type TentacledLayer = {
  general_spec: TentacledGeneralSpec;
  layer_config: TentacledLayerConfig;
  resource: TentacledResource;
  visible: boolean;
  [property: string]: any;
};
type TentacledGeneralSpec = {
  pos_spec: TentacledPosSpec;
  render_spec: TentacledRenderSpec;
  size_spec: TentacledSizeSpec;
  [property: string]: any;
};
type TentacledPosSpec = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type TentacledRenderSpec = {
  opacity: number;
  [property: string]: any;
};
type TentacledSizeSpec = {
  height: number;
  width: number;
  [property: string]: any;
};
type TentacledLayerConfig = {
  is_critical?: boolean;
  tags: TentacledTags;
  [property: string]: any;
};
type TentacledTags = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: TentacledGENERALCFG;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type TentacledGENERALCFG = {
  config_type: number;
  general_config: TentacledGeneralConfig;
  [property: string]: any;
};
type TentacledGeneralConfig = {
  web_css_style: TentacledWebcssStyle;
  [property: string]: any;
};
type TentacledWebcssStyle = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type TentacledResource = {
  res_image: TentacledResImage;
  res_type: number;
  [property: string]: any;
};
type TentacledResImage = {
  image_src: TentacledImageSrc;
  [property: string]: any;
};
type TentacledImageSrc = {
  local: number;
  placeholder?: number;
  remote?: TentacledRemote;
  src_type: number;
  [property: string]: any;
};
type TentacledRemote = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type TentacledLevelInfo = {
  current_exp: number;
  current_level: number;
  current_min: number;
  next_exp: number;
  [property: string]: any;
};
type TentacledNameplate = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type TentacledOfficialVerify = {
  desc: string;
  type: number;
  [property: string]: any;
};
type TentacledPendant = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type TentacledUserSailing = {
  cardbg: null;
  cardbg_with_focus: null;
  pendant: null;
  [property: string]: any;
};
type TentacledVip = {
  accessStatus: number;
  avatar_subscript: number;
  dueRemark: string;
  label: TentacledLabel;
  nickname_color: string;
  themeType: number;
  vipDueDate: number;
  vipStatus: number;
  vipStatusWarn: string;
  vipType: number;
  [property: string]: any;
};
type TentacledLabel = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type UpperReply = {
  action?: number;
  assist?: number;
  attr?: number;
  content?: TentacledContent;
  count?: number;
  ctime?: number;
  dialog?: number;
  dialog_str?: string;
  dynamic_id_str?: string;
  fansgrade?: number;
  folder?: TentacledFolder;
  invisible?: boolean;
  like?: number;
  member?: TentacledMember;
  mid?: number;
  mid_str?: string;
  note_cvid_str?: string;
  oid?: number;
  oid_str?: string;
  parent?: number;
  parent_str?: string;
  rcount?: number;
  replies?: null;
  reply_control?: TentacledReplyControl;
  root?: number;
  root_str?: string;
  rpid?: number;
  rpid_str?: string;
  state?: number;
  track_info?: string;
  type?: number;
  up_action?: TentacledUpAction;
  [property: string]: any;
};
type TentacledContent = {
  jump_url: {
    [key: string]: any;
  };
  max_line: number;
  members: string[];
  message: string;
  [property: string]: any;
};
type TentacledFolder = {
  has_folded: boolean;
  is_folded: boolean;
  rule: string;
  [property: string]: any;
};
type TentacledMember = {
  avatar: string;
  avatar_item: StickyAvatarItem;
  contract_desc: string;
  face_nft_new: number;
  fans_detail: null;
  is_contractor: boolean;
  is_senior_member: number;
  level_info: StickyLevelInfo;
  mid: string;
  nameplate: StickyNameplate;
  nft_interaction: null;
  official_verify: StickyOfficialVerify;
  pendant: StickyPendant;
  rank: string;
  senior: {
    [key: string]: any;
  };
  sex: string;
  sign: string;
  uname: string;
  user_sailing: StickyUserSailing;
  user_sailing_v2: {
    [key: string]: any;
  };
  vip: StickyVip;
  [property: string]: any;
};
type StickyAvatarItem = {
  container_size: StickyContainerSize;
  fallback_layers: StickyFallbackLayers;
  mid: string;
  [property: string]: any;
};
type StickyContainerSize = {
  height: number;
  width: number;
  [property: string]: any;
};
type StickyFallbackLayers = {
  is_critical_group: boolean;
  layers: StickyLayer[];
  [property: string]: any;
};
type StickyLayer = {
  general_spec: StickyGeneralSpec;
  layer_config: StickyLayerConfig;
  resource: StickyResource;
  visible: boolean;
  [property: string]: any;
};
type StickyGeneralSpec = {
  pos_spec: StickyPosSpec;
  render_spec: StickyRenderSpec;
  size_spec: StickySizeSpec;
  [property: string]: any;
};
type StickyPosSpec = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type StickyRenderSpec = {
  opacity: number;
  [property: string]: any;
};
type StickySizeSpec = {
  height: number;
  width: number;
  [property: string]: any;
};
type StickyLayerConfig = {
  is_critical?: boolean;
  tags: StickyTags;
  [property: string]: any;
};
type StickyTags = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: StickyGENERALCFG;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type StickyGENERALCFG = {
  config_type: number;
  general_config: StickyGeneralConfig;
  [property: string]: any;
};
type StickyGeneralConfig = {
  web_css_style: StickyWebcssStyle;
  [property: string]: any;
};
type StickyWebcssStyle = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type StickyResource = {
  res_image: StickyResImage;
  res_type: number;
  [property: string]: any;
};
type StickyResImage = {
  image_src: StickyImageSrc;
  [property: string]: any;
};
type StickyImageSrc = {
  local: number;
  placeholder?: number;
  remote?: StickyRemote;
  src_type: number;
  [property: string]: any;
};
type StickyRemote = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type StickyLevelInfo = {
  current_exp: number;
  current_level: number;
  current_min: number;
  next_exp: number;
  [property: string]: any;
};
type StickyNameplate = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type StickyOfficialVerify = {
  desc: string;
  type: number;
  [property: string]: any;
};
type StickyPendant = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type StickyUserSailing = {
  cardbg: null;
  cardbg_with_focus: null;
  pendant: null;
  [property: string]: any;
};
type StickyVip = {
  accessStatus: number;
  avatar_subscript: number;
  dueRemark: string;
  label: StickyLabel;
  nickname_color: string;
  themeType: number;
  vipDueDate: number;
  vipStatus: number;
  vipStatusWarn: string;
  vipType: number;
  [property: string]: any;
};
type StickyLabel = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type TentacledReplyControl = {
  location: string;
  max_line: number;
  time_desc: string;
  translation_switch: number;
  [property: string]: any;
};
type TentacledUpAction = {
  like: boolean;
  reply: boolean;
  [property: string]: any;
};
type UpperReplyControl = {
  cm_recommend_component: string;
  is_up_top: boolean;
  location: string;
  max_line: number;
  sub_reply_entry_text: string;
  sub_reply_title_text: string;
  time_desc: string;
  translation_switch: number;
  up_reply: boolean;
  [property: string]: any;
};
type UpperUpAction = {
  like: boolean;
  reply: boolean;
  [property: string]: any;
};
type TopReply = {
  action?: number;
  assist?: number;
  attr?: number;
  content?: TopReplyContent;
  count?: number;
  ctime?: number;
  dialog?: number;
  dialog_str?: string;
  dynamic_id_str?: string;
  fansgrade?: number;
  folder?: TopReplyFolder;
  invisible?: boolean;
  like?: number;
  member?: TopReplyMember;
  mid?: number;
  mid_str?: string;
  note_cvid_str?: string;
  oid?: number;
  oid_str?: string;
  parent?: number;
  parent_str?: string;
  rcount?: number;
  replies?: TopReplyReply[];
  reply_control?: TopReplyReplyControl;
  root?: number;
  root_str?: string;
  rpid?: number;
  rpid_str?: string;
  state?: number;
  track_info?: string;
  type?: number;
  up_action?: TopReplyUpAction;
  [property: string]: any;
};
type TopReplyContent = {
  jump_url: FluffyJumpurl;
  max_line: number;
  members: string[];
  message: string;
  [property: string]: any;
};
type FluffyJumpurl = {
  'https://b23.tv/mall-31Qhv-71b88': FluffyhttpsB23TvMall31Qhv71B88;
  'https://b23.tv/mall-31Qhv-72Hhp': FluffyhttpsB23TvMall31Qhv72Hhp;
  [property: string]: any;
};
type FluffyhttpsB23TvMall31Qhv71B88 = {
  app_name: string;
  app_package_name: string;
  app_url_schema: string;
  click_report: string;
  exposure_report: string;
  extra: TentacledExtra$1;
  icon_position: number;
  is_half_screen: boolean;
  match_once: boolean;
  pc_url: string;
  prefix_icon: string;
  state: number;
  title: string;
  underline: boolean;
  [property: string]: any;
};
type TentacledExtra$1 = {
  goods_click_report: string;
  goods_cm_control: number;
  goods_exposure_report: string;
  goods_item_id: number;
  goods_show_type: number;
  is_word_search: boolean;
  [property: string]: any;
};
type FluffyhttpsB23TvMall31Qhv72Hhp = {
  app_name: string;
  app_package_name: string;
  app_url_schema: string;
  click_report: string;
  exposure_report: string;
  extra: StickyExtra$1;
  icon_position: number;
  is_half_screen: boolean;
  match_once: boolean;
  pc_url: string;
  prefix_icon: string;
  state: number;
  title: string;
  underline: boolean;
  [property: string]: any;
};
type StickyExtra$1 = {
  goods_click_report: string;
  goods_cm_control: number;
  goods_exposure_report: string;
  goods_item_id: number;
  goods_show_type: number;
  is_word_search: boolean;
  [property: string]: any;
};
type TopReplyFolder = {
  has_folded: boolean;
  is_folded: boolean;
  rule: string;
  [property: string]: any;
};
type TopReplyMember = {
  avatar: string;
  avatar_item: IndigoAvatarItem;
  contract_desc: string;
  face_nft_new: number;
  fans_detail: null;
  is_contractor: boolean;
  is_senior_member: number;
  level_info: IndigoLevelInfo;
  mid: string;
  nameplate: IndigoNameplate;
  nft_interaction: null;
  official_verify: IndigoOfficialVerify;
  pendant: IndigoPendant;
  rank: string;
  senior: {
    [key: string]: any;
  };
  sex: string;
  sign: string;
  uname: string;
  user_sailing: IndigoUserSailing;
  user_sailing_v2: {
    [key: string]: any;
  };
  vip: IndigoVip;
  [property: string]: any;
};
type IndigoAvatarItem = {
  container_size: IndigoContainerSize;
  fallback_layers: IndigoFallbackLayers;
  mid: string;
  [property: string]: any;
};
type IndigoContainerSize = {
  height: number;
  width: number;
  [property: string]: any;
};
type IndigoFallbackLayers = {
  is_critical_group: boolean;
  layers: IndigoLayer[];
  [property: string]: any;
};
type IndigoLayer = {
  general_spec: IndigoGeneralSpec;
  layer_config: IndigoLayerConfig;
  resource: IndigoResource;
  visible: boolean;
  [property: string]: any;
};
type IndigoGeneralSpec = {
  pos_spec: IndigoPosSpec;
  render_spec: IndigoRenderSpec;
  size_spec: IndigoSizeSpec;
  [property: string]: any;
};
type IndigoPosSpec = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type IndigoRenderSpec = {
  opacity: number;
  [property: string]: any;
};
type IndigoSizeSpec = {
  height: number;
  width: number;
  [property: string]: any;
};
type IndigoLayerConfig = {
  is_critical?: boolean;
  tags: IndigoTags;
  [property: string]: any;
};
type IndigoTags = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: IndigoGENERALCFG;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type IndigoGENERALCFG = {
  config_type: number;
  general_config: IndigoGeneralConfig;
  [property: string]: any;
};
type IndigoGeneralConfig = {
  web_css_style: IndigoWebcssStyle;
  [property: string]: any;
};
type IndigoWebcssStyle = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type IndigoResource = {
  res_image: IndigoResImage;
  res_type: number;
  [property: string]: any;
};
type IndigoResImage = {
  image_src: IndigoImageSrc;
  [property: string]: any;
};
type IndigoImageSrc = {
  local: number;
  placeholder?: number;
  remote?: IndigoRemote;
  src_type: number;
  [property: string]: any;
};
type IndigoRemote = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type IndigoLevelInfo = {
  current_exp: number;
  current_level: number;
  current_min: number;
  next_exp: number;
  [property: string]: any;
};
type IndigoNameplate = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type IndigoOfficialVerify = {
  desc: string;
  type: number;
  [property: string]: any;
};
type IndigoPendant = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type IndigoUserSailing = {
  cardbg: null;
  cardbg_with_focus: null;
  pendant: null;
  [property: string]: any;
};
type IndigoVip = {
  accessStatus: number;
  avatar_subscript: number;
  dueRemark: string;
  label: IndigoLabel;
  nickname_color: string;
  themeType: number;
  vipDueDate: number;
  vipStatus: number;
  vipStatusWarn: string;
  vipType: number;
  [property: string]: any;
};
type IndigoLabel = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type TopReplyReply = {
  action?: number;
  assist?: number;
  attr?: number;
  content?: StickyContent;
  count?: number;
  ctime?: number;
  dialog?: number;
  dialog_str?: string;
  dynamic_id_str?: string;
  fansgrade?: number;
  folder?: StickyFolder;
  invisible?: boolean;
  like?: number;
  member?: StickyMember;
  mid?: number;
  mid_str?: string;
  note_cvid_str?: string;
  oid?: number;
  oid_str?: string;
  parent?: number;
  parent_str?: string;
  rcount?: number;
  replies?: null;
  reply_control?: StickyReplyControl;
  root?: number;
  root_str?: string;
  rpid?: number;
  rpid_str?: string;
  state?: number;
  track_info?: string;
  type?: number;
  up_action?: StickyUpAction;
  [property: string]: any;
};
type StickyContent = {
  jump_url: {
    [key: string]: any;
  };
  max_line: number;
  members: string[];
  message: string;
  [property: string]: any;
};
type StickyFolder = {
  has_folded: boolean;
  is_folded: boolean;
  rule: string;
  [property: string]: any;
};
type StickyMember = {
  avatar: string;
  avatar_item: IndecentAvatarItem;
  contract_desc: string;
  face_nft_new: number;
  fans_detail: null;
  is_contractor: boolean;
  is_senior_member: number;
  level_info: IndecentLevelInfo;
  mid: string;
  nameplate: IndecentNameplate;
  nft_interaction: null;
  official_verify: IndecentOfficialVerify;
  pendant: IndecentPendant;
  rank: string;
  senior: {
    [key: string]: any;
  };
  sex: string;
  sign: string;
  uname: string;
  user_sailing: IndecentUserSailing;
  user_sailing_v2: {
    [key: string]: any;
  };
  vip: IndecentVip;
  [property: string]: any;
};
type IndecentAvatarItem = {
  container_size: IndecentContainerSize;
  fallback_layers: IndecentFallbackLayers;
  mid: string;
  [property: string]: any;
};
type IndecentContainerSize = {
  height: number;
  width: number;
  [property: string]: any;
};
type IndecentFallbackLayers = {
  is_critical_group: boolean;
  layers: IndecentLayer[];
  [property: string]: any;
};
type IndecentLayer = {
  general_spec: IndecentGeneralSpec;
  layer_config: IndecentLayerConfig;
  resource: IndecentResource;
  visible: boolean;
  [property: string]: any;
};
type IndecentGeneralSpec = {
  pos_spec: IndecentPosSpec;
  render_spec: IndecentRenderSpec;
  size_spec: IndecentSizeSpec;
  [property: string]: any;
};
type IndecentPosSpec = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type IndecentRenderSpec = {
  opacity: number;
  [property: string]: any;
};
type IndecentSizeSpec = {
  height: number;
  width: number;
  [property: string]: any;
};
type IndecentLayerConfig = {
  is_critical?: boolean;
  tags: IndecentTags;
  [property: string]: any;
};
type IndecentTags = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: IndecentGENERALCFG;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type IndecentGENERALCFG = {
  config_type: number;
  general_config: IndecentGeneralConfig;
  [property: string]: any;
};
type IndecentGeneralConfig = {
  web_css_style: IndecentWebcssStyle;
  [property: string]: any;
};
type IndecentWebcssStyle = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type IndecentResource = {
  res_image: IndecentResImage;
  res_type: number;
  [property: string]: any;
};
type IndecentResImage = {
  image_src: IndecentImageSrc;
  [property: string]: any;
};
type IndecentImageSrc = {
  local: number;
  placeholder?: number;
  remote?: IndecentRemote;
  src_type: number;
  [property: string]: any;
};
type IndecentRemote = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type IndecentLevelInfo = {
  current_exp: number;
  current_level: number;
  current_min: number;
  next_exp: number;
  [property: string]: any;
};
type IndecentNameplate = {
  condition: string;
  image: string;
  image_small: string;
  level: string;
  name: string;
  nid: number;
  [property: string]: any;
};
type IndecentOfficialVerify = {
  desc: string;
  type: number;
  [property: string]: any;
};
type IndecentPendant = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type IndecentUserSailing = {
  cardbg: null;
  cardbg_with_focus: null;
  pendant: null;
  [property: string]: any;
};
type IndecentVip = {
  accessStatus: number;
  avatar_subscript: number;
  dueRemark: string;
  label: IndecentLabel;
  nickname_color: string;
  themeType: number;
  vipDueDate: number;
  vipStatus: number;
  vipStatusWarn: string;
  vipType: number;
  [property: string]: any;
};
type IndecentLabel = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type StickyReplyControl = {
  location: string;
  max_line: number;
  time_desc: string;
  translation_switch: number;
  [property: string]: any;
};
type StickyUpAction = {
  like: boolean;
  reply: boolean;
  [property: string]: any;
};
type TopReplyReplyControl = {
  cm_recommend_component: string;
  is_up_top: boolean;
  location: string;
  max_line: number;
  sub_reply_entry_text: string;
  sub_reply_title_text: string;
  time_desc: string;
  translation_switch: number;
  up_reply: boolean;
  [property: string]: any;
};
type TopReplyUpAction = {
  like: boolean;
  reply: boolean;
  [property: string]: any;
};
type DataUpper = {
  mid: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/DYNAMIC_TYPE_ARTICLE.d.ts
type DynamicTypeArticle = {
  code: number;
  data: DataData$15;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$15 = {
  item: Item$14;
  [property: string]: any;
};
type Item$14 = {
  basic: Basic$4;
  id_str: string;
  modules: Modules$4;
  type: DynamicType.ARTICLE;
  visible: boolean;
  [property: string]: any;
};
type Basic$4 = {
  comment_id_str: string;
  comment_type: number;
  jump_url: string;
  like_icon: LikeIcon$4;
  rid_str: string;
  [property: string]: any;
};
type LikeIcon$4 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type Modules$4 = {
  module_author: ModuleAuthor$4;
  module_dynamic: ModuleDynamic$4;
  module_more: ModuleMore$8;
  module_stat: ModuleStat$8;
  [property: string]: any;
};
type ModuleAuthor$4 = {
  avatar: Avatar$5;
  face: string;
  face_nft: boolean;
  following: null;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: OfficialVerify$4;
  pendant: Pendant$4;
  pub_action: string;
  pub_location_text: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: Vip$4;
  [property: string]: any;
};
type Avatar$5 = {
  container_size: ContainerSize$4;
  fallback_layers: FallbackLayers$4;
  mid: string;
  [property: string]: any;
};
type ContainerSize$4 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FallbackLayers$4 = {
  is_critical_group: boolean;
  layers: Layer$4[];
  [property: string]: any;
};
type Layer$4 = {
  general_spec: GeneralSpec$4;
  layer_config: LayerConfig$4;
  resource: Resource$4;
  visible: boolean;
  [property: string]: any;
};
type GeneralSpec$4 = {
  pos_spec: PosSpec$4;
  render_spec: RenderSpec$4;
  size_spec: SizeSpec$4;
  [property: string]: any;
};
type PosSpec$4 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type RenderSpec$4 = {
  opacity: number;
  [property: string]: any;
};
type SizeSpec$4 = {
  height: number;
  width: number;
  [property: string]: any;
};
type LayerConfig$4 = {
  is_critical?: boolean;
  tags: Tags$4;
  [property: string]: any;
};
type Tags$4 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: GeneralCFG$4;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type GeneralCFG$4 = {
  config_type: number;
  general_config: GeneralConfig$4;
  [property: string]: any;
};
type GeneralConfig$4 = {
  web_css_style: WebcssStyle$4;
  [property: string]: any;
};
type WebcssStyle$4 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type Resource$4 = {
  res_image: ResImage$4;
  res_type: number;
  [property: string]: any;
};
type ResImage$4 = {
  image_src: ImageSrc$4;
  [property: string]: any;
};
type ImageSrc$4 = {
  local: number;
  placeholder?: number;
  remote?: Remote$4;
  src_type: number;
  [property: string]: any;
};
type Remote$4 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type OfficialVerify$4 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type Pendant$4 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type Vip$4 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: Label$4;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type Label$4 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type ModuleDynamic$4 = {
  additional: null;
  desc: null;
  major: Major$8;
  topic: null;
  [property: string]: any;
};
type Major$8 = {
  opus: Opus$4;
  type: string;
  [property: string]: any;
};
type Opus$4 = {
  fold_action: string[];
  jump_url: string;
  pics: string[];
  summary: Summary$5;
  title: string;
  [property: string]: any;
};
type Summary$5 = {
  rich_text_nodes: RichTextNode$5[];
  text: string;
  [property: string]: any;
};
type RichTextNode$5 = {
  orig_text?: string;
  text?: string;
  type?: string;
  [property: string]: any;
};
type ModuleMore$8 = {
  three_point_items: ThreePointItem$8[];
  [property: string]: any;
};
type ThreePointItem$8 = {
  label?: string;
  type?: string;
  [property: string]: any;
};
type ModuleStat$8 = {
  comment: Comment$11;
  forward: Forward$8;
  like: Like$9;
  [property: string]: any;
};
type Comment$11 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Forward$8 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Like$9 = {
  count: number;
  forbidden: boolean;
  status: boolean;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/DYNAMIC_TYPE_AV.d.ts
type DynamicTypeAV = {
  code: number;
  data: DataData$14;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$14 = {
  item: Item$13;
  [property: string]: any;
};
type Item$13 = {
  basic: Basic$3;
  id_str: string;
  modules: Modules$3;
  type: DynamicType.AV;
  visible: boolean;
  [property: string]: any;
};
type Basic$3 = {
  comment_id_str: string;
  comment_type: number;
  like_icon: LikeIcon$3;
  rid_str: string;
  [property: string]: any;
};
type LikeIcon$3 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type Modules$3 = {
  module_author: ModuleAuthor$3;
  module_dynamic: ModuleDynamic$3;
  module_more: ModuleMore$7;
  module_stat: ModuleStat$7;
  [property: string]: any;
};
type ModuleAuthor$3 = {
  avatar: Avatar$4;
  face: string;
  face_nft: boolean;
  following: boolean;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: OfficialVerify$3;
  pendant: Pendant$3;
  pub_action: string;
  pub_location_text: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: Vip$3;
  [property: string]: any;
};
type Avatar$4 = {
  container_size: ContainerSize$3;
  fallback_layers: FallbackLayers$3;
  mid: string;
  [property: string]: any;
};
type ContainerSize$3 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FallbackLayers$3 = {
  is_critical_group: boolean;
  layers: Layer$3[];
  [property: string]: any;
};
type Layer$3 = {
  general_spec: GeneralSpec$3;
  layer_config: LayerConfig$3;
  resource: Resource$3;
  visible: boolean;
  [property: string]: any;
};
type GeneralSpec$3 = {
  pos_spec: PosSpec$3;
  render_spec: RenderSpec$3;
  size_spec: SizeSpec$3;
  [property: string]: any;
};
type PosSpec$3 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type RenderSpec$3 = {
  opacity: number;
  [property: string]: any;
};
type SizeSpec$3 = {
  height: number;
  width: number;
  [property: string]: any;
};
type LayerConfig$3 = {
  is_critical?: boolean;
  tags: Tags$3;
  [property: string]: any;
};
type Tags$3 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: GeneralCFG$3;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type GeneralCFG$3 = {
  config_type: number;
  general_config: GeneralConfig$3;
  [property: string]: any;
};
type GeneralConfig$3 = {
  web_css_style: WebcssStyle$3;
  [property: string]: any;
};
type WebcssStyle$3 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type Resource$3 = {
  res_image: ResImage$3;
  res_type: number;
  [property: string]: any;
};
type ResImage$3 = {
  image_src: ImageSrc$3;
  [property: string]: any;
};
type ImageSrc$3 = {
  local: number;
  placeholder?: number;
  remote?: Remote$3;
  src_type: number;
  [property: string]: any;
};
type Remote$3 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type OfficialVerify$3 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type Pendant$3 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type Vip$3 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: Label$3;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type Label$3 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type ModuleDynamic$3 = {
  additional: null;
  desc: Desc$4;
  major: Major$7;
  topic: null;
  [property: string]: any;
};
type Desc$4 = {
  rich_text_nodes: RichTextNode$4[];
  text: string;
  [property: string]: any;
};
type RichTextNode$4 = {
  orig_text?: string;
  text?: string;
  type?: string;
  [property: string]: any;
};
type Major$7 = {
  archive: Archive$1;
  type: string;
  [property: string]: any;
};
type Archive$1 = {
  aid: string;
  badge: Badge$1;
  bvid: string;
  cover: string;
  desc: string;
  disable_preview: number;
  duration_text: string;
  jump_url: string;
  stat: Stat$1;
  title: string;
  type: number;
  [property: string]: any;
};
type Badge$1 = {
  bg_color: string;
  color: string;
  icon_url: null;
  text: string;
  [property: string]: any;
};
type Stat$1 = {
  danmaku: string;
  play: string;
  [property: string]: any;
};
type ModuleMore$7 = {
  three_point_items: ThreePointItem$7[];
  [property: string]: any;
};
type ThreePointItem$7 = {
  label?: string;
  type?: string;
  [property: string]: any;
};
type ModuleStat$7 = {
  comment: Comment$10;
  forward: Forward$7;
  like: Like$8;
  [property: string]: any;
};
type Comment$10 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Forward$7 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Like$8 = {
  count: number;
  forbidden: boolean;
  status: boolean;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/DYNAMIC_TYPE_DRAW.d.ts
type DynamicTypeDraw = {
  code: number;
  data: DataData$13;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$13 = {
  item: Item$12;
  [property: string]: any;
};
type Item$12 = {
  basic: Basic$2;
  id_str: string;
  modules: Modules$2;
  type: DynamicType.DRAW;
  visible: boolean;
  [property: string]: any;
};
type Basic$2 = {
  comment_id_str: string;
  comment_type: number;
  jump_url: string;
  like_icon: LikeIcon$2;
  rid_str: string;
  [property: string]: any;
};
type LikeIcon$2 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type Modules$2 = {
  module_author: ModuleAuthor$2;
  module_dynamic: ModuleDynamic$2;
  module_more: ModuleMore$6;
  module_stat: ModuleStat$6;
  [property: string]: any;
};
type ModuleAuthor$2 = {
  avatar: Avatar$3;
  decoration_card: DecorationCard$5;
  face: string;
  face_nft: boolean;
  following: null;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: OfficialVerify$2;
  pendant: Pendant$2;
  pub_action: string;
  pub_location_text: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: Vip$2;
  [property: string]: any;
};
type Avatar$3 = {
  container_size: ContainerSize$2;
  fallback_layers: FallbackLayers$2;
  mid: string;
  [property: string]: any;
};
type ContainerSize$2 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FallbackLayers$2 = {
  is_critical_group: boolean;
  layers: Layer$2[];
  [property: string]: any;
};
type Layer$2 = {
  general_spec: GeneralSpec$2;
  layer_config: LayerConfig$2;
  resource: Resource$2;
  visible: boolean;
  [property: string]: any;
};
type GeneralSpec$2 = {
  pos_spec: PosSpec$2;
  render_spec: RenderSpec$2;
  size_spec: SizeSpec$2;
  [property: string]: any;
};
type PosSpec$2 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type RenderSpec$2 = {
  opacity: number;
  [property: string]: any;
};
type SizeSpec$2 = {
  height: number;
  width: number;
  [property: string]: any;
};
type LayerConfig$2 = {
  is_critical?: boolean;
  tags: Tags$2;
  [property: string]: any;
};
type Tags$2 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: GeneralCFG$2;
  ICON_LAYER: {
    [key: string]: any;
  };
  PENDENT_LAYER?: {
    [key: string]: any;
  };
  [property: string]: any;
};
type GeneralCFG$2 = {
  config_type: number;
  general_config: GeneralConfig$2;
  [property: string]: any;
};
type GeneralConfig$2 = {
  web_css_style: WebcssStyle$2;
  [property: string]: any;
};
type WebcssStyle$2 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type Resource$2 = {
  res_image: ResImage$2;
  res_type: number;
  [property: string]: any;
};
type ResImage$2 = {
  image_src: ImageSrc$2;
  [property: string]: any;
};
type ImageSrc$2 = {
  local: number;
  placeholder?: number;
  remote?: Remote$2;
  src_type: number;
  [property: string]: any;
};
type Remote$2 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type DecorationCard$5 = {
  big_card_url: string;
  card_type: number;
  card_type_name: string;
  card_url: string;
  fan: Fan$5;
  id: number;
  image_enhance: string;
  item_id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type Fan$5 = {
  color: string;
  color_format: ColorFormat$5;
  is_fan: number;
  name: string;
  num_desc: string;
  number: number;
  [property: string]: any;
};
type ColorFormat$5 = {
  colors: string[];
  end_point: string;
  gradients: number[];
  start_point: string;
  [property: string]: any;
};
type OfficialVerify$2 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type Pendant$2 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type Vip$2 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: Label$2;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type Label$2 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type ModuleDynamic$2 = {
  additional: Additional$2;
  desc: null;
  major: Major$6;
  topic: Topic$4;
  [property: string]: any;
};
type Additional$2 = {
  type: string;
  reserve: Reserve$1;
  [property: string]: any;
};
type Reserve$1 = {
  button: Button$2;
  desc1: Desc1$1;
  desc2: Desc2$1;
  jump_url: string;
  reserve_total: number;
  rid: number;
  state: number;
  stype: number;
  title: string;
  up_mid: number;
  [property: string]: any;
};
type Button$2 = {
  check: Check$1;
  status: number;
  type: number;
  uncheck: Uncheck$1;
  [property: string]: any;
};
type Check$1 = {
  icon_url: string;
  text: string;
  [property: string]: any;
};
type Uncheck$1 = {
  disable: number;
  icon_url: string;
  text: string;
  toast: string;
  [property: string]: any;
};
type Desc1$1 = {
  style: number;
  text: string;
  [property: string]: any;
};
type Desc2$1 = {
  style: number;
  text: string;
  visible: boolean;
  [property: string]: any;
};
type Major$6 = {
  opus: Opus$3;
  type: string;
  [property: string]: any;
};
type Opus$3 = {
  fold_action: string[];
  jump_url: string;
  pics: Pic$2[];
  summary: Summary$4;
  title: null;
  [property: string]: any;
};
type Pic$2 = {
  height?: number;
  live_url?: null;
  size?: number;
  url?: string;
  width?: number;
  [property: string]: any;
};
type Summary$4 = {
  rich_text_nodes: RichTextNode$3[];
  text: string;
  [property: string]: any;
};
type RichTextNode$3 = {
  jump_url?: string;
  orig_text: string;
  text: string;
  type: string;
  [property: string]: any;
};
type Topic$4 = {
  id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type ModuleMore$6 = {
  three_point_items: ThreePointItem$6[];
  [property: string]: any;
};
type ThreePointItem$6 = {
  label?: string;
  type?: string;
  [property: string]: any;
};
type ModuleStat$6 = {
  comment: Comment$9;
  forward: Forward$6;
  like: Like$7;
  [property: string]: any;
};
type Comment$9 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Forward$6 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Like$7 = {
  count: number;
  forbidden: boolean;
  status: boolean;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/Forward/DYNAMIC_TYPE_AV.d.ts
type DynamicTypeAV$1 = {
  code: number;
  data: DataData$12;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$12 = {
  item: Item$11;
  [property: string]: any;
};
type Item$11 = {
  basic: ItemBasic$4;
  id_str: string;
  modules: ItemModules$4;
  orig: Orig$3;
  type: DynamicType.AV;
  visible: boolean;
  [property: string]: any;
};
type ItemBasic$4 = {
  comment_id_str: string;
  comment_type: number;
  editable: boolean;
  like_icon: PurpleLikeIcon$3;
  rid_str: string;
  [property: string]: any;
};
type PurpleLikeIcon$3 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type ItemModules$4 = {
  module_author: PurpleModuleAuthor$3;
  module_dynamic: PurpleModuleDynamic$3;
  module_more: ModuleMore$5;
  module_stat: ModuleStat$5;
  [property: string]: any;
};
type PurpleModuleAuthor$3 = {
  avatar: PurpleAvatar$3;
  face: string;
  face_nft: boolean;
  following: null;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: PurpleOfficialVerify$3;
  pendant: PurplePendant$3;
  pub_action: string;
  pub_location_text: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: PurpleVip$3;
  [property: string]: any;
};
type PurpleAvatar$3 = {
  container_size: PurpleContainerSize$3;
  fallback_layers: PurpleFallbackLayers$3;
  mid: string;
  [property: string]: any;
};
type PurpleContainerSize$3 = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleFallbackLayers$3 = {
  is_critical_group: boolean;
  layers: PurpleLayer$3[];
  [property: string]: any;
};
type PurpleLayer$3 = {
  general_spec: PurpleGeneralSpec$3;
  layer_config: PurpleLayerConfig$3;
  resource: PurpleResource$3;
  visible: boolean;
  [property: string]: any;
};
type PurpleGeneralSpec$3 = {
  pos_spec: PurplePosSpec$3;
  render_spec: PurpleRenderSpec$3;
  size_spec: PurpleSizeSpec$3;
  [property: string]: any;
};
type PurplePosSpec$3 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type PurpleRenderSpec$3 = {
  opacity: number;
  [property: string]: any;
};
type PurpleSizeSpec$3 = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleLayerConfig$3 = {
  is_critical?: boolean;
  tags: PurpleTags$3;
  [property: string]: any;
};
type PurpleTags$3 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: PurpleGENERALCFG$3;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type PurpleGENERALCFG$3 = {
  config_type: number;
  general_config: PurpleGeneralConfig$3;
  [property: string]: any;
};
type PurpleGeneralConfig$3 = {
  web_css_style: PurpleWebcssStyle$3;
  [property: string]: any;
};
type PurpleWebcssStyle$3 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type PurpleResource$3 = {
  res_image: PurpleResImage$3;
  res_type: number;
  [property: string]: any;
};
type PurpleResImage$3 = {
  image_src: PurpleImageSrc$3;
  [property: string]: any;
};
type PurpleImageSrc$3 = {
  local: number;
  placeholder?: number;
  remote?: PurpleRemote$3;
  src_type: number;
  [property: string]: any;
};
type PurpleRemote$3 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type PurpleOfficialVerify$3 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type PurplePendant$3 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type PurpleVip$3 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: PurpleLabel$3;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type PurpleLabel$3 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type PurpleModuleDynamic$3 = {
  additional: null;
  desc: Desc$3;
  major: null;
  topic: Topic$3;
  [property: string]: any;
};
type Desc$3 = {
  rich_text_nodes: RichTextNode$2[];
  text: string;
  [property: string]: any;
};
type RichTextNode$2 = {
  emoji?: Emoji$4;
  orig_text: string;
  rid?: string;
  text: string;
  type: string;
  [property: string]: any;
};
type Emoji$4 = {
  icon_url: string;
  size: number;
  text: string;
  type: number;
  [property: string]: any;
};
type Topic$3 = {
  id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type ModuleMore$5 = {
  three_point_items: ThreePointItem$5[];
  [property: string]: any;
};
type ThreePointItem$5 = {
  label: string;
  modal?: Modal$3;
  params: Params$3;
  type: string;
  [property: string]: any;
};
type Modal$3 = {
  cancel: string;
  confirm: string;
  content: string;
  title: string;
  [property: string]: any;
};
type Params$3 = {
  dyn_id_str: string;
  dyn_type: number;
  dynamic_id?: string;
  rid_str: string;
  status?: number;
  type?: number;
  [property: string]: any;
};
type ModuleStat$5 = {
  comment: Comment$8;
  forward: Forward$5;
  like: Like$6;
  [property: string]: any;
};
type Comment$8 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Forward$5 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Like$6 = {
  count: number;
  forbidden: boolean;
  status: boolean;
  [property: string]: any;
};
type Orig$3 = {
  basic: OrigBasic$3;
  id_str: string;
  modules: OrigModules$3;
  type: string;
  visible: boolean;
  [property: string]: any;
};
type OrigBasic$3 = {
  comment_id_str: string;
  comment_type: number;
  like_icon: FluffyLikeIcon$3;
  rid_str: string;
  [property: string]: any;
};
type FluffyLikeIcon$3 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type OrigModules$3 = {
  module_author: FluffyModuleAuthor$3;
  module_dynamic: FluffyModuleDynamic$3;
  [property: string]: any;
};
type FluffyModuleAuthor$3 = {
  avatar: FluffyAvatar$3;
  decoration_card: DecorationCard$4;
  face: string;
  face_nft: boolean;
  following: null;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: FluffyOfficialVerify$3;
  pendant: FluffyPendant$3;
  pub_action: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: FluffyVip$3;
  [property: string]: any;
};
type FluffyAvatar$3 = {
  container_size: FluffyContainerSize$3;
  fallback_layers: FluffyFallbackLayers$3;
  mid: string;
  [property: string]: any;
};
type FluffyContainerSize$3 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyFallbackLayers$3 = {
  is_critical_group: boolean;
  layers: FluffyLayer$3[];
  [property: string]: any;
};
type FluffyLayer$3 = {
  general_spec: FluffyGeneralSpec$3;
  layer_config: FluffyLayerConfig$3;
  resource: FluffyResource$3;
  visible: boolean;
  [property: string]: any;
};
type FluffyGeneralSpec$3 = {
  pos_spec: FluffyPosSpec$3;
  render_spec: FluffyRenderSpec$3;
  size_spec: FluffySizeSpec$3;
  [property: string]: any;
};
type FluffyPosSpec$3 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type FluffyRenderSpec$3 = {
  opacity: number;
  [property: string]: any;
};
type FluffySizeSpec$3 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyLayerConfig$3 = {
  is_critical?: boolean;
  tags: FluffyTags$3;
  [property: string]: any;
};
type FluffyTags$3 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: FluffyGENERALCFG$3;
  ICON_LAYER: {
    [key: string]: any;
  };
  PENDENT_LAYER?: {
    [key: string]: any;
  };
  [property: string]: any;
};
type FluffyGENERALCFG$3 = {
  config_type: number;
  general_config: FluffyGeneralConfig$3;
  [property: string]: any;
};
type FluffyGeneralConfig$3 = {
  web_css_style: FluffyWebcssStyle$3;
  [property: string]: any;
};
type FluffyWebcssStyle$3 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type FluffyResource$3 = {
  res_image: FluffyResImage$3;
  res_type: number;
  [property: string]: any;
};
type FluffyResImage$3 = {
  image_src: FluffyImageSrc$3;
  [property: string]: any;
};
type FluffyImageSrc$3 = {
  local: number;
  placeholder?: number;
  remote?: FluffyRemote$3;
  src_type: number;
  [property: string]: any;
};
type FluffyRemote$3 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type DecorationCard$4 = {
  big_card_url: string;
  card_type: number;
  card_type_name: string;
  card_url: string;
  fan: Fan$4;
  id: number;
  image_enhance: string;
  item_id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type Fan$4 = {
  color: string;
  color_format: ColorFormat$4;
  is_fan: number;
  name: string;
  num_desc: string;
  number: number;
  [property: string]: any;
};
type ColorFormat$4 = {
  colors: string[];
  end_point: string;
  gradients: number[];
  start_point: string;
  [property: string]: any;
};
type FluffyOfficialVerify$3 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type FluffyPendant$3 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type FluffyVip$3 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: FluffyLabel$3;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type FluffyLabel$3 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type FluffyModuleDynamic$3 = {
  additional: null;
  desc: null;
  major: Major$5;
  topic: null;
  [property: string]: any;
};
type Major$5 = {
  archive: Archive;
  type: string;
  [property: string]: any;
};
type Archive = {
  aid: string;
  badge: Badge;
  bvid: string;
  cover: string;
  desc: string;
  disable_preview: number;
  duration_text: string;
  jump_url: string;
  stat: Stat;
  title: string;
  type: number;
  [property: string]: any;
};
type Badge = {
  bg_color: string;
  color: string;
  icon_url: null;
  text: string;
  [property: string]: any;
};
type Stat = {
  danmaku: string;
  play: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/Forward/DYNAMIC_TYPE_DRAW.d.ts
type DynamicTypeDraw$1 = {
  code: number;
  data: DataData$11;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$11 = {
  item: Item$10;
  [property: string]: any;
};
type Item$10 = {
  basic: ItemBasic$3;
  id_str: string;
  modules: ItemModules$3;
  orig: Orig$2;
  type: DynamicType.DRAW;
  visible: boolean;
  [property: string]: any;
};
type ItemBasic$3 = {
  comment_id_str: string;
  comment_type: number;
  editable: boolean;
  like_icon: PurpleLikeIcon$2;
  rid_str: string;
  [property: string]: any;
};
type PurpleLikeIcon$2 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type ItemModules$3 = {
  module_author: PurpleModuleAuthor$2;
  module_dynamic: PurpleModuleDynamic$2;
  module_more: ModuleMore$4;
  module_stat: ModuleStat$4;
  [property: string]: any;
};
type PurpleModuleAuthor$2 = {
  avatar: PurpleAvatar$2;
  face: string;
  face_nft: boolean;
  following: null;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: PurpleOfficialVerify$2;
  pendant: PurplePendant$2;
  pub_action: string;
  pub_location_text: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: PurpleVip$2;
  [property: string]: any;
};
type PurpleAvatar$2 = {
  container_size: PurpleContainerSize$2;
  fallback_layers: PurpleFallbackLayers$2;
  mid: string;
  [property: string]: any;
};
type PurpleContainerSize$2 = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleFallbackLayers$2 = {
  is_critical_group: boolean;
  layers: PurpleLayer$2[];
  [property: string]: any;
};
type PurpleLayer$2 = {
  general_spec: PurpleGeneralSpec$2;
  layer_config: PurpleLayerConfig$2;
  resource: PurpleResource$2;
  visible: boolean;
  [property: string]: any;
};
type PurpleGeneralSpec$2 = {
  pos_spec: PurplePosSpec$2;
  render_spec: PurpleRenderSpec$2;
  size_spec: PurpleSizeSpec$2;
  [property: string]: any;
};
type PurplePosSpec$2 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type PurpleRenderSpec$2 = {
  opacity: number;
  [property: string]: any;
};
type PurpleSizeSpec$2 = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleLayerConfig$2 = {
  is_critical?: boolean;
  tags: PurpleTags$2;
  [property: string]: any;
};
type PurpleTags$2 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: PurpleGENERALCFG$2;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type PurpleGENERALCFG$2 = {
  config_type: number;
  general_config: PurpleGeneralConfig$2;
  [property: string]: any;
};
type PurpleGeneralConfig$2 = {
  web_css_style: PurpleWebcssStyle$2;
  [property: string]: any;
};
type PurpleWebcssStyle$2 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type PurpleResource$2 = {
  res_image: PurpleResImage$2;
  res_type: number;
  [property: string]: any;
};
type PurpleResImage$2 = {
  image_src: PurpleImageSrc$2;
  [property: string]: any;
};
type PurpleImageSrc$2 = {
  local: number;
  placeholder?: number;
  remote?: PurpleRemote$2;
  src_type: number;
  [property: string]: any;
};
type PurpleRemote$2 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type PurpleOfficialVerify$2 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type PurplePendant$2 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type PurpleVip$2 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: PurpleLabel$2;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type PurpleLabel$2 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type PurpleModuleDynamic$2 = {
  additional: null;
  desc: Desc$2;
  major: null;
  topic: Topic$2;
  [property: string]: any;
};
type Desc$2 = {
  rich_text_nodes: DescRichTextNode$1[];
  text: string;
  [property: string]: any;
};
type DescRichTextNode$1 = {
  emoji?: Emoji$3;
  orig_text: string;
  rid?: string;
  text: string;
  type: string;
  [property: string]: any;
};
type Emoji$3 = {
  icon_url: string;
  size: number;
  text: string;
  type: number;
  [property: string]: any;
};
type Topic$2 = {
  id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type ModuleMore$4 = {
  three_point_items: ThreePointItem$4[];
  [property: string]: any;
};
type ThreePointItem$4 = {
  label: string;
  modal?: Modal$2;
  params: Params$2;
  type: string;
  [property: string]: any;
};
type Modal$2 = {
  cancel: string;
  confirm: string;
  content: string;
  title: string;
  [property: string]: any;
};
type Params$2 = {
  dyn_id_str: string;
  dyn_type: number;
  dynamic_id?: string;
  rid_str: string;
  status?: number;
  type?: number;
  [property: string]: any;
};
type ModuleStat$4 = {
  comment: Comment$7;
  forward: Forward$4;
  like: Like$5;
  [property: string]: any;
};
type Comment$7 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Forward$4 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Like$5 = {
  count: number;
  forbidden: boolean;
  status: boolean;
  [property: string]: any;
};
type Orig$2 = {
  basic: OrigBasic$2;
  id_str: string;
  modules: OrigModules$2;
  type: string;
  visible: boolean;
  [property: string]: any;
};
type OrigBasic$2 = {
  comment_id_str: string;
  comment_type: number;
  jump_url: string;
  like_icon: FluffyLikeIcon$2;
  rid_str: string;
  [property: string]: any;
};
type FluffyLikeIcon$2 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type OrigModules$2 = {
  module_author: FluffyModuleAuthor$2;
  module_dynamic: FluffyModuleDynamic$2;
  [property: string]: any;
};
type FluffyModuleAuthor$2 = {
  avatar: FluffyAvatar$2;
  decoration_card: DecorationCard$3;
  face: string;
  face_nft: boolean;
  following: null;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: FluffyOfficialVerify$2;
  pendant: FluffyPendant$2;
  pub_action: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: FluffyVip$2;
  [property: string]: any;
};
type FluffyAvatar$2 = {
  container_size: FluffyContainerSize$2;
  fallback_layers: FluffyFallbackLayers$2;
  mid: string;
  [property: string]: any;
};
type FluffyContainerSize$2 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyFallbackLayers$2 = {
  is_critical_group: boolean;
  layers: FluffyLayer$2[];
  [property: string]: any;
};
type FluffyLayer$2 = {
  general_spec: FluffyGeneralSpec$2;
  layer_config: FluffyLayerConfig$2;
  resource: FluffyResource$2;
  visible: boolean;
  [property: string]: any;
};
type FluffyGeneralSpec$2 = {
  pos_spec: FluffyPosSpec$2;
  render_spec: FluffyRenderSpec$2;
  size_spec: FluffySizeSpec$2;
  [property: string]: any;
};
type FluffyPosSpec$2 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type FluffyRenderSpec$2 = {
  opacity: number;
  [property: string]: any;
};
type FluffySizeSpec$2 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyLayerConfig$2 = {
  is_critical?: boolean;
  tags: FluffyTags$2;
  [property: string]: any;
};
type FluffyTags$2 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: FluffyGENERALCFG$2;
  ICON_LAYER: {
    [key: string]: any;
  };
  PENDENT_LAYER?: {
    [key: string]: any;
  };
  [property: string]: any;
};
type FluffyGENERALCFG$2 = {
  config_type: number;
  general_config: FluffyGeneralConfig$2;
  [property: string]: any;
};
type FluffyGeneralConfig$2 = {
  web_css_style: FluffyWebcssStyle$2;
  [property: string]: any;
};
type FluffyWebcssStyle$2 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type FluffyResource$2 = {
  res_image: FluffyResImage$2;
  res_type: number;
  [property: string]: any;
};
type FluffyResImage$2 = {
  image_src: FluffyImageSrc$2;
  [property: string]: any;
};
type FluffyImageSrc$2 = {
  local: number;
  placeholder?: number;
  remote?: FluffyRemote$2;
  src_type: number;
  [property: string]: any;
};
type FluffyRemote$2 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type DecorationCard$3 = {
  big_card_url: string;
  card_type: number;
  card_type_name: string;
  card_url: string;
  fan: Fan$3;
  id: number;
  image_enhance: string;
  item_id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type Fan$3 = {
  color: string;
  color_format: ColorFormat$3;
  is_fan: number;
  name: string;
  num_desc: string;
  number: number;
  [property: string]: any;
};
type ColorFormat$3 = {
  colors: string[];
  end_point: string;
  gradients: number[];
  start_point: string;
  [property: string]: any;
};
type FluffyOfficialVerify$2 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type FluffyPendant$2 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type FluffyVip$2 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: FluffyLabel$2;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type FluffyLabel$2 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type FluffyModuleDynamic$2 = {
  additional: null;
  desc: null;
  major: Major$4;
  topic: null;
  [property: string]: any;
};
type Major$4 = {
  opus: Opus$2;
  type: string;
  [property: string]: any;
};
type Opus$2 = {
  fold_action: string[];
  jump_url: string;
  pics: Pic$1[];
  summary: Summary$3;
  title: null;
  [property: string]: any;
};
type Pic$1 = {
  height?: number;
  live_url?: null;
  size?: number;
  url?: string;
  width?: number;
  [property: string]: any;
};
type Summary$3 = {
  rich_text_nodes: SummaryRichTextNode$1[];
  text: string;
  [property: string]: any;
};
type SummaryRichTextNode$1 = {
  jump_url?: string;
  orig_text: string;
  text: string;
  type: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/Forward/DYNAMIC_TYPE_LIVE_RCMD.d.ts
type DynamicTypeLiveRcmd$1 = {
  code: number;
  data: DataData$10;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$10 = {
  item: Item$9;
  [property: string]: any;
};
type Item$9 = {
  basic: ItemBasic$2;
  id_str: string;
  modules: ItemModules$2;
  orig: Orig$1;
  type: DynamicType.LIVE_RCMD;
  visible: boolean;
  [property: string]: any;
};
type ItemBasic$2 = {
  comment_id_str: string;
  comment_type: number;
  editable: boolean;
  like_icon: PurpleLikeIcon$1;
  rid_str: string;
  [property: string]: any;
};
type PurpleLikeIcon$1 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type ItemModules$2 = {
  module_author: PurpleModuleAuthor$1;
  module_dynamic: PurpleModuleDynamic$1;
  module_more: ModuleMore$3;
  module_stat: ModuleStat$3;
  [property: string]: any;
};
type PurpleModuleAuthor$1 = {
  avatar: PurpleAvatar$1;
  face: string;
  face_nft: boolean;
  following: null;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: PurpleOfficialVerify$1;
  pendant: PurplePendant$1;
  pub_action: string;
  pub_location_text: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: PurpleVip$1;
  [property: string]: any;
};
type PurpleAvatar$1 = {
  container_size: PurpleContainerSize$1;
  fallback_layers: PurpleFallbackLayers$1;
  mid: string;
  [property: string]: any;
};
type PurpleContainerSize$1 = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleFallbackLayers$1 = {
  is_critical_group: boolean;
  layers: PurpleLayer$1[];
  [property: string]: any;
};
type PurpleLayer$1 = {
  general_spec: PurpleGeneralSpec$1;
  layer_config: PurpleLayerConfig$1;
  resource: PurpleResource$1;
  visible: boolean;
  [property: string]: any;
};
type PurpleGeneralSpec$1 = {
  pos_spec: PurplePosSpec$1;
  render_spec: PurpleRenderSpec$1;
  size_spec: PurpleSizeSpec$1;
  [property: string]: any;
};
type PurplePosSpec$1 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type PurpleRenderSpec$1 = {
  opacity: number;
  [property: string]: any;
};
type PurpleSizeSpec$1 = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleLayerConfig$1 = {
  is_critical?: boolean;
  tags: PurpleTags$1;
  [property: string]: any;
};
type PurpleTags$1 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: PurpleGENERALCFG$1;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type PurpleGENERALCFG$1 = {
  config_type: number;
  general_config: PurpleGeneralConfig$1;
  [property: string]: any;
};
type PurpleGeneralConfig$1 = {
  web_css_style: PurpleWebcssStyle$1;
  [property: string]: any;
};
type PurpleWebcssStyle$1 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type PurpleResource$1 = {
  res_image: PurpleResImage$1;
  res_type: number;
  [property: string]: any;
};
type PurpleResImage$1 = {
  image_src: PurpleImageSrc$1;
  [property: string]: any;
};
type PurpleImageSrc$1 = {
  local: number;
  placeholder?: number;
  remote?: PurpleRemote$1;
  src_type: number;
  [property: string]: any;
};
type PurpleRemote$1 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type PurpleOfficialVerify$1 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type PurplePendant$1 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type PurpleVip$1 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: PurpleLabel$1;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type PurpleLabel$1 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type PurpleModuleDynamic$1 = {
  additional: null;
  desc: Desc$1;
  major: null;
  topic: Topic$1;
  [property: string]: any;
};
type Desc$1 = {
  rich_text_nodes: RichTextNode$1[];
  text: string;
  [property: string]: any;
};
type RichTextNode$1 = {
  emoji?: Emoji$2;
  orig_text: string;
  rid?: string;
  text: string;
  type: string;
  [property: string]: any;
};
type Emoji$2 = {
  icon_url: string;
  size: number;
  text: string;
  type: number;
  [property: string]: any;
};
type Topic$1 = {
  id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type ModuleMore$3 = {
  three_point_items: ThreePointItem$3[];
  [property: string]: any;
};
type ThreePointItem$3 = {
  label: string;
  modal?: Modal$1;
  params: Params$1;
  type: string;
  [property: string]: any;
};
type Modal$1 = {
  cancel: string;
  confirm: string;
  content: string;
  title: string;
  [property: string]: any;
};
type Params$1 = {
  dyn_id_str: string;
  dyn_type: number;
  dynamic_id?: string;
  rid_str: string;
  status?: number;
  type?: number;
  [property: string]: any;
};
type ModuleStat$3 = {
  comment: Comment$6;
  forward: Forward$3;
  like: Like$4;
  [property: string]: any;
};
type Comment$6 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Forward$3 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Like$4 = {
  count: number;
  forbidden: boolean;
  status: boolean;
  [property: string]: any;
};
type Orig$1 = {
  basic: OrigBasic$1;
  id_str: string;
  modules: OrigModules$1;
  type: string;
  visible: boolean;
  [property: string]: any;
};
type OrigBasic$1 = {
  comment_id_str: string;
  comment_type: number;
  like_icon: FluffyLikeIcon$1;
  rid_str: string;
  [property: string]: any;
};
type FluffyLikeIcon$1 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type OrigModules$1 = {
  module_author: FluffyModuleAuthor$1;
  module_dynamic: FluffyModuleDynamic$1;
  [property: string]: any;
};
type FluffyModuleAuthor$1 = {
  avatar: FluffyAvatar$1;
  face: string;
  face_nft: boolean;
  following: boolean;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: FluffyOfficialVerify$1;
  pendant: FluffyPendant$1;
  pub_action: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: FluffyVip$1;
  [property: string]: any;
};
type FluffyAvatar$1 = {
  container_size: FluffyContainerSize$1;
  fallback_layers: FluffyFallbackLayers$1;
  mid: string;
  [property: string]: any;
};
type FluffyContainerSize$1 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyFallbackLayers$1 = {
  is_critical_group: boolean;
  layers: FluffyLayer$1[];
  [property: string]: any;
};
type FluffyLayer$1 = {
  general_spec: FluffyGeneralSpec$1;
  layer_config: FluffyLayerConfig$1;
  resource: FluffyResource$1;
  visible: boolean;
  [property: string]: any;
};
type FluffyGeneralSpec$1 = {
  pos_spec: FluffyPosSpec$1;
  render_spec: FluffyRenderSpec$1;
  size_spec: FluffySizeSpec$1;
  [property: string]: any;
};
type FluffyPosSpec$1 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type FluffyRenderSpec$1 = {
  opacity: number;
  [property: string]: any;
};
type FluffySizeSpec$1 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyLayerConfig$1 = {
  is_critical?: boolean;
  tags: FluffyTags$1;
  [property: string]: any;
};
type FluffyTags$1 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: FluffyGENERALCFG$1;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type FluffyGENERALCFG$1 = {
  config_type: number;
  general_config: FluffyGeneralConfig$1;
  [property: string]: any;
};
type FluffyGeneralConfig$1 = {
  web_css_style: FluffyWebcssStyle$1;
  [property: string]: any;
};
type FluffyWebcssStyle$1 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type FluffyResource$1 = {
  res_image: FluffyResImage$1;
  res_type: number;
  [property: string]: any;
};
type FluffyResImage$1 = {
  image_src: FluffyImageSrc$1;
  [property: string]: any;
};
type FluffyImageSrc$1 = {
  local: number;
  placeholder?: number;
  remote?: FluffyRemote$1;
  src_type: number;
  [property: string]: any;
};
type FluffyRemote$1 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type FluffyOfficialVerify$1 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type FluffyPendant$1 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type FluffyVip$1 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: FluffyLabel$1;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type FluffyLabel$1 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type FluffyModuleDynamic$1 = {
  additional: null;
  desc: null;
  major: Major$3;
  topic: null;
  [property: string]: any;
};
type Major$3 = {
  live_rcmd: LiveRcmd$1;
  type: string;
  [property: string]: any;
};
type LiveRcmd$1 = {
  content: string;
  reserve_type: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/Forward/DYNAMIC_TYPE_WORD.d.ts
type DynamicTypeWord$1 = {
  code: number;
  data: DataData$9;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$9 = {
  item: Item$8;
  [property: string]: any;
};
type Item$8 = {
  basic: ItemBasic$1;
  id_str: string;
  modules: ItemModules$1;
  orig: Orig;
  type: DynamicType.WORD;
  visible: boolean;
  [property: string]: any;
};
type ItemBasic$1 = {
  comment_id_str: string;
  comment_type: number;
  editable: boolean;
  like_icon: PurpleLikeIcon;
  rid_str: string;
  [property: string]: any;
};
type PurpleLikeIcon = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type ItemModules$1 = {
  module_author: PurpleModuleAuthor;
  module_dynamic: PurpleModuleDynamic;
  module_more: ModuleMore$2;
  module_stat: ModuleStat$2;
  [property: string]: any;
};
type PurpleModuleAuthor = {
  avatar: PurpleAvatar;
  face: string;
  face_nft: boolean;
  following: null;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: PurpleOfficialVerify;
  pendant: PurplePendant;
  pub_action: string;
  pub_location_text: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: PurpleVip;
  [property: string]: any;
};
type PurpleAvatar = {
  container_size: PurpleContainerSize;
  fallback_layers: PurpleFallbackLayers;
  mid: string;
  [property: string]: any;
};
type PurpleContainerSize = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleFallbackLayers = {
  is_critical_group: boolean;
  layers: PurpleLayer[];
  [property: string]: any;
};
type PurpleLayer = {
  general_spec: PurpleGeneralSpec;
  layer_config: PurpleLayerConfig;
  resource: PurpleResource;
  visible: boolean;
  [property: string]: any;
};
type PurpleGeneralSpec = {
  pos_spec: PurplePosSpec;
  render_spec: PurpleRenderSpec;
  size_spec: PurpleSizeSpec;
  [property: string]: any;
};
type PurplePosSpec = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type PurpleRenderSpec = {
  opacity: number;
  [property: string]: any;
};
type PurpleSizeSpec = {
  height: number;
  width: number;
  [property: string]: any;
};
type PurpleLayerConfig = {
  is_critical?: boolean;
  tags: PurpleTags;
  [property: string]: any;
};
type PurpleTags = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: PurpleGENERALCFG;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type PurpleGENERALCFG = {
  config_type: number;
  general_config: PurpleGeneralConfig;
  [property: string]: any;
};
type PurpleGeneralConfig = {
  web_css_style: PurpleWebcssStyle;
  [property: string]: any;
};
type PurpleWebcssStyle = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type PurpleResource = {
  res_image: PurpleResImage;
  res_type: number;
  [property: string]: any;
};
type PurpleResImage = {
  image_src: PurpleImageSrc;
  [property: string]: any;
};
type PurpleImageSrc = {
  local: number;
  placeholder?: number;
  remote?: PurpleRemote;
  src_type: number;
  [property: string]: any;
};
type PurpleRemote = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type PurpleOfficialVerify = {
  desc: string;
  type: number;
  [property: string]: any;
};
type PurplePendant = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type PurpleVip = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: PurpleLabel;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type PurpleLabel = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type PurpleModuleDynamic = {
  additional: Additional$1;
  desc: Desc;
  major: null;
  topic: Topic;
  [property: string]: any;
};
type Additional$1 = {
  type: string;
  reserve: Reserve;
  [property: string]: any;
};
type Reserve = {
  button: Button$1;
  desc1: Desc1;
  desc2: Desc2;
  jump_url: string;
  reserve_total: number;
  rid: number;
  state: number;
  stype: number;
  title: string;
  up_mid: number;
  [property: string]: any;
};
type Button$1 = {
  check: Check;
  status: number;
  type: number;
  uncheck: Uncheck;
  [property: string]: any;
};
type Check = {
  icon_url: string;
  text: string;
  [property: string]: any;
};
type Uncheck = {
  disable: number;
  icon_url: string;
  text: string;
  toast: string;
  [property: string]: any;
};
type Desc1 = {
  style: number;
  text: string;
  [property: string]: any;
};
type Desc2 = {
  style: number;
  text: string;
  visible: boolean;
  [property: string]: any;
};
type Desc = {
  rich_text_nodes: DescRichTextNode[];
  text: string;
  [property: string]: any;
};
type DescRichTextNode = {
  emoji?: Emoji$1;
  orig_text: string;
  rid?: string;
  text: string;
  type: string;
  [property: string]: any;
};
type Emoji$1 = {
  icon_url: string;
  size: number;
  text: string;
  type: number;
  [property: string]: any;
};
type Topic = {
  id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type ModuleMore$2 = {
  three_point_items: ThreePointItem$2[];
  [property: string]: any;
};
type ThreePointItem$2 = {
  label: string;
  modal?: Modal;
  params: Params;
  type: string;
  [property: string]: any;
};
type Modal = {
  cancel: string;
  confirm: string;
  content: string;
  title: string;
  [property: string]: any;
};
type Params = {
  dyn_id_str: string;
  dyn_type: number;
  dynamic_id?: string;
  rid_str: string;
  status?: number;
  type?: number;
  [property: string]: any;
};
type ModuleStat$2 = {
  comment: Comment$5;
  forward: Forward$2;
  like: Like$3;
  [property: string]: any;
};
type Comment$5 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Forward$2 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Like$3 = {
  count: number;
  forbidden: boolean;
  status: boolean;
  [property: string]: any;
};
type Orig = {
  basic: OrigBasic;
  id_str: string;
  modules: OrigModules;
  type: string;
  visible: boolean;
  [property: string]: any;
};
type OrigBasic = {
  comment_id_str: string;
  comment_type: number;
  jump_url: string;
  like_icon: FluffyLikeIcon;
  rid_str: string;
  [property: string]: any;
};
type FluffyLikeIcon = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type OrigModules = {
  module_author: FluffyModuleAuthor;
  module_dynamic: FluffyModuleDynamic;
  [property: string]: any;
};
type FluffyModuleAuthor = {
  avatar: FluffyAvatar;
  decoration_card: DecorationCard$2;
  face: string;
  face_nft: boolean;
  following: null;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: FluffyOfficialVerify;
  pendant: FluffyPendant;
  pub_action: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: FluffyVip;
  [property: string]: any;
};
type FluffyAvatar = {
  container_size: FluffyContainerSize;
  fallback_layers: FluffyFallbackLayers;
  mid: string;
  [property: string]: any;
};
type FluffyContainerSize = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyFallbackLayers = {
  is_critical_group: boolean;
  layers: FluffyLayer[];
  [property: string]: any;
};
type FluffyLayer = {
  general_spec: FluffyGeneralSpec;
  layer_config: FluffyLayerConfig;
  resource: FluffyResource;
  visible: boolean;
  [property: string]: any;
};
type FluffyGeneralSpec = {
  pos_spec: FluffyPosSpec;
  render_spec: FluffyRenderSpec;
  size_spec: FluffySizeSpec;
  [property: string]: any;
};
type FluffyPosSpec = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type FluffyRenderSpec = {
  opacity: number;
  [property: string]: any;
};
type FluffySizeSpec = {
  height: number;
  width: number;
  [property: string]: any;
};
type FluffyLayerConfig = {
  is_critical?: boolean;
  tags: FluffyTags;
  [property: string]: any;
};
type FluffyTags = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: FluffyGENERALCFG;
  ICON_LAYER: {
    [key: string]: any;
  };
  PENDENT_LAYER?: {
    [key: string]: any;
  };
  [property: string]: any;
};
type FluffyGENERALCFG = {
  config_type: number;
  general_config: FluffyGeneralConfig;
  [property: string]: any;
};
type FluffyGeneralConfig = {
  web_css_style: FluffyWebcssStyle;
  [property: string]: any;
};
type FluffyWebcssStyle = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type FluffyResource = {
  res_image: FluffyResImage;
  res_type: number;
  [property: string]: any;
};
type FluffyResImage = {
  image_src: FluffyImageSrc;
  [property: string]: any;
};
type FluffyImageSrc = {
  local: number;
  placeholder?: number;
  remote?: FluffyRemote;
  src_type: number;
  [property: string]: any;
};
type FluffyRemote = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type DecorationCard$2 = {
  big_card_url: string;
  card_type: number;
  card_type_name: string;
  card_url: string;
  fan: Fan$2;
  id: number;
  image_enhance: string;
  item_id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type Fan$2 = {
  color: string;
  color_format: ColorFormat$2;
  is_fan: number;
  name: string;
  num_desc: string;
  number: number;
  [property: string]: any;
};
type ColorFormat$2 = {
  colors: string[];
  end_point: string;
  gradients: number[];
  start_point: string;
  [property: string]: any;
};
type FluffyOfficialVerify = {
  desc: string;
  type: number;
  [property: string]: any;
};
type FluffyPendant = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type FluffyVip = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: FluffyLabel;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type FluffyLabel = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type FluffyModuleDynamic = {
  additional: null;
  desc: null;
  major: Major$2;
  topic: null;
  [property: string]: any;
};
type Major$2 = {
  opus: Opus$1;
  type: string;
  [property: string]: any;
};
type Opus$1 = {
  fold_action: string[];
  jump_url: string;
  pics: Pic[];
  summary: Summary$2;
  title: null;
  [property: string]: any;
};
type Pic = {
  height?: number;
  live_url?: null;
  size?: number;
  url?: string;
  width?: number;
  [property: string]: any;
};
type Summary$2 = {
  rich_text_nodes: SummaryRichTextNode[];
  text: string;
  [property: string]: any;
};
type SummaryRichTextNode = {
  jump_url?: string;
  orig_text: string;
  text: string;
  type: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/DYNAMIC_TYPE_FORWARD.d.ts
type OriginalDynamicItemMap = {
  [DynamicType.AV]: DynamicTypeAV$1['data']['item'];
  [DynamicType.DRAW]: DynamicTypeDraw$1['data']['item'];
  [DynamicType.WORD]: DynamicTypeWord$1['data']['item'];
  [DynamicType.LIVE_RCMD]: DynamicTypeLiveRcmd$1['data']['item'];
};
type ItemBasic = OriginalDynamicItemMap[DynamicType.DRAW]['basic'];
type ItemModules = OriginalDynamicItemMap[DynamicType.DRAW]['modules'];
type DataData$8<T extends keyof OriginalDynamicItemMap> = {
  item: {
    basic: ItemBasic;
    id_str: string;
    modules: ItemModules;
    orig: OriginalDynamicItemMap[T]['orig'];
    type: DynamicType.FORWARD;
    visible: boolean;
    [property: string]: any;
  };
  [property: string]: any;
};
type DynamicTypeForward<T extends keyof OriginalDynamicItemMap> = {
  code: number;
  data: DataData$8<T>;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DynamicTypeForwardUnion = DynamicTypeForward<DynamicType.AV> | DynamicTypeForward<DynamicType.DRAW> | DynamicTypeForward<DynamicType.WORD> | DynamicTypeForward<DynamicType.LIVE_RCMD>; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/DYNAMIC_TYPE_LIVE_RCMD.d.ts
type DynamicTypeLiveRcmd = {
  code: number;
  data: DataData$7;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$7 = {
  item: Item$7;
  [property: string]: any;
};
type Item$7 = {
  basic: Basic$1;
  id_str: string;
  modules: Modules$1;
  type: DynamicType.LIVE_RCMD;
  visible: boolean;
  [property: string]: any;
};
type Basic$1 = {
  comment_id_str: string;
  comment_type: number;
  like_icon: LikeIcon$1;
  rid_str: string;
  [property: string]: any;
};
type LikeIcon$1 = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type Modules$1 = {
  module_author: ModuleAuthor$1;
  module_dynamic: ModuleDynamic$1;
  module_more: ModuleMore$1;
  module_stat: ModuleStat$1;
  [property: string]: any;
};
type ModuleAuthor$1 = {
  avatar: Avatar$2;
  decoration_card: DecorationCard$1;
  face: string;
  face_nft: boolean;
  following: boolean;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: OfficialVerify$1;
  pendant: Pendant$1;
  pub_action: string;
  pub_location_text: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: Vip$1;
  [property: string]: any;
};
type Avatar$2 = {
  container_size: ContainerSize$1;
  fallback_layers: FallbackLayers$1;
  mid: string;
  [property: string]: any;
};
type ContainerSize$1 = {
  height: number;
  width: number;
  [property: string]: any;
};
type FallbackLayers$1 = {
  is_critical_group: boolean;
  layers: Layer$1[];
  [property: string]: any;
};
type Layer$1 = {
  general_spec: GeneralSpec$1;
  layer_config: LayerConfig$1;
  resource: Resource$1;
  visible: boolean;
  [property: string]: any;
};
type GeneralSpec$1 = {
  pos_spec: PosSpec$1;
  render_spec: RenderSpec$1;
  size_spec: SizeSpec$1;
  [property: string]: any;
};
type PosSpec$1 = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type RenderSpec$1 = {
  opacity: number;
  [property: string]: any;
};
type SizeSpec$1 = {
  height: number;
  width: number;
  [property: string]: any;
};
type LayerConfig$1 = {
  is_critical?: boolean;
  tags: Tags$1;
  [property: string]: any;
};
type Tags$1 = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: GeneralCFG$1;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type GeneralCFG$1 = {
  config_type: number;
  general_config: GeneralConfig$1;
  [property: string]: any;
};
type GeneralConfig$1 = {
  web_css_style: WebcssStyle$1;
  [property: string]: any;
};
type WebcssStyle$1 = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type Resource$1 = {
  res_image: ResImage$1;
  res_type: number;
  [property: string]: any;
};
type ResImage$1 = {
  image_src: ImageSrc$1;
  [property: string]: any;
};
type ImageSrc$1 = {
  local: number;
  placeholder?: number;
  remote?: Remote$1;
  src_type: number;
  [property: string]: any;
};
type Remote$1 = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type DecorationCard$1 = {
  big_card_url: string;
  card_type: number;
  card_type_name: string;
  card_url: string;
  fan: Fan$1;
  id: number;
  image_enhance: string;
  item_id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type Fan$1 = {
  color: string;
  color_format: ColorFormat$1;
  is_fan: number;
  name: string;
  num_desc: string;
  number: number;
  [property: string]: any;
};
type ColorFormat$1 = {
  colors: string[];
  end_point: string;
  gradients: number[];
  start_point: string;
  [property: string]: any;
};
type OfficialVerify$1 = {
  desc: string;
  type: number;
  [property: string]: any;
};
type Pendant$1 = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type Vip$1 = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: Label$1;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type Label$1 = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type ModuleDynamic$1 = {
  additional: null;
  desc: null;
  major: Major$1;
  topic: null;
  [property: string]: any;
};
type Major$1 = {
  live_rcmd: LiveRcmd;
  type: string;
  [property: string]: any;
};
type LiveRcmd = {
  content: string;
  reserve_type: number;
  [property: string]: any;
};
type ModuleMore$1 = {
  three_point_items: ThreePointItem$1[];
  [property: string]: any;
};
type ThreePointItem$1 = {
  label?: string;
  type?: string;
  [property: string]: any;
};
type ModuleStat$1 = {
  comment: Comment$4;
  forward: Forward$1;
  like: Like$2;
  [property: string]: any;
};
type Comment$4 = {
  count: number;
  forbidden: boolean;
  hidden: boolean;
  [property: string]: any;
};
type Forward$1 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Like$2 = {
  count: number;
  forbidden: boolean;
  status: boolean;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/DYNAMIC_TYPE_WORD.d.ts
type DynamicTypeWord = {
  code: number;
  data: DataData$6;
  message: string;
  ttl: number;
  [property: string]: any;
};
type DataData$6 = {
  item: Item$6;
  [property: string]: any;
};
type Item$6 = {
  basic: Basic;
  id_str: string;
  modules: Modules;
  type: DynamicType.WORD;
  visible: boolean;
  [property: string]: any;
};
type Basic = {
  comment_id_str: string;
  comment_type: number;
  jump_url: string;
  like_icon: LikeIcon;
  rid_str: string;
  [property: string]: any;
};
type LikeIcon = {
  action_url: string;
  end_url: string;
  id: number;
  start_url: string;
  [property: string]: any;
};
type Modules = {
  module_author: ModuleAuthor;
  module_dynamic: ModuleDynamic;
  module_more: ModuleMore;
  module_stat: ModuleStat;
  [property: string]: any;
};
type ModuleAuthor = {
  avatar: Avatar$1;
  decoration_card: DecorationCard;
  face: string;
  face_nft: boolean;
  following: boolean;
  jump_url: string;
  label: string;
  mid: number;
  name: string;
  official_verify: OfficialVerify;
  pendant: Pendant;
  pub_action: string;
  pub_location_text: string;
  pub_time: string;
  pub_ts: number;
  type: string;
  vip: Vip;
  [property: string]: any;
};
type Avatar$1 = {
  container_size: ContainerSize;
  fallback_layers: FallbackLayers;
  mid: string;
  [property: string]: any;
};
type ContainerSize = {
  height: number;
  width: number;
  [property: string]: any;
};
type FallbackLayers = {
  is_critical_group: boolean;
  layers: Layer[];
  [property: string]: any;
};
type Layer = {
  general_spec: GeneralSpec;
  layer_config: LayerConfig;
  resource: Resource;
  visible: boolean;
  [property: string]: any;
};
type GeneralSpec = {
  pos_spec: PosSpec;
  render_spec: RenderSpec;
  size_spec: SizeSpec;
  [property: string]: any;
};
type PosSpec = {
  axis_x: number;
  axis_y: number;
  coordinate_pos: number;
  [property: string]: any;
};
type RenderSpec = {
  opacity: number;
  [property: string]: any;
};
type SizeSpec = {
  height: number;
  width: number;
  [property: string]: any;
};
type LayerConfig = {
  is_critical?: boolean;
  tags: Tags;
  [property: string]: any;
};
type Tags = {
  AVATAR_LAYER?: {
    [key: string]: any;
  };
  GENERAL_CFG: GeneralCFG;
  ICON_LAYER: {
    [key: string]: any;
  };
  [property: string]: any;
};
type GeneralCFG = {
  config_type: number;
  general_config: GeneralConfig;
  [property: string]: any;
};
type GeneralConfig = {
  web_css_style: WebcssStyle;
  [property: string]: any;
};
type WebcssStyle = {
  'background-color': string;
  border: string;
  borderRadius: string;
  boxSizing: string;
  [property: string]: any;
};
type Resource = {
  res_image: ResImage;
  res_type: number;
  [property: string]: any;
};
type ResImage = {
  image_src: ImageSrc;
  [property: string]: any;
};
type ImageSrc = {
  local: number;
  placeholder?: number;
  remote?: Remote;
  src_type: number;
  [property: string]: any;
};
type Remote = {
  bfs_style: string;
  url: string;
  [property: string]: any;
};
type DecorationCard = {
  big_card_url: string;
  card_type: number;
  card_type_name: string;
  card_url: string;
  fan: Fan;
  id: number;
  image_enhance: string;
  item_id: number;
  jump_url: string;
  name: string;
  [property: string]: any;
};
type Fan = {
  color: string;
  color_format: ColorFormat;
  is_fan: number;
  name: string;
  num_desc: string;
  number: number;
  [property: string]: any;
};
type ColorFormat = {
  colors: string[];
  end_point: string;
  gradients: number[];
  start_point: string;
  [property: string]: any;
};
type OfficialVerify = {
  desc: string;
  type: number;
  [property: string]: any;
};
type Pendant = {
  expire: number;
  image: string;
  image_enhance: string;
  image_enhance_frame: string;
  n_pid: number;
  name: string;
  pid: number;
  [property: string]: any;
};
type Vip = {
  avatar_subscript: number;
  avatar_subscript_url: string;
  due_date: number;
  label: Label;
  nickname_color: string;
  status: number;
  theme_type: number;
  type: number;
  [property: string]: any;
};
type Label = {
  bg_color: string;
  bg_style: number;
  border_color: string;
  img_label_uri_hans: string;
  img_label_uri_hans_static: string;
  img_label_uri_hant: string;
  img_label_uri_hant_static: string;
  label_theme: string;
  path: string;
  text: string;
  text_color: string;
  use_img_label: boolean;
  [property: string]: any;
};
type ModuleDynamic = {
  additional: Additional;
  desc: null;
  major: Major;
  topic: null;
  [property: string]: any;
};
type Additional = {
  type: string;
  vote: Vote;
  [property: string]: any;
};
type Vote = {
  button: Button;
  choice_cnt: number;
  default_share: number;
  desc: string;
  end_time: number;
  join_num: number;
  status: number;
  title: string;
  type: null;
  uid: number;
  vote_id: number;
  [property: string]: any;
};
type Button = {
  jump_style: JumpStyle;
  type: number;
  [property: string]: any;
};
type JumpStyle = {
  text: string;
  [property: string]: any;
};
type Major = {
  opus: Opus;
  type: string;
  [property: string]: any;
};
type Opus = {
  fold_action: string[];
  jump_url: string;
  pics: string[];
  summary: Summary$1;
  title: null;
  [property: string]: any;
};
type Summary$1 = {
  rich_text_nodes: RichTextNode[];
  text: string;
  [property: string]: any;
};
type RichTextNode = {
  emoji?: Emoji;
  orig_text: string;
  rid?: string;
  text: string;
  type: string;
  [property: string]: any;
};
type Emoji = {
  icon_url: string;
  size: number;
  text: string;
  type: number;
  [property: string]: any;
};
type ModuleMore = {
  three_point_items: ThreePointItem[];
  [property: string]: any;
};
type ThreePointItem = {
  label?: string;
  type?: string;
  [property: string]: any;
};
type ModuleStat = {
  comment: Comment$3;
  forward: Forward;
  like: Like$1;
  [property: string]: any;
};
type Comment$3 = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Forward = {
  count: number;
  forbidden: boolean;
  [property: string]: any;
};
type Like$1 = {
  count: number;
  forbidden: boolean;
  status: boolean;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Bilibili/Dynamic/index.d.ts
/**
 * 转发动态种子动态主体类型枚举
 */
declare enum MajorType {
  /** 动态失效 */
  NONE = "MAJOR_TYPE_NONE",
  /** 图文动态 */
  OPUS = "MAJOR_TYPE_OPUS",
  /** 视频 */
  ARCHIVE = "MAJOR_TYPE_ARCHIVE",
  /** 剧集更新 */
  PGC = "MAJOR_TYPE_PGC",
  /** 课程 */
  COURSES = "MAJOR_TYPE_COURSES",
  /** 带图动态 */
  DRAW = "MAJOR_TYPE_DRAW",
  /** 文章 */
  ARTICLE = "MAJOR_TYPE_ARTICLE",
  /** 音频更新 */
  MUSIC = "MAJOR_TYPE_MUSIC",
  /** 一般类型 */
  COMMON = "MAJOR_TYPE_COMMON",
  /** 直播间分享 */
  LIVE = "MAJOR_TYPE_LIVE",
  /** 媒体列表 */
  MEDIALIST = "MAJOR_TYPE_MEDIALIST",
  /** 小程序 */
  APPLET = "MAJOR_TYPE_APPLET",
  /** 订阅 */
  SUBSCRIPTION = "MAJOR_TYPE_SUBSCRIPTION",
  /** 直播状态 */
  LIVE_RCMD = "MAJOR_TYPE_LIVE_RCMD",
  /** 合集更新 */
  UGC_SEASON = "MAJOR_TYPE_UGC_SEASON",
  /** 新订阅 */
  SUBSCRIPTION_NEW = "MAJOR_TYPE_SUBSCRIPTION_NEW",
  /** 充电相关 */
  UPOWER_COMMON = "MAJOR_TYPE_UPOWER_COMMON"
}
/**
 * 相关内容卡片类型枚举
 * 用于标识动态中附加的相关内容卡片的类型
 */
declare enum AdditionalType {
  /** 无相关内容 */
  NONE = "ADDITIONAL_TYPE_NONE",
  /** 剧集相关 */
  PGC = "ADDITIONAL_TYPE_PGC",
  /** 商品信息 */
  GOODS = "ADDITIONAL_TYPE_GOODS",
  /** 投票 */
  VOTE = "ADDITIONAL_TYPE_VOTE",
  /** 一般类型 */
  COMMON = "ADDITIONAL_TYPE_COMMON",
  /** 比赛信息 */
  MATCH = "ADDITIONAL_TYPE_MATCH",
  /** UP主推荐 */
  UP_RCMD = "ADDITIONAL_TYPE_UP_RCMD",
  /** 视频跳转 */
  UGC = "ADDITIONAL_TYPE_UGC",
  /** 直播预约 */
  RESERVE = "ADDITIONAL_TYPE_RESERVE",
  /** 充电专属抽奖 */
  UPOWER_LOTTERY = "ADDITIONAL_TYPE_UPOWER_LOTTERY"
} //#endregion
//#region src/types/ReturnDataType/Bilibili/index.d.ts
/**
 * B站返回类型映射
 *
 * 将 methodType 映射到对应的返回数据类型
 */
interface BilibiliReturnTypeMap {
  videoInfo: BiliOneWork;
  videoStream: BiliVideoPlayurlIsLogin | BiliBiliVideoPlayurlNoLogin;
  comments: BiliWorkComments;
  commentReplies: BiliCommentReply;
  userCard: BiliUserProfile;
  userDynamicList: BiliUserDynamic;
  userSpaceInfo: UserSpaceInfo;
  emojiList: BiliEmojiList;
  bangumiInfo: BiliBangumiVideoInfo;
  bangumiStream: BiliBangumiVideoPlayurlIsLogin | BiliBangumiVideoPlayurlNoLogin;
  dynamicDetail: BiliDynamicInfoUnion;
  dynamicCard: BiliDynamicCard;
  liveRoomInfo: BiliLiveRoomDetail;
  liveRoomInit: BiliLiveRoomDef;
  loginStatus: any;
  loginQrcode: BiliNewLoginQrcode;
  qrcodeStatus: BiliCheckQrcode;
  uploaderTotalViews: BiliUserFullView;
  avToBv: BiliAv2Bv;
  bvToAv: BiliBv2AV;
  articleContent: ArticleContent;
  articleCards: ArticleCard;
  articleInfo: ArticleInfo;
  articleListInfo: ColumnInfo;
  captchaFromVoucher: ApplyCaptcha;
  validateCaptcha: ValidateCaptcha;
  videoDanmaku: BiliProtobufDanmaku;
} //#endregion
//#region src/types/ReturnDataType/Douyin/ArticleWork.d.ts
type ArticleWork = {
  aweme_detail: AwemeDetail$3;
  log_pb: LogPb$14;
  status_code: number;
  [property: string]: any;
};
type AwemeDetail$3 = {
  activity_video_type: number;
  anchors: null;
  authentication_token: string;
  author: Author$8;
  author_mask_tag: number;
  author_user_id: number;
  aweme_acl: Awemeacl$2;
  aweme_control: AwemeControl$6;
  aweme_id: string;
  aweme_listen_struct: AwemeListenStruct$6;
  aweme_type: number;
  aweme_type_tags: string;
  boost_status: number;
  can_cache_to_local: boolean;
  caption: string;
  caption_template_id: number;
  category_da: number;
  cf_assets_type: number;
  cf_recheck_ts: number;
  challenge_position: null;
  chapter_list: null;
  collect_stat: number;
  collection_corner_mark: number;
  comment_gid: number;
  comment_list: null;
  comment_permission_info: CommentPermissionInfo$6;
  commerce_config_data: null;
  component_control: ComponentControl$6;
  component_info_v2: string;
  cover_labels: null;
  create_time: number;
  desc: string;
  disable_relation_bar: number;
  dislike_dimension_list: null;
  dislike_dimension_list_v2: null;
  distribute_circle: DistributeCircle$6;
  douplus_user_type: number;
  duet_aggregate_in_music_tab: boolean;
  duration: number;
  ecom_comment_atmosphere_type: number;
  enable_comment_sticker_rec: boolean;
  entertainment_product_info: EntertainmentProductInfo$8;
  entertainment_video_paid_way: EntertainmentVideoPaidWay$2;
  entertainment_video_type: number;
  fall_card_struct: FallCardStruct$4;
  feed_comment_config: FeedCommentConfig$6;
  flash_mob_trends: number;
  follow_shoot_clip_info: FollowShootClipInfo$2;
  friend_recommend_info: FriendRecommendInfo$2;
  game_tag_info: GameTagInfo$6;
  geofencing: string[];
  geofencing_regions: null;
  group_id: string;
  guide_scene_info: {
    [key: string]: any;
  };
  hybrid_label: null;
  image_album_music_info: ImageAlbumMusicInfo$6;
  image_comment: {
    [key: string]: any;
  };
  image_crop_ctrl: number;
  image_infos: null;
  image_item_quality_level: number;
  image_list: null;
  images: Image$4[];
  img_bitrate: string[];
  impression_data: ImpressionData$8;
  incentive_item_type: number;
  interaction_stickers: null;
  is_24_story: number;
  is_25_story: number;
  is_ads: boolean;
  is_collects_selected: number;
  is_duet_sing: boolean;
  is_from_ad_auth: boolean;
  is_image_beat: boolean;
  is_life_item: boolean;
  is_moment_history: number;
  is_moment_story: number;
  is_multi_content: number;
  is_new_text_mode: number;
  is_share_post: boolean;
  is_story: number;
  is_top: number;
  is_use_music: boolean;
  item_title: string;
  item_warn_notification: ItemWarnNotification$6;
  label_top_text: null;
  libfinsert_task_id: string;
  long_video: null;
  mark_largely_following: boolean;
  media_type: number;
  music: Music$8;
  nickname_position: null;
  origin_comment_ids: null;
  origin_duet_resource_uri: string;
  origin_text_extra: string[];
  original: number;
  original_images: null;
  packed_clips: null;
  personal_page_botton_diagnose_style: number;
  photo_search_entrance: PhotoSearchEntrance$6;
  play_progress: PlayProgress$6;
  position: null;
  preview_title: string;
  preview_video_status: number;
  promotions: string[];
  publish_plus_alienation: PublishPlusAlienation$6;
  rate: number;
  region: string;
  relation_labels: null;
  risk_infos: RiskInfos$6;
  select_anchor_expanded_content: number;
  seo_info: {
    [key: string]: any;
  };
  series_basic_info: {
    [key: string]: any;
  };
  series_paid_info: SeriesPaidInfo$6;
  share_info: AwemeDetailShareInfo$3;
  share_rec_extra: string;
  share_url: string;
  shoot_way: string;
  should_open_ad_report: boolean;
  show_follow_button: {
    [key: string]: any;
  };
  social_tag_list: null;
  statistics: Statistics$8;
  status: Status$5;
  suggest_words: SuggestWords$7;
  text_extra: TextExtra$7[];
  trends_event_track: string;
  uniqid_position: null;
  user_digged: number;
  user_recommend_status: number;
  video: Video$6;
  video_control: VideoControl$8;
  video_game_data_channel_config: {
    [key: string]: any;
  };
  video_labels: null;
  video_share_edit_status: number;
  video_tag: VideoTag$6[];
  video_text: string[];
  visual_search_info: VisualSearchInfo$6;
  xigua_base_info: XiguaBaseInfo$6;
  [property: string]: any;
};
type Author$8 = {
  avatar_thumb: AuthorAvatarThumb$6;
  awemehts_greet_info: string;
  cf_list: null;
  close_friend_type: number;
  contacts_status: number;
  contrail_list: null;
  cover_url: Coverurl$6[];
  create_time: number;
  custom_verify: string;
  data_label_list: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  favoriting_count: number;
  follow_status: number;
  follower_count: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  following_count: number;
  im_role_ids: null;
  is_ad_fake: boolean;
  is_blocked_v2: boolean;
  is_blocking_v2: boolean;
  is_cf: number;
  live_high_value: number;
  mate_add_permission: number;
  max_follower_count: number;
  nickname: string;
  offline_info_list: null;
  personal_tag_list: null;
  prevent_download: boolean;
  risk_notice_text: string;
  sec_uid: string;
  secret: number;
  share_info: AuthorShareInfo$7;
  short_id: string;
  signature: string;
  signature_extra: null;
  special_follow_status: number;
  special_people_labels: null;
  status: number;
  story_interactive: number;
  story_ring: StoryRing;
  story_ttl: number;
  text_extra: null;
  total_favorited: number;
  uid: string;
  unique_id: string;
  user_age: number;
  user_canceled: boolean;
  user_permissions: null;
  verification_type: number;
  [property: string]: any;
};
type AuthorAvatarThumb$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverurl$6 = {
  height?: number;
  uri?: string;
  url_list?: string[];
  width?: number;
  [property: string]: any;
};
type AuthorShareInfo$7 = {
  share_desc: string;
  share_desc_info: string;
  share_qrcode_url: ShareQrcodeurl$8;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ShareQrcodeurl$8 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type StoryRing = {
  story_rings: string[];
  version: number;
  [property: string]: any;
};
type Awemeacl$2 = {
  download_mask_panel: DownloadMaskPanel$2;
  [property: string]: any;
};
type DownloadMaskPanel$2 = {
  code: number;
  show_type: number;
  [property: string]: any;
};
type AwemeControl$6 = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type AwemeListenStruct$6 = {
  trace_info: string;
  [property: string]: any;
};
type CommentPermissionInfo$6 = {
  can_comment: boolean;
  comment_permission_status: number;
  item_detail_entry: boolean;
  press_entry: boolean;
  toast_guide: boolean;
  [property: string]: any;
};
type ComponentControl$6 = {
  data_source_url: string;
  [property: string]: any;
};
type DistributeCircle$6 = {
  campus_block_interaction: boolean;
  distribute_type: number;
  is_campus: boolean;
  [property: string]: any;
};
type EntertainmentProductInfo$8 = {
  market_info: MarketInfo$8;
  [property: string]: any;
};
type MarketInfo$8 = {
  limit_free: LimitFree$8;
  [property: string]: any;
};
type LimitFree$8 = {
  in_free: boolean;
  [property: string]: any;
};
type EntertainmentVideoPaidWay$2 = {
  enable_use_new_ent_data: boolean;
  paid_type: number;
  paid_ways: string[];
  [property: string]: any;
};
type FallCardStruct$4 = {
  recommend_reason_v2: string;
  [property: string]: any;
};
type FeedCommentConfig$6 = {
  author_audit_status: number;
  common_flags: string;
  input_config_text: string;
  [property: string]: any;
};
type FollowShootClipInfo$2 = {
  clip_from_platform: number;
  clip_video_all: number;
  origin_clip_id: number;
  [property: string]: any;
};
type FriendRecommendInfo$2 = {
  disable_friend_recommend_guide_label: boolean;
  friend_recommend_source: number;
  [property: string]: any;
};
type GameTagInfo$6 = {
  is_game: boolean;
  [property: string]: any;
};
type ImageAlbumMusicInfo$6 = {
  begin_time: number;
  end_time: number;
  volume: number;
  [property: string]: any;
};
type Image$4 = {
  download_url_list?: string[];
  height?: number;
  is_new_text_mode?: number;
  uri?: string;
  url_list?: string[];
  width?: number;
  [property: string]: any;
};
type ImpressionData$8 = {
  group_id_list_a: string[];
  group_id_list_b: string[];
  group_id_list_c: string[];
  group_id_list_d: string[];
  similar_id_list_a: null;
  similar_id_list_b: null;
  [property: string]: any;
};
type ItemWarnNotification$6 = {
  content: string;
  show: boolean;
  type: number;
  [property: string]: any;
};
type Music$8 = {
  album: string;
  artist_user_infos: null;
  artists: string[];
  audition_duration: number;
  author: string;
  author_deleted: boolean;
  author_position: null;
  author_status: number;
  avatar_large: AvatarLarge$7;
  avatar_medium: AvatarMedium$6;
  avatar_thumb: MusicAvatarThumb$7;
  binded_challenge_id: number;
  can_background_play: boolean;
  collect_stat: number;
  cover_hd: Coverhd$8;
  cover_large: CoverLarge$8;
  cover_medium: MusicCoverMedium$5;
  cover_thumb: CoverThumb$9;
  dmv_auto_show: boolean;
  dsp_status: number;
  duration: number;
  end_time: number;
  external_song_info: string[];
  extra: string;
  id: number;
  id_str: string;
  is_audio_url_with_cookie: boolean;
  is_commerce_music: boolean;
  is_del_video: boolean;
  is_matched_metadata: boolean;
  is_original: boolean;
  is_original_sound: boolean;
  is_pgc: boolean;
  is_restricted: boolean;
  is_video_self_see: boolean;
  lyric_short_position: null;
  matched_pgc_sound: MatchedPgcSound$6;
  mid: string;
  music_chart_ranks: null;
  music_collect_count: number;
  music_cover_atmosphere_color_value: string;
  music_status: number;
  musician_user_infos: null;
  mute_share: boolean;
  offline_desc: string;
  owner_handle: string;
  owner_id: string;
  owner_nickname: string;
  pgc_music_type: number;
  play_url: Playurl$9;
  position: null;
  prevent_download: boolean;
  prevent_item_download_status: number;
  preview_end_time: number;
  preview_start_time: number;
  reason_type: number;
  redirect: boolean;
  schema_url: string;
  search_impr: SearchImpr$7;
  sec_uid: string;
  shoot_duration: number;
  show_origin_clip: boolean;
  song: Song$7;
  source_platform: number;
  start_time: number;
  status: number;
  tag_list: null;
  title: string;
  unshelve_countries: null;
  user_count: number;
  video_duration: number;
  [property: string]: any;
};
type AvatarLarge$7 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarMedium$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicAvatarThumb$7 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverhd$8 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverLarge$8 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicCoverMedium$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb$9 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MatchedPgcSound$6 = {
  author: string;
  cover_medium: MatchedPgcSoundCoverMedium$6;
  mixed_author: string;
  mixed_title: string;
  title: string;
  [property: string]: any;
};
type MatchedPgcSoundCoverMedium$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl$9 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type SearchImpr$7 = {
  entity_id: string;
  [property: string]: any;
};
type Song$7 = {
  artists: null;
  id: number;
  id_str: string;
  [property: string]: any;
};
type PhotoSearchEntrance$6 = {
  ecom_type: number;
  [property: string]: any;
};
type PlayProgress$6 = {
  last_modified_time: number;
  play_progress: number;
  [property: string]: any;
};
type PublishPlusAlienation$6 = {
  alienation_type: number;
  [property: string]: any;
};
type RiskInfos$6 = {
  content: string;
  risk_sink: boolean;
  type: number;
  vote: boolean;
  warn: boolean;
  [property: string]: any;
};
type SeriesPaidInfo$6 = {
  item_price: number;
  series_paid_status: number;
  [property: string]: any;
};
type AwemeDetailShareInfo$3 = {
  share_desc: string;
  share_desc_info: string;
  share_link_desc: string;
  share_url: string;
  [property: string]: any;
};
type Statistics$8 = {
  admire_count: number;
  aweme_id: string;
  collect_count: number;
  comment_count: number;
  digg_count: number;
  play_count: number;
  recommend_count: number;
  share_count: number;
  [property: string]: any;
};
type Status$5 = {
  allow_friend_recommend: boolean;
  allow_friend_recommend_guide: boolean;
  allow_self_recommend_to_friend: boolean;
  allow_share: boolean;
  aweme_id: string;
  enable_soft_delete: number;
  in_reviewing: boolean;
  is_delete: boolean;
  is_prohibited: boolean;
  listen_video_status: number;
  not_allow_soft_del_reason: string;
  part_see: number;
  private_status: number;
  review_result: ReviewResult$8;
  [property: string]: any;
};
type ReviewResult$8 = {
  review_status: number;
  [property: string]: any;
};
type SuggestWords$7 = {
  suggest_words: SuggestWord$7[];
  [property: string]: any;
};
type SuggestWord$7 = {
  extra_info?: string;
  hint_text?: string;
  icon_url?: string;
  scene?: string;
  words?: Word$8[];
  [property: string]: any;
};
type Word$8 = {
  info: string;
  word: string;
  word_id: string;
  [property: string]: any;
};
type TextExtra$7 = {
  caption_end: number;
  caption_start: number;
  end: number;
  hashtag_id?: string;
  hashtag_name?: string;
  is_commerce?: boolean;
  start: number;
  type: number;
  [property: string]: any;
};
type Video$6 = {
  audio: {
    [key: string]: any;
  };
  big_thumbs: null;
  bit_rate_audio: null;
  cover: Cover$7;
  duration: number;
  has_watermark: boolean;
  height: number;
  is_h265: number;
  meta: string;
  origin_cover: OriginCover$5;
  play_addr: PlayAddr$1;
  ratio: string;
  width: number;
  [property: string]: any;
};
type Cover$7 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type OriginCover$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddr$1 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoControl$8 = {
  allow_douplus: boolean;
  allow_download: boolean;
  allow_duet: boolean;
  allow_dynamic_wallpaper: boolean;
  allow_music: boolean;
  allow_react: boolean;
  allow_record: boolean;
  allow_share: boolean;
  allow_stitch: boolean;
  disable_record_reason: string;
  download_ignore_visibility: boolean;
  download_info: DownloadInfo$8;
  draft_progress_bar: number;
  duet_ignore_visibility: boolean;
  duet_info: DuetInfo$8;
  prevent_download_type: number;
  share_grayed: boolean;
  share_ignore_visibility: boolean;
  share_type: number;
  show_progress_bar: number;
  timer_info: {
    [key: string]: any;
  };
  timer_status: number;
  [property: string]: any;
};
type DownloadInfo$8 = {
  fail_info: DownloadInfoFailInfo$5;
  level: number;
  [property: string]: any;
};
type DownloadInfoFailInfo$5 = {
  code: number;
  msg: string;
  reason: string;
  [property: string]: any;
};
type DuetInfo$8 = {
  fail_info: DuetInfoFailInfo$5;
  level: number;
  [property: string]: any;
};
type DuetInfoFailInfo$5 = {
  code: number;
  reason: string;
  [property: string]: any;
};
type VideoTag$6 = {
  level: number;
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type VisualSearchInfo$6 = {
  is_ecom_img: boolean;
  is_high_accuracy_ecom: boolean;
  is_high_recall_ecom: boolean;
  is_show_img_entrance: boolean;
  [property: string]: any;
};
type XiguaBaseInfo$6 = {
  item_id: number;
  star_altar_order_id: number;
  star_altar_type: number;
  status: number;
  [property: string]: any;
};
type LogPb$14 = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/CommentReply.d.ts
type CommentReply = {
  comments: Comment$2[];
  cursor: number;
  extra: Extra$7;
  has_more: number;
  log_pb: LogPb$13;
  status_code: number;
  total: number;
  [property: string]: any;
};
type Comment$2 = {
  aweme_id: string;
  can_share: boolean;
  cid: string;
  comment_reply_total: number;
  content_type: number;
  create_time: number;
  digg_count: number;
  image_list: null;
  ip_label: string;
  is_author_digged: boolean;
  is_folded: boolean;
  is_hot: boolean;
  is_note_comment: number;
  label_list: null;
  label_text: string;
  label_type: number;
  level: number;
  reply_comment: null;
  reply_id: string;
  reply_to_reply_id: string;
  reply_to_user_sec_id: string;
  reply_to_userid: string;
  reply_to_username: string;
  root_comment_id: string;
  status: number;
  text: string;
  text_extra: TextExtra$6[];
  text_music_info: null;
  user: User$6;
  user_buried: boolean;
  user_digged: number;
  video_list: null;
  [property: string]: any;
};
type TextExtra$6 = {
  end?: number;
  hashtag_id?: string;
  hashtag_name?: string;
  sec_uid?: string;
  start?: number;
  type?: number;
  user_id?: string;
  [property: string]: any;
};
type User$6 = {
  ad_cover_url: null;
  avatar_schema_list: null;
  avatar_thumb: AvatarThumb$4;
  aweme_control: AwemeControl$5;
  ban_user_functions: any[] | null;
  batch_unfollow_contain_tabs: null;
  batch_unfollow_relation_desc: null;
  can_set_geofencing: null;
  card_entries: null;
  card_entries_not_display: null;
  card_sort_priority: null;
  cf_list: null;
  cha_list: null;
  close_friend_type: number;
  comment_setting: number;
  commerce_user_level: number;
  contrail_list: null;
  cover_url: null;
  creator_tag_list: null;
  custom_verify: string;
  data_label_list: null;
  disable_image_comment_saved: number;
  display_info: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  familiar_visitor_user: null;
  follow_status: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  geofencing: null;
  homepage_bottom_toast: null;
  identity_labels: null;
  im_role_ids: null;
  interest_tags: null;
  is_ad_fake: boolean;
  is_block: boolean;
  is_blocked_v2: boolean;
  is_blocking_v2: boolean;
  is_star: boolean;
  item_list: null;
  link_item_list: null;
  need_points: null;
  new_story_cover: null;
  nickname: string;
  not_seen_item_id_list: null;
  not_seen_item_id_list_v2: null;
  offline_info_list: null;
  personal_tag_list: null;
  platform_sync_info: null;
  private_relation_list: null;
  profile_component_disabled: null;
  profile_mob_params: null;
  region: string;
  relative_users: null;
  sec_uid: string;
  secret: number;
  short_id: string;
  signature_extra: null;
  special_people_labels: null;
  status: number;
  text_extra: null;
  type_label: null;
  uid: string;
  unique_id: string;
  user_canceled: boolean;
  user_permissions: null;
  user_tags: null;
  verification_permission_ids: null;
  white_cover_url: null;
  [property: string]: any;
};
type AvatarThumb$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AwemeControl$5 = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type Extra$7 = {
  fatal_item_ids: null;
  now: number;
  scenes: null;
  [property: string]: any;
};
type LogPb$13 = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/DyDanmakuList.d.ts
type DyDanmakuList = {
  danmaku_list: DanmakuList[];
  end_time: number;
  extra: DataExtra$1;
  log_pb: LogPb$12;
  start_time: number;
  status_code: number;
  total: number;
  [property: string]: any;
};
type DanmakuList = {
  danmaku_id: string;
  danmaku_logos: null;
  danmaku_type: number;
  danmaku_type_bits: number;
  digg_count: number;
  digg_type: number;
  dislike_type: number;
  extra: DanmakuListExtra;
  from_copy: boolean;
  has_emoji: boolean;
  is_ad: boolean;
  item_id: string;
  offset_time: number;
  score: number;
  show_copy: boolean;
  show_digg: boolean;
  status: number;
  text: string;
  user_id: string;
  [property: string]: any;
};
type DanmakuListExtra = {
  big_thumb: null;
  style_list: null;
  [property: string]: any;
};
type DataExtra$1 = {
  fatal_item_ids: string[];
  logid: string;
  now: number;
  [property: string]: any;
};
type LogPb$12 = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/EmojiList.d.ts
type DyEmojiList = {
  emoji_list: EmojiListElement[];
  status_code: number;
  version: number;
  [property: string]: any;
};
type EmojiListElement = {
  display_name: string;
  emoji_url: Emojiurl;
  hide: number;
  origin_uri: string;
  [property: string]: any;
};
type Emojiurl = {
  uri: string;
  url_list: string[];
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/EmojiProList.d.ts
type DyEmojiProList = {
  decision_trees: DecisionTrees;
  diverter_tags: DiverterTags;
  do_not_retry: boolean;
  extra: EmojiProListExtra;
  flame_achieve_dashboard: FlameAchieveDashboard;
  interactive_resource_config: InteractiveResourceConfig;
  log_pb: LogPb$11;
  report_toggles: ReportToggles;
  status_code: number;
  status_msg: string;
  [property: string]: any;
};
type DecisionTrees = {
  flame_achieve: FlameAchieve;
  interactive_resources: InteractiveResources;
  [property: string]: any;
};
type FlameAchieve = {
  default_config_name: string;
  root: FlameAchieveRoot;
  [property: string]: any;
};
type FlameAchieveRoot = {
  node_attribute: string;
  node_operation: string;
  node_type: string;
  node_value: string;
  sub_node: PurpleSubNode[];
  [property: string]: any;
};
type PurpleSubNode = {
  node_attribute: string;
  node_operation: string;
  node_type: string;
  node_value: string;
  sub_node?: FluffySubNode[];
  [property: string]: any;
};
type FluffySubNode = {
  config_name: string;
  node_attribute: string;
  node_operation: string;
  node_type: string;
  node_value: string;
  sub_node: TentacledSubNode[];
  [property: string]: any;
};
type TentacledSubNode = {
  config_name: string;
  node_attribute: string;
  node_operation: string;
  node_type: string;
  node_value: string;
  sub_node: StickySubNode[];
  [property: string]: any;
};
type StickySubNode = {
  config_name: string;
  node_attribute: string;
  node_operation: string;
  node_type: string;
  node_value: string;
  sub_node: IndigoSubNode[];
  [property: string]: any;
};
type IndigoSubNode = {
  config_name: string;
  node_attribute: string;
  node_operation: string;
  node_type: string;
  node_value: string;
  [property: string]: any;
};
type InteractiveResources = {
  default_config_name: string;
  root: InteractiveResourcesRoot;
  [property: string]: any;
};
type InteractiveResourcesRoot = {
  node_attribute: string;
  node_operation: string;
  node_type: string;
  node_value: string;
  sub_node: IndecentSubNode[];
  [property: string]: any;
};
type IndecentSubNode = {
  config_name: string;
  node_attribute: string;
  node_operation: string;
  node_type: string;
  node_value: string;
  [property: string]: any;
};
type DiverterTags = {
  actionbar_diff: string;
  flame_achieve: string;
  interactive_resources: string;
  interactive_resources_v2: string;
  plus_panel_diff: string;
  [property: string]: any;
};
type EmojiProListExtra = {
  fatal_item_ids: string[];
  logid: string;
  now: number;
  [property: string]: any;
};
type FlameAchieveDashboard = {
  '火花成就--小火人': 火花成就小火人;
  火花成就日常: 火花成就日常;
  '火花成就日常-群聊': 火花成就日常群聊;
  火花成就日常V2: 火花成就日常V2;
  '火花成就日常V2-群聊': 火花成就日常V2群聊;
  火花成就测试: 火花成就测试;
  '火花成就节日测试-群聊': 火花成就节日测试群聊;
  [property: string]: any;
};
type 火花成就小火人 = {
  detail: 火花成就小火人_Detail[];
  pet_elf_detail: PetelfDetail[];
  [property: string]: any;
};
type 火花成就小火人_Detail = {
  detail_subtitle_lock: string[];
  detail_subtitle_unflame: string[];
  flame_info: PurpleFlameInfo[];
  flame_to_achieve_url: string;
  keys: string[];
  subscript: string;
  subtitle: string;
  subtitle_lock: string;
  title: string;
  [property: string]: any;
};
type PurpleFlameInfo = {
  detail_subtitle: string[];
  flame_achieve_url: string;
  key: string;
  subscript_color: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type PetelfDetail = {
  detail_subtitle_unflame?: string[];
  flame_info?: PetelfDetailFlameInfo[];
  flame_to_achieve_url?: string;
  keys?: string[];
  subscript?: string;
  subtitle?: string;
  title?: string;
  [property: string]: any;
};
type PetelfDetailFlameInfo = {
  detail_subtitle?: string[];
  flame_achieve_url?: string;
  key?: string;
  subscript_color?: string;
  subtitle?: string;
  title?: string;
  [property: string]: any;
};
type 火花成就日常 = {
  detail: 火花成就日常_Detail[];
  [property: string]: any;
};
type 火花成就日常_Detail = {
  detail_subtitle_unflame: string[];
  flame_info: FluffyFlameInfo[];
  flame_to_achieve_url: string;
  keys: string[];
  subscript: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type FluffyFlameInfo = {
  detail_subtitle: string[];
  flame_achieve_url: string;
  key: string;
  subscript_color: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type 火花成就日常群聊 = {
  detail: 火花成就日常群聊_Detail[];
  [property: string]: any;
};
type 火花成就日常群聊_Detail = {
  detail_subtitle_unflame: string[];
  flame_info: TentacledFlameInfo[];
  flame_to_achieve_url: string;
  keys: string[];
  subscript: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type TentacledFlameInfo = {
  detail_subtitle: string[];
  flame_achieve_url: string;
  key: string;
  subscript_color: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type 火花成就日常V2 = {
  detail: 火花成就日常V2Detail[];
  [property: string]: any;
};
type 火花成就日常V2Detail = {
  detail_subtitle_lock: string[];
  detail_subtitle_unflame: string[];
  flame_info: StickyFlameInfo[];
  flame_to_achieve_url: string;
  keys: string[];
  subscript: string;
  subtitle: string;
  subtitle_lock: string;
  title: string;
  [property: string]: any;
};
type StickyFlameInfo = {
  detail_subtitle: string[];
  flame_achieve_url: string;
  key: string;
  subscript_color: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type 火花成就日常V2群聊 = {
  detail: 火花成就日常V2群聊_Detail[];
  [property: string]: any;
};
type 火花成就日常V2群聊_Detail = {
  detail_subtitle_lock: string[];
  detail_subtitle_unflame: string[];
  flame_info: IndigoFlameInfo[];
  flame_to_achieve_url: string;
  keys: string[];
  subscript: string;
  subtitle: string;
  subtitle_lock: string;
  title: string;
  [property: string]: any;
};
type IndigoFlameInfo = {
  detail_subtitle: string[];
  flame_achieve_url: string;
  key: string;
  subscript_color: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type 火花成就测试 = {
  detail: 火花成就测试_Detail[];
  [property: string]: any;
};
type 火花成就测试_Detail = {
  detail_subtitle_unflame: string[];
  flame_info: IndecentFlameInfo[];
  flame_to_achieve_url: string;
  keys: string[];
  subscript: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type IndecentFlameInfo = {
  detail_subtitle: string[];
  flame_achieve_url: string;
  key: string;
  subscript_color: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type 火花成就节日测试群聊 = {
  detail: 火花成就节日测试群聊_Detail[];
  [property: string]: any;
};
type 火花成就节日测试群聊_Detail = {
  detail_subtitle_unflame: string[];
  flame_info: HilariousFlameInfo[];
  flame_to_achieve_url: string;
  keys: string[];
  subscript: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type HilariousFlameInfo = {
  detail_subtitle: string[];
  flame_achieve_url: string;
  key: string;
  subscript_color: string;
  subtitle: string;
  title: string;
  [property: string]: any;
};
type InteractiveResourceConfig = {
  '100-2025春节互动表情\t': The1002025春节互动表情;
  '2025 春节-Android': The2025春节Android;
  '2025 春节-Android更新': The2025春节Android更新;
  '互动表情升级 一期': 互动表情升级一期;
  [property: string]: any;
};
type The1002025春节互动表情 = {
  animate_icon: {
    [key: string]: any;
  };
  icon_url: string;
  interactive_resources: The1002025春节互动表情_InteractiveResource[];
  special_resources: The1002025春节互动表情_SpecialResource[];
  [property: string]: any;
};
type The1002025春节互动表情_InteractiveResource = {
  animate_type: string;
  animate_url: string;
  display_name: string;
  extra: PurpleExtra$1;
  height: number;
  resource_type: number;
  static_type: string;
  static_url: string;
  static_url_list: PurpleStaticurlList[];
  sticker_info_source: string;
  version: number;
  visible_end_time: number;
  width: number;
  [property: string]: any;
};
type PurpleExtra$1 = {
  activity_scene?: string;
  hint_content?: string;
  light_interaction: string;
  sticker_info_source?: string;
  [property: string]: any;
};
type PurpleStaticurlList = {
  static_type: string;
  static_url: string;
  [property: string]: any;
};
type The1002025春节互动表情_SpecialResource = {
  config: PurpleConfig;
  in_advance: boolean;
  name: string;
  relation_name: string[];
  special_resource: string;
  special_type: number;
  trigger_type: string;
  version: number;
  [property: string]: any;
};
type PurpleConfig = {
  continuous_show?: string;
  random_show: string;
  receiver_show?: string;
  sender_show?: string;
  [property: string]: any;
};
type The2025春节Android = {
  animate_icon: {
    [key: string]: any;
  };
  icon_url: string;
  interactive_resources: The2025春节AndroidInteractiveResource[];
  special_resources: The2025春节AndroidSpecialResource[];
  [property: string]: any;
};
type The2025春节AndroidInteractiveResource = {
  animate_type: string;
  animate_url: string;
  display_name: string;
  extra: FluffyExtra$1;
  height: number;
  resource_type: number;
  static_type: string;
  static_url: string;
  static_url_list: FluffyStaticurlList[];
  sticker_info_source: string;
  version: number;
  visible_end_time: number;
  width: number;
  [property: string]: any;
};
type FluffyExtra$1 = {
  activity_scene?: string;
  hint_content?: string;
  light_interaction: string;
  sticker_info_source?: string;
  [property: string]: any;
};
type FluffyStaticurlList = {
  static_type: string;
  static_url: string;
  [property: string]: any;
};
type The2025春节AndroidSpecialResource = {
  config: FluffyConfig;
  in_advance: boolean;
  name: string;
  relation_name: string[];
  special_resource: string;
  special_type: number;
  trigger_type: string;
  version: number;
  [property: string]: any;
};
type FluffyConfig = {
  continuous_show?: string;
  random_show: string;
  receiver_show?: string;
  sender_show?: string;
  [property: string]: any;
};
type The2025春节Android更新 = {
  animate_icon: {
    [key: string]: any;
  };
  icon_url: string;
  interactive_resources: The2025春节Android更新_InteractiveResource[];
  special_resources: The2025春节Android更新_SpecialResource[];
  [property: string]: any;
};
type The2025春节Android更新_InteractiveResource = {
  animate_type: string;
  animate_url: string;
  display_name: string;
  extra: TentacledExtra;
  height: number;
  resource_type: number;
  static_type: string;
  static_url: string;
  static_url_list: TentacledStaticurlList[];
  sticker_info_source: string;
  version: number;
  visible_end_time: number;
  width: number;
  [property: string]: any;
};
type TentacledExtra = {
  activity_scene?: string;
  hint_content?: string;
  light_interaction: string;
  sticker_info_source?: string;
  [property: string]: any;
};
type TentacledStaticurlList = {
  static_type: string;
  static_url: string;
  [property: string]: any;
};
type The2025春节Android更新_SpecialResource = {
  config: TentacledConfig;
  in_advance: boolean;
  name: string;
  relation_name: string[];
  special_resource: string;
  special_type: number;
  trigger_type: string;
  version: number;
  [property: string]: any;
};
type TentacledConfig = {
  continuous_show?: string;
  random_show: string;
  receiver_show?: string;
  sender_show?: string;
  [property: string]: any;
};
type 互动表情升级一期 = {
  animate_icon: {
    [key: string]: any;
  };
  icon_url: string;
  interactive_resources: 互动表情升级一期_InteractiveResource[];
  special_resources: 互动表情升级一期_SpecialResource[];
  [property: string]: any;
};
type 互动表情升级一期_InteractiveResource = {
  animate_type: string;
  animate_url: string;
  display_name: string;
  extra: StickyExtra;
  height: number;
  resource_type: number;
  static_type: string;
  static_url: string;
  static_url_list: StickyStaticurlList[];
  sticker_info_source: string;
  version: number;
  width: number;
  [property: string]: any;
};
type StickyExtra = {
  light_interaction: string;
  [property: string]: any;
};
type StickyStaticurlList = {
  static_type: string;
  static_url: string;
  [property: string]: any;
};
type 互动表情升级一期_SpecialResource = {
  config: StickyConfig;
  in_advance: boolean;
  name: string;
  relation_name: string[];
  special_resource: string;
  special_type: number;
  trigger_type: string;
  version: number;
  [property: string]: any;
};
type StickyConfig = {
  continuous_show?: string;
  random_show: string;
  receiver_show?: string;
  sender_show?: string;
  [property: string]: any;
};
type LogPb$11 = {
  impr_id: string;
  [property: string]: any;
};
type ReportToggles = {
  actionbar_diff: number;
  flame_achieve: number;
  interactive_resources: number;
  interactive_resources_v2: number;
  plus_panel_diff: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/ImageAlbumWork.d.ts
/** 图集作品 */
type DyImageAlbumWork = {
  aweme_detail: AwemeDetail$2;
  log_pb: LogPb$10;
  status_code: number;
  [property: string]: any;
};
type AwemeDetail$2 = {
  activity_video_type: number;
  anchors: null;
  authentication_token: string;
  author: Author$7;
  author_mask_tag: number;
  author_user_id: number;
  aweme_control: AwemeControl$4;
  aweme_id: string;
  aweme_listen_struct: AwemeListenStruct$5;
  aweme_type: number;
  aweme_type_tags: string;
  boost_status: number;
  can_cache_to_local: boolean;
  caption: string;
  cf_recheck_ts: number;
  challenge_position: null;
  chapter_list: null;
  collect_stat: number;
  collection_corner_mark: number;
  comment_gid: number;
  comment_list: null;
  comment_permission_info: CommentPermissionInfo$5;
  commerce_config_data: null;
  component_control: ComponentControl$5;
  component_info_v2: string;
  cover_labels: null;
  create_time: number;
  desc: string;
  disable_relation_bar: number;
  dislike_dimension_list: null;
  dislike_dimension_list_v2: null;
  distribute_circle: DistributeCircle$5;
  duet_aggregate_in_music_tab: boolean;
  duration: number;
  ecom_comment_atmosphere_type: number;
  enable_comment_sticker_rec: boolean;
  entertainment_product_info: EntertainmentProductInfo$7;
  fall_card_struct: FallCardStruct$3;
  feed_comment_config: FeedCommentConfig$5;
  flash_mob_trends: number;
  friend_interaction: number;
  friend_recommend_info: {
    [key: string]: any;
  };
  game_tag_info: GameTagInfo$5;
  geofencing: string[];
  geofencing_regions: null;
  group_id: string;
  guide_scene_info: {
    [key: string]: any;
  };
  hybrid_label: null;
  image_album_music_info: ImageAlbumMusicInfo$5;
  image_comment: {
    [key: string]: any;
  };
  image_crop_ctrl: number;
  image_infos: null;
  image_item_quality_level: number;
  image_list: null;
  images: Image$3[];
  img_bitrate: string[];
  impression_data: ImpressionData$7;
  incentive_item_type: number;
  interaction_stickers: null;
  is_24_story: number;
  is_ads: boolean;
  is_collects_selected: number;
  is_duet_sing: boolean;
  is_image_beat: boolean;
  is_life_item: boolean;
  is_multi_content: number;
  is_share_post: boolean;
  is_story: number;
  is_top: number;
  is_use_music: boolean;
  item_title: string;
  item_warn_notification: ItemWarnNotification$5;
  label_top_text: null;
  libfinsert_task_id: string;
  long_video: null;
  mark_largely_following: boolean;
  media_type: number;
  music: Music$7;
  nickname_position: null;
  origin_comment_ids: null;
  origin_duet_resource_uri: string;
  origin_text_extra: string[];
  original: number;
  original_images: null;
  packed_clips: null;
  personal_page_botton_diagnose_style: number;
  photo_search_entrance: PhotoSearchEntrance$5;
  play_progress: PlayProgress$5;
  position: null;
  preview_title: string;
  preview_video_status: number;
  promotions: string[];
  publish_plus_alienation: PublishPlusAlienation$5;
  rate: number;
  region: string;
  relation_labels: null;
  risk_infos: RiskInfos$5;
  seo_info: {
    [key: string]: any;
  };
  series_paid_info: SeriesPaidInfo$5;
  share_info: AwemeDetailShareInfo$2;
  share_rec_extra: string;
  share_url: string;
  shoot_way: string;
  should_open_ad_report: boolean;
  show_follow_button: {
    [key: string]: any;
  };
  social_tag_list: null;
  statistics: Statistics$7;
  status: Status$4;
  suggest_words: SuggestWords$6;
  text_extra: TextExtra$5[];
  uniqid_position: null;
  user_digged: number;
  user_recommend_status: number;
  video: Video$5;
  video_control: VideoControl$7;
  video_game_data_channel_config: {
    [key: string]: any;
  };
  video_labels: null;
  video_share_edit_status: number;
  video_tag: VideoTag$5[];
  video_text: string[];
  visual_search_info: VisualSearchInfo$5;
  vtag_search: VtagSearch$3;
  xigua_base_info: XiguaBaseInfo$5;
  [property: string]: any;
};
type Author$7 = {
  account_cert_info: string;
  avatar_thumb: AuthorAvatarThumb$5;
  awemehts_greet_info: string;
  cf_list: null;
  close_friend_type: number;
  contacts_status: number;
  contrail_list: null;
  cover_url: Coverurl$5[];
  create_time: number;
  custom_verify: string;
  data_label_list: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  favoriting_count: number;
  follow_status: number;
  follower_count: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  following_count: number;
  im_role_ids: null;
  is_ad_fake: boolean;
  is_blocked_v2: boolean;
  is_blocking_v2: boolean;
  is_cf: number;
  live_high_value: number;
  mate_add_permission: number;
  max_follower_count: number;
  nickname: string;
  offline_info_list: null;
  personal_tag_list: null;
  prevent_download: boolean;
  risk_notice_text: string;
  sec_uid: string;
  secret: number;
  share_info: AuthorShareInfo$6;
  short_id: string;
  signature: string;
  signature_extra: null;
  special_follow_status: number;
  special_people_labels: null;
  status: number;
  text_extra: null;
  total_favorited: number;
  uid: string;
  unique_id: string;
  user_age: number;
  user_canceled: boolean;
  user_permissions: null;
  verification_type: number;
  [property: string]: any;
};
type AuthorAvatarThumb$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverurl$5 = {
  height?: number;
  uri?: string;
  url_list?: string[];
  width?: number;
  [property: string]: any;
};
type AuthorShareInfo$6 = {
  share_desc: string;
  share_desc_info: string;
  share_qrcode_url: ShareQrcodeurl$7;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ShareQrcodeurl$7 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AwemeControl$4 = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type AwemeListenStruct$5 = {
  trace_info: string;
  [property: string]: any;
};
type CommentPermissionInfo$5 = {
  can_comment: boolean;
  comment_permission_status: number;
  item_detail_entry: boolean;
  press_entry: boolean;
  toast_guide: boolean;
  [property: string]: any;
};
type ComponentControl$5 = {
  data_source_url: string;
  [property: string]: any;
};
type DistributeCircle$5 = {
  campus_block_interaction: boolean;
  distribute_type: number;
  is_campus: boolean;
  [property: string]: any;
};
type EntertainmentProductInfo$7 = {
  market_info: MarketInfo$7;
  [property: string]: any;
};
type MarketInfo$7 = {
  limit_free: LimitFree$7;
  [property: string]: any;
};
type LimitFree$7 = {
  in_free: boolean;
  [property: string]: any;
};
type FallCardStruct$3 = {
  recommend_reason_v2: string;
  [property: string]: any;
};
type FeedCommentConfig$5 = {
  author_audit_status: number;
  input_config_text: string;
  [property: string]: any;
};
type GameTagInfo$5 = {
  is_game: boolean;
  [property: string]: any;
};
type ImageAlbumMusicInfo$5 = {
  begin_time: number;
  end_time: number;
  volume: number;
  [property: string]: any;
};
type Image$3 = {
  download_url_list: string[];
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type ImpressionData$7 = {
  group_id_list_a: string[];
  group_id_list_b: string[];
  group_id_list_c: string[];
  similar_id_list_a: null;
  similar_id_list_b: null;
  [property: string]: any;
};
type ItemWarnNotification$5 = {
  content: string;
  show: boolean;
  type: number;
  [property: string]: any;
};
type Music$7 = {
  album: string;
  artist_user_infos: null;
  artists: string[];
  audition_duration: number;
  author: string;
  author_deleted: boolean;
  author_position: null;
  author_status: number;
  avatar_large: AvatarLarge$6;
  avatar_medium: AvatarMedium$5;
  avatar_thumb: MusicAvatarThumb$6;
  binded_challenge_id: number;
  can_background_play: boolean;
  collect_stat: number;
  cover_hd: Coverhd$7;
  cover_large: CoverLarge$7;
  cover_medium: MusicCoverMedium$4;
  cover_thumb: CoverThumb$8;
  dmv_auto_show: boolean;
  dsp_status: number;
  duration: number;
  end_time: number;
  external_song_info: string[];
  extra: string;
  id: number;
  id_str: string;
  is_audio_url_with_cookie: boolean;
  is_commerce_music: boolean;
  is_del_video: boolean;
  is_matched_metadata: boolean;
  is_original: boolean;
  is_original_sound: boolean;
  is_pgc: boolean;
  is_restricted: boolean;
  is_video_self_see: boolean;
  lyric_short_position: null;
  matched_pgc_sound: MatchedPgcSound$5;
  mid: string;
  music_chart_ranks: null;
  music_collect_count: number;
  music_cover_atmosphere_color_value: string;
  music_status: number;
  musician_user_infos: null;
  mute_share: boolean;
  offline_desc: string;
  owner_handle: string;
  owner_id: string;
  owner_nickname: string;
  pgc_music_type: number;
  play_url: Playurl$8;
  position: null;
  prevent_download: boolean;
  prevent_item_download_status: number;
  preview_end_time: number;
  preview_start_time: number;
  reason_type: number;
  redirect: boolean;
  schema_url: string;
  search_impr: SearchImpr$6;
  sec_uid: string;
  shoot_duration: number;
  song: Song$6;
  source_platform: number;
  start_time: number;
  status: number;
  strong_beat_url: StrongBeaturl$7;
  tag_list: null;
  title: string;
  unshelve_countries: null;
  user_count: number;
  video_duration: number;
  [property: string]: any;
};
type AvatarLarge$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarMedium$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicAvatarThumb$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverhd$7 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverLarge$7 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicCoverMedium$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb$8 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MatchedPgcSound$5 = {
  author: string;
  cover_medium: MatchedPgcSoundCoverMedium$5;
  mixed_author: string;
  mixed_title: string;
  title: string;
  [property: string]: any;
};
type MatchedPgcSoundCoverMedium$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl$8 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type SearchImpr$6 = {
  entity_id: string;
  [property: string]: any;
};
type Song$6 = {
  artists: null;
  id: number;
  id_str: string;
  [property: string]: any;
};
type StrongBeaturl$7 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PhotoSearchEntrance$5 = {
  ecom_type: number;
  [property: string]: any;
};
type PlayProgress$5 = {
  last_modified_time: number;
  play_progress: number;
  [property: string]: any;
};
type PublishPlusAlienation$5 = {
  alienation_type: number;
  [property: string]: any;
};
type RiskInfos$5 = {
  content: string;
  risk_sink: boolean;
  type: number;
  vote: boolean;
  warn: boolean;
  [property: string]: any;
};
type SeriesPaidInfo$5 = {
  item_price: number;
  series_paid_status: number;
  [property: string]: any;
};
type AwemeDetailShareInfo$2 = {
  share_desc: string;
  share_desc_info: string;
  share_link_desc: string;
  share_url: string;
  [property: string]: any;
};
type Statistics$7 = {
  admire_count: number;
  aweme_id: string;
  collect_count: number;
  comment_count: number;
  digg_count: number;
  play_count: number;
  share_count: number;
  [property: string]: any;
};
type Status$4 = {
  allow_share: boolean;
  aweme_id: string;
  in_reviewing: boolean;
  is_delete: boolean;
  is_prohibited: boolean;
  listen_video_status: number;
  part_see: number;
  private_status: number;
  review_result: ReviewResult$7;
  [property: string]: any;
};
type ReviewResult$7 = {
  review_status: number;
  [property: string]: any;
};
type SuggestWords$6 = {
  suggest_words: SuggestWord$6[];
  [property: string]: any;
};
type SuggestWord$6 = {
  hint_text?: string;
  icon_url?: string;
  scene?: string;
  words?: Word$7[];
  [property: string]: any;
};
type Word$7 = {
  info?: string;
  word?: string;
  word_id?: string;
  [property: string]: any;
};
type TextExtra$5 = {
  caption_end: number;
  caption_start: number;
  end: number;
  hashtag_id: string;
  hashtag_name: string;
  is_commerce: boolean;
  start: number;
  type: number;
  [property: string]: any;
};
type Video$5 = {
  audio: {
    [key: string]: any;
  };
  big_thumbs: BigThumb$5[];
  bit_rate_audio: null;
  cover: Cover$6;
  duration: number;
  has_watermark: boolean;
  height: number;
  is_h265: number;
  meta: string;
  origin_cover: OriginCover$4;
  play_addr: PlayAddr;
  ratio: string;
  width: number;
  [property: string]: any;
};
type BigThumb$5 = {
  duration?: number;
  fext?: string;
  img_num?: number;
  img_url?: string;
  img_urls?: string[];
  img_x_len?: number;
  img_x_size?: number;
  img_y_len?: number;
  img_y_size?: number;
  interval?: number;
  uri?: string;
  uris?: string[];
  [property: string]: any;
};
type Cover$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type OriginCover$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddr = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoControl$7 = {
  allow_douplus: boolean;
  allow_download: boolean;
  allow_duet: boolean;
  allow_dynamic_wallpaper: boolean;
  allow_music: boolean;
  allow_react: boolean;
  allow_record: boolean;
  allow_share: boolean;
  allow_stitch: boolean;
  disable_record_reason: string;
  download_ignore_visibility: boolean;
  download_info: DownloadInfo$7;
  draft_progress_bar: number;
  duet_ignore_visibility: boolean;
  duet_info: DuetInfo$7;
  prevent_download_type: number;
  share_grayed: boolean;
  share_ignore_visibility: boolean;
  share_type: number;
  show_progress_bar: number;
  timer_info: {
    [key: string]: any;
  };
  timer_status: number;
  [property: string]: any;
};
type DownloadInfo$7 = {
  level: number;
  [property: string]: any;
};
type DuetInfo$7 = {
  fail_info: FailInfo;
  level: number;
  [property: string]: any;
};
type FailInfo = {
  code: number;
  reason: string;
  [property: string]: any;
};
type VideoTag$5 = {
  level: number;
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type VisualSearchInfo$5 = {
  is_ecom_img: boolean;
  is_high_accuracy_ecom: boolean;
  is_high_recall_ecom: boolean;
  is_show_img_entrance: boolean;
  visual_search_longpress: number;
  [property: string]: any;
};
type VtagSearch$3 = {
  vtag_delay_ts: number;
  vtag_enable: boolean;
  [property: string]: any;
};
type XiguaBaseInfo$5 = {
  item_id: number;
  star_altar_order_id: number;
  star_altar_type: number;
  status: number;
  [property: string]: any;
};
type LogPb$10 = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/MusicWork.d.ts
type DyMusicWork = {
  extra: Extra$6;
  feature_data: {
    [key: string]: any;
  };
  high_upload_ratio: number;
  log_pb: LogPb$9;
  msg: string;
  music_info: MusicInfo;
  rec_list: string[];
  related_effects: null;
  related_musics: null;
  small_banner: string[];
  status_code: number;
  trends_infos: null;
  [property: string]: any;
};
type Extra$6 = {
  fatal_item_ids: string[];
  logid: string;
  now: number;
  [property: string]: any;
};
type LogPb$9 = {
  impr_id: string;
  [property: string]: any;
};
type MusicInfo = {
  album: string;
  artist_user_infos: null;
  artists: string[];
  audition_duration: number;
  author: string;
  author_deleted: boolean;
  author_position: null;
  author_status: number;
  avatar_large: AvatarLarge$5;
  avatar_medium: AvatarMedium$4;
  avatar_thumb: AvatarThumb$3;
  binded_challenge_id: number;
  can_background_play: boolean;
  collect_stat: number;
  cover_hd: Coverhd$6;
  cover_large: CoverLarge$6;
  cover_medium: MusicInfoCoverMedium;
  cover_thumb: CoverThumb$7;
  dmv_auto_show: boolean;
  dsp_status: number;
  duration: number;
  end_time: number;
  external_song_info: string[];
  extra: string;
  id: number;
  id_str: string;
  is_audio_url_with_cookie: boolean;
  is_commerce_music: boolean;
  is_del_video: boolean;
  is_matched_metadata: boolean;
  is_original: boolean;
  is_original_sound: boolean;
  is_pgc: boolean;
  is_restricted: boolean;
  is_video_self_see: boolean;
  luna_info: LunaInfo$1;
  lyric_short_position: null;
  matched_pgc_sound: MatchedPgcSound$4;
  mid: string;
  music_chart_ranks: null;
  music_collect_count: number;
  music_cover_atmosphere_color_value: string;
  music_status: number;
  musician_user_infos: null;
  mute_share: boolean;
  offline_desc: string;
  original_musician_display_name: string;
  owner_handle: string;
  owner_id: string;
  owner_nickname: string;
  pgc_music_type: number;
  play_url: Playurl$7;
  position: null;
  prevent_download: boolean;
  prevent_item_download_status: number;
  preview_end_time: number;
  preview_start_time: number;
  reason_type: number;
  redirect: boolean;
  schema_url: string;
  search_impr: SearchImpr$5;
  sec_uid: string;
  share_info: ShareInfo$3;
  shoot_duration: number;
  song: Song$5;
  source_platform: number;
  start_time: number;
  status: number;
  strong_beat_url: StrongBeaturl$6;
  tag_list: null;
  title: string;
  trend_music_start_time: number;
  unified_music_group: UnifiedMusicGroup;
  unshelve_countries: null;
  user_count: number;
  video_duration: number;
  [property: string]: any;
};
type AvatarLarge$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarMedium$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarThumb$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverhd$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverLarge$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicInfoCoverMedium = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb$7 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type LunaInfo$1 = {
  has_copyright: boolean;
  is_luna_user: boolean;
  [property: string]: any;
};
type MatchedPgcSound$4 = {
  author: string;
  cover_medium: MatchedPgcSoundCoverMedium$4;
  id: number;
  mixed_author: string;
  mixed_title: string;
  title: string;
  [property: string]: any;
};
type MatchedPgcSoundCoverMedium$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl$7 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type SearchImpr$5 = {
  entity_id: string;
  [property: string]: any;
};
type ShareInfo$3 = {
  bool_persist: number;
  share_desc: string;
  share_desc_info: string;
  share_quote: string;
  share_signature_desc: string;
  share_signature_url: string;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type Song$5 = {
  artists: null;
  chorus_v3_infos: null;
  id: number;
  id_str: string;
  [property: string]: any;
};
type StrongBeaturl$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type UnifiedMusicGroup = {
  author: string;
  medium_cover_url: MediumCoverurl;
  song_id: number;
  title: string;
  [property: string]: any;
};
type MediumCoverurl = {
  uri: string;
  url_list: string[];
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/SearchInfo/SearchInfoGeneral.d.ts
type SearchInfoGeneralData = {
  ad_info: {
    [key: string]: any;
  };
  cursor: number;
  data: Datum$3[];
  douyin_ai_search_info: DouyinaiSearchInfo;
  extra: Extra$5;
  global_doodle_config: GlobalDoodleConfig$2;
  guide_search_words: null;
  has_more: number;
  log_pb: LogPb$8;
  multi_columns_info: MultiColumnsInfo;
  ops: null;
  polling_time: number;
  qc: string;
  result_status: number;
  status_code: number;
  [property: string]: any;
};
type Datum$3 = {
  ala_src: string;
  aweme_info: AwemeInfo$1;
  aweme_list: null;
  bottom_source_info?: BottomSourceInfo;
  card_id: string;
  card_info: CardInfo;
  card_style_type: number;
  card_type: number;
  card_type_id: CardTypeid;
  card_unique_name: string;
  common_aladdin: CommonAladdin;
  data?: DatumData;
  debug_data: DebugData;
  debug_diff_info: {
    [key: string]: any;
  };
  doc_type: number;
  ecom_goods_list: null;
  feedback: Feedback;
  fp: string;
  log_data: LogData;
  lynx_info: LynxInfo;
  music_info_list: null;
  ops: null;
  provider_doc_id: number;
  provider_doc_id_str: string;
  qishui_music_list: null;
  related_word_list?: RelatedWordList[];
  send_back: string;
  show_tab: null;
  sub_card_list: null;
  tab: null;
  type: number;
  words_query_record?: WordsQueryRecord;
  [property: string]: any;
};
type AwemeInfo$1 = {
  ai_follow_images: null;
  anchor_info?: AnchorInfo$2;
  anchors: null;
  author: Author$6;
  author_user_id: number;
  aweme_id: string;
  aweme_type: number;
  cha_list: null;
  challenge_position: null;
  chapter_bar_color: null;
  chapter_list: null;
  collect_stat: number;
  comment_list: null;
  commerce_config_data: null;
  cover_labels: null;
  create_scale_type: null;
  create_time: number;
  danmaku_control?: DanmakuControl$5;
  desc: string;
  dislike_dimension_list: null;
  dislike_dimension_list_v2: null;
  effect_inflow_effects: null;
  entertainment_product_info: EntertainmentProductInfo$6;
  follow_shot_assets: null;
  geofencing: null;
  geofencing_regions: null;
  group_id: string;
  hybrid_label: null;
  image_follow_shot_assets: null;
  image_infos: null;
  image_list: null;
  images: Image$2[];
  img_bitrate: null;
  impression_data: ImpressionData$6;
  interaction_stickers: null;
  interest_points: null;
  is_top: number;
  jump_tab_info_list: null;
  label_top_text: null;
  long_video: null;
  media_type: number;
  music: Music$6;
  mv_info: null;
  nearby_hot_comment: null;
  nickname_position: null;
  origin_comment_ids: null;
  origin_text_extra: null;
  original_images: null;
  packed_clips: null;
  position: null;
  prevent_download: boolean;
  promotions: null;
  rawdata: string;
  ref_tts_id_list: null;
  ref_voice_modify_id_list: null;
  relation_labels: null;
  reply_smart_emojis: null;
  share_info: AwemeInfoShareInfo;
  slides_music_beats: null;
  social_tag_list: null;
  standard_bar_info_list: null;
  statistics: Statistics$6;
  status: Status$3;
  suggest_words: SuggestWords$5;
  text_extra: TextExtraElement[];
  trends_infos: null;
  tts_id_list: null;
  uniqid_position: null;
  user_digged: number;
  video: Video$4;
  video_control: VideoControl$6;
  video_labels: null;
  video_tag: null;
  video_text: null;
  voice_modify_id_list: null;
  yumme_recreason: null;
  [property: string]: any;
};
type AnchorInfo$2 = {
  content: string;
  extra: string;
  icon: Icon$3;
  id: string;
  log_extra: string;
  mp_url: string;
  open_url: string;
  style_info: StyleInfo$2;
  title: string;
  title_tag: string;
  type: number;
  web_url: string;
  [property: string]: any;
};
type Icon$3 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type StyleInfo$2 = {
  default_icon: string;
  extra: string;
  scene_icon: string;
  [property: string]: any;
};
type Author$6 = {
  account_cert_info?: string;
  ad_cover_url: null;
  avatar_168x168: Avatar168X168$1;
  avatar_300x300: Avatar300X300$1;
  avatar_larger: AvatarLarger$1;
  avatar_medium: AuthorAvatarMedium;
  avatar_schema_list: null;
  avatar_thumb: AuthorAvatarThumb$4;
  aweme_count: number;
  ban_user_functions: null;
  batch_unfollow_contain_tabs: null;
  batch_unfollow_relation_desc: null;
  can_set_geofencing: null;
  card_entries: null;
  card_entries_not_display: null;
  card_sort_priority: null;
  cf_list: null;
  cha_list: null;
  contrail_list: null;
  cover_url: null;
  creator_tag_list: null;
  custom_verify: string;
  data_label_list: null;
  display_info: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  familiar_visitor_user: null;
  favoriting_count: number;
  follow_status: number;
  follower_count: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  followers_detail: null;
  following_count: number;
  geofencing: null;
  homepage_bottom_toast: null;
  identity_labels: null;
  im_role_ids: null;
  interest_tags: null;
  is_block: boolean;
  is_verified: boolean;
  item_list: null;
  link_item_list: null;
  need_points: null;
  new_story_cover: null;
  nickname: string;
  not_seen_item_id_list: null;
  not_seen_item_id_list_v2: null;
  offline_info_list: null;
  personal_tag_list: null;
  platform_sync_info: null;
  private_relation_list: null;
  profile_component_disabled: null;
  profile_mob_params: null;
  relative_users: null;
  room_data: string;
  room_id: number;
  room_id_str: string;
  sec_uid: string;
  secret: number;
  share_info: AuthorShareInfo$5;
  short_id: string;
  signature: string;
  signature_extra: null;
  special_people_labels: null;
  text_extra: null;
  total_favorited: number;
  type_label: null;
  uid: string;
  unique_id: string;
  user_canceled: boolean;
  user_permissions: null;
  user_tags: null;
  verification_permission_ids: null;
  verification_type: number;
  weibo_verify: string;
  white_cover_url: null;
  [property: string]: any;
};
type Avatar168X168$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Avatar300X300$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarLarger$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AuthorAvatarMedium = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AuthorAvatarThumb$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AuthorShareInfo$5 = {
  share_desc: string;
  share_desc_info: string;
  share_qrcode_url: ShareQrcodeurl$6;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ShareQrcodeurl$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DanmakuControl$5 = {
  activities: Activity$4[];
  danmaku_cnt: number;
  enable_danmaku: boolean;
  first_danmaku_offset: number;
  is_post_denied: boolean;
  last_danmaku_offset: number;
  pass_through_params: string;
  post_denied_reason: string;
  post_privilege_level: number;
  skip_danmaku: boolean;
  [property: string]: any;
};
type Activity$4 = {
  id: number;
  type: number;
  [property: string]: any;
};
type EntertainmentProductInfo$6 = {
  biz: number;
  market_info: MarketInfo$6;
  sub_title: null;
  [property: string]: any;
};
type MarketInfo$6 = {
  limit_free: LimitFree$6;
  marketing_tag: null;
  [property: string]: any;
};
type LimitFree$6 = {
  in_free: boolean;
  [property: string]: any;
};
type Image$2 = {
  download_url_list: string[];
  height: number;
  interaction_stickers: null;
  is_new_text_mode?: number;
  mask_url_list: null;
  uri: string;
  url_list: string[];
  watermark_free_download_url_list: null;
  width: number;
  [property: string]: any;
};
type ImpressionData$6 = {
  group_id_list_a: string[];
  group_id_list_b: string[];
  group_id_list_c: string[];
  group_id_list_d: null;
  similar_id_list_a: null;
  similar_id_list_b: number[] | null;
  [property: string]: any;
};
type Music$6 = {
  album: string;
  artist_user_infos: null;
  artists: string[];
  audition_duration: number;
  author: string;
  author_deleted: boolean;
  author_position: null;
  author_status: number;
  avatar_large: AvatarLarge$4;
  avatar_medium: MusicAvatarMedium$1;
  avatar_thumb: MusicAvatarThumb$5;
  binded_challenge_id: number;
  can_background_play: boolean;
  collect_stat: number;
  cover_hd: Coverhd$5;
  cover_large: CoverLarge$5;
  cover_medium: MusicCoverMedium$3;
  cover_thumb: CoverThumb$6;
  dmv_auto_show: boolean;
  dsp_status: number;
  duration: number;
  end_time: number;
  external_song_info: string[];
  extra: string;
  id: number;
  id_str: string;
  is_audio_url_with_cookie: boolean;
  is_commerce_music: boolean;
  is_del_video: boolean;
  is_matched_metadata: boolean;
  is_original: boolean;
  is_original_sound: boolean;
  is_pgc: boolean;
  is_restricted: boolean;
  is_video_self_see: boolean;
  luna_info: LunaInfo;
  lyric_short_position: null;
  matched_pgc_sound?: MatchedPgcSound$3;
  mid: string;
  music_chart_ranks: null;
  music_collect_count: number;
  music_cover_atmosphere_color_value: string;
  music_status: number;
  musician_user_infos: null;
  mute_share: boolean;
  offline_desc: string;
  owner_handle: string;
  owner_id: string;
  owner_nickname: string;
  pgc_music_type: number;
  play_url: Playurl$6;
  position: null;
  prevent_download: boolean;
  prevent_item_download_status: number;
  preview_end_time: number;
  preview_start_time: number;
  reason_type: number;
  redirect: boolean;
  schema_url: string;
  search_impr: SearchImpr$4;
  sec_uid: string;
  shoot_duration: number;
  show_origin_clip: boolean;
  song?: Song$4;
  source_platform: number;
  start_time: number;
  status: number;
  strong_beat_url: StrongBeaturl$5;
  tag_list: null;
  title: string;
  unshelve_countries: null;
  user_count: number;
  video_duration: number;
  [property: string]: any;
};
type AvatarLarge$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicAvatarMedium$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicAvatarThumb$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverhd$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverLarge$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicCoverMedium$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb$6 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type LunaInfo = {
  has_copyright?: boolean;
  is_luna_user: boolean;
  [property: string]: any;
};
type MatchedPgcSound$3 = {
  author: string;
  cover_medium: MatchedPgcSoundCoverMedium$3;
  mixed_author: string;
  mixed_title: string;
  title: string;
  [property: string]: any;
};
type MatchedPgcSoundCoverMedium$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl$6 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type SearchImpr$4 = {
  entity_id: string;
  [property: string]: any;
};
type Song$4 = {
  artists: null;
  chorus_v3_infos: null;
  id: number;
  id_str: string;
  [property: string]: any;
};
type StrongBeaturl$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AwemeInfoShareInfo = {
  bool_persist: number;
  share_desc: string;
  share_desc_info: string;
  share_link_desc: string;
  share_quote: string;
  share_signature_desc: string;
  share_signature_url: string;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type Statistics$6 = {
  aweme_id: string;
  collect_count: number;
  comment_count: number;
  digest: string;
  digg_count: number;
  download_count: number;
  exposure_count: number;
  forward_count: number;
  live_watch_count: number;
  lose_comment_count: number;
  lose_count: number;
  play_count: number;
  recommend_count: number;
  share_count: number;
  whatsapp_share_count: number;
  [property: string]: any;
};
type Status$3 = {
  allow_comment: boolean;
  allow_friend_recommend: boolean;
  allow_friend_recommend_guide: boolean;
  allow_self_recommend_to_friend: boolean;
  allow_share: boolean;
  aweme_edit_info: AwemeEditInfo$1;
  aweme_id: string;
  dont_share_status: number;
  download_status: number;
  in_reviewing: boolean;
  is_delete: boolean;
  is_private: boolean;
  is_prohibited: boolean;
  listen_video_status: number;
  part_see: number;
  private_status: number;
  review_result: ReviewResult$6;
  reviewed: number;
  self_see: boolean;
  video_hide_search: number;
  with_fusion_goods: boolean;
  with_goods: boolean;
  [property: string]: any;
};
type AwemeEditInfo$1 = {
  button_status: number;
  button_toast: string;
  [property: string]: any;
};
type ReviewResult$6 = {
  review_status: number;
  [property: string]: any;
};
type SuggestWords$5 = {
  disable_display_bar_inner: number;
  suggest_words: SuggestWord$5[];
  [property: string]: any;
};
type SuggestWord$5 = {
  extra_info: string;
  hint_text: string;
  icon_url: string;
  scene: string;
  words: Word$6[];
  [property: string]: any;
};
type Word$6 = {
  info: string;
  word: string;
  word_id: string;
  [property: string]: any;
};
type TextExtraElement = {
  caption_end: number;
  caption_start: number;
  end: number;
  hashtag_id: string;
  hashtag_name: string;
  is_commerce: boolean;
  start: number;
  type: number;
  [property: string]: any;
};
type Video$4 = {
  animated_cover?: AnimatedCover$2;
  audio: Audio$2;
  big_thumbs: BigThumb$4[] | null;
  bit_rate: BitRate$4[];
  bit_rate_audio: null;
  cdn_url_expired?: number;
  cover: Cover$5;
  CoverTsp?: number;
  download_addr?: DownloadAddr$4;
  download_suffix_logo_addr?: DownloadSuffixLogoAddr$4;
  duration: number;
  dynamic_cover?: DynamicCover$5;
  format?: string;
  fuse_video_labels_v2: FuseVideoLabelsV2;
  gaussian_cover?: GaussianCover$5;
  has_download_suffix_logo_addr?: boolean;
  has_watermark: boolean;
  height: number;
  horizontal_type?: number;
  is_bytevc1: number;
  is_callback?: boolean;
  is_h265: number;
  is_source_HDR?: number;
  meta: string;
  misc_download_addrs?: string;
  need_set_token?: boolean;
  origin_cover: OriginCover$3;
  play_addr: VideoPlayAddr$3;
  play_addr_265?: PlayAddr265$5;
  play_addr_h264?: PlayAddrH264$3;
  play_addr_lowbr?: PlayAddrLowbr$3;
  ratio: string;
  raw_cover?: RawCover$2;
  tags: null;
  use_static_cover?: boolean;
  video_model?: string;
  width: number;
  [property: string]: any;
};
type AnimatedCover$2 = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type Audio$2 = {
  original_sound_infos: null;
  [property: string]: any;
};
type BigThumb$4 = {
  duration: number;
  fext: string;
  img_num: number;
  img_url: string;
  img_urls: string[];
  img_x_len: number;
  img_x_size: number;
  img_y_len: number;
  img_y_size: number;
  interval: number;
  uri: string;
  uris: string[];
  [property: string]: any;
};
type BitRate$4 = {
  bit_rate: number;
  format: string;
  FPS: number;
  gear_name: string;
  HDR_bit: string;
  HDR_type: string;
  is_bytevc1: number;
  is_h265: number;
  play_addr: BitRatePlayAddr$4;
  quality_type: number;
  video_extra: string;
  [property: string]: any;
};
type BitRatePlayAddr$4 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Cover$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadAddr$4 = {
  data_size: number;
  file_cs: string;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadSuffixLogoAddr$4 = {
  data_size: number;
  file_cs: string;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DynamicCover$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FuseVideoLabelsV2 = {
  Top1: Top1[];
  [property: string]: any;
};
type Top1 = {
  Level1: Level1;
  Level2: Level2;
  Level3: Level3;
  [property: string]: any;
};
type Level1 = {
  TagId: number;
  [property: string]: any;
};
type Level2 = {
  TagId: number;
  [property: string]: any;
};
type Level3 = {
  TagId: number;
  [property: string]: any;
};
type GaussianCover$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type OriginCover$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoPlayAddr$3 = {
  data_size?: number;
  file_cs?: string;
  file_hash?: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddr265$5 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddrH264$3 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddrLowbr$3 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type RawCover$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoControl$6 = {
  allow_douplus: boolean;
  allow_download: boolean;
  allow_duet: boolean;
  allow_dynamic_wallpaper: boolean;
  allow_music: boolean;
  allow_react: boolean;
  allow_record: boolean;
  allow_share: boolean;
  allow_stitch: boolean;
  disable_record_reason: string;
  download_ignore_visibility: boolean;
  download_info: DownloadInfo$6;
  draft_progress_bar: number;
  duet_ignore_visibility: boolean;
  duet_info: DuetInfo$6;
  prevent_download_type: number;
  share_grayed: boolean;
  share_ignore_visibility: boolean;
  share_type: number;
  show_progress_bar: number;
  timer_info: TimerInfo$1;
  timer_status: number;
  [property: string]: any;
};
type DownloadInfo$6 = {
  fail_info?: DownloadInfoFailInfo$4;
  level: number;
  [property: string]: any;
};
type DownloadInfoFailInfo$4 = {
  code: number;
  reason: string;
  [property: string]: any;
};
type DuetInfo$6 = {
  fail_info: DuetInfoFailInfo$4;
  level: number;
  [property: string]: any;
};
type DuetInfoFailInfo$4 = {
  code: number;
  reason: string;
  [property: string]: any;
};
type TimerInfo$1 = {
  timer_status: number;
  [property: string]: any;
};
type BottomSourceInfo = {
  avatar: string;
  darkAvatar: string;
  source: string;
  [property: string]: any;
};
type CardInfo = {
  ala_src: string;
  cell_type: number;
  display: Display;
  doc_id: number;
  fingerprint?: string;
  first_pos?: number;
  highlight: null;
  id: number;
  id_str: string;
  index?: number;
  keyinfo: {
    [key: string]: any;
  };
  now_time: string;
  pos?: number;
  tokens: string[];
  [property: string]: any;
};
type Display = {
  content_origin: string;
  data_ext: Dataext;
  emphasized: Emphasized;
  info: Info;
  semantic_modeling_display: string;
  summary: Summary;
  text_extra: DisplayTextExtra;
  title: DisplayTitle;
  [property: string]: any;
};
type Dataext = {
  display_extra_data: DisplayExtraData;
  has_mipcdn: boolean;
  is_title_full_matched: boolean;
  [property: string]: any;
};
type DisplayExtraData = {
  accept_images_docid: string[];
  [property: string]: any;
};
type Emphasized = {
  summary: string;
  title: string;
  [property: string]: any;
};
type Info = {
  _comment: string;
  app_download: boolean;
  docid: string;
  domain: string;
  host: string;
  icon_img: string;
  icon_name: string;
  image_count: number;
  images: string[];
  is_web: boolean;
  preload: Preload;
  site_name: string;
  time_factor: number;
  time_factor_string: string;
  type: string;
  type_ext?: string;
  url: string;
  [property: string]: any;
};
type Preload = {
  css: string[];
  html: string[];
  js: string[];
  [property: string]: any;
};
type Summary = {
  b_pos: Array<number[]>;
  marked: string;
  pos: Array<number[]>;
  text: string;
  [property: string]: any;
};
type DisplayTextExtra = {
  abstract: Abstract[];
  title: TitleElement[];
  [property: string]: any;
};
type Abstract = {
  end: number;
  search_text: string;
  start: number;
  type: number;
  [property: string]: any;
};
type TitleElement = {
  end: number;
  search_text: string;
  start: number;
  type: number;
  [property: string]: any;
};
type DisplayTitle = {
  b_pos: Array<number[]>;
  marked: string;
  pos: Array<number[]>;
  text: string;
  [property: string]: any;
};
type CardTypeid = {
  ala_src: string;
  card_name: string;
  doc_type: number;
  performance_infos: PerformanceInfos;
  [property: string]: any;
};
type PerformanceInfos = {
  '105_toutiao_web': number;
  108?: number;
  306?: number;
  double_column: number;
  is_native: number;
  search_card_count: number;
  [property: string]: any;
};
type CommonAladdin = {
  ala_src: string;
  attached_info: AttachedInfo;
  display: string;
  doc_id: number;
  extended_displays: null;
  sub_common_aladdin: null;
  toutiao_alasrc: string;
  [property: string]: any;
};
type AttachedInfo = {
  aweme_list: null;
  coupon_list: null;
  mix_data_list: null;
  music_list: null;
  user_list: null;
  xg_video_list: null;
  [property: string]: any;
};
type DatumData = {
  card_tags: null;
  common_tab_config: null;
  hotspot_tab_config: null;
  rs_extra_info: RsExtraInfo;
  [property: string]: any;
};
type RsExtraInfo = {
  hide_related_words: null;
  hide_related_words_id: null;
  impr_extra: string;
  query_id: string;
  [property: string]: any;
};
type DebugData = {
  filter_debug_info_list: null;
  [property: string]: any;
};
type Feedback = {
  url: string;
  [property: string]: any;
};
type LogData = {
  dcm: string;
  entity_paths: string;
  search_result_id: string;
  token_type: string;
  [property: string]: any;
};
type LynxInfo = {
  is_subcard: boolean;
  [property: string]: any;
};
type RelatedWordList = {
  extra_info: ExtraInfo$2;
  rand_num: number;
  related_img: string;
  related_word: string;
  word_record: WordRecord;
  [property: string]: any;
};
type ExtraInfo$2 = {
  query_info: string;
  words_type: string;
  [property: string]: any;
};
type WordRecord = {
  force_update_rank: boolean;
  group_id: string;
  product_id: string;
  words_content: string;
  words_image: WordsImage;
  words_position: number;
  words_source: string;
  [property: string]: any;
};
type WordsImage = {
  url_list: string[];
  [property: string]: any;
};
type WordsQueryRecord = {
  info: string;
  query_id: string;
  words_source: string;
  [property: string]: any;
};
type DouyinaiSearchInfo = {
  ai_search_req_patch: {
    [key: string]: any;
  };
  is_hit_high_risk: boolean;
  is_simple_qa_intent: boolean;
  [property: string]: any;
};
type Extra$5 = {
  fatal_item_ids: string[];
  logid: string;
  now: number;
  scenes: null;
  search_request_id: string;
  [property: string]: any;
};
type GlobalDoodleConfig$2 = {
  filter_settings: FilterSetting$2[];
  keyword: string;
  [property: string]: any;
};
type FilterSetting$2 = {
  android_version: number;
  default_index: number;
  enable_huo_shan: boolean;
  enable_lite: boolean;
  filter_style?: number;
  huoshan_android_version: number;
  huoshan_ios_version: number;
  ios_version: number;
  items: Item$5[];
  lite_android_version: number;
  lite_ios_version: number;
  log_name: string;
  name: string;
  search_less_text: SearchLessText$1;
  search_nil_text: SearchNilText$1;
  title: string;
  [property: string]: any;
};
type Item$5 = {
  log_value: string;
  show_dot: number;
  title: string;
  value: string;
  [property: string]: any;
};
type SearchLessText$1 = {
  info: string;
  jump_text: string;
  [property: string]: any;
};
type SearchNilText$1 = {
  info: string;
  jump_text: string;
  [property: string]: any;
};
type LogPb$8 = {
  impr_id: string;
  [property: string]: any;
};
type MultiColumnsInfo = {
  group_tag: string;
  is_multi_columns: boolean;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/SearchInfo/SearchInfoUser.d.ts
type SearchInfoUser = {
  challenge_list: null;
  cursor: number;
  extra: Extra$4;
  global_doodle_config: GlobalDoodleConfig$1;
  has_more: number;
  input_keyword: string;
  log_pb: LogPb$7;
  mock_recall_path: string;
  music_list: null;
  myself_user_id: string;
  path: string;
  qc: string;
  rid: string;
  status_code: number;
  type: number;
  user_list: UserList$1[];
  [property: string]: any;
};
type Extra$4 = {
  fatal_item_ids: string[];
  logid: string;
  now: number;
  scenes: null;
  search_request_id: string;
  [property: string]: any;
};
type GlobalDoodleConfig$1 = {
  filter_settings: FilterSetting$1[];
  filter_show_dot: number;
  keyword: string;
  [property: string]: any;
};
type FilterSetting$1 = {
  default_index: number;
  items: Item$4[];
  log_name: string;
  name: string;
  title: string;
  [property: string]: any;
};
type Item$4 = {
  log_value: string;
  title: string;
  value: string;
  [property: string]: any;
};
type LogPb$7 = {
  impr_id: string;
  [property: string]: any;
};
type UserList$1 = {
  baikes: null;
  challenges: null;
  effects: null;
  fandoms: null;
  is_red_uniqueid: boolean;
  items: null;
  mix_list: null;
  musics: null;
  position: null;
  product_info: null;
  product_list: null;
  shop_product_info: null;
  uniqid_position: null;
  user_info: UserInfo;
  user_service_info: null;
  userSubLightApp: null;
  [property: string]: any;
};
type UserInfo = {
  account_cert_info: string;
  ad_cover_url: null;
  avatar_schema_list: null;
  avatar_thumb: AvatarThumb$2;
  ban_user_functions: null;
  batch_unfollow_contain_tabs: null;
  batch_unfollow_relation_desc: null;
  can_set_geofencing: null;
  card_entries: null;
  card_entries_not_display: null;
  card_sort_priority: null;
  cf_list: null;
  cha_list: null;
  contrail_list: null;
  cover_url: null;
  creator_tag_list: null;
  custom_verify: string;
  data_label_list: null;
  display_info: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  familiar_visitor_user: null;
  follow_status: number;
  follower_count: number;
  follower_count_str: string;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  followers_detail: null;
  geofencing: null;
  homepage_bottom_toast: null;
  identity_labels: null;
  im_role_ids: null;
  interest_tags: null;
  item_list: null;
  link_item_list: null;
  need_points: null;
  new_story_cover: null;
  nickname: string;
  not_seen_item_id_list: null;
  not_seen_item_id_list_v2: null;
  offline_info_list: null;
  personal_tag_list: null;
  platform_sync_info: null;
  private_relation_list: null;
  profile_component_disabled: null;
  profile_mob_params: null;
  relative_users: null;
  room_data: string;
  room_id: number;
  room_id_str: string;
  sec_uid: string;
  secret: number;
  short_id: string;
  signature: string;
  signature_extra: null;
  special_people_labels: null;
  text_extra: null;
  total_favorited: number;
  type_label: null;
  uid: string;
  unique_id: string;
  user_permissions: null;
  user_tags: UserTag[];
  verification_permission_ids: null;
  versatile_display: string;
  white_cover_url: null;
  [property: string]: any;
};
type AvatarThumb$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type UserTag = {
  description: string;
  icon_url: string;
  type: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/SearchInfo/SearchInfoVideo.d.ts
type SearchInfoVideo = {
  aweme_list: null;
  backtrace: string;
  cursor: number;
  data: Datum$2[];
  extra: Extra$3;
  global_doodle_config: GlobalDoodleConfig;
  has_more: number;
  log_pb: LogPb$6;
  mock_recall_path: string;
  path: string;
  status_code: number;
  [property: string]: any;
};
type Datum$2 = {
  aweme_info: AwemeInfo;
  aweme_list: null;
  ecom_goods_list: null;
  music_info_list: null;
  ops: null;
  qishui_music_list: null;
  show_tab: null;
  sub_card_list: null;
  tab: null;
  type: number;
  [property: string]: any;
};
type AwemeInfo = {
  ai_follow_images: null;
  anchor_info?: AnchorInfo$1;
  anchors: null;
  author: Author$5;
  author_user_id: number;
  aweme_id: string;
  aweme_type: number;
  cha_list: null;
  challenge_position: null;
  chapter_bar_color: null;
  chapter_list: null;
  collect_stat: number;
  comment_list: null;
  commerce_config_data: null;
  cover_labels: null;
  create_scale_type: null;
  create_time: number;
  danmaku_control: DanmakuControl$4;
  desc: string;
  dislike_dimension_list: null;
  dislike_dimension_list_v2: null;
  douyin_p_c_video_extra?: string;
  effect_inflow_effects: null;
  entertainment_product_info: EntertainmentProductInfo$5;
  follow_shot_assets: null;
  geofencing: null;
  geofencing_regions: null;
  group_id: string;
  hybrid_label: null;
  image_follow_shot_assets: null;
  image_infos: null;
  image_list: null;
  images: null;
  img_bitrate: null;
  impression_data: ImpressionData$5;
  interaction_stickers: null;
  interest_points: null;
  is_top: number;
  jump_tab_info_list: null;
  label_top_text: null;
  long_video: null;
  media_type: number;
  mix_info?: MixInfo$2;
  music: Music$5;
  mv_info: null;
  nearby_hot_comment: null;
  nickname_position: null;
  origin_comment_ids: null;
  origin_text_extra: null;
  original_images: null;
  packed_clips: null;
  position: null;
  prevent_download: boolean;
  promotions: null;
  rawdata: string;
  ref_tts_id_list: null;
  ref_voice_modify_id_list: null;
  relation_labels: null;
  reply_smart_emojis: null;
  share_info: ShareInfo$2;
  slides_music_beats: null;
  social_tag_list: null;
  standard_bar_info_list: null;
  statistics: Statistics$5;
  status: AwemeInfoStatus;
  suggest_words: SuggestWords$4;
  text_extra: TextExtra$4[];
  trends_infos: null;
  tts_id_list: null;
  uniqid_position: null;
  user_digged: number;
  video: Video$3;
  video_control: VideoControl$5;
  video_labels: null;
  video_tag: null;
  video_text: null;
  voice_modify_id_list: null;
  yumme_recreason: null;
  [property: string]: any;
};
type AnchorInfo$1 = {
  content: string;
  extra: string;
  icon: Icon$2;
  id: string;
  log_extra: string;
  mp_url: string;
  open_url: string;
  style_info: StyleInfo$1;
  title: string;
  title_tag: string;
  type: number;
  web_url: string;
  [property: string]: any;
};
type Icon$2 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type StyleInfo$1 = {
  default_icon: string;
  extra: string;
  scene_icon: string;
  [property: string]: any;
};
type Author$5 = {
  account_cert_info?: string;
  ad_cover_url: null;
  avatar_schema_list: null;
  avatar_thumb: AuthorAvatarThumb$3;
  ban_user_functions: null;
  batch_unfollow_contain_tabs: null;
  batch_unfollow_relation_desc: null;
  can_set_geofencing: null;
  card_entries: null;
  card_entries_not_display: null;
  card_sort_priority: null;
  cf_list: null;
  cha_list: null;
  contrail_list: null;
  cover_url: null;
  creator_tag_list: null;
  custom_verify: string;
  data_label_list: null;
  display_info: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  familiar_visitor_user: null;
  follow_status: number;
  follower_count: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  followers_detail: null;
  geofencing: null;
  homepage_bottom_toast: null;
  identity_labels: null;
  im_role_ids: null;
  interest_tags: null;
  item_list: null;
  link_item_list: null;
  need_points: null;
  new_story_cover: null;
  nickname: string;
  not_seen_item_id_list: null;
  not_seen_item_id_list_v2: null;
  offline_info_list: null;
  personal_tag_list: null;
  platform_sync_info: null;
  private_relation_list: null;
  profile_component_disabled: null;
  profile_mob_params: null;
  relative_users: null;
  room_data: string;
  room_id: number;
  room_id_str: string;
  sec_uid: string;
  secret: number;
  signature_extra: null;
  special_people_labels: null;
  text_extra: null;
  total_favorited: number;
  type_label: null;
  uid: string;
  user_permissions: null;
  user_tags: null;
  verification_permission_ids: null;
  white_cover_url: null;
  [property: string]: any;
};
type AuthorAvatarThumb$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DanmakuControl$4 = {
  activities: null;
  enable_danmaku: boolean;
  is_post_denied: boolean;
  post_denied_reason: string;
  post_privilege_level: number;
  [property: string]: any;
};
type EntertainmentProductInfo$5 = {
  biz: number;
  market_info: MarketInfo$5;
  sub_title: null;
  [property: string]: any;
};
type MarketInfo$5 = {
  limit_free: LimitFree$5;
  marketing_tag: null;
  [property: string]: any;
};
type LimitFree$5 = {
  in_free: boolean;
  [property: string]: any;
};
type ImpressionData$5 = {
  group_id_list_a: null;
  group_id_list_b: null;
  group_id_list_c: null;
  group_id_list_d: null;
  similar_id_list_a: number[];
  similar_id_list_b: number[];
  [property: string]: any;
};
type MixInfo$2 = {
  cover_url: Coverurl$4;
  extra: string;
  ids: null;
  mix_id: string;
  mix_name: string;
  mix_type: number;
  paid_episodes: null;
  statis: Statis$2;
  status: MixInfoStatus$2;
  watched_item: string;
  [property: string]: any;
};
type Coverurl$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Statis$2 = {
  collect_vv: number;
  current_episode: number;
  play_vv: number;
  updated_to_episode: number;
  [property: string]: any;
};
type MixInfoStatus$2 = {
  is_collected: number;
  status: number;
  [property: string]: any;
};
type Music$5 = {
  album: string;
  artist_user_infos: null;
  artists: null;
  author: string;
  author_position: null;
  avatar_thumb: MusicAvatarThumb$4;
  binded_challenge_id: number;
  collect_stat: number;
  cover_medium: CoverMedium$2;
  cover_thumb: CoverThumb$5;
  duration: number;
  external_song_info: null;
  extra: string;
  id: number;
  id_str: string;
  is_original: boolean;
  lyric_short_position: null;
  mid: string;
  music_chart_ranks: null;
  musician_user_infos: null;
  owner_id: string;
  owner_nickname: string;
  play_url: Playurl$5;
  position: null;
  sec_uid: string;
  status: number;
  tag_list: null;
  title: string;
  unshelve_countries: null;
  user_count: number;
  [property: string]: any;
};
type MusicAvatarThumb$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverMedium$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl$5 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type ShareInfo$2 = {
  share_desc: string;
  share_desc_info: string;
  share_link_desc: string;
  share_quote: string;
  share_title: string;
  share_url: string;
  [property: string]: any;
};
type Statistics$5 = {
  collect_count: number;
  comment_count: number;
  digg_count: number;
  download_count: number;
  forward_count: number;
  live_watch_count: number;
  play_count: number;
  share_count: number;
  [property: string]: any;
};
type AwemeInfoStatus = {
  allow_share: boolean;
  in_reviewing: boolean;
  is_delete: boolean;
  is_private: boolean;
  is_prohibited: boolean;
  part_see: number;
  private_status: number;
  review_result: ReviewResult$5;
  [property: string]: any;
};
type ReviewResult$5 = {
  review_status: number;
  [property: string]: any;
};
type SuggestWords$4 = {
  suggest_words: SuggestWord$4[];
  [property: string]: any;
};
type SuggestWord$4 = {
  extra_info: string;
  hint_text: string;
  icon_url: string;
  scene: string;
  words: Word$5[];
  [property: string]: any;
};
type Word$5 = {
  info: string;
  word: string;
  word_id: string;
  [property: string]: any;
};
type TextExtra$4 = {
  end: number;
  hashtag_id: string;
  hashtag_name: string;
  is_commerce: boolean;
  sec_uid?: string;
  start: number;
  type: number;
  user_id?: string;
  [property: string]: any;
};
type Video$3 = {
  big_thumbs: BigThumb$3[];
  bit_rate: BitRate$3[];
  bit_rate_audio: BitRateAudio$2[];
  cover: Cover$4;
  download_addr: DownloadAddr$3;
  download_suffix_logo_addr: DownloadSuffixLogoAddr$3;
  duration: number;
  dynamic_cover: DynamicCover$4;
  gaussian_cover: GaussianCover$4;
  has_download_suffix_logo_addr: boolean;
  height: number;
  meta: string;
  misc_download_addrs?: string;
  origin_cover: OriginCover$2;
  play_addr: VideoPlayAddr$2;
  play_addr_265: PlayAddr265$4;
  play_addr_lowbr: PlayAddrLowbr$2;
  ratio: string;
  raw_cover: RawCover$1;
  tags: null;
  video_model: string;
  width: number;
  [property: string]: any;
};
type BigThumb$3 = {
  duration: number;
  fext: string;
  img_num: number;
  img_url: string;
  img_urls: string[];
  img_x_len: number;
  img_x_size: number;
  img_y_len: number;
  img_y_size: number;
  interval: number;
  uri: string;
  uris: string[];
  [property: string]: any;
};
type BitRate$3 = {
  bit_rate: number;
  format: string;
  FPS: number;
  gear_name: string;
  HDR_bit: string;
  HDR_type: string;
  is_bytevc1: number;
  is_h265: number;
  play_addr: BitRatePlayAddr$3;
  quality_type: number;
  video_extra: string;
  [property: string]: any;
};
type BitRatePlayAddr$3 = {
  data_size: number;
  file_cs?: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type BitRateAudio$2 = {
  audio_extra: string;
  audio_meta: AudioMeta$2;
  audio_quality: number;
  [property: string]: any;
};
type AudioMeta$2 = {
  bitrate: number;
  codec_type: string;
  encoded_type: string;
  file_hash: string;
  file_id: string;
  format: string;
  fps: number;
  logo_type: string;
  media_type: string;
  quality: string;
  quality_desc: string;
  size: number;
  sub_info: string;
  url_list: UrlList$2;
  [property: string]: any;
};
type UrlList$2 = {
  backup_url: string;
  fallback_url: string;
  main_url: string;
  [property: string]: any;
};
type Cover$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadAddr$3 = {
  data_size: number;
  file_cs: string;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadSuffixLogoAddr$3 = {
  data_size: number;
  file_cs: string;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DynamicCover$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type GaussianCover$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type OriginCover$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoPlayAddr$2 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddr265$4 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddrLowbr$2 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type RawCover$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoControl$5 = {
  allow_douplus: boolean;
  allow_download: boolean;
  allow_duet: boolean;
  allow_dynamic_wallpaper: boolean;
  allow_music: boolean;
  allow_react: boolean;
  allow_record: boolean;
  allow_share: boolean;
  allow_stitch: boolean;
  disable_record_reason: string;
  download_ignore_visibility: boolean;
  download_info: DownloadInfo$5;
  draft_progress_bar: number;
  duet_ignore_visibility: boolean;
  duet_info: DuetInfo$5;
  prevent_download_type: number;
  share_grayed: boolean;
  share_ignore_visibility: boolean;
  share_type: number;
  show_progress_bar: number;
  timer_info: TimerInfo;
  timer_status: number;
  [property: string]: any;
};
type DownloadInfo$5 = {
  fail_info?: DownloadInfoFailInfo$3;
  level: number;
  [property: string]: any;
};
type DownloadInfoFailInfo$3 = {
  code: number;
  msg: string;
  reason: string;
  [property: string]: any;
};
type DuetInfo$5 = {
  fail_info?: DuetInfoFailInfo$3;
  level: number;
  [property: string]: any;
};
type DuetInfoFailInfo$3 = {
  code: number;
  msg?: string;
  reason: string;
  [property: string]: any;
};
type TimerInfo = {
  timer_status: number;
  [property: string]: any;
};
type Extra$3 = {
  fatal_item_ids: string[];
  logid: string;
  now: number;
  scenes: null;
  search_request_id: string;
  [property: string]: any;
};
type GlobalDoodleConfig = {
  filter_settings: FilterSetting[];
  keyword: string;
  [property: string]: any;
};
type FilterSetting = {
  android_version: number;
  default_index: number;
  enable_huo_shan: boolean;
  enable_lite: boolean;
  huoshan_android_version: number;
  huoshan_ios_version: number;
  ios_version: number;
  items: Item$3[];
  lite_android_version: number;
  lite_ios_version: number;
  log_name: string;
  name: string;
  search_less_text: SearchLessText;
  search_nil_text: SearchNilText;
  title: string;
  [property: string]: any;
};
type Item$3 = {
  log_value: string;
  show_dot: number;
  title: string;
  value: string;
  [property: string]: any;
};
type SearchLessText = {
  info: string;
  jump_text: string;
  [property: string]: any;
};
type SearchNilText = {
  info: string;
  jump_text: string;
  [property: string]: any;
};
type LogPb$6 = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/SlidesWork.d.ts
/** 合辑作品 */
type DySlidesWork = {
  aweme_detail: AwemeDetail$1;
  log_pb: LogPb$5;
  status_code: number;
  [property: string]: any;
};
type AwemeDetail$1 = {
  activity_video_type: number;
  anchors: null;
  authentication_token: string;
  author: Author$4;
  author_mask_tag: number;
  author_user_id: number;
  aweme_control: AwemeControl$3;
  aweme_id: string;
  aweme_listen_struct: AwemeListenStruct$4;
  aweme_type: number;
  aweme_type_tags: string;
  boost_status: number;
  can_cache_to_local: boolean;
  caption: string;
  category_da: number;
  cf_recheck_ts: number;
  challenge_position: null;
  chapter_list: null;
  clip_paging: ClipPaging$2;
  collect_stat: number;
  collection_corner_mark: number;
  comment_gid: number;
  comment_list: null;
  comment_permission_info: CommentPermissionInfo$4;
  commerce_config_data: null;
  component_control: ComponentControl$4;
  component_info_v2: string;
  cover_labels: null;
  create_scale_type: string[];
  create_time: number;
  desc: string;
  disable_relation_bar: number;
  dislike_dimension_list: null;
  dislike_dimension_list_v2: null;
  distribute_circle: DistributeCircle$4;
  duet_aggregate_in_music_tab: boolean;
  duration: number;
  ecom_comment_atmosphere_type: number;
  enable_comment_sticker_rec: boolean;
  entertainment_product_info: EntertainmentProductInfo$4;
  fall_card_struct: FallCardStruct$2;
  feed_comment_config: FeedCommentConfig$4;
  flash_mob_trends: number;
  friend_interaction: number;
  friend_recommend_info: {
    [key: string]: any;
  };
  game_tag_info: GameTagInfo$4;
  geofencing: string[];
  geofencing_regions: null;
  group_id: string;
  guide_scene_info: {
    [key: string]: any;
  };
  hybrid_label: null;
  image_album_music_info: ImageAlbumMusicInfo$4;
  image_comment: {
    [key: string]: any;
  };
  image_crop_ctrl: number;
  image_infos: null;
  image_list: null;
  images: Image$1[];
  img_bitrate: null;
  impression_data: ImpressionData$4;
  incentive_item_type: number;
  interaction_stickers: null;
  is_24_story: number;
  is_ads: boolean;
  is_collects_selected: number;
  is_duet_sing: boolean;
  is_image_beat: boolean;
  is_life_item: boolean;
  is_multi_content: number;
  is_share_post: boolean;
  is_slides: boolean;
  is_slides_beat: number;
  is_story: number;
  is_top: number;
  is_use_music: boolean;
  item_title: string;
  item_warn_notification: ItemWarnNotification$4;
  label_top_text: null;
  libfinsert_task_id: string;
  long_video: null;
  mark_largely_following: boolean;
  media_type: number;
  music: Music$4;
  nickname_position: null;
  origin_comment_ids: null;
  origin_duet_resource_uri: string;
  origin_text_extra: string[];
  original: number;
  original_images: null;
  packed_clips: null;
  personal_page_botton_diagnose_style: number;
  photo_search_entrance: PhotoSearchEntrance$4;
  play_progress: PlayProgress$4;
  position: null;
  preview_title: string;
  preview_video_status: number;
  promotions: string[];
  publish_plus_alienation: PublishPlusAlienation$4;
  rate: number;
  region: string;
  relation_labels: null;
  risk_infos: RiskInfos$4;
  seo_info: SeoInfo;
  series_paid_info: SeriesPaidInfo$4;
  share_info: AwemeDetailShareInfo$1;
  share_rec_extra: string;
  share_url: string;
  shoot_way: string;
  should_open_ad_report: boolean;
  show_follow_button: {
    [key: string]: any;
  };
  social_tag_list: null;
  statistics: Statistics$4;
  status: Status$2;
  suggest_words: SuggestWords$3;
  text_extra: TextExtra$3[];
  uniqid_position: null;
  user_digged: number;
  user_recommend_status: number;
  video: AwemeDetailVideo;
  video_control: VideoControl$4;
  video_game_data_channel_config: {
    [key: string]: any;
  };
  video_labels: null;
  video_share_edit_status: number;
  video_tag: VideoTag$4[];
  video_text: string[];
  visual_search_info: VisualSearchInfo$4;
  xigua_base_info: XiguaBaseInfo$4;
  [property: string]: any;
};
type Author$4 = {
  account_cert_info: string;
  avatar_thumb: AvatarThumb$1;
  awemehts_greet_info: string;
  cf_list: null;
  close_friend_type: number;
  contacts_status: number;
  contrail_list: null;
  cover_url: Coverurl$3[];
  create_time: number;
  custom_verify: string;
  data_label_list: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  favoriting_count: number;
  follow_status: number;
  follower_count: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  following_count: number;
  im_role_ids: null;
  is_ad_fake: boolean;
  is_blocked_v2: boolean;
  is_blocking_v2: boolean;
  is_cf: number;
  live_high_value: number;
  mate_add_permission: number;
  max_follower_count: number;
  nickname: string;
  offline_info_list: null;
  personal_tag_list: null;
  prevent_download: boolean;
  risk_notice_text: string;
  sec_uid: string;
  secret: number;
  share_info: AuthorShareInfo$4;
  short_id: string;
  signature: string;
  signature_extra: null;
  special_follow_status: number;
  special_people_labels: null;
  status: number;
  text_extra: null;
  total_favorited: number;
  uid: string;
  unique_id: string;
  user_age: number;
  user_canceled: boolean;
  user_permissions: null;
  verification_type: number;
  [property: string]: any;
};
type AvatarThumb$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverurl$3 = {
  height?: number;
  uri?: string;
  url_list?: string[];
  width?: number;
  [property: string]: any;
};
type AuthorShareInfo$4 = {
  share_desc: string;
  share_desc_info: string;
  share_qrcode_url: ShareQrcodeurl$5;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ShareQrcodeurl$5 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AwemeControl$3 = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type AwemeListenStruct$4 = {
  trace_info: string;
  [property: string]: any;
};
type ClipPaging$2 = {
  direct: number;
  has_more: boolean;
  source: string;
  [property: string]: any;
};
type CommentPermissionInfo$4 = {
  can_comment: boolean;
  comment_permission_status: number;
  item_detail_entry: boolean;
  press_entry: boolean;
  toast_guide: boolean;
  [property: string]: any;
};
type ComponentControl$4 = {
  data_source_url: string;
  [property: string]: any;
};
type DistributeCircle$4 = {
  campus_block_interaction: boolean;
  distribute_type: number;
  is_campus: boolean;
  [property: string]: any;
};
type EntertainmentProductInfo$4 = {
  market_info: MarketInfo$4;
  [property: string]: any;
};
type MarketInfo$4 = {
  limit_free: LimitFree$4;
  [property: string]: any;
};
type LimitFree$4 = {
  in_free: boolean;
  [property: string]: any;
};
type FallCardStruct$2 = {
  recommend_reason_v2: string;
  [property: string]: any;
};
type FeedCommentConfig$4 = {
  author_audit_status: number;
  input_config_text: string;
  [property: string]: any;
};
type GameTagInfo$4 = {
  is_game: boolean;
  [property: string]: any;
};
type ImageAlbumMusicInfo$4 = {
  begin_time: number;
  end_time: number;
  volume: number;
  [property: string]: any;
};
type Image$1 = {
  clip_type: number;
  download_url_list: string[];
  height: number;
  uri: string;
  url_list: string[];
  video: ImageVideo$2;
  width: number;
  [property: string]: any;
};
type ImageVideo$2 = {
  big_thumbs: string[];
  bit_rate: BitRate$2[];
  bit_rate_audio: null;
  cdn_url_expired: number;
  cover: PurpleCover$2;
  download_addr: DownloadAddr$2;
  download_suffix_logo_addr: DownloadSuffixLogoAddr$2;
  duration: number;
  has_download_suffix_logo_addr: boolean;
  has_watermark: boolean;
  height: number;
  is_bytevc1: number;
  is_callback: boolean;
  is_h265: number;
  is_source_HDR: number;
  meta: string;
  need_set_token: boolean;
  origin_cover: PurpleOriginCover$2;
  play_addr: PurplePlayAddr$2;
  play_addr_h264: PlayAddrH264$2;
  play_addr_lowbr: PlayAddrLowbr$1;
  ratio: string;
  tags: null;
  width: number;
  [property: string]: any;
};
type BitRate$2 = {
  bit_rate: number;
  format: string;
  FPS: number;
  gear_name: string;
  HDR_bit: string;
  HDR_type: string;
  is_bytevc1: number;
  is_h265: number;
  play_addr: BitRatePlayAddr$2;
  quality_type: number;
  video_extra: string;
  [property: string]: any;
};
type BitRatePlayAddr$2 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleCover$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadAddr$2 = {
  data_size: number;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadSuffixLogoAddr$2 = {
  data_size: number;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleOriginCover$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurplePlayAddr$2 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddrH264$2 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddrLowbr$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type ImpressionData$4 = {
  group_id_list_a: string[];
  group_id_list_b: string[];
  group_id_list_c: number[];
  similar_id_list_a: null;
  similar_id_list_b: null;
  [property: string]: any;
};
type ItemWarnNotification$4 = {
  content: string;
  show: boolean;
  type: number;
  [property: string]: any;
};
type Music$4 = {
  album: string;
  artist_user_infos: null;
  artists: string[];
  audition_duration: number;
  author: string;
  author_deleted: boolean;
  author_position: null;
  binded_challenge_id: number;
  can_background_play: boolean;
  collect_stat: number;
  cover_color_hsv: CoverColorHsv$2;
  cover_hd: Coverhd$4;
  cover_large: CoverLarge$4;
  cover_medium: CoverMedium$1;
  cover_thumb: CoverThumb$4;
  dmv_auto_show: boolean;
  dsp_status: number;
  duration: number;
  end_time: number;
  external_song_info: string[];
  extra: string;
  id: number;
  id_str: string;
  is_audio_url_with_cookie: boolean;
  is_commerce_music: boolean;
  is_del_video: boolean;
  is_matched_metadata: boolean;
  is_original: boolean;
  is_original_sound: boolean;
  is_pgc: boolean;
  is_restricted: boolean;
  is_video_self_see: boolean;
  lyric_short_position: null;
  mid: string;
  music_chart_ranks: null;
  music_collect_count: number;
  music_cover_atmosphere_color_value: string;
  music_status: number;
  musician_user_infos: null;
  mute_share: boolean;
  offline_desc: string;
  owner_handle: string;
  owner_nickname: string;
  pgc_music_type: number;
  play_url: Playurl$4;
  position: null;
  prevent_download: boolean;
  prevent_item_download_status: number;
  preview_end_time: number;
  preview_start_time: number;
  reason_type: number;
  redirect: boolean;
  schema_url: string;
  search_impr: SearchImpr$3;
  shoot_duration: number;
  song: Song$3;
  source_platform: number;
  start_time: number;
  status: number;
  strong_beat_url: StrongBeaturl$4;
  tag_list: null;
  title: string;
  unshelve_countries: null;
  user_count: number;
  video_duration: number;
  [property: string]: any;
};
type CoverColorHsv$2 = {
  h: number;
  s: number;
  v: number;
  [property: string]: any;
};
type Coverhd$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverLarge$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverMedium$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl$4 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type SearchImpr$3 = {
  entity_id: string;
  [property: string]: any;
};
type Song$3 = {
  artists: null;
  chorus: Chorus$2;
  id: number;
  id_str: string;
  title: string;
  [property: string]: any;
};
type Chorus$2 = {
  duration_ms: number;
  start_ms: number;
  [property: string]: any;
};
type StrongBeaturl$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PhotoSearchEntrance$4 = {
  ecom_type: number;
  [property: string]: any;
};
type PlayProgress$4 = {
  last_modified_time: number;
  play_progress: number;
  [property: string]: any;
};
type PublishPlusAlienation$4 = {
  alienation_type: number;
  [property: string]: any;
};
type RiskInfos$4 = {
  content: string;
  risk_sink: boolean;
  type: number;
  vote: boolean;
  warn: boolean;
  [property: string]: any;
};
type SeoInfo = {
  ocr_content: string;
  [property: string]: any;
};
type SeriesPaidInfo$4 = {
  item_price: number;
  series_paid_status: number;
  [property: string]: any;
};
type AwemeDetailShareInfo$1 = {
  share_desc: string;
  share_desc_info: string;
  share_link_desc: string;
  share_url: string;
  [property: string]: any;
};
type Statistics$4 = {
  admire_count: number;
  aweme_id: string;
  collect_count: number;
  comment_count: number;
  digg_count: number;
  play_count: number;
  share_count: number;
  [property: string]: any;
};
type Status$2 = {
  allow_share: boolean;
  aweme_id: string;
  in_reviewing: boolean;
  is_delete: boolean;
  is_prohibited: boolean;
  listen_video_status: number;
  part_see: number;
  private_status: number;
  review_result: ReviewResult$4;
  [property: string]: any;
};
type ReviewResult$4 = {
  review_status: number;
  [property: string]: any;
};
type SuggestWords$3 = {
  suggest_words: SuggestWord$3[];
  [property: string]: any;
};
type SuggestWord$3 = {
  hint_text?: string;
  icon_url?: string;
  scene?: string;
  words?: Word$4[];
  [property: string]: any;
};
type Word$4 = {
  info?: string;
  word?: string;
  word_id?: string;
  [property: string]: any;
};
type TextExtra$3 = {
  caption_end: number;
  caption_start: number;
  end: number;
  hashtag_id: string;
  hashtag_name: string;
  is_commerce: boolean;
  start: number;
  type: number;
  [property: string]: any;
};
type AwemeDetailVideo = {
  audio: {
    [key: string]: any;
  };
  big_thumbs: null;
  bit_rate_audio: null;
  cover: FluffyCover$2;
  duration: number;
  has_watermark: boolean;
  height: number;
  is_h265: number;
  meta: string;
  origin_cover: FluffyOriginCover$2;
  play_addr: FluffyPlayAddr$2;
  ratio: string;
  width: number;
  [property: string]: any;
};
type FluffyCover$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyOriginCover$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyPlayAddr$2 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoControl$4 = {
  allow_douplus: boolean;
  allow_download: boolean;
  allow_duet: boolean;
  allow_dynamic_wallpaper: boolean;
  allow_music: boolean;
  allow_react: boolean;
  allow_record: boolean;
  allow_share: boolean;
  allow_stitch: boolean;
  disable_record_reason: string;
  download_ignore_visibility: boolean;
  download_info: DownloadInfo$4;
  draft_progress_bar: number;
  duet_ignore_visibility: boolean;
  duet_info: DuetInfo$4;
  prevent_download_type: number;
  share_grayed: boolean;
  share_ignore_visibility: boolean;
  share_type: number;
  show_progress_bar: number;
  timer_info: {
    [key: string]: any;
  };
  timer_status: number;
  [property: string]: any;
};
type DownloadInfo$4 = {
  fail_info: DownloadInfoFailInfo$2;
  level: number;
  [property: string]: any;
};
type DownloadInfoFailInfo$2 = {
  code: number;
  msg: string;
  reason: string;
  [property: string]: any;
};
type DuetInfo$4 = {
  fail_info: DuetInfoFailInfo$2;
  level: number;
  [property: string]: any;
};
type DuetInfoFailInfo$2 = {
  code: number;
  reason: string;
  [property: string]: any;
};
type VideoTag$4 = {
  level: number;
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type VisualSearchInfo$4 = {
  is_ecom_img: boolean;
  is_high_accuracy_ecom: boolean;
  is_high_recall_ecom: boolean;
  is_show_img_entrance: boolean;
  [property: string]: any;
};
type XiguaBaseInfo$4 = {
  item_id: number;
  star_altar_order_id: number;
  star_altar_type: number;
  status: number;
  [property: string]: any;
};
type LogPb$5 = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/SuggestWords.d.ts
type DySuggestWords = {
  data: Datum$1[];
  errno: string;
  extra: Extra$2;
  log_id: string;
  msg: string;
  real_log_id: string;
  StabilityStatistics: StabilityStatistics;
  [property: string]: any;
};
type StabilityStatistics = {
  1: string;
  [property: string]: any;
};
type Datum$1 = {
  params?: DatumParams;
  source?: string;
  type?: string;
  words?: Word$3[];
  [property: string]: any;
};
type DatumParams = {
  extra_info: PurpleExtraInfo;
  from_gid: string;
  impr_id: string;
  query_id: string;
  [property: string]: any;
};
type PurpleExtraInfo = {
  msg: string;
  qrec_channel: string;
  qrec_channel_is_aweme: string;
  src_comment_id: string;
  src_group_id: string;
  [property: string]: any;
};
type Word$3 = {
  id: string;
  params: WordParams;
  word: string;
  [property: string]: any;
};
type WordParams = {
  extra_info: FluffyExtraInfo;
  from_gid: string;
  reason: string;
  [property: string]: any;
};
type FluffyExtraInfo = {
  mark: string;
  rel_info: string;
  [property: string]: any;
};
type Extra$2 = {
  call_per_refresh: string;
  qrec_extra: string;
  RespFrom: string;
  time_cost: TimeCost;
  [property: string]: any;
};
type TimeCost = {
  call_rpc_time: string;
  init_time: string;
  server_engine_cost: string;
  stream_inner: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/UserFavoriteList.d.ts
type UserFavoriteList = {
  aweme_list: AwemeList$2[];
  has_more: number;
  log_pb: LogPb$4;
  max_cursor: number;
  sec_uid: string;
  status_code: number;
  uid: string;
  [property: string]: any;
};
type AwemeList$2 = {
  activity_video_type: number;
  anchors: null;
  authentication_token: string;
  author: Author$3;
  author_mask_tag: number;
  author_user_id: number;
  aweme_acl: Awemeacl$1;
  aweme_control: AwemeControl$2;
  aweme_id: string;
  aweme_listen_struct: AwemeListenStruct$3;
  aweme_type: number;
  aweme_type_tags: string;
  boost_status: number;
  can_cache_to_local: boolean;
  caption: string;
  cf_assets_type: number;
  challenge_position: null;
  chapter_list: null;
  clip_paging: ClipPaging$1;
  collect_stat: number;
  collection_corner_mark: number;
  comment_gid: number;
  comment_list: null;
  comment_permission_info: CommentPermissionInfo$3;
  commerce_config_data: null;
  component_control: ComponentControl$3;
  component_info_v2: string;
  cooperation_info?: CooperationInfo$1;
  cover_labels: null;
  create_scale_type: string[];
  create_time: number;
  danmaku_control: DanmakuControl$3;
  desc: string;
  disable_relation_bar: number;
  distribute_circle: DistributeCircle$3;
  douplus_user_type: number;
  duet_aggregate_in_music_tab: boolean;
  duration: number;
  enable_comment_sticker_rec: boolean;
  enable_decorated_emoji: boolean;
  ent_log_extra: EntLogExtra$1;
  entertainment_product_info: EntertainmentProductInfo$3;
  entertainment_recommend_info: string;
  entertainment_video_paid_way: EntertainmentVideoPaidWay$1;
  entertainment_video_type: number;
  feed_comment_config: FeedCommentConfig$3;
  flash_mob_trends: number;
  follow_material_info: string;
  follow_shoot_clip_info: FollowShootClipInfo$1;
  friend_recommend_info: FriendRecommendInfo$1;
  galileo_pad_textcrop: GalileoPadTextcrop$1;
  game_tag_info: GameTagInfo$3;
  geofencing: string[];
  geofencing_regions: null;
  group_id: string;
  horizontal_type: number;
  hybrid_label: null;
  image_album_music_info: ImageAlbumMusicInfo$3;
  image_comment: {
    [key: string]: any;
  };
  image_crop_ctrl: number;
  image_infos: null;
  image_item_quality_level: number;
  image_list: null;
  images: Image[] | null;
  img_bitrate: any[] | null;
  impression_data: ImpressionData$3;
  interaction_stickers: null;
  is_24_story: number;
  is_25_story: number;
  is_ads: boolean;
  is_collects_selected: number;
  is_duet_sing: boolean;
  is_from_ad_auth: boolean;
  is_image_beat: boolean;
  is_life_item: boolean;
  is_moment_history: number;
  is_moment_story: number;
  is_multi_content: number;
  is_new_text_mode: number;
  is_share_post: boolean;
  is_slides: boolean;
  is_slides_beat: number;
  is_story: number;
  is_subtitled: number;
  is_top: number;
  is_use_music: boolean;
  item_aigc_follow_shot: number;
  item_title: string;
  item_warn_notification: ItemWarnNotification$3;
  label_top_text: null;
  libfinsert_task_id: string;
  life_video_favorite_info: string;
  long_video: null;
  mark_largely_following: boolean;
  media_type: number;
  mix_info: MixInfo$1;
  music: Music$3;
  nickname_position: null;
  origin_comment_ids: null;
  origin_duet_resource_uri: string;
  original: number;
  original_images: null;
  packed_clips: null;
  personal_page_botton_diagnose_style: number;
  photo_search_entrance: PhotoSearchEntrance$3;
  play_progress: PlayProgress$3;
  position: null;
  prevent_download: boolean;
  product_genre_info: ProductGenreInfo$1;
  promotions: string[];
  publish_plus_alienation: PublishPlusAlienation$3;
  region: string;
  related_music_anchor: RelatedMusicAnchor$1;
  risk_infos: RiskInfos$3;
  sec_item_id: string;
  select_anchor_expanded_content: number;
  series_basic_info: {
    [key: string]: any;
  };
  series_paid_info: SeriesPaidInfo$3;
  share_info: AwemeListShareInfo$2;
  share_url: string;
  shoot_way: string;
  show_follow_button: {
    [key: string]: any;
  };
  social_tag_list: null;
  statistics: Statistics$3;
  status: AwemeListStatus$1;
  suggest_words: SuggestWords$2;
  text_extra: TextExtra$2[];
  trends_event_track: string;
  trends_infos: TrendsInfo$1[];
  uniqid_position: null;
  user_digged: number;
  user_recommend_status: number;
  video: AwemeListVideo$1;
  video_control: VideoControl$3;
  video_game_data_channel_config: {
    [key: string]: any;
  };
  video_labels: null;
  video_share_edit_status: number;
  video_tag: VideoTag$3[];
  video_text: null;
  visual_search_info: VisualSearchInfo$3;
  vtag_search: VtagSearch$2;
  xigua_base_info: XiguaBaseInfo$3;
  [property: string]: any;
};
type Author$3 = {
  account_cert_info?: string;
  avatar_thumb: AuthorAvatarThumb$2;
  custom_verify: string;
  enterprise_verify_reason: string;
  follow_status: number;
  follower_status: number;
  is_ad_fake: boolean;
  nickname: string;
  prevent_download: boolean;
  risk_notice_text: string;
  sec_uid: string;
  share_info: AuthorShareInfo$3;
  story25_comment: number;
  story_interactive: number;
  story_ttl: number;
  uid: string;
  [property: string]: any;
};
type AuthorAvatarThumb$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AuthorShareInfo$3 = {
  share_desc: string;
  share_desc_info: string;
  share_qrcode_url: ShareQrcodeurl$4;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ShareQrcodeurl$4 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Awemeacl$1 = {
  download_mask_panel: DownloadMaskPanel$1;
  [property: string]: any;
};
type DownloadMaskPanel$1 = {
  code: number;
  show_type: number;
  [property: string]: any;
};
type AwemeControl$2 = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type AwemeListenStruct$3 = {
  trace_info: string;
  [property: string]: any;
};
type ClipPaging$1 = {
  direct: number;
  has_more: boolean;
  source: string;
  [property: string]: any;
};
type CommentPermissionInfo$3 = {
  can_comment: boolean;
  comment_permission_status: number;
  item_detail_entry: boolean;
  press_entry: boolean;
  toast_guide: boolean;
  [property: string]: any;
};
type ComponentControl$3 = {
  data_source_url: string;
  [property: string]: any;
};
type CooperationInfo$1 = {
  accepted_nums: number;
  co_creator_nums: number;
  co_creators: CoCreator$1[];
  cursor: number;
  extra: string;
  tag: string;
  [property: string]: any;
};
type CoCreator$1 = {
  avatar_thumb?: CoCreatorAvatarThumb$1;
  custom_verify?: string;
  enterprise_verify_reason?: string;
  extra?: string;
  follow_status?: number;
  follower_count?: number;
  follower_status?: number;
  index?: number;
  invite_status?: number;
  nickname?: string;
  role_id?: number;
  role_title?: string;
  sec_uid?: string;
  uid?: string;
  [property: string]: any;
};
type CoCreatorAvatarThumb$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DanmakuControl$3 = {
  activities: Activity$3[];
  danmaku_cnt: number;
  enable_danmaku: boolean;
  first_danmaku_offset: number;
  is_post_denied: boolean;
  last_danmaku_offset: number;
  pass_through_params: string;
  post_denied_reason: string;
  post_privilege_level: number;
  skip_danmaku: boolean;
  smart_mode_decision: number;
  [property: string]: any;
};
type Activity$3 = {
  id: number;
  type: number;
  [property: string]: any;
};
type DistributeCircle$3 = {
  campus_block_interaction: boolean;
  distribute_type: number;
  is_campus: boolean;
  [property: string]: any;
};
type EntLogExtra$1 = {
  log_extra: string;
  [property: string]: any;
};
type EntertainmentProductInfo$3 = {
  market_info: MarketInfo$3;
  [property: string]: any;
};
type MarketInfo$3 = {
  limit_free: LimitFree$3;
  [property: string]: any;
};
type LimitFree$3 = {
  in_free: boolean;
  [property: string]: any;
};
type EntertainmentVideoPaidWay$1 = {
  enable_use_new_ent_data: boolean;
  paid_type: number;
  paid_ways: string[];
  [property: string]: any;
};
type FeedCommentConfig$3 = {
  audio_comment_permission: number;
  author_audit_status: number;
  common_flags: string;
  double_publish_limit: number;
  input_config_text: string;
  [property: string]: any;
};
type FollowShootClipInfo$1 = {
  clip_from_platform?: number;
  clip_from_user: number;
  clip_video_all: number;
  origin_clip_id?: number;
  [property: string]: any;
};
type FriendRecommendInfo$1 = {
  disable_friend_recommend_guide_label: boolean;
  friend_recommend_source: number;
  [property: string]: any;
};
type GalileoPadTextcrop$1 = {
  android_d_h_cut_ratio: number[];
  android_d_v_cut_ratio: number[];
  ipad_d_h_cut_ratio: number[];
  ipad_d_v_cut_ratio: number[];
  version: number;
  [property: string]: any;
};
type GameTagInfo$3 = {
  content_type_tag: ContentTypeTag$1;
  game_name_tag: GameNameTag$1;
  is_game: boolean;
  [property: string]: any;
};
type ContentTypeTag$1 = {
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type GameNameTag$1 = {
  game_id_list: string[];
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type ImageAlbumMusicInfo$3 = {
  begin_time: number;
  end_time: number;
  volume: number;
  [property: string]: any;
};
type Image = {
  clip_type: number;
  download_url_list: string[];
  height: number;
  is_new_text_mode: number;
  live_photo_type: number;
  uri: string;
  url_list: string[];
  video: ImageVideo$1;
  width: number;
  [property: string]: any;
};
type ImageVideo$1 = {
  big_thumbs: any[];
  bit_rate: PurpleBitRate[];
  bit_rate_audio: null;
  cdn_url_expired: number;
  cover: PurpleCover$1;
  download_addr: DownloadAddr$1;
  download_suffix_logo_addr: DownloadSuffixLogoAddr$1;
  duration: number;
  has_download_suffix_logo_addr: boolean;
  has_watermark: boolean;
  height: number;
  is_bytevc1: number;
  is_callback: boolean;
  is_h265: number;
  is_source_HDR: number;
  meta: string;
  need_set_token: boolean;
  origin_cover: PurpleOriginCover$1;
  play_addr: FluffyPlayAddr$1;
  play_addr_h264: PurplePlayAddrH264$1;
  play_addr_lowbr: PlayAddrLowbr;
  ratio: string;
  tags: null;
  width: number;
  [property: string]: any;
};
type PurpleBitRate = {
  bit_rate: number;
  format: string;
  FPS: number;
  gear_name: string;
  HDR_bit: string;
  HDR_type: string;
  is_bytevc1: number;
  is_h265: number;
  play_addr: PurplePlayAddr$1;
  quality_type: number;
  video_extra: string;
  [property: string]: any;
};
type PurplePlayAddr$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleCover$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadAddr$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadSuffixLogoAddr$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleOriginCover$1 = {
  height: number;
  uri: string;
  url_list: any[];
  width: number;
  [property: string]: any;
};
type FluffyPlayAddr$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurplePlayAddrH264$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddrLowbr = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type ImpressionData$3 = {
  group_id_list_a: number[];
  group_id_list_b: number[];
  group_id_list_c: string[];
  group_id_list_d: number[];
  similar_id_list_a: null;
  similar_id_list_b: null;
  [property: string]: any;
};
type ItemWarnNotification$3 = {
  content: string;
  show: boolean;
  type: number;
  [property: string]: any;
};
type MixInfo$1 = {
  cover_url: Coverurl$2;
  create_time: number;
  desc: string;
  enable_ad: number;
  extra: string;
  ids: null;
  is_iaa: number;
  is_serial_mix: number;
  mix_id: string;
  mix_name: string;
  mix_pic_type: number;
  mix_type: number;
  share_info: MixInfoShareInfo$1;
  statis: Statis$1;
  status: MixInfoStatus$1;
  update_time: number;
  watched_item: string;
  [property: string]: any;
};
type Coverurl$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MixInfoShareInfo$1 = {
  share_desc: string;
  share_desc_info: string;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type Statis$1 = {
  collect_vv: number;
  current_episode: number;
  play_vv: number;
  updated_to_episode: number;
  [property: string]: any;
};
type MixInfoStatus$1 = {
  is_collected: number;
  status: number;
  [property: string]: any;
};
type Music$3 = {
  album: string;
  artist_user_infos: null;
  artists: Artist$1[];
  audition_duration: number;
  author: string;
  author_deleted: boolean;
  author_position: null;
  author_status: number;
  avatar_large: AvatarLarge$3;
  avatar_medium: AvatarMedium$3;
  avatar_thumb: MusicAvatarThumb$3;
  binded_challenge_id: number;
  can_background_play: boolean;
  collect_stat: number;
  cover_color_hsv?: CoverColorHsv$1;
  cover_hd: Coverhd$3;
  cover_large: CoverLarge$3;
  cover_medium: MusicCoverMedium$2;
  cover_thumb: CoverThumb$3;
  dmv_auto_show: boolean;
  dsp_status: number;
  duration: number;
  end_time: number;
  external_song_info: string[];
  extra: string;
  id: number;
  id_str: string;
  is_audio_url_with_cookie: boolean;
  is_commerce_music: boolean;
  is_del_video: boolean;
  is_matched_metadata: boolean;
  is_original: boolean;
  is_original_sound: boolean;
  is_pgc: boolean;
  is_restricted: boolean;
  is_video_self_see: boolean;
  lyric_short_position: null;
  matched_pgc_sound: MatchedPgcSound$2;
  mid: string;
  music_chart_ranks: null;
  music_collect_count: number;
  music_cover_atmosphere_color_value: string;
  music_status: number;
  musician_user_infos: null;
  mute_share: boolean;
  offline_desc: string;
  owner_handle: string;
  owner_id: string;
  owner_nickname: string;
  pgc_music_type: number;
  play_url: Playurl$3;
  position: null;
  prevent_download: boolean;
  prevent_item_download_status: number;
  preview_end_time: number;
  preview_start_time: number;
  reason_type: number;
  redirect: boolean;
  schema_url: string;
  search_impr: SearchImpr$2;
  sec_uid: string;
  shoot_duration: number;
  show_origin_clip: boolean;
  song: Song$2;
  source_platform: number;
  start_time: number;
  status: number;
  strong_beat_url?: StrongBeaturl$3;
  tag_list: null;
  title: string;
  unshelve_countries: null;
  user_count: number;
  video_duration: number;
  [property: string]: any;
};
type Artist$1 = {
  avatar?: Avatar;
  enter_type?: number;
  handle?: string;
  is_verified?: boolean;
  nick_name?: string;
  sec_uid?: string;
  uid?: string;
  [property: string]: any;
};
type Avatar = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type AvatarLarge$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarMedium$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicAvatarThumb$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverColorHsv$1 = {
  h: number;
  s: number;
  v: number;
  [property: string]: any;
};
type Coverhd$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverLarge$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicCoverMedium$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MatchedPgcSound$2 = {
  author: string;
  cover_medium: MatchedPgcSoundCoverMedium$2;
  mixed_author: string;
  mixed_title: string;
  title: string;
  [property: string]: any;
};
type MatchedPgcSoundCoverMedium$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl$3 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type SearchImpr$2 = {
  entity_id: string;
  [property: string]: any;
};
type Song$2 = {
  artists: null;
  chorus?: Chorus$1;
  id: number;
  id_str: string;
  title?: string;
  [property: string]: any;
};
type Chorus$1 = {
  duration_ms: number;
  start_ms: number;
  [property: string]: any;
};
type StrongBeaturl$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PhotoSearchEntrance$3 = {
  ecom_type: number;
  [property: string]: any;
};
type PlayProgress$3 = {
  last_modified_time: number;
  play_progress: number;
  [property: string]: any;
};
type ProductGenreInfo$1 = {
  material_genre_sub_type_set: number[];
  product_genre_type: number;
  special_info: SpecialInfo$1;
  [property: string]: any;
};
type SpecialInfo$1 = {
  recommend_group_name: number;
  [property: string]: any;
};
type PublishPlusAlienation$3 = {
  alienation_type: number;
  [property: string]: any;
};
type RelatedMusicAnchor$1 = {
  extra: string;
  image_url: Imageurl$1;
  priority: number;
  schema_url: string;
  type: string;
  [property: string]: any;
};
type Imageurl$1 = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type RiskInfos$3 = {
  content: string;
  risk_sink: boolean;
  type: number;
  vote: boolean;
  warn: boolean;
  [property: string]: any;
};
type SeriesPaidInfo$3 = {
  item_price: number;
  series_paid_status: number;
  [property: string]: any;
};
type AwemeListShareInfo$2 = {
  share_link_desc: string;
  share_url: string;
  [property: string]: any;
};
type Statistics$3 = {
  collect_count: number;
  comment_count: number;
  digg_count: number;
  play_count: number;
  recommend_count: number;
  share_count: number;
  [property: string]: any;
};
type AwemeListStatus$1 = {
  allow_friend_recommend: boolean;
  allow_friend_recommend_guide: boolean;
  allow_self_recommend_to_friend: boolean;
  allow_share: boolean;
  enable_soft_delete: number;
  in_reviewing: boolean;
  is_delete: boolean;
  is_prohibited: boolean;
  listen_video_status: number;
  not_allow_soft_del_reason: string;
  part_see: number;
  private_status: number;
  review_result: ReviewResult$3;
  [property: string]: any;
};
type ReviewResult$3 = {
  review_status: number;
  [property: string]: any;
};
type SuggestWords$2 = {
  suggest_words: SuggestWord$2[];
  [property: string]: any;
};
type SuggestWord$2 = {
  extra_info: string;
  hint_text: string;
  icon_url: string;
  scene: string;
  words: Word$2[];
  [property: string]: any;
};
type Word$2 = {
  info: string;
  word: string;
  word_id: string;
  [property: string]: any;
};
type TextExtra$2 = {
  caption_end: number;
  caption_start: number;
  end: number;
  hashtag_id: string;
  hashtag_name: string;
  is_commerce: boolean;
  sec_uid: string;
  start: number;
  type: number;
  user_id: string;
  [property: string]: any;
};
type TrendsInfo$1 = {
  track_pass_through: string;
  [property: string]: any;
};
type AwemeListVideo$1 = {
  audio: {
    [key: string]: any;
  };
  big_thumbs: BigThumb$2[];
  bit_rate: FluffyBitRate[];
  bit_rate_audio: null;
  cover: FluffyCover$1;
  duration: number;
  dynamic_cover: DynamicCover$3;
  format: string;
  gaussian_cover: GaussianCover$3;
  height: number;
  horizontal_type: number;
  is_source_HDR: number;
  meta: string;
  origin_cover: FluffyOriginCover$1;
  play_addr: StickyPlayAddr$1;
  play_addr_265: PlayAddr265$3;
  play_addr_h264: FluffyPlayAddrH264$1;
  ratio: string;
  video_model: string;
  width: number;
  [property: string]: any;
};
type BigThumb$2 = {
  duration: number;
  fext: string;
  img_num: number;
  img_url: string;
  img_urls: string[];
  img_x_len: number;
  img_x_size: number;
  img_y_len: number;
  img_y_size: number;
  interval: number;
  uri: string;
  uris: string[];
  [property: string]: any;
};
type FluffyBitRate = {
  bit_rate: number;
  format: string;
  FPS: number;
  gear_name: string;
  HDR_bit: string;
  HDR_type: string;
  is_bytevc1: number;
  is_h265: number;
  play_addr: TentacledPlayAddr$1;
  quality_type: number;
  video_extra: string;
  [property: string]: any;
};
type TentacledPlayAddr$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyCover$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DynamicCover$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type GaussianCover$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyOriginCover$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type StickyPlayAddr$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddr265$3 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyPlayAddrH264$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoControl$3 = {
  allow_douplus: boolean;
  allow_download: boolean;
  allow_duet: boolean;
  allow_dynamic_wallpaper: boolean;
  allow_music: boolean;
  allow_react: boolean;
  allow_record: boolean;
  allow_share: boolean;
  allow_stitch: boolean;
  disable_record_reason: string;
  download_ignore_visibility: boolean;
  download_info: DownloadInfo$3;
  draft_progress_bar: number;
  duet_ignore_visibility: boolean;
  duet_info: DuetInfo$3;
  prevent_download_type: number;
  share_grayed: boolean;
  share_ignore_visibility: boolean;
  share_type: number;
  show_progress_bar: number;
  timer_info: {
    [key: string]: any;
  };
  timer_status: number;
  [property: string]: any;
};
type DownloadInfo$3 = {
  fail_info: DownloadInfoFailInfo$1;
  level: number;
  [property: string]: any;
};
type DownloadInfoFailInfo$1 = {
  code: number;
  msg: string;
  reason: string;
  [property: string]: any;
};
type DuetInfo$3 = {
  fail_info?: DuetInfoFailInfo$1;
  level: number;
  [property: string]: any;
};
type DuetInfoFailInfo$1 = {
  code: number;
  reason: string;
  [property: string]: any;
};
type VideoTag$3 = {
  level: number;
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type VisualSearchInfo$3 = {
  is_ecom_img: boolean;
  is_high_accuracy_ecom: boolean;
  is_high_recall_ecom: boolean;
  is_show_img_entrance: boolean;
  visual_search_longpress: number;
  [property: string]: any;
};
type VtagSearch$2 = {
  vtag_delay_ts: number;
  vtag_enable: boolean;
  [property: string]: any;
};
type XiguaBaseInfo$3 = {
  item_id: number;
  star_altar_order_id: number;
  star_altar_type: number;
  status: number;
  [property: string]: any;
};
type LogPb$4 = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/UserInfo.d.ts
type DyUserInfo = {
  extra: Extra$1;
  log_pb: LogPb$3;
  status_code: number;
  status_msg: null;
  user: User$5;
  [property: string]: any;
};
type Extra$1 = {
  fatal_item_ids: string[];
  logid: string;
  now: number;
  [property: string]: any;
};
type LogPb$3 = {
  impr_id: string;
  [property: string]: any;
};
type User$5 = {
  account_cert_info: string;
  apple_account: number;
  avatar_168x168: Avatar168X168;
  avatar_300x300: Avatar300X300;
  avatar_larger: AvatarLarger;
  avatar_medium: AvatarMedium$2;
  avatar_thumb: AvatarThumb;
  aweme_count: number;
  aweme_count_correction_threshold: number;
  birthday_hide_level: number;
  can_set_item_cover: boolean;
  can_show_group_card: number;
  card_entries: CardEntry[];
  city: null;
  close_friend_type: number;
  commerce_info: CommerceInfo$1;
  commerce_user_info: CommerceUserInfo;
  commerce_user_level: number;
  country: string;
  cover_and_head_image_info: CoverAndHeadImageInfo;
  cover_colour: string;
  cover_url: CoverurlElement$1[];
  custom_verify: string;
  district: null;
  dongtai_count: number;
  dynamic_cover: {
    [key: string]: any;
  };
  enable_ai_double: number;
  enable_wish: boolean;
  enterprise_user_info: string;
  enterprise_verify_reason: string;
  familiar_confidence: number;
  favorite_permission: number;
  favoriting_count: number;
  follow_status: number;
  follower_count: number;
  follower_request_status: number;
  follower_status: number;
  following_count: number;
  forward_count: number;
  gender: null;
  general_permission: GeneralPermission;
  has_e_account_role: boolean;
  has_subscription: boolean;
  im_primary_role_id: number;
  im_role_ids: number[];
  image_send_exempt: boolean;
  ins_id: string;
  ip_location: string;
  is_activity_user: boolean;
  is_ban: boolean;
  is_block: boolean;
  is_blocked: boolean;
  is_effect_artist: boolean;
  is_gov_media_vip: boolean;
  is_mix_user: boolean;
  is_not_show: boolean;
  is_series_user: boolean;
  is_sharing_profile_user: number;
  is_star: boolean;
  iso_country_code: string;
  life_story_block: LifeStoryBlock;
  live_commerce: boolean;
  live_status: number;
  mate_add_permission: number;
  mate_relation: MateRelation;
  max_follower_count: number;
  message_chat_entry: boolean;
  mix_count: number;
  mplatform_followers_count: number;
  new_friend_type: number;
  nickname: string;
  official_cooperation: OfficialCooperation;
  original_musician: OriginalMusician;
  pigeon_daren_status: string;
  pigeon_daren_warn_tag: string;
  profile_show: ProfileShow;
  profile_tab_type: number;
  province: null;
  public_collects_count: number;
  publish_landing_tab: number;
  r_fans_group_info: {
    [key: string]: any;
  };
  recommend_reason_relation: string;
  recommend_user_reason_source: number;
  risk_notice_text: string;
  role_id: string;
  room_id: number;
  room_id_str: string;
  school_name: null;
  sec_uid: string;
  secret: number;
  series_count: number;
  share_info: ShareInfo$1;
  short_id: string;
  show_favorite_list: boolean;
  show_subscription: boolean;
  signature: string;
  signature_display_lines: number;
  signature_language: string;
  social_real_relation_type: number;
  special_follow_status: number;
  story_tab_empty: boolean;
  sync_to_toutiao: number;
  tab_settings: TabSettings;
  total_favorited: number;
  total_favorited_correction_threshold: number;
  twitter_id: string;
  twitter_name: string;
  uid: string;
  unique_id: string;
  urge_detail: UrgeDetail;
  user_age: number;
  user_not_see: number;
  user_not_show: number;
  user_permissions: UserPermission[];
  verification_type: number;
  video_cover: {
    [key: string]: any;
  };
  video_icon: VideoIcon;
  watch_status: boolean;
  white_cover_url: WhiteCoverurl[];
  with_commerce_enterprise_tab_entry: boolean;
  with_commerce_entry: boolean;
  with_fusion_shop_entry: boolean;
  with_new_goods: boolean;
  youtube_channel_id: string;
  youtube_channel_title: string;
  [property: string]: any;
};
type Avatar168X168 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Avatar300X300 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarLarger = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarMedium$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarThumb = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CardEntry = {
  goto_url?: string;
  icon_dark?: IconDark;
  icon_light?: IconLight;
  sub_title?: string;
  title?: string;
  type?: number;
  [property: string]: any;
};
type IconDark = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type IconLight = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type CommerceInfo$1 = {
  challenge_list: null;
  head_image_list: null;
  offline_info_list: string[];
  smart_phone_list: null;
  task_list: null;
  [property: string]: any;
};
type CommerceUserInfo = {
  ad_revenue_rits: null;
  has_ads_entry: boolean;
  show_star_atlas_cooperation: boolean;
  star_atlas: number;
  [property: string]: any;
};
type CoverAndHeadImageInfo = {
  cover_list: null;
  profile_cover_list: ProfileCoverList[];
  [property: string]: any;
};
type ProfileCoverList = {
  cover_url?: ProfileCoverListCoverurl;
  dark_cover_color?: string;
  light_cover_color?: string;
  [property: string]: any;
};
type ProfileCoverListCoverurl = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type CoverurlElement$1 = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type GeneralPermission = {
  following_follower_list_toast: number;
  [property: string]: any;
};
type LifeStoryBlock = {
  life_story_block: boolean;
  [property: string]: any;
};
type MateRelation = {
  mate_apply_forward: number;
  mate_apply_reverse: number;
  mate_status: number;
  [property: string]: any;
};
type OfficialCooperation = {
  schema: string;
  text: string;
  track_type: string;
  [property: string]: any;
};
type OriginalMusician = {
  digg_count: number;
  music_count: number;
  music_used_count: number;
  [property: string]: any;
};
type ProfileShow = {
  identify_auth_infos: null;
  [property: string]: any;
};
type ShareInfo$1 = {
  bool_persist: number;
  life_share_ext: string;
  share_desc: string;
  share_image_url: ShareImageurl;
  share_qrcode_url: ShareQrcodeurl$3;
  share_title: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ShareImageurl = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type ShareQrcodeurl$3 = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type TabSettings = {
  private_tab: PrivateTab;
  [property: string]: any;
};
type PrivateTab = {
  private_tab_style: number;
  show_private_tab: boolean;
  [property: string]: any;
};
type UrgeDetail = {
  ctl_map: string;
  user_urged: number;
  [property: string]: any;
};
type UserPermission = {
  key?: string;
  value?: string;
  [property: string]: any;
};
type VideoIcon = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type WhiteCoverurl = {
  uri: string;
  url_list: string[];
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/UserLiveVideos.d.ts
type DyUserLiveVideos = {
  data: Data$3;
  extra: UserLiveVideosExtra;
  status_code: number;
  [property: string]: any;
};
type Data$3 = {
  data: Datum[];
  enter_mode: number;
  enter_room_id: string;
  extra: DataExtra;
  login_lead: LoginLead;
  partition_road_map: PartitionRoadMap;
  qrcode_url: string;
  room_status: number;
  shark_decision_conf: string;
  similar_rooms: SimilarRoom[];
  user: User$4;
  web_stream_url: WebStreamurl;
  [property: string]: any;
};
type Datum = {
  admin_user_ids?: number[];
  admin_user_ids_str?: string[];
  admin_user_open_ids?: string[];
  admin_user_open_ids_str?: string[];
  AnchorABMap?: AnchorABMap;
  basis?: Basis;
  cover?: DatumCover;
  ecom_data?: DatumEcomData;
  has_commerce_goods?: boolean;
  id_str?: string;
  like_count?: number;
  linker_detail?: LinkerDetail;
  linker_map?: {
    [key: string]: any;
  };
  live_room_mode?: number;
  mosaic_status?: number;
  mosaic_status_str?: string;
  others?: DatumOthers;
  owner?: DatumOwner;
  owner_open_id_str?: string;
  owner_user_id_str?: string;
  paid_live_data?: DatumPaidLiveData;
  req_user?: ReqUser;
  room_auth?: RoomAuth;
  room_cart?: RoomCart;
  room_view_stats?: DatumRoomViewStats;
  scene_type_info?: SceneTypeInfo;
  short_touch_area_config?: ShortTouchAreaConfig;
  stats?: DatumStats;
  status?: number;
  status_str?: string;
  stream_url?: DatumStreamurl;
  title?: string;
  toolbar_data?: ToolbarData;
  user_count_str?: string;
  [property: string]: any;
};
type AnchorABMap = {
  ab_admin_comment_on_wall: string;
  ab_friend_chat: string;
  admin_privilege_refine: string;
  allow_shared_to_fans: string;
  audience_linkmic_continue: string;
  audio_double_enlarge_enable: string;
  audio_room_subtitle_opt: string;
  battle_match_rebuild_anchor: string;
  big_party_enable_open_camera: string;
  chat_intercommunicate_multi_anchor: string;
  chat_intercommunicate_pk: string;
  double_enlarge_enable: string;
  ecom_room_disable_gift: string;
  enable_enter_by_sharing: string;
  enable_link_guest_enter: string;
  enter_message_tip_relation: string;
  enter_source_mark: string;
  frequently_chat_ab_value: string;
  friend_room_audio_tuning: string;
  friend_room_support_ns_mode: string;
  friend_share_video_feature_type: string;
  game_link_entrance: string;
  gift_hide_tip: string;
  guest_battle_crown_upgrade: string;
  guest_battle_expand: string;
  guest_battle_score_expand: string;
  guest_battle_upgrade: string;
  interact_anchor_guide: string;
  ktv_anchor_enable_add_all: string;
  ktv_auto_mute_self: string;
  ktv_challenge_minus_gift: string;
  ktv_component_new_midi: string;
  ktv_enable_avatar: string;
  ktv_enable_open_camera: string;
  ktv_fragment_song: string;
  ktv_grab_guide_song: string;
  ktv_guide_song_switch: string;
  ktv_kick_when_linker_full: string;
  ktv_mc_host_show_tag: string;
  ktv_new_challenge: string;
  ktv_room_atmosphere: string;
  ktv_singing_hot_rank: string;
  ktv_video_stream_optimize: string;
  ktv_want_listen_enable: string;
  linkmic_multi_chorus: string;
  linkmic_order_sing_search_fingerprint: string;
  linkmic_order_sing_upgrade: string;
  linkmic_starwish: string;
  live_anchor_enable_chorus: string;
  live_anchor_enable_custom_position: string;
  live_anchor_hit_new_audience_linkmic: string;
  live_anchor_hit_position_opt: string;
  live_anchor_hit_video_bid_paid: string;
  live_anchor_hit_video_teamfight: string;
  live_answer_on_wall: string;
  live_audience_linkmic_pre_apply_v2: string;
  live_dou_plus_enter: string;
  live_ktv_enable_beat: string;
  live_ktv_group: string;
  live_ktv_show_singer_icon: string;
  live_ktv_singing_challenge: string;
  live_linkmic_battle_optimize: string;
  live_linkmic_ktv_anchor_lyric_mode: string;
  live_linkmic_order_sing_micro_opt: string;
  live_linkmic_order_sing_v3: string;
  live_pc_helper_new_layout: string;
  live_room_manage_style: string;
  live_team_fight_flexible: string;
  live_video_enable_c_position: string;
  live_video_enable_self_discipline: string;
  live_video_host_identity_enable: string;
  live_video_share: string;
  lonely_room_enter_msg_unfold: string;
  mark_user: string;
  merge_ktv_mode_enable: string;
  merge_ktv_optimize_enable: string;
  opt_audience_linkmic: string;
  opt_paid_link_feature_switch: string;
  optran_paid_linkmic: string;
  order_sing_mv: string;
  play_mode_opt_24: string;
  ps_use_new_panel: string;
  radio_prepare_apply: string;
  room_double_like: string;
  self_discipline_v2: string;
  self_discipline_v3: string;
  social_share_video_adjust_volume: string;
  support_multiple_add_price: string;
  themed_competition_v2: string;
  traffic_strategy: string;
  video_equal_1v8fix_switch: string;
  video_ktv_challenge: string;
  video_talk_enable_avatar: string;
  [property: string]: any;
};
type Basis = {
  foreign_user_room: number;
  is_customize_audio_room: boolean;
  need_request_luckybox: number;
  next_ping: number;
  secret_room: number;
  [property: string]: any;
};
type DatumCover = {
  url_list: string[];
  [property: string]: any;
};
type DatumEcomData = {
  instant_type: number;
  reds_show_infos: string[];
  [property: string]: any;
};
type LinkerDetail = {
  accept_audience_pre_apply: boolean;
  big_party_layout_config_version: number;
  client_ui_info: string;
  enable_audience_linkmic: number;
  enlarge_guest_turn_on_source: number;
  feature_list: string[];
  forbid_apply_from_other: boolean;
  function_type: string;
  init_source: string;
  ktv_exhibit_mode: number;
  ktv_lyric_mode: string;
  linker_map_str: {
    [key: string]: any;
  };
  linker_play_modes: string[];
  linker_ui_layout: number;
  manual_open_ui: number;
  playmode_detail: {
    [key: string]: any;
  };
  [property: string]: any;
};
type DatumOthers = {
  anchor_together_live: AnchorTogetherLive;
  appointment_info: AppointmentInfo;
  deco_detail: {
    [key: string]: any;
  };
  lvideo_item_id: number;
  metric_tracker_data_list: string[];
  more_panel_info: MorePanelInfo;
  mosaic_version: number;
  programme: Programme;
  recognition_containers: RecognitionContainers;
  web_live_port_optimization: PurpleWebLivePortOptimization;
  web_skin: WebSkin;
  [property: string]: any;
};
type AnchorTogetherLive = {
  is_show: boolean;
  is_together_live: number;
  scene: number;
  schema_url: string;
  title: string;
  user_list: string[];
  [property: string]: any;
};
type AppointmentInfo = {
  appointment_id: number;
  is_subscribe: boolean;
  [property: string]: any;
};
type MorePanelInfo = {
  load_strategy: number;
  [property: string]: any;
};
type Programme = {
  enable_programme: boolean;
  [property: string]: any;
};
type RecognitionContainers = {
  recognition_candidates: string[];
  [property: string]: any;
};
type PurpleWebLivePortOptimization = {
  strategy_config: PurpleStrategyConfig;
  strategy_extra: string;
  [property: string]: any;
};
type PurpleStrategyConfig = {
  background: PurpleBackground;
  detail: PurpleDetail;
  tab: PurpleTab;
  [property: string]: any;
};
type PurpleBackground = {
  pause_monitor_duration: string;
  strategy_type: number;
  use_config_duration: boolean;
  [property: string]: any;
};
type PurpleDetail = {
  pause_monitor_duration: string;
  strategy_type: number;
  use_config_duration: boolean;
  [property: string]: any;
};
type PurpleTab = {
  pause_monitor_duration: string;
  strategy_type: number;
  use_config_duration: boolean;
  [property: string]: any;
};
type WebSkin = {
  enable_skin: boolean;
  [property: string]: any;
};
type DatumOwner = {
  avatar_thumb: PurpleAvatarThumb$2;
  follow_info: PurpleFollowInfo;
  foreign_user: number;
  id_str: string;
  nickname: string;
  open_id_str: string;
  sec_uid: string;
  subscribe: PurpleSubscribe;
  [property: string]: any;
};
type PurpleAvatarThumb$2 = {
  url_list: string[];
  [property: string]: any;
};
type PurpleFollowInfo = {
  follow_status: number;
  follow_status_str: string;
  [property: string]: any;
};
type PurpleSubscribe = {
  buy_type: number;
  identity_type: number;
  is_member: boolean;
  level: number;
  open: number;
  [property: string]: any;
};
type DatumPaidLiveData = {
  anchor_right: number;
  delivery: number;
  duration: number;
  max_preview_duration: number;
  need_delivery_notice: boolean;
  paid_type: number;
  pay_ab_type: number;
  privilege_info: {
    [key: string]: any;
  };
  privilege_info_map: {
    [key: string]: any;
  };
  view_right: number;
  [property: string]: any;
};
type ReqUser = {
  enter_user_device_type: number;
  user_share_room_score: number;
  [property: string]: any;
};
type RoomAuth = {
  AdminCommentWall: number;
  AnchorMission: number;
  AudioChat: number;
  Banner: number;
  BulletStyle: number;
  CanSellTicket: number;
  CastScreen: number;
  CastScreenExplicit: number;
  Chat: boolean;
  Collect: number;
  CommentWall: number;
  CommerceCard: number;
  CommerceComponent: number;
  Danmaku: boolean;
  DanmakuDefault: number;
  Denounce: number;
  Digg: boolean;
  Dislike: number;
  DonationSticker: number;
  DouPlus: number;
  DouPlusPopularityGem: number;
  DownloadVideo: number;
  EmojiOutside: number;
  EnterEffects: number;
  ExpandScreen: number;
  FansClub: number;
  FansGroup: number;
  FirstFeedHistChat: number;
  FixedChat: number;
  GamePointsPlaying: number;
  Gift: boolean;
  GiftAnchorMt: number;
  Highlights: number;
  HourRank: number;
  IndustryService: number;
  KtvOrderSong: number;
  Landscape: number;
  LandscapeChat: number;
  Like: number;
  LongTouch: number;
  LuckMoney: boolean;
  MissionCenter: number;
  MoreAnchor: number;
  MoreHistChat: number;
  MultiplierPlayback: number;
  OnlyTa: number;
  POI: boolean;
  Poster: number;
  Props: boolean;
  PublicScreen: number;
  QuizGamePointsPlaying: number;
  RecordScreen: number;
  RoomContributor: boolean;
  Seek: number;
  Selection: number;
  SelectionAlbum: number;
  Share: number;
  ShowGamePlugin: number;
  SpecialStyle: SpecialStyle;
  StrokeUpDownGuide: number;
  TaskBanner: number;
  Teleprompter: number;
  TimedShutdown: number;
  Topic: number;
  TypingCommentState: number;
  UpRightStatsFloatingLayer: number;
  UserCard: boolean;
  UserCorner: number;
  VerticalRank: number;
  VSGift: number;
  VSRank: number;
  VSTopic: number;
  [property: string]: any;
};
type SpecialStyle = {
  Chat: Chat;
  Like: Like;
  [property: string]: any;
};
type Chat = {
  AnchorSwitchForPaidLive: number;
  Content: string;
  ContentForPaidLive: string;
  OffType: number;
  UnableStyle: number;
  [property: string]: any;
};
type Like = {
  AnchorSwitchForPaidLive: number;
  Content: string;
  ContentForPaidLive: string;
  OffType: number;
  UnableStyle: number;
  [property: string]: any;
};
type RoomCart = {
  cart_icon: string;
  contain_cart: boolean;
  flash_total: number;
  show_cart: number;
  total: number;
  [property: string]: any;
};
type DatumRoomViewStats = {
  display_long: string;
  display_long_anchor: string;
  display_middle: string;
  display_middle_anchor: string;
  display_short: string;
  display_short_anchor: string;
  display_type: number;
  display_value: number;
  display_version: number;
  incremental: boolean;
  is_hidden: boolean;
  [property: string]: any;
};
type SceneTypeInfo = {
  commentary_type: boolean;
  is_desire_room: number;
  is_lasted_goods_room: number;
  is_life: boolean;
  is_protected_room: number;
  is_sub_orientation_vertical_room: number;
  is_union_live_room: boolean;
  [property: string]: any;
};
type ShortTouchAreaConfig = {
  elements: Elements;
  forbidden_types_map: {
    [key: string]: any;
  };
  strategy_feat_whitelist: string[];
  temp_state_condition_map: TempStateConditionMap;
  temp_state_global_condition: TempStateGlobalCondition;
  temp_state_strategy: TempStateStrategy;
  [property: string]: any;
};
type Elements = {
  1: Elements1;
  10: The10;
  12: The12;
  2: Elements2;
  22: The22;
  27: The27;
  3: Elements3;
  30: The30;
  4: Elements4;
  5: Elements5;
  6: Elements6;
  7: Elements7;
  8: Elements8;
  9: The9;
  [property: string]: any;
};
type Elements1 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type The10 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type The12 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type Elements2 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type The22 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type The27 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type Elements3 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type The30 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type Elements4 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type Elements5 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type Elements6 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type Elements7 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type Elements8 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type The9 = {
  priority: number;
  type: number;
  [property: string]: any;
};
type TempStateConditionMap = {
  1: TempStateConditionMap1;
  2: TempStateConditionMap2;
  3: TempStateConditionMap3;
  4: TempStateConditionMap4;
  5: TempStateConditionMap5;
  6: TempStateConditionMap6;
  7: TempStateConditionMap7;
  [property: string]: any;
};
type TempStateConditionMap1 = {
  minimum_gap: number;
  type: PurpleType;
  [property: string]: any;
};
type PurpleType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateConditionMap2 = {
  minimum_gap: number;
  type: FluffyType;
  [property: string]: any;
};
type FluffyType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateConditionMap3 = {
  minimum_gap: number;
  type: TentacledType;
  [property: string]: any;
};
type TentacledType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateConditionMap4 = {
  minimum_gap: number;
  type: StickyType;
  [property: string]: any;
};
type StickyType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateConditionMap5 = {
  minimum_gap: number;
  type: IndigoType;
  [property: string]: any;
};
type IndigoType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateConditionMap6 = {
  minimum_gap: number;
  type: IndecentType;
  [property: string]: any;
};
type IndecentType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateConditionMap7 = {
  minimum_gap: number;
  type: HilariousType;
  [property: string]: any;
};
type HilariousType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateGlobalCondition = {
  allow_count: number;
  duration_gap: number;
  ignore_strategy_types: number[];
  [property: string]: any;
};
type TempStateStrategy = {
  136: The136;
  141: The141;
  149: The149;
  152: The152;
  153: The153;
  159: The159;
  161: The161;
  210: The210;
  306: The306;
  307: The307;
  308: The308;
  311: The311;
  312: The312;
  313: The313;
  4: TempStateStrategy4;
  7: TempStateStrategy7;
  8: TempStateStrategy8;
  97: The97;
  [property: string]: any;
};
type The136 = {
  short_touch_type: number;
  strategy_map: The136_StrategyMap;
  [property: string]: any;
};
type The136_StrategyMap = {
  1: Purple1;
  2: Purple2;
  [property: string]: any;
};
type Purple1 = {
  duration: number;
  strategy_method: string;
  type: AmbitiousType;
  [property: string]: any;
};
type AmbitiousType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Purple2 = {
  duration: number;
  strategy_method: string;
  type: CunningType;
  [property: string]: any;
};
type CunningType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The141 = {
  short_touch_type: number;
  strategy_map: The141_StrategyMap;
  [property: string]: any;
};
type The141_StrategyMap = {
  1: Fluffy1;
  2: Fluffy2;
  3: Purple3;
  [property: string]: any;
};
type Fluffy1 = {
  duration: number;
  strategy_method: string;
  type: MagentaType;
  [property: string]: any;
};
type MagentaType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Fluffy2 = {
  duration: number;
  strategy_method: string;
  type: FriskyType;
  [property: string]: any;
};
type FriskyType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Purple3 = {
  duration: number;
  strategy_method: string;
  type: MischievousType;
  [property: string]: any;
};
type MischievousType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The149 = {
  short_touch_type: number;
  strategy_map: The149_StrategyMap;
  [property: string]: any;
};
type The149_StrategyMap = {
  1: Tentacled1;
  2: Tentacled2;
  [property: string]: any;
};
type Tentacled1 = {
  duration: number;
  strategy_method: string;
  type: BraggadociousType;
  [property: string]: any;
};
type BraggadociousType = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Tentacled2 = {
  duration: number;
  strategy_method: string;
  type: Type1;
  [property: string]: any;
};
type Type1 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The152 = {
  short_touch_type: number;
  strategy_map: The152_StrategyMap;
  [property: string]: any;
};
type The152_StrategyMap = {
  1: Sticky1;
  2: Sticky2;
  [property: string]: any;
};
type Sticky1 = {
  duration: number;
  strategy_method: string;
  type: Type2;
  [property: string]: any;
};
type Type2 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Sticky2 = {
  duration: number;
  strategy_method: string;
  type: Type3;
  [property: string]: any;
};
type Type3 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The153 = {
  short_touch_type: number;
  strategy_map: The153_StrategyMap;
  [property: string]: any;
};
type The153_StrategyMap = {
  1: Indigo1;
  2: Indigo2;
  4: Purple4;
  [property: string]: any;
};
type Indigo1 = {
  duration: number;
  strategy_method: string;
  type: Type4;
  [property: string]: any;
};
type Type4 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Indigo2 = {
  duration: number;
  strategy_method: string;
  type: Type5;
  [property: string]: any;
};
type Type5 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Purple4 = {
  duration: number;
  strategy_method: string;
  type: Type6;
  [property: string]: any;
};
type Type6 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The159 = {
  short_touch_type: number;
  strategy_map: The159_StrategyMap;
  [property: string]: any;
};
type The159_StrategyMap = {
  1: Indecent1;
  [property: string]: any;
};
type Indecent1 = {
  duration: number;
  strategy_method: string;
  type: Type7;
  [property: string]: any;
};
type Type7 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The161 = {
  short_touch_type: number;
  strategy_map: The161_StrategyMap;
  [property: string]: any;
};
type The161_StrategyMap = {
  1: Hilarious1;
  2: Indecent2;
  [property: string]: any;
};
type Hilarious1 = {
  duration: number;
  strategy_method: string;
  type: Type8;
  [property: string]: any;
};
type Type8 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Indecent2 = {
  duration: number;
  strategy_method: string;
  type: Type9;
  [property: string]: any;
};
type Type9 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The210 = {
  short_touch_type: number;
  strategy_map: The210_StrategyMap;
  [property: string]: any;
};
type The210_StrategyMap = {
  1: Ambitious1;
  [property: string]: any;
};
type Ambitious1 = {
  duration: number;
  strategy_method: string;
  type: Type10;
  [property: string]: any;
};
type Type10 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The306 = {
  short_touch_type: number;
  strategy_map: The306_StrategyMap;
  [property: string]: any;
};
type The306_StrategyMap = {
  3: Fluffy3;
  [property: string]: any;
};
type Fluffy3 = {
  duration: number;
  strategy_method: string;
  type: Type11;
  [property: string]: any;
};
type Type11 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The307 = {
  short_touch_type: number;
  strategy_map: The307_StrategyMap;
  [property: string]: any;
};
type The307_StrategyMap = {
  4: Fluffy4;
  [property: string]: any;
};
type Fluffy4 = {
  duration: number;
  strategy_method: string;
  type: Type12;
  [property: string]: any;
};
type Type12 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The308 = {
  short_touch_type: number;
  strategy_map: The308_StrategyMap;
  [property: string]: any;
};
type The308_StrategyMap = {
  5: Purple5;
  [property: string]: any;
};
type Purple5 = {
  duration: number;
  strategy_method: string;
  type: Type13;
  [property: string]: any;
};
type Type13 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The311 = {
  short_touch_type: number;
  strategy_map: The311_StrategyMap;
  [property: string]: any;
};
type The311_StrategyMap = {
  3: Tentacled3;
  [property: string]: any;
};
type Tentacled3 = {
  duration: number;
  strategy_method: string;
  type: Type14;
  [property: string]: any;
};
type Type14 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The312 = {
  short_touch_type: number;
  strategy_map: The312_StrategyMap;
  [property: string]: any;
};
type The312_StrategyMap = {
  1: Cunning1;
  [property: string]: any;
};
type Cunning1 = {
  duration: number;
  strategy_method: string;
  type: Type15;
  [property: string]: any;
};
type Type15 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The313 = {
  short_touch_type: number;
  strategy_map: The313_StrategyMap;
  [property: string]: any;
};
type The313_StrategyMap = {
  2: Hilarious2;
  [property: string]: any;
};
type Hilarious2 = {
  duration: number;
  strategy_method: string;
  type: Type16;
  [property: string]: any;
};
type Type16 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateStrategy4 = {
  short_touch_type: number;
  strategy_map: The4_StrategyMap;
  [property: string]: any;
};
type The4_StrategyMap = {
  1: Magenta1;
  2: Ambitious2;
  3: Sticky3;
  6: Purple6;
  7: Purple7;
  [property: string]: any;
};
type Magenta1 = {
  duration: number;
  strategy_method: string;
  type: Type17;
  [property: string]: any;
};
type Type17 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Ambitious2 = {
  duration: number;
  strategy_method: string;
  type: Type18;
  [property: string]: any;
};
type Type18 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Sticky3 = {
  duration: number;
  strategy_method: string;
  type: Type19;
  [property: string]: any;
};
type Type19 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Purple6 = {
  duration: number;
  strategy_method: string;
  type: Type20;
  [property: string]: any;
};
type Type20 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Purple7 = {
  duration: number;
  strategy_method: string;
  type: Type21;
  [property: string]: any;
};
type Type21 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateStrategy7 = {
  short_touch_type: number;
  strategy_map: The7_StrategyMap;
  [property: string]: any;
};
type The7_StrategyMap = {
  1: Frisky1;
  2: Cunning2;
  3: Indigo3;
  4: Tentacled4;
  5: Fluffy5;
  6: Fluffy6;
  [property: string]: any;
};
type Frisky1 = {
  duration: number;
  strategy_method: string;
  type: Type22;
  [property: string]: any;
};
type Type22 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Cunning2 = {
  duration: number;
  strategy_method: string;
  type: Type23;
  [property: string]: any;
};
type Type23 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Indigo3 = {
  duration: number;
  strategy_method: string;
  type: Type24;
  [property: string]: any;
};
type Type24 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Tentacled4 = {
  duration: number;
  strategy_method: string;
  type: Type25;
  [property: string]: any;
};
type Type25 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Fluffy5 = {
  duration: number;
  strategy_method: string;
  type: Type26;
  [property: string]: any;
};
type Type26 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Fluffy6 = {
  duration: number;
  strategy_method: string;
  type: Type27;
  [property: string]: any;
};
type Type27 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type TempStateStrategy8 = {
  short_touch_type: number;
  strategy_map: The8_StrategyMap;
  [property: string]: any;
};
type The8_StrategyMap = {
  1: Mischievous1;
  2: Magenta2;
  [property: string]: any;
};
type Mischievous1 = {
  duration: number;
  strategy_method: string;
  type: Type28;
  [property: string]: any;
};
type Type28 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Magenta2 = {
  duration: number;
  strategy_method: string;
  type: Type29;
  [property: string]: any;
};
type Type29 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type The97 = {
  short_touch_type: number;
  strategy_map: The97_StrategyMap;
  [property: string]: any;
};
type The97_StrategyMap = {
  1: Braggadocious1;
  2: Frisky2;
  3: Indecent3;
  5: Tentacled5;
  6: Tentacled6;
  7: Fluffy7;
  [property: string]: any;
};
type Braggadocious1 = {
  duration: number;
  strategy_method: string;
  type: Type30;
  [property: string]: any;
};
type Type30 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Frisky2 = {
  duration: number;
  strategy_method: string;
  type: Type31;
  [property: string]: any;
};
type Type31 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Indecent3 = {
  duration: number;
  strategy_method: string;
  type: Type32;
  [property: string]: any;
};
type Type32 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Tentacled5 = {
  duration: number;
  strategy_method: string;
  type: Type33;
  [property: string]: any;
};
type Type33 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Tentacled6 = {
  duration: number;
  strategy_method: string;
  type: Type34;
  [property: string]: any;
};
type Type34 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type Fluffy7 = {
  duration: number;
  strategy_method: string;
  type: Type35;
  [property: string]: any;
};
type Type35 = {
  priority: number;
  strategy_type: number;
  [property: string]: any;
};
type DatumStats = {
  like_count: number;
  total_user_desp: string;
  total_user_str: string;
  user_count_str: string;
  [property: string]: any;
};
type DatumStreamurl = {
  default_resolution: string;
  extra: PurpleExtra;
  flv_pull_url: PurpleFlvPullurl;
  hls_pull_url: string;
  hls_pull_url_map: PurplehlsPullurlMap;
  live_core_sdk_data: PurpleLiveCoresdkData;
  pull_datas: {
    [key: string]: any;
  };
  stream_orientation: number;
  [property: string]: any;
};
type PurpleExtra = {
  anchor_interact_profile: number;
  audience_interact_profile: number;
  bframe_enable: boolean;
  bitrate_adapt_strategy: number;
  bytevc1_enable: boolean;
  default_bitrate: number;
  fps: number;
  gop_sec: number;
  h265_enable: boolean;
  hardware_encode: boolean;
  height: number;
  max_bitrate: number;
  min_bitrate: number;
  roi: boolean;
  sw_roi: boolean;
  video_profile: number;
  width: number;
  [property: string]: any;
};
type PurpleFlvPullurl = {
  FULL_HD1: string;
  SD1: string;
  SD2: string;
  [property: string]: any;
};
type PurplehlsPullurlMap = {
  FULL_HD1: string;
  SD1: string;
  SD2: string;
  [property: string]: any;
};
type PurpleLiveCoresdkData = {
  pull_data: PurplePullData;
  [property: string]: any;
};
type PurplePullData = {
  options: PurpleOptions;
  stream_data: string;
  [property: string]: any;
};
type PurpleOptions = {
  default_quality: PurpleDefaultQuality;
  qualities: PurpleQuality[];
  [property: string]: any;
};
type PurpleDefaultQuality = {
  additional_content: string;
  disable: number;
  fps: number;
  level: number;
  name: string;
  resolution: string;
  sdk_key: string;
  v_bit_rate: number;
  v_codec: string;
  [property: string]: any;
};
type PurpleQuality = {
  additional_content: string;
  disable: number;
  fps: number;
  level: number;
  name: string;
  resolution: string;
  sdk_key: string;
  v_bit_rate: number;
  v_codec: string;
  [property: string]: any;
};
type ToolbarData = {
  entrance_list: EntranceList[];
  extra_info: ExtraInfo$1;
  landscape_up_right: string[];
  max_entrance_cnt: number;
  max_entrance_cnt_landscape: number;
  more_panel: MorePanel[];
  permutation: Permutation;
  skin_resource: {
    [key: string]: any;
  };
  [property: string]: any;
};
type EntranceList = {
  component_type: number;
  data_status: number;
  extra: string;
  group_id: number;
  icon: Icon$1;
  op_type: number;
  schema_url: string;
  show_type: number;
  text: string;
  [property: string]: any;
};
type Icon$1 = {
  avg_color: string;
  flex_setting_list: string[];
  height: number;
  image_type: number;
  is_animated: boolean;
  open_web_url: string;
  text_setting_list: string[];
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type ExtraInfo$1 = {
  game_promotion_coexist: number;
  [property: string]: any;
};
type MorePanel = {
  component_type: number;
  data_status: number;
  extra: string;
  group_id: number;
  op_type: number;
  schema_url: string;
  show_type: number;
  text: string;
  [property: string]: any;
};
type Permutation = {
  general: General;
  on_demand_component_list: string[];
  [property: string]: any;
};
type General = {
  ComponentSequence: number[];
  GroupPriority: number[];
  [property: string]: any;
};
type DataExtra = {
  digg_color: string;
  is_official_channel: boolean;
  pay_scores: string;
  signature: string;
  [property: string]: any;
};
type LoginLead = {
  is_login: boolean;
  items: {
    [key: string]: any;
  };
  level: number;
  [property: string]: any;
};
type PartitionRoadMap = {
  partition: PartitionRoadMapPartition;
  sub_partition: SubPartition;
  [property: string]: any;
};
type PartitionRoadMapPartition = {
  id_str: string;
  title: string;
  type: number;
  [property: string]: any;
};
type SubPartition = {
  partition: SubPartitionPartition;
  [property: string]: any;
};
type SubPartitionPartition = {
  id_str: string;
  title: string;
  type: number;
  [property: string]: any;
};
type SimilarRoom = {
  cover_type: number;
  is_recommend: number;
  room: Room;
  tag_name: string;
  title_type: number;
  uniq_id: string;
  web_rid: string;
  [property: string]: any;
};
type Room = {
  admin_user_ids: string[];
  admin_user_ids_str: string[];
  admin_user_open_ids: string[];
  admin_user_open_ids_str: string[];
  AnchorABMap: {
    [key: string]: any;
  };
  cover: RoomCover;
  ecom_data: RoomEcomData;
  has_commerce_goods: boolean;
  id_str: string;
  like_count: number;
  linker_map: {
    [key: string]: any;
  };
  live_room_mode: number;
  mosaic_status: number;
  mosaic_status_str: string;
  others: RoomOthers;
  owner: RoomOwner;
  owner_open_id_str: string;
  owner_user_id_str: string;
  paid_live_data: RoomPaidLiveData;
  room_view_stats: RoomRoomViewStats;
  stats: RoomStats;
  status: number;
  status_str: string;
  stream_url: RoomStreamurl;
  title: string;
  user_count_str: string;
  [property: string]: any;
};
type RoomCover = {
  url_list: string[];
  [property: string]: any;
};
type RoomEcomData = {
  instant_type: number;
  reds_show_infos: string[];
  room_cart_v2: RoomCartV2;
  [property: string]: any;
};
type RoomCartV2 = {
  show_cart: number;
  [property: string]: any;
};
type RoomOthers = {
  lvideo_item_id: number;
  metric_tracker_data_list: string[];
  mosaic_version: number;
  web_data: WebData;
  web_live_port_optimization: FluffyWebLivePortOptimization;
  [property: string]: any;
};
type WebData = {
  additional_stream_url: AdditionalStreamurl;
  [property: string]: any;
};
type AdditionalStreamurl = {
  candidate_resolution: string[];
  complete_push_urls: string[];
  default_resolution: string;
  extra: AdditionalStreamurlExtra;
  flv_pull_url: AdditionalStreamurlFlvPullurl;
  flv_pull_url_params: FlvPullurlParams;
  hls_pull_url: string;
  hls_pull_url_map: AdditionalStreamurlhlsPullurlMap;
  hls_pull_url_params: string;
  id: number;
  id_str: string;
  live_core_sdk_data: AdditionalStreamurlLiveCoresdkData;
  play: Play;
  provider: number;
  pull_datas: AdditionalStreamurlPullDatas;
  push_datas: {
    [key: string]: any;
  };
  push_stream_type: number;
  push_urls: string[];
  resolution_name: ResolutionName;
  rtmp_pull_url: string;
  rtmp_pull_url_params: string;
  rtmp_push_url: string;
  rtmp_push_url_params: string;
  stream_control_type: number;
  stream_orientation: number;
  vr_type: number;
  [property: string]: any;
};
type AdditionalStreamurlExtra = {
  anchor_interact_profile: number;
  audience_interact_profile: number;
  bframe_enable: boolean;
  bitrate_adapt_strategy: number;
  bytevc1_enable: boolean;
  default_bitrate: number;
  fps: number;
  gop_sec: number;
  h265_enable: boolean;
  hardware_encode: boolean;
  height: number;
  max_bitrate: number;
  min_bitrate: number;
  roi: boolean;
  sw_roi: boolean;
  video_profile: number;
  width: number;
  [property: string]: any;
};
type AdditionalStreamurlFlvPullurl = {
  FULL_HD1: string;
  HD1: string;
  SD1: string;
  SD2: string;
  [property: string]: any;
};
type FlvPullurlParams = {
  FULL_HD1: string;
  HD1: string;
  SD1: string;
  SD2: string;
  [property: string]: any;
};
type AdditionalStreamurlhlsPullurlMap = {
  FULL_HD1: string;
  HD1: string;
  SD1: string;
  SD2: string;
  [property: string]: any;
};
type AdditionalStreamurlLiveCoresdkData = {
  pull_data: FluffyPullData;
  push_data: PushData;
  size: string;
  [property: string]: any;
};
type FluffyPullData = {
  codec: string;
  compensatory_data: string;
  Flv: PullDataFlv[];
  Hls: PullDataHl[];
  hls_data_unencrypted: {
    [key: string]: any;
  };
  kind: number;
  options: FluffyOptions;
  stream_data: string;
  version: number;
  [property: string]: any;
};
type PullDataFlv = {
  params: string;
  quality_name: string;
  url: string;
  [property: string]: any;
};
type PullDataHl = {
  params: string;
  quality_name: string;
  url: string;
  [property: string]: any;
};
type FluffyOptions = {
  default_quality: FluffyDefaultQuality;
  qualities: FluffyQuality[];
  vpass_default: boolean;
  [property: string]: any;
};
type FluffyDefaultQuality = {
  additional_content: string;
  disable: number;
  fps: number;
  level: number;
  name: string;
  resolution: string;
  sdk_key: string;
  v_bit_rate: number;
  v_codec: string;
  [property: string]: any;
};
type FluffyQuality = {
  additional_content: string;
  disable: number;
  fps: number;
  level: number;
  name: string;
  resolution: string;
  sdk_key: string;
  v_bit_rate: number;
  v_codec: string;
  [property: string]: any;
};
type PushData = {
  kind: number;
  pre_schedule: boolean;
  push_params: string;
  push_stream_level: number;
  resolution_params: {
    [key: string]: any;
  };
  rtmp_push_url: string;
  stream_id: number;
  stream_id_str: string;
  [property: string]: any;
};
type Play = {
  horizontal: string;
  vertical: string;
  [property: string]: any;
};
type AdditionalStreamurlPullDatas = {
  '7466360588449647386': Purple7466360588449647386;
  [property: string]: any;
};
type Purple7466360588449647386 = {
  codec: string;
  compensatory_data: string;
  extension: PurpleExtension;
  Flv: The7466360588449647386_Flv[];
  Hls: The7466360588449647386_Hl[];
  hls_data_unencrypted: {
    [key: string]: any;
  };
  kind: number;
  options: TentacledOptions;
  stream_data: string;
  version: number;
  [property: string]: any;
};
type The7466360588449647386_Flv = {
  params: string;
  quality_name: string;
  url: string;
  [property: string]: any;
};
type The7466360588449647386_Hl = {
  params: string;
  quality_name: string;
  url: string;
  [property: string]: any;
};
type PurpleExtension = {
  camera_clip: PurpleCameraClip;
  camera_clip_custom: CameraClipCustom;
  camera_hidden: number;
  camera_horizontal_hidden: number;
  camera_horizontal_position: CameraHorizontalPosition;
  camera_horizontal_type: number;
  camera_vertical_type: number;
  display_mode: number;
  game_clip: PurpleGameClip;
  game_hidden: number;
  game_room_id: string;
  layout: number;
  refresh: number;
  ts: string;
  [property: string]: any;
};
type PurpleCameraClip = {
  h: number;
  w: number;
  x: number;
  y: number;
  [property: string]: any;
};
type CameraClipCustom = {
  h: number;
  w: number;
  x: number;
  y: number;
  [property: string]: any;
};
type CameraHorizontalPosition = {
  anchor: number;
  h: number;
  w: number;
  x: number;
  y: number;
  [property: string]: any;
};
type PurpleGameClip = {
  h: number;
  w: number;
  x: number;
  y: number;
  [property: string]: any;
};
type TentacledOptions = {
  default_quality: TentacledDefaultQuality;
  qualities: TentacledQuality[];
  vpass_default: boolean;
  [property: string]: any;
};
type TentacledDefaultQuality = {
  additional_content: string;
  disable: number;
  fps: number;
  level: number;
  name: string;
  resolution: string;
  sdk_key: string;
  v_bit_rate: number;
  v_codec: string;
  [property: string]: any;
};
type TentacledQuality = {
  additional_content: string;
  disable: number;
  fps: number;
  level: number;
  name: string;
  resolution: string;
  sdk_key: string;
  v_bit_rate: number;
  v_codec: string;
  [property: string]: any;
};
type ResolutionName = {
  FULL_HD1: string;
  HD1: string;
  ORIGION: string;
  SD1: string;
  SD2: string;
  [property: string]: any;
};
type FluffyWebLivePortOptimization = {
  strategy_config: FluffyStrategyConfig;
  strategy_extra: string;
  [property: string]: any;
};
type FluffyStrategyConfig = {
  background: FluffyBackground;
  detail: FluffyDetail;
  tab: FluffyTab;
  [property: string]: any;
};
type FluffyBackground = {
  pause_monitor_duration: string;
  strategy_type: number;
  use_config_duration: boolean;
  [property: string]: any;
};
type FluffyDetail = {
  pause_monitor_duration: string;
  strategy_type: number;
  use_config_duration: boolean;
  [property: string]: any;
};
type FluffyTab = {
  pause_monitor_duration: string;
  strategy_type: number;
  use_config_duration: boolean;
  [property: string]: any;
};
type RoomOwner = {
  avatar_thumb: FluffyAvatarThumb$2;
  follow_info: FluffyFollowInfo;
  foreign_user: number;
  id_str: string;
  nickname: string;
  open_id_str: string;
  sec_uid: string;
  subscribe: FluffySubscribe;
  [property: string]: any;
};
type FluffyAvatarThumb$2 = {
  url_list: string[];
  [property: string]: any;
};
type FluffyFollowInfo = {
  follow_status: number;
  follow_status_str: string;
  [property: string]: any;
};
type FluffySubscribe = {
  buy_type: number;
  identity_type: number;
  is_member: boolean;
  level: number;
  open: number;
  [property: string]: any;
};
type RoomPaidLiveData = {
  anchor_right: number;
  delivery: number;
  duration: number;
  max_preview_duration: number;
  need_delivery_notice: boolean;
  paid_type: number;
  pay_ab_type: number;
  privilege_info: {
    [key: string]: any;
  };
  privilege_info_map: {
    [key: string]: any;
  };
  view_right: number;
  [property: string]: any;
};
type RoomRoomViewStats = {
  display_long: string;
  display_long_anchor: string;
  display_middle: string;
  display_middle_anchor: string;
  display_short: string;
  display_short_anchor: string;
  display_type: number;
  display_value: number;
  display_version: number;
  incremental: boolean;
  is_hidden: boolean;
  [property: string]: any;
};
type RoomStats = {
  like_count: number;
  total_user_desp: string;
  total_user_str: string;
  user_count_str: string;
  [property: string]: any;
};
type RoomStreamurl = {
  default_resolution: string;
  extra: FluffyExtra;
  flv_pull_url: FluffyFlvPullurl;
  hls_pull_url: string;
  hls_pull_url_map: FluffyhlsPullurlMap;
  live_core_sdk_data: FluffyLiveCoresdkData;
  pull_datas: StreamurlPullDatas;
  stream_orientation: number;
  [property: string]: any;
};
type FluffyExtra = {
  anchor_interact_profile: number;
  audience_interact_profile: number;
  bframe_enable: boolean;
  bitrate_adapt_strategy: number;
  bytevc1_enable: boolean;
  default_bitrate: number;
  fps: number;
  gop_sec: number;
  h265_enable: boolean;
  hardware_encode: boolean;
  height: number;
  max_bitrate: number;
  min_bitrate: number;
  roi: boolean;
  sw_roi: boolean;
  video_profile: number;
  width: number;
  [property: string]: any;
};
type FluffyFlvPullurl = {
  FULL_HD1: string;
  HD1: string;
  SD1: string;
  SD2: string;
  [property: string]: any;
};
type FluffyhlsPullurlMap = {
  FULL_HD1: string;
  HD1: string;
  SD1: string;
  SD2: string;
  [property: string]: any;
};
type FluffyLiveCoresdkData = {
  pull_data: TentacledPullData;
  [property: string]: any;
};
type TentacledPullData = {
  options: StickyOptions;
  stream_data: string;
  [property: string]: any;
};
type StickyOptions = {
  default_quality: StickyDefaultQuality;
  qualities: string[];
  [property: string]: any;
};
type StickyDefaultQuality = {
  additional_content: string;
  disable: number;
  fps: number;
  level: number;
  name: string;
  resolution: string;
  sdk_key: string;
  v_bit_rate: number;
  v_codec: string;
  [property: string]: any;
};
type StreamurlPullDatas = {
  '7466360588449647386': Fluffy7466360588449647386;
  [property: string]: any;
};
type Fluffy7466360588449647386 = {
  extension: FluffyExtension;
  options: IndigoOptions;
  stream_data: string;
  [property: string]: any;
};
type FluffyExtension = {
  camera_clip: FluffyCameraClip;
  camera_hidden: number;
  display_mode: number;
  game_clip: FluffyGameClip;
  game_hidden: number;
  game_room_id: string;
  refresh: number;
  ts: string;
  [property: string]: any;
};
type FluffyCameraClip = {
  h: number;
  w: number;
  x: number;
  y: number;
  [property: string]: any;
};
type FluffyGameClip = {
  h: number;
  w: number;
  x: number;
  y: number;
  [property: string]: any;
};
type IndigoOptions = {
  default_quality: IndigoDefaultQuality;
  qualities: StickyQuality[];
  [property: string]: any;
};
type IndigoDefaultQuality = {
  additional_content: string;
  disable: number;
  fps: number;
  level: number;
  name: string;
  resolution: string;
  sdk_key: string;
  v_bit_rate: number;
  v_codec: string;
  [property: string]: any;
};
type StickyQuality = {
  additional_content: string;
  disable: number;
  fps: number;
  level: number;
  name: string;
  resolution: string;
  sdk_key: string;
  v_bit_rate: number;
  v_codec: string;
  [property: string]: any;
};
type User$4 = {
  avatar_thumb: UserAvatarThumb$1;
  follow_info: UserFollowInfo;
  foreign_user: number;
  id_str: string;
  nickname: string;
  open_id_str: string;
  sec_uid: string;
  [property: string]: any;
};
type UserAvatarThumb$1 = {
  url_list: string[];
  [property: string]: any;
};
type UserFollowInfo = {
  follow_status: number;
  follow_status_str: string;
  [property: string]: any;
};
type WebStreamurl = {
  default_resolution: string;
  flv_pull_url: {
    [key: string]: any;
  };
  hls_pull_url: string;
  hls_pull_url_map: {
    [key: string]: any;
  };
  pull_datas: {
    [key: string]: any;
  };
  stream_orientation: number;
  [property: string]: any;
};
type UserLiveVideosExtra = {
  now: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/UserPostVideos.d.ts
type DyUserPostVideos = {
  aweme_list: AwemeList$1[];
  has_more: number;
  log_pb: LogPb$2;
  max_cursor: number;
  min_cursor: number;
  post_serial: number;
  replace_series_cover: number;
  request_item_cursor: number;
  status_code: number;
  time_list: string[];
  [property: string]: any;
};
type AwemeList$1 = {
  activity_video_type: number;
  ad_aweme_source?: number;
  anchor_info: AnchorInfo;
  anchors: null;
  authentication_token: string;
  author: Author$2;
  author_mask_tag: number;
  author_user_id: number;
  aweme_control: AwemeControl$1;
  aweme_id: string;
  aweme_listen_struct: AwemeListenStruct$2;
  aweme_type: number;
  aweme_type_tags: string;
  boost_status: number;
  can_cache_to_local: boolean;
  caption: string;
  challenge_position: null;
  chapter_bar_color: null;
  chapter_list: null;
  collect_stat: number;
  collection_corner_mark: number;
  comment_gid: number;
  comment_list: null;
  comment_permission_info: CommentPermissionInfo$2;
  commerce_config_data: null;
  component_control: ComponentControl$2;
  component_info_v2: string;
  cooperation_info?: CooperationInfo;
  cover_labels: null;
  create_scale_type: null;
  create_time: number;
  danmaku_control: DanmakuControl$2;
  desc: string;
  disable_relation_bar: number;
  dislike_dimension_list: null;
  dislike_dimension_list_v2: null;
  distribute_circle: DistributeCircle$2;
  duet_aggregate_in_music_tab: boolean;
  duration: number;
  enable_comment_sticker_rec: boolean;
  entertainment_product_info: EntertainmentProductInfo$2;
  feed_comment_config: FeedCommentConfig$2;
  flash_mob_trends: number;
  friend_interaction: number;
  friend_recommend_info: {
    [key: string]: any;
  };
  game_tag_info: GameTagInfo$2;
  geofencing: string[];
  geofencing_regions: null;
  group_id: string;
  guide_btn_type: number;
  horizontal_type: number;
  hot_list: HotList$1;
  hybrid_label: null;
  image_album_music_info: ImageAlbumMusicInfo$2;
  image_comment: {
    [key: string]: any;
  };
  image_crop_ctrl: number;
  image_infos: null;
  image_list: null;
  images: null;
  img_bitrate: null;
  impression_data: ImpressionData$2;
  interaction_stickers: null;
  is_24_story: number;
  is_ads: boolean;
  is_collects_selected: number;
  is_duet_sing: boolean;
  is_image_beat: boolean;
  is_life_item: boolean;
  is_share_post: boolean;
  is_story: number;
  is_top: number;
  is_use_music: boolean;
  item_title: string;
  item_warn_notification: ItemWarnNotification$2;
  jump_tab_info_list: null;
  label_top_text: null;
  libfinsert_task_id: string;
  long_video: null;
  mark_largely_following: boolean;
  media_type: number;
  music: Music$2;
  mv_info: null;
  nickname_position: null;
  origin_comment_ids: null;
  origin_duet_resource_uri: string;
  origin_text_extra: null;
  original: number;
  original_anchor_type: number;
  original_images: null;
  packed_clips: null;
  personal_page_botton_diagnose_style: number;
  photo_search_entrance: PhotoSearchEntrance$2;
  play_progress: PlayProgress$2;
  position: null;
  prevent_download: boolean;
  promotions: string[];
  publish_plus_alienation: PublishPlusAlienation$2;
  ref_tts_id_list: null;
  ref_voice_modify_id_list: null;
  region: string;
  relation_labels: null;
  reply_smart_emojis: null;
  risk_infos: RiskInfos$2;
  series_paid_info: SeriesPaidInfo$2;
  share_info: AwemeListShareInfo$1;
  share_url: string;
  shoot_way: string;
  show_follow_button: {
    [key: string]: any;
  };
  slides_music_beats: null;
  social_tag_list: null;
  standard_bar_info_list: null;
  star_atlas_info: StarAtlasInfo$1;
  statistics: Statistics$2;
  status: Status$1;
  suggest_words: SuggestWords$1;
  text_extra: TextExtra$1[];
  trends_infos: null;
  tts_id_list: null;
  uniqid_position: null;
  user_digged: number;
  user_recommend_status: number;
  video: Video$2;
  video_control: VideoControl$2;
  video_game_data_channel_config: {
    [key: string]: any;
  };
  video_labels: null;
  video_reply_info?: VideoReplyInfo;
  video_share_edit_status: number;
  video_tag: VideoTag$2[];
  video_text: null;
  visual_search_info: VisualSearchInfo$2;
  voice_modify_id_list: null;
  vtag_search: VtagSearch$1;
  xigua_base_info: XiguaBaseInfo$2;
  yumme_recreason: null;
  [property: string]: any;
};
type AnchorInfo = {
  content: string;
  extra: string;
  icon: Icon;
  id: string;
  log_extra: string;
  mp_url?: string;
  open_url: string;
  style_info: StyleInfo;
  title: string;
  title_tag: string;
  type: number;
  web_url?: string;
  [property: string]: any;
};
type Icon = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type StyleInfo = {
  default_icon: string;
  extra: string;
  scene_icon: string;
  [property: string]: any;
};
type Author$2 = {
  account_cert_info: string;
  avatar_schema_list: null;
  avatar_thumb: AuthorAvatarThumb$1;
  ban_user_functions: null;
  batch_unfollow_contain_tabs: null;
  batch_unfollow_relation_desc: null;
  can_set_geofencing: null;
  card_entries: null;
  card_entries_not_display: null;
  card_sort_priority: null;
  cf_list: null;
  contrail_list: null;
  cover_url: Coverurl$1[];
  creator_tag_list: null;
  custom_verify: string;
  data_label_list: null;
  display_info: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  familiar_visitor_user: null;
  follow_status: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  homepage_bottom_toast: null;
  im_role_ids: null;
  interest_tags: null;
  is_ad_fake: boolean;
  link_item_list: null;
  need_points: null;
  nickname: string;
  not_seen_item_id_list: null;
  not_seen_item_id_list_v2: null;
  offline_info_list: null;
  personal_tag_list: null;
  prevent_download: boolean;
  private_relation_list: null;
  profile_mob_params: null;
  risk_notice_text: string;
  sec_uid: string;
  share_info: AuthorShareInfo$2;
  signature_extra: null;
  special_people_labels: null;
  text_extra: null;
  uid: string;
  user_permissions: null;
  user_tags: null;
  verification_permission_ids: null;
  white_cover_url: null;
  [property: string]: any;
};
type AuthorAvatarThumb$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverurl$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AuthorShareInfo$2 = {
  share_desc: string;
  share_desc_info: string;
  share_qrcode_url: ShareQrcodeurl$2;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ShareQrcodeurl$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AwemeControl$1 = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type AwemeListenStruct$2 = {
  trace_info: string;
  [property: string]: any;
};
type CommentPermissionInfo$2 = {
  can_comment: boolean;
  comment_permission_status: number;
  item_detail_entry: boolean;
  press_entry: boolean;
  toast_guide: boolean;
  [property: string]: any;
};
type ComponentControl$2 = {
  data_source_url: string;
  [property: string]: any;
};
type CooperationInfo = {
  accepted_nums: number;
  co_creator_nums: number;
  co_creators: CoCreator[];
  cursor: number;
  extra: string;
  tag: string;
  [property: string]: any;
};
type CoCreator = {
  avatar_thumb: CoCreatorAvatarThumb;
  custom_verify: string;
  enterprise_verify_reason: string;
  extra: string;
  follow_status: number;
  follower_count: number;
  follower_status: number;
  index: number;
  invite_status: number;
  nickname: string;
  role_id: number;
  role_title: string;
  sec_uid: string;
  uid: string;
  [property: string]: any;
};
type CoCreatorAvatarThumb = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DanmakuControl$2 = {
  activities: Activity$2[];
  danmaku_cnt: number;
  enable_danmaku: boolean;
  is_post_denied: boolean;
  pass_through_params: string;
  post_denied_reason: string;
  post_privilege_level: number;
  skip_danmaku: boolean;
  smart_mode_decision: number;
  [property: string]: any;
};
type Activity$2 = {
  id: number;
  type: number;
  [property: string]: any;
};
type DistributeCircle$2 = {
  campus_block_interaction: boolean;
  distribute_type: number;
  is_campus: boolean;
  [property: string]: any;
};
type EntertainmentProductInfo$2 = {
  market_info: MarketInfo$2;
  sub_title: null;
  [property: string]: any;
};
type MarketInfo$2 = {
  limit_free: LimitFree$2;
  marketing_tag: null;
  [property: string]: any;
};
type LimitFree$2 = {
  in_free: boolean;
  [property: string]: any;
};
type FeedCommentConfig$2 = {
  author_audit_status: number;
  input_config_text: string;
  [property: string]: any;
};
type GameTagInfo$2 = {
  is_game: boolean;
  [property: string]: any;
};
type HotList$1 = {
  extra: string;
  footer: string;
  group_id: string;
  header: string;
  hot_score: number;
  i18n_title: string;
  image_url: string;
  pattern_type: number;
  rank: number;
  schema: string;
  sentence: string;
  sentence_id: number;
  title: string;
  type: number;
  view_count: number;
  [property: string]: any;
};
type ImageAlbumMusicInfo$2 = {
  begin_time: number;
  end_time: number;
  volume: number;
  [property: string]: any;
};
type ImpressionData$2 = {
  group_id_list_a: string[];
  group_id_list_b: string[];
  group_id_list_c: string[];
  similar_id_list_a: number[] | null;
  similar_id_list_b: number[] | null;
  [property: string]: any;
};
type ItemWarnNotification$2 = {
  content: string;
  show: boolean;
  type: number;
  [property: string]: any;
};
type Music$2 = {
  album: string;
  artist_user_infos: null;
  artists: string[];
  audition_duration: number;
  author: string;
  author_deleted: boolean;
  author_position: null;
  author_status: number;
  avatar_large: AvatarLarge$2;
  avatar_medium: AvatarMedium$1;
  avatar_thumb: MusicAvatarThumb$2;
  binded_challenge_id: number;
  can_background_play: boolean;
  collect_stat: number;
  cover_hd: Coverhd$2;
  cover_large: CoverLarge$2;
  cover_medium: MusicCoverMedium$1;
  cover_thumb: CoverThumb$2;
  dmv_auto_show: boolean;
  dsp_status: number;
  duration: number;
  end_time: number;
  external_song_info: string[];
  extra: string;
  id: number;
  id_str: string;
  is_audio_url_with_cookie: boolean;
  is_commerce_music: boolean;
  is_del_video: boolean;
  is_matched_metadata: boolean;
  is_original: boolean;
  is_original_sound: boolean;
  is_pgc: boolean;
  is_restricted: boolean;
  is_video_self_see: boolean;
  lyric_short_position: null;
  matched_pgc_sound?: MatchedPgcSound$1;
  mid: string;
  music_chart_ranks: null;
  music_collect_count: number;
  music_cover_atmosphere_color_value: string;
  music_status: number;
  musician_user_infos: null;
  mute_share: boolean;
  offline_desc: string;
  owner_handle: string;
  owner_id: string;
  owner_nickname: string;
  pgc_music_type: number;
  play_url: Playurl$2;
  position: null;
  prevent_download: boolean;
  prevent_item_download_status: number;
  preview_end_time: number;
  preview_start_time: number;
  reason_type: number;
  redirect: boolean;
  schema_url: string;
  search_impr: SearchImpr$1;
  sec_uid: string;
  shoot_duration: number;
  song?: Song$1;
  source_platform: number;
  start_time: number;
  status: number;
  strong_beat_url?: StrongBeaturl$2;
  tag_list: null;
  title: string;
  unshelve_countries: null;
  user_count: number;
  video_duration: number;
  [property: string]: any;
};
type AvatarLarge$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarMedium$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicAvatarThumb$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverhd$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverLarge$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicCoverMedium$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MatchedPgcSound$1 = {
  author: string;
  cover_medium: MatchedPgcSoundCoverMedium$1;
  mixed_author: string;
  mixed_title: string;
  title: string;
  [property: string]: any;
};
type MatchedPgcSoundCoverMedium$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl$2 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type SearchImpr$1 = {
  entity_id: string;
  [property: string]: any;
};
type Song$1 = {
  artists: null;
  chorus_v3_infos: null;
  id: number;
  id_str: string;
  [property: string]: any;
};
type StrongBeaturl$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PhotoSearchEntrance$2 = {
  ecom_type: number;
  [property: string]: any;
};
type PlayProgress$2 = {
  last_modified_time: number;
  play_progress: number;
  [property: string]: any;
};
type PublishPlusAlienation$2 = {
  alienation_type: number;
  [property: string]: any;
};
type RiskInfos$2 = {
  content: string;
  risk_sink: boolean;
  type: number;
  vote: boolean;
  warn: boolean;
  [property: string]: any;
};
type SeriesPaidInfo$2 = {
  item_price: number;
  series_paid_status: number;
  [property: string]: any;
};
type AwemeListShareInfo$1 = {
  share_link_desc: string;
  share_url: string;
  [property: string]: any;
};
type StarAtlasInfo$1 = {
  click_track_url_list: null;
  log_extra: string;
  track_url_list: null;
  [property: string]: any;
};
type Statistics$2 = {
  admire_count: number;
  collect_count: number;
  comment_count: number;
  digg_count: number;
  play_count: number;
  share_count: number;
  [property: string]: any;
};
type Status$1 = {
  allow_share: boolean;
  in_reviewing: boolean;
  is_delete: boolean;
  is_prohibited: boolean;
  listen_video_status: number;
  part_see: number;
  private_status: number;
  review_result: ReviewResult$2;
  [property: string]: any;
};
type ReviewResult$2 = {
  review_status: number;
  [property: string]: any;
};
type SuggestWords$1 = {
  suggest_words: SuggestWord$1[];
  [property: string]: any;
};
type SuggestWord$1 = {
  hint_text: string;
  icon_url: string;
  scene: string;
  words: Word$1[];
  [property: string]: any;
};
type Word$1 = {
  info: string;
  word: string;
  word_id: string;
  [property: string]: any;
};
type TextExtra$1 = {
  caption_end: number;
  caption_start: number;
  end: number;
  hashtag_id: string;
  hashtag_name: string;
  is_commerce: boolean;
  search_query_id: string;
  search_text: string;
  sec_uid?: string;
  start: number;
  sub_type?: number;
  type: number;
  user_id?: string;
  [property: string]: any;
};
type Video$2 = {
  animated_cover: AnimatedCover$1;
  audio: Audio$1;
  big_thumbs: BigThumb$1[];
  bit_rate: BitRate$1[];
  bit_rate_audio: BitRateAudio$1[] | null;
  cover: Cover$3;
  duration: number;
  dynamic_cover: DynamicCover$2;
  format: string;
  gaussian_cover: GaussianCover$2;
  height: number;
  horizontal_type: number;
  is_long_video?: number;
  is_source_HDR: number;
  meta: string;
  misc_download_addrs?: string;
  origin_cover: OriginCover$1;
  play_addr: VideoPlayAddr$1;
  play_addr_265: PlayAddr265$2;
  play_addr_h264: PlayAddrH264$1;
  ratio: string;
  raw_cover: RawCover;
  use_static_cover: boolean;
  video_model: string;
  width: number;
  [property: string]: any;
};
type AnimatedCover$1 = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type Audio$1 = {
  original_sound_infos: null;
  [property: string]: any;
};
type BigThumb$1 = {
  duration: number;
  fext: string;
  img_num: number;
  img_url: string;
  img_urls: string[];
  img_x_len: number;
  img_x_size: number;
  img_y_len: number;
  img_y_size: number;
  interval: number;
  uri: string;
  uris: string[];
  [property: string]: any;
};
type BitRate$1 = {
  bit_rate: number;
  format: string;
  FPS: number;
  gear_name: string;
  HDR_bit: string;
  HDR_type: string;
  is_bytevc1: number;
  is_h265: number;
  play_addr: BitRatePlayAddr$1;
  quality_type: number;
  video_extra: string;
  [property: string]: any;
};
type BitRatePlayAddr$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type BitRateAudio$1 = {
  audio_extra?: string;
  audio_meta?: AudioMeta$1;
  audio_quality?: number;
  [property: string]: any;
};
type AudioMeta$1 = {
  bitrate: number;
  codec_type: string;
  encoded_type: string;
  file_hash: string;
  file_id: string;
  format: string;
  fps: number;
  logo_type: string;
  media_type: string;
  quality: string;
  quality_desc: string;
  size: number;
  sub_info: string;
  url_list: UrlList$1;
  [property: string]: any;
};
type UrlList$1 = {
  backup_url: string;
  fallback_url: string;
  main_url: string;
  [property: string]: any;
};
type Cover$3 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DynamicCover$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type GaussianCover$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type OriginCover$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoPlayAddr$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddr265$2 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddrH264$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type RawCover = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoControl$2 = {
  allow_douplus: boolean;
  allow_download: boolean;
  allow_duet: boolean;
  allow_dynamic_wallpaper: boolean;
  allow_music: boolean;
  allow_react: boolean;
  allow_record: boolean;
  allow_share: boolean;
  allow_stitch: boolean;
  disable_record_reason: string;
  download_ignore_visibility: boolean;
  download_info: DownloadInfo$2;
  draft_progress_bar: number;
  duet_ignore_visibility: boolean;
  duet_info: DuetInfo$2;
  prevent_download_type: number;
  share_grayed: boolean;
  share_ignore_visibility: boolean;
  share_type: number;
  show_progress_bar: number;
  timer_info: {
    [key: string]: any;
  };
  timer_status: number;
  [property: string]: any;
};
type DownloadInfo$2 = {
  level: number;
  [property: string]: any;
};
type DuetInfo$2 = {
  level: number;
  [property: string]: any;
};
type VideoReplyInfo = {
  alias_comment_id: number;
  aweme_id: number;
  comment_id: number;
  reply_user_id: number;
  [property: string]: any;
};
type VideoTag$2 = {
  level: number;
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type VisualSearchInfo$2 = {
  is_ecom_img: boolean;
  is_high_accuracy_ecom: boolean;
  is_high_recall_ecom: boolean;
  is_show_img_entrance: boolean;
  visual_search_longpress?: number;
  [property: string]: any;
};
type VtagSearch$1 = {
  vtag_delay_ts: number;
  vtag_enable: boolean;
  [property: string]: any;
};
type XiguaBaseInfo$2 = {
  item_id: number;
  star_altar_order_id: number;
  star_altar_type: number;
  status: number;
  [property: string]: any;
};
type LogPb$2 = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/UserRecommendList.d.ts
type UserRecommendList = {
  aweme_date: AwemeDate;
  aweme_list: AwemeList[];
  has_more: boolean;
  max_cursor: number;
  min_cursor: number;
  status_code: number;
  total: number;
  [property: string]: any;
};
type AwemeDate = {
  date_map: DateMap;
  [property: string]: any;
};
type DateMap = {
  '7580008087244651441': number;
  '7584755077924949307': number;
  '7586617109753449765': number;
  '7586985463588687119': number;
  '7587783200715885305': number;
  '7587805084185894641': number;
  '7589233890259308977': number;
  '7591123649823586939': number;
  '7592193662924064872': number;
  '7592240318939746906': number;
  '7592598486529917043': number;
  '7592849517923110571': number;
  '7593340412648082730': number;
  '7594011208047529222': number;
  '7597764624923496838': number;
  '7598780284636557233': number;
  [property: string]: any;
};
type AwemeList = {
  activity_video_type: number;
  ai_follow_images: null;
  anchors: null;
  authentication_token: string;
  author: AwemeListAuthor;
  author_mask_tag: number;
  author_user_id: number;
  aweme_acl: Awemeacl;
  aweme_control: AwemeListAwemeControl;
  aweme_id: string;
  aweme_listen_struct: AwemeListenStruct$1;
  aweme_type: number;
  aweme_type_tags: string;
  bodydance_score: number;
  boost_status: number;
  can_cache_to_local: boolean;
  caption: string;
  category_da?: number;
  cf_assets_type: number;
  cf_recheck_ts: number;
  cha_list: ChaList[];
  challenge_position: null;
  chapter_abstract?: string;
  chapter_bar_color: null;
  chapter_data?: ChapterData;
  chapter_list: ChapterList[] | null;
  chapter_review_status?: number;
  city: string;
  clip_paging?: ClipPaging;
  cmt_swt: boolean;
  collect_stat: number;
  collection_corner_mark: number;
  comment_gid: number;
  comment_list: null;
  comment_permission_info: CommentPermissionInfo$1;
  commerce_config_data: null;
  commerce_info: CommerceInfo;
  component_control: ComponentControl$1;
  component_info_v2: string;
  cover_labels: null;
  create_scale_type: string[] | null;
  create_time: number;
  danmaku_control: DanmakuControl$1;
  desc: string;
  desc_language: string;
  disable_relation_bar: number;
  dislike_dimension_list: null;
  dislike_dimension_list_v2: null;
  distance: string;
  distribute_circle: DistributeCircle$1;
  distribute_type: number;
  douplus_user_type: number;
  douyin_p_c_video_extra?: string;
  douyin_pc_video_extra_seo: string;
  duet_aggregate_in_music_tab: boolean;
  duration: number;
  ecom_comment_atmosphere_type: number;
  effect_inflow_effects: null;
  enable_comment_sticker_rec: boolean;
  enable_decorated_emoji: boolean;
  ent_log_extra: EntLogExtra;
  entertainment_product_info: EntertainmentProductInfo$1;
  entertainment_recommend_info: string;
  entertainment_video_paid_way: EntertainmentVideoPaidWay;
  entertainment_video_type: number;
  fall_card_struct: FallCardStruct$1;
  feed_comment_config: FeedCommentConfig$1;
  flash_mob_trends: number;
  follow_material_info: string;
  follow_shoot_clip_info: FollowShootClipInfo;
  follow_shot_assets: null;
  friend_recommend_info: FriendRecommendInfo;
  galileo_pad_textcrop: GalileoPadTextcrop;
  game_tag_info: GameTagInfo$1;
  general_label?: GeneralLabel;
  geofencing: string[];
  geofencing_regions: null;
  group_id: string;
  guide_btn_type: number;
  guide_scene_info: {
    [key: string]: any;
  };
  has_vs_entry: boolean;
  have_dashboard: boolean;
  horizontal_type: number;
  hot_list: HotList;
  hybrid_label: null;
  image_album_music_info: ImageAlbumMusicInfo$1;
  image_comment: {
    [key: string]: any;
  };
  image_crop_ctrl: number;
  image_follow_shot_assets: null;
  image_infos: null;
  image_item_quality_level: number;
  image_list: null;
  images: AwemeListImage[];
  img_bitrate: string[];
  impression_data: ImpressionData$1;
  incentive_item_type: number;
  interaction_stickers: null;
  interest_points: null;
  is_24_story: number;
  is_25_story: number;
  is_ads: boolean;
  is_collects_selected: number;
  is_duet_sing: boolean;
  is_fantasy: boolean;
  is_first_video: boolean;
  is_from_ad_auth: boolean;
  is_hash_tag: number;
  is_image_beat: boolean;
  is_in_scope: boolean;
  is_karaoke: boolean;
  is_life_item: boolean;
  is_moment_history: number;
  is_moment_story: number;
  is_multi_content: number;
  is_new_text_mode: number;
  is_pgcshow: boolean;
  is_preview: number;
  is_relieve: boolean;
  is_share_post: boolean;
  is_slides?: boolean;
  is_slides_beat?: number;
  is_story: number;
  is_subtitled: number;
  is_top: number;
  is_use_music: boolean;
  is_vr: boolean;
  item_aigc_follow_shot: number;
  item_comment_settings: number;
  item_duet: number;
  item_react: number;
  item_share: number;
  item_stitch: number;
  item_title: string;
  item_warn_notification: ItemWarnNotification$1;
  jump_tab_info_list: null;
  label_top_text: null;
  libfinsert_task_id: string;
  long_video: null;
  mark_largely_following: boolean;
  media_type: number;
  misc_info: string;
  mix_info: MixInfo;
  music: Music$1;
  mv_info: null;
  nearby_hot_comment: null;
  nearby_level: number;
  need_vs_entry: boolean;
  nickname_position: null;
  origin_comment_ids: null;
  origin_duet_resource_uri: string;
  origin_text_extra: string[];
  original: number;
  original_images: null;
  packed_clips: null;
  pc_need_login: boolean;
  personal_page_botton_diagnose_style: number;
  photo_search_entrance: PhotoSearchEntrance$1;
  play_progress: PlayProgress$1;
  poi_biz: {
    [key: string]: any;
  };
  poi_patch_info: PoiPatchInfo;
  position: null;
  prevent_download: boolean;
  preview_title: string;
  preview_video_status: number;
  product_genre_info: ProductGenreInfo;
  promotions: string[];
  publish_plus_alienation: PublishPlusAlienation$1;
  rate: number;
  recommend_chapter_apply_status?: number;
  ref_tts_id_list: null;
  ref_voice_modify_id_list: null;
  region: string;
  related_music_anchor: RelatedMusicAnchor;
  relation_label: RelationLabel;
  relation_labels: null;
  reply_smart_emojis: null;
  report_action: boolean;
  risk_infos: RiskInfos$1;
  sec_item_id: string;
  select_anchor_expanded_content: number;
  select_billboard_extra?: {
    [key: string]: any;
  };
  seo_info: {
    [key: string]: any;
  };
  series_basic_info: {
    [key: string]: any;
  };
  series_paid_info: SeriesPaidInfo$1;
  share_info: AwemeListShareInfo;
  share_rec_extra: string;
  share_url: string;
  shoot_way: string;
  should_open_ad_report: boolean;
  show_follow_button: {
    [key: string]: any;
  };
  slides_music_beats: null;
  social_tag_list: null;
  sort_label: string;
  standard_bar_info_list: null;
  star_atlas_info?: StarAtlasInfo;
  statistics: Statistics$1;
  status: AwemeListStatus;
  story_ttl: number;
  text_extra: TextExtra[];
  trends_event_track: string;
  trends_infos: TrendsInfo[] | null;
  tts_id_list: null;
  uniqid_position: null;
  user_digged: number;
  user_recommend_status: number;
  video: AwemeListVideo;
  video_control: VideoControl$1;
  video_game_data_channel_config: {
    [key: string]: any;
  };
  video_labels: null;
  video_share_edit_status: number;
  video_tag: VideoTag$1[];
  video_text: string[];
  visual_search_info: VisualSearchInfo$1;
  voice_modify_id_list: null;
  vr_type: number;
  with_promotional_music: boolean;
  without_watermark: boolean;
  xigua_base_info: XiguaBaseInfo$1;
  xigua_task: XiguaTask;
  yumme_recreason: null;
  [property: string]: any;
};
type AwemeListAuthor = {
  accept_private_policy: boolean;
  account_cert_info?: string;
  account_region: string;
  ad_cover_url: null;
  apple_account: number;
  authority_status: number;
  avatar_168x168: PurpleAvatar168X168;
  avatar_300x300: PurpleAvatar300X300;
  avatar_larger: PurpleAvatarLarger;
  avatar_medium: PurpleAvatarMedium;
  avatar_schema_list: null;
  avatar_thumb: PurpleAvatarThumb$1;
  avatar_uri: string;
  aweme_control: AuthorAwemeControl;
  aweme_count: number;
  aweme_hotsoon_auth: number;
  aweme_hotsoon_auth_relation: number;
  awemehts_greet_info: string;
  ban_user_functions: string[];
  batch_unfollow_contain_tabs: null;
  batch_unfollow_relation_desc: null;
  bind_phone: string;
  birthday: string;
  can_set_geofencing: null;
  card_entries: null;
  card_entries_not_display: null;
  card_sort_priority: null;
  cf_list: null;
  cha_list: null;
  close_friend_type: number;
  comment_filter_status: number;
  comment_setting: number;
  commerce_user_level: number;
  constellation: number;
  contacts_status: number;
  contrail_list: null;
  cover_url: CoverurlElement[];
  create_time: number;
  creator_tag_list: null;
  custom_verify: string;
  cv_level: string;
  data_label_list: null;
  display_info: null;
  download_prompt_ts: number;
  download_setting: number;
  duet_setting: number;
  enable_nearby_visible: boolean;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  familiar_visitor_user: null;
  favoriting_count: number;
  fb_expire_time: number;
  follow_status: number;
  follower_count: number;
  follower_list_secondary_information_struct: null;
  follower_request_status: number;
  follower_status: number;
  followers_detail: null;
  following_count: number;
  gender: number;
  geofencing: string[];
  google_account: string;
  has_email: boolean;
  has_facebook_token: boolean;
  has_insights: boolean;
  has_orders: boolean;
  has_twitter_token: boolean;
  has_unread_story: boolean;
  has_youtube_token: boolean;
  hide_location: boolean;
  hide_search: boolean;
  homepage_bottom_toast: null;
  identity_labels: null;
  im_role_ids: null;
  ins_id: string;
  interest_tags: null;
  is_ad_fake: boolean;
  is_binded_weibo: boolean;
  is_block: boolean;
  is_blocked_v2: boolean;
  is_blocking_v2: boolean;
  is_cf: number;
  is_discipline_member: boolean;
  is_gov_media_vip: boolean;
  is_mix_user: boolean;
  is_not_show: boolean;
  is_phone_binded: boolean;
  is_star: boolean;
  is_verified: boolean;
  item_list: null;
  ky_only_predict: number;
  language: string;
  link_item_list: null;
  live_agreement: number;
  live_agreement_time: number;
  live_commerce: boolean;
  live_high_value: number;
  live_status: number;
  live_verify: number;
  location: string;
  mate_add_permission: number;
  max_follower_count: number;
  need_points: null;
  need_recommend: number;
  neiguang_shield: number;
  new_friend_type: number;
  new_story_cover: null;
  nickname: string;
  not_seen_item_id_list: null;
  not_seen_item_id_list_v2: null;
  offline_info_list: null;
  personal_tag_list: null;
  platform_sync_info: null;
  prevent_download: boolean;
  private_relation_list: null;
  profile_component_disabled: null;
  profile_mob_params: null;
  react_setting: number;
  reflow_page_gid: number;
  reflow_page_uid: number;
  region: string;
  relative_users: null;
  risk_notice_text: string;
  room_id: number;
  school_category: number;
  school_id: string;
  school_name: string;
  school_poi_id: string;
  school_type: number;
  search_impr: PurpleSearchImpr;
  sec_uid: string;
  secret: number;
  share_info: AuthorShareInfo$1;
  share_qrcode_uri: string;
  shield_comment_notice: number;
  shield_digg_notice: number;
  shield_follow_notice: number;
  short_id: string;
  show_image_bubble: boolean;
  show_nearby_active: boolean;
  signature: string;
  signature_display_lines: number;
  signature_extra: null;
  special_follow_status: number;
  special_lock: number;
  special_people_labels: null;
  status: number;
  stitch_setting: number;
  story25_comment: number;
  story_count: number;
  story_interactive: number;
  story_open: boolean;
  story_ttl: number;
  sync_to_toutiao: number;
  text_extra: null;
  total_favorited: number;
  tw_expire_time: number;
  twitter_id: string;
  twitter_name: string;
  type_label: null;
  uid: string;
  unique_id: string;
  unique_id_modify_time: number;
  user_age: number;
  user_canceled: boolean;
  user_mode: number;
  user_not_see: number;
  user_not_show: number;
  user_period: number;
  user_permissions: null;
  user_rate: number;
  user_tags: null;
  verification_permission_ids: null;
  verification_type: number;
  verify_info: string;
  video_icon: PurpleVideoIcon;
  weibo_name: string;
  weibo_schema: string;
  weibo_url: string;
  weibo_verify: string;
  white_cover_url: null;
  with_commerce_entry: boolean;
  with_dou_entry: boolean;
  with_fusion_shop_entry: boolean;
  with_shop_entry: boolean;
  youtube_channel_id: string;
  youtube_channel_title: string;
  youtube_expire_time: number;
  [property: string]: any;
};
type PurpleAvatar168X168 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleAvatar300X300 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleAvatarLarger = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleAvatarMedium = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleAvatarThumb$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AuthorAwemeControl = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type CoverurlElement = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleSearchImpr = {
  entity_id: string;
  [property: string]: any;
};
type AuthorShareInfo$1 = {
  share_desc: string;
  share_desc_info: string;
  share_qrcode_url: ShareQrcodeurl$1;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ShareQrcodeurl$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleVideoIcon = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Awemeacl = {
  download_mask_panel: DownloadMaskPanel;
  [property: string]: any;
};
type DownloadMaskPanel = {
  code: number;
  show_type: number;
  [property: string]: any;
};
type AwemeListAwemeControl = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type AwemeListenStruct$1 = {
  trace_info: string;
  [property: string]: any;
};
type ChaList = {
  author: ChaListAuthor;
  banner_list: null;
  cha_attrs: null;
  cha_name: string;
  cid: string;
  collect_stat: number;
  connect_music: string[];
  desc: string;
  extra_attr: ExtraAttr;
  hashtag_profile: string;
  insert_template_category_list: null;
  is_challenge: number;
  is_commerce: boolean;
  is_pgcshow: boolean;
  schema: string;
  search_impr: ChaListSearchImpr;
  share_info: ChaListShareInfo;
  show_items: null;
  sub_type: number;
  type: number;
  user_count: number;
  view_count: number;
  [property: string]: any;
};
type ChaListAuthor = {
  ad_cover_url: null;
  avatar_168x168: FluffyAvatar168X168;
  avatar_300x300: FluffyAvatar300X300;
  avatar_larger: FluffyAvatarLarger;
  avatar_medium: FluffyAvatarMedium;
  avatar_schema_list: null;
  avatar_thumb: FluffyAvatarThumb$1;
  avatar_uri: string;
  aweme_control: {
    [key: string]: any;
  };
  ban_user_functions: null;
  batch_unfollow_contain_tabs: null;
  batch_unfollow_relation_desc: null;
  bind_phone: string;
  birthday: string;
  can_set_geofencing: null;
  card_entries: null;
  card_entries_not_display: null;
  card_sort_priority: null;
  cf_list: null;
  cha_list: null;
  constellation: number;
  contrail_list: null;
  cover_url: string[];
  create_time: number;
  creator_tag_list: null;
  data_label_list: null;
  display_info: null;
  endorsement_info_list: null;
  familiar_visitor_user: null;
  follow_status: number;
  follower_list_secondary_information_struct: null;
  followers_detail: null;
  gender: number;
  geofencing: null;
  has_email: boolean;
  homepage_bottom_toast: null;
  identity_labels: null;
  im_role_ids: null;
  interest_tags: null;
  is_block: boolean;
  is_phone_binded: boolean;
  item_list: null;
  language: string;
  link_item_list: null;
  need_points: null;
  new_story_cover: null;
  nickname: string;
  not_seen_item_id_list: null;
  not_seen_item_id_list_v2: null;
  offline_info_list: null;
  personal_tag_list: null;
  platform_sync_info: null;
  private_relation_list: null;
  profile_component_disabled: null;
  profile_mob_params: null;
  region: string;
  relative_users: null;
  search_impr: FluffySearchImpr;
  sec_uid: string;
  short_id: string;
  show_image_bubble: boolean;
  signature: string;
  signature_extra: null;
  special_people_labels: null;
  status: number;
  text_extra: null;
  type_label: null;
  uid: string;
  unique_id: string;
  unique_id_modify_time: number;
  user_permissions: null;
  user_tags: null;
  verification_permission_ids: null;
  video_icon: FluffyVideoIcon;
  white_cover_url: null;
  with_dou_entry: boolean;
  [property: string]: any;
};
type FluffyAvatar168X168 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyAvatar300X300 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyAvatarLarger = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyAvatarMedium = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyAvatarThumb$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffySearchImpr = {
  entity_id: string;
  [property: string]: any;
};
type FluffyVideoIcon = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type ExtraAttr = {
  is_live: boolean;
  [property: string]: any;
};
type ChaListSearchImpr = {
  entity_id: string;
  [property: string]: any;
};
type ChaListShareInfo = {
  bool_persist: number;
  share_desc: string;
  share_desc_info: string;
  share_quote: string;
  share_signature_desc: string;
  share_signature_url: string;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ChapterData = {
  ad_chapter_index_list: null;
  recommend_type: string;
  [property: string]: any;
};
type ChapterList = {
  desc: string;
  detail: string;
  points: null;
  timestamp: number;
  url: string;
  [property: string]: any;
};
type ClipPaging = {
  direct: number;
  has_more: boolean;
  source: string;
  [property: string]: any;
};
type CommentPermissionInfo$1 = {
  can_comment: boolean;
  comment_permission_status: number;
  item_detail_entry: boolean;
  press_entry: boolean;
  toast_guide: boolean;
  [property: string]: any;
};
type CommerceInfo = {
  ad_type: number;
  is_ad: boolean;
  [property: string]: any;
};
type ComponentControl$1 = {
  data_source_url: string;
  [property: string]: any;
};
type DanmakuControl$1 = {
  activities: Activity$1[];
  danmaku_cnt: number;
  enable_danmaku: boolean;
  first_danmaku_offset: number;
  is_post_denied: boolean;
  last_danmaku_offset: number;
  pass_through_params: string;
  post_denied_reason: string;
  post_privilege_level: number;
  skip_danmaku: boolean;
  smart_mode_decision: number;
  [property: string]: any;
};
type Activity$1 = {
  id: number;
  type: number;
  [property: string]: any;
};
type DistributeCircle$1 = {
  campus_block_interaction: boolean;
  distribute_type: number;
  is_campus: boolean;
  [property: string]: any;
};
type EntLogExtra = {
  log_extra: string;
  [property: string]: any;
};
type EntertainmentProductInfo$1 = {
  market_info: MarketInfo$1;
  sub_title: null;
  [property: string]: any;
};
type MarketInfo$1 = {
  limit_free: LimitFree$1;
  marketing_tag: null;
  [property: string]: any;
};
type LimitFree$1 = {
  in_free: boolean;
  [property: string]: any;
};
type EntertainmentVideoPaidWay = {
  enable_use_new_ent_data: boolean;
  paid_type: number;
  paid_ways: string[];
  [property: string]: any;
};
type FallCardStruct$1 = {
  recommend_reason?: string;
  recommend_reason_v2: string;
  [property: string]: any;
};
type FeedCommentConfig$1 = {
  audio_comment_permission: number;
  author_audit_status: number;
  common_flags: string;
  double_publish?: number;
  double_publish_limit?: number;
  input_config_text: string;
  [property: string]: any;
};
type FollowShootClipInfo = {
  clip_from_platform: number;
  clip_from_user?: number;
  clip_video_all: number;
  origin_clip_id: number;
  [property: string]: any;
};
type FriendRecommendInfo = {
  disable_friend_recommend_guide_label: boolean;
  friend_recommend_source: number;
  is_friend_recommend: string;
  label_user_list: LabelUserList[];
  recommend_user_app_list: string;
  [property: string]: any;
};
type LabelUserList = {
  recommend_app_id: number;
  recommend_time: number;
  user: User$3;
  [property: string]: any;
};
type User$3 = {
  avatar: UserAvatar;
  avatar_thumb: UserAvatarThumb;
  follow_status: number;
  nickname: string;
  remark_name?: string;
  sec_uid: string;
  uid: number;
  [property: string]: any;
};
type UserAvatar = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type UserAvatarThumb = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type GalileoPadTextcrop = {
  android_d_h_cut_ratio: number[] | null;
  android_d_v_cut_ratio: number[] | null;
  ipad_d_h_cut_ratio: number[] | null;
  ipad_d_v_cut_ratio: number[] | null;
  pc_blocked_area_ratio: null;
  version: number;
  [property: string]: any;
};
type GameTagInfo$1 = {
  content_type_tag?: ContentTypeTag;
  game_name_tag?: GameNameTag;
  is_game: boolean;
  [property: string]: any;
};
type ContentTypeTag = {
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type GameNameTag = {
  game_id_list: string[];
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type GeneralLabel = {
  candidates: Candidate[];
  right_label_candidates: string[];
  strategy: number;
  [property: string]: any;
};
type Candidate = {
  business_id?: string;
  priority?: number;
  static_label?: StaticLabel;
  type?: number;
  [property: string]: any;
};
type StaticLabel = {
  actions: Action[];
  containers: Container[];
  data: null;
  data_map: DataMap[];
  display_strategies: null;
  external_events: null;
  style: StaticLabelStyle;
  tracking_info: string;
  [property: string]: any;
};
type Action = {
  action_type?: number;
  data?: null;
  data_ref?: string;
  event_id?: string;
  [property: string]: any;
};
type Container = {
  elements?: Element[];
  event_id?: string;
  id?: string;
  style?: ContainerStyle;
  template?: number;
  [property: string]: any;
};
type Element = {
  data_ref: string;
  multi_images: MultiImages;
  text?: Text;
  type: number;
  [property: string]: any;
};
type MultiImages = {
  images: MultiImagesImage[];
  style?: MultiImagesStyle;
  [property: string]: any;
};
type MultiImagesImage = {
  image: ImageImage;
  style: ImageStyle;
  [property: string]: any;
};
type ImageImage = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type ImageStyle = {
  shape?: number;
  size: number;
  [property: string]: any;
};
type MultiImagesStyle = {
  padding: null;
  [property: string]: any;
};
type Text = {
  content: string;
  style: TextStyle;
  [property: string]: any;
};
type TextStyle = {
  bold: boolean;
  font_color: string;
  max_character: number;
  omit_strategy: number;
  size: number;
  [property: string]: any;
};
type ContainerStyle = {
  border_radius: number;
  color: string;
  height: number;
  padding: number[];
  transparency: number;
  [property: string]: any;
};
type DataMap = {
  data?: DataMapData;
  key?: string;
  [property: string]: any;
};
type DataMapData = {
  comment_list: null;
  schema: string;
  user_list: null;
  [property: string]: any;
};
type StaticLabelStyle = {
  container_number: number;
  padding: null;
  [property: string]: any;
};
type HotList = {
  extra: string;
  footer: string;
  header: string;
  hot_score: number;
  i18n_title: string;
  image_url: string;
  pattern_type: number;
  schema: string;
  sentence: string;
  sentence_id: number;
  title: string;
  type: number;
  view_count: number;
  [property: string]: any;
};
type ImageAlbumMusicInfo$1 = {
  begin_time: number;
  end_time: number;
  volume: number;
  [property: string]: any;
};
type AwemeListImage = {
  clip_type: number;
  download_url_list: string[];
  height: number;
  interaction_stickers: null;
  is_new_text_mode: number;
  live_photo_type: number;
  mask_url_list: null;
  uri: string;
  url_list: string[];
  video: ImageVideo;
  watermark_free_download_url_list: null;
  width: number;
  [property: string]: any;
};
type ImageVideo = {
  big_thumbs: string[];
  bit_rate: VideoBitRate[];
  bit_rate_audio: null;
  cdn_url_expired: number;
  cover: PurpleCover;
  download_addr: PurpleDownloadAddr;
  download_suffix_logo_addr: PurpleDownloadSuffixLogoAddr;
  duration: number;
  has_download_suffix_logo_addr: boolean;
  has_watermark: boolean;
  height: number;
  is_bytevc1: number;
  is_callback: boolean;
  is_h265: number;
  is_source_HDR: number;
  meta: string;
  need_set_token: boolean;
  origin_cover: PurpleOriginCover;
  play_addr: FluffyPlayAddr;
  play_addr_h264: PurplePlayAddrH264;
  play_addr_lowbr: PurplePlayAddrLowbr;
  ratio: string;
  tags: null;
  width: number;
  [property: string]: any;
};
type VideoBitRate = {
  bit_rate: number;
  format: string;
  FPS: number;
  gear_name: string;
  HDR_bit: string;
  HDR_type: string;
  is_bytevc1: number;
  is_h265: number;
  play_addr: PurplePlayAddr;
  quality_type: number;
  video_extra: string;
  [property: string]: any;
};
type PurplePlayAddr = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleCover = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleDownloadAddr = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleDownloadSuffixLogoAddr = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleOriginCover = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyPlayAddr = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurplePlayAddrH264 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurplePlayAddrLowbr = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type ImpressionData$1 = {
  group_id_list_a: string[];
  group_id_list_b: number[];
  group_id_list_c: string[];
  group_id_list_d: number[];
  similar_id_list_a: null;
  similar_id_list_b: null;
  [property: string]: any;
};
type ItemWarnNotification$1 = {
  content: string;
  show: boolean;
  type: number;
  [property: string]: any;
};
type MixInfo = {
  cover_url: MixInfoCoverurl;
  create_time: number;
  desc: string;
  enable_ad: number;
  extra: string;
  ids: null;
  is_iaa: number;
  is_serial_mix: number;
  mix_id: string;
  mix_name: string;
  mix_pic_type: number;
  mix_type: number;
  paid_episodes: null;
  share_info: MixInfoShareInfo;
  statis: Statis;
  status: MixInfoStatus;
  update_time: number;
  watched_item: string;
  [property: string]: any;
};
type MixInfoCoverurl = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MixInfoShareInfo = {
  share_desc: string;
  share_desc_info: string;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type Statis = {
  collect_vv: number;
  current_episode: number;
  play_vv: number;
  updated_to_episode: number;
  [property: string]: any;
};
type MixInfoStatus = {
  is_collected: number;
  status: number;
  [property: string]: any;
};
type Music$1 = {
  album: string;
  artist_user_infos: null;
  artists: Artist[];
  audition_duration: number;
  author: string;
  author_deleted: boolean;
  author_position: null;
  author_status: number;
  avatar_large: AvatarLarge$1;
  avatar_medium: MusicAvatarMedium;
  avatar_thumb: MusicAvatarThumb$1;
  binded_challenge_id: number;
  can_background_play: boolean;
  collect_stat: number;
  cover_color_hsv: CoverColorHsv;
  cover_hd: Coverhd$1;
  cover_large: CoverLarge$1;
  cover_medium: MusicCoverMedium;
  cover_thumb: CoverThumb$1;
  dmv_auto_show: boolean;
  dsp_status: number;
  duration: number;
  end_time: number;
  external_song_info: string[];
  extra: string;
  id: number;
  id_str: string;
  is_audio_url_with_cookie: boolean;
  is_commerce_music: boolean;
  is_del_video: boolean;
  is_matched_metadata: boolean;
  is_original: boolean;
  is_original_sound: boolean;
  is_pgc: boolean;
  is_restricted: boolean;
  is_video_self_see: boolean;
  lyric_short_position: null;
  matched_pgc_sound?: MatchedPgcSound;
  mid: string;
  music_chart_ranks: null;
  music_collect_count: number;
  music_cover_atmosphere_color_value: string;
  music_status: number;
  musician_user_infos: null;
  mute_share: boolean;
  offline_desc: string;
  owner_handle: string;
  owner_id: string;
  owner_nickname: string;
  pgc_music_type: number;
  play_url: Playurl$1;
  position: null;
  prevent_download: boolean;
  prevent_item_download_status: number;
  preview_end_time: number;
  preview_start_time: number;
  reason_type: number;
  redirect: boolean;
  schema_url: string;
  search_impr: MusicSearchImpr;
  sec_uid: string;
  shoot_duration: number;
  show_origin_clip: boolean;
  song: Song;
  source_platform: number;
  start_time: number;
  status: number;
  strong_beat_url: StrongBeaturl$1;
  tag_list: null;
  title: string;
  unshelve_countries: null;
  user_count: number;
  video_duration: number;
  [property: string]: any;
};
type Artist = {
  avatar: ArtistAvatar;
  enter_type: number;
  handle: string;
  is_verified: boolean;
  nick_name: string;
  sec_uid: string;
  uid: string;
  [property: string]: any;
};
type ArtistAvatar = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type AvatarLarge$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicAvatarMedium = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicAvatarThumb$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverColorHsv = {
  h: number;
  s: number;
  v: number;
  [property: string]: any;
};
type Coverhd$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverLarge$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicCoverMedium = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MatchedPgcSound = {
  author: string;
  cover_medium: MatchedPgcSoundCoverMedium;
  mixed_author: string;
  mixed_title: string;
  title: string;
  [property: string]: any;
};
type MatchedPgcSoundCoverMedium = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl$1 = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicSearchImpr = {
  entity_id: string;
  [property: string]: any;
};
type Song = {
  artists: null;
  chorus: Chorus;
  chorus_v3_infos: null;
  id: number;
  id_str: string;
  title: string;
  [property: string]: any;
};
type Chorus = {
  duration_ms: number;
  start_ms: number;
  [property: string]: any;
};
type StrongBeaturl$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PhotoSearchEntrance$1 = {
  ecom_type: number;
  [property: string]: any;
};
type PlayProgress$1 = {
  last_modified_time: number;
  play_progress: number;
  [property: string]: any;
};
type PoiPatchInfo = {
  extra: string;
  item_patch_poi_prompt_mark: number;
  [property: string]: any;
};
type ProductGenreInfo = {
  material_genre_sub_type_set: number[];
  product_genre_type: number;
  special_info: SpecialInfo;
  [property: string]: any;
};
type SpecialInfo = {
  recommend_group_name: number;
  [property: string]: any;
};
type PublishPlusAlienation$1 = {
  alienation_type: number;
  [property: string]: any;
};
type RelatedMusicAnchor = {
  extra: string;
  image_url: Imageurl;
  priority: number;
  schema_url: string;
  type: string;
  [property: string]: any;
};
type Imageurl = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type RelationLabel = {
  count: number;
  extra: string;
  label_info: string;
  type: number;
  user_id: string;
  user_list: UserList[];
  [property: string]: any;
};
type UserList = {
  avatar: UserListAvatar;
  avatar_thumb: UserListAvatarThumb;
  follow_status: number;
  nickname: string;
  remark_name?: string;
  sec_uid: string;
  uid: number;
  [property: string]: any;
};
type UserListAvatar = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type UserListAvatarThumb = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type RiskInfos$1 = {
  content: string;
  icon_url?: string;
  risk_sink: boolean;
  type: number;
  vote: boolean;
  warn: boolean;
  warn_level?: number;
  [property: string]: any;
};
type SeriesPaidInfo$1 = {
  item_price: number;
  series_paid_status: number;
  [property: string]: any;
};
type AwemeListShareInfo = {
  bool_persist: number;
  share_desc: string;
  share_desc_info: string;
  share_link_desc: string;
  share_quote: string;
  share_signature_desc: string;
  share_signature_url: string;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type StarAtlasInfo = {
  click_track_url_list: null;
  log_extra: string;
  track_url_list: null;
  [property: string]: any;
};
type Statistics$1 = {
  aweme_id: string;
  collect_count: number;
  comment_count: number;
  digest: string;
  digg_count: number;
  download_count: number;
  exposure_count: number;
  forward_count: number;
  live_watch_count: number;
  lose_comment_count: number;
  lose_count: number;
  play_count: number;
  recommend_count: number;
  share_count: number;
  whatsapp_share_count: number;
  [property: string]: any;
};
type AwemeListStatus = {
  allow_comment: boolean;
  allow_friend_recommend: boolean;
  allow_friend_recommend_guide: boolean;
  allow_self_recommend_to_friend: boolean;
  allow_share: boolean;
  aweme_edit_info: AwemeEditInfo;
  aweme_id: string;
  dont_share_status: number;
  download_status: number;
  enable_soft_delete: number;
  in_reviewing: boolean;
  is_delete: boolean;
  is_private: boolean;
  is_prohibited: boolean;
  listen_video_status: number;
  not_allow_soft_del_reason: string;
  part_see: number;
  private_status: number;
  review_result: ReviewResult$1;
  reviewed: number;
  self_see: boolean;
  video_hide_search: number;
  with_fusion_goods: boolean;
  with_goods: boolean;
  [property: string]: any;
};
type AwemeEditInfo = {
  button_status: number;
  button_toast: string;
  edit_status: number;
  has_modified_all: boolean;
  [property: string]: any;
};
type ReviewResult$1 = {
  review_status: number;
  [property: string]: any;
};
type TextExtra = {
  caption_end: number;
  caption_start: number;
  end: number;
  hashtag_id: string;
  hashtag_name: string;
  is_commerce: boolean;
  sec_uid: string;
  start: number;
  sub_type: number;
  type: number;
  user_id: string;
  [property: string]: any;
};
type TrendsInfo = {
  insert_music_ids?: null;
  track_pass_through?: string;
  trends_materials?: null;
  trends_music_info?: null;
  trends_unified_music_group?: null;
  [property: string]: any;
};
type AwemeListVideo = {
  animated_cover?: AnimatedCover;
  audio: Audio;
  big_thumbs: BigThumb[] | null;
  bit_rate: BitRateBitRate[] | null;
  bit_rate_audio: BitRateAudio[] | null;
  cdn_url_expired?: number;
  cover: FluffyCover;
  download_addr?: FluffyDownloadAddr;
  download_suffix_logo_addr?: FluffyDownloadSuffixLogoAddr;
  duration: number;
  dynamic_cover?: DynamicCover$1;
  format?: string;
  gaussian_cover?: GaussianCover$1;
  has_download_suffix_logo_addr?: boolean;
  has_watermark: boolean;
  height: number;
  horizontal_type?: number;
  is_bytevc1: number;
  is_callback?: boolean;
  is_h265: number;
  is_long_video?: number;
  is_source_HDR?: number;
  meta: string;
  misc_download_addrs?: string;
  need_set_token?: boolean;
  origin_cover: FluffyOriginCover;
  play_addr: StickyPlayAddr;
  play_addr_265?: PlayAddr265$1;
  play_addr_h264?: FluffyPlayAddrH264;
  play_addr_lowbr?: FluffyPlayAddrLowbr;
  ratio: string;
  tags: null;
  use_static_cover?: boolean;
  video_model?: string;
  width: number;
  [property: string]: any;
};
type AnimatedCover = {
  uri: string;
  url_list: string[];
  [property: string]: any;
};
type Audio = {
  original_sound_infos: null;
  [property: string]: any;
};
type BigThumb = {
  duration: number;
  fext: string;
  img_num: number;
  img_url: string;
  img_urls: string[];
  img_x_len: number;
  img_x_size: number;
  img_y_len: number;
  img_y_size: number;
  interval: number;
  uri: string;
  uris: string[];
  [property: string]: any;
};
type BitRateBitRate = {
  bit_rate: number;
  format: string;
  FPS: number;
  gear_name: string;
  HDR_bit: string;
  HDR_type: string;
  is_bytevc1: number;
  is_h265: number;
  play_addr: TentacledPlayAddr;
  quality_type: number;
  video_extra: string;
  [property: string]: any;
};
type TentacledPlayAddr = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type BitRateAudio = {
  audio_extra: string;
  audio_meta: AudioMeta;
  audio_quality: number;
  [property: string]: any;
};
type AudioMeta = {
  bitrate: number;
  codec_type: string;
  encoded_type: string;
  file_hash: string;
  file_id: string;
  format: string;
  fps: number;
  logo_type: string;
  media_type: string;
  quality: string;
  quality_desc: string;
  size: number;
  sub_info: string;
  url_list: UrlList;
  [property: string]: any;
};
type UrlList = {
  backup_url: string;
  fallback_url: string;
  main_url: string;
  [property: string]: any;
};
type FluffyCover = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyDownloadAddr = {
  data_size: number;
  file_cs: string;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyDownloadSuffixLogoAddr = {
  data_size: number;
  file_cs: string;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DynamicCover$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type GaussianCover$1 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyOriginCover = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type StickyPlayAddr = {
  data_size?: number;
  file_cs?: string;
  file_hash?: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddr265$1 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyPlayAddrH264 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyPlayAddrLowbr = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoControl$1 = {
  allow_douplus: boolean;
  allow_download: boolean;
  allow_duet: boolean;
  allow_dynamic_wallpaper: boolean;
  allow_music: boolean;
  allow_react: boolean;
  allow_record: boolean;
  allow_share: boolean;
  allow_stitch: boolean;
  disable_record_reason: string;
  download_ignore_visibility: boolean;
  download_info: DownloadInfo$1;
  draft_progress_bar: number;
  duet_ignore_visibility: boolean;
  duet_info: DuetInfo$1;
  prevent_download_type: number;
  share_grayed: boolean;
  share_ignore_visibility: boolean;
  share_type: number;
  show_progress_bar: number;
  timer_info: {
    [key: string]: any;
  };
  timer_status: number;
  [property: string]: any;
};
type DownloadInfo$1 = {
  fail_info: DownloadInfoFailInfo;
  level: number;
  [property: string]: any;
};
type DownloadInfoFailInfo = {
  code: number;
  msg: string;
  reason: string;
  [property: string]: any;
};
type DuetInfo$1 = {
  fail_info: DuetInfoFailInfo;
  level: number;
  [property: string]: any;
};
type DuetInfoFailInfo = {
  code: number;
  reason: string;
  [property: string]: any;
};
type VideoTag$1 = {
  level: number;
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type VisualSearchInfo$1 = {
  is_ecom_img: boolean;
  is_high_accuracy_ecom: boolean;
  is_high_recall_ecom: boolean;
  is_show_img_entrance: boolean;
  [property: string]: any;
};
type XiguaBaseInfo$1 = {
  item_id: number;
  star_altar_order_id: number;
  star_altar_type: number;
  status: number;
  [property: string]: any;
};
type XiguaTask = {
  is_xigua_task: boolean;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/VideoWork.d.ts
/** 单个视频作品 */
type DyVideoWork = {
  aweme_detail: AwemeDetail;
  log_pb: LogPb$1;
  status_code: number;
  [property: string]: any;
};
type AwemeDetail = {
  activity_video_type: number;
  anchors: null;
  authentication_token: string;
  author: Author$1;
  author_mask_tag: number;
  author_user_id: number;
  aweme_control: AwemeControl;
  aweme_id: string;
  aweme_listen_struct: AwemeListenStruct;
  aweme_type: number;
  aweme_type_tags: string;
  boost_status: number;
  can_cache_to_local: boolean;
  caption: string;
  cf_recheck_ts: number;
  challenge_position: null;
  chapter_list: null;
  collect_stat: number;
  collection_corner_mark: number;
  comment_gid: number;
  comment_list: null;
  comment_permission_info: CommentPermissionInfo;
  commerce_config_data: null;
  component_control: ComponentControl;
  component_info_v2: string;
  cover_labels: null;
  create_time: number;
  danmaku_control: DanmakuControl;
  desc: string;
  disable_relation_bar: number;
  dislike_dimension_list: null;
  dislike_dimension_list_v2: null;
  distribute_circle: DistributeCircle;
  duet_aggregate_in_music_tab: boolean;
  duration: number;
  ecom_comment_atmosphere_type: number;
  enable_comment_sticker_rec: boolean;
  entertainment_product_info: EntertainmentProductInfo;
  fall_card_struct: FallCardStruct;
  feed_comment_config: FeedCommentConfig;
  flash_mob_trends: number;
  friend_interaction: number;
  friend_recommend_info: {
    [key: string]: any;
  };
  game_tag_info: GameTagInfo;
  geofencing: string[];
  geofencing_regions: null;
  group_id: string;
  guide_scene_info: {
    [key: string]: any;
  };
  hybrid_label: null;
  image_album_music_info: ImageAlbumMusicInfo;
  image_comment: {
    [key: string]: any;
  };
  image_crop_ctrl: number;
  image_infos: null;
  image_list: null;
  images: null;
  img_bitrate: null;
  impression_data: ImpressionData;
  incentive_item_type: number;
  interaction_stickers: null;
  is_24_story: number;
  is_ads: boolean;
  is_collects_selected: number;
  is_duet_sing: boolean;
  is_image_beat: boolean;
  is_life_item: boolean;
  is_share_post: boolean;
  is_story: number;
  is_top: number;
  is_use_music: boolean;
  item_title: string;
  item_warn_notification: ItemWarnNotification;
  label_top_text: null;
  libfinsert_task_id: string;
  long_video: null;
  mark_largely_following: boolean;
  media_type: number;
  music: Music;
  nickname_position: null;
  origin_comment_ids: null;
  origin_duet_resource_uri: string;
  origin_text_extra: string[];
  original: number;
  original_images: null;
  packed_clips: null;
  personal_page_botton_diagnose_style: number;
  photo_search_entrance: PhotoSearchEntrance;
  play_progress: PlayProgress;
  position: null;
  preview_title: string;
  preview_video_status: number;
  promotions: string[];
  publish_plus_alienation: PublishPlusAlienation;
  rate: number;
  region: string;
  relation_labels: null;
  risk_infos: RiskInfos;
  seo_info: {
    [key: string]: any;
  };
  series_paid_info: SeriesPaidInfo;
  share_info: AwemeDetailShareInfo;
  share_rec_extra: string;
  share_url: string;
  shoot_way: string;
  should_open_ad_report: boolean;
  show_follow_button: {
    [key: string]: any;
  };
  social_tag_list: null;
  statistics: Statistics;
  status: Status;
  suggest_words: SuggestWords;
  text_extra: string[];
  uniqid_position: null;
  user_digged: number;
  user_recommend_status: number;
  video: Video$1;
  video_control: VideoControl;
  video_game_data_channel_config: {
    [key: string]: any;
  };
  video_labels: null;
  video_share_edit_status: number;
  video_tag: VideoTag[];
  video_text: string[];
  visual_search_info: VisualSearchInfo;
  vtag_search: VtagSearch;
  xigua_base_info: XiguaBaseInfo;
  [property: string]: any;
};
type Author$1 = {
  account_cert_info: string;
  avatar_thumb: AuthorAvatarThumb;
  awemehts_greet_info: string;
  cf_list: null;
  close_friend_type: number;
  contacts_status: number;
  contrail_list: null;
  cover_url: Coverurl[];
  create_time: number;
  custom_verify: string;
  data_label_list: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  favoriting_count: number;
  follow_status: number;
  follower_count: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  following_count: number;
  im_role_ids: null;
  is_ad_fake: boolean;
  is_blocked_v2: boolean;
  is_blocking_v2: boolean;
  is_cf: number;
  live_high_value: number;
  mate_add_permission: number;
  max_follower_count: number;
  nickname: string;
  offline_info_list: null;
  personal_tag_list: null;
  prevent_download: boolean;
  risk_notice_text: string;
  sec_uid: string;
  secret: number;
  share_info: AuthorShareInfo;
  short_id: string;
  signature: string;
  signature_extra: null;
  special_follow_status: number;
  special_people_labels: null;
  status: number;
  text_extra: null;
  total_favorited: number;
  uid: string;
  unique_id: string;
  user_age: number;
  user_canceled: boolean;
  user_permissions: null;
  verification_type: number;
  [property: string]: any;
};
type AuthorAvatarThumb = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverurl = {
  height?: number;
  uri?: string;
  url_list?: string[];
  width?: number;
  [property: string]: any;
};
type AuthorShareInfo = {
  share_desc: string;
  share_desc_info: string;
  share_qrcode_url: ShareQrcodeurl;
  share_title: string;
  share_title_myself: string;
  share_title_other: string;
  share_url: string;
  share_weibo_desc: string;
  [property: string]: any;
};
type ShareQrcodeurl = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AwemeControl = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type AwemeListenStruct = {
  trace_info: string;
  [property: string]: any;
};
type CommentPermissionInfo = {
  can_comment: boolean;
  comment_permission_status: number;
  item_detail_entry: boolean;
  press_entry: boolean;
  toast_guide: boolean;
  [property: string]: any;
};
type ComponentControl = {
  data_source_url: string;
  [property: string]: any;
};
type DanmakuControl = {
  activities: Activity[];
  danmaku_cnt: number;
  enable_danmaku: boolean;
  is_post_denied: boolean;
  pass_through_params: string;
  post_denied_reason: string;
  post_privilege_level: number;
  skip_danmaku: boolean;
  smart_mode_decision: number;
  [property: string]: any;
};
type Activity = {
  id?: number;
  type?: number;
  [property: string]: any;
};
type DistributeCircle = {
  campus_block_interaction: boolean;
  distribute_type: number;
  is_campus: boolean;
  [property: string]: any;
};
type EntertainmentProductInfo = {
  market_info: MarketInfo;
  [property: string]: any;
};
type MarketInfo = {
  limit_free: LimitFree;
  [property: string]: any;
};
type LimitFree = {
  in_free: boolean;
  [property: string]: any;
};
type FallCardStruct = {
  recommend_reason: string;
  recommend_reason_v2: string;
  [property: string]: any;
};
type FeedCommentConfig = {
  author_audit_status: number;
  input_config_text: string;
  [property: string]: any;
};
type GameTagInfo = {
  is_game: boolean;
  [property: string]: any;
};
type ImageAlbumMusicInfo = {
  begin_time: number;
  end_time: number;
  volume: number;
  [property: string]: any;
};
type ImpressionData = {
  group_id_list_a: string[];
  group_id_list_b: string[];
  group_id_list_c: string[];
  similar_id_list_a: null;
  similar_id_list_b: null;
  [property: string]: any;
};
type ItemWarnNotification = {
  content: string;
  show: boolean;
  type: number;
  [property: string]: any;
};
type Music = {
  album: string;
  artist_user_infos: null;
  artists: string[];
  audition_duration: number;
  author: string;
  author_deleted: boolean;
  author_position: null;
  author_status: number;
  avatar_large: AvatarLarge;
  avatar_medium: AvatarMedium;
  avatar_thumb: MusicAvatarThumb;
  binded_challenge_id: number;
  can_background_play: boolean;
  collect_stat: number;
  cover_hd: Coverhd;
  cover_large: CoverLarge;
  cover_medium: CoverMedium;
  cover_thumb: CoverThumb;
  dmv_auto_show: boolean;
  dsp_status: number;
  duration: number;
  end_time: number;
  external_song_info: string[];
  extra: string;
  id: number;
  id_str: string;
  is_audio_url_with_cookie: boolean;
  is_commerce_music: boolean;
  is_del_video: boolean;
  is_matched_metadata: boolean;
  is_original: boolean;
  is_original_sound: boolean;
  is_pgc: boolean;
  is_restricted: boolean;
  is_video_self_see: boolean;
  lyric_short_position: null;
  mid: string;
  music_chart_ranks: null;
  music_collect_count: number;
  music_cover_atmosphere_color_value: string;
  music_status: number;
  musician_user_infos: null;
  mute_share: boolean;
  offline_desc: string;
  owner_handle: string;
  owner_id: string;
  owner_nickname: string;
  pgc_music_type: number;
  play_url: Playurl;
  position: null;
  prevent_download: boolean;
  prevent_item_download_status: number;
  preview_end_time: number;
  preview_start_time: number;
  reason_type: number;
  redirect: boolean;
  schema_url: string;
  search_impr: SearchImpr;
  sec_uid: string;
  shoot_duration: number;
  source_platform: number;
  start_time: number;
  status: number;
  strong_beat_url: StrongBeaturl;
  tag_list: null;
  title: string;
  unshelve_countries: null;
  user_count: number;
  video_duration: number;
  [property: string]: any;
};
type AvatarLarge = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type AvatarMedium = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type MusicAvatarThumb = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Coverhd = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverLarge = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverMedium = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverThumb = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Playurl = {
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type SearchImpr = {
  entity_id: string;
  [property: string]: any;
};
type StrongBeaturl = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PhotoSearchEntrance = {
  ecom_type: number;
  [property: string]: any;
};
type PlayProgress = {
  last_modified_time: number;
  play_progress: number;
  [property: string]: any;
};
type PublishPlusAlienation = {
  alienation_type: number;
  [property: string]: any;
};
type RiskInfos = {
  content: string;
  risk_sink: boolean;
  type: number;
  vote: boolean;
  warn: boolean;
  [property: string]: any;
};
type SeriesPaidInfo = {
  item_price: number;
  series_paid_status: number;
  [property: string]: any;
};
type AwemeDetailShareInfo = {
  share_desc: string;
  share_desc_info: string;
  share_link_desc: string;
  share_url: string;
  [property: string]: any;
};
type Statistics = {
  admire_count: number;
  aweme_id: string;
  collect_count: number;
  comment_count: number;
  digg_count: number;
  play_count: number;
  share_count: number;
  [property: string]: any;
};
type Status = {
  allow_share: boolean;
  aweme_id: string;
  in_reviewing: boolean;
  is_delete: boolean;
  is_prohibited: boolean;
  listen_video_status: number;
  part_see: number;
  private_status: number;
  review_result: ReviewResult;
  [property: string]: any;
};
type ReviewResult = {
  review_status: number;
  [property: string]: any;
};
type SuggestWords = {
  suggest_words: SuggestWord[];
  [property: string]: any;
};
type SuggestWord = {
  hint_text?: string;
  icon_url?: string;
  scene?: string;
  words?: Word[];
  [property: string]: any;
};
type Word = {
  info?: string;
  word?: string;
  word_id?: string;
  [property: string]: any;
};
type Video$1 = {
  audio: {
    [key: string]: any;
  };
  big_thumbs: string[];
  bit_rate: BitRate[];
  bit_rate_audio: null;
  cdn_url_expired: number;
  cover: Cover$2;
  cover_original_scale: CoverOriginalScale;
  download_addr: DownloadAddr;
  download_suffix_logo_addr: DownloadSuffixLogoAddr;
  duration: number;
  dynamic_cover: DynamicCover;
  format: string;
  gaussian_cover: GaussianCover;
  has_download_suffix_logo_addr: boolean;
  has_watermark: boolean;
  height: number;
  is_h265: number;
  is_source_HDR: number;
  meta: string;
  origin_cover: OriginCover;
  play_addr: VideoPlayAddr;
  play_addr_265: PlayAddr265;
  play_addr_h264: PlayAddrH264;
  ratio: string;
  video_model: string;
  width: number;
  [property: string]: any;
};
type BitRate = {
  bit_rate: number;
  format: string;
  FPS: number;
  gear_name: string;
  HDR_bit: string;
  HDR_type: string;
  is_bytevc1: number;
  is_h265: number;
  play_addr: BitRatePlayAddr;
  quality_type: number;
  video_extra: string;
  [property: string]: any;
};
type BitRatePlayAddr = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Cover$2 = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type CoverOriginalScale = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadAddr = {
  data_size: number;
  file_cs: string;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DownloadSuffixLogoAddr = {
  data_size: number;
  file_cs: string;
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type DynamicCover = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type GaussianCover = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type OriginCover = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoPlayAddr = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddr265 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PlayAddrH264 = {
  data_size: number;
  file_cs: string;
  file_hash: string;
  height: number;
  uri: string;
  url_key: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type VideoControl = {
  allow_douplus: boolean;
  allow_download: boolean;
  allow_duet: boolean;
  allow_dynamic_wallpaper: boolean;
  allow_music: boolean;
  allow_react: boolean;
  allow_record: boolean;
  allow_share: boolean;
  allow_stitch: boolean;
  disable_record_reason: string;
  download_ignore_visibility: boolean;
  download_info: DownloadInfo;
  draft_progress_bar: number;
  duet_ignore_visibility: boolean;
  duet_info: DuetInfo;
  prevent_download_type: number;
  share_grayed: boolean;
  share_ignore_visibility: boolean;
  share_type: number;
  show_progress_bar: number;
  timer_info: {
    [key: string]: any;
  };
  timer_status: number;
  [property: string]: any;
};
type DownloadInfo = {
  level: number;
  [property: string]: any;
};
type DuetInfo = {
  level: number;
  [property: string]: any;
};
type VideoTag = {
  level: number;
  tag_id: number;
  tag_name: string;
  [property: string]: any;
};
type VisualSearchInfo = {
  is_ecom_img: boolean;
  is_high_accuracy_ecom: boolean;
  is_high_recall_ecom: boolean;
  is_show_img_entrance: boolean;
  visual_search_longpress: number;
  [property: string]: any;
};
type VtagSearch = {
  vtag_delay_ts: number;
  vtag_enable: boolean;
  [property: string]: any;
};
type XiguaBaseInfo = {
  item_id: number;
  star_altar_order_id: number;
  star_altar_type: number;
  status: number;
  [property: string]: any;
};
type LogPb$1 = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/WorkComments.d.ts
type DyWorkComments = {
  comment_common_data: string;
  comment_config: {
    [key: string]: any;
  };
  comments: Comment$1[];
  cursor: number;
  extra: Extra;
  fast_response_comment: FastResponseComment;
  folded_comment_count: number;
  general_comment_config: {
    [key: string]: any;
  };
  has_more: number;
  hotsoon_filtered_count: number;
  log_pb: LogPb;
  reply_style: number;
  show_management_entry_point: number;
  status_code: number;
  total: number;
  user_commented: number;
  [property: string]: any;
};
type Comment$1 = {
  aweme_id: string;
  can_share: boolean;
  cid: string;
  content_type: number;
  create_time: number;
  digg_count: number;
  enter_from: string;
  image_list: ImageList$2[] | null;
  ip_label: string;
  is_author_digged: boolean;
  is_first_visitor_cmt?: boolean;
  is_folded: boolean;
  is_hot: boolean;
  is_note_comment: number;
  is_user_tend_to_reply: boolean;
  item_comment_total: number;
  label_list: LabelList[] | null;
  label_text: string;
  label_type: number;
  level: number;
  reply_comment: ReplyComment[] | null;
  reply_comment_total: number;
  reply_id: string;
  reply_to_reply_id: string;
  sort_tags: string;
  status: number;
  stick_position: number;
  text: string;
  text_extra: string[];
  text_music_info: null;
  user: CommentUser;
  user_buried: boolean;
  user_digged: number;
  video_list: null;
  [property: string]: any;
};
type ImageList$2 = {
  crop_url: Cropurl;
  download_url: Downloadurl;
  medium_url: Mediumurl;
  origin_url: Originurl;
  thumb_url: Thumburl;
  [property: string]: any;
};
type Cropurl = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Downloadurl = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Mediumurl = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Originurl = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type Thumburl = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type LabelList = {
  text?: string;
  type?: number;
  [property: string]: any;
};
type ReplyComment = {
  aweme_id: string;
  can_share: boolean;
  cid: string;
  content_type: number;
  create_time: number;
  digg_count: number;
  image_list: null;
  ip_label: string;
  is_author_digged: boolean;
  is_folded: boolean;
  is_hot: boolean;
  is_note_comment: number;
  label_list: null;
  label_text: string;
  label_type: number;
  level: number;
  reply_comment: null;
  reply_id: string;
  reply_to_reply_id: string;
  status: number;
  text: string;
  text_extra: any[];
  text_music_info: null;
  user: ReplyCommentUser;
  user_buried: boolean;
  user_digged: number;
  video_list: null;
  [property: string]: any;
};
type ReplyCommentUser = {
  ad_cover_url: null;
  avatar_schema_list: null;
  avatar_thumb: PurpleAvatarThumb;
  aweme_control: PurpleAwemeControl;
  ban_user_functions: null;
  batch_unfollow_contain_tabs: null;
  batch_unfollow_relation_desc: null;
  can_set_geofencing: null;
  card_entries: null;
  card_entries_not_display: null;
  card_sort_priority: null;
  cf_list: null;
  cha_list: null;
  close_friend_type: number;
  comment_setting: number;
  commerce_user_level: number;
  contrail_list: null;
  cover_url: null;
  creator_tag_list: null;
  custom_verify: string;
  data_label_list: null;
  disable_image_comment_saved: number;
  display_info: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  familiar_visitor_user: null;
  follow_status: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  followers_detail: null;
  geofencing: null;
  homepage_bottom_toast: null;
  im_role_ids: null;
  interest_tags: null;
  is_ad_fake: boolean;
  is_block: boolean;
  is_blocked_v2: boolean;
  is_blocking_v2: boolean;
  is_star: boolean;
  item_list: null;
  link_item_list: null;
  need_points: null;
  new_story_cover: null;
  nickname: string;
  not_seen_item_id_list: null;
  not_seen_item_id_list_v2: null;
  offline_info_list: null;
  personal_tag_list: null;
  platform_sync_info: null;
  private_relation_list: null;
  profile_mob_params: null;
  region: string;
  relative_users: null;
  sec_uid: string;
  secret: number;
  short_id: string;
  signature_extra: null;
  special_people_labels: null;
  status: number;
  text_extra: null;
  type_label: null;
  uid: string;
  unique_id: string;
  user_canceled: boolean;
  user_permissions: null;
  user_tags: null;
  verification_permission_ids: null;
  white_cover_url: null;
  [property: string]: any;
};
type PurpleAvatarThumb = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type PurpleAwemeControl = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type CommentUser = {
  ad_cover_url: null;
  avatar_schema_list: null;
  avatar_thumb: FluffyAvatarThumb;
  aweme_control: FluffyAwemeControl;
  ban_user_functions: number[];
  batch_unfollow_contain_tabs: null;
  batch_unfollow_relation_desc: null;
  can_set_geofencing: null;
  card_entries: null;
  card_entries_not_display: null;
  card_sort_priority: null;
  cf_list: null;
  cha_list: null;
  close_friend_type: number;
  comment_setting: number;
  commerce_user_level: number;
  contrail_list: null;
  cover_url: null;
  creator_tag_list: null;
  custom_verify: string;
  data_label_list: null;
  disable_image_comment_saved: number;
  display_info: null;
  endorsement_info_list: null;
  enterprise_verify_reason: string;
  familiar_visitor_user: null;
  follow_status: number;
  follower_list_secondary_information_struct: null;
  follower_status: number;
  geofencing: null;
  homepage_bottom_toast: null;
  im_role_ids: null;
  interest_tags: null;
  is_ad_fake: boolean;
  is_block: boolean;
  is_blocked_v2: boolean;
  is_blocking_v2: boolean;
  is_star: boolean;
  item_list: null;
  link_item_list: null;
  need_points: null;
  new_story_cover: null;
  nickname: string;
  not_seen_item_id_list: null;
  not_seen_item_id_list_v2: null;
  offline_info_list: null;
  personal_tag_list: null;
  platform_sync_info: null;
  private_relation_list: null;
  profile_mob_params: null;
  region: string;
  relative_users: null;
  sec_uid: string;
  secret: number;
  short_id: string;
  signature_extra: null;
  special_people_labels: null;
  status: number;
  text_extra: null;
  type_label: null;
  uid: string;
  unique_id: string;
  user_canceled: boolean;
  user_permissions: null;
  user_tags: null;
  verification_permission_ids: null;
  white_cover_url: null;
  [property: string]: any;
};
type FluffyAvatarThumb = {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
  [property: string]: any;
};
type FluffyAwemeControl = {
  can_comment: boolean;
  can_forward: boolean;
  can_share: boolean;
  can_show_comment: boolean;
  [property: string]: any;
};
type Extra = {
  fatal_item_ids: null;
  now: number;
  [property: string]: any;
};
type FastResponseComment = {
  constant_response_words: string[];
  timed_response_words: string[];
  [property: string]: any;
};
type LogPb = {
  impr_id: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Douyin/index.d.ts
type DySearchInfo = SearchInfoGeneralData | SearchInfoUser | SearchInfoVideo;
/**
 * 抖音返回类型映射
 *
 * 将 methodType 映射到对应的返回数据类型
 */
interface DouyinReturnTypeMap {
  parseWork: DyVideoWork | DyImageAlbumWork | DySlidesWork | DyImageAlbumWork & ArticleWork;
  textWork: ArticleWork;
  videoWork: DyVideoWork;
  imageAlbumWork: DyImageAlbumWork;
  slidesWork: DySlidesWork;
  comments: DyWorkComments;
  userProfile: DyUserInfo;
  userVideoList: DyUserPostVideos;
  userFavoriteList: UserFavoriteList;
  userRecommendList: UserRecommendList;
  suggestWords: DySuggestWords;
  search: DySearchInfo;
  emojiList: DyEmojiList;
  dynamicEmojiList: DyEmojiProList;
  danmakuList: DyDanmakuList;
  musicInfo: DyMusicWork;
  liveRoomInfo: DyUserLiveVideos;
  loginQrcode: any;
  commentReplies: CommentReply;
} //#endregion
//#region src/types/ReturnDataType/Kuaishou/EmojiList.d.ts
type KsEmojiList = {
  data: Data$2;
  [property: string]: any;
};
type Data$2 = {
  visionBaseEmoticons: VisionBaseEmoticons;
  [property: string]: any;
};
type VisionBaseEmoticons = {
  __typename: string;
  iconUrls: IconUrls;
  [property: string]: any;
};
type IconUrls = {
  '[666]': string;
  '[addition]': string;
  '[ahead]': string;
  '[airdrop]': string;
  '[almostcry]': string;
  '[alpaca]': string;
  '[amazing]': string;
  '[angry]': string;
  '[arranged]': string;
  '[awkard]': string;
  '[awkward]': string;
  '[balloon]': string;
  '[banger]': string;
  '[blissful]': string;
  '[boom]': string;
  '[boss]': string;
  '[brick]': string;
  '[bro]': string;
  '[BusyCrazy]': string;
  '[bye]': string;
  '[cake]': string;
  '[camera]': string;
  '[CanNotFinish]': string;
  '[cat]': string;
  '[celebrate]': string;
  '[celebrity]': string;
  '[checkmark]': string;
  '[cheers]': string;
  '[clap]': string;
  '[ComeOn]': string;
  '[Confused]': string;
  '[cool]': string;
  '[crazy]': string;
  '[cross]': string;
  '[crown]': string;
  '[cry]': string;
  '[cryLaugh]': string;
  '[Cuddle]': string;
  '[curious]': string;
  '[curl]': string;
  '[curse]': string;
  '[dance]': string;
  '[daydream]': string;
  '[daydreaming]': string;
  '[dazzling]': string;
  '[despise]': string;
  '[devastated]': string;
  '[dial]': string;
  '[dignose]': string;
  '[dirtytalk]': string;
  '[disdain]': string;
  '[distressed]': string;
  '[dizzy]': string;
  '[dog]': string;
  '[dogfood]': string;
  '[double]': string;
  '[dragon]': string;
  '[eat]': string;
  '[eatmelon]': string;
  '[emo]': string;
  '[energetic]': string;
  '[exercise]': string;
  '[explosion]': string;
  '[eyeroll]': string;
  '[EyesRolling]': string;
  '[facepalm]': string;
  '[fade]': string;
  '[fighting]': string;
  '[fire]': string;
  '[fireworks]': string;
  '[fistBump]': string;
  '[flirting]': string;
  '[follow]': string;
  '[forcesmile]': string;
  '[fortune]': string;
  '[fossil]': string;
  '[frown]': string;
  '[furious]': string;
  '[gamepad]': string;
  '[GameTime]': string;
  '[get]': string;
  '[ghost]': string;
  '[gold]': string;
  '[good]': string;
  '[goodmorning]': string;
  '[goodnight]': string;
  '[grin]': string;
  '[handheart]': string;
  '[hanging]': string;
  '[happy]': string;
  '[HappyNewYear]': string;
  '[HappySpringFestival]': string;
  '[hard]': string;
  '[HaveFun]': string;
  '[heart]': string;
  '[helmet]': string;
  '[Hi]': string;
  '[hitface]': string;
  '[hole]': string;
  '[Homework]': string;
  '[hug]': string;
  '[hustle]': string;
  '[ILoveU]': string;
  '[immediately]': string;
  '[joyful]': string;
  '[kiss]': string;
  '[kitty]': string;
  '[knee]': string;
  '[knife]': string;
  '[lateNight]': string;
  '[latern]': string;
  '[laughcry]': string;
  '[learning]': string;
  '[left]': string;
  '[leftfist]': string;
  '[like]': string;
  '[lion]': string;
  '[lipstick]': string;
  '[love]': string;
  '[loveu]': string;
  '[luck]': string;
  '[makeup]': string;
  '[microphone]': string;
  '[minus]': string;
  '[mirror]': string;
  '[mojito]': string;
  '[money]': string;
  '[mouse]': string;
  '[muscle]': string;
  '[music]': string;
  '[N95]': string;
  '[nail]': string;
  '[naughty]': string;
  '[nice]': string;
  '[no]': string;
  '[nolisten]': string;
  '[nolook]': string;
  '[nosebleed]': string;
  '[nospeak]': string;
  '[nostrils]': string;
  '[oh]': string;
  '[ok]': string;
  '[omg]': string;
  '[oops]': string;
  '[overworking]': string;
  '[pan]': string;
  '[party]': string;
  '[pat]': string;
  '[pig]': string;
  '[pigfoot]': string;
  '[pignose]': string;
  '[plea]': string;
  '[please]': string;
  '[pollution]': string;
  '[poor]': string;
  '[pout]': string;
  '[pray]': string;
  '[prickekheart]': string;
  '[Progress0]': string;
  '[Progress50]': string;
  '[Progress99]': string;
  '[quiet]': string;
  '[rainbow]': string;
  '[Really]': string;
  '[received]': string;
  '[redface]': string;
  '[redpacket]': string;
  '[relax]': string;
  '[rich]': string;
  '[right]': string;
  '[rightFist]': string;
  '[rose]': string;
  '[rotate]': string;
  '[sad]': string;
  '[salute]': string;
  '[SayHi]': string;
  '[scare]': string;
  '[scared]': string;
  '[seen]': string;
  '[shakeHands]': string;
  '[shiba]': string;
  '[shit]': string;
  '[shutup]': string;
  '[shy]': string;
  '[simper]': string;
  '[skeleton]': string;
  '[slacking]': string;
  '[sleep]': string;
  '[sleepy]': string;
  '[smile]': string;
  '[sneak]': string;
  '[snicker]': string;
  '[snort]': string;
  '[sophisticated]': string;
  '[Sorry]': string;
  '[sour]': string;
  '[stable]': string;
  '[starryeyed]': string;
  '[StayingUpLate]': string;
  '[StayPositive]': string;
  '[stunned]': string;
  '[stupid]': string;
  '[surprised]': string;
  '[sweat]': string;
  '[sweaty]': string;
  '[tears]': string;
  '[tease]': string;
  '[TellMeMore]': string;
  '[thanks]': string;
  '[think]': string;
  '[titter]': string;
  '[touch]': string;
  '[treacherous]': string;
  '[VacationTime]': string;
  '[vanillcake]': string;
  '[vibrant]': string;
  '[vomit]': string;
  '[vomitblood]': string;
  '[Wait]': string;
  '[waiting]': string;
  '[wanttoeat]': string;
  '[washhands]': string;
  '[watergun]': string;
  '[weary]': string;
  '[welcome]': string;
  '[wetwipes]': string;
  '[what]': string;
  '[whistle]': string;
  '[win]': string;
  '[wipenose]': string;
  '[won]': string;
  '[wronged]': string;
  '[yawn]': string;
  '[yes]': string;
  '[YouRight]': string;
  '[一起嗨皮]': string;
  '[上号]': string;
  '[上吊]': string;
  '[上號]': string;
  '[不听]': string;
  '[不看]': string;
  '[不聽]': string;
  '[不說]': string;
  '[不说]': string;
  '[乾杯]': string;
  '[亲亲]': string;
  '[优秀]': string;
  '[你好呀]': string;
  '[做不完]': string;
  '[做作业]': string;
  '[做作業]': string;
  '[健身]': string;
  '[偷瞄]': string;
  '[偷笑]': string;
  '[優秀]': string;
  '[元宝]': string;
  '[元寶]': string;
  '[元旦快乐]': string;
  '[元旦快樂]': string;
  '[元气满满]': string;
  '[元氣滿滿]': string;
  '[充满干劲]': string;
  '[充滿幹勁]': string;
  '[先睡了]': string;
  '[八倍鏡]': string;
  '[八倍镜]': string;
  '[再見]': string;
  '[再见]': string;
  '[冷汗]': string;
  '[减1]': string;
  '[出去丸]': string;
  '[出去玩]': string;
  '[出魂儿]': string;
  '[出魂兒]': string;
  '[加1]': string;
  '[加油]': string;
  '[勤洗手]': string;
  '[化妆]': string;
  '[化妝]': string;
  '[南]': string;
  '[卷]': string;
  '[叉号]': string;
  '[叉號]': string;
  '[双鸡]': string;
  '[发]': string;
  '[发呆]': string;
  '[口紅]': string;
  '[口红]': string;
  '[可怜]': string;
  '[可憐]': string;
  '[右哼哼]': string;
  '[右拳]': string;
  '[吃瓜]': string;
  '[吃飯]': string;
  '[吃饭]': string;
  '[吐彩虹]': string;
  '[吐血]': string;
  '[吓]': string;
  '[听音乐]': string;
  '[吹口哨]': string;
  '[呆住]': string;
  '[呕吐]': string;
  '[哈欠]': string;
  '[哦]': string;
  '[哭笑]': string;
  '[哼]': string;
  '[嘔吐]': string;
  '[嘘]': string;
  '[嘣]': string;
  '[嚇]': string;
  '[囧]': string;
  '[困]': string;
  '[困死了]': string;
  '[坏笑]': string;
  '[坑]': string;
  '[塗指甲]': string;
  '[壞笑]': string;
  '[大便]': string;
  '[大哥]': string;
  '[大哭]': string;
  '[大鼻孔]': string;
  '[天啊]': string;
  '[头盔]': string;
  '[奸笑]': string;
  '[好运来]': string;
  '[好運來]': string;
  '[委屈]': string;
  '[学习]': string;
  '[學習]': string;
  '[安排]': string;
  '[对不起]': string;
  '[对号]': string;
  '[尊嘟假嘟]': string;
  '[對不起]': string;
  '[對號]': string;
  '[尴尬]': string;
  '[尷尬]': string;
  '[左哼哼]': string;
  '[左拳]': string;
  '[已閱]': string;
  '[已阅]': string;
  '[干杯]': string;
  '[平底鍋]': string;
  '[平底锅]': string;
  '[庆祝]': string;
  '[強顏歡笑]': string;
  '[强颜欢笑]': string;
  '[微笑]': string;
  '[心心]': string;
  '[必勝]': string;
  '[必胜]': string;
  '[忙疯了]': string;
  '[忙瘋了]': string;
  '[快哭了]': string;
  '[怒言]': string;
  '[思考]': string;
  '[惊恐]': string;
  '[惊讶]': string;
  '[想吃]': string;
  '[愉快]': string;
  '[愛你]': string;
  '[愛心]': string;
  '[慶祝]': string;
  '[憨笑]': string;
  '[我愛你]': string;
  '[我爱你]': string;
  '[我看行]': string;
  '[戴口罩]': string;
  '[手柄]': string;
  '[扎心]': string;
  '[打call]': string;
  '[打招呼]': string;
  '[打电话]': string;
  '[打脸]': string;
  '[打臉]': string;
  '[打電話]': string;
  '[抓狂]': string;
  '[抠鼻]': string;
  '[抱抱]': string;
  '[抱拳]': string;
  '[拍一拍]': string;
  '[拜托]': string;
  '[拜託]': string;
  '[挑逗]': string;
  '[捂脸]': string;
  '[捂臉]': string;
  '[握手]': string;
  '[摄像机]': string;
  '[摳鼻]': string;
  '[摸头]': string;
  '[摸頭]': string;
  '[摸魚]': string;
  '[摸鱼]': string;
  '[撇嘴]': string;
  '[擦鼻涕]': string;
  '[攝像機]': string;
  '[收到]': string;
  '[放假啦]': string;
  '[放輕鬆]': string;
  '[放轻松]': string;
  '[敬礼]': string;
  '[敬禮]': string;
  '[新年快乐]': string;
  '[新年快樂]': string;
  '[旋轉]': string;
  '[旋转]': string;
  '[早上好]': string;
  '[星星眼]': string;
  '[晕]': string;
  '[暈]': string;
  '[暴汗]': string;
  '[有八卦]': string;
  '[期待]': string;
  '[板砖]': string;
  '[板磚]': string;
  '[柴犬]': string;
  '[欢迎]': string;
  '[歡迎]': string;
  '[正能量]': string;
  '[比心]': string;
  '[气球]': string;
  '[氣球]': string;
  '[水枪]': string;
  '[水槍]': string;
  '[求求了]': string;
  '[汗]': string;
  '[流鼻血]': string;
  '[涂指甲]': string;
  '[減1]': string;
  '[湿巾]': string;
  '[濕巾]': string;
  '[火]': string;
  '[灯笼]': string;
  '[点点关注]': string;
  '[点赞]': string;
  '[烟花]': string;
  '[煙花]': string;
  '[熬夜]': string;
  '[熬夜工作]': string;
  '[燈籠]': string;
  '[爆炸]': string;
  '[爱你]': string;
  '[爱心]': string;
  '[狗]': string;
  '[狗粮]': string;
  '[狗糧]': string;
  '[狮子]': string;
  '[猪头]': string;
  '[猪蹄]': string;
  '[猪鼻子]': string;
  '[猫]': string;
  '[獅子]': string;
  '[玫瑰]': string;
  '[生气]': string;
  '[生氣]': string;
  '[略略略]': string;
  '[疑問]': string;
  '[疑问]': string;
  '[疯狂工作]': string;
  '[疲惫]': string;
  '[疲憊]': string;
  '[瘋狂工作]': string;
  '[發]': string;
  '[發呆]': string;
  '[白眼]': string;
  '[皇冠]': string;
  '[皱眉]': string;
  '[皺眉]': string;
  '[睡覺]': string;
  '[睡觉]': string;
  '[石化]': string;
  '[礼花]': string;
  '[祈祷]': string;
  '[祈禱]': string;
  '[福字]': string;
  '[禮花]': string;
  '[稍等]': string;
  '[稳]': string;
  '[穩]': string;
  '[空投]': string;
  '[笑哭]': string;
  '[紅包]': string;
  '[紅臉蛋]': string;
  '[絕]': string;
  '[網紅]': string;
  '[網紅貓]': string;
  '[红包]': string;
  '[红脸蛋]': string;
  '[绝]': string;
  '[网红]': string;
  '[网红猫]': string;
  '[罵你]': string;
  '[羊駝]': string;
  '[羊驼]': string;
  '[美滋滋]': string;
  '[羞涩]': string;
  '[羞澀]': string;
  '[翻白眼]': string;
  '[老司机]': string;
  '[老司機]': string;
  '[老鐵]': string;
  '[老铁]': string;
  '[老鼠]': string;
  '[聽音樂]': string;
  '[肌肉]': string;
  '[胡思乱想]': string;
  '[胡思亂想]': string;
  '[色]': string;
  '[花謝了]': string;
  '[花谢了]': string;
  '[莫吉托]': string;
  '[菜刀]': string;
  '[落泪]': string;
  '[落淚]': string;
  '[蛋糕]': string;
  '[裂开]': string;
  '[裂開]': string;
  '[装傻]': string;
  '[裝傻]': string;
  '[親親]': string;
  '[調皮]': string;
  '[讓人頭大]': string;
  '[讚]': string;
  '[让人头大]': string;
  '[调皮]': string;
  '[豬蹄]': string;
  '[豬頭]': string;
  '[豬鼻子]': string;
  '[貓]': string;
  '[貼貼]': string;
  '[贏麻了]': string;
  '[贴贴]': string;
  '[赞]': string;
  '[赢麻了]': string;
  '[跪下]': string;
  '[跳舞]': string;
  '[辣眼睛]': string;
  '[进度0]': string;
  '[进度50]': string;
  '[进度99]': string;
  '[進度0]': string;
  '[進度50]': string;
  '[進度99]': string;
  '[遙遙領先]': string;
  '[遥遥领先]': string;
  '[鄙視]': string;
  '[鄙视]': string;
  '[酷]': string;
  '[酸了]': string;
  '[錢]': string;
  '[钱]': string;
  '[閉嘴]': string;
  '[闭嘴]': string;
  '[难受]': string;
  '[难过]': string;
  '[难过至极]': string;
  '[雙雞]': string;
  '[難受]': string;
  '[難過]': string;
  '[難過至極]': string;
  '[雾霾]': string;
  '[霧霾]': string;
  '[鞭炮]': string;
  '[頭盔]': string;
  '[香子蘭蛋糕]': string;
  '[香草蛋糕]': string;
  '[馬上安排]': string;
  '[驚恐]': string;
  '[驚訝]': string;
  '[马上安排]': string;
  '[骂你]': string;
  '[骷髅]': string;
  '[骷髏]': string;
  '[麥克風]': string;
  '[麦克风]': string;
  '[黑脸问]': string;
  '[黑臉問]': string;
  '[點贊]': string;
  '[點點關注]': string;
  '[鼓掌]': string;
  '[齜牙]': string;
  '[龇牙]': string;
  '[龍]': string;
  '[龙]': string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Kuaishou/LiveRoomDetail.d.ts
type KsLiveRoomInfo = {
  principalId?: string;
  activeIndex: number;
  current: KsLiveRoomPlayItem | null;
  playList: KsLiveRoomPlayItem[];
  websocketUrls: string[];
  token: string;
  noticeList: any[];
  loading: boolean;
  emoji: KsLiveRoomEmojiState;
  [property: string]: any;
};
type KsLiveRoomDetail = KsLiveRoomInfo;
type KsLiveRoomEmojiState = {
  iconUrls: Record<string, string>;
  giftList: KsLiveRoomGift[];
  giftPanelList: any[];
  token: string;
  panelToken: string;
  longSendGiftType: number | string | null;
  [property: string]: any;
};
type KsLiveRoomGift = {
  id: number;
  name: string;
  type: number;
  unitPrice: number;
  maxBatchSize: number;
  actionType: number;
  canCombo: boolean;
  canPreview: boolean;
  virtualPrice: number;
  promptMessages: Record<string, string>;
  giftTypeName: string;
  liveGiftDescriptionKey: string;
  liveGiftRuleUrl: string;
  picUrl: Array<Record<string, string>>;
  subscriptImageUrl?: Array<Record<string, string>>;
  liveGiftBackgroundColorList?: string[];
  [property: string]: any;
};
type KsLiveRoomPlayItem = {
  liveStream: KsLiveStreamInfo;
  author: KsLiveRoomAuthor;
  gameInfo: KsLiveRoomGameInfo;
  isLiving: boolean;
  authToken: string | null;
  config: KsLiveRoomConfig;
  websocketInfo: any;
  status: number | Record<string, any>;
  [property: string]: any;
};
type KsLiveStreamInfo = {
  id: string;
  poster: string;
  playUrls: Record<string, any> | any[];
  url: string;
  hlsPlayUrl: string;
  location: string | null;
  type: string;
  liveGuess: boolean;
  expTag: string;
  privateLive: boolean;
  [property: string]: any;
};
type KsLiveRoomAuthor = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  sex: string;
  living: boolean;
  followStatus: string;
  constellation: string;
  cityName: string;
  originUserId: number;
  privacy: boolean;
  isNew: boolean;
  timestamp: number;
  verifiedStatus: Record<string, any>;
  bannedStatus: Record<string, any>;
  counts: Record<string, any>;
  [property: string]: any;
};
type KsLiveRoomGameInfo = {
  id?: string | number;
  name?: string;
  poster?: string;
  description?: string;
  categoryAbbr?: string;
  categoryName?: string;
  watchingCount?: string;
  roomCount?: string;
  [property: string]: any;
};
type KsLiveRoomConfig = {
  rtCoverUrl?: string;
  hlsPlayUrl?: string;
  liveStreamId?: string;
  coverUrl?: string;
  caption?: string;
  likeCount?: string;
  coverHeight?: number;
  coverWidth?: number;
  privateLive?: boolean;
  synthesizeLive?: boolean;
  revenueRankWinnerIcon?: any[];
  liveWish?: boolean;
  watchingCount?: string;
  gameInfo?: Record<string, any>;
  landscape?: boolean;
  multiResolutionPlayUrls?: any[];
  user?: Record<string, any>;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Kuaishou/OneWork.d.ts
type KsOneWork = {
  data: Data$1;
  [property: string]: any;
};
type Data$1 = {
  visionVideoDetail: VisionVideoDetail;
  [property: string]: any;
};
type VisionVideoDetail = {
  __typename: string;
  author: Author;
  commentLimit: CommentLimit;
  danmakuSwitch: boolean;
  llsid: string;
  photo: Photo;
  status: number;
  tags: Tag$1[];
  type: number;
  [property: string]: any;
};
type Author = {
  __typename: string;
  following: boolean;
  headerUrl: string;
  id: string;
  name: string;
  [property: string]: any;
};
type CommentLimit = {
  __typename: string;
  canAddComment: number;
  [property: string]: any;
};
type Photo = {
  __typename: string;
  caption: string;
  coronaCropManifest: null;
  coronaCropManifestH265: null;
  coverUrl: string;
  croppedPhotoH265Url: string;
  croppedPhotoUrl: string;
  duration: number;
  expTag: string;
  id: string;
  likeCount: string;
  liked: boolean;
  llsid: null;
  manifest: Manifest;
  manifestH265: ManifestH265;
  musicBlocked: null;
  photoH265Url: string;
  photoUrl: string;
  realLikeCount: number;
  stereoType: number;
  timestamp: number;
  videoRatio: number;
  videoResource: VideoResource;
  viewCount: string;
  [property: string]: any;
};
type Manifest = {
  __typename: string;
  adaptationSet: ManifestAdaptationSet[];
  businessType: number;
  mediaType: number;
  version: string;
  [property: string]: any;
};
type ManifestAdaptationSet = {
  __typename?: string;
  duration?: number;
  id?: number;
  representation?: PurpleRepresentation[];
  [property: string]: any;
};
type PurpleRepresentation = {
  __typename?: string;
  avgBitrate?: number;
  backupUrl?: string[];
  codecs?: null;
  defaultSelect?: boolean;
  disableAdaptive?: boolean;
  featureP2sp?: boolean;
  frameRate?: number;
  height?: number;
  hidden?: boolean;
  id?: number;
  m3u8Slice?: null;
  maxBitrate?: number;
  qualityLabel?: string;
  qualityType?: string;
  url?: string;
  width?: number;
  [property: string]: any;
};
type ManifestH265 = {
  adaptationSet: ManifestH265AdaptationSet[];
  businessType: number;
  hideAuto: boolean;
  manualDefaultSelect: boolean;
  mediaType: number;
  playInfo: ManifestH265PlayInfo;
  stereoType: number;
  version: string;
  videoFeature: ManifestH265VideoFeature;
  videoId: string;
  [property: string]: any;
};
type ManifestH265AdaptationSet = {
  duration?: number;
  id?: number;
  representation?: FluffyRepresentation[];
  [property: string]: any;
};
type FluffyRepresentation = {
  agc?: boolean;
  avgBitrate?: number;
  backupUrl?: string[];
  comment?: string;
  defaultSelect?: boolean;
  disableAdaptive?: boolean;
  featureP2sp?: boolean;
  fileSize?: number;
  frameRate?: number;
  hdrType?: number;
  height?: number;
  hidden?: boolean;
  id?: number;
  kvqScore?: PurpleKvqScore;
  makeupGain?: number;
  maxBitrate?: number;
  mute?: boolean;
  normalizeGain?: number;
  oriLoudness?: number;
  p2spCode?: string;
  quality?: number;
  qualityLabel?: string;
  qualityType?: string;
  url?: string;
  width?: number;
  [property: string]: any;
};
type PurpleKvqScore = {
  NR: number;
  NRPost: number;
  [property: string]: any;
};
type ManifestH265PlayInfo = {
  cdnTimeRangeLevel: number;
  [property: string]: any;
};
type ManifestH265VideoFeature = {
  avgEntropy: number;
  blockyProbability: number;
  blurProbability: number;
  mosScore: number;
  [property: string]: any;
};
type VideoResource = {
  h264: H264;
  hevc: Hevc;
  [property: string]: any;
};
type H264 = {
  adaptationSet: H264AdaptationSet[];
  businessType: number;
  hideAuto: boolean;
  manualDefaultSelect: boolean;
  mediaType: number;
  playInfo: H264PlayInfo;
  stereoType: number;
  version: string;
  videoFeature: H264VideoFeature;
  videoId: string;
  [property: string]: any;
};
type H264AdaptationSet = {
  duration?: number;
  id?: number;
  representation?: TentacledRepresentation[];
  [property: string]: any;
};
type TentacledRepresentation = {
  agc?: boolean;
  avgBitrate?: number;
  backupUrl?: string[];
  bitratePattern?: number[];
  comment?: string;
  defaultSelect?: boolean;
  disableAdaptive?: boolean;
  featureP2sp?: boolean;
  fileSize?: number;
  frameRate?: number;
  hdrType?: number;
  height?: number;
  hidden?: boolean;
  id?: number;
  kvqScore?: FluffyKvqScore;
  makeupGain?: number;
  maxBitrate?: number;
  mute?: boolean;
  normalizeGain?: number;
  oriLoudness?: number;
  p2spCode?: string;
  quality?: number;
  qualityLabel?: string;
  qualityType?: string;
  url?: string;
  width?: number;
  [property: string]: any;
};
type FluffyKvqScore = {
  FRPost: number;
  NR: number;
  NRPost: number;
  [property: string]: any;
};
type H264PlayInfo = {
  cdnTimeRangeLevel: number;
  [property: string]: any;
};
type H264VideoFeature = {
  avgEntropy: number;
  blockyProbability: number;
  blurProbability: number;
  mosScore: number;
  [property: string]: any;
};
type Hevc = {
  adaptationSet: HevcAdaptationSet[];
  businessType: number;
  hideAuto: boolean;
  manualDefaultSelect: boolean;
  mediaType: number;
  playInfo: HevcPlayInfo;
  stereoType: number;
  version: string;
  videoFeature: HevcVideoFeature;
  videoId: string;
  [property: string]: any;
};
type HevcAdaptationSet = {
  duration?: number;
  id?: number;
  representation?: StickyRepresentation[];
  [property: string]: any;
};
type StickyRepresentation = {
  agc?: boolean;
  avgBitrate?: number;
  backupUrl?: string[];
  comment?: string;
  defaultSelect?: boolean;
  disableAdaptive?: boolean;
  featureP2sp?: boolean;
  fileSize?: number;
  frameRate?: number;
  hdrType?: number;
  height?: number;
  hidden?: boolean;
  id?: number;
  kvqScore?: TentacledKvqScore;
  makeupGain?: number;
  maxBitrate?: number;
  mute?: boolean;
  normalizeGain?: number;
  oriLoudness?: number;
  p2spCode?: string;
  quality?: number;
  qualityLabel?: string;
  qualityType?: string;
  url?: string;
  width?: number;
  [property: string]: any;
};
type TentacledKvqScore = {
  NR: number;
  NRPost: number;
  [property: string]: any;
};
type HevcPlayInfo = {
  cdnTimeRangeLevel: number;
  [property: string]: any;
};
type HevcVideoFeature = {
  avgEntropy: number;
  blockyProbability: number;
  blurProbability: number;
  mosScore: number;
  [property: string]: any;
};
type Tag$1 = {
  __typename: string;
  name: string;
  type: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Kuaishou/UserCommon.d.ts
type KsUserProfileUserInfo = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  sex: string;
  living: boolean;
  followStatus: string;
  constellation: string;
  cityName: string;
  originUserId: number;
  privacy: boolean;
  isNew: boolean;
  timestamp: number;
  verifiedStatus: KsVerifiedStatus;
  bannedStatus: KsBannedStatus;
  counts: Record<string, any>;
  [property: string]: any;
};
type KsVerifiedStatus = {
  verified: boolean;
  description: string;
  type: number;
  new: boolean;
  iconUrl: string;
  [property: string]: any;
};
type KsBannedStatus = {
  banned: boolean;
  socialBanned: boolean;
  isolate: boolean;
  defriend: boolean;
  [property: string]: any;
};
type KsUserProfileSensitiveInfo = {
  kwaiId?: string;
  originUserId?: number;
  constellation?: string;
  cityName?: string;
  counts?: KsUserProfileCounts;
  [property: string]: any;
};
type KsUserProfileLiveInfo = {
  id: string;
  poster: string;
  playUrls: any[] | Record<string, any>;
  caption: string;
  statrtTime: number;
  author: KsUserProfileUserInfo;
  gameInfo: KsUserProfileGameInfo;
  hasRedPack: boolean;
  hasBet: boolean;
  followed: boolean;
  expTag: string;
  hotIcon: string;
  living: boolean;
  quality: string;
  qualityLabel: string;
  watchingCount: string;
  landscape: boolean;
  likeCount: string;
  type: string;
  [property: string]: any;
};
type KsUserProfileGameInfo = {
  gameId?: number;
  coverUrl?: string;
  name?: string;
  type?: number;
  category?: string;
  [property: string]: any;
};
type KsUserProfileCounts = {
  fan?: string;
  photo?: number;
  follow?: string;
  playback?: number;
  review?: number;
  open?: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Kuaishou/UserHomeDetail.d.ts
type KsUserHomeDetail = {
  principalId: string;
  author: KsUserHomeAuthorInfo;
  profile: KsUserHomeProfileState;
  follow: KsUserHomeFollowState | null;
  followButton: KsUserHomeFollowButtonState | null;
  interestMask: KsUserHomeInterestCategory[];
  categoryMask: KsUserHomeCategoryMask;
  [property: string]: any;
};
type KsUserHomeAuthorInfo = {
  principalId: string;
  userInfo: KsUserProfileUserInfo;
  sensitiveInfo: KsUserProfileSensitiveInfo | null;
  followInfo: Record<string, any>;
  banStateMap: Record<string, string>;
  [property: string]: any;
};
type KsUserHomeProfileState = {
  currentTab: string;
  pageSize: number;
  tabTypeMap: Record<string, string>;
  showPlayback: boolean;
  publicData: KsUserHomeTabData;
  privateData: KsUserHomeTabData;
  likedData: KsUserHomeTabData;
  playbackData: KsUserHomeTabData;
  interestList: KsUserHomeInterestAuthor[];
  currentProduct: Record<string, any>;
  [property: string]: any;
};
type KsUserHomeTabData = {
  live?: KsUserProfileLiveInfo | null;
  list: KsUserHomeWork[];
  pcursor: string;
  showPlayback?: boolean;
  result?: number;
  [property: string]: any;
};
type KsUserHomeWork = {
  id: string;
  poster: string;
  width: number;
  height: number;
  counts: Record<string, any>;
  workType: string;
  liked: boolean;
  author: Record<string, any>;
  expTag: string;
  onlyFollowerCanComment: boolean;
  type: string;
  useVideoPlayer: boolean;
  imgUrls: string[];
  imgSizes: any[];
  playUrl?: string;
  [property: string]: any;
};
type KsUserHomeInterestAuthor = {
  kwaiId?: string;
  principalId: string;
  fanCount: string;
  live: boolean;
  following: boolean;
  verified: boolean;
  eid: string;
  headurl: string;
  headurls: Array<Record<string, string>>;
  visitorBeFollowed: boolean;
  user_id: number;
  user_name: string;
  user_sex: string;
  user_text: string;
  isFavorited: boolean;
  [property: string]: any;
};
type KsUserHomeInterestCategory = {
  id: number;
  name: string;
  categoryType: number;
  authorList: KsUserHomeInterestAuthor[];
  [property: string]: any;
};
type KsUserHomeCategoryMask = {
  config: any[];
  list: any[];
  hotList: KsUserHomeHotCategory[];
  hasMore: boolean;
  hasMoreHot: boolean;
  [property: string]: any;
};
type KsUserHomeHotCategory = {
  id: string;
  name: string;
  poster: string;
  iconUrl: string;
  description: string;
  categoryAbbr: string;
  categoryName: string;
  roomCount: string;
  [property: string]: any;
};
type KsUserHomeFollowState = {
  currentFollowStatus: string;
  needToFollow: boolean;
  authorId: string;
  data: number;
  [property: string]: any;
};
type KsUserHomeFollowButtonState = {
  followStatus: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Kuaishou/UserProfile.d.ts
type KsUserProfile = KsUserHomeDetail; //#endregion
//#region src/types/ReturnDataType/Kuaishou/UserWorkList.d.ts
/**
 * 快手用户公开视频列表。
 *
 * 该结构对应 `live_api/profile/public` 的分页结果，
 * 用于对标抖音等平台的独立用户作品列表能力。
 */
type KsUserWorkList = {
  principalId: string;
  list: KsUserHomeWork[];
  pcursor: string;
  hasMore: boolean;
  result: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Kuaishou/WorkComments.d.ts
type KsWorkComments = {
  data: Data;
  [property: string]: any;
};
type Data = {
  visionCommentList: VisionCommentList;
  [property: string]: any;
};
type VisionCommentList = {
  __typename: string;
  commentCount: number;
  pcursor: string;
  rootComments: RootComment[];
  [property: string]: any;
};
type RootComment = {
  __typename: string;
  authorId: string;
  authorLiked: boolean;
  authorName: string;
  commentId: string;
  content: string;
  headurl: string;
  liked: boolean;
  likedCount: string;
  realLikedCount: number;
  status: string;
  subCommentCount: number | null;
  subComments: SubComment$1[];
  subCommentsPcursor: null | string;
  timestamp: number;
  [property: string]: any;
};
type SubComment$1 = {
  __typename: string;
  authorId: string;
  authorLiked: boolean;
  authorName: string;
  commentId: string;
  content: string;
  headurl: string;
  liked: boolean;
  likedCount: string;
  realLikedCount: number;
  replyTo: string;
  replyToUserName: string;
  status: string;
  timestamp: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Kuaishou/index.d.ts
/**
 * 快手返回类型映射
 */
interface KuaishouReturnTypeMap {
  videoWork: KsOneWork;
  comments: KsWorkComments;
  emojiList: KsEmojiList;
  userProfile: KsUserProfile;
  userWorkList: KsUserWorkList;
  liveRoomInfo: KsLiveRoomInfo;
} //#endregion
//#region src/types/ReturnDataType/Xiaohongshu/HomeFeed.d.ts
type HomeFeed = {
  code: number;
  data: DataData$5;
  msg: string;
  success: boolean;
  [property: string]: any;
};
type DataData$5 = {
  cursor_score: string;
  items: Item$2[];
  [property: string]: any;
};
type Item$2 = {
  id: string;
  ignore: boolean;
  model_type: string;
  note_card: NoteCard$2;
  track_id: string;
  xsec_token: string;
  [property: string]: any;
};
type NoteCard$2 = {
  cover: Cover$1;
  display_title: string;
  interact_info: InteractInfo$2;
  type: string;
  user: User$2;
  video?: Video;
  [property: string]: any;
};
type Cover$1 = {
  file_id: string;
  height: number;
  info_list: InfoList$3[];
  url: string;
  url_default: string;
  url_pre: string;
  width: number;
  [property: string]: any;
};
type InfoList$3 = {
  image_scene: string;
  url: string;
  [property: string]: any;
};
type InteractInfo$2 = {
  liked: boolean;
  liked_count: string;
  [property: string]: any;
};
type User$2 = {
  avatar: string;
  nick_name: string;
  nickname: string;
  user_id: string;
  xsec_token: string;
  [property: string]: any;
};
type Video = {
  capa: Capa;
  [property: string]: any;
};
type Capa = {
  duration: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Xiaohongshu/NoteComments.d.ts
type NoteComments = {
  code: number;
  data: DataData$4;
  msg: string;
  success: boolean;
  [property: string]: any;
};
type DataData$4 = {
  comments: Comment[];
  cursor: string;
  has_more: boolean;
  time: number;
  user_id: string;
  xsec_token: string;
  [property: string]: any;
};
type Comment = {
  at_users: string[];
  content: string;
  create_time: number;
  id: string;
  ip_location: string;
  like_count: string;
  liked: boolean;
  note_id: string;
  pictures: Picture[];
  show_tags: string[];
  status: number;
  sub_comment_count: string;
  sub_comment_cursor: string;
  sub_comment_has_more: boolean;
  sub_comments: SubComment[];
  user_info: CommentUserInfo;
  [property: string]: any;
};
type Picture = {
  height: number;
  info_list: InfoList$2[];
  url_default: string;
  url_pre: string;
  width: number;
  [property: string]: any;
};
type InfoList$2 = {
  image_scene: string;
  url: string;
  [property: string]: any;
};
type SubComment = {
  at_users: string[];
  content: string;
  create_time: number;
  id: string;
  ip_location: string;
  like_count: string;
  liked: boolean;
  note_id: string;
  pictures: string[];
  show_tags: string[];
  status: number;
  target_comment: TargetComment;
  user_info: SubCommentUserInfo;
  [property: string]: any;
};
type TargetComment = {
  id: string;
  user_info: TargetCommentUserInfo;
  [property: string]: any;
};
type TargetCommentUserInfo = {
  image: string;
  nickname: string;
  user_id: string;
  xsec_token: string;
  [property: string]: any;
};
type SubCommentUserInfo = {
  image: string;
  nickname: string;
  user_id: string;
  xsec_token: string;
  [property: string]: any;
};
type CommentUserInfo = {
  image: string;
  nickname: string;
  user_id: string;
  xsec_token: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Xiaohongshu/OneNote.d.ts
type OneNote = {
  code: number;
  data: DataData$3;
  msg: string;
  success: boolean;
  [property: string]: any;
};
type DataData$3 = {
  current_time: number;
  cursor_score: string;
  items: Item$1[];
  [property: string]: any;
};
type Item$1 = {
  id?: string;
  model_type?: string;
  note_card?: NoteCard$1;
  [property: string]: any;
};
type NoteCard$1 = {
  at_user_list: AtUserList[];
  desc: string;
  image_list: ImageList$1[];
  interact_info: InteractInfo$1;
  ip_location: string;
  last_update_time: number;
  note_id: string;
  share_info: ShareInfo;
  tag_list: TagList[];
  time: number;
  title: string;
  type: string;
  user: User$1;
  [property: string]: any;
};
type AtUserList = {
  nickname: string;
  user_id: string;
  xsec_token: string;
  [property: string]: any;
};
type ImageList$1 = {
  file_id: string;
  height: number;
  info_list: InfoList$1[];
  live_photo: boolean;
  stream: {
    [key: string]: any;
  };
  trace_id: string;
  url: string;
  url_default: string;
  url_pre: string;
  width: number;
  [property: string]: any;
};
type InfoList$1 = {
  image_scene: string;
  url: string;
  [property: string]: any;
};
type InteractInfo$1 = {
  collected: boolean;
  collected_count: string;
  comment_count: string;
  followed: boolean;
  liked: boolean;
  liked_count: string;
  relation: string;
  share_count: string;
  [property: string]: any;
};
type ShareInfo = {
  un_share: boolean;
  [property: string]: any;
};
type TagList = {
  id: string;
  name: string;
  type: string;
  [property: string]: any;
};
type User$1 = {
  avatar: string;
  nickname: string;
  user_id: string;
  xsec_token: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Xiaohongshu/SearchNotes.d.ts
type SearchNotes = {
  code: number;
  data: DataData$2;
  msg: string;
  success: boolean;
  [property: string]: any;
};
type DataData$2 = {
  has_more: boolean;
  items: Item[];
  [property: string]: any;
};
type Item = {
  id: string;
  model_type: string;
  note_card: NoteCard;
  rec_query: RecQuery;
  xsec_token: string;
  [property: string]: any;
};
type NoteCard = {
  corner_tag_info: CornerTagInfo[];
  cover: Cover;
  display_title: string;
  image_list: ImageList[];
  interact_info: InteractInfo;
  type: string;
  user: User;
  [property: string]: any;
};
type CornerTagInfo = {
  text: string;
  type: string;
  [property: string]: any;
};
type Cover = {
  height: number;
  url_default: string;
  url_pre: string;
  width: number;
  [property: string]: any;
};
type ImageList = {
  height: number;
  info_list: InfoList[];
  width: number;
  [property: string]: any;
};
type InfoList = {
  image_scene: string;
  url: string;
  [property: string]: any;
};
type InteractInfo = {
  collected: boolean;
  collected_count: string;
  comment_count: string;
  liked: boolean;
  liked_count: string;
  shared_count: string;
  [property: string]: any;
};
type User = {
  avatar: string;
  nick_name: string;
  nickname: string;
  user_id: string;
  xsec_token: string;
  [property: string]: any;
};
type RecQuery = {
  queries: Query[];
  source: number;
  title: string;
  word_request_id: string;
  [property: string]: any;
};
type Query = {
  id: string;
  name: string;
  search_word: string;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Xiaohongshu/XiaohongshuEmojiList.d.ts
type XiaohongshuEmojiList = {
  code: number;
  data: DataData$1;
  msg: string;
  success: boolean;
  [property: string]: any;
};
type DataData$1 = {
  emoji: DataEmoji;
  result: Result$2;
  version: number;
  [property: string]: any;
};
type DataEmoji = {
  tabs: Tab[];
  [property: string]: any;
};
type Tab = {
  collection?: Collection[];
  [property: string]: any;
};
type Collection = {
  emoji: EmojiElement[];
  name: string;
  [property: string]: any;
};
type EmojiElement = {
  image: string;
  image_name: string;
  [property: string]: any;
};
type Result$2 = {
  code: number;
  message: string;
  success: boolean;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Xiaohongshu/XiaohongshuUserProfile.d.ts
type XiaohongshuUserProfile = {
  code: number;
  data: DataData;
  msg: string;
  [property: string]: any;
};
type DataData = {
  basicInfo: BasicInfo;
  extraInfo: ExtraInfo;
  interactions: Interaction[];
  result: Result$1$1;
  tabPublic: TabPublic;
  tags: Tag[];
  verifyInfo: VerifyInfo;
  [property: string]: any;
};
type BasicInfo = {
  desc: string;
  gender: number;
  imageb: string;
  images: string;
  ipLocation: string;
  nickname: string;
  redId: string;
  [property: string]: any;
};
type ExtraInfo = {
  blockType: string;
  fstatus: string;
  [property: string]: any;
};
type Interaction = {
  count: string;
  name: string;
  type: string;
  [property: string]: any;
};
type Result$1$1 = {
  code: number;
  message: string;
  success: boolean;
  [property: string]: any;
};
type TabPublic = {
  collection: boolean;
  collectionBoard: CollectionBoard;
  collectionNote: CollectionNote;
  [property: string]: any;
};
type CollectionBoard = {
  count: number;
  display: boolean;
  lock: boolean;
  [property: string]: any;
};
type CollectionNote = {
  count: number;
  display: boolean;
  lock: boolean;
  [property: string]: any;
};
type Tag = {
  icon?: string;
  tagType?: string;
  [property: string]: any;
};
type VerifyInfo = {
  redOfficialVerifyType: number;
  [property: string]: any;
}; //#endregion
//#region src/types/ReturnDataType/Xiaohongshu/index.d.ts
/**
 * 小红书返回类型映射
 */
interface XiaohongshuReturnTypeMap {
  homeFeed: HomeFeed;
  noteDetail: OneNote;
  noteComments: NoteComments;
  userProfile: XiaohongshuUserProfile;
  userNoteList: any;
  emojiList: XiaohongshuEmojiList;
  searchNotes: SearchNotes;
} //#endregion
//#region src/types/method-keys.d.ts
/**
 * API 方法名常量定义
 *
 * 设计说明：
 * - 底层 getdata.ts 和 API.ts 仍使用中文 key (内部实现)
 * - Fetcher 层使用英文方法名 (对外 API)
 * - 此文件提供中英文映射，用于日志、事件等场景
 */
/** B站内部方法名 (中文，用于 getdata.ts) */
declare const BilibiliInternalMethods: {
  readonly VIDEO_INFO: "单个视频作品数据";
  readonly VIDEO_STREAM: "单个视频下载信息数据";
  readonly VIDEO_DANMAKU: "实时弹幕";
  readonly COMMENTS: "评论数据";
  readonly COMMENT_REPLIES: "指定评论的回复";
  readonly USER_CARD: "用户主页数据";
  readonly USER_DYNAMICS: "用户主页动态列表数据";
  readonly USER_SPACE_INFO: "用户空间详细信息";
  readonly USER_TOTAL_VIEWS: "获取UP主总播放量";
  readonly DYNAMIC_DETAIL: "动态详情数据";
  readonly DYNAMIC_CARD: "动态卡片数据";
  readonly BANGUMI_INFO: "番剧基本信息数据";
  readonly BANGUMI_STREAM: "番剧下载信息数据";
  readonly LIVE_ROOM_INFO: "直播间信息";
  readonly LIVE_ROOM_INIT: "直播间初始化信息";
  readonly ARTICLE_CONTENT: "专栏正文内容";
  readonly ARTICLE_CARDS: "专栏显示卡片信息";
  readonly ARTICLE_INFO: "专栏文章基本信息";
  readonly ARTICLE_LIST_INFO: "文集基本信息";
  readonly LOGIN_STATUS: "登录基本信息";
  readonly LOGIN_QRCODE: "申请二维码";
  readonly QRCODE_STATUS: "二维码状态";
  readonly APPLY_CAPTCHA: "从_v_voucher_申请_captcha";
  readonly VALIDATE_CAPTCHA: "验证验证码结果";
  readonly AV_TO_BV: "AV转BV";
  readonly BV_TO_AV: "BV转AV";
  readonly EMOJI_LIST: "Emoji数据";
};
/** B站 Fetcher 方法名 (英文，对外 API) */
declare const BilibiliFetcherMethods: {
  readonly VIDEO_INFO: "fetchVideoInfo";
  readonly VIDEO_STREAM: "fetchVideoStreamUrl";
  readonly VIDEO_DANMAKU: "fetchVideoDanmaku";
  readonly COMMENTS: "fetchComments";
  readonly COMMENT_REPLIES: "fetchCommentReplies";
  readonly USER_CARD: "fetchUserCard";
  readonly USER_DYNAMICS: "fetchUserDynamicList";
  readonly USER_SPACE_INFO: "fetchUserSpaceInfo";
  readonly USER_TOTAL_VIEWS: "fetchUploaderTotalViews";
  readonly DYNAMIC_DETAIL: "fetchDynamicDetail";
  readonly DYNAMIC_CARD: "fetchDynamicCard";
  readonly BANGUMI_INFO: "fetchBangumiInfo";
  readonly BANGUMI_STREAM: "fetchBangumiStreamUrl";
  readonly LIVE_ROOM_INFO: "fetchLiveRoomInfo";
  readonly LIVE_ROOM_INIT: "fetchLiveRoomInitInfo";
  readonly ARTICLE_CONTENT: "fetchArticleContent";
  readonly ARTICLE_CARDS: "fetchArticleCards";
  readonly ARTICLE_INFO: "fetchArticleInfo";
  readonly ARTICLE_LIST_INFO: "fetchArticleListInfo";
  readonly LOGIN_STATUS: "fetchLoginStatus";
  readonly LOGIN_QRCODE: "requestLoginQrcode";
  readonly QRCODE_STATUS: "checkQrcodeStatus";
  readonly APPLY_CAPTCHA: "requestCaptchaFromVoucher";
  readonly VALIDATE_CAPTCHA: "validateCaptchaResult";
  readonly AV_TO_BV: "convertAvToBv";
  readonly BV_TO_AV: "convertBvToAv";
  readonly EMOJI_LIST: "fetchEmojiList";
};
/** 抖音内部方法名 (中文，用于 getdata.ts) */
declare const DouyinInternalMethods: {
  readonly VIDEO_WORK: "视频作品数据";
  readonly IMAGE_ALBUM_WORK: "图集作品数据";
  readonly SLIDES_WORK: "合辑作品数据";
  readonly TEXT_WORK: "文字作品数据";
  readonly PARSE_WORK: "聚合解析";
  readonly DANMAKU: "弹幕数据";
  readonly WORK_COMMENTS: "评论数据";
  readonly COMMENT_REPLIES: "指定评论回复数据";
  readonly USER_PROFILE: "用户主页数据";
  readonly USER_VIDEO_LIST: "用户主页视频列表数据";
  readonly SEARCH: "搜索数据";
  readonly SUGGEST_WORDS: "热点词数据";
  readonly MUSIC_INFO: "音乐数据";
  readonly LIVE_ROOM_INFO: "直播间信息数据";
  readonly LOGIN_QRCODE: "申请二维码数据";
  readonly EMOJI_LIST: "Emoji数据";
  readonly DYNAMIC_EMOJI_LIST: "动态表情数据";
};
/** 抖音 Fetcher 方法名 (英文，对外 API) */
declare const DouyinFetcherMethods: {
  readonly VIDEO_WORK: "fetchVideoWork";
  readonly IMAGE_ALBUM_WORK: "fetchImageAlbumWork";
  readonly SLIDES_WORK: "fetchSlidesWork";
  readonly TEXT_WORK: "fetchTextWork";
  readonly PARSE_WORK: "parseWork";
  readonly DANMAKU: "fetchDanmakuList";
  readonly WORK_COMMENTS: "fetchWorkComments";
  readonly COMMENT_REPLIES: "fetchCommentReplies";
  readonly USER_PROFILE: "fetchUserProfile";
  readonly USER_VIDEO_LIST: "fetchUserVideoList";
  readonly SEARCH: "searchContent";
  readonly SUGGEST_WORDS: "fetchSuggestWords";
  readonly MUSIC_INFO: "fetchMusicInfo";
  readonly LIVE_ROOM_INFO: "fetchLiveRoomInfo";
  readonly LOGIN_QRCODE: "requestLoginQrcode";
  readonly EMOJI_LIST: "fetchEmojiList";
  readonly DYNAMIC_EMOJI_LIST: "fetchDynamicEmojiList";
};
/** 快手内部方法名 (中文，用于 getdata.ts) */
declare const KuaishouInternalMethods: {
  readonly VIDEO_WORK: "单个视频作品数据";
  readonly WORK_COMMENTS: "评论数据";
  readonly USER_PROFILE: "用户主页数据";
  readonly USER_WORK_LIST: "用户作品列表数据";
  readonly LIVE_ROOM_INFO: "直播间信息数据";
  readonly EMOJI_LIST: "Emoji数据";
};
/** 快手 Fetcher 方法名 (英文，对外 API) */
declare const KuaishouFetcherMethods: {
  readonly VIDEO_WORK: "fetchVideoWork";
  readonly WORK_COMMENTS: "fetchWorkComments";
  readonly USER_PROFILE: "fetchUserProfile";
  readonly USER_WORK_LIST: "fetchUserWorkList";
  readonly LIVE_ROOM_INFO: "fetchLiveRoomInfo";
  readonly EMOJI_LIST: "fetchEmojiList";
};
/** 小红书内部方法名 (中文，用于 getdata.ts) */
declare const XiaohongshuInternalMethods: {
  readonly HOME_FEED: "首页推荐数据";
  readonly NOTE_DETAIL: "单个笔记数据";
  readonly NOTE_COMMENTS: "评论数据";
  readonly USER_PROFILE: "用户数据";
  readonly USER_NOTES: "用户笔记数据";
  readonly SEARCH_NOTES: "搜索笔记";
  readonly EMOJI_LIST: "表情列表";
};
/** 小红书 Fetcher 方法名 (英文，对外 API) */
declare const XiaohongshuFetcherMethods: {
  readonly HOME_FEED: "fetchHomeFeed";
  readonly NOTE_DETAIL: "fetchNoteDetail";
  readonly NOTE_COMMENTS: "fetchNoteComments";
  readonly USER_PROFILE: "fetchUserProfile";
  readonly USER_NOTES: "fetchUserNoteList";
  readonly SEARCH_NOTES: "searchNotes";
  readonly EMOJI_LIST: "fetchEmojiList";
};
type BilibiliInternalMethodKey = typeof BilibiliInternalMethods[keyof typeof BilibiliInternalMethods];
type BilibiliFetcherMethodKey = typeof BilibiliFetcherMethods[keyof typeof BilibiliFetcherMethods];
type DouyinInternalMethodKey = typeof DouyinInternalMethods[keyof typeof DouyinInternalMethods];
type DouyinFetcherMethodKey = typeof DouyinFetcherMethods[keyof typeof DouyinFetcherMethods];
type KuaishouInternalMethodKey = typeof KuaishouInternalMethods[keyof typeof KuaishouInternalMethods];
type KuaishouFetcherMethodKey = typeof KuaishouFetcherMethods[keyof typeof KuaishouFetcherMethods];
type XiaohongshuInternalMethodKey = typeof XiaohongshuInternalMethods[keyof typeof XiaohongshuInternalMethods];
type XiaohongshuFetcherMethodKey = typeof XiaohongshuFetcherMethods[keyof typeof XiaohongshuFetcherMethods];
/** B站：内部中文方法名 -> Fetcher 英文方法名 */
declare const BilibiliMethodToFetcher: Record<BilibiliInternalMethodKey, BilibiliFetcherMethodKey>;
/** 抖音：内部中文方法名 -> Fetcher 英文方法名 */
declare const DouyinMethodToFetcher: Record<DouyinInternalMethodKey, DouyinFetcherMethodKey>;
/** 快手：内部中文方法名 -> Fetcher 英文方法名 */
declare const KuaishouMethodToFetcher: Record<KuaishouInternalMethodKey, KuaishouFetcherMethodKey>;
/** 小红书：内部中文方法名 -> Fetcher 英文方法名 */
declare const XiaohongshuMethodToFetcher: Record<XiaohongshuInternalMethodKey, XiaohongshuFetcherMethodKey>;
/**
 * 将内部方法名转换为 Fetcher 方法名
 * @param platform - 平台名称
 * @param internalMethod - 内部方法名 (中文)
 * @returns Fetcher 方法名 (英文)
 */
declare function toFetcherMethod(platform: 'bilibili' | 'douyin' | 'kuaishou' | 'xiaohongshu', internalMethod: string): string;
/**
 * 获取所有平台的方法名映射
 */
declare const MethodMaps: {
  readonly bilibili: {
    readonly internal: {
      readonly VIDEO_INFO: "单个视频作品数据";
      readonly VIDEO_STREAM: "单个视频下载信息数据";
      readonly VIDEO_DANMAKU: "实时弹幕";
      readonly COMMENTS: "评论数据";
      readonly COMMENT_REPLIES: "指定评论的回复";
      readonly USER_CARD: "用户主页数据";
      readonly USER_DYNAMICS: "用户主页动态列表数据";
      readonly USER_SPACE_INFO: "用户空间详细信息";
      readonly USER_TOTAL_VIEWS: "获取UP主总播放量";
      readonly DYNAMIC_DETAIL: "动态详情数据";
      readonly DYNAMIC_CARD: "动态卡片数据";
      readonly BANGUMI_INFO: "番剧基本信息数据";
      readonly BANGUMI_STREAM: "番剧下载信息数据";
      readonly LIVE_ROOM_INFO: "直播间信息";
      readonly LIVE_ROOM_INIT: "直播间初始化信息";
      readonly ARTICLE_CONTENT: "专栏正文内容";
      readonly ARTICLE_CARDS: "专栏显示卡片信息";
      readonly ARTICLE_INFO: "专栏文章基本信息";
      readonly ARTICLE_LIST_INFO: "文集基本信息";
      readonly LOGIN_STATUS: "登录基本信息";
      readonly LOGIN_QRCODE: "申请二维码";
      readonly QRCODE_STATUS: "二维码状态";
      readonly APPLY_CAPTCHA: "从_v_voucher_申请_captcha";
      readonly VALIDATE_CAPTCHA: "验证验证码结果";
      readonly AV_TO_BV: "AV转BV";
      readonly BV_TO_AV: "BV转AV";
      readonly EMOJI_LIST: "Emoji数据";
    };
    readonly fetcher: {
      readonly VIDEO_INFO: "fetchVideoInfo";
      readonly VIDEO_STREAM: "fetchVideoStreamUrl";
      readonly VIDEO_DANMAKU: "fetchVideoDanmaku";
      readonly COMMENTS: "fetchComments";
      readonly COMMENT_REPLIES: "fetchCommentReplies";
      readonly USER_CARD: "fetchUserCard";
      readonly USER_DYNAMICS: "fetchUserDynamicList";
      readonly USER_SPACE_INFO: "fetchUserSpaceInfo";
      readonly USER_TOTAL_VIEWS: "fetchUploaderTotalViews";
      readonly DYNAMIC_DETAIL: "fetchDynamicDetail";
      readonly DYNAMIC_CARD: "fetchDynamicCard";
      readonly BANGUMI_INFO: "fetchBangumiInfo";
      readonly BANGUMI_STREAM: "fetchBangumiStreamUrl";
      readonly LIVE_ROOM_INFO: "fetchLiveRoomInfo";
      readonly LIVE_ROOM_INIT: "fetchLiveRoomInitInfo";
      readonly ARTICLE_CONTENT: "fetchArticleContent";
      readonly ARTICLE_CARDS: "fetchArticleCards";
      readonly ARTICLE_INFO: "fetchArticleInfo";
      readonly ARTICLE_LIST_INFO: "fetchArticleListInfo";
      readonly LOGIN_STATUS: "fetchLoginStatus";
      readonly LOGIN_QRCODE: "requestLoginQrcode";
      readonly QRCODE_STATUS: "checkQrcodeStatus";
      readonly APPLY_CAPTCHA: "requestCaptchaFromVoucher";
      readonly VALIDATE_CAPTCHA: "validateCaptchaResult";
      readonly AV_TO_BV: "convertAvToBv";
      readonly BV_TO_AV: "convertBvToAv";
      readonly EMOJI_LIST: "fetchEmojiList";
    };
    readonly toFetcher: Record<BilibiliInternalMethodKey, BilibiliFetcherMethodKey>;
  };
  readonly douyin: {
    readonly internal: {
      readonly VIDEO_WORK: "视频作品数据";
      readonly IMAGE_ALBUM_WORK: "图集作品数据";
      readonly SLIDES_WORK: "合辑作品数据";
      readonly TEXT_WORK: "文字作品数据";
      readonly PARSE_WORK: "聚合解析";
      readonly DANMAKU: "弹幕数据";
      readonly WORK_COMMENTS: "评论数据";
      readonly COMMENT_REPLIES: "指定评论回复数据";
      readonly USER_PROFILE: "用户主页数据";
      readonly USER_VIDEO_LIST: "用户主页视频列表数据";
      readonly SEARCH: "搜索数据";
      readonly SUGGEST_WORDS: "热点词数据";
      readonly MUSIC_INFO: "音乐数据";
      readonly LIVE_ROOM_INFO: "直播间信息数据";
      readonly LOGIN_QRCODE: "申请二维码数据";
      readonly EMOJI_LIST: "Emoji数据";
      readonly DYNAMIC_EMOJI_LIST: "动态表情数据";
    };
    readonly fetcher: {
      readonly VIDEO_WORK: "fetchVideoWork";
      readonly IMAGE_ALBUM_WORK: "fetchImageAlbumWork";
      readonly SLIDES_WORK: "fetchSlidesWork";
      readonly TEXT_WORK: "fetchTextWork";
      readonly PARSE_WORK: "parseWork";
      readonly DANMAKU: "fetchDanmakuList";
      readonly WORK_COMMENTS: "fetchWorkComments";
      readonly COMMENT_REPLIES: "fetchCommentReplies";
      readonly USER_PROFILE: "fetchUserProfile";
      readonly USER_VIDEO_LIST: "fetchUserVideoList";
      readonly SEARCH: "searchContent";
      readonly SUGGEST_WORDS: "fetchSuggestWords";
      readonly MUSIC_INFO: "fetchMusicInfo";
      readonly LIVE_ROOM_INFO: "fetchLiveRoomInfo";
      readonly LOGIN_QRCODE: "requestLoginQrcode";
      readonly EMOJI_LIST: "fetchEmojiList";
      readonly DYNAMIC_EMOJI_LIST: "fetchDynamicEmojiList";
    };
    readonly toFetcher: Record<DouyinInternalMethodKey, DouyinFetcherMethodKey>;
  };
  readonly kuaishou: {
    readonly internal: {
      readonly VIDEO_WORK: "单个视频作品数据";
      readonly WORK_COMMENTS: "评论数据";
      readonly USER_PROFILE: "用户主页数据";
      readonly USER_WORK_LIST: "用户作品列表数据";
      readonly LIVE_ROOM_INFO: "直播间信息数据";
      readonly EMOJI_LIST: "Emoji数据";
    };
    readonly fetcher: {
      readonly VIDEO_WORK: "fetchVideoWork";
      readonly WORK_COMMENTS: "fetchWorkComments";
      readonly USER_PROFILE: "fetchUserProfile";
      readonly USER_WORK_LIST: "fetchUserWorkList";
      readonly LIVE_ROOM_INFO: "fetchLiveRoomInfo";
      readonly EMOJI_LIST: "fetchEmojiList";
    };
    readonly toFetcher: Record<KuaishouInternalMethodKey, KuaishouFetcherMethodKey>;
  };
  readonly xiaohongshu: {
    readonly internal: {
      readonly HOME_FEED: "首页推荐数据";
      readonly NOTE_DETAIL: "单个笔记数据";
      readonly NOTE_COMMENTS: "评论数据";
      readonly USER_PROFILE: "用户数据";
      readonly USER_NOTES: "用户笔记数据";
      readonly SEARCH_NOTES: "搜索笔记";
      readonly EMOJI_LIST: "表情列表";
    };
    readonly fetcher: {
      readonly HOME_FEED: "fetchHomeFeed";
      readonly NOTE_DETAIL: "fetchNoteDetail";
      readonly NOTE_COMMENTS: "fetchNoteComments";
      readonly USER_PROFILE: "fetchUserProfile";
      readonly USER_NOTES: "fetchUserNoteList";
      readonly SEARCH_NOTES: "searchNotes";
      readonly EMOJI_LIST: "fetchEmojiList";
    };
    readonly toFetcher: Record<XiaohongshuInternalMethodKey, XiaohongshuFetcherMethodKey>;
  };
}; //#endregion
//#region src/types/index.d.ts
/**
 * 移除methodType字段的工具类型
 */
type OmitMethodType<T> = Omit<T, 'methodType'>;
/**
 * 类型精度控制参数
 */
type TypeControl = {
  /**
   * 获取返回类型
   * 类型定义时间：2025-02-02
   *
   * 类型解析模式：
   * - `strict`: 返回严格类型（基于接口响应定义，随时间推移可能缺少未声明的字段）
   * - `loose` 或 `未指定`: 返回宽松的 any 类型（默认）
   *
   * @default 'loose'
   */
  typeMode?: 'strict' | 'loose';
};
type DouyinDataOptionsMap = { [K in DouyinMethodType]: {
  opt: DouyinMethodOptMap[K];
  data: DouyinReturnTypeMap[K];
} };
type BilibiliDataOptionsMap = { [K in BilibiliMethodType]: {
  opt: BilibiliMethodOptMap[K];
  data: BilibiliReturnTypeMap[K];
} };
type KuaishouDataOptionsMap = { [K in KuaishouMethodType]: {
  opt: KuaishouMethodOptMap[K];
  data: KuaishouReturnTypeMap[K];
} };
type XiaohongshuDataOptionsMap = { [K in XiaohongshuMethodType]: {
  opt: XiaohongshuMethodOptMap[K];
  data: XiaohongshuReturnTypeMap[K];
} };
type XiaohongshuDataOptions<T extends keyof XiaohongshuDataOptionsMap> = OmitMethodType<XiaohongshuDataOptionsMap[T]['opt'] & TypeControl>;
type DouyinDataOptions<T extends DouyinMethodType> = OmitMethodType<output<(typeof DouyinValidationSchemas)[T]> & TypeControl>;
type BilibiliDataOptions<T extends keyof BilibiliDataOptionsMap> = OmitMethodType<BilibiliDataOptionsMap[T]['opt'] & TypeControl>;
type KuaishouDataOptions<T extends keyof KuaishouDataOptionsMap> = OmitMethodType<KuaishouDataOptionsMap[T]['opt'] & TypeControl>;
/**
 * API请求错误类型
 * 该类型是方法 `getXXXData` 封装后请求遇到错误时的返回类型
 */
type APIErrorType<T extends 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu' | 'default' = 'default'> = {
  /** 错误码 */code: T extends 'douyin' ? douoyinAPIErrorCode : T extends 'bilibili' ? bilibiliAPIErrorCode : T extends 'kuaishou' ? kuaishouAPIErrorCode : T extends 'xiaohongshu' ? xiaohongshuAPIErrorCode : amagiAPIErrorCode; /** 错误时的响应数据 */
  data: any; /** amagi 错误详情 */
  amagiError: ErrorDetail; /** 错误信息 */
  amagiMessage: string;
}; //#endregion
//#region src/platform/bilibili/API.d.ts
/** 去除 methodType 字段后的参数类型 */
type BilibiliMethodOptionsWithoutMethodType = { [K in keyof BilibiliMethodOptionsMap]: OmitMethodType<BilibiliMethodOptionsMap[K]> };
/**
 * B站 API URL 构建类
 *
 * 提供所有 B站 API 的 URL 构建方法
 */
declare class BilibiliAPI {
  /** 获取登录基本信息 */
  getLoginStatus(): string;
  /** 获取视频详细信息 */
  getVideoInfo(data: BilibiliMethodOptionsWithoutMethodType['VideoInfoParams']): string;
  /** 获取视频流信息 */
  getVideoStream(data: BilibiliMethodOptionsWithoutMethodType['VideoStreamParams']): string;
  /**
   * 获取评论区明细
   * @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/comment/readme.md#评论区类型代码
   */
  getComments(data: BilibiliMethodOptionsWithoutMethodType['CommentParams']): string;
  /** 获取评论区状态 */
  getCommentStatus(data: BilibiliMethodOptionsWithoutMethodType['CommentParams']): string;
  /** 获取指定评论的回复 */
  getCommentReplies(data: BilibiliMethodOptionsWithoutMethodType['CommentReplyParams']): string;
  /** 获取表情列表 */
  getEmojiList(): string;
  /** 获取番剧明细 */
  getBangumiInfo(data: BilibiliMethodOptionsWithoutMethodType['BangumiInfoParams']): string;
  /** 获取番剧视频流信息 */
  getBangumiStream(data: BilibiliMethodOptionsWithoutMethodType['BangumiStreamParams']): string;
  /** 获取用户空间动态 */
  getUserDynamicList(data: BilibiliMethodOptionsWithoutMethodType['UserParams']): string;
  /** 获取动态详情 */
  getDynamicDetail(data: BilibiliMethodOptionsWithoutMethodType['DynamicParams']): string;
  /** 获取动态卡片信息 */
  getDynamicCard(data: BilibiliMethodOptionsWithoutMethodType['DynamicParams']): string;
  /** 获取用户名片信息 */
  getUserCard(data: BilibiliMethodOptionsWithoutMethodType['UserParams']): string;
  /** 获取直播间信息 */
  getLiveRoomInfo(data: BilibiliMethodOptionsWithoutMethodType['LiveRoomParams']): string;
  /** 获取直播间初始化信息 */
  getLiveRoomInit(data: BilibiliMethodOptionsWithoutMethodType['LiveRoomParams']): string;
  /** 申请登录二维码 */
  getLoginQrcode(): string;
  /** 查询二维码状态 */
  getQrcodeStatus(data: BilibiliMethodOptionsWithoutMethodType['QrcodeParams']): string;
  /** 获取UP主总播放量 */
  getUploaderTotalViews(data: BilibiliMethodOptionsWithoutMethodType['UserParams']): string;
  /** 获取专栏正文内容 */
  getArticleContent(data: BilibiliMethodOptionsWithoutMethodType['ArticleParams']): string;
  /** 获取专栏显示卡片信息 */
  getArticleCards(data: BilibiliMethodOptionsWithoutMethodType['ArticleCardParams']): string;
  /** 获取专栏文章基本信息 */
  getArticleInfo(data: BilibiliMethodOptionsWithoutMethodType['ArticleParams']): string;
  /** 获取文集基本信息 */
  getArticleListInfo(data: BilibiliMethodOptionsWithoutMethodType['ArticleInfoParams']): string;
  /** 获取用户空间详细信息 */
  getUserSpaceInfo(data: BilibiliMethodOptionsWithoutMethodType['UserParams']): string;
  /** 从 v_voucher 申请验证码 */
  getCaptchaFromVoucher(data: BilibiliMethodOptionsWithoutMethodType['ApplyVoucherCaptchaParams']): {
    Url: string;
    Body: {
      v_voucher: string;
      csrf?: string | undefined;
    };
  };
  /** 验证验证码结果 */
  validateCaptcha(data: BilibiliMethodOptionsWithoutMethodType['ValidateCaptchaParams']): {
    Url: string;
    Body: {
      csrf?: string | undefined;
      challenge: string;
      token: string;
      validate: string;
      seccode: string;
    };
  };
  /**
   * 获取实时弹幕（web端 protobuf 接口）
   * @see https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/danmaku/danmaku_proto.md
   */
  getVideoDanmaku(data: BilibiliMethodOptionsWithoutMethodType['DanmakuParams']): string;
}
/** B站 API URL 构建器实例 */
declare const bilibiliApiUrls: BilibiliAPI; //#endregion
//#region src/model/events.d.ts
/**
 * Amagi 支持的事件类型
 * @description
 * - `log:*` - 日志相关事件
 * - `http:*` - HTTP 请求/响应事件
 * - `network:*` - 网络层事件（重试、错误）
 * - `api:*` - API 调用结果事件
 */
type AmagiEventType = 'log:info' | 'log:warn' | 'log:error' | 'log:debug' | 'log:mark' | 'http:request' | 'http:response' | 'http:error' | 'network:retry' | 'network:error' | 'api:success' | 'api:error';
/**
 * 日志事件数据
 * @description 所有 `log:*` 事件的数据结构
 */
interface LogEventData {
  /** 日志级别 */
  level: 'info' | 'warn' | 'error' | 'debug' | 'mark';
  /** 日志消息 */
  message: string;
  /** 附加参数 */
  args?: unknown[];
  /** 事件时间戳 */
  timestamp: Date;
}
/**
 * HTTP 请求事件数据
 * @description `http:request` 事件的数据结构
 */
interface HttpRequestEventData {
  /** 请求方法 (GET, POST, etc.) */
  method: string;
  /** 请求 URL */
  url: string;
  /** 请求头 */
  headers?: Record<string, string>;
  /** 事件时间戳 */
  timestamp: Date;
}
/**
 * HTTP 响应事件数据
 * @description `http:response` 事件的数据结构
 */
interface HttpResponseEventData {
  /** 请求方法 */
  method: string;
  /** 请求 URL */
  url: string;
  /** HTTP 状态码 */
  statusCode: number;
  /** 响应耗时 (毫秒) */
  responseTime: number;
  /** 客户端 IP */
  clientIP?: string;
  /** 请求体大小 */
  requestSize?: string;
  /** 响应体大小 */
  responseSize?: string;
  /** 事件时间戳 */
  timestamp: Date;
}
/**
 * 网络重试事件数据
 * @description `network:retry` 事件的数据结构
 */
interface NetworkRetryEventData {
  /** 错误代码 */
  errorCode: string;
  /** 当前重试次数 */
  attempt: number;
  /** 最大重试次数 */
  maxRetries: number;
  /** 重试延迟 (毫秒) */
  delayMs: number;
  /** 请求 URL */
  url?: string;
  /** 事件时间戳 */
  timestamp: Date;
}
/**
 * 网络错误事件数据
 * @description `network:error` 和 `http:error` 事件的数据结构
 */
interface NetworkErrorEventData {
  /** 错误代码 */
  errorCode: string;
  /** 错误消息 */
  message: string;
  /** 已重试次数 */
  retries: number;
  /** 请求 URL */
  url?: string;
  /** 事件时间戳 */
  timestamp: Date;
}
/**
 * API 成功事件数据
 * @description `api:success` 事件的数据结构
 */
interface ApiSuccessEventData {
  /** 请求平台 */
  platform: 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu';
  /** 调用的 API 方法 */
  methodType: string;
  /** API 响应数据 (Result 结构) */
  response: unknown;
  /** HTTP 状态码 */
  statusCode: number;
  /** 请求耗时 (毫秒) */
  duration: number;
  /** 事件时间戳 */
  timestamp: Date;
}
/**
 * API 错误事件数据
 * @description `api:error` 事件的数据结构
 */
interface ApiErrorEventData {
  /** 请求平台 */
  platform: 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu';
  /** 调用的 API 方法 */
  methodType: string;
  /** 错误代码 */
  errorCode?: string | number;
  /** 错误消息 */
  errorMessage: string;
  /** 请求 URL */
  url?: string;
  /** 请求耗时 (毫秒) */
  duration?: number;
  /** 事件时间戳 */
  timestamp: Date;
}
/**
 * 事件类型到数据的映射
 * @description 用于类型推断，确保事件名称与数据类型匹配
 */
interface AmagiEventMap {
  'log:info': LogEventData;
  'log:warn': LogEventData;
  'log:error': LogEventData;
  'log:debug': LogEventData;
  'log:mark': LogEventData;
  'http:request': HttpRequestEventData;
  'http:response': HttpResponseEventData;
  'http:error': NetworkErrorEventData;
  'network:retry': NetworkRetryEventData;
  'network:error': NetworkErrorEventData;
  'api:success': ApiSuccessEventData;
  'api:error': ApiErrorEventData;
}
/**
 * 类型安全的事件发射器
 * @description 继承自 Node.js EventEmitter，提供泛型约束确保事件名称与数据类型匹配
 */
declare class TypedEventEmitter extends EventEmitter {
  /**
   * 触发事件
   * @param event - 事件名称
   * @param data - 事件数据
   * @returns 是否有监听器处理了该事件
   */
  emit<K extends AmagiEventType>(event: K, data: AmagiEventMap[K]): boolean;
  /**
   * 注册事件监听器
   * @param event - 事件名称
   * @param listener - 事件处理函数
   * @returns this (支持链式调用)
   */
  on<K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void): this;
  /**
   * 注册一次性事件监听器
   * @param event - 事件名称
   * @param listener - 事件处理函数 (只触发一次)
   * @returns this (支持链式调用)
   */
  once<K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void): this;
  /**
   * 移除事件监听器
   * @param event - 事件名称
   * @param listener - 要移除的事件处理函数
   * @returns this (支持链式调用)
   */
  off<K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void): this;
}
/**
 * Amagi 全局事件发射器实例
 * @description 单例模式，所有模块共享同一个事件总线
 * @example
 * ```typescript
 * import { amagiEvents } from 'amagi/model/events'
 *
 * // 监听 API 成功事件
 * amagiEvents.on('api:success', (data) => {
 *   console.log(`[${data.platform}] ${data.methodType} 耗时 ${data.duration}ms`)
 * })
 * ```
 */
declare const amagiEvents: TypedEventEmitter;
/**
 * 发射日志事件
 * @param level - 日志级别
 * @param message - 日志消息
 * @param args - 附加参数
 */
declare const emitLog: (level: LogEventData["level"], message: string, ...args: unknown[]) => void;
/**
 * 发射 HTTP 请求事件
 * @param data - 请求数据 (不含 timestamp)
 */
declare const emitHttpRequest: (data: Omit<HttpRequestEventData, "timestamp">) => void;
/**
 * 发射 HTTP 响应事件
 * @param data - 响应数据 (不含 timestamp)
 */
declare const emitHttpResponse: (data: Omit<HttpResponseEventData, "timestamp">) => void;
/**
 * 发射网络重试事件
 * @param data - 重试数据 (不含 timestamp)
 */
declare const emitNetworkRetry: (data: Omit<NetworkRetryEventData, "timestamp">) => void;
/**
 * 发射网络错误事件
 * @param data - 错误数据 (不含 timestamp)
 */
declare const emitNetworkError: (data: Omit<NetworkErrorEventData, "timestamp">) => void;
/**
 * 发射 API 成功事件
 * @param data - 成功数据 (不含 timestamp)
 */
declare const emitApiSuccess: (data: Omit<ApiSuccessEventData, "timestamp">) => void;
/**
 * 发射 API 错误事件
 * @param data - 错误数据 (不含 timestamp)
 */
declare const emitApiError: (data: Omit<ApiErrorEventData, "timestamp">) => void;
/**
 * 发射 info 级别日志
 * @param message - 日志消息
 * @param args - 附加参数
 */
declare const emitLogInfo: (message: string, ...args: unknown[]) => void;
/**
 * 发射 warn 级别日志
 * @param message - 日志消息
 * @param args - 附加参数
 */
declare const emitLogWarn: (message: string, ...args: unknown[]) => void;
/**
 * 发射 error 级别日志
 * @param message - 日志消息
 * @param args - 附加参数
 */
declare const emitLogError: (message: string, ...args: unknown[]) => void;
/**
 * 发射 debug 级别日志
 * @param message - 日志消息
 * @param args - 附加参数
 */
declare const emitLogDebug: (message: string, ...args: unknown[]) => void;
/**
 * 发射 mark 级别日志 (用于重要标记)
 * @param message - 日志消息
 * @param args - 附加参数
 */
declare const emitLogMark: (message: string, ...args: unknown[]) => void; //#endregion
//#region src/validation/index.d.ts
/**
 * 基础响应类型
 */
type BaseResponse = {
  /** 响应消息 */message: string; /** 响应状态码 */
  code: number;
};
/**
 * 成功响应类型
 * @template T - 响应数据的类型，默认为any
 */
type SuccessResult$1<T = any> = BaseResponse & {
  /** 响应状态 */success: true; /** 响应数据，类型由泛型 T 决定 */
  data: T; /** 成功响应时错误信息为空 */
  error: never;
};
/**
 * 错误响应类型
 */
type ErrorResult = BaseResponse & {
  /** 响应状态 */success: false; /** API 错误类型 */
  error: APIErrorType; /** 错误响应时数据为空 */
  data: never;
};
/**
 * 通用API响应类型
 * @template T - 成功响应数据的类型，默认为any
 */
type Result$1<T> = SuccessResult$1<T> | ErrorResult;
/**
 * 通用API响应类型
 * @template T - 成功响应数据的类型，默认为any
 * @deprecated 请使用 Result<T> 替代
 */
type ApiResponse<T> = Result$1<T>;
/**
 * 验证抖音参数
 * @param methodType - 抖音方法类型
 * @param params - 待验证的参数
 * @returns 验证后的参数，符合原始API期望的类型
 */
declare const validateDouyinParams: <T extends DouyinMethodType>(methodType: T, params: unknown) => output<(typeof DouyinValidationSchemas)[T]>;
/**
 * 验证哔哩哔哩参数
 * @param methodType - 哔哩哔哩方法类型
 * @param params - 待验证的参数
 * @returns 验证后的参数，符合原始API期望的类型
 */
declare const validateBilibiliParams: <T extends BilibiliMethodType>(methodType: T, params: unknown) => output<(typeof BilibiliValidationSchemas)[T]>;
/**
 * 验证快手参数
 * @param methodType - 快手方法类型
 * @param params - 待验证的参数
 * @returns 验证后的参数，符合原始API期望的类型
 */
declare const validateKuaishouParams: <T extends KuaishouMethodType>(methodType: T, params: unknown) => output<(typeof KuaishouValidationSchemas)[T]>;
/**
 * 验证小红书参数
 * @param methodType - 小红书方法类型
 * @param params - 待验证的参数
 * @returns 验证后的参数
 */
declare const validateXiaohongshuParams: <T extends XiaohongshuMethodType>(methodType: T, params: unknown) => output<(typeof XiaohongshuValidationSchemas)[T]>;
/**
 * 创建成功响应格式
 * @param data - 响应数据
 * @param message - 响应消息（可选）
 * @param code - 响应状态码（可选，默认200）
 * @returns 格式化的成功API响应对象
 */
declare const createSuccessResponse: <T>(data: T, message: string, code?: number) => SuccessResult$1<T>;
/**
 * 创建失败响应格式
 * @param error - 错误信息
 * @param message - 详细错误消息（可选）
 * @param code - 错误状态码（可选，默认500）
 * @returns 格式化的错误响应对象
 */
declare const createErrorResponse: (error: APIErrorType, message: string, code?: number, data?: unknown) => ErrorResult; //#endregion
//#region src/model/fetchers/bilibili/types.d.ts
/** B站视频信息请求参数 */
interface BilibiliVideoInfoOptions extends BaseRequestOptions {
  /** BV号，如 `BV1xx411c7mD` */
  bvid: string;
}
/** B站视频流请求参数 */
interface BilibiliVideoStreamOptions extends BaseRequestOptions {
  /** AV号 (纯数字)，如 `170001` */
  avid: number;
  /** 视频分P的 CID，可从视频信息接口获取 */
  cid: number;
}
/** B站评论请求参数 */
interface BilibiliCommentsOptions extends BaseRequestOptions {
  /** 目标 ID，视频为 AV号，动态为动态ID */
  oid: string;
  /** 评论区类型: 1=视频, 11=图文动态, 12=专栏, 17=纯文字动态 */
  type: number;
  /** 获取数量 */
  number?: number;
  /** 页码，从 1 开始 */
  pn?: number;
}
/** B站评论回复请求参数 */
interface BilibiliCommentRepliesOptions extends BaseRequestOptions {
  /** 目标 ID，视频为 AV号，动态为动态ID */
  oid: string;
  /** 评论区类型: 1=视频, 11=图文动态, 12=专栏, 17=纯文字动态 */
  type: number;
  /** 根评论 rpid */
  root: string;
  /** 获取数量 */
  number?: number;
  /** 页码，从 1 开始 */
  pn?: number;
}
/** B站用户请求参数 */
interface BilibiliUserOptions extends BaseRequestOptions {
  /** 用户 UID (纯数字)，如 `438881796` */
  host_mid: number;
}
/** B站动态请求参数 */
interface BilibiliDynamicOptions extends BaseRequestOptions {
  /** 动态 ID，如 `123456789012345678` */
  dynamic_id: string;
}
/** B站番剧信息请求参数 */
interface BilibiliBangumiInfoOptions extends BaseRequestOptions {
  /** 剧集 EP ID，与 season_id 二选一 */
  ep_id?: string;
  /** 季度 ID，与 ep_id 二选一 */
  season_id?: string;
}
/** B站番剧流请求参数 */
interface BilibiliBangumiStreamOptions extends BaseRequestOptions {
  /** 视频 CID，可从番剧信息接口获取 */
  cid: number;
  /** 剧集 EP ID */
  ep_id: string;
}
/** B站直播间请求参数 */
interface BilibiliLiveRoomOptions extends BaseRequestOptions {
  /** 直播间 ID (房间号) */
  room_id: string;
}
/** B站二维码状态请求参数 */
interface BilibiliQrcodeStatusOptions extends BaseRequestOptions {
  /** 二维码 key，从申请二维码接口获取 */
  qrcode_key: string;
}
/** B站 AV 转 BV 请求参数 */
interface BilibiliAv2BvOptions extends BaseRequestOptions {
  /** AV号 (纯数字)，如 `170001` */
  avid: number;
}
/** B站 BV 转 AV 请求参数 */
interface BilibiliBv2AvOptions extends BaseRequestOptions {
  /** BV号，如 `BV1xx411c7mD` */
  bvid: string;
}
/** B站专栏请求参数 */
interface BilibiliArticleOptions extends BaseRequestOptions {
  /** 专栏 cv 号 (纯数字)，如 `12345678` */
  id: string;
}
/** B站专栏卡片请求参数 */
interface BilibiliArticleCardOptions extends BaseRequestOptions {
  /** 专栏 cv 号列表，单个字符串或数组 */
  ids: string | string[];
}
/** B站弹幕请求参数 */
interface BilibiliDanmakuOptions extends BaseRequestOptions {
  /** 视频分P的 CID */
  cid: number;
  /** 分段序号，6分钟一段，从 1 开始 */
  segment_index?: number;
}
/** B站验证码申请请求参数 */
interface BilibiliApplyCaptchaOptions extends BaseRequestOptions {
  /** CSRF Token，从 Cookie 中的 bili_jct 获取 */
  csrf?: string;
  /** v_voucher 凭证，风控触发时返回 */
  v_voucher: string;
}
/** B站验证码验证请求参数 */
interface BilibiliValidateCaptchaOptions extends BaseRequestOptions {
  /** CSRF Token，从 Cookie 中的 bili_jct 获取 */
  csrf?: string;
  /** 极验 challenge */
  challenge: string;
  /** 极验 token */
  token: string;
  /** 极验 validate */
  validate: string;
  /** 极验 seccode */
  seccode: string;
}
/**
 * B站 Fetcher 接口定义
 * 包含所有 B站 API 方法的类型签名
 */
interface IBilibiliFetcher {
  /**
   * 获取B站视频详细信息
   */
  fetchVideoInfo: MethodOverload<BilibiliVideoInfoOptions, BilibiliReturnTypeMap['videoInfo']>;
  /**
   * 获取B站视频流地址
   */
  fetchVideoStreamUrl: MethodOverload<BilibiliVideoStreamOptions, BilibiliReturnTypeMap['videoStream']>;
  /**
   * 获取B站视频实时弹幕
   */
  fetchVideoDanmaku: MethodOverload<BilibiliDanmakuOptions, BilibiliReturnTypeMap['videoDanmaku']>;
  /**
   * 获取B站视频/动态评论列表
   */
  fetchComments: MethodOverload<BilibiliCommentsOptions, BilibiliReturnTypeMap['comments']>;
  /**
   * 获取B站指定评论的回复列表
   */
  fetchCommentReplies: MethodOverload<BilibiliCommentRepliesOptions, BilibiliReturnTypeMap['commentReplies']>;
  /**
   * 获取B站用户名片信息
   */
  fetchUserCard: MethodOverload<BilibiliUserOptions, BilibiliReturnTypeMap['userCard']>;
  /**
   * 获取B站用户动态列表
   */
  fetchUserDynamicList: MethodOverload<BilibiliUserOptions, BilibiliReturnTypeMap['userDynamicList']>;
  /**
   * 获取B站用户空间详细信息
   */
  fetchUserSpaceInfo: MethodOverload<BilibiliUserOptions, BilibiliReturnTypeMap['userSpaceInfo']>;
  /**
   * 获取B站 UP 主总播放量
   */
  fetchUploaderTotalViews: MethodOverload<BilibiliUserOptions, BilibiliReturnTypeMap['uploaderTotalViews']>;
  /**
   * 获取B站动态详情
   */
  fetchDynamicDetail: MethodOverload<BilibiliDynamicOptions, BilibiliReturnTypeMap['dynamicDetail']>;
  /**
   * 获取B站动态卡片信息
   */
  fetchDynamicCard: MethodOverload<BilibiliDynamicOptions, BilibiliReturnTypeMap['dynamicCard']>;
  /**
   * 获取B站番剧基本信息
   */
  fetchBangumiInfo: MethodOverload<BilibiliBangumiInfoOptions, BilibiliReturnTypeMap['bangumiInfo']>;
  /**
   * 获取B站番剧视频流地址
   */
  fetchBangumiStreamUrl: MethodOverload<BilibiliBangumiStreamOptions, BilibiliReturnTypeMap['bangumiStream']>;
  /**
   * 获取B站直播间信息
   */
  fetchLiveRoomInfo: MethodOverload<BilibiliLiveRoomOptions, BilibiliReturnTypeMap['liveRoomInfo']>;
  /**
   * 获取B站直播间初始化信息
   */
  fetchLiveRoomInitInfo: MethodOverload<BilibiliLiveRoomOptions, BilibiliReturnTypeMap['liveRoomInit']>;
  /**
   * 获取B站专栏正文内容
   */
  fetchArticleContent: MethodOverload<BilibiliArticleOptions, BilibiliReturnTypeMap['articleContent']>;
  /**
   * 获取B站专栏卡片信息
   */
  fetchArticleCards: MethodOverload<BilibiliArticleCardOptions, BilibiliReturnTypeMap['articleCards']>;
  /**
   * 获取B站专栏文章基本信息
   */
  fetchArticleInfo: MethodOverload<BilibiliArticleOptions, BilibiliReturnTypeMap['articleInfo']>;
  /**
   * 获取B站文集基本信息
   */
  fetchArticleListInfo: MethodOverload<BilibiliArticleOptions, BilibiliReturnTypeMap['articleListInfo']>;
  /**
   * 获取B站登录状态信息
   */
  fetchLoginStatus: NoParamMethodOverload<BilibiliReturnTypeMap['loginStatus']>;
  /**
   * 申请B站登录二维码
   */
  requestLoginQrcode: NoParamMethodOverload<BilibiliReturnTypeMap['loginQrcode']>;
  /**
   * 检查B站登录二维码扫描状态
   */
  checkQrcodeStatus: MethodOverload<BilibiliQrcodeStatusOptions, BilibiliReturnTypeMap['qrcodeStatus']>;
  /**
   * 从 v_voucher 申请验证码
   */
  requestCaptchaFromVoucher: MethodOverload<BilibiliApplyCaptchaOptions, BilibiliReturnTypeMap['captchaFromVoucher']>;
  /**
   * 验证验证码结果
   */
  validateCaptchaResult: MethodOverload<BilibiliValidateCaptchaOptions, BilibiliReturnTypeMap['validateCaptcha']>;
  /**
   * 将 AV 号转换为 BV 号
   */
  convertAvToBv: MethodOverload<BilibiliAv2BvOptions, BilibiliReturnTypeMap['avToBv']>;
  /**
   * 将 BV 号转换为 AV 号
   */
  convertBvToAv: MethodOverload<BilibiliBv2AvOptions, BilibiliReturnTypeMap['bvToAv']>;
  /**
   * 获取B站表情包列表
   */
  fetchEmojiList: NoParamMethodOverload<BilibiliReturnTypeMap['emojiList']>;
} //#endregion
//#region src/model/fetchers/douyin/types.d.ts
/** 抖音作品请求参数 */
interface DouyinWorkOptions extends BaseRequestOptions {
  /** 作品 ID，如 `7123456789012345678` */
  aweme_id: string;
}
/** 抖音评论请求参数 */
interface DouyinCommentsOptions extends BaseRequestOptions {
  /** 作品 ID */
  aweme_id: string;
  /** 获取数量，默认 20 */
  number?: number;
  /** 游标，用于翻页，从上一次请求结果获取 */
  cursor?: number;
}
/** 抖音评论回复请求参数 */
interface DouyinCommentRepliesOptions extends BaseRequestOptions {
  /** 作品 ID */
  aweme_id: string;
  /** 评论 ID */
  comment_id: string;
  /** 获取数量，默认 20 */
  number?: number;
  /** 游标，用于翻页 */
  cursor?: number;
}
/** 抖音用户请求参数 */
interface DouyinUserOptions extends BaseRequestOptions {
  /** 用户 sec_uid，如 `MS4wLjABAAAA...` */
  sec_uid: string;
}
/** 抖音用户列表请求参数（视频列表、喜欢列表、推荐列表） */
interface DouyinUserListOptions extends BaseRequestOptions {
  /** 用户 sec_uid，如 `MS4wLjABAAAA...` */
  sec_uid: string;
  /** 获取数量，默认 18 */
  number?: number;
}
/** 抖音搜索请求参数 */
interface DouyinSearchOptions extends BaseRequestOptions {
  /** 搜索关键词 */
  query: string;
  /** 搜索类型: general=综合, user=用户, video=视频 */
  type?: 'general' | 'user' | 'video';
  /** 获取数量 */
  number?: number;
  /** 搜索 ID，用于翻页，从上一次请求结果获取 */
  search_id?: string;
}
/** 抖音热词请求参数 */
interface DouyinSuggestWordsOptions extends BaseRequestOptions {
  /** 搜索词，用于获取联想词 */
  query: string;
}
/** 抖音音乐请求参数 */
interface DouyinMusicOptions extends BaseRequestOptions {
  /** 音乐 ID */
  music_id: string;
}
/** 抖音直播间请求参数 */
interface DouyinLiveRoomOptions extends BaseRequestOptions {
  /** 直播间 ID */
  room_id: string;
  /** 直播间真实房间号 (web_rid) */
  web_rid: string;
}
/** 抖音二维码请求参数 */
interface DouyinQrcodeOptions extends BaseRequestOptions {
  /** fp 指纹，用于设备标识 */
  verify_fp: string;
}
/** 抖音弹幕请求参数 */
interface DouyinDanmakuOptions extends BaseRequestOptions {
  /** 作品 ID */
  aweme_id: string;
  /** 开始时间 (毫秒) */
  start_time?: number;
  /** 结束时间 (毫秒) */
  end_time?: number;
  /** 视频总时长 (毫秒)，必填 */
  duration: number;
}
/**
 * 抖音 Fetcher 接口定义
 * 包含所有抖音 API 方法的类型签名
 */
interface IDouyinFetcher {
  /**
   * 获取抖音视频作品数据
   */
  fetchVideoWork: MethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['videoWork']>;
  /**
   * 获取抖音图集作品数据
   */
  fetchImageAlbumWork: MethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['imageAlbumWork']>;
  /**
   * 获取抖音合辑作品数据
   */
  fetchSlidesWork: MethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['slidesWork']>;
  /**
   * 获取抖音文字作品数据
   */
  fetchTextWork: MethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['textWork']>;
  /**
   * 聚合解析抖音作品数据 (自动识别作品类型)
   */
  parseWork: MethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['parseWork']>;
  /**
   * 获取抖音视频弹幕数据
   */
  fetchDanmakuList: MethodOverload<DouyinDanmakuOptions, DouyinReturnTypeMap['danmakuList']>;
  /**
   * 获取抖音作品评论数据
   */
  fetchWorkComments: MethodOverload<DouyinCommentsOptions, DouyinReturnTypeMap['comments']>;
  /**
   * 获取抖音指定评论的回复数据
   */
  fetchCommentReplies: MethodOverload<DouyinCommentRepliesOptions, DouyinReturnTypeMap['commentReplies']>;
  /**
   * 获取抖音用户主页数据
   */
  fetchUserProfile: MethodOverload<DouyinUserOptions, DouyinReturnTypeMap['userProfile']>;
  /**
   * 获取抖音用户视频列表数据
   */
  fetchUserVideoList: MethodOverload<DouyinUserListOptions, DouyinReturnTypeMap['userVideoList']>;
  /**
   * 获取抖音用户喜欢列表数据
   */
  fetchUserFavoriteList: MethodOverload<DouyinUserListOptions, DouyinReturnTypeMap['userFavoriteList']>;
  /**
   * 获取抖音用户推荐列表数据
   */
  fetchUserRecommendList: MethodOverload<DouyinUserListOptions, DouyinReturnTypeMap['userRecommendList']>;
  /**
   * 抖音搜索内容
   */
  searchContent: MethodOverload<DouyinSearchOptions, DouyinReturnTypeMap['search']>;
  /**
   * 获取抖音热词/搜索建议
   */
  fetchSuggestWords: MethodOverload<DouyinSuggestWordsOptions, DouyinReturnTypeMap['suggestWords']>;
  /**
   * 获取抖音音乐数据
   */
  fetchMusicInfo: MethodOverload<DouyinMusicOptions, DouyinReturnTypeMap['musicInfo']>;
  /**
   * 获取抖音直播间信息
   */
  fetchLiveRoomInfo: MethodOverload<DouyinLiveRoomOptions, DouyinReturnTypeMap['liveRoomInfo']>;
  /**
   * 申请抖音登录二维码
   */
  requestLoginQrcode: MethodOverload<DouyinQrcodeOptions, DouyinReturnTypeMap['loginQrcode']>;
  /**
   * 获取抖音表情列表
   */
  fetchEmojiList: NoParamMethodOverload<DouyinReturnTypeMap['emojiList']>;
  /**
   * 获取抖音动态表情列表
   */
  fetchDynamicEmojiList: NoParamMethodOverload<DouyinReturnTypeMap['dynamicEmojiList']>;
} //#endregion
//#region src/model/fetchers/kuaishou/types.d.ts
/** 快手作品请求参数 */
interface KuaishouVideoWorkOptions extends BaseRequestOptions {
  /** 作品 ID (photoId) */
  photoId: string;
}
/** 快手评论请求参数 */
interface KuaishouCommentsOptions extends BaseRequestOptions {
  /** 作品 ID (photoId) */
  photoId: string;
}
/** 快手用户资料请求参数 */
interface KuaishouUserProfileOptions extends BaseRequestOptions {
  /** 用户主页 principalId，可直接取 profile 页 URL 末段 */
  principalId: string;
}
/** 快手用户作品列表请求参数 */
interface KuaishouUserWorkListOptions extends BaseRequestOptions {
  /** 用户主页 principalId，可直接取 profile 页 URL 末段 */
  principalId: string;
  /** 分页游标；为空时请求首屏作品列表 */
  pcursor?: string;
  /** 每页数量，默认 12 */
  count?: number;
}
/** 快手直播间信息请求参数 */
interface KuaishouLiveRoomInfoOptions extends BaseRequestOptions {
  /** 直播间 principalId，可直接取 /u/{principalId} URL 末段 */
  principalId: string;
}
/**
 * 快手 Fetcher 接口定义
 * 包含所有快手 API 方法的类型签名
 */
interface IKuaishouFetcher {
  /**
   * 获取快手视频作品数据
   */
  fetchVideoWork: MethodOverload<KuaishouVideoWorkOptions, KuaishouReturnTypeMap['videoWork']>;
  /**
   * 获取快手作品评论数据
   */
  fetchWorkComments: MethodOverload<KuaishouCommentsOptions, KuaishouReturnTypeMap['comments']>;
  /** 获取快手用户主页数据 */
  fetchUserProfile: MethodOverload<KuaishouUserProfileOptions, KuaishouReturnTypeMap['userProfile']>;
  /** 获取快手用户作品列表数据 */
  fetchUserWorkList: MethodOverload<KuaishouUserWorkListOptions, KuaishouReturnTypeMap['userWorkList']>;
  /** 获取快手直播间信息数据 */
  fetchLiveRoomInfo: MethodOverload<KuaishouLiveRoomInfoOptions, KuaishouReturnTypeMap['liveRoomInfo']>;
  /**
   * 获取快手表情列表
   */
  fetchEmojiList: NoParamMethodOverload<KuaishouReturnTypeMap['emojiList']>;
}
/**
 * 绑定了 Cookie 的快手 Fetcher 接口
 * 调用方法时无需传递 cookie 参数
 */
interface IBoundKuaishouFetcher {
  /** 获取快手视频作品数据 */
  fetchVideoWork: BoundMethodOverload<KuaishouVideoWorkOptions, KuaishouReturnTypeMap['videoWork']>;
  /** 获取快手作品评论数据 */
  fetchWorkComments: BoundMethodOverload<KuaishouCommentsOptions, KuaishouReturnTypeMap['comments']>;
  /** 获取快手用户主页数据 */
  fetchUserProfile: BoundMethodOverload<KuaishouUserProfileOptions, KuaishouReturnTypeMap['userProfile']>;
  /** 获取快手用户作品列表数据 */
  fetchUserWorkList: BoundMethodOverload<KuaishouUserWorkListOptions, KuaishouReturnTypeMap['userWorkList']>;
  /** 获取快手直播间信息数据 */
  fetchLiveRoomInfo: BoundMethodOverload<KuaishouLiveRoomInfoOptions, KuaishouReturnTypeMap['liveRoomInfo']>;
  /** 获取快手表情列表 */
  fetchEmojiList: BoundNoParamMethodOverload<KuaishouReturnTypeMap['emojiList']>;
} //#endregion
//#region src/model/fetchers/xiaohongshu/types.d.ts
/** 小红书首页推荐请求参数 */
interface XiaohongshuHomeFeedOptions extends BaseRequestOptions {
  /** 游标分数，用于翻页 */
  cursor_score?: string;
  /** 获取数量，默认 20 */
  num?: number;
  /** 刷新类型: 1=下拉刷新, 3=上拉加载 */
  refresh_type?: number;
  /** 笔记索引 */
  note_index?: number;
  /** 未读开始笔记 ID */
  unread_begin_note_id?: string;
  /** 未读结束笔记 ID */
  unread_end_note_id?: string;
  /** 未读笔记数量 */
  unread_note_count?: number;
}
/** 小红书笔记详情请求参数 */
interface XiaohongshuNoteDetailOptions extends BaseRequestOptions {
  /** 笔记 ID，如 `64a1b2c3d4e5f6` */
  note_id: string;
  /** xsec_token，从笔记链接或首页获取，必填 */
  xsec_token: string;
}
/** 小红书评论请求参数 */
interface XiaohongshuCommentsOptions extends BaseRequestOptions {
  /** 笔记 ID */
  note_id: string;
  /** 游标，用于翻页 */
  cursor?: string;
  /** xsec_token，从笔记链接或首页获取，必填 */
  xsec_token: string;
}
/** 小红书用户请求参数 */
interface XiaohongshuUserProfileOptions extends BaseRequestOptions {
  /** 用户 ID */
  user_id: string;
}
/** 小红书用户笔记请求参数 */
interface XiaohongshuUserNotesOptions extends BaseRequestOptions {
  /** 用户 ID */
  user_id: string;
  /** 游标，用于翻页 */
  cursor?: string;
  /** 获取数量，默认 30 */
  num?: number;
}
/** 小红书搜索请求参数 */
interface XiaohongshuSearchNotesOptions extends BaseRequestOptions {
  /** 搜索关键词 */
  keyword: string;
  /** 页码，从 1 开始 */
  page?: number;
  /** 每页数量，默认 20 */
  page_size?: number;
  /** 排序方式: general=综合, time_descending=最新, popularity_descending=最热 */
  sort?: 'general' | 'time_descending' | 'popularity_descending';
  /** 笔记类型: 0=全部, 1=视频, 2=图文 */
  note_type?: 0 | 1 | 2;
}
/**
 * 小红书 Fetcher 接口定义
 * 包含所有小红书 API 方法的类型签名
 */
interface IXiaohongshuFetcher {
  /** 获取小红书首页推荐数据 */
  fetchHomeFeed: OptionalParamMethodOverload<XiaohongshuHomeFeedOptions, XiaohongshuReturnTypeMap['homeFeed']>;
  /** 获取小红书笔记详情 */
  fetchNoteDetail: MethodOverload<XiaohongshuNoteDetailOptions, XiaohongshuReturnTypeMap['noteDetail']>;
  /** 获取小红书笔记评论数据 */
  fetchNoteComments: MethodOverload<XiaohongshuCommentsOptions, XiaohongshuReturnTypeMap['noteComments']>;
  /** 获取小红书用户主页数据 */
  fetchUserProfile: MethodOverload<XiaohongshuUserProfileOptions, XiaohongshuReturnTypeMap['userProfile']>;
  /** 获取小红书用户笔记列表 */
  fetchUserNoteList: MethodOverload<XiaohongshuUserNotesOptions, XiaohongshuReturnTypeMap['userNoteList']>;
  /** 搜索小红书笔记 */
  searchNotes: MethodOverload<XiaohongshuSearchNotesOptions, XiaohongshuReturnTypeMap['searchNotes']>;
  /** 获取小红书表情列表 */
  fetchEmojiList: NoParamMethodOverload<XiaohongshuReturnTypeMap['emojiList']>;
}
/**
 * 绑定了 Cookie 的小红书 Fetcher 接口
 * 调用方法时无需传递 cookie 参数
 */
interface IBoundXiaohongshuFetcher {
  /** 获取小红书首页推荐数据 */
  fetchHomeFeed: BoundOptionalParamMethodOverload<XiaohongshuHomeFeedOptions, XiaohongshuReturnTypeMap['homeFeed']>;
  /** 获取小红书笔记详情 */
  fetchNoteDetail: BoundMethodOverload<XiaohongshuNoteDetailOptions, XiaohongshuReturnTypeMap['noteDetail']>;
  /** 获取小红书笔记评论数据 */
  fetchNoteComments: BoundMethodOverload<XiaohongshuCommentsOptions, XiaohongshuReturnTypeMap['noteComments']>;
  /** 获取小红书用户主页数据 */
  fetchUserProfile: BoundMethodOverload<XiaohongshuUserProfileOptions, XiaohongshuReturnTypeMap['userProfile']>;
  /** 获取小红书用户笔记列表 */
  fetchUserNoteList: BoundMethodOverload<XiaohongshuUserNotesOptions, XiaohongshuReturnTypeMap['userNoteList']>;
  /** 搜索小红书笔记 */
  searchNotes: BoundMethodOverload<XiaohongshuSearchNotesOptions, XiaohongshuReturnTypeMap['searchNotes']>;
  /** 获取小红书表情列表 */
  fetchEmojiList: BoundNoParamMethodOverload<XiaohongshuReturnTypeMap['emojiList']>;
} //#endregion
//#region src/model/fetchers/types.d.ts
/**
 * 类型精度模式
 * - strict: 严格类型，基于接口响应定义
 * - loose: 宽松类型，返回 any
 */
type TypeMode = 'strict' | 'loose';
/** 条件返回类型 */
type ConditionalReturnType<T, M extends TypeMode> = M extends 'strict' ? T : any;
/**
 * 从 Options 中提取 TypeMode
 * 用于从 options.typeMode 推断返回类型
 */
type ExtractTypeMode<T> = T extends {
  typeMode: infer M extends TypeMode;
} ? M : 'loose';
/** 基础请求选项 */
interface BaseRequestOptions {
  /** 类型精度模式: 'strict' 返回严格类型 */
  typeMode?: TypeMode;
}
/** 数据获取器配置 */
interface FetcherConfig {
  /** Cookie */
  cookie?: string;
  /** 请求配置 */
  requestConfig?: RequestConfig;
} //#endregion
//#region src/model/fetchers/shared/overload-types.d.ts
/**
 * 为单个方法生成函数重载类型
 * @template TOptions - 方法的选项参数类型
 * @template TStrictReturn - typeMode='strict' 时的返回类型
 * @template TCookie - Cookie 参数类型（可选）
 * @template TRequestConfig - 请求配置参数类型（可选）
 */
type MethodOverload<TOptions, TStrictReturn, TCookie extends string | undefined = string | undefined, TRequestConfig extends RequestConfig | undefined = RequestConfig | undefined> = {
  (options: TOptions & {
    typeMode: 'strict';
  }, ...args: TCookie extends undefined ? TRequestConfig extends undefined ? [] : [requestConfig?: TRequestConfig] : TRequestConfig extends undefined ? [cookie?: TCookie] : [cookie?: TCookie, requestConfig?: TRequestConfig]): Promise<Result$1<TStrictReturn>>;
  (options: TOptions, ...args: TCookie extends undefined ? TRequestConfig extends undefined ? [] : [requestConfig?: TRequestConfig] : TRequestConfig extends undefined ? [cookie?: TCookie] : [cookie?: TCookie, requestConfig?: TRequestConfig]): Promise<Result$1<any>>;
};
/**
 * 为绑定 Cookie 的方法生成函数重载类型（少了 cookie 参数）
 */
type BoundMethodOverload<TOptions, TStrictReturn, TRequestConfig extends RequestConfig | undefined = RequestConfig | undefined> = {
  (options: TOptions & {
    typeMode: 'strict';
  }, requestConfig?: TRequestConfig): Promise<Result$1<TStrictReturn>>;
  (options: TOptions, requestConfig?: TRequestConfig): Promise<Result$1<any>>;
};
/**
 * 为无参数方法生成函数重载类型
 */
type NoParamMethodOverload<TStrictReturn, TCookie extends string | undefined = string | undefined, TRequestConfig extends RequestConfig | undefined = RequestConfig | undefined> = {
  (options: {
    typeMode: 'strict';
  }, ...args: TCookie extends undefined ? TRequestConfig extends undefined ? [] : [requestConfig?: TRequestConfig] : TRequestConfig extends undefined ? [cookie?: TCookie] : [cookie?: TCookie, requestConfig?: TRequestConfig]): Promise<Result$1<TStrictReturn>>;
  (options?: {
    typeMode?: TypeMode;
  }, ...args: TCookie extends undefined ? TRequestConfig extends undefined ? [] : [requestConfig?: TRequestConfig] : TRequestConfig extends undefined ? [cookie?: TCookie] : [cookie?: TCookie, requestConfig?: TRequestConfig]): Promise<Result$1<any>>;
};
/**
 * 为绑定 Cookie 的无参数方法生成函数重载类型
 */
type BoundNoParamMethodOverload<TStrictReturn, TRequestConfig extends RequestConfig | undefined = RequestConfig | undefined> = {
  (options: {
    typeMode: 'strict';
  }, requestConfig?: TRequestConfig): Promise<Result$1<TStrictReturn>>;
  (options?: {
    typeMode?: TypeMode;
  }, requestConfig?: TRequestConfig): Promise<Result$1<any>>;
};
/**
 * 为带可选参数的方法生成函数重载类型（参数可选但可能包含额外字段）
 */
type OptionalParamMethodOverload<TOptions, TStrictReturn, TCookie extends string | undefined = string | undefined, TRequestConfig extends RequestConfig | undefined = RequestConfig | undefined> = {
  (options: TOptions & {
    typeMode: 'strict';
  }, ...args: TCookie extends undefined ? TRequestConfig extends undefined ? [] : [requestConfig?: TRequestConfig] : TRequestConfig extends undefined ? [cookie?: TCookie] : [cookie?: TCookie, requestConfig?: TRequestConfig]): Promise<Result$1<TStrictReturn>>;
  (options?: TOptions, ...args: TCookie extends undefined ? TRequestConfig extends undefined ? [] : [requestConfig?: TRequestConfig] : TRequestConfig extends undefined ? [cookie?: TCookie] : [cookie?: TCookie, requestConfig?: TRequestConfig]): Promise<Result$1<any>>;
};
/**
 * 为绑定 Cookie 的带可选参数方法生成函数重载类型
 */
type BoundOptionalParamMethodOverload<TOptions, TStrictReturn, TRequestConfig extends RequestConfig | undefined = RequestConfig | undefined> = {
  (options: TOptions & {
    typeMode: 'strict';
  }, requestConfig?: TRequestConfig): Promise<Result$1<TStrictReturn>>;
  (options?: TOptions, requestConfig?: TRequestConfig): Promise<Result$1<any>>;
}; //#endregion
//#region src/model/fetchers/bilibili/bound.d.ts
/**
 * 绑定了 Cookie 的 B站 Fetcher 接口
 * 调用方法时无需传递 cookie 参数
 */
interface IBoundBilibiliFetcher {
  /** 获取B站视频详细信息 */
  fetchVideoInfo: BoundMethodOverload<BilibiliVideoInfoOptions, BilibiliReturnTypeMap['videoInfo']>;
  /** 获取B站视频流地址 */
  fetchVideoStreamUrl: BoundMethodOverload<BilibiliVideoStreamOptions, BilibiliReturnTypeMap['videoStream']>;
  /** 获取B站视频实时弹幕 */
  fetchVideoDanmaku: BoundMethodOverload<BilibiliDanmakuOptions, BilibiliReturnTypeMap['videoDanmaku']>;
  /** 获取B站视频/动态评论列表 */
  fetchComments: BoundMethodOverload<BilibiliCommentsOptions, BilibiliReturnTypeMap['comments']>;
  /** 获取B站指定评论的回复列表 */
  fetchCommentReplies: BoundMethodOverload<BilibiliCommentRepliesOptions, BilibiliReturnTypeMap['commentReplies']>;
  /** 获取B站用户名片信息 */
  fetchUserCard: BoundMethodOverload<BilibiliUserOptions, BilibiliReturnTypeMap['userCard']>;
  /** 获取B站用户动态列表 */
  fetchUserDynamicList: BoundMethodOverload<BilibiliUserOptions, BilibiliReturnTypeMap['userDynamicList']>;
  /** 获取B站用户空间详细信息 */
  fetchUserSpaceInfo: BoundMethodOverload<BilibiliUserOptions, BilibiliReturnTypeMap['userSpaceInfo']>;
  /** 获取B站 UP 主总播放量 */
  fetchUploaderTotalViews: BoundMethodOverload<BilibiliUserOptions, BilibiliReturnTypeMap['uploaderTotalViews']>;
  /** 获取B站动态详情 */
  fetchDynamicDetail: BoundMethodOverload<BilibiliDynamicOptions, BilibiliReturnTypeMap['dynamicDetail']>;
  /** 获取B站动态卡片信息 */
  fetchDynamicCard: BoundMethodOverload<BilibiliDynamicOptions, BilibiliReturnTypeMap['dynamicCard']>;
  /** 获取B站番剧基本信息 */
  fetchBangumiInfo: BoundMethodOverload<BilibiliBangumiInfoOptions, BilibiliReturnTypeMap['bangumiInfo']>;
  /** 获取B站番剧视频流地址 */
  fetchBangumiStreamUrl: BoundMethodOverload<BilibiliBangumiStreamOptions, BilibiliReturnTypeMap['bangumiStream']>;
  /** 获取B站直播间信息 */
  fetchLiveRoomInfo: BoundMethodOverload<BilibiliLiveRoomOptions, BilibiliReturnTypeMap['liveRoomInfo']>;
  /** 获取B站直播间初始化信息 */
  fetchLiveRoomInitInfo: BoundMethodOverload<BilibiliLiveRoomOptions, BilibiliReturnTypeMap['liveRoomInit']>;
  /** 获取B站专栏正文内容 */
  fetchArticleContent: BoundMethodOverload<BilibiliArticleOptions, BilibiliReturnTypeMap['articleContent']>;
  /** 获取B站专栏卡片信息 */
  fetchArticleCards: BoundMethodOverload<BilibiliArticleCardOptions, BilibiliReturnTypeMap['articleCards']>;
  /** 获取B站专栏文章基本信息 */
  fetchArticleInfo: BoundMethodOverload<BilibiliArticleOptions, BilibiliReturnTypeMap['articleInfo']>;
  /** 获取B站文集基本信息 */
  fetchArticleListInfo: BoundMethodOverload<BilibiliArticleOptions, BilibiliReturnTypeMap['articleListInfo']>;
  /** 获取B站登录状态信息 */
  fetchLoginStatus: BoundNoParamMethodOverload<BilibiliReturnTypeMap['loginStatus']>;
  /** 申请B站登录二维码 */
  requestLoginQrcode: BoundNoParamMethodOverload<BilibiliReturnTypeMap['loginQrcode']>;
  /** 检查B站登录二维码扫描状态 */
  checkQrcodeStatus: BoundMethodOverload<BilibiliQrcodeStatusOptions, BilibiliReturnTypeMap['qrcodeStatus']>;
  /** 从 v_voucher 申请验证码 */
  requestCaptchaFromVoucher: BoundMethodOverload<BilibiliApplyCaptchaOptions, BilibiliReturnTypeMap['captchaFromVoucher']>;
  /** 验证验证码结果 */
  validateCaptchaResult: BoundMethodOverload<BilibiliValidateCaptchaOptions, BilibiliReturnTypeMap['validateCaptcha']>;
  /** 将 AV 号转换为 BV 号 */
  convertAvToBv: BoundMethodOverload<BilibiliAv2BvOptions, BilibiliReturnTypeMap['avToBv']>;
  /** 将 BV 号转换为 AV 号 */
  convertBvToAv: BoundMethodOverload<BilibiliBv2AvOptions, BilibiliReturnTypeMap['bvToAv']>;
  /** 获取B站表情包列表 */
  fetchEmojiList: BoundNoParamMethodOverload<BilibiliReturnTypeMap['emojiList']>;
}
/**
 * 创建绑定了 Cookie 和请求配置的 B站 Fetcher
 * @param cookie - B站 Cookie
 * @param requestConfig - 请求配置 (可选)
 * @returns 绑定了 Cookie 的 Fetcher 对象，调用时无需传递 cookie
 * @example
 * ```typescript
 * const fetcher = createBoundBilibiliFetcher('your_cookie')
 * const result = await fetcher.fetchVideoInfo({ bvid: 'BV1xx411c7mD' })
 * // 严格模式
 * const strictResult = await fetcher.fetchVideoInfo({ bvid: 'BV1xx411c7mD', typeMode: 'strict' })
 * ```
 */
declare function createBoundBilibiliFetcher(cookie: string, requestConfig?: RequestConfig): IBoundBilibiliFetcher; //#endregion
//#region src/model/fetchers/bilibili/index.d.ts
/**
 * B站数据获取器
 * 包含所有 B站 API 方法，调用时需要传递 cookie
 * @example
 * ```typescript
 * import { bilibiliFetcher } from '@ikenxuan/amagi'
 *
 * const result = await bilibiliFetcher.fetchVideoInfo({ bvid: 'BV1xx411c7mD' }, cookie)
 * ```
 */
declare const bilibiliFetcher: IBilibiliFetcher;
/** B站 Fetcher 类型 */
type BilibiliFetcher = typeof bilibiliFetcher;
/** 绑定 Cookie 的 B站 Fetcher 类型 */
type BoundBilibiliFetcher = IBoundBilibiliFetcher; //#endregion
//#region src/model/fetchers/douyin/bound.d.ts
/**
 * 绑定了 Cookie 的抖音 Fetcher 接口
 * 调用方法时无需传递 cookie 参数
 */
interface IBoundDouyinFetcher {
  /** 获取抖音视频作品数据 */
  fetchVideoWork: BoundMethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['videoWork']>;
  /** 获取抖音图集作品数据 */
  fetchImageAlbumWork: BoundMethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['imageAlbumWork']>;
  /** 获取抖音合辑作品数据 */
  fetchSlidesWork: BoundMethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['slidesWork']>;
  /** 获取抖音文字作品数据 */
  fetchTextWork: BoundMethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['textWork']>;
  /** 聚合解析抖音作品数据 (自动识别作品类型) */
  parseWork: BoundMethodOverload<DouyinWorkOptions, DouyinReturnTypeMap['parseWork']>;
  /** 获取抖音视频弹幕数据 */
  fetchDanmakuList: BoundMethodOverload<DouyinDanmakuOptions, DouyinReturnTypeMap['danmakuList']>;
  /** 获取抖音作品评论数据 */
  fetchWorkComments: BoundMethodOverload<DouyinCommentsOptions, DouyinReturnTypeMap['comments']>;
  /** 获取抖音指定评论的回复数据 */
  fetchCommentReplies: BoundMethodOverload<DouyinCommentRepliesOptions, DouyinReturnTypeMap['commentReplies']>;
  /** 获取抖音用户主页数据 */
  fetchUserProfile: BoundMethodOverload<DouyinUserOptions, DouyinReturnTypeMap['userProfile']>;
  /** 获取抖音用户视频列表数据 */
  fetchUserVideoList: BoundMethodOverload<DouyinUserListOptions, DouyinReturnTypeMap['userVideoList']>;
  /** 获取抖音用户喜欢列表数据 */
  fetchUserFavoriteList: BoundMethodOverload<DouyinUserListOptions, DouyinReturnTypeMap['userFavoriteList']>;
  /** 获取抖音用户推荐列表数据 */
  fetchUserRecommendList: BoundMethodOverload<DouyinUserListOptions, DouyinReturnTypeMap['userRecommendList']>;
  /** 抖音搜索内容 */
  searchContent: BoundMethodOverload<DouyinSearchOptions, DouyinReturnTypeMap['search']>;
  /** 获取抖音热词/搜索建议 */
  fetchSuggestWords: BoundMethodOverload<DouyinSuggestWordsOptions, DouyinReturnTypeMap['suggestWords']>;
  /** 获取抖音音乐数据 */
  fetchMusicInfo: BoundMethodOverload<DouyinMusicOptions, DouyinReturnTypeMap['musicInfo']>;
  /** 获取抖音直播间信息 */
  fetchLiveRoomInfo: BoundMethodOverload<DouyinLiveRoomOptions, DouyinReturnTypeMap['liveRoomInfo']>;
  /** 申请抖音登录二维码 */
  requestLoginQrcode: BoundMethodOverload<DouyinQrcodeOptions, DouyinReturnTypeMap['loginQrcode']>;
  /** 获取抖音表情列表 */
  fetchEmojiList: BoundNoParamMethodOverload<DouyinReturnTypeMap['emojiList']>;
  /** 获取抖音动态表情列表 */
  fetchDynamicEmojiList: BoundNoParamMethodOverload<DouyinReturnTypeMap['dynamicEmojiList']>;
}
/**
 * 创建绑定了 Cookie 和请求配置的抖音 Fetcher
 * @param cookie - 抖音 Cookie
 * @param requestConfig - 请求配置 (可选)
 * @returns 绑定了 Cookie 的 Fetcher 对象，调用时无需传递 cookie
 * @example
 * ```typescript
 * const fetcher = createBoundDouyinFetcher('your_cookie')
 * const result = await fetcher.fetchVideoWork({ aweme_id: '7123456789' })
 * // 严格模式
 * const strictResult = await fetcher.fetchVideoWork({ aweme_id: '7123456789', typeMode: 'strict' })
 * ```
 */
declare function createBoundDouyinFetcher(cookie: string, requestConfig?: RequestConfig): IBoundDouyinFetcher; //#endregion
//#region src/model/fetchers/douyin/index.d.ts
/**
 * 抖音数据获取器
 * 包含所有抖音 API 方法，调用时需要传递 cookie
 * @example
 * ```typescript
 * import { douyinFetcher } from '@ikenxuan/amagi'
 *
 * const result = await douyinFetcher.fetchVideoWork({ aweme_id: '7123456789' }, cookie)
 * ```
 */
declare const douyinFetcher: IDouyinFetcher;
/** 抖音 Fetcher 类型 */
type DouyinFetcher = typeof douyinFetcher;
/** 绑定 Cookie 的抖音 Fetcher 类型 */
type BoundDouyinFetcher = IBoundDouyinFetcher; //#endregion
//#region src/model/fetchers/kuaishou/index.d.ts
/**
 * 快手数据获取器
 * 包含所有快手 API 方法，调用时需要传递 cookie
 * @example
 * ```typescript
 * import { kuaishouFetcher } from '@ikenxuan/amagi'
 *
 * const result = await kuaishouFetcher.fetchVideoWork({ photoId: '3x123456789' }, cookie)
 * ```
 */
declare const kuaishouFetcher: IKuaishouFetcher;
/** 快手 Fetcher 类型 */
type KuaishouFetcher = typeof kuaishouFetcher;
/**
 * 创建绑定了 Cookie 和请求配置的快手 Fetcher
 * @param cookie - 快手 Cookie
 * @param requestConfig - 请求配置 (可选)
 * @returns 绑定了 Cookie 的 Fetcher 对象，调用时无需传递 cookie
 * @example
 * ```typescript
 * const fetcher = createBoundKuaishouFetcher('your_cookie')
 * const result = await fetcher.fetchVideoWork({ photoId: '3x123456789' })
 * // 严格模式
 * const strictResult = await fetcher.fetchVideoWork({ photoId: '3x123456789', typeMode: 'strict' })
 * ```
 */
declare function createBoundKuaishouFetcher(cookie: string, requestConfig?: RequestConfig): IBoundKuaishouFetcher;
/** 绑定 Cookie 的快手 Fetcher 类型 */
type BoundKuaishouFetcher = IBoundKuaishouFetcher; //#endregion
//#region src/model/fetchers/xiaohongshu/index.d.ts
/**
 * 小红书数据获取器
 * 包含所有小红书 API 方法，调用时需要传递 cookie
 * @example
 * ```typescript
 * import { xiaohongshuFetcher } from '@ikenxuan/amagi'
 *
 * const result = await xiaohongshuFetcher.fetchNoteDetail({
 *   note_id: '691db851000000001e037279',
 *   xsec_token: 'xxx'
 * }, cookie)
 * ```
 */
declare const xiaohongshuFetcher: IXiaohongshuFetcher;
/** 小红书 Fetcher 类型 */
type XiaohongshuFetcher = typeof xiaohongshuFetcher;
/**
 * 创建绑定了 Cookie 和请求配置的小红书 Fetcher
 * @param cookie - 小红书 Cookie
 * @param requestConfig - 请求配置 (可选)
 * @returns 绑定了 Cookie 的 Fetcher 对象，调用时无需传递 cookie
 * @example
 * ```typescript
 * const fetcher = createBoundXiaohongshuFetcher('your_cookie')
 * const result = await fetcher.fetchNoteDetail({
 *   note_id: '691db851000000001e037279',
 *   xsec_token: 'xxx'
 * })
 * ```
 */
declare function createBoundXiaohongshuFetcher(cookie: string, requestConfig?: RequestConfig): IBoundXiaohongshuFetcher;
/** 绑定 Cookie 的小红书 Fetcher 类型 */
type BoundXiaohongshuFetcher = IBoundXiaohongshuFetcher; //#endregion
//#region src/server/index.d.ts
/**
 * 请求配置选项接口
 */
type RequestConfig = Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>;
/**
 * Cookie配置选项接口
 */
type CookieConfig = {
  /** 抖音Cookie */douyin?: string; /** B站Cookie */
  bilibili?: string; /** 快手Cookie */
  kuaishou?: string; /** 小红书Cookie */
  xiaohongshu?: string;
};
/**
 * 客户端配置选项接口
 */
type Options = {
  /** Cookie配置 */cookies?: CookieConfig; /** 请求配置 */
  request?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>;
};
/**
 * 创建Amagi客户端实例
 * @param options - 客户端配置选项，包含Cookie和请求配置
 * @returns 包含数据获取方法、服务器启动方法、绑定Cookie的平台工具集和API对象的对象
 */
declare const createAmagiClient: (options?: Options) => {
  /** 启动本地HTTP服务 */startServer: (port?: number) => express.Application; /** 事件系统 */
  events: {
    emit<K extends AmagiEventType>(event: K, data: AmagiEventMap[K]): boolean;
    on<K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void): /*elided*/any;
    once<K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void): /*elided*/any;
    off<K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void): /*elided*/any;
    [EventEmitter.captureRejectionSymbol]?<K>(error: Error, event: string | symbol, ...args: any[]): void;
    addListener<K>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    removeListener<K>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    removeAllListeners(eventName?: string | symbol | undefined): /*elided*/any;
    setMaxListeners(n: number): /*elided*/any;
    getMaxListeners(): number;
    listeners<K>(eventName: string | symbol): Function[];
    rawListeners<K>(eventName: string | symbol): Function[];
    listenerCount<K>(eventName: string | symbol, listener?: Function | undefined): number;
    prependListener<K>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    prependOnceListener<K>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    eventNames(): (string | symbol)[];
  };
  /**
   * 注册事件监听器
   * @param event - 事件名称
   * @param listener - 事件处理函数
   */
  on: <K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void) => {
    emit<K_1 extends AmagiEventType>(event: K_1, data: AmagiEventMap[K_1]): boolean;
    on<K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void): /*elided*/any;
    once<K_1 extends AmagiEventType>(event: K_1, listener: (data: AmagiEventMap[K_1]) => void): /*elided*/any;
    off<K_1 extends AmagiEventType>(event: K_1, listener: (data: AmagiEventMap[K_1]) => void): /*elided*/any;
    [EventEmitter.captureRejectionSymbol]?<K_1>(error: Error, event: string | symbol, ...args: any[]): void;
    addListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    removeListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    removeAllListeners(eventName?: string | symbol | undefined): /*elided*/any;
    setMaxListeners(n: number): /*elided*/any;
    getMaxListeners(): number;
    listeners<K_1>(eventName: string | symbol): Function[];
    rawListeners<K_1>(eventName: string | symbol): Function[];
    listenerCount<K_1>(eventName: string | symbol, listener?: Function | undefined): number;
    prependListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    prependOnceListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    eventNames(): (string | symbol)[];
  };
  /**
   * 注册一次性事件监听器
   * @param event - 事件名称
   * @param listener - 事件处理函数 (只触发一次)
   */
  once: <K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void) => {
    emit<K_1 extends AmagiEventType>(event: K_1, data: AmagiEventMap[K_1]): boolean;
    on<K_1 extends AmagiEventType>(event: K_1, listener: (data: AmagiEventMap[K_1]) => void): /*elided*/any;
    once<K extends AmagiEventType>(event: K, listener: (data: AmagiEventMap[K]) => void): /*elided*/any;
    off<K_1 extends AmagiEventType>(event: K_1, listener: (data: AmagiEventMap[K_1]) => void): /*elided*/any;
    [EventEmitter.captureRejectionSymbol]?<K_1>(error: Error, event: string | symbol, ...args: any[]): void;
    addListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    removeListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    removeAllListeners(eventName?: string | symbol | undefined): /*elided*/any;
    setMaxListeners(n: number): /*elided*/any;
    getMaxListeners(): number;
    listeners<K_1>(eventName: string | symbol): Function[];
    rawListeners<K_1>(eventName: string | symbol): Function[];
    listenerCount<K_1>(eventName: string | symbol, listener?: Function | undefined): number;
    prependListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    prependOnceListener<K_1>(eventName: string | symbol, listener: (...args: any[]) => void): /*elided*/any;
    eventNames(): (string | symbol)[];
  }; /** @deprecated v6 已废弃，请使用 douyin.fetcher 替代 */
  getDouyinData: (..._args: any[]) => never; /** @deprecated v6 已废弃，请使用 bilibili.fetcher 替代 */
  getBilibiliData: (..._args: any[]) => never; /** @deprecated v6 已废弃，请使用 kuaishou.fetcher 替代 */
  getKuaishouData: (..._args: any[]) => never; /** @deprecated v6 已废弃，请使用 xiaohongshu.fetcher 替代 */
  getXiaohongshuData: (..._args: any[]) => never;
  douyin: {
    /** @deprecated 请使用 fetcher 替代 */api: {
      getSearchData: (..._args: any[]) => never;
      getTextWorkInfo: (..._args: any[]) => never;
      getWorkInfo: (..._args: any[]) => never;
      getVideoWorkInfo: (..._args: any[]) => never;
      getImageAlbumWorkInfo: (..._args: any[]) => never;
      getSlidesWorkInfo: (..._args: any[]) => never;
      getComments: (..._args: any[]) => never;
      getCommentReplies: (..._args: any[]) => never;
      getUserProfile: (..._args: any[]) => never;
      getEmojiList: (..._args: any[]) => never;
      getEmojiProList: (..._args: any[]) => never;
      getUserVideos: (..._args: any[]) => never;
      getMusicInfo: (..._args: any[]) => never;
      getSuggestWords: (..._args: any[]) => never;
      search: (..._args: any[]) => never;
      getLiveRoomInfo: (..._args: any[]) => never;
      getDanmaku: (..._args: any[]) => never;
      invoke: (..._args: any[]) => never;
    }; /** fetcher */
    fetcher: IBoundDouyinFetcher;
    sign: typeof douyinSign;
    douyinApiUrls: typeof douyinApiUrls;
  };
  bilibili: {
    /** @deprecated 请使用 fetcher 替代 */api: {
      getVideoInfo: (..._args: any[]) => never;
      getVideoStream: (..._args: any[]) => never;
      getComments: (..._args: any[]) => never;
      getCommentReply: (..._args: any[]) => never;
      getUserProfile: (..._args: any[]) => never;
      getUserDynamic: (..._args: any[]) => never;
      getEmojiList: (..._args: any[]) => never;
      getBangumiInfo: (..._args: any[]) => never;
      getBangumiStream: (..._args: any[]) => never;
      getDynamicInfo: (..._args: any[]) => never;
      getDynamicCard: (..._args: any[]) => never;
      getLiveRoomDetail: (..._args: any[]) => never;
      getLiveRoomInitInfo: (..._args: any[]) => never;
      getLoginBasicInfo: (..._args: any[]) => never;
      getLoginQrcode: (..._args: any[]) => never;
      checkQrcodeStatus: (..._args: any[]) => never;
      getUserTotalPlayCount: (..._args: any[]) => never;
      convertAvToBv: (..._args: any[]) => never;
      convertBvToAv: (..._args: any[]) => never;
      getArticleContent: (..._args: any[]) => never;
      getArticleCard: (..._args: any[]) => never;
      getArticleInfo: (..._args: any[]) => never;
      getColumnInfo: (..._args: any[]) => never;
      getUserProfileDetail: (..._args: any[]) => never;
      applyVoucherCaptcha: (..._args: any[]) => never;
      validateCaptcha: (..._args: any[]) => never;
      getDanmaku: (..._args: any[]) => never;
    }; /** fetcher */
    fetcher: IBoundBilibiliFetcher;
    sign: {
      wbi_sign: typeof wbi_sign;
      av2bv: typeof av2bv;
      bv2av: typeof bv2av;
    };
    danmaku: {
      parseDmSegMobileReply: typeof parseDmSegMobileReply;
    };
    bilibiliApiUrls: typeof bilibiliApiUrls;
  };
  kuaishou: {
    /** @deprecated 请使用 fetcher 替代 */api: {
      getWorkInfo: (..._args: any[]) => never;
      getComments: (..._args: any[]) => never;
      getUserProfile: (..._args: any[]) => never;
      getUserWorkList: (..._args: any[]) => never;
      getLiveRoomInfo: (..._args: any[]) => never;
      getEmojiList: (..._args: any[]) => never;
    }; /** fetcher */
    fetcher: IBoundKuaishouFetcher;
    sign: typeof kuaishouSign;
    kuaishouApiUrls: typeof kuaishouApiUrls;
  };
  xiaohongshu: {
    /** @deprecated 请使用 fetcher 替代 */api: {
      getHomeFeed: (..._args: any[]) => never;
      getNote: (..._args: any[]) => never;
      getComments: (..._args: any[]) => never;
      getUser: (..._args: any[]) => never;
      getUserNotes: (..._args: any[]) => never;
      getSearchNotes: (..._args: any[]) => never;
      getEmojiList: (..._args: any[]) => never;
    }; /** fetcher */
    fetcher: IBoundXiaohongshuFetcher;
    sign: typeof xiaohongshuSign;
    xiaohongshuApiUrls: typeof xiaohongshuApiUrls;
  };
}; //#endregion
//#region src/platform/bilibili/BilibiliApi.d.ts
/**
 * B站相关 API 的命名空间。
 *
 * @deprecated v6 已废弃，请使用 bilibiliFetcher 或 client.bilibili.fetcher 替代
 */
declare const bilibili: {
  /** @deprecated 请使用 bilibiliFetcher.fetchVideoInfo 替代 */getVideoInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchVideoStreamUrl 替代 */
  getVideoStream: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchComments 替代 */
  getComments: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchCommentReplies 替代 */
  getCommentReply: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchUserCard 替代 */
  getUserProfile: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchUserDynamicList 替代 */
  getUserDynamic: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchEmojiList 替代 */
  getEmojiList: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchBangumiInfo 替代 */
  getBangumiInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchBangumiStreamUrl 替代 */
  getBangumiStream: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchDynamicDetail 替代 */
  getDynamicInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchDynamicCard 替代 */
  getDynamicCard: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchLiveRoomInfo 替代 */
  getLiveRoomDetail: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchLiveRoomInitInfo 替代 */
  getLiveRoomInitInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchLoginStatus 替代 */
  getLoginBasicInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.requestLoginQrcode 替代 */
  getLoginQrcode: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.checkQrcodeStatus 替代 */
  checkQrcodeStatus: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchUploaderTotalViews 替代 */
  getUserTotalPlayCount: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.convertAvToBv 替代 */
  convertAvToBv: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.convertBvToAv 替代 */
  convertBvToAv: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchArticleContent 替代 */
  getArticleContent: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchArticleCards 替代 */
  getArticleCard: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchArticleInfo 替代 */
  getArticleInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchArticleListInfo 替代 */
  getColumnInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchUserSpaceInfo 替代 */
  getUserProfileDetail: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.requestCaptchaFromVoucher 替代 */
  applyVoucherCaptcha: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.validateCaptchaResult 替代 */
  validateCaptcha: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchVideoDanmaku 替代 */
  getDanmaku: (..._args: any[]) => never;
};
/**
 * 创建绑定了cookie的B站API对象
 *
 * @deprecated v6 已废弃，请使用 createBoundBilibiliFetcher 替代
 */
declare const createBoundBilibiliApi: (_cookie: string, _requestConfig: RequestConfig) => {
  /** @deprecated 请使用 bilibiliFetcher.fetchVideoInfo 替代 */getVideoInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchVideoStreamUrl 替代 */
  getVideoStream: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchComments 替代 */
  getComments: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchCommentReplies 替代 */
  getCommentReply: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchUserCard 替代 */
  getUserProfile: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchUserDynamicList 替代 */
  getUserDynamic: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchEmojiList 替代 */
  getEmojiList: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchBangumiInfo 替代 */
  getBangumiInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchBangumiStreamUrl 替代 */
  getBangumiStream: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchDynamicDetail 替代 */
  getDynamicInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchDynamicCard 替代 */
  getDynamicCard: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchLiveRoomInfo 替代 */
  getLiveRoomDetail: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchLiveRoomInitInfo 替代 */
  getLiveRoomInitInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchLoginStatus 替代 */
  getLoginBasicInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.requestLoginQrcode 替代 */
  getLoginQrcode: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.checkQrcodeStatus 替代 */
  checkQrcodeStatus: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchUploaderTotalViews 替代 */
  getUserTotalPlayCount: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.convertAvToBv 替代 */
  convertAvToBv: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.convertBvToAv 替代 */
  convertBvToAv: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchArticleContent 替代 */
  getArticleContent: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchArticleCards 替代 */
  getArticleCard: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchArticleInfo 替代 */
  getArticleInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchArticleListInfo 替代 */
  getColumnInfo: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchUserSpaceInfo 替代 */
  getUserProfileDetail: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.requestCaptchaFromVoucher 替代 */
  applyVoucherCaptcha: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.validateCaptchaResult 替代 */
  validateCaptcha: (..._args: any[]) => never; /** @deprecated 请使用 bilibiliFetcher.fetchVideoDanmaku 替代 */
  getDanmaku: (..._args: any[]) => never;
};
/**
 * 绑定cookie的B站API对象类型
 */
type BoundBilibiliApi = ReturnType<typeof createBoundBilibiliApi>; //#endregion
//#region src/platform/bilibili/getdata.d.ts
/**
 * 哔哩哔哩API官方HTTP请求错误码
 */
declare const bilibiliErrorCodeMap: {
  '-1': string;
  '-2': string;
  '-3': string;
  '-4': string;
  '-101': string;
  '-102': string;
  '-103': string;
  '-104': string;
  '-105': string;
  '-106': string;
  '-107': string;
  '-108': string;
  '-110': string;
  '-111': string;
  '-112': string;
  '-113': string;
  '-114': string;
  '-115': string;
  '-304': string;
  '-307': string;
  '-352': string;
  '-400': string;
  '-401': string;
  '-403': string;
  '-404': string;
  '-405': string;
  '-409': string;
  '-412': string;
  '-500': string;
  '-503': string;
  '-504': string;
  '-509': string;
  '-616': string;
  '-617': string;
  '-625': string;
  '-626': string;
  '-628': string;
  '-629': string;
  '-632': string;
  '-643': string;
  '-650': string;
  '-652': string;
  '-658': string;
  '-662': string;
  '-688': string;
  '-689': string;
  '-701': string;
  '-799': string;
  '-8888': string;
  100000: string;
  100003: string;
}; //#endregion
//#region src/platform/bilibili/qtparam.d.ts
/**
 * 生成B站视频流请求参数
 * @param BASEURL - 基础请求URL
 * @param cookie - 用户Cookie
 * @returns 包含查询参数、登录状态和VIP状态的对象
 */
declare const qtparam: (BASEURL: string, cookie: string) => Promise<{
  QUERY: string;
  STATUS: string;
  isvip?: undefined;
} | {
  QUERY: string;
  STATUS: string;
  isvip: true;
} | {
  QUERY: string;
  STATUS: string;
  isvip: false;
}>; //#endregion
//#region src/platform/bilibili/routes.d.ts
/**
 * 创建B站路由
 * @param cookie - B站Cookie
 * @param requestConfig - 可选的请求配置
 * @returns Express路由器
 */
declare const createBilibiliRoutes: (cookie: string, requestConfig?: RequestConfig) => express.Router; //#endregion
//#region src/platform/bilibili/index.d.ts
type bilibiliUtilsModel = {
  /** 签名算法相关 */sign: {
    /** WBI签名算法 */wbi_sign: typeof wbi_sign; /** AV号转BV号 */
    av2bv: typeof av2bv; /** BV号转AV号 */
    bv2av: typeof bv2av;
  }; /** 弹幕解析相关 */
  danmaku: {
    /** 解析弹幕 protobuf 数据 */parseDmSegMobileReply: typeof parseDmSegMobileReply;
  }; /** 该类下的所有方法只会返回拼接好参数后的 Url 地址，需要手动请求该地址以获取数据 */
  bilibiliApiUrls: typeof bilibiliApiUrls;
  /**
   * B站相关 API 的命名空间。
   *
   * 部分接口可能不需要 Cookie 但建议传递有效的用户 Cookie，以获取更多数据。
   *
   * 提供了一系列方法，用于与B站相关的 API 进行交互。
   *
   * 每个方法都接受参数和 Cookie，返回 Promise，解析为接口返回的原始数据。
   */
  api: typeof bilibili;
};
/** B站相关功能模块 (工具集) */
declare const bilibiliUtils: bilibiliUtilsModel; //#endregion
//#region src/platform/douyin/sign/index.d.ts
declare class douyinSign {
  /**
   * 生成一个指定长度的随机字符串
   * @param length 字符串长度，默认为116
   * @returns
   */
  static Mstoken(length: number): string;
  /**
   * a_bogus 签名算法
   * @param url 需要签名的地址
   * @returns 对此地址签名后的URL查询参数
   */
  static AB(url: string, userAgent?: string): string;
  /**
   * X-Bogus 签名算法
   * @param url 需要签名的地址
   * @returns 对此地址签名后的URL查询参数
   */
  static XB(url: string, userAgent?: string): string;
  /** 生成一个唯一的验证字符串 */
  static VerifyFpManager(): string;
} //#endregion
//#region src/platform/douyin/API.d.ts
/** 去除 methodType 字段后的参数类型 */
type DouyinMethodOptionsWithoutMethodType = { [K in keyof DouyinDataOptionsMap]: OmitMethodType<DouyinDataOptionsMap[K]['opt']> };
/**
 * 抖音 API URL 构建类
 *
 * 提供所有抖音 API 的 URL 构建方法
 */
declare class DouyinAPI {
  browserVersion: string;
  /**
   * 构造函数
   *
   * @param userAgent - 用户代理字符串，用于提取浏览器版本信息
   */
  constructor(userAgent?: string);
  /**
   * 获取通用的基础参数
   *
   * @returns 通用基础参数对象
   */
  getBaseParams(): Record<string, any>;
  /** 获取视频或图集数据 */
  getWorkDetail(data: DouyinMethodOptionsWithoutMethodType['parseWork']): string;
  /** 获取评论数据 */
  getComments(data: DouyinMethodOptionsWithoutMethodType['comments']): string;
  /** 获取二级评论数据 */
  getCommentReplies(data: DouyinMethodOptionsWithoutMethodType['commentReplies']): string;
  /** 获取动图数据 */
  getSlidesInfo(data: DouyinMethodOptionsWithoutMethodType['parseWork']): string;
  /** 获取表情数据 */
  getEmojiList(): string;
  /** 获取用户主页视频数据 */
  getUserVideoList(data: DouyinMethodOptionsWithoutMethodType['userVideoList']): string;
  /** 获取用户喜欢列表数据 */
  getUserFavoriteList(data: DouyinMethodOptionsWithoutMethodType['userFavoriteList']): string;
  /** 获取用户推荐列表数据 */
  getUserRecommendList(data: DouyinMethodOptionsWithoutMethodType['userRecommendList']): string;
  /** 获取用户主页信息 */
  getUserProfile(data: DouyinMethodOptionsWithoutMethodType['userProfile']): string;
  /** 获取热点词数据 */
  getSuggestWords(data: DouyinMethodOptionsWithoutMethodType['suggestWords']): string;
  /** 获取搜索数据 */
  search(data: DouyinMethodOptionsWithoutMethodType['search']): string;
  /** 获取互动表情数据 */
  getDynamicEmojiList(): string;
  /** 获取背景音乐数据 */
  getMusicInfo(data: DouyinMethodOptionsWithoutMethodType['musicInfo']): string;
  /** 获取直播间信息 */
  getLiveRoomInfo(data: DouyinMethodOptionsWithoutMethodType['liveRoomInfo']): string;
  /** 申请登录二维码 */
  getLoginQrcode(data: DouyinMethodOptionsWithoutMethodType['loginQrcode']): string;
  /** 获取弹幕数据 */
  getDanmakuList(data: DouyinMethodOptionsWithoutMethodType['danmakuList']): string;
}
/**
 * 创建 DouyinAPI 实例的工厂函数
 *
 * @param userAgent - 用户代理字符串
 * @returns DouyinAPI 实例
 */
/** 默认的 DouyinAPI 实例（使用默认浏览器版本 125.0.0.0） */
declare const douyinApiUrls: DouyinAPI; //#endregion
//#region src/platform/douyin/DouyinApi.d.ts
/**
 * 封装了所有抖音相关的API请求，采用对象化的方式组织。
 *
 * @deprecated v6 已废弃，请使用 douyinFetcher 或 client.douyin.fetcher 替代
 */
declare const douyin: {
  /** @deprecated 请使用 douyinFetcher.fetchTextWork 替代 */getTextWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.parseWork 替代 */
  getWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchVideoWork 替代 */
  getVideoWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchImageAlbumWork 替代 */
  getImageAlbumWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchSlidesWork 替代 */
  getSlidesWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchComments 替代 */
  getComments: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchCommentReplies 替代 */
  getCommentReplies: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchUserProfile 替代 */
  getUserProfile: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchEmojiList 替代 */
  getEmojiList: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchDynamicEmojiList 替代 */
  getEmojiProList: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchUserVideoList 替代 */
  getUserVideos: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchMusicInfo 替代 */
  getMusicInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchSuggestWords 替代 */
  getSuggestWords: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.searchContent 替代 */
  search: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchLiveRoomInfo 替代 */
  getLiveRoomInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchDanmakuList 替代 */
  getDanmaku: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher 的具体方法替代 */
  invoke: (..._args: any[]) => never;
};
/**
 * 创建绑定了cookie的抖音API对象
 *
 * @deprecated v6 已废弃，请使用 createBoundDouyinFetcher 替代
 */
declare const createBoundDouyinApi: (_cookie: string, _requestConfig: RequestConfig) => {
  getSearchData: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchTextWork 替代 */
  getTextWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.parseWork 替代 */
  getWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchVideoWork 替代 */
  getVideoWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchImageAlbumWork 替代 */
  getImageAlbumWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchSlidesWork 替代 */
  getSlidesWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchComments 替代 */
  getComments: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchCommentReplies 替代 */
  getCommentReplies: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchUserProfile 替代 */
  getUserProfile: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchEmojiList 替代 */
  getEmojiList: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchDynamicEmojiList 替代 */
  getEmojiProList: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchUserVideoList 替代 */
  getUserVideos: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchMusicInfo 替代 */
  getMusicInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchSuggestWords 替代 */
  getSuggestWords: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.searchContent 替代 */
  search: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchLiveRoomInfo 替代 */
  getLiveRoomInfo: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher.fetchDanmakuList 替代 */
  getDanmaku: (..._args: any[]) => never; /** @deprecated 请使用 douyinFetcher 的具体方法替代 */
  invoke: (..._args: any[]) => never;
};
/**
 * 绑定cookie的抖音API对象类型
 */
type BoundDouyinApi = ReturnType<typeof createBoundDouyinApi>; //#endregion
//#region src/platform/douyin/routes.d.ts
/**
 * 创建抖音路由
 * @param cookie - 抖音Cookie
 * @param requestConfig - 可选的请求配置
 * @returns Express路由器
 */
declare const createDouyinRoutes: (cookie: string, requestConfig?: RequestConfig) => express.Router; //#endregion
//#region src/platform/douyin/index.d.ts
type douyinUtilsModel = {
  /** 签名算法相关 */sign: typeof douyinSign;
  /**
   * 该类下的所有方法只会返回拼接好参数后的 Url 地址，需要手动请求该地址以获取数据
   *
   * 缺少 `a_bougs` 参数，请自行生成拼接
   */
  douyinApiUrls: typeof douyinApiUrls;
  /**
   * 封装了所有抖音相关的API请求，采用对象化的方式组织。
   *
   * 提供了一系列方法，用于与抖音相关的 API 进行交互。
   *
   * 每个方法都接受参数和 Cookie，返回 Promise，解析为接口返回的原始数据。
   */
  api: typeof douyin;
};
/** 抖音相关功能模块 (工具集) */
declare const douyinUtils: douyinUtilsModel; //#endregion
//#region src/platform/kuaishou/API.d.ts
/**
 * 根据 KuaishouMethodOptionsMap 创建一个新的类型，去除每个字段中的 methodType
 */
type KuaishouMethodOptionsWithoutMethodType = { [K in keyof KuaishouMethodOptionsMap]: OmitMethodType<KuaishouMethodOptionsMap[K]> };
type KuaishouUserProfileListRequest = KuaishouMethodOptionsWithoutMethodType['UserProfileParams'] | KuaishouMethodOptionsWithoutMethodType['UserWorkListParams'];
type KuaishouBaseApiRequest = {
  type: string;
  url: string;
};
/**
 * 快手 `live_api` 请求描述对象。
 *
 * 除了最终请求地址外，还可以携带 `signPath`，用于声明
 * `__NS_hxfalcon` 实际参与签名的规范路径。
 */
type KuaishouLiveApiRequest = KuaishouBaseApiRequest & {
  method: 'GET' | 'POST';
  requiresSign?: boolean;
  signPath?: string;
  body?: Record<string, unknown>;
};
/**
 * 快手 GraphQL 请求描述对象。
 *
 * 该结构只负责描述请求，不负责执行网络请求。
 */
type KuaishouGraphqlRequest = KuaishouBaseApiRequest & {
  body: {
    operationName: string;
    variables: Record<string, unknown>;
    query: string;
  };
};
/**
 * 快手 API 地址构建类
 * 该类下的方法只负责返回请求描述对象，需要手动请求对应地址以获取数据。
 * 其中 `live_api` 方法会在必要时额外携带 `signPath`，用于声明快手签名算法实际参与计算的规范路径。
 */
declare class API {
  /**
   * 获取单个作品信息
   * @param data - 作品参数
   * @returns 请求配置
   */
  videoWork<T extends KuaishouMethodOptionsWithoutMethodType['VideoInfoParams']>(data: T): KuaishouGraphqlRequest;
  /**
   * 获取作品评论信息
   * @param data - 评论参数
   * @returns 请求配置
   */
  comments<T extends KuaishouMethodOptionsWithoutMethodType['CommentParams']>(data: T): KuaishouGraphqlRequest;
  /**
   * 获取用户主页基础资料接口地址。
   *
   * 该接口需要 `__NS_hxfalcon`，且签名使用的规范路径并不是公开 `live_api`
   * 路径，而是内部的 `/rest/k/user/info`。
   *
   * @param data - 用户主页参数
   * @returns 请求配置
   */
  userInfoById<T extends KuaishouMethodOptionsWithoutMethodType['UserProfileParams']>(data: T): KuaishouLiveApiRequest;
  /**
   * 获取用户敏感资料接口地址
   * @param data - 用户主页参数
   * @returns 请求配置
   */
  userSensitiveInfo<T extends KuaishouMethodOptionsWithoutMethodType['UserProfileParams']>(data: T): KuaishouLiveApiRequest;
  /**
   * 获取用户主页公开数据接口地址
   * @param data - 用户主页参数
   * @returns 请求配置
   */
  profilePublic<T extends KuaishouUserProfileListRequest>(data: T): KuaishouLiveApiRequest;
  /**
   * 获取用户主页公开视频列表接口地址。
   *
   * 该方法对 `live_api/profile/public` 做领域化封装，
   * 用于独立承接用户作品列表与分页能力。
   *
   * @param data - 用户作品列表参数
   * @returns 请求配置
   */
  userWorkList<T extends KuaishouMethodOptionsWithoutMethodType['UserWorkListParams']>(data: T): {
    type: string;
    url: string;
    method: "GET" | "POST";
    requiresSign?: boolean;
    signPath?: string;
    body?: Record<string, unknown>;
  };
  /**
   * 获取用户主页私密列表接口地址。
   *
   * 真实页面抓包表明该接口可以直接走纯协议请求，不必额外追加 `__NS_hxfalcon`。
   *
   * @param data - 用户主页参数
   * @returns 请求配置
   */
  profilePrivate<T extends KuaishouMethodOptionsWithoutMethodType['UserProfileParams']>(data: T): KuaishouLiveApiRequest;
  /**
   * 获取用户主页点赞列表接口地址。
   *
   * @param data - 用户主页参数
   * @returns 请求配置
   */
  profileLiked<T extends KuaishouMethodOptionsWithoutMethodType['UserProfileParams']>(data: T): KuaishouLiveApiRequest;
  /**
   * 获取用户主页兴趣推荐列表接口地址
   * @param data - 用户主页参数
   * @returns 请求配置
   */
  profileInterestList<T extends KuaishouMethodOptionsWithoutMethodType['UserProfileParams']>(data: T): KuaishouLiveApiRequest;
  /**
   * 获取主播回放列表接口地址。
   *
   * 快手页面使用 `cursor` 作为翻页参数，而返回体里仍沿用 `pcursor`。
   *
   * @param data - 用户主页参数
   * @returns 请求配置
   */
  playbackList<T extends KuaishouMethodOptionsWithoutMethodType['UserProfileParams']>(data: T): KuaishouLiveApiRequest;
  /**
   * 获取用户主页兴趣分组接口地址。
   *
   * `interestMask/list` 是当前协议链中更贴近用户兴趣分组语义的接口，
   * 相比旧的 `profileInterestMask/list` 更适合作为领域数据源。
   *
   * @returns 请求配置
   */
  interestMaskList(): KuaishouLiveApiRequest;
  /**
   * 获取分类配置接口地址。
   *
   * 该接口可用于构造用户主页 `categoryMask.config`。
   *
   * @returns 请求配置
   */
  categoryConfig(): KuaishouLiveApiRequest;
  /**
   * 获取热门分类列表接口地址。
   *
   * 该接口提供完整的分类卡片字段，可直接映射到
   * 用户主页 `categoryMask.hotList`。
   *
   * @returns 请求配置
   */
  categoryData(): KuaishouLiveApiRequest;
  /**
   * 获取分类分组列表接口地址。
   *
   * @returns 请求配置
   */
  categoryClassify(): KuaishouLiveApiRequest;
  /**
   * 获取直播间详情主接口地址。
   *
   * 真实页面 store 会用该接口按 `principalId` 获取当前房间主体，
   * 返回结构中直接包含 `liveStream`、`author`、`gameInfo`、`noticeList`
   * 与基础 `config`，比 `userFollowCount` 更符合“直播间详情”语义。
   *
   * @param data - 直播间参数
   * @param authToken - 私密房间等场景下可能需要的 authToken
   * @returns 请求配置
   */
  liveDetail<T extends KuaishouMethodOptionsWithoutMethodType['LiveRoomInfoParams']>(data: T, authToken?: string): KuaishouLiveApiRequest;
  /**
   * 获取当前登录用户关注中的开播列表接口地址。
   *
   * 该接口更接近“关注流”而不是“当前直播间详情”，
   * 因此不应再作为直播间主对象的首选来源。
   *
   * @returns 请求配置
   */
  userFollowCount(): KuaishouLiveApiRequest;
  /**
   * 获取直播间推荐流接口地址。
   *
   * 该接口使用 POST JSON，请求体中的 `gameFavour`
   * 会影响推荐房间列表的主题偏好。
   *
   * @param gameId - 当前直播房间所属游戏 ID
   * @returns 请求配置
   */
  liveReco(gameId?: number | string): KuaishouLiveApiRequest;
  /**
   * 获取直播间 WebSocket 元信息接口地址。
   *
   * @param liveStreamId - 直播流 ID
   * @returns 请求配置
   */
  liveWebsocketInfo(liveStreamId: string): KuaishouLiveApiRequest;
  /**
   * 获取直播间礼物列表接口地址
   * @param liveStreamId - 直播流 ID
   * @returns 请求配置
   */
  liveGiftList(liveStreamId: string): KuaishouLiveApiRequest;
  /**
   * 获取表情列表
   * @returns 请求配置
   */
  emojiList(): KuaishouGraphqlRequest;
}
/**
 * 快手 API 请求描述集合。
 *
 * 该对象只负责返回请求描述，不直接发起网络请求。
 */
declare const kuaishouApiUrls: API; //#endregion
//#region src/platform/kuaishou/sign/helpers.d.ts
/**
 * 快手 `__NS_hxfalcon` 组包所需的标准化载荷。
 *
 * 这里的 `url` 已经是参与签名的规范路径，而不是最终请求 URL。
 */
type KuaishouHxfalconPayload = {
  url: string;
  query: Record<string, string>;
  form: Record<string, string>;
  requestBody: Record<string, unknown>;
}; //#endregion
//#region src/platform/kuaishou/sign/index.d.ts
/**
 * 快手 `live_api` 请求签名结果。
 */
type KuaishouLiveApiSignature = {
  url: string;
  headers: Record<string, string>;
  signResult: string;
  signInput: string;
  catVersion: string;
};
/**
 * 快手签名工具集。
 *
 * 负责将请求描述对象转换为带 `__NS_hxfalcon` / `kww` 的最终请求材料。
 */
declare class kuaishouSign {
  /**
   * 获取当前纯算法运行时使用的 `caver`。
   *
   * @returns 快手 `caver` 值
   */
  static getCatVersion(): string;
  /**
   * 生成快手请求头中的 `kww` 值。
   *
   * @param cookie - 原始 Cookie 字符串
   * @returns `kww` 请求头值
   */
  static generateKww(cookie?: string): string;
  /**
   * 根据结构化签名载荷生成 `__NS_hxfalcon`。
   *
   * @param payload - 已标准化的快手签名载荷
   * @returns 包含最终签名串、sign input 与 `caver` 的结果
   */
  static generateHxfalconFromPayload(payload: KuaishouHxfalconPayload): Pick<KuaishouLiveApiSignature, 'signResult' | 'signInput' | 'catVersion'>;
  /**
   * 为快手 `live_api` URL 签名。
   *
   * @param url - 实际请求 URL
   * @param cookie - 原始 Cookie 字符串
   * @param signPath - 可选的规范签名路径
   * @returns 带签名 URL、附加请求头和调试信息
   */
  static signLiveApiUrl(url: string, cookie?: string, signPath?: string): KuaishouLiveApiSignature;
  /**
   * 为结构化的快手 `live_api` 请求描述对象签名。
   *
   * 这是项目层更推荐使用的入口，因为它能显式保留 `signPath` 元数据。
   *
   * @param request - 快手 `live_api` 请求描述对象
   * @param cookie - 原始 Cookie 字符串
   * @returns 带签名 URL、附加请求头和调试信息
   */
  static signLiveApiRequest(request: KuaishouLiveApiRequest, cookie?: string): KuaishouLiveApiSignature;
} //#endregion
//#region src/platform/kuaishou/KuaishouApi.d.ts
/**
 * 快手相关 API 的命名空间。
 *
 * @deprecated v6 已废弃，请使用 kuaishouFetcher 或 client.kuaishou.fetcher 替代
 */
declare const kuaishou: {
  /** @deprecated 请使用 kuaishouFetcher.fetchVideoWork 替代 */getWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchWorkComments 替代 */
  getComments: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchUserProfile 替代 */
  getUserProfile: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchUserWorkList 替代 */
  getUserWorkList: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchLiveRoomInfo 替代 */
  getLiveRoomInfo: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchEmojiList 替代 */
  getEmojiList: (..._args: any[]) => never;
};
/**
 * 创建绑定了cookie的快手API对象
 *
 * @deprecated v6 已废弃，请使用 createBoundKuaishouFetcher 替代
 */
declare const createBoundKuaishouApi: (_cookie: string, _requestConfig: RequestConfig) => {
  /** @deprecated 请使用 kuaishouFetcher.fetchVideoWork 替代 */getWorkInfo: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchWorkComments 替代 */
  getComments: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchUserProfile 替代 */
  getUserProfile: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchUserWorkList 替代 */
  getUserWorkList: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchLiveRoomInfo 替代 */
  getLiveRoomInfo: (..._args: any[]) => never; /** @deprecated 请使用 kuaishouFetcher.fetchEmojiList 替代 */
  getEmojiList: (..._args: any[]) => never;
};
/**
 * 绑定cookie的快手API对象类型
 */
type BoundKuaishouApi = ReturnType<typeof createBoundKuaishouApi>; //#endregion
//#region src/platform/kuaishou/routes.d.ts
/**
 * 创建快手路由
 * @param cookie - 快手Cookie
 * @param requestConfig - 可选的请求配置
 * @returns Express路由器
 */
declare const createKuaishouRoutes: (cookie: string, requestConfig?: RequestConfig) => express.Router; //#endregion
//#region src/platform/kuaishou/index.d.ts
type kuaishouUtilsModel = {
  /** 签名算法相关 */sign: typeof kuaishouSign; /** 该类下的方法只会返回请求描述对象，需要手动请求对应地址以获取数据 */
  kuaishouApiUrls: typeof kuaishouApiUrls;
  /**
   * 封装了所有快手相关的API请求，采用对象化的方式组织。
   *
   * 提供了一系列方法，用于与快手相关的 API 进行交互。
   *
   * 每个方法都接受参数和 Cookie，返回 Promise，解析为接口返回的原始数据。
   */
  api: typeof kuaishou;
};
/** 快手相关功能模块 (工具集) */
declare const kuaishouUtils: kuaishouUtilsModel; //#endregion
//#region src/platform/xiaohongshu/sign/index.d.ts
/**
 * 小红书签名算法类
 */
declare class xiaohongshuSign {
  private static client;
  /**
   * 生成GET请求的X-S签名
   * @param path - API路径
   * @param a1Cookie - a1 cookie值
   * @param clientType - 客户端类型，默认为 'xhs-pc-web'
   * @param params - 查询参数对象
   * @returns X-S签名
   */
  static generateXSGet(path: string, a1Cookie: string, clientType?: string, params?: Record<string, any>): string;
  /**
   * 生成POST请求的X-S签名
   * @param path - API路径
   * @param a1Cookie - a1 cookie值
   * @param clientType - 客户端类型，默认为 'xhs-pc-web'
   * @param body - 请求体对象
   * @returns X-S签名
   */
  static generateXSPost(path: string, a1Cookie: string, clientType?: string, body?: Record<string, any>): string;
  /**
   * 生成X-S-Common参数
   * @param cookies - cookie字符串
   * @returns Base64编码的随机字符串
   */
  static generateXSCommon(cookies: string): string;
  /**
   * 生成X-T时间戳
   * @returns 当前时间戳字符串
   */
  static generateXT(): number;
  /**
   * 生成X-B3-Traceid
   * @returns 16位随机字符串
   */
  static generateXB3Traceid(): string;
  /**
   * 从cookie字符串中提取a1值
   * @param cookieString - 完整的cookie字符串
   * @returns a1 cookie值
   */
  static extractA1FromCookie(cookieString: string): string;
  /**
   * 生成搜索ID
   * @returns 搜索ID字符串
   */
  static getSearchId: () => string;
} //#endregion
//#region src/platform/xiaohongshu/XiaohongshuApi.d.ts
/**
 * 封装了所有小红书相关的API请求，采用对象化的方式组织。
 *
 * @deprecated v6 已废弃，请使用 xiaohongshuFetcher 或 client.xiaohongshu.fetcher 替代
 */
declare const xiaohongshu: {
  /** @deprecated 请使用 xiaohongshuFetcher.fetchHomeFeed 替代 */getHomeFeed: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchNoteDetail 替代 */
  getNote: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchNoteComments 替代 */
  getComments: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchUserProfile 替代 */
  getUser: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchUserNoteList 替代 */
  getUserNotes: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.searchNotes 替代 */
  getSearchNotes: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchEmojiList 替代 */
  getEmojiList: (..._args: any[]) => never;
};
/**
 * 创建绑定了cookie的小红书API对象
 *
 * @deprecated v6 已废弃，请使用 createBoundXiaohongshuFetcher 替代
 */
declare const createBoundXiaohongshuApi: (_cookie: string, _requestConfig: RequestConfig) => {
  /** @deprecated 请使用 xiaohongshuFetcher.fetchHomeFeed 替代 */getHomeFeed: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchNoteDetail 替代 */
  getNote: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchNoteComments 替代 */
  getComments: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchUserProfile 替代 */
  getUser: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchUserNoteList 替代 */
  getUserNotes: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.searchNotes 替代 */
  getSearchNotes: (..._args: any[]) => never; /** @deprecated 请使用 xiaohongshuFetcher.fetchEmojiList 替代 */
  getEmojiList: (..._args: any[]) => never;
};
/**
 * 绑定cookie的小红书API对象类型
 */
type BoundXiaohongshuApi = ReturnType<typeof createBoundXiaohongshuApi>; //#endregion
//#region src/platform/xiaohongshu/routes.d.ts
/**
 * 创建小红书路由
 * @param cookie - 小红书Cookie
 * @param requestConfig - 可选的请求配置
 * @returns Express路由器
 */
declare const createXiaohongshuRoutes: (cookie: string, requestConfig?: RequestConfig) => express.Router; //#endregion
//#region src/platform/xiaohongshu/index.d.ts
type xiaohongshuUtilsModel = {
  /** 签名算法相关 */sign: typeof xiaohongshuSign;
  /**
   * 该类下的所有方法只会返回拼接好参数后的 Url 地址，需要手动请求该地址以获取数据
   */
  xiaohongshuApiUrls: typeof xiaohongshuApiUrls;
  /**
   * 封装了所有小红书相关的API请求，采用对象化的方式组织。
   *
   * 提供了一系列方法，用于与小红书相关的 API 进行交互。
   *
   * 每个方法都接受参数和 Cookie，返回 Promise，解析为接口返回的原始数据。
   */
  api: typeof xiaohongshu;
};
/** 小红书相关功能模块 (工具集) */
declare const xiaohongshuUtils: xiaohongshuUtilsModel; //#endregion
//#region src/model/DataFetchers.d.ts
/**
 * 获取抖音数据
 *
 * @deprecated v6 已废弃，请使用 douyinFetcher 或 client.douyin.fetcher 替代
 * @throws {DeprecatedApiError} 调用时抛出废弃错误
 *
 * @example
 * ```typescript
 * // 旧用法 (已废弃，会抛出错误)
 * const data = await getDouyinData('videoWork', { aweme_id: '123' }, cookie)
 *
 * // 新用法
 * import { douyinFetcher } from '@ikenxuan/amagi'
 * const data = await douyinFetcher.fetchVideoWork({ aweme_id: '123' }, cookie)
 *
 * // 或使用客户端实例
 * const client = createAmagiClient({ cookies: { douyin: cookie } })
 * const data = await client.douyin.fetcher.fetchVideoWork({ aweme_id: '123' })
 * ```
 */
declare function getDouyinData(..._args: any[]): never;
/**
 * 获取B站数据
 *
 * @deprecated v6 已废弃，请使用 bilibiliFetcher 或 client.bilibili.fetcher 替代
 * @throws {DeprecatedApiError} 调用时抛出废弃错误
 *
 * @example
 * ```typescript
 * // 旧用法 (已废弃，会抛出错误)
 * const data = await getBilibiliData('videoInfo', { bvid: 'BV123' }, cookie)
 *
 * // 新用法
 * import { bilibiliFetcher } from '@ikenxuan/amagi'
 * const data = await bilibiliFetcher.fetchVideoInfo({ bvid: 'BV123' }, cookie)
 *
 * // 或使用客户端实例
 * const client = createAmagiClient({ cookies: { bilibili: cookie } })
 * const data = await client.bilibili.fetcher.fetchVideoInfo({ bvid: 'BV123' })
 * ```
 */
declare function getBilibiliData(..._args: any[]): never;
/**
 * 获取快手数据
 *
 * @deprecated v6 已废弃，请使用 kuaishouFetcher 或 client.kuaishou.fetcher 替代
 * @throws {DeprecatedApiError} 调用时抛出废弃错误
 *
 * @example
 * ```typescript
 * // 旧用法 (已废弃，会抛出错误)
 * const data = await getKuaishouData('videoWork', { photoId: '123' }, cookie)
 *
 * // 新用法
 * import { kuaishouFetcher } from '@ikenxuan/amagi'
 * const data = await kuaishouFetcher.fetchVideoWork({ photoId: '123' }, cookie)
 *
 * // 或使用客户端实例
 * const client = createAmagiClient({ cookies: { kuaishou: cookie } })
 * const data = await client.kuaishou.fetcher.fetchVideoWork({ photoId: '123' })
 * ```
 */
declare function getKuaishouData(..._args: any[]): never; //#endregion
//#region src/utils/errors.d.ts
/**
 * API错误类
 */
declare class ApiError extends Error {
  readonly code: number;
  readonly platform: string;
  /**
   * 构造API错误
   * @param message - 错误消息
   * @param code - 错误代码
   * @param platform - 平台名称
   */
  constructor(message: string, code?: number, platform?: string);
}
/**
 * 参数验证错误类
 */
declare class ValidationError extends Error {
  readonly errors: Array<{
    field: string;
    message: string;
  }>;
  readonly requestPath?: string;
  /**
   * 构造参数验证错误
   * @param message - 错误消息
   * @param errors - 详细错误信息
   * @param requestPath - HTTP请求路径
   */
  constructor(message: string, errors: Array<{
    field: string;
    message: string;
  }>, requestPath?: string);
  /**
   * 从Zod错误创建验证错误
   * @param zodError - Zod验证错误
   * @param requestPath - HTTP请求路径
   * @returns 验证错误实例
   */
  static fromZodError(zodError: ZodError<any>, requestPath?: string): ValidationError;
}
/**
 * 处理错误并返回统一格式
 * @param error - 错误对象
 * @param requestPath - HTTP请求路径（可选）
 * @returns 统一的错误响应格式
 */
declare const handleError: (error: unknown, requestPath?: string) => {
  data: null;
  message: string;
  code: number;
  errors?: Array<{
    field: string;
    message: string;
  }>;
  platform?: string;
  requestPath?: string;
}; //#endregion
//#region src/model/networks.d.ts
/**
 * 执行网络请求并返回数据（带自动重试）
 * @param config - axios请求配置
 * @param maxRetries - 最大重试次数，默认3次
 * @returns 响应数据或错误结果
 */
declare const fetchData: <T>(config: AxiosRequestConfig<T>, maxRetries?: number) => Promise<T | ErrorResult>;
/**
 * 执行网络请求并返回完整响应（带自动重试）
 * @param config - axios请求配置
 * @param maxRetries - 最大重试次数，默认3次
 * @returns 完整响应或错误结果
 */
declare const fetchResponse: <T = unknown>(config: AxiosRequestConfig, maxRetries?: number) => Promise<AxiosResponse<T> | ErrorResult>;
/**
 * 判断结果是否为网络错误响应
 * @param result - 请求结果
 * @returns 是否为ErrorResult
 *
 * 通过检查 error 字段中的 amagiError 来区分网络错误和业务错误
 */
declare const isNetworkErrorResult: (result: unknown) => result is ErrorResult;
/**
 * 获取响应头和数据（带自动重试）
 * @param config - axios请求配置
 * @param maxRetries - 最大重试次数，默认3次
 * @returns 包含headers和data的对象，或错误结果
 */
declare const getHeadersAndData: <T = any>(config: AxiosRequestConfig, maxRetries?: number) => Promise<{
  headers: RawAxiosResponseHeaders;
  data: T;
} | ErrorResult>; //#endregion
//#region src/model/logger.d.ts
/**
 * @deprecated v6 已废弃，请使用事件系统替代
 * 初始化 logger 配置 - 此函数现在为空操作
 */
declare const initLogger: () => void;
/**
 * @deprecated v6 已废弃，请使用事件系统替代
 * 简化的日志类，仅发射事件，不再依赖 log4js
 */
declare class SimpleLogger {
  chalk: ChalkInstance;
  red: (text: string) => string;
  green: (text: string) => string;
  yellow: (text: string) => string;
  blue: (text: string) => string;
  magenta: (text: string) => string;
  cyan: (text: string) => string;
  white: (text: string) => string;
  gray: (text: string) => string;
  constructor();
  info(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  error(message: any, ...args: any[]): void;
  mark(message: any, ...args: any[]): void;
  debug(message: any, ...args: any[]): void;
}
/**
 * @deprecated v6 已废弃，请使用事件系统替代
 */
declare const logger: SimpleLogger;
/**
 * @deprecated v6 已废弃，请使用事件系统替代
 */
declare const httpLogger: SimpleLogger;
/**
 * @deprecated v6 已废弃，请使用事件系统监听 http:response 事件
 * 创建一个日志中间件，用于记录特定请求的详细信息
 * @param pathsToLog 指定需要记录日志的请求路径数组如果未提供，则记录所有请求的日志
 * @returns
 */
declare const logMiddleware: (pathsToLog?: string[]) => express.RequestHandler; //#endregion
//#region src/types/api-spec.d.ts
/**
 * Amagi v6 API 规范定义
 *
 * 使用 TypeScript 类型系统定义 RESTful API 规范
 * 所有参数通过查询字符串传递，便于 API 文档编写
 *
 * @module types/api-spec
 */
/**
 * HTTP 方法类型
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
/**
 * API 端点定义
 */
interface ApiEndpoint<TParams = unknown, TResponse = unknown, TQuery = unknown, TBody = unknown> {
  /** 端点路径 */
  path: string;
  /** HTTP 方法 */
  method: HttpMethod;
  /** 端点描述 */
  description: string;
  /** 端点标签/分类 */
  tags: string[];
  /** 路径参数 schema */
  params?: TParams;
  /** 查询参数 schema */
  query?: TQuery;
  /** 请求体 schema */
  body?: TBody;
  /** 响应 schema */
  response: TResponse;
}
/**
 * 平台类型
 */
type Platform = 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu';
declare const DouyinMethodMapping: {
  readonly 视频作品数据: "fetchVideoWork";
  readonly 图集作品数据: "fetchImageAlbumWork";
  readonly 合辑作品数据: "fetchSlidesWork";
  readonly 文字作品数据: "fetchTextWork";
  readonly 聚合解析: "parseWork";
  readonly 评论数据: "fetchWorkComments";
  readonly 指定评论回复数据: "fetchCommentReplies";
  readonly 用户主页数据: "fetchUserProfile";
  readonly 用户主页视频列表数据: "fetchUserVideoList";
  readonly 搜索数据: "searchContent";
  readonly 热点词数据: "fetchSuggestWords";
  readonly 音乐数据: "fetchMusicInfo";
  readonly 直播间信息数据: "fetchLiveRoomInfo";
  readonly 申请二维码数据: "requestLoginQrcode";
  readonly Emoji数据: "fetchEmojiList";
  readonly 动态表情数据: "fetchDynamicEmojiList";
  readonly 弹幕数据: "fetchDanmakuList";
};
type DouyinMethodKey = keyof typeof DouyinMethodMapping;
type DouyinMethodValue = typeof DouyinMethodMapping[DouyinMethodKey];
declare const BilibiliMethodMapping: {
  readonly 单个视频作品数据: "fetchVideoInfo";
  readonly 单个视频下载信息数据: "fetchVideoStreamUrl";
  readonly 实时弹幕: "fetchVideoDanmaku";
  readonly 评论数据: "fetchComments";
  readonly 指定评论的回复: "fetchCommentReplies";
  readonly 用户主页数据: "fetchUserCard";
  readonly 用户主页动态列表数据: "fetchUserDynamicList";
  readonly 用户空间详细信息: "fetchUserSpaceInfo";
  readonly 获取UP主总播放量: "fetchUploaderTotalViews";
  readonly 动态详情数据: "fetchDynamicDetail";
  readonly 动态卡片数据: "fetchDynamicCard";
  readonly 番剧基本信息数据: "fetchBangumiInfo";
  readonly 番剧下载信息数据: "fetchBangumiStreamUrl";
  readonly 直播间信息: "fetchLiveRoomInfo";
  readonly 直播间初始化信息: "fetchLiveRoomInitInfo";
  readonly 专栏正文内容: "fetchArticleContent";
  readonly 专栏显示卡片信息: "fetchArticleCards";
  readonly 专栏文章基本信息: "fetchArticleInfo";
  readonly 文集基本信息: "fetchArticleListInfo";
  readonly 登录基本信息: "fetchLoginStatus";
  readonly 申请二维码: "requestLoginQrcode";
  readonly 二维码状态: "checkQrcodeStatus";
  readonly AV转BV: "convertAvToBv";
  readonly BV转AV: "convertBvToAv";
  readonly Emoji数据: "fetchEmojiList";
  readonly 从_v_voucher_申请_captcha: "requestCaptchaFromVoucher";
  readonly 验证验证码结果: "validateCaptchaResult";
};
type BilibiliMethodKey = keyof typeof BilibiliMethodMapping;
type BilibiliMethodValue = typeof BilibiliMethodMapping[BilibiliMethodKey];
declare const KuaishouMethodMapping: {
  readonly 单个视频作品数据: "fetchVideoWork";
  readonly 评论数据: "fetchWorkComments";
  readonly 用户主页数据: "fetchUserProfile";
  readonly 用户作品列表数据: "fetchUserWorkList";
  readonly 直播间信息数据: "fetchLiveRoomInfo";
  readonly Emoji数据: "fetchEmojiList";
};
type KuaishouMethodKey = keyof typeof KuaishouMethodMapping;
type KuaishouMethodValue = typeof KuaishouMethodMapping[KuaishouMethodKey];
declare const XiaohongshuMethodMapping: {
  readonly 首页推荐数据: "fetchHomeFeed";
  readonly 单个笔记数据: "fetchNoteDetail";
  readonly 评论数据: "fetchNoteComments";
  readonly 用户数据: "fetchUserProfile";
  readonly 用户笔记数据: "fetchUserNoteList";
  readonly 表情列表: "fetchEmojiList";
  readonly 搜索笔记: "searchNotes";
};
type XiaohongshuMethodKey = keyof typeof XiaohongshuMethodMapping;
type XiaohongshuMethodValue = typeof XiaohongshuMethodMapping[XiaohongshuMethodKey];
/**
 * Douyin HTTP API 路由
 *
 * 所有参数通过查询字符串传递，例如:
 * GET /api/douyin/work?aweme_id=xxx
 * GET /api/douyin/comments?aweme_id=xxx&number=50
 */
declare const DouyinApiRoutes: {
  readonly parseWork: "/work";
  readonly videoWork: "/work";
  readonly imageAlbumWork: "/work";
  readonly slidesWork: "/work";
  readonly textWork: "/work";
  readonly comments: "/comments";
  readonly commentReplies: "/comment-replies";
  readonly userProfile: "/user";
  readonly userVideoList: "/user/videos";
  readonly search: "/search";
  readonly suggestWords: "/search/suggest";
  readonly musicInfo: "/music";
  readonly liveRoomInfo: "/live";
  readonly loginQrcode: "/auth/qrcode";
  readonly emojiList: "/emoji";
  readonly dynamicEmojiList: "/emoji/dynamic";
  readonly danmakuList: "/danmaku";
};
/**
 * Bilibili HTTP API 路由
 *
 * 所有参数通过查询字符串传递，例如:
 * GET /api/bilibili/video?bvid=xxx
 * GET /api/bilibili/comments?oid=xxx&type=1
 */
declare const BilibiliApiRoutes: {
  readonly videoInfo: "/video";
  readonly videoStream: "/video/stream";
  readonly videoDanmaku: "/video/danmaku";
  readonly comments: "/comments";
  readonly commentReplies: "/comment-replies";
  readonly userCard: "/user";
  readonly userDynamicList: "/user/dynamics";
  readonly userSpaceInfo: "/user/space";
  readonly uploaderTotalViews: "/user/total-views";
  readonly dynamicDetail: "/dynamic";
  readonly dynamicCard: "/dynamic/card";
  readonly bangumiInfo: "/bangumi";
  readonly bangumiStream: "/bangumi/stream";
  readonly liveRoomInfo: "/live";
  readonly liveRoomInit: "/live/init";
  readonly articleContent: "/article/content";
  readonly articleCards: "/article/cards";
  readonly articleInfo: "/article";
  readonly articleListInfo: "/article-list";
  readonly loginStatus: "/auth/status";
  readonly loginQrcode: "/auth/qrcode";
  readonly qrcodeStatus: "/auth/qrcode/status";
  readonly avToBv: "/convert/av-to-bv";
  readonly bvToAv: "/convert/bv-to-av";
  readonly emojiList: "/emoji";
  readonly captchaFromVoucher: "/captcha";
  readonly validateCaptcha: "/captcha/validate";
};
/**
 * Kuaishou HTTP API 路由
 */
declare const KuaishouApiRoutes: {
  readonly videoWork: "/work";
  readonly comments: "/comments";
  readonly userProfile: "/user";
  readonly userWorkList: "/user/works";
  readonly liveRoomInfo: "/live";
  readonly emojiList: "/emoji";
};
/**
 * Xiaohongshu HTTP API 路由
 */
declare const XiaohongshuApiRoutes: {
  readonly homeFeed: "/feed";
  readonly noteDetail: "/note";
  readonly noteComments: "/comments";
  readonly userProfile: "/user";
  readonly userNoteList: "/user/notes";
  readonly emojiList: "/emoji";
  readonly searchNotes: "/search";
};
/**
 * 根据中文方法名获取英文 fetcher 方法名
 */
declare function getEnglishMethodName<T extends Platform>(platform: T, chineseMethod: string): string | undefined;
/**
 * 根据 methodType 获取 HTTP API 路由路径
 */
declare function getApiRoute<T extends Platform>(platform: T, methodType: string): string | undefined; //#endregion
//#region src/index.d.ts
/**
 * @deprecated 请使用 createAmagiClient 替代
 */
declare const amagiClient: typeof createAmagiClient;
/** amagi 的构造函数类型 */
type AmagiConstructor = {
  new (options?: Options): ReturnType<typeof createAmagiClient>;
  (options?: Options): ReturnType<typeof createAmagiClient>; /** 当前版本号 */
  readonly version: string; /** 抖音相关功能模块 (工具集) */
  douyin: typeof douyinUtils; /** B站相关功能模块 (工具集) */
  bilibili: typeof bilibiliUtils; /** 快手相关功能模块 (工具集) */
  kuaishou: typeof kuaishouUtils; /** 小红书相关功能模块 (工具集) */
  xiaohongshu: typeof xiaohongshuUtils;
  /**
   * @deprecated v6 已废弃，请使用 douyinFetcher 替代
   * @throws {DeprecatedApiError} 调用时抛出废弃错误
   */
  getDouyinData: (...args: any[]) => never;
  /**
   * @deprecated v6 已废弃，请使用 bilibiliFetcher 替代
   * @throws {DeprecatedApiError} 调用时抛出废弃错误
   */
  getBilibiliData: (...args: any[]) => never;
  /**
   * @deprecated v6 已废弃，请使用 kuaishouFetcher 替代
   * @throws {DeprecatedApiError} 调用时抛出废弃错误
   */
  getKuaishouData: (...args: any[]) => never;
  /**
   * @deprecated v6 已废弃，请使用 xiaohongshuFetcher 替代
   * @throws {DeprecatedApiError} 调用时抛出废弃错误
   */
  getXiaohongshuData: (...args: any[]) => never; /** 事件系统 */
  events: typeof amagiEvents;
  /**
   * 注册事件监听器
   * @param event - 事件名称
   * @param listener - 事件处理函数
   */
  on: typeof amagiEvents.on;
  /**
   * 注册一次性事件监听器
   * @param event - 事件名称
   * @param listener - 事件处理函数 (只触发一次)
   */
  once: typeof amagiEvents.once; /** B站数据获取器 (需要传递 cookie) */
  bilibiliFetcher: typeof bilibiliFetcher; /** 抖音数据获取器 (需要传递 cookie) */
  douyinFetcher: typeof douyinFetcher; /** 快手数据获取器 (需要传递 cookie) */
  kuaishouFetcher: typeof kuaishouFetcher; /** 小红书数据获取器 (需要传递 cookie) */
  xiaohongshuFetcher: typeof xiaohongshuFetcher; /** 创建绑定 cookie 的 B站 fetcher */
  createBoundBilibiliFetcher: typeof createBoundBilibiliFetcher; /** 创建绑定 cookie 的抖音 fetcher */
  createBoundDouyinFetcher: typeof createBoundDouyinFetcher; /** 创建绑定 cookie 的快手 fetcher */
  createBoundKuaishouFetcher: typeof createBoundKuaishouFetcher; /** 创建绑定 cookie 的小红书 fetcher */
  createBoundXiaohongshuFetcher: typeof createBoundXiaohongshuFetcher;
};
/** After instantiation, it can interact with the specified platform API to quickly obtain data. */
declare const CreateApp: AmagiConstructor;
/** After instantiation, it can interact with the specified platform API to quickly obtain data. */
declare const Client: typeof CreateApp;
declare const amagi: typeof Client;
/*!
 * @ikenxuan/amagi
 * Copyright(c) 2023 ikenxuan
 * GPL-3.0 Licensed
 */
//#endregion
//#endregion
export { APIErrorType, AdditionalType, type AmagiEventMap, type AmagiEventType, type ApiEndpoint, ApiError, type ApiErrorEventData, ApiResponse, type ApiSuccessEventData, ArticleCard, ArticleContent, ArticleInfo, ArticleWork, BaseRequestOptions, BaseResponse, BiliAv2Bv, BiliBangumiVideoInfo, BiliBangumiVideoPlayurlIsLogin, BiliBangumiVideoPlayurlNoLogin, BiliBiliVideoPlayurlNoLogin, BiliBv2AV, BiliCheckQrcode, BiliCommentReply, BiliDynamicCard, BiliDynamicInfo, BiliDynamicInfoUnion, BiliEmojiList, BiliLiveRoomDef, BiliLiveRoomDetail, BiliNewLoginQrcode, BiliOneWork, BiliProtobufDanmaku, BiliUserDynamic, BiliUserFullView, BiliUserProfile, BiliVideoPlayurlIsLogin, BiliWorkComments, BilibiliApiRoutes, type BilibiliApplyCaptchaOptions, BilibiliApplyCaptchaParamsSchema, type BilibiliArticleCardOptions, BilibiliArticleCardParamsSchema, BilibiliArticleInfoParamsSchema, type BilibiliArticleOptions, BilibiliArticleParamsSchema, type BilibiliAv2BvOptions, BilibiliAv2BvParamsSchema, type BilibiliBangumiInfoOptions, BilibiliBangumiInfoParamsSchema, type BilibiliBangumiStreamOptions, BilibiliBangumiStreamParamsSchema, type BilibiliBv2AvOptions, BilibiliBv2AvParamsSchema, BilibiliColumnInfoParamsSchema, BilibiliCommentParamsSchema, type BilibiliCommentRepliesOptions, BilibiliCommentReplyParamsSchema, type BilibiliCommentsOptions, type BilibiliDanmakuOptions, BilibiliDanmakuParamsSchema, BilibiliDataOptions, BilibiliDataOptionsMap, type BilibiliDynamicOptions, BilibiliDynamicParamsSchema, BilibiliEmojiParamsSchema, type BilibiliFetcher, BilibiliFetcherMethodKey, BilibiliFetcherMethods, BilibiliInternalMethodKey, BilibiliInternalMethods, BilibiliLiveParamsSchema, type BilibiliLiveRoomOptions, BilibiliLoginParamsSchema, type BilibiliMethodKey, BilibiliMethodMapping, BilibiliMethodOptMap, BilibiliMethodOptionsMap, BilibiliMethodRoutes, BilibiliMethodToFetcher, type BilibiliMethodType, type BilibiliMethodValue, BilibiliQrcodeParamsSchema, type BilibiliQrcodeStatusOptions, BilibiliQrcodeStatusParamsSchema, BilibiliReturnTypeMap, type BilibiliUserOptions, BilibiliUserParamsSchema, type BilibiliValidateCaptchaOptions, BilibiliValidateCaptchaParamsSchema, BilibiliValidationSchemas, BilibiliVideoDownloadParamsSchema, type BilibiliVideoInfoOptions, BilibiliVideoParamsSchema, type BilibiliVideoStreamOptions, BoundBilibiliApi, type BoundBilibiliFetcher, BoundDouyinApi, type BoundDouyinFetcher, BoundKuaishouApi, type BoundKuaishouFetcher, BoundXiaohongshuApi, type BoundXiaohongshuFetcher, ColumnInfo, CommentReply, CommentType, ConditionalReturnType, CookieConfig, CreateApp, DouyinApiRoutes, DouyinCommentParamsSchema, type DouyinCommentRepliesOptions, DouyinCommentReplyParamsSchema, type DouyinCommentsOptions, type DouyinDanmakuOptions, DouyinDanmakuParamsSchema, DouyinDataOptions, DouyinDataOptionsMap, DouyinEmojiListParamsSchema, DouyinEmojiProParamsSchema, type DouyinFetcher, DouyinFetcherMethodKey, DouyinFetcherMethods, DouyinHotWordsParamsSchema, DouyinInternalMethodKey, DouyinInternalMethods, type DouyinLiveRoomOptions, DouyinLiveRoomParamsSchema, type DouyinMethodKey, DouyinMethodMapping, DouyinMethodOptMap, DouyinMethodOptionsMap, DouyinMethodRoutes, DouyinMethodToFetcher, type DouyinMethodType, type DouyinMethodValue, type DouyinMusicOptions, DouyinMusicParamsSchema, type DouyinQrcodeOptions, DouyinQrcodeParamsSchema, DouyinReturnTypeMap, type DouyinSearchOptions, DouyinSearchParamsSchema, type DouyinSuggestWordsOptions, type DouyinUserListOptions, DouyinUserListParamsSchema, type DouyinUserOptions, DouyinUserParamsSchema, DouyinValidationSchemas, type DouyinWorkOptions, DouyinWorkParamsSchema, DyDanmakuList, DyEmojiList, DyEmojiProList, DyImageAlbumWork, DyMusicWork, DySearchInfo, DySlidesWork, DySuggestWords, DyUserInfo, DyUserLiveVideos, DyUserPostVideos, DyVideoWork, DyWorkComments, DynamicType, DynamicTypeAV, DynamicTypeArticle, DynamicTypeDraw, DynamicTypeForward, DynamicTypeForwardUnion, DynamicTypeLiveRcmd, DynamicTypeWord, ErrorResult, ExtractTypeMode, FetcherConfig, HomeFeed, type HttpMethod, type HttpRequestEventData, type HttpResponseEventData, type IBilibiliFetcher, type IBoundBilibiliFetcher, type IBoundDouyinFetcher, type IBoundKuaishouFetcher, type IBoundXiaohongshuFetcher, type IDouyinFetcher, type IKuaishouFetcher, type IXiaohongshuFetcher, type KsBannedStatus, KsEmojiList, KsLiveRoomDetail, KsLiveRoomInfo, KsOneWork, KsUserHomeAuthorInfo, KsUserHomeCategoryMask, KsUserHomeDetail, KsUserHomeFollowButtonState, KsUserHomeFollowState, KsUserHomeHotCategory, KsUserHomeInterestAuthor, KsUserHomeInterestCategory, KsUserHomeProfileState, KsUserHomeTabData, type KsUserHomeWork, KsUserProfile, type KsUserProfileCounts, type KsUserProfileGameInfo, type KsUserProfileLiveInfo, type KsUserProfileSensitiveInfo, type KsUserProfileUserInfo, KsUserWorkList, type KsVerifiedStatus, KsWorkComments, KuaishouApiRoutes, KuaishouCommentParamsSchema, type KuaishouCommentsOptions, KuaishouDataOptions, KuaishouDataOptionsMap, KuaishouEmojiParamsSchema, type KuaishouFetcher, KuaishouFetcherMethodKey, KuaishouFetcherMethods, type KuaishouGraphqlRequest, KuaishouInternalMethodKey, KuaishouInternalMethods, type KuaishouLiveApiRequest, type KuaishouLiveRoomInfoOptions, KuaishouLiveRoomInfoParamsSchema, type KuaishouMethodKey, KuaishouMethodMapping, KuaishouMethodOptMap, KuaishouMethodOptionsMap, KuaishouMethodRoutes, KuaishouMethodToFetcher, type KuaishouMethodType, type KuaishouMethodValue, KuaishouReturnTypeMap, type KuaishouUserProfileOptions, KuaishouUserProfileParamsSchema, type KuaishouUserWorkListOptions, KuaishouUserWorkListParamsSchema, KuaishouValidationSchemas, KuaishouVideoParamsSchema, type KuaishouVideoWorkOptions, type LogEventData, MajorType, MethodMaps, type NetworkErrorEventData, type NetworkRetryEventData, type NetworksConfigType, NoteComments, OmitMethodType, OneNote, Options, type Platform, RequestConfig, Result$1 as Result, SearchInfoGeneralData, SearchInfoUser, SearchInfoVideo, SearchNotes, SuccessResult$1 as SuccessResult, TypeControl, TypeMode, ValidationError, XiaohongshuApiRoutes, type XiaohongshuCommentsOptions, XiaohongshuDataOptions, XiaohongshuDataOptionsMap, XiaohongshuEmojiList, type XiaohongshuFetcher, XiaohongshuFetcherMethodKey, XiaohongshuFetcherMethods, type XiaohongshuHomeFeedOptions, XiaohongshuInternalMethodKey, XiaohongshuInternalMethods, type XiaohongshuMethodKey, XiaohongshuMethodMapping, XiaohongshuMethodOptMap, XiaohongshuMethodOptionsMap, XiaohongshuMethodRoutes, XiaohongshuMethodToFetcher, XiaohongshuMethodType, type XiaohongshuMethodValue, type XiaohongshuNoteDetailOptions, XiaohongshuReturnTypeMap, type XiaohongshuSearchNotesOptions, type XiaohongshuUserNotesOptions, XiaohongshuUserProfile, type XiaohongshuUserProfileOptions, XiaohongshuValidationSchemas, amagi, amagiClient, amagiEvents, av2bv, bilibili, bilibiliApiUrls, bilibiliErrorCodeMap, bilibiliFetcher, bilibiliUtils, bv2av, createAmagiClient, createBilibiliRoutes, createBilibiliRoutes as registerBilibiliRoutes, createBoundBilibiliApi, createBoundBilibiliFetcher, createBoundDouyinApi, createBoundDouyinFetcher, createBoundKuaishouApi, createBoundKuaishouFetcher, createBoundXiaohongshuApi, createBoundXiaohongshuFetcher, createDouyinRoutes, createDouyinRoutes as registerDouyinRoutes, createErrorResponse, createKuaishouRoutes, createKuaishouRoutes as registerKuaishouRoutes, createSuccessResponse, createXiaohongshuRoutes, createXiaohongshuRoutes as registerXiaohongshuRoutes, douyin, douyinApiUrls, douyinFetcher, douyinSign, douyinUtils, emitApiError, emitApiSuccess, emitHttpRequest, emitHttpResponse, emitLog, emitLogDebug, emitLogError, emitLogInfo, emitLogMark, emitLogWarn, emitNetworkError, emitNetworkRetry, fetchData, fetchResponse, getApiRoute, getBilibiliData, getDouyinData, getEnglishMethodName, getHeadersAndData, getKuaishouData, handleError, httpLogger, initLogger, isNetworkErrorResult, kuaishou, kuaishouApiUrls, kuaishouFetcher, kuaishouSign, kuaishouUtils, logMiddleware, logger, parseDmSegMobileReply, qtparam, toFetcherMethod, validateBilibiliParams, validateDouyinParams, validateKuaishouParams, validateXiaohongshuParams, wbi_sign, xiaohongshu, xiaohongshuApiUrls, xiaohongshuFetcher, xiaohongshuSign, xiaohongshuUtils };