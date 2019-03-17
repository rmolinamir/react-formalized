import * as React from 'react'
import * as ReactDOM from 'react-dom'
// CSS
import classes from './Password.module.css'
// JSX
import { Icon as LibraryIcon } from 'react-svg-library'
import Icon from '../../Icon/Icon'

const defaultConfig: IInputConfig = {
  autoComplete: 'none',
  autoCorrect: 'none',
  autoCapitalize: 'none',
}

const password = (props: IInputElementProps): JSX.Element => {
  const [bShowPassword, setShowPassword] = React.useState(false)

  const togglePassword = () => {
    setShowPassword(!bShowPassword)
  }

  const passwordIcon = (
    <LibraryIcon icon={bShowPassword ? 'show' : 'hide'} />
  )

  const utilContainerEl = document.getElementById('react-png-inputs-util-container')

  const passwordHandler = (
    <div className={[classes.Container, bShowPassword ? classes.Show : classes.Hide].join(' ')}>
      <button type="button"
        onClick={togglePassword}
        className={classes.Button} 
        aria-busy="false">{passwordIcon}<span style={{ marginLeft: '.5ch' }}>{bShowPassword ? 'Hide password' : 'Show password'}</span></button>
    </div>
  )

  return (
    <React.Fragment>
      <input
        type={bShowPassword ? 'text' : 'password'}
        className={props.className} 
        {...{ 
          ...defaultConfig, 
          ...props.elementConfig 
        }} 
        required={props.required}
        value={props.value}
        onChange={props.onChangeHandler} />
        {props.shouldValidate ?
          <Icon
            valid={props.valid || false}
            touched={props.touched || false} />
          : null}
        {props.passwordHandler || props.passwordHandlerClassName ? 
          utilContainerEl ? 
            ReactDOM.createPortal(passwordHandler,utilContainerEl) 
            : (
              <div className={classes.Wrapper}>
                {passwordHandler}
              </div>
            )
          : null}
    </React.Fragment>
  )
}

export default password
