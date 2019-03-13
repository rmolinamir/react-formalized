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

interface IInputValidation {
  required?: boolean
  email?: boolean
  number?: boolean
  minLength?: number
  maxLength?: number
}

interface IInputState {
  value: any
  validationMessage: string
  className?: string
  valueType?: string
  validation?: IInputValidation
  style?: React.CSSProperties
  placeholder?: string
  elementConfig?: IInputConfig
  required?: boolean
  valid: boolean
  shouldValidate?: boolean
  touched?: boolean
}

interface IInputProps extends IInputState {
  type: string
  placeholder: string
  valueType: string
  onChange: (value: any, valid: boolean) => void
}

interface IInputConfig {
  autoCapitalize?: string
  autoComplete?: string
  autoCorrect?: string
  autoFocus?: boolean
  autoSave?: string
  disabled?: boolean
  form?: string
  list?: string
  name?: string
  readOnly?: boolean
  tabIndex?: number
  type?: string
  defaultValue?: string | string[]
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
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}