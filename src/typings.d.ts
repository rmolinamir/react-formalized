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

interface IInputProps extends IInputState {
  type: string
  placeholder: string
  valueType: string
  onChange: (value: any, valid: boolean) => {}
}

interface IInputConfig {
  autoCapitalize: string | undefined
  autoComplete: string | undefined
  autoCorrect: string | undefined
  autoFocus: boolean | undefined
  autoSave: string | undefined
  disabled: boolean | undefined
  form: string | undefined
  list: string | undefined
  name: string | undefined
  readOnly: boolean | undefined
  required: boolean | undefined
  tabIndex: number | undefined
  type: string | undefined
  defaultValue: string | string[] | undefined
  value: string | number | string[] | undefined
}