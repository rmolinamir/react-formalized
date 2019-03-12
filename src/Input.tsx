import * as React from 'react'
import { checkValidity } from './checkValidity'
// CSS
import classes from './Input.module.css'
// JSX
import Text from './Inputs/Text/Text'

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
    valueType: props.valueType || props.placeholder ? props.placeholder.toLowerCase() : 'text',
    placeholder: props.placeholder || 'Text',
    validation: {
      required: props.required || true,
      ...props.validation
    },
    required: props.required || true,
    shouldValidate: props.shouldValidate || true,
    valid: props.valid || false,
    touched: props.touched || false
  }
  
  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log('props', props)
  console.log('state', state)

  let validationMessage:JSX.Element | null = null

  const labelClasses: string[] = [classes.Label]
  const inputClasses: string[] = [classes.InputElement]

  if (!state.valid && state.shouldValidate && state.touched) {
    inputClasses.push(classes.Invalid)
    validationMessage = <p className={[classes.Feedback, classes.InvalidFeedback].join(' ')}>{state.validationMessage}</p>
  } else if (state.valid && state.shouldValidate && state.touched) {
    inputClasses.push(classes.Valid)
    validationMessage = <p className={[classes.Feedback, classes.ValidFeedback].join(' ')}>Looks good!</p>
  }

  if (state.value && state.value !== '') {
    labelClasses.push(classes.ActiveLabel)
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
      validationMessage: validation.message,
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

  const inputElement = (
    <React.Suspense fallback={null}>
      <Text 
        className={inputClasses.join(' ')} 
        // style={props.elementConfig.disabled ? { cursor: 'not-allowed' } : null}
        elementConfig={props.elementConfig} 
        value={props.value}
        required={props.required || true}
        valid={props.valid || false}
        onChange={onChangeHandler} />
    </React.Suspense>
  )
  return (
      <div style={props.style}
          className={classes.Input}>
          {inputElement}
          {validationMessage}
          <span className={classes.Bar}></span>
          <label className={labelClasses.join(' ')}>{props.placeholder}</label>
      </div>
  )
}
