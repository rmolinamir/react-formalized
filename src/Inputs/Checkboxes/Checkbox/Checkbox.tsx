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
  const myLabel: React.RefObject<HTMLLabelElement> = useRef(null)

  const checkboxProps: {type: string, body?: string, icon?: JSX.Element | null, name?: string, label?: JSX.Element, animation?: string} = {
    type: 'checkbox',
    body: undefined,
    icon: undefined,
    name: undefined,
    label: undefined,
    animation: undefined
  }

  const type:string = String(props.type).toLowerCase()
  
  switch (type) {
    case 'radio':
      checkboxProps.type = props.multiple ? 'checkbox' : type
      checkboxProps.body = classes.Radio
      checkboxProps.animation = classes.Zoom
      checkboxProps.label = props.label
      checkboxProps.icon = (
        <span className={classes.Circle} />
      )
      break
    case 'bubble': 
      checkboxProps.type = props.multiple ? 'checkbox' : type
      checkboxProps.body = classes.Bubble
      checkboxProps.animation = classes.Fill
      checkboxProps.label = (
        <div className={[
          classes.Bubble,
          checkboxProps.animation
        ].join(' ')}>
          {props.label}
        </div>
      )
      checkboxProps.icon = null
      break
    case 'checkbox':
    default:
      if (props.type && type !== 'checkbox') {
        console.warn('No prop types match your query, this results in a fallback to the checkbox input.')
      }
      checkboxProps.type = props.single ? 'radio' : 'checkbox'
      checkboxProps.body = classes.Box
      checkboxProps.animation = classes.Pop
      checkboxProps.label = props.label
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
    if (myLabel && myLabel.current) {
      myLabel.current.style.setProperty('--my-animation-duration', '200ms')
      myLabel.current.style.setProperty('--my-background-color', '#E6E6E6')
      myLabel.current.style.setProperty('--my-highlighted-background-color', '#1EA3CC')
      myLabel.current.style.setProperty('--my-hovered-background-color', '#CCC')
      myLabel.current.style.setProperty('--my-icon-color', '#FFF')
    }
  }, [])

  const key = props.id || String(`${props.label}_${type}`).toLowerCase().split(' ').join('_')

  return (
    <React.Fragment>
      <fieldset
        style={props.style}
        className={classes.Wrapper}>
        <input
          id={key}
          ref={myInput}
          type={checkboxProps.type}
          className={[
            classes.Input,
            bIsChecked && classes.Checked
          ].join(' ')}
          value={props.value}
          name={props.name || (
            checkboxProps.type === 'radio' ? 
            'single' 
            : props.single && 'single'
          )}
          defaultChecked={bIsChecked}
          disabled={props.disabled} />
        <label
          ref={myLabel}
          htmlFor={key}
          className={[
            classes.Container,
            props.className || classes.Aesthetics
          ].join(' ')}
          onClick={onClickHandler}>
          {type !== 'bubble' && (
            <span
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
          )}
          <span className={classes.Label}>{checkboxProps.label}</span>
        </label>
      </fieldset>
      {bIsChecked && (type === 'checkbox' || !props.type) && (
        props.dynamic
      )}
    </React.Fragment>
  )
})
