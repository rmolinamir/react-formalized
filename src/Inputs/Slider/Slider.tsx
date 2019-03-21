import * as React from 'react'
import { withContext } from 'with-context-react'
// CSS
import classes from './Slider.css'
// JSX
import { Context } from '../Context/Context'

export const Slider = withContext((props: ISliderProps) => {
  
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

  const initialProgressBar:number = (((defaultValue - minValue)/(maxValue - minValue))*100)
  
  const [progressBar, setProgressBar] = React.useState<number>(initialProgressBar)
  const [value, setValue] = React.useState<number>(defaultValue)

  const containerRef = React.useRef<HTMLFieldSetElement>(null)

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const progress = (((Number(value) - minValue)/(maxValue - minValue))*100)
    setProgressBar(progress)
    setValue(Number(value))
    if (props.onChange) {
      props.onChange(value, true)
    }
  }

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
