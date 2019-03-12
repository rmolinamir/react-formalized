import * as React from 'react'
// CSS
import classes from './Text.module.css'

export const Input = (props: any) => {
  let inputElement
  let validationMessage = null
  const inputClasses = [classes.InputElement]
  const labelClasses = [classes.Label]
  if (props.invalid && props.shouldValidate && props.touched) {
      inputClasses.push(classes.Invalid)
      validationMessage = <p className={classes.InvalidFeedback}>Please enter a valid {props.valueType}.</p>
  } else if (!props.invalid && props.shouldValidate && props.touched) {
      inputClasses.push(classes.Valid)
      validationMessage = <p className={classes.ValidFeedback}>Looks good!</p>
  }
  switch (props.elementType) {
      case('input' || 'text' || 'email' || 'number'):
          inputElement = <input 
              className={inputClasses.join(' ')} 
              // style={props.elementConfig.disabled ? { cursor: 'not-allowed' } : null}
              {...props.elementConfig} 
              required
              value={props.value}
              onChange={props.changed}
              />
          break
      case('textarea'):
          labelClasses.push(classes.TextAreaLabel)
          inputClasses.push(classes.TextAreaElement)
          inputElement = <textarea 
              className={inputClasses.join(' ')} 
              // style={props.elementConfig.disabled ? { cursor: 'not-allowed' } : null}
              {...props.elementConfig} 
              required
              value={props.value}
              onChange={props.changed}
              />
          break
  }
  return (
      <div style={props.style}
          className={classes.Input}>
          {inputElement}
          {validationMessage}
          {props.elementType === 'select' ? 
              null :
              <>
                  <span className={classes.Bar}></span>
                  <label className={labelClasses.join(' ')}>{props.elementConfig.placeholder}</label>
              </>
          }
      </div>
  )
}
