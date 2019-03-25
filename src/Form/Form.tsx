import * as React from 'react'

interface IInputState {
  value: value
  bIsInputValid: boolean
  shouldValidate: boolean
}

interface IReducerAction {
  identifier: string
  state: IInputState
  isValid: boolean
}

const reducer = (state: IFormState, action: IReducerAction) => {
  const { ...newState } = action
  state = {
    ...state,
    isValid: newState.isValid,
    [newState.identifier]: {
      ...state[newState.identifier],
      ...newState.state
    }
  }
  return state
}

/**
 * Building the initial state, based on the inputs used inside the form (e.g. `Input`, or `Select`).
 * This is so that the form will be able to run validations.
 */
const initialState = (props: IFormProps): IFormState => {
  let initialState: IFormState = {}

  React.Children.forEach(props.children, child => {
    if (typeof child.type === 'function' && React.isValidElement(child)) {
      const RFC_Child: React.FunctionComponent = child.type as React.FunctionComponent
      const displayName = RFC_Child.displayName
      /**
       * `Input` JSX Element.
       */
      if (displayName === 'react-png-input/input') {
        const childProps: IInputProps = child.props as IInputProps
        const identifier: string = childProps.identifier || `${displayName}_${childProps.placeholder || childProps.type || 'default'}`

        initialState[identifier] = {
          value: childProps.value || '',
          bIsInputValid:  childProps.valid || false,
          shouldValidate:  childProps.validation || childProps.required ? true : false
        } as IInputState
      /**
       * `Select` JSX Element.
       */
      } else if (displayName === 'react-png-input/select') {
        const childProps: ISelectProps = child.props as ISelectProps
        const identifier: string = childProps.identifier || `${displayName}_${childProps.placeholder || 'select'}`

        initialState[identifier] = {
          value: childProps.value || '',
          bIsInputValid:  childProps.value && childProps.value !== '' ? true : false,
          shouldValidate:  childProps.shouldValidate || childProps.required || false
        } as IInputState
      } else if (displayName === 'react-png-input/checkboxgroup') {
        const childProps: ICheckboxGroupProps = child.props as ICheckboxGroupProps
        const identifier: string = childProps.name || `${displayName}_${childProps.type || 'checkbox'}`

        initialState[identifier] = {
          shouldValidate:  childProps.required || true
        } as IInputState
      }
    }
  })

  return initialState
}

export const Form = React.memo((props: IFormProps): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState(props))
  const { onChange, onSubmit, children } = props

  /**
   * `onChangeHandler` is executed whenever any of the input elements' value changes.
   * It will run validations if the inputs should validate then update the state accordingly.
   */
  const onChangeHandler = (identifier: string, value: value, bIsInputValid: boolean) => {
    const inputState = {
      value: value,
      bIsInputValid: bIsInputValid
    } as IInputState
    /**
     * Deconstructing `state` to check for form isValidity and update the
     * respective input.
     */
    const { isValid, ...inputs} = state
    /**
     * Action object for the reducer.
     */
    const action: IReducerAction = {
      identifier: identifier,
      state: inputState,
      isValid: isValid || false
    }
    /**
     * Updating the respective input state, to update the form isValidity.
     */
    inputs[identifier] = {
      ...inputs[identifier],
      ...inputState
    }
    /**
     * Looping through the form inputs to check if all of them are isValid.
     * If all are isValid, then then the `isValid` state property will be `true`,
     * otherwise it's `false`.
     */
    for (let inputIdentifier in inputs) {
      const input = inputs[inputIdentifier] as IInputState
      if (input && input.shouldValidate && !input.bIsInputValid) {
        action.isValid = false
        break // Improve loop efficiency.
      } else {
        action.isValid = true
      }
    }
    dispatch({ ...action })
  }

  /**
   * `onSubmitHandler` callback whenever the submit event from the form fires.
   * Sends the event, and the form state.
   */
  const onSubmitHandler = (event: React.SyntheticEvent) => {
    if (onSubmit) {
      onSubmit(event, state)
    }
  }

  /**
   * Subscribed to any changes in the state. Will execute `onChange` callback prop if it exists.
   */
  React.useEffect(() => {
    if (onChange) {
      onChange(state)
    }
  }, [state])

  /**
   * Cloning children to pass props in scale. Will only pass props to elements who's `displayName`
   * property is equal to `react-png-input/input`. This is so that the props will be passed as 
   * intented. Otherwise it will simply return the child without any changes.
   */
  const childrenWithProps = React.Children.map(children, child => {
    if (typeof child.type === 'function' && React.isValidElement(child)) {
      const RFC_Child: React.FunctionComponent = child.type as React.FunctionComponent
      const displayName = RFC_Child.displayName
      switch (displayName) {
        case 'react-png-input/input':
        case 'react-png-input/select':
        case 'react-png-input/checkboxgroup':
          return React.cloneElement(
            child as React.ReactElement<any>, 
            {
              onChange: onChangeHandler
            }
          )
        default:
          return child
      }
    } else {
      return child
    }
  })

  return (
    <form
      style={props.style}
      className={props.className}
      onSubmit={onSubmitHandler}>
      {childrenWithProps}
    </form>
  )
})
