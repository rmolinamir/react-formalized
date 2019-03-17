import * as React from 'react'
const { useRef, useReducer, useEffect, useState } = React
import { isMobile } from '../isMobile'
// CSS
import classes from './Select.css'

type value = string | number | string[] | undefined

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
  style: React.CSSProperties
  placeholder: string
  backgroundColor: string
  borderRadius: string
  color: string
}

interface IInputState {
  value?: value
  displayValue?: value
  bIsListOpen?: boolean
}

interface IReducerAction extends IInputState {
  handler: EReducerHandler
}

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

export const Select = (props: ISelectProps) => {
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

  const escFunction = (event: KeyboardEvent) => {
    if (event.keyCode === 27 && state.bIsListOpen) {
      dispatch({ handler: EReducerHandler.LIST, bIsListOpen: false })
      if (myList && myList.current) {
        myList.current.blur()
      }
    }
  }

  const onChangeHandler = () => {
    if (props.onChange) {
      props.onChange(state.value)
    }
  }

  /**
   * CSS Variables setup.
   */
  useEffect(() => {
    const { backgroundColor, borderRadius, color } = props
    if (myWrapper && myWrapper.current) {
      myWrapper.current.style.setProperty('--my-highlight-color', '#1EA3CC')
      myWrapper.current.style.setProperty('--my-background-color', backgroundColor || '#FAFBFC')
      myWrapper.current.style.setProperty('--my-border-radius', borderRadius || '4px')
      myWrapper.current.style.setProperty('--my-color', color || '#484848')
    }
  }, [])

  /**
   * Respective event listener handler on `useEffect`.
   */
  useEffect(() => {
    if (!bIsMobile) {
      if (state.bIsListOpen) {
        window.addEventListener('keydown', escFunction)
      } else {
        window.removeEventListener('keydown', escFunction)
      }
    }
    window.addEventListener('mousedown', onOutsideClickHandler)
    return (() => {
      if (!bIsMobile) window.removeEventListener('keydown', escFunction)
      window.removeEventListener('mousedown', onOutsideClickHandler)
    })
  }, [state.bIsListOpen])

  const wrapperClasses: string[] = [classes.Wrapper]
  const listClasses: string[] = [classes.List]
  const labelClasses: string[] = [classes.Label]

  if (state.bIsListOpen) {
    wrapperClasses.push(classes.Open)
    listClasses.push(classes.Open)
    labelClasses.push(classes.ActiveLabel)
  } else if (state.value && state.value !== '' ? true : false) {
    labelClasses.push(classes.ActiveLabel)
  }

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

  return (
    <fieldset
      ref={myWrapper}
      className={wrapperClasses.join(' ')}>
      <div
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
}
