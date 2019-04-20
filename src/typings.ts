// Type definitions for React Formalized (react-formalized)
// Project: https://github.com/rmolinamir/react-formalized
// Definitions by: rmolinamir <https://github.com/rmolinamir>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.3.3333

/**
 * In TypeScript 2.8, the Exclude export type was added to the standard library, which allows an omission export type to be written as:
 * ```ts
 *  export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
 * ```
 * `https://stackoverflow.com/questions/48215950/exclude-property-from-type`.
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * `Input` element of `prop.type`(s):
 * 1. `text`.
 * 2. `textarea`.
 * 3. `email`.
 * 4. `password`.
 * 5. `select`.
 */

/**
 * HTML Input tag value type.
 */
export type value = string | number | string[] | undefined;

export interface IInputProps extends IInputState, Omit<IInputElementProps, 'onChange'> {
  type: string
  placeholder: string
  valueType: string
  className: string
  onChange: (identifier?: string, value?: value, valid?: boolean) => void
  /**
   * Theme context.
   */
  _context: IInputContext
  /**
   * Text area input.
   */
  minRows: number
  /**
   * Password element input.
   */
  passwordHandler?: string
  passwordHandlerClassName?: string
}

export interface IInputState {
  identifier?: string
  value?: value
  validationMessage: string
  className?: string
  valueType?: string
  validation?: IInputValidation
  style?: React.CSSProperties
  placeholder?: string
  elementConfig?: IInputConfig
  required?: boolean
  valid?: boolean
  shouldValidate?: boolean
  touched?: boolean
}

export interface ICustomRuleValidation {
  evaluation: (value: value) => boolean
  message?: string
}

export interface ICustomRulesValidation {
  [propName: string]: ICustomRuleValidation
}

export interface IInputValidation {
  customRules?: ICustomRulesValidation
  required?: boolean
  email?: boolean
  number?: boolean
  minLength?: number
  maxLength?: number
}

export interface IInputConfig {
  autoCapitalize?: string
  autoComplete?: string
  autoCorrect?: string
  autoFocus?: boolean
  autoSave?: string
  cols?: number
  disabled?: boolean
  form?: string
  list?: string
  maxLength?: number
  minLength?: number
  name?: string
  readOnly?: boolean
  rows?: number
  tabIndex?: number
  type?: string
  defaultValue?: string | string[]
  wrap?: string
  /**
   * Global HTML Props
   */
  spellCheck?: boolean
}

export interface IInputElementProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, HTMLInputElement | HTMLTextAreaElement> {
  elementConfig?: IInputConfig
  valid?: boolean
  shouldValidate?: boolean
  touched?: boolean
  style?: React.CSSProperties
  /**
   * Text area input.
   */
  minRows?: number
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  /**
   * Password element input.
   */
  passwordHandler?: string
  passwordHandlerClassName?: string
}

/**
 * Select, an input of export type `text`, but similar to export type `select`.
 */

export interface ISelectProps {
  shouldCloseListOnChange: boolean
  shouldValidate: boolean
  required: boolean
  placeholder: string
  value: value
  datalist: (value | ISelectValue)[]
  onChange: (identifier?: string, value?: value, valid?: boolean) => void
  elementConfig?: ISelectConfig
  identifier?: string
  disabled?: boolean
  style: React.CSSProperties
  /**
   * Theme context.
   */
  _context: IInputContext
}

export interface ISelectState {
  identifier?: string
  shouldValidate?: boolean,
  value?: value
  displayValue?: value
  bIsListOpen?: boolean
}

export interface ISelectValue {
  value: value
  displayValue: string | number
}

export interface ISelectConfig {
  required?: boolean
  disabled?: boolean
  form?: string
  list?: string
  name?: string
  tabIndex?: number
}

/**
 * Range, an input of export type `range`.
 */

/* Range value type. */
export type rangeValue = string | number | undefined;

export interface IRangeProps extends IInputConfig {
  indicator: boolean
  indicatorClassName: string
  step: string
  value: rangeValue
  minValue: rangeValue
  maxValue: rangeValue
  onChange: (value: rangeValue) => void
  /**
   * Theme context.
   */
  _context: IInputContext
}

/**
 * CheckboxGroup
 */

export interface ICheckboxGroupProps {
  children: React.ReactChild
  name?: string
  type?: string
  style?: React.CSSProperties
  className?: string
  required?: boolean
  single?: boolean
  multiple?: boolean
  onChange?: (identifier: string, value: value, valid: boolean) => void
}

/**
 * Checkbox
 */

export interface ICheckboxProps {
  label: string
  identifier?: string
  /**
   * Checkbox input props.
   */
  checked?: boolean
  type?: string
  name?: string
  disabled?: boolean
  multiple?: boolean
  single?: boolean
  inline?: boolean
  value?: value
  required?: boolean
  style?: React.CSSProperties
  className?: string
  onChange?: (identifier: string, checked: boolean, value: value) => void
  /**
   * CSS theme.
   */
  _context: IInputContext
}

export interface ICheckboxStyle {
  type: string
  body?: string
  icon?: JSX.Element | null
  name?: string
  label?: JSX.Element | string
  animation?: string
}

/**
 * Numeric, an input of export type `number` that handles natural numbers **only** (`integers`).
 */

export interface INumericProps {
  onChange?: (value: number) => void
  value?: number
  minValue?: number
  maxValue?: number
  style?: React.CSSProperties
  shouldNotType?: boolean
  /**
   * Theme context.
   */
  _context: IInputContext
}

/**
 * Context
 */

export interface ITheme {
  general: IThemeGeneral
  input: IThemeInput
  range: IThemeRange
  checkbox: IThemeCheckbox
}

/**
 * Provider
 */

export interface IProviderProps extends ITheme {
  children: React.ReactChildren
}

/**
 * General
 */

export interface IInputContext {
  theme: ITheme
  setTheme: (CSSProps: ITheme) => void
}

export interface IThemeGeneral {
  '--my-highlight-color': string
  '--my-icon-color': string
}

/**
 * Input.
 */
export interface IThemeInput {
  '--input-border-radius': string
  '--input-border-color': string
  '--input-background-color': string
  '--input-focused-color': string
  '--input-label-color': string
  '--input-valid-color': string
  '--input-invalid-color': string
}

/**
 * Range.
 */
export interface IThemeRange {
  '--range-progressbar-background-color': string
  '--range-indicator-background-color': string
  '--range-indicator-color': string
}

/**
 * Checkbox.
 */
export interface IThemeCheckbox {
  '--checkbox-color': string
  '--checkbox-hover-color': string
  '--checkbox-animation-duration': string
  '--checkbox-background-color': string
}

/**
 * Form
 */

export interface IFormProps {
  autoComplete?: string
  encType?: string
  method?: string
  noValidate?: boolean
  target?: string
  className?: string
  style?: React.CSSProperties
  onChange?: (state: IFormState) => void
  onSubmit?: (event: React.SyntheticEvent, state: IFormState) => void
  children: React.ReactElement[] | React.ReactElement
}

export interface IFormState {
  children?: React.ReactElement[] | React.ReactElement
  isValid?: boolean
  [inputName: string]: any
}