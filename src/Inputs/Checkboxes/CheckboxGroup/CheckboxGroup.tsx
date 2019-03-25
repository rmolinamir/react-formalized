import * as React from 'react'
// CSS
import classes from './CheckboxGroup.module.css'

interface ICheckboxGroupState {
  isValid: boolean
  [labelName: string]: any
}

interface ICheckBoxValue {
  checked: boolean,
  value: value
}

interface IReducerAction {
  identifier: string
  state: ICheckBoxValue
  isValid: boolean
}

const reducer = (state: ICheckboxGroupState, action: IReducerAction) => {
  const { ...updatedCheckbox } = action
  state = {
    ...state,
    isValid: updatedCheckbox.isValid,
    [updatedCheckbox.identifier]: updatedCheckbox.state
  }
  return state
}

/**
 * `CheckboxGroup` copies the same props passed to it to any of its children.
 * Should be used only for the `Checkbox` functional component.
 * Copies and passes the following props:
 *  1. `name`,
 *  2. `type`,
 *  3. `style`,
 *  4. `className`,
 *  5. `single`,
 *  6. `required`.
 */
const MyCheckboxGroup = React.memo((props: ICheckboxGroupProps): JSX.Element => {
  const { children, name, type, style, className, single, multiple, required } = props
  const [state, dispatch] = React.useReducer(reducer, { isValid: required || true })
  const myWrapper:React.RefObject<HTMLFieldSetElement> = React.useRef(null)

  const onChangeHandler = (identifier: string, checked: boolean, value: value) => {
    let bIsValid: boolean
    if (myWrapper && myWrapper.current) {
      bIsValid = required ? Boolean(myWrapper.current.querySelectorAll('input:checked').length) : true
    } else {
      bIsValid = state.isValid
    }
    /**
     * The checkbox value is composed by the checked status of the respective checkbox input and its
     * input value if it exists. These checkbox values are identified by their identifier `props` or
     * by their default identifier variables.
     */
    const checkboxValue: ICheckBoxValue = {
      checked: checked,
      value: value
    }
    /**
     * Action object for the reducer.
     */
    const action: IReducerAction = {
      identifier: identifier,
      state: checkboxValue,
      isValid: bIsValid
    }
    dispatch({ ...action })
  }

  /**
   * Subscribe to any changes made to the `state.isValid` property.
   * Execute `onChange` if it exists. 
   */
  React.useEffect(() => {
    if (props.onChange) {
      const {isValid, ...checkboxes } = state
      props.onChange(name || `${displayName}_${type || 'checkbox'}`, checkboxes as any, isValid)
    }
  }, [state])

  /**
   * Cloning children to pass props in scale. Will only pass props to elements who's `displayName`
   * property is equal to `react-png-input/checkbox`. This is so that the props will be passed as 
   * intented. Otherwise it will simply return the child without any changes.
   */
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const RFC_Child: React.FunctionComponent = child.type as React.FunctionComponent
      const displayName = RFC_Child.displayName
      if (displayName === 'react-png-input/checkbox') {
        return React.cloneElement(
          child as React.ReactElement<any>, 
          {
            type: type,
            name: name,
            single: single || false,
            multiple: multiple || false,
            required: !state.isValid,
            style: style,
            className: className,
            onChange: onChangeHandler
          }
        )
      } else {
        return null
      }
    } else {
      return null
    }
  })

  return (
    <fieldset
      ref={myWrapper}
      className={[
        classes.Wrapper,
        String(type).toLowerCase() === 'bubble' && classes.BlockWrapper
      ].join(' ')}>
      {childrenWithProps}
    </fieldset>
  )
})

const displayName:string = 'react-png-input/checkboxgroup'

export const CheckboxGroup = (props: ICheckboxGroupProps): JSX.Element => <MyCheckboxGroup {...props} />
(CheckboxGroup as React.FunctionComponent).displayName = displayName
