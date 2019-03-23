import * as React from 'react'
import { checkValidity } from './checkValidity'
import { withContext } from 'with-context-react'
// CSS
import classes from './Input.module.css'
// JSX
import { Context } from './Context/Context'
import Text from './Text/Text'
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

const MyInput = withContext(React.memo((props: IInputProps) => {
  /**
   * Input initial state, which dictates how it will behave (validation, validity, required, etc.).
   */
  const initialState: IInputState = {
    value: props.value || '',
    validationMessage: '',
    valueType: props.valueType || props.placeholder && props.placeholder.toLowerCase(),
    placeholder: props.placeholder,
    validation: {
      required: props.required || false,
      email: props.type === 'email' && true, 
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

  /**
   * `className` handler for different elements, depending if the input is `valid`, 
   * `invalid`, if it's `touched` and if it `shouldValidate`.
   */
  if (!state.valid && state.shouldValidate && state.touched) {
    inputClasses.push(classes.Invalid)
    validationMessageClasses.push(classes.InvalidFeedback)
  } else if (state.valid && state.shouldValidate && state.touched) {
    inputClasses.push(classes.Valid)
    validationMessageClasses.push(classes.ValidFeedback)
  }

  /**
   * If `touched` then the label will become active.
   */
  if (state.touched) {
    labelClasses.push(classes.ActiveLabel)
  } else {
    validationMessageClasses.push(classes.ValidFeedback)
  }
  
  /**
   * `onChangeHandler` handles the input `onChange` event.
   * Evaluates de validity of the value respective to how it's set up through `checkValidity`.
   * Executes the `props.onChange` callback if it exists after evaluating the value and saving it in the state.
   */
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const validation = checkValidity(value, state.validation, state.valueType)
    const action: IReducerAction = {
      valid: validation.status,
      validationMessage: validation.message || state.validationMessage,
      handler: EOnChangeHandler.STATE,
      value: value,
      touched: value && value !== '' ? true : false
    }
    dispatch({ handler: EOnChangeHandler.STATE, ...action })
    if (props.onChange) {
      props.onChange(action.value, action.valid)
    }
  }

  /**
   * The input element configuration props.
   */
  const inputProps: IInputElementProps = {
    className: inputClasses.join(' '),
    elementConfig: props.elementConfig,
    required: props.required || true,
    value: state.value,
    valid: state.valid,
    touched: state.touched,
    shouldValidate: state.shouldValidate,
    onChangeHandler: onChangeHandler,
    style: props.disabled ? { opacity: 0.5, pointerEvents: 'none' } : undefined
  }

  let element: JSX.Element

  /**
   * This switch statement sets up the respective Input type, depending on `prop.type`.
   * Respective properties are also passed down as props, as well as respective classes.
   * **NOTE:** if the type does not matches any of the available inputs, a `console.warn`
   * will trigger.
   */
  const type: string = props.type ? props.type.toLowerCase() : ''
  switch (type) {
    case 'text': 
    case 'email':
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
      element = (
        <Textarea
          minRows={props.minRows}
          {...inputProps} />
      )
      break
    default:
      if (type) {
        console.warn('No prop types match your query, this results in a fallback to the Text input.')
      }
      element = <Text {...inputProps} />
      break
  }

  /**
   * The input is lazy loaded, hence the `React.Suspense`.
   */
  const inputElement: JSX.Element = (
    <React.Suspense fallback={null}>
      {element}
    </React.Suspense>
  )

  let CSSVariables;
  /**
   * The CSS Variables will be stored in the `.theme` key if
   * a provider is invoked.
   */
  if (props._context && props._context.theme) {
    CSSVariables = {
      ...props._context.theme.general,
      ...props._context.theme.input
    } as React.CSSProperties
  }

  return (
    <fieldset
      disabled={props.disabled}
      style={{
        ...props.style,
        ...CSSVariables,
        cursor: props.disabled ? 'not-allowed' : undefined,
        userSelect: props.disabled ? 'none' : undefined
      }}
      className={wrapperClasses.join(' ')}>
      <div
        className={classes.Container}>
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
}), Context)

export const Input = (props: IInputProps): JSX.Element => <MyInput {...props} />
(Input as React.FunctionComponent).displayName = 'react-png-input/input'
