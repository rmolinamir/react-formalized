/**
 * Form
 */

interface IFormProps {
  children: React.ReactElement[] | React.ReactElement
  onChange: (state: IFormState) => void
  onSubmit: (event: React.SyntheticEvent, state: IFormState) => void
  className?: string
  style?: React.CSSProperties
}

interface IFormState {
  children?: React.ReactElement[] | React.ReactElement
  isValid?: boolean
  [inputName: string]: any
}