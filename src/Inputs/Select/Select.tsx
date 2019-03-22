import * as React from 'react'
const { useRef, useReducer, useEffect, useState } = React
import { withContext } from 'with-context-react'
import { isMobile } from '../isMobile'
// CSS
import classes from './Select.module.css'
// JSX
import { Context } from '../Context/Context'

/**
 * Overwriting interfaces for the select input.
 */

interface ISelectProps {
  shouldCloseListOnChange: boolean
  required: boolean
  elementConfig?: IInputConfig
  value: value
  datalist: (value | IValue)[]
  onChange: (value: value) => void
  /**
   * CSS Properties.
   */
  disabled?: boolean
  style: React.CSSProperties
  placeholder: string
  backgroundColor: string
  borderRadius: string
  color: string
  /**
   * Theme context.
   */
  _context: IInputContext
}

interface IInputState {
  value?: value
  displayValue?: value
  bIsListOpen?: boolean
}

interface IValue {
  value: value
  displayValue: string | number
}

interface IInputConfig {
  required?: boolean
  disabled?: boolean
  form?: string
  list?: string
  name?: string
  tabIndex?: number
}

interface IReducerAction extends IInputState {
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
 * `IValue` interface type checker.
 */
const instanceOfIValue = (object: any): object is IValue => {
  if (object && object.value) {
    return 'value' in object;
  } else {
    return false
  }
}

/**
 * Store reducer.
 */
const reducer = (state: IInputState, action: IReducerAction) => {
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

export const Select = withContext(React.memo((props: ISelectProps) => {
  const shouldCloseListOnChange: boolean = props.shouldCloseListOnChange || true

  const myWrapper:React.RefObject<HTMLFieldSetElement> = useRef(null)
  const myList:React.RefObject<HTMLUListElement> = useRef(null)
  const [bIsMobile] = useState(isMobile())

  const initialState: IInputState = {
    value: props.value,
    displayValue: props.value || '',
    bIsListOpen: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

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
   * Input `onChangeHandler`.
   */
  const onChangeHandler = () => {
    if (props.onChange) {
      props.onChange(state.value)
    }
  }

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
   * Apply classes depending if the list is opened or closed.
   */
  if (state.bIsListOpen) {
    wrapperClasses.push(classes.Open)
    listClasses.push(classes.Open)
    labelClasses.push(classes.ActiveLabel)
  } else if (state.value && state.value !== '' ? true : false) {
    labelClasses.push(classes.ActiveLabel)
  }

  /**
   * `list` JSX element rendered when the list is opened.
   */
  let list: JSX.Element[] | null = null
  if (props.datalist) {
    list = (
      props.datalist.map((option: (value | IValue), index: number) => {
        let data: (value | IValue);
        let displayValue: string | number | undefined = undefined
        if (instanceOfIValue(option)) {
          data = option
          displayValue = option.displayValue
        } else {
          data = option
        }
        return (
          <li key={index}>
            <button 
              type='button'
              onClick={() => setValueHandler(data)} 
              >
              {displayValue || data}
            </button>
          </li>
        )
      })
    )
  }

  /**
   * 
   */
  const setValueHandler = (data: (value | IValue)) => {
    if (instanceOfIValue(data)) {
      dispatch({
        handler: EReducerHandler.STATE,
        value: data.value,
        displayValue: data.displayValue || '' 
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
            onChange={onChangeHandler}
            style={props.style}
            value={state.displayValue}
            className={classes.Select}
            {...props.elementConfig}>
          </input>
          <label className={labelClasses.join(' ')}>{props.placeholder}</label>
        </div>
        <button
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
