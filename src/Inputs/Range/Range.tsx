import * as React from 'react'
import { withContext } from 'with-context-react'
// CSS
import classes from './Range.module.css'
// JSX
import { Context } from '../Context/Context'

export const Range = withContext((props: IRangeProps) => {
  /**
   * Range setup. Depends if `props.step` exists.
   * If there is a step:
   * - If there is a value, recalculates the `defaultValue` to the nearest step,
   *   otherwise place it at the step closest to the middle of the range.
   * If there is no step:
   * - The `defaultValue` is at the middle of the range or the value if it exists.
   */
  const minValue:number = Number(props.minValue || 0)
  const maxValue:number = Number(props.maxValue || 100)
  const step:number = Number(props.step || 0)
  let defaultValue:number
  if (!props.step) {
    defaultValue = Number(props.value || (maxValue - minValue)/2 + minValue)
  } else {
    const value = Number(props.value)
    const amountOfSteps = Math.floor((maxValue - minValue)/step)
    if (value) {
      const closestStepFromValue = Math.round((value - minValue)/step)
      defaultValue = minValue + closestStepFromValue * step
    } else {
      defaultValue = minValue + step * Math.ceil(amountOfSteps/2)
    }
  }

  /**
   * Progress bar width percentage.
   */
  const initialProgressBar:number = (((defaultValue - minValue)/(maxValue - minValue))*100)
  
  const [progressBar, setProgressBar] = React.useState<number>(initialProgressBar)
  const [value, setValue] = React.useState<number>(defaultValue)

  const containerRef = React.useRef<HTMLFieldSetElement>(null)

  /**
   * `onChangeHandler` sets the new value and the new progress bar percentage.
   * Executes the `props.onChange` callback if it exists.
   */
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const progress = (((Number(value) - minValue)/(maxValue - minValue))*100)
    setProgressBar(progress)
    setValue(Number(value))
    if (props.onChange) {
      props.onChange(value)
    }
  }

  /**
   * Subscribes to `progressBar` changes then adjusts the width appropriately.
   */
  React.useEffect(() => {
    if (containerRef && containerRef.current) {
      containerRef.current.style.setProperty('--my-progress-bar-width', `${progressBar}%`)
      if (progressBar < 50) {
        containerRef.current.style.setProperty('--my-border-right', `0`)
      } else {
        containerRef.current.style.setProperty('--my-border-right', '4px')
      }
    }
  }, [progressBar])

  let CSSVariables
  /**
   * The CSS Variables will be stored in the `.theme` key if
   * a provider is invoked.
   */
  if (props._context && props._context.theme) {
    CSSVariables = {
      ...props._context.theme.general,
      ...props._context.theme.range
    } as React.CSSProperties
  }

  return (
    <div
      style={{
        ...CSSVariables
      }}
      className={[
        classes.Wrapper,
        classes.Aesthetics
      ].join(' ')}>
      <fieldset 
        draggable={false}
        ref={containerRef}
        className={classes.Container}>
        <input type='range'
          className={classes.Slider}
          onChange={onChangeHandler}
          name={props.name}
          step={props.step || '1'}
          defaultValue={defaultValue.toString()}
          min={minValue} 
          max={maxValue} />
      </fieldset>
      {props.indicator || props.indicatorClassName ? (
        <span className={props.indicatorClassName || classes.Indicator}>{value}</span>
      )
      : null}
    </div>
  )
}, Context)
