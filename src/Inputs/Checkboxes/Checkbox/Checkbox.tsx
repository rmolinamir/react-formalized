import * as React from 'react'
const { useState, useRef } = React
import { withContext } from 'with-context-react'
// CSS
import classes from './Checkbox.module.css'
// JSX
import { Context } from '../../Context/Context'
import { Icon } from 'react-svg-library'

interface ICheckboxProps {
  label: string
  checked?: boolean
  type?: string
  disabled?: boolean
  id?: string
  name?: string
  multiple?: boolean
  single?: boolean
  inline?: boolean
  value?: value
  style?: React.CSSProperties
  className?: string
  onChange?: onChange
  dynamic?: JSX.Element
  _context: IInputContext
}

type onChange = (data: {
  label: string,
  status: boolean,
  value: value
}, status:boolean, event: React.SyntheticEvent) => void

interface ICheckboxStyle {
  type: string
  body?: string
  icon?: JSX.Element | null
  name?: string
  label?: JSX.Element | string
  animation?: string
}

export const Checkbox = withContext(React.memo((props: ICheckboxProps): JSX.Element => {
  const [bIsChecked, setIsChecked] = useState(props.checked || false)
  const myInput: React.RefObject<HTMLInputElement> = useRef(null)

  const checkboxStyle: ICheckboxStyle = {
    type: 'checkbox',
    body: undefined,
    icon: undefined,
    name: undefined,
    label: undefined,
    animation: undefined
  }

  /**
   * Parsed type `toLowerCase`, the type is used to select the respective checkbox type and style.
   */
  const type:string = String(props.type).toLowerCase()
  
  /**
   * Switch statement that will set up the `checkboxStyle` object, respectively to the `type`.
   */
  switch (type) {
    case 'radio':
      checkboxStyle.type = props.multiple ? 'checkbox' : type
      checkboxStyle.body = classes.Radio
      checkboxStyle.animation = classes.Zoom
      checkboxStyle.label = props.label
      checkboxStyle.icon = (
        <span className={classes.Circle} />
      )
      break
    case 'bubble': 
      checkboxStyle.type = props.single ? 'radio' : 'checkbox'
      checkboxStyle.body = classes.Bubble
      checkboxStyle.label = (
        <div className={classes.Bubble}>
          {props.label}
        </div>
      )
      checkboxStyle.icon = null
      break
    case 'checkbox':
    default:
      if (props.type && type !== 'checkbox') {
        console.warn('No prop types match your query, this results in a fallback to the checkbox input.')
      }
      checkboxStyle.type = props.single ? 'radio' : 'checkbox'
      checkboxStyle.body = classes.Box
      checkboxStyle.animation = classes.Pop
      checkboxStyle.label = props.label
      checkboxStyle.icon = (
        <Icon
          size='0.7em'
          icon='bullet-checkmark-no-bg' />
      )
      break
  }

  /**
   * `onClickHandler` saves the input checked status into the state upon clicking the checkbox.
   * Executes the `onChange` callback.
   */
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

  let CSSVariables
  /**
   * The CSS Variables will be stored in the `.theme` key if
   * a provider is invoked.
   */
  if (props._context && props._context.theme) {
    CSSVariables = {
      ...props._context.theme.general,
      ...props._context.theme.checkbox
    } as React.CSSProperties
  }

  const key: string = props.id || String(`${props.label}_${type}`).toLowerCase().split(' ').join('_')

  /**
   * Adds `display: 'inline'` CSS property if `props.inline` is `true`.
   */
  const style: React.CSSProperties = props.inline ? (
    {
      ...props.style,
      display: props.inline && 'inline'
    }
  ) : (
    {
      ...props.style,
    }
  )

  return (
    <React.Fragment>
      <fieldset
        style={style}
        className={classes.Wrapper}>
        <input
          id={key}
          ref={myInput}
          type={checkboxStyle.type}
          className={classes.Input}
          value={props.value}
          name={props.name || (
            checkboxStyle.type === 'radio' ? 
              'radio' 
              : props.single ? 'single' : undefined
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
              checkboxStyle.body
              ].join(' ')}>
              <span 
                className={[
                  classes.Icon,
                  checkboxStyle.animation
                ].join(' ')}>
                {checkboxStyle.icon}
              </span>
            </span>
          )}
          {checkboxStyle.label}
        </label>
      </fieldset>
      {bIsChecked && (type === 'checkbox' || !props.type) && (
        props.dynamic
      )}
    </React.Fragment>
  )
}), Context)
