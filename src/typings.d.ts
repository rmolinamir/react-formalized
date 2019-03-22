/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string;
  const svgComponent: SvgrComponent;
  export default svgUrl;
  export { svgComponent as ReactComponent }
}

declare module 'react-svg-library' {
  export const Icon: React.ReactType
  export const Underline: React.ReactType
}

/**
 * In TypeScript 2.8, the Exclude type was added to the standard library, which allows an omission type to be written as:
 * ```ts
 *  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
 * ```
 * `https://stackoverflow.com/questions/48215950/exclude-property-from-type`.
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

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
type value = string | number | string[] | undefined;

declare interface IInputProps extends IInputState, Omit<IInputElementProps, 'onChange'> {
  type: string
  placeholder: string
  valueType: string
  className: string
  onChange: (value: value, valid: boolean) => void
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

interface IInputState {
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

interface IInputValidation {
  required?: boolean
  email?: boolean
  number?: boolean
  minLength?: number
  maxLength?: number
}

interface IInputConfig {
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

interface IInputElementProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, HTMLInputElement | HTMLTextAreaElement> {
  elementConfig?: IInputConfig
  valid?: boolean
  shouldValidate?: boolean
  touched?: boolean
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
 * Slider, an input of type `range`.
 */

/* Slider value type. */
type sliderValue = string | number | undefined;

interface ISliderProps extends IInputConfig {
  backgroundColor: string
  progressBackgroundColor: string
  indicator: boolean
  indicatorClassName: string
  step: string
  value: sliderValue
  minValue: sliderValue
  maxValue: sliderValue
  onChange: (value: sliderValue) => void
  /**
   * Theme context.
   */
  _context: IInputContext
}

/**
 * CheckboxGroup
 */

interface ICheckboxGroupProps {
  children: React.ReactChild,
  name?: string,
  type?: string,
  style?: React.CSSProperties,
  className?: string,
  single?: boolean
}

/**
 * Numeric, an input of type `number` that handles natural numbers **only** (`integers`).
 */

interface INumericProps {
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
 * Context.
 */

interface ITheme {
  general: IThemeGeneral
  input: IThemeInput
  slider: IThemeSlider
  checkbox: IThemeCheckbox
}

/**
 * General
 */

declare interface IInputContext {
  theme: ITheme
  setTheme: (CSSProps: ITheme) => void
}

declare interface IThemeGeneral {
  '--my-highlight-color': string
  '--my-icon-color': string
}

/**
 * Input.
 */
declare interface IThemeInput {
  '--input-border-radius': string
  '--input-border-color': string
  '--input-background-color': string
  '--input-focused-color': string
  '--input-label-color': string
  '--input-valid-color': string
  '--input-invalid-color': string
}

/**
 * Slider.
 */
declare interface IThemeSlider {
  '--slider-progressbar-background-color': string
  '--slider-indicator-background-color': string
  '--slider-indicator-color': string
}

/**
 * Checkbox.
 */
declare interface IThemeCheckbox {
  '--checkbox-color': string
  '--checkbox-hover-color': string
  '--checkbox-animation-duration': string
  '--checkbox-background-color': string
}