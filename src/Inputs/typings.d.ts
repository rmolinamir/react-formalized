/**
 * HTML Input tag value type.
 */
type value = string | number | string[] | undefined;

interface IInputProps extends IInputState, Omit<IInputElementProps, 'onChange'> {
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

interface IInputState {
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

interface ICustomRuleValidation {
  evaluation: (value: value) => boolean
  message?: string
}

interface ICustomRulesValidation {
  [propName: string]: ICustomRuleValidation
}

interface IInputValidation {
  customRules?: ICustomRulesValidation
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
