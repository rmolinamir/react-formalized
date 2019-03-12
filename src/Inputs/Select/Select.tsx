import * as React from 'react'
const { useRef, useState } = React
// CSS
import classes from './Select.css'

export const Select = (props: any) => {
  const myList:React.RefObject<HTMLUListElement> = useRef(null)
  const display = props.elementConfig.displayValue
  const [displayValue, setDisplayValue] = useState(display || '')
  const [bIsListOpen , setIsListOpen] = useState(false)

  const listHandler = (handler: any) => { 
    const list = myList.current 
    switch (handler) {
      case 'open': 
        if (list) {
          list.blur()
        }
        setIsListOpen(true)
      case 'close': 
        setIsListOpen(false)
    }
  }
    
  const setValue = (option: any, onChange: any) => {
    switch (true) {
      case option.value === '':
        props.labelClasses.push(classes.SelectLabelValid)
        break
      case option.value.length > 0:
        props.labelClasses.pop()
        break
    }
    listHandler('close') // After selecting a category, close the list.
    if (onChange) { // Protection
        onChange(option.value) // props.onChange passed from stateful container to change its 
    }
    setDisplayValue(option.displayValue)
  }
    
  props.inputClasses.push(classes.InputSelect)
  const listClasses = [classes.List]

  if (bIsListOpen) {
    listClasses.push(classes.Open)
  }

  return (
    <div className={classes.Wrapper}>
      <div className={classes.InputSelectType}><strong>{props.elementConfig.label}</strong></div>
      <div onClick={() => listHandler('open')} 
          onBlur={() => listHandler('close')} 
          tabIndex={0}
          className={classes.Container}>
          <input
            disabled
            required
            // onChange={handleChange}
            style={props.style}
            // If there is a default display value in the element config then display it initially, 
            // otherwise render the value.
            value={displayValue}
            // value={props.displayValue}
            placeholder={props.elementConfig.placeholder}
            className={props.inputClasses.join(' ')} >
          </input>
          <div tabIndex={0}
              className={classes.ArrowWrapper}>
              <div className={classes.ArrowContainer}>
                  <span className={classes.Arrow} />
              </div>
          </div>
      </div>
      <ul ref={myList} className={listClasses.join(' ')}>
        {bIsListOpen ? 
          props.elementConfig.options.map((option: any, index: any) => {
            return (
              <li key={index}
                /**
                * onMouseDown event fires before onBlur event on input. It calls event.preventDefault() to
                * prevent onBlur from being called, and doesn't prevent the navLink click from happening, 
                * this guarantees that the NavLink will redirect on click without having to use SetTimeout 
                * or any other hack.
                    */
                onMouseDown={event => event.preventDefault()}
                value={option.value}>
                <button type='button' onClick={() => setValue(option, props.onChange)}>
                  {option.displayValue}
                </button>
              </li>
            )
          })
        : null}
      </ul>
    </div>
  )
}
