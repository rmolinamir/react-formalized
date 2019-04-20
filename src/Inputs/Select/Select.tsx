import * as React from 'react'
const { useRef, useReducer, useEffect, useState } = React
import { withContext } from 'with-context-react'
import { isMobile } from '../isMobile'
// Types
import {
  value,
  IInputProps,
  ISelectState,
  ISelectProps,
  ISelectValue
} from '../../typings'
// CSS
import classes from './Select.module.css'
// JSX
import { Context } from '../Context/Context'
import Icon from '../../Icon/Icon'

interface IReducerAction extends ISelectState {
  handler: EReducerHandler
}

/**
 * Reducer handlers for the `switch` statement.
 */
enum EReducerHandler {
  VALUE,
  DISPLAYVALUE,
  LIST,
  STATE
}

/**
 * `ISelectValue` interface type checker.
 */
const instanceOfISelectValue = (object: any): object is ISelectValue => {
  if (object && object.value) {
    return 'value' in object
  } else if (object && object.displayValue) {
    return 'displayValue' in object
  } else {
    return false
  }
}

/**
 * Store reducer.
 */
const reducer = (state: ISelectState, action: IReducerAction) => {
  const { handler, ...newState } = action
  switch (handler) {
    case EReducerHandler.STATE:
      return {
        ...state,
        ...newState
      }
    case EReducerHandler.VALUE:
      return {
        ...state,
        value: action.value
      }
    case EReducerHandler.DISPLAYVALUE:
      return {
        ...state,
        displayValue: action.displayValue
      }
    case EReducerHandler.LIST:
      return {
        ...state,
        bIsListOpen: action.bIsListOpen
      }
    default:
      throw new Error()
  }
}

const displayName:string = 'react-png-input/select'

