/**
 * CheckboxGroup
 */

interface ICheckboxGroupProps {
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

interface ICheckboxProps {
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

interface ICheckboxStyle {
  type: string
  body?: string
  icon?: JSX.Element | null
  name?: string
  label?: JSX.Element | string
  animation?: string
}