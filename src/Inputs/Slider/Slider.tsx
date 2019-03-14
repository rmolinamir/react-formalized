import * as React from 'react'
// CSS
import classes from './Slider.css'

export const Slider = (props: ISliderProps) => {
  const minValue:number = Number(props.minValue || 0)
  const maxValue:number = Number(props.maxValue || 100)
  const step:number = Number(props.step || 0)
  console.log('step', step)
  let defaultValue:number
  if (!props.step) {
    defaultValue = Number(props.value || (maxValue - minValue)/2 + minValue)
  } else {
    const value = Number(props.value)
    const amountOfSteps = Math.floor((maxValue - minValue)/step)
    if (value) {
      
      const closestStepFromValue = Math.round((value - minValue)/step)
      console.log('closestStepFromValue', closestStepFromValue)
      defaultValue = minValue + closestStepFromValue * step
      // if (value % step === 0) {
      //   defaultValue = value
      // } else {
      //   defaultValue = minValue
      // }
    } else {
      defaultValue = minValue + step * Math.ceil(amountOfSteps/2)
    }
    // defaultValue = Math.floor(amountOfSteps/2) * step * minValue
    console.log('amount of steps', amountOfSteps)
  }
  const initialProgressBar:number = (((defaultValue - minValue)/(maxValue - minValue))*100)


  console.log('minValue', minValue)
  console.log('maxValue', maxValue)
  console.log('defaultValue', defaultValue)
  console.log('initialProgressBar', initialProgressBar)
  console.log('-----------------------------------------')
  
  const [progressBar, setProgressBar] = React.useState<number>(initialProgressBar)
  const [value, setValue] = React.useState<number>(defaultValue)

  const containerRef = React.useRef<HTMLDivElement>(null)
  const sliderRef = React.useRef<HTMLInputElement>(null)


  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const progress = (((Number(value) - minValue)/(maxValue - minValue))*100)
    console.log('value', value)
    console.log('maxValue', maxValue)
    console.log('progress', progress)
    setProgressBar(progress)
    setValue(Number(value))
    if (props.onChange) {
      props.onChange(value, true)
    }
  }

  /**
   * CSS Variables setup.
   */
  React.useEffect(() => {
    const { backgroundColor, progressBackgroundColor } = props
    if (containerRef && containerRef.current && sliderRef && sliderRef.current) {
      containerRef.current.style.setProperty('--my-background-color', backgroundColor || '#EBEBEB')
      containerRef.current.style.setProperty('--my-progress-background-color', progressBackgroundColor || '#1EA3CC')
      sliderRef.current.style.setProperty('--my-progress-background-color', progressBackgroundColor || '#1EA3CC')
    }
  }, [])

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

  return (
    <div className={classes.Wrapper}>
      <div 
        ref={containerRef}
        className={classes.Container}>
        <input type='range'
          ref={sliderRef}
          className={classes.Slider}
          onChange={onChangeHandler}
          name={props.name}
          step={props.step || '1'}
          defaultValue={defaultValue.toString()}
          min={minValue} 
          max={maxValue} />
      </div>
      {props.indicator || props.indicatorClassName ? (
        <span className={props.indicatorClassName || classes.Indicator}>{value}</span>
      )
      : null}
    </div>
  )
}
