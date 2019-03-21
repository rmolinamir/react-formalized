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
 * HTML Input tag value type.
 */
type value = string | number | string[] | undefined;

interface IInputValidation {
  required?: boolean
  email?: boolean
  number?: boolean
  minLength?: number
  maxLength?: number
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

declare interface IInputProps extends IInputState, Omit<IInputElementProps, 'onChange'> {
  type: string
  placeholder: string
  valueType: string
  className: string
  onChange: (value: value, valid: boolean) => void
  /**
   * Theme context.
   */
  _context: ITheme
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
  onChange: (value: sliderValue, valid: boolean) => void
  /**
   * Theme context.
   */
  _context: ITheme
}

/**
 * Context.
 */

interface ITheme {
  /**
   * General
   */
  '--my-highlight-color': string,
  '--my-icon-color': string,
  /**
   * Input.
   */
  '--input-border-radius': string,
  '--input-border-color': string,
  '--input-background-color': string,
  '--input-focused-color': string,
  '--input-label-color': string,
  '--input-valid-color': string,
  '--input-invalid-color': string,
  /**
   * Slider.
   */
  '--slider-progressbar-background-color': string,
  '--slider-indicator-background-color': string,
  '--slider-indicator-color': string,
  /**
   * Checkbox.
   */
  '--checkbox-color': string,
  '--checkbox-hover-color': string,
  '--checkbox-animation-duration': string,
  '--checkbox-background-color': string
  /**
   * WithProvider properties.
   */
  theme?: ITheme
  setTheme?: (CSSProps: ITheme) => void
}

interface IContext {
  theme: ITheme
  setTheme: (CSSProps: ITheme) => void
}