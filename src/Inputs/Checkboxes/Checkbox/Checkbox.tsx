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
  const [bIsTouched, setIsTouched] = useState()
  // const [bIsMounted, setIsMounted] = useState()
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
      if (type && type !== 'checkbox') {
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

  const onClickHandler = () => {
    if (!bIsTouched) {
      setIsTouched(true)
    }
    if (myInput && myInput.current) {
      console.log(props.option, 'onClickHandler myInput checked', !myInput.current.checked)
      myInput.current.checked = !myInput.current.checked
      setIsChecked(!myInput.current.checked)
    }
  }

  const onChangeHandler = () => {
    if (props.onChange) {
      props.onChange(bIsChecked)
    }
  }

  /**
   * If `props.checked === true` then set the `bIsMounted` to true to show the Icon
   * and remove `classes.Unmounted`.
   */
  useEffect(() => {
    if (props.checked) {
      // setIsMounted(true)
    }
  }, [])


  /**
   * If `bIsTouched === true` then set the animation duration to 200ms and
   * set `bIsMounted` to true to show the Icon and remove `classes.Unmounted`.
   */
  useEffect(() => {
    if (bIsTouched) {
      if (myIcon && myIcon.current) {
        myIcon.current.style.setProperty('--my-animation-duration', '200ms')
      }
      // setIsMounted(true)
    }
  }, [bIsTouched])

  // console.log(props.option, 'bIsChecked', bIsChecked)
  // console.log(props.option, 'bIsTouched', bIsTouched)
  // console.log(props.option, 'bIsMounted', bIsMounted)

  return (
    <fieldset className={classes.Wrapper}>
      <input
        ref={myInput}
        type={checkboxProps.type}
        className={classes.Input}
        value={props.value}
        name={props.name || props.single ? 'single' : undefined}
        checked={props.checked}
        onChange={onChangeHandler} />
      <label 
        onClick={onClickHandler}
        className={classes.Container}>
        <span
          className={[
            checkboxProps.body,
            bIsChecked ? classes.Checked : null
          ].join(' ')}>
          <span 
            ref={myIcon}
            className={[
              classes.Icon,
              checkboxProps.animation,
              // !bIsMounted ? classes.Unmounted : null,
              /**
               * The animations will only play if `bIsTouched` is touched,
               * meaning if it was mounted/clicked or `props.checked` was true by default.
               */
            ].join(' ')}>
            {checkboxProps.icon}
          </span>
        </span>
        <span className={classes.Label}>{props.option}</span>
      </label>
    </fieldset>
  )
})
