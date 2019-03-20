import * as React from 'react'
const { useState, useEffect, useRef } = React
// CSS
import classes from './Checkbox.module.css'
// JSX
import { Icon } from 'react-svg-library'

// interface IInputState {
//   bIsChecked?: boolean
//   touched?: boolean
// }

export const Checkbox = React.memo((props: any): JSX.Element => {
  const [bIsChecked, setIsChecked] = useState(props.checked || false)
  const myInput: React.RefObject<HTMLInputElement> = useRef(null)
  const myIcon: React.RefObject<HTMLSpanElement> = useRef(null)

  const checkboxProps: {type: string, body?: string, icon?: JSX.Element, name?: string, animation?: string} = {
    type: 'checkbox',
    body: undefined,
    icon: undefined,
    name: undefined,
    animation: undefined
  }

  const type:string = String(props.type).toLowerCase()
  
  switch (type) {
    case 'radio':
      checkboxProps.type = props.multiple ? 'checkbox' : type
      checkboxProps.body = classes.Radio
      checkboxProps.animation = classes.Zoom
      checkboxProps.icon = (
        <span className={classes.Circle} />
      )
      break
    case 'checkbox':
    default:
      if (props.type && type !== 'checkbox') {
        console.warn('No prop types match your query, this results in a fallback to the checkbox input.')
      }
      checkboxProps.type = props.single ? 'radio' : 'checkbox'
      checkboxProps.body = classes.Box
      checkboxProps.animation = classes.Pop
      checkboxProps.icon = (
        <Icon
            size='0.7em'
            icon='bullet-checkmark-no-bg' />
      )
      break
  }

  const onClickHandler = (event: React.SyntheticEvent) => {
    if (props.disabled) return
    if (myInput && myInput.current) {
      const status = !myInput.current.checked
      setIsChecked(status)
      if (props.onChange) {
        props.onChange(
          status, 
          {
            label: props.label,
            status: status,
            value: props.value
          },
          event
        )
      }
    }
  }

  /**
   * If `props.checked === true` then set then set the animation duration to 200ms
   */
  useEffect(() => {
    if (myIcon && myIcon.current) {
      myIcon.current.style.setProperty('--my-animation-duration', '200ms')
      myIcon.current.style.setProperty('--my-background-color', '#E6E6E6')
      myIcon.current.style.setProperty('--my-highlighted-background-color', '#1EA3CC')
      myIcon.current.style.setProperty('--my-hovered-background-color', '#CCC')
      myIcon.current.style.setProperty('--my-icon-color', '#FFF')
    }
  }, [])

  const key = props.id || String(`${props.label}_${type}`).toLowerCase().split(' ').join('_')

  return (
    <fieldset className={classes.Wrapper}>
      <input
        id={key}
        ref={myInput}
        type={checkboxProps.type}
        className={classes.Input}
        value={props.value}
        name={props.name || (
          checkboxProps.type === 'radio' ? 
          'single' 
          : props.single && 'single'
        )}
        defaultChecked={bIsChecked}
        disabled={props.disabled} />
      <label
        htmlFor={key}
        className={classes.Container}
        onClick={onClickHandler}>
        <span
          ref={myIcon}
          className={[
          classes.Body,
          checkboxProps.body
          ].join(' ')}>
          <span 
            className={[
              classes.Icon,
              checkboxProps.animation
            ].join(' ')}>
            {checkboxProps.icon}
          </span>
        </span>
        <span className={classes.Label}>{props.label}</span>
      </label>
    </fieldset>
  )
})
