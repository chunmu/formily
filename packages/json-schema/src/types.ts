export type SchemaEnum<Message> = Array<
  | string
  | number
  | { label: Message; value: any; [key: string]: any }
  | { key: any; title: Message; [key: string]: any }
>

export type SchemaTypes =
  | 'string'
  | 'object'
  | 'array'
  | 'number'
  | 'boolean'
  | 'void'
  | 'date'
  | 'datetime'
  | (string & {})

export type SchemaProperties<
  Decorator,
  Component,
  DecoratorProps,
  ComponentProps,
  Pattern,
  Display,
  Validator,
  Message
> = Record<
  string,
  ISchema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >
>

export type SchemaPatch = (schema: ISchema) => ISchema

export type SchemaKey = string | number

export type SchemaEffectTypes =
  | 'onFieldInit'
  | 'onFieldMount'
  | 'onFieldUnmount'
  | 'onFieldValueChange'
  | 'onFieldInputValueChange'
  | 'onFieldInitialValueChange'
  | 'onFieldValidateStart'
  | 'onFieldValidateEnd'
  | 'onFieldValidateFailed'
  | 'onFieldValidateSuccess'

export type SchemaReaction<Field = any> =
  | {
      dependencies?: string[] | Record<string, string>
      when?: string | boolean
      target?: string
      effects?: SchemaEffectTypes[]
      fulfill?: {
        state?: Stringify<Formily.Core.Types.IGeneralFieldState>
        schema?: ISchema
        run?: string
      }
      otherwise?: {
        state?: Stringify<Formily.Core.Types.IGeneralFieldState>
        schema?: ISchema
        run?: string
      }
    }
  | ((field: Field) => void)

export type SchemaReactions<Field = any> =
  | SchemaReaction<Field>
  | SchemaReaction<Field>[]

export type SchemaItems<
  Decorator,
  Component,
  DecoratorProps,
  ComponentProps,
  Pattern,
  Display,
  Validator,
  Message
> =
  | ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >
  | ISchema<
      Decorator,
      Component,
      DecoratorProps,
      ComponentProps,
      Pattern,
      Display,
      Validator,
      Message
    >[]

export type SchemaComponents = Record<string, any>

export interface ISchemaFieldFactoryOptions<
  Components extends SchemaComponents = any
> {
  components?: Components
  scope?: any
}

export interface ISchemaFieldUpdateRequest {
  state?: Stringify<Formily.Core.Types.IFieldState>
  schema?: ISchema
  run?: string
}

export interface ISchemaTransformerOptions extends ISchemaFieldFactoryOptions {
  required?: ISchema['required']
}

export type Stringify<P extends { [key: string]: any }> = {
  [key in keyof P]?: P[key] | string
}

export type ISchema<
  Decorator = any,
  Component = any,
  DecoratorProps = any,
  ComponentProps = any,
  Pattern = any,
  Display = any,
  Validator = any,
  Message = any,
  ReactionField = any
> = Stringify<{
  version?: string
  name?: SchemaKey
  title?: Message
  description?: Message
  default?: any
  readOnly?: boolean
  writeOnly?: boolean
  type?: SchemaTypes
  enum?: SchemaEnum<Message>
  const?: any
  multipleOf?: number
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  maxLength?: number
  minLength?: number
  pattern?: string | RegExp
  maxItems?: number
  minItems?: number
  uniqueItems?: boolean
  maxProperties?: number
  minProperties?: number
  required?: string[] | boolean | string
  format?: string
  /** nested json schema spec **/
  properties?: SchemaProperties<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >
  items?: SchemaItems<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >
  additionalItems?: ISchema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >
  patternProperties?: SchemaProperties<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >
  additionalProperties?: ISchema<
    Decorator,
    Component,
    DecoratorProps,
    ComponentProps,
    Pattern,
    Display,
    Validator,
    Message
  >

  //????????????
  ['x-index']?: number
  //????????????
  ['x-pattern']?: Pattern
  //????????????
  ['x-display']?: Display
  //?????????
  ['x-validator']?: Validator
  //?????????
  ['x-decorator']?: Decorator | (string & {})
  //???????????????
  ['x-decorator-props']?: DecoratorProps
  //??????
  ['x-component']?: Component | (string & {})
  //????????????
  ['x-component-props']?: ComponentProps
  //???????????????
  ['x-reactions']?: SchemaReactions<ReactionField>
  //??????
  ['x-content']?: any

  ['x-visible']?: boolean

  ['x-hidden']?: boolean

  ['x-disabled']?: boolean

  ['x-editable']?: boolean

  ['x-read-only']?: boolean

  ['x-read-pretty']?: boolean
}>
