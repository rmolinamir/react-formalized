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

export const Checkbox = (props: any): JSX.Element => {
  const [bIsChecked, setIsChecked] = useState(props.checked || false)
  const [bIsTouched, setIsTouched] = useState()
  const [bIsMounted, setIsMounted] = useState()
  const myIcon: React.RefObject<HTMLInputElement> = useRef(null)

  const onClickHandler = () => {
    if (!bIsTouched) {
      setIsTouched(true)
    }
    setIsChecked(!bIsChecked)
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
      setIsMounted(true)
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
      setIsMounted(true)
    }
  }, [bIsTouched])

  console.log(props.option, 'bIsChecked', bIsChecked)
  console.log(props.option, 'bIsTouched', bIsTouched)
  console.log(props.option, 'bIsMounted', bIsMounted)

  return (
    <div className={classes.Wrapper}>
      <input
        type='checkbox'
        className={classes.Input}
        value={props.value}
        checked={bIsChecked}
        onChange={onChangeHandler} />
      <label 
        onClick={onClickHandler}
        className={classes.Container}>
        <span
          className={classes.Square}>
          <span 
            ref={myIcon}
            className={[
              classes.Icon,
              !bIsMounted ? classes.Unmounted : null,
              /**
               * The animations will only play if `bIsTouched` is touched,
               * meaning it was mounted/clicked or `props.checked` was true by default.
               */
              bIsTouched ? bIsChecked ? classes.True : classes.False : null
            ].join(' ')}>
            <Icon
              size='0.9em'
              icon='bullet-checkmark-no-bg' />
          </span>
        </span>
        <span className={classes.Label}>{props.option}</span>
      </label>
    </div>
  )
}

