import * as React from 'react'
// CSS
import classes from './Slider.css'

export const Slider = (props: any) => {
  return (
    <div className={classes.Container}>
      {props.header ? (
        <div className={classes.Header}>
          {props.header}: <strong>{props.value} {props.valueType ? props.valueType : null}</strong>
        </div>
      )
        : null}
      <input className={classes.Slider} 
        name={props.name}
        ref={props.ref} 
        type='range' 
        onChange={(event) => props.onChange(event)}
        step='1'
        min='1' 
        max={props.maxValue}
        value={props.value} />
    </div>
  )
}
