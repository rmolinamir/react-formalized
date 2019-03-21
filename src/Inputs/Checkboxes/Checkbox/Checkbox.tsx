import * as React from 'react'
const { useState, useRef } = React
import { withContext } from 'with-context-react'
// CSS
import classes from './Checkbox.module.css'
// JSX
import { Context } from '../../Context/Context'
import { Icon } from 'react-svg-library'

// interface IInputState {
//   bIsChecked?: boolean
//   touched?: boolean
// }

export const Checkbox = withContext(React.memo((props: any): JSX.Element => {
  const [bIsChecked, setIsChecked] = useState(props.checked || false)
  const myInput: React.RefObject<HTMLInputElement> = useRef(null)

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
      checkboxProps.type = props.single ? 'radio' : 'checkbox'
      checkboxProps.body = classes.Bubble
      checkboxProps.label = (
        <div className={classes.Bubble}>
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
          {
            label: props.label,
            status: status,
            value: props.value
          },
          status, 
          event
        )
      }
    }
  }

  let CSSVariables;
  /**
   * The CSS Variables will be stored in the `.theme` key if
   * a provider is invoked.
   */
  if (props._context && props._context.theme) {
    CSSVariables = {
      ...props._context.theme
    } as React.CSSProperties
  } else {
    CSSVariables = {
      ...props._context
    } as React.CSSProperties
  }

  const key = props.id || String(`${props.label}_${type}`).toLowerCase().split(' ').join('_')

  return (
    <React.Fragment>
      <fieldset
        style={{
          ...props.style,
          display: props.inline && 'inline'
        }}
        className={classes.Wrapper}>
        <input
          id={key}
          ref={myInput}
          type={checkboxProps.type}
          className={classes.Input}
          value={props.value}
          name={props.name || (
            checkboxProps.type === 'radio' ? 
            'radio' 
            : props.single && 'single'
          )}
          defaultChecked={bIsChecked}
          disabled={props.disabled} />
        <label
          style={{
            ...CSSVariables
          }}
          htmlFor={key}
          className={[
            classes.Label,
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
          {checkboxProps.label}
        </label>
      </fieldset>
      {bIsChecked && (type === 'checkbox' || !props.type) && (
        props.dynamic
      )}
    </React.Fragment>
  )
}), Context)
