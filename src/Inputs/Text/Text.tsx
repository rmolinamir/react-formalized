import * as React from 'react'
// JSX
import Icon from '../../Icon/Icon'

const defaultConfig: IInputConfig = {
  autoComplete: 'on',
  autoCorrect: 'none',
  autoCapitalize: 'none',
  spellCheck: false
}

const text = (props: IInputElementProps): JSX.Element => {
  return (
    <React.Fragment>
      <input
        type={props.type}
        className={props.className} 
        {...{ 
          ...defaultConfig, 
          ...props.elementConfig 
        }}
        required={props.required}
        value={props.value}
        onChange={props.onChangeHandler}
        style={props.style} />
        {props.shouldValidate ?
          <Icon
            valid={props.valid || false}
            touched={props.touched || false} />
          : null}
    </React.Fragment>
  )
}

export default text
