import * as React from 'react'
const { useState, useRef } = React
import { withContext } from 'with-context-react'
// Types
import {
  ICheckboxProps,
  ICheckboxStyle
} from '../../../typings'
// CSS
import classes from './Checkbox.module.css'
// JSX
import { Context } from '../../Context/Context'
import Icon from '../../../Icon/SVG/SVG'

const MyCheckbox = withContext(React.memo((props: ICheckboxProps): JSX.Element => {
  const [bIsChecked, setIsChecked] = useState(props.checked || false)
  const myInput: React.RefObject<HTMLInputElement> = useRef(null)

  const key: string = props.identifier || String(props.label).toLowerCase().split(' ').join('_')

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
   * `onClickHandler` saves the input checked status into the state upon clicking the checkbox if not disabled.
   */
  const onClickHandler = () => {
    if (props.disabled) return
    if (myInput && myInput.current) {
      const checked = myInput.current.checked
      setIsChecked(checked)
    }
  }

  /**
   * Subscribed to any changes made to `bIsChecked`. Executes the `onChange` callback and passes
   * the key identifier, checked status, and value if it exists.
   */
  React.useEffect(() => {
    if (props.onChange) {
      props.onChange(
        key,
        bIsChecked,
        props.value,
      )
    }
  }, [bIsChecked])

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
        <label
          style={{
            ...CSSVariables,
          cursor: props.disabled ? 'not-allowed' : undefined,
          opacity: props.disabled ? 0.8 : undefined
        }}
          htmlFor={key}
          className={[
            classes.Label,
            // If checkbox type is bubble, then the label should be a block element.
            type === 'bubble' && classes.BlockLabel,
            props.className || classes.Aesthetics
          ].join(' ')}>
          <input
            id={key}
            ref={myInput}
            required={props.required}
            type={checkboxStyle.type}
            className={classes.Input}
            value={props.value}
            onClick={onClickHandler}
            name={props.name || (
              checkboxStyle.type === 'radio' ? 
                'radio' 
                : props.single ? 'single' : undefined
            )}
            defaultChecked={bIsChecked}
            disabled={props.disabled} />
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
    </React.Fragment>
  )
}), Context)

export const Checkbox = (props: ICheckboxProps): JSX.Element => <MyCheckbox {...props} />
(Checkbox as React.FunctionComponent).displayName = 'react-png-input/checkbox'
