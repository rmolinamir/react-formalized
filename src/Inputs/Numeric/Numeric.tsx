import * as React from 'react'
const { useState, useRef } = React
import { withContext } from 'with-context-react'
// CSS
import classes from './Numeric.module.css'
// JSX
import { Context } from '../Context/Context'
import { Icon } from 'react-svg-library'

enum EClickHandler {
  SUM,
  DIF
}

export const Numeric = withContext(React.memo((props: INumericProps) => {
  const [value, setValue] = useState(props.value || 0)
  const minValue = props.minValue || -1
  const maxValue = props.maxValue || 100

  const myInput:React.RefObject<HTMLDivElement> = useRef(null)

  /**
   * `onClickHandler` for the icon buttons.
   * Substracts or adds 1 to the `value`.
   */
  const onClickHandler = (handler: EClickHandler) => {
    let newValue = Number(value)
    switch (handler) {
      case EClickHandler.SUM: 
        newValue++
        break
      case EClickHandler.DIF: 
        newValue--
        if (newValue < 0) { newValue = 0 } // Prevents from going negative
        break
    }
    onChange(newValue)
  }

  /**
   * `onChangeHandler` to handle the value whenever the user types it through the input field.
   */
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value && event.target.value.replace(/\D/,''))
    onChange(value)
  }

  /**
   * `onChange` clamps the value, sets it to the React state, then calls `props.onChange` if
   * it exists.
   */
  const onChange = (value: number) => {
    const number = Clamp(value, minValue, maxValue)
    setValue(number)
    if (props.onChange) {
      props.onChange(number)
    }
  }

  let CSSVariables
  /**
   * The CSS Variables will be stored in the `theme` key if
   * a provider is invoked.
   */
  if (props._context && props._context.theme) {
    CSSVariables = {
      ...props._context.theme.general
    } as React.CSSProperties
  }

  return (
    <div 
      tabIndex={1}
      ref={myInput}
      style={{
        ...props.style,
        ...CSSVariables
      }}
      className={classes.Wrapper}>
      <button
        onClick={() => onClickHandler(EClickHandler.DIF)}
        className={classes.Button}>
        <Icon icon='minus-symbol'/>
      </button>
      <input
        type='number'
        className={[
          classes.Input,
          props.shouldNotType && classes.DisablePointerEvents
        ].join(' ')} 
        placeholder='0'
        value={value} 
        onChange={onChangeHandler}/>
      <button
        onClick={() => onClickHandler(EClickHandler.SUM)}
        className={classes.Button}>
        <Icon icon='plus-symbol'/>
      </button>
    </div>
  )
}), Context)

/**
 * Clamps the number, meaning it won't let it go beyond or below the min or max values.
 */
const Clamp = (num: number, min: number, max: number) => {
  return Math.max(min, Math.min(num, max))
}
