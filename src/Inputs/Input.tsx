import * as React from 'react'
import { checkValidity } from './checkValidity'
// CSS
import classes from './Input.module.css'
// JSX
import Text from './Text/Text'
// import Email from './Email/Email'
import Password from './Password/Password'
import Textarea from './Textarea/Textarea'

interface IReducerAction extends IInputState {
  handler: EOnChangeHandler
  valid: boolean
}

export enum EOnChangeHandler {
  VALUE,
  VALID,
  TOUCHED,
  STATE
}

const reducer = (state: IInputState, action: IReducerAction) => {
  const { handler, ...newState } = action
  switch (handler) {
    case EOnChangeHandler.STATE:
      return {
        ...state,
        ...newState
      }
    case EOnChangeHandler.TOUCHED:
      state.touched = newState.touched
      return state
    case EOnChangeHandler.VALID:
      state.valid = newState.valid
      return state
    case EOnChangeHandler.VALUE:
      state.value = newState.value
      return state
    default:
      throw new Error()
  }
}

export const Input = (props: IInputProps) => {
  const initialState: IInputState = {
    value: props.value || '',
    validationMessage: '',
    valueType: props.valueType || props.placeholder ? props.placeholder.toLowerCase() : undefined,
    placeholder: props.placeholder,
    validation: {
      required: props.required || false,
      email: props.type === 'email' ? true : false, 
      ...props.validation
    },
    required: props.required || true,
    shouldValidate: props.validation ? true : false,
    valid: props.valid || false,
    touched: props.touched || false
  }
  
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const wrapperClasses: string[] = [props.className || classes.Aesthetics, classes.Wrapper]
  const inputClasses: string[] = [classes.InputElement]
  const labelClasses: string[] = [classes.Label]
  const validationMessageClasses:string[] = [classes.Feedback]

  if (!state.valid && state.shouldValidate && state.touched) {
    inputClasses.push(classes.Invalid)
    validationMessageClasses.push(classes.InvalidFeedback)
  } else if (state.valid && state.shouldValidate && state.touched) {
    inputClasses.push(classes.Valid)
    validationMessageClasses.push(classes.ValidFeedback)
  }

  if (state.touched) {
    labelClasses.push(classes.ActiveLabel)
  } else {
    validationMessageClasses.push(classes.ValidFeedback)
  }
  
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const updatedOrderForm = {
    //  ...this.state.controls,
    // };
    // const updatedFormElement = {
    //  ...updatedOrderForm[inputIdentifier]
    // };
    const value = event.target.value
    const validation = checkValidity(value, state.validation, state.valueType || '')
    const action: IReducerAction = {
      valid: validation.status,
      validationMessage: validation.message || state.validationMessage,
      handler: EOnChangeHandler.STATE,
      value: value,
      touched: value && value !== '' ? true : false
    }
    // for (let inputIdentifier in updatedOrderForm) {
    //  formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    // }
    // this.setState({
    //  controls: updatedOrderForm, 
    //  formIsValid: formIsValid
    // });
    dispatch({ handler: EOnChangeHandler.STATE, ...action })
    if (props.onChange) {
      props.onChange(action.value, action.valid)
    }
  }

  const inputProps: IInputElementProps = {
    className: inputClasses.join(' '),
    elementConfig: props.elementConfig,
    required: props.required || true,
    value: state.value,
    valid: state.valid,
    touched: state.touched,
    shouldValidate: state.shouldValidate,
    onChangeHandler: onChangeHandler
    // style={props.elementConfig.disabled ? { cursor: 'not-allowed' } : null}
  }

  let element: JSX.Element
  if (props.type) {
    const type: string = props.type.toLowerCase()
    switch (type) {
      case 'text' || 'email': 
        element = <Text {...inputProps} />
        break
      case 'password':
        element = (
          <Password
            passwordHandler={props.passwordHandler}
            passwordHandlerClassName={props.passwordHandlerClassName}
            {...inputProps} />
        )
        break
      case 'textarea':
        wrapperClasses.push(classes.TextAreaInput)
        labelClasses.push(classes.TextAreaLabel)
        element = <Textarea {...inputProps} />
        break
      default:
        console.warn('No prop types match your query, this results in a fallback to the Text input.')
        element = <Text {...inputProps} />
        break
    }
  } else {
    element = <Text {...inputProps} />
  }

  const inputElement = (
    <React.Suspense fallback={null}>
      {element}
    </React.Suspense>
  )

  return (
      <fieldset style={props.style}
          className={wrapperClasses.join(' ')}>
          <div className={classes.Container}>
            {inputElement}
            <span className={classes.Bar}></span>
            <label className={labelClasses.join(' ')}>{props.placeholder}</label>
          </div>
          {props.validation ? (
            <div className={validationMessageClasses.join(' ')}>{state.validationMessage}</div>
          ) 
          : null}
      </fieldset>
  )
}
