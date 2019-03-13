import * as React from 'react'
// CSS
import classes from './Textarea.module.css'

const defaultConfig: IInputConfig = {
  autoComplete: 'off',
  autoCorrect: 'off',
  autoCapitalize: 'off',
}

const textarea = (props: IInputElementProps): JSX.Element => {
  return (
    <textarea
      type='text'
      className={[props.className, classes.TextAreaElement].join(' ')} 
      {...{ 
        ...defaultConfig, 
        ...props.elementConfig 
      }} 
      required={props.required}
      value={props.value}
      onChange={props.onChangeHandler} />
  )
}

export default textarea
