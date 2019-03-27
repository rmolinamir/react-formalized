/**
 * Select, an input of type `text`, but similar to type `select`.
 */

interface ISelectProps {
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

interface ISelectState {
  identifier?: string
  shouldValidate?: boolean,
  value?: value
  displayValue?: value
  bIsListOpen?: boolean
}

interface ISelectValue {
  value: value
  displayValue: string | number
}

interface ISelectConfig {
  required?: boolean
  disabled?: boolean
  form?: string
  list?: string
  name?: string
  tabIndex?: number
}