const MySelect = withContext(React.memo((props: ISelectProps) => {
  const shouldCloseListOnChange: boolean = props.shouldCloseListOnChange || true

  const myWrapper:React.RefObject<HTMLFieldSetElement> = useRef(null)
  const myList:React.RefObject<HTMLUListElement> = useRef(null)
  const [bIsMobile] = useState(isMobile())

  const initialState: ISelectState = {
    identifier: props.identifier || (`${displayName}_${props.placeholder || 'select'}`),
    shouldValidate: props.shouldValidate || props.required || false,
    value: props.value || '',
    displayValue: props.value || '',
    bIsListOpen: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  
  const bIsValid = state.value && state.value !== '' ? true : false

  /**
   * `onClickListHandler` opens or closes the list.
   */
  const onClickListHandler = () => {
    if (state.bIsListOpen) {
      dispatch({ handler: EReducerHandler.LIST, bIsListOpen: false })
      if (myList && myList.current) {
        myList.current.blur()
      }
    } else {
      dispatch({ handler: EReducerHandler.LIST, bIsListOpen: true })
      if (myList && myList.current) {
        myList.current.focus()
      }
    }
  }

  /**
   * `onOutsideClickHandler` will close the list if the click was made outside
   * the component wrapper div element.
   */
  const onOutsideClickHandler = (event: MouseEvent) => {
    if (state.bIsListOpen && myWrapper && myWrapper.current) {
      const bClickedIsOutside:boolean = !myWrapper.current.contains((event.target as Node))
      if (bClickedIsOutside) onClickListHandler()
    }
  }

  /**
   * If not on mobile, a keyboard event listener will execute `escFunction`.
   * If the pressed key is the ESC key, then close the list.
   */
  const escFunction = (event: KeyboardEvent) => {
    if (event.keyCode === 27 && state.bIsListOpen) {
      dispatch({ handler: EReducerHandler.LIST, bIsListOpen: false })
      if (myList && myList.current) {
        myList.current.blur()
      }
    }
  }

  /**
   * Input `onChangeHandler`, subscribed to any changes made to `state.value`.
   */
  const onChangeHandler = () => {
    const bIsValid = state.value && state.value !== '' ? true : false
    if (props.onChange) {
      props.onChange(state.identifier, state.value, bIsValid)
    }
  }

  /**
   * Execute `onChange` if `state.value` changes. 
   */
  useEffect(() => {
    onChangeHandler()
  }, [state.value])

  /**
   * Respective event listener handler on `useEffect`.
   */
  useEffect(() => {
    /**
     * If not on mobile, and if the list is open, apply the keyboard
     * event listener that executes `escFunction`.
     */
    if (!bIsMobile) {
      if (state.bIsListOpen) {
        window.addEventListener('keydown', escFunction)
      } else {
        window.removeEventListener('keydown', escFunction)
      }
    }
    /**
     * Apply the mouse event listener that executes `onOutsideClickHandler`.
     */
    window.addEventListener('mousedown', onOutsideClickHandler)
    return (() => {
      /**
       * Remove respective event listeners when unmounted.
       */
      if (!bIsMobile) window.removeEventListener('keydown', escFunction)
      window.removeEventListener('mousedown', onOutsideClickHandler)
    })
  }, [state.bIsListOpen])

  const wrapperClasses: string[] = [classes.Wrapper]
  const listClasses: string[] = [classes.List]
  const labelClasses: string[] = [classes.Label]

  /**
   * Apply CSS classes depending if the list is opened or closed.
   */
  if (state.bIsListOpen) {
    wrapperClasses.push(classes.Open)
    listClasses.push(classes.Open)
    labelClasses.push(classes.ActiveLabel)
  } else if (bIsValid) {
    labelClasses.push(classes.ActiveLabel)
  }

  /**
   * `list` JSX element rendered when the list is opened.
   */
  let list: JSX.Element[] | null = null
  if (props.datalist) {
    list = (
      props.datalist.map((option: (value | ISelectValue), index: number) => {
        let data: (value | ISelectValue);
        let displayValue: string | number | undefined = undefined
        if (instanceOfISelectValue(option)) {
          data = option
          displayValue = option.displayValue
        } else {
          data = option
        }
        return (
          <li key={index}>
            <button
              type='button'
              onClick={() => setValueHandler(data)} >
              {
                String(displayValue).toLowerCase() === 'none' ? (
                  <em>{displayValue || data}</em>
                ) : displayValue || data
              }
            </button>
          </li>
        )
      })
    )
  }

  /**
   * `setValueHandler` will set the selected value, respectively to the type. If the value is of type
   * `ISelectValue` then the `value` and `displayValue` will be set accordingly, otherwise they will be the
   * same. Closes the input afterwards if `shouldCloseListOnChange` is `true`, which it is by default.
   */
  const setValueHandler = (data: (value | ISelectValue)) => {
    if (instanceOfISelectValue(data)) {
      dispatch({
        handler: EReducerHandler.STATE,
        value: data.value,
        displayValue: (data.value && data.displayValue) || ''
      })
    } else {
      dispatch({
        handler: EReducerHandler.STATE,
        value: data,
        displayValue: data
      })
    }
    if (shouldCloseListOnChange) {
      onClickListHandler()
    }
  }

  let CSSVariables
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

  /**
   * Apply respective CSS classes if the input is valid.
   */
  if (state.shouldValidate && bIsValid) {
    wrapperClasses.push(classes.Valid)
  }

  return (
    <fieldset
      disabled={props.disabled}
      ref={myWrapper}
      className={wrapperClasses.join(' ')}
      style={{
        ...CSSVariables,
        cursor: props.disabled ? 'not-allowed' : undefined,
        userSelect: props.disabled ? 'none' : undefined
      }}>
      <div
        style={props.disabled ? { opacity: 0.5, pointerEvents: 'none' } : undefined}
        className={classes.Container}>
        <div
            onClick={onClickListHandler}
            className={classes.Input}>
          <input
            tabIndex={-1}
            readOnly
            required={props.required}
            value={state.displayValue}
            className={classes.Select}
            {...props.elementConfig}>
          </input>
          {state.shouldValidate ?
            <Icon
              valid={bIsValid}
              // The icon hides if the list opens, otherwise only show if the state isn't empty/undefined.
              touched={state.bIsListOpen ? false : Boolean(state.value) && state.value !== ''} />
            : null}
          <label className={labelClasses.join(' ')}>{props.placeholder}</label>
        </div>
        <button
          type='button'
          onClick={onClickListHandler}
          className={classes.Button}>
          <div className={classes.Icon}>
            <span className={classes.Arrow} />
          </div>
        </button>
      </div>
      <ul ref={myList} className={listClasses.join(' ')}>
        {state.bIsListOpen ? 
          list
        : null}
      </ul>
    </fieldset>
  )
}), Context)

export const Select = (props: IInputProps): JSX.Element => <MySelect {...props} />
(Select as React.FunctionComponent).displayName = displayName
