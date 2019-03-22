import * as React from 'react'
const { useState, useRef, useEffect } = React
import { isMobile } from '../isMobile'
// CSS
import classes from './Textarea.module.css'

const defaultConfig: IInputConfig = {
  autoComplete: 'none',
  autoCorrect: 'none',
  autoCapitalize: 'sentences',
  spellCheck: true
}

const textarea = (props: IInputElementProps): JSX.Element => {
  const myTextArea: React.RefObject<HTMLTextAreaElement> = useRef(null)
  const [baseScrollHeight, setBaseScrollHeight] = useState(0)
  const [bIsMobile] = useState(isMobile())

  /**
   * On mount:
   */
  useEffect(() => {
    calculateBaseScrollHeight()
    /**
     * Adding event listeners for:
     * 1. orientationchange **(if on mobile)**
     * 2. resize **(if on desktop)**
     */
    if (bIsMobile) {
      window.addEventListener('orientationchange', autoExpand);
    }
    return (() => {
      if (bIsMobile) {
        window.removeEventListener('orientationchange', autoExpand);
      }
    })
  }, [])

  /**
   * Calculates the base height of the textarea, used to expand it automatically when user types.
   */
  const calculateBaseScrollHeight = () => {
    if (myTextArea && myTextArea.current) {
      const textAreaEl: HTMLTextAreaElement = myTextArea.current
      const savedValue: string = textAreaEl.value
      textAreaEl.value = ''
      const baseScrollHeight: number = textAreaEl.scrollHeight
      setBaseScrollHeight(baseScrollHeight)
      textAreaEl.value = savedValue
    }
  }

  /**
   * `onChangeHandler` executes `autoExpand` and the `props.onChangeHandler` callback
   * passing the value and the event of the `textarea` type input.
   * `props.onChangeHandler` is passed by the `Input` functional component.
   */
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    autoExpand()
    if (props.onChangeHandler) {
      props.onChangeHandler(event)
    }
  }

  /**
   * Based on: `https://codepen.io/vsync/pen/frudD?editors=1010`.
   * `autoExpand` sets up the input's height by adding more rows depending on how much
   * the user has typed. If the user manually sets the height, then the `autoExpand` will
   * overwrite it if the `textarea` type input scroll height is higher than the manually
   * set height.
   */
  const autoExpand = () => {
    if (myTextArea && myTextArea.current) {
      const textAreaEl: HTMLTextAreaElement = myTextArea.current
      const minRows: number = props.minRows || 3
      textAreaEl.rows = props.minRows || 3
      const rows = Math.ceil((textAreaEl.scrollHeight - baseScrollHeight) / 16)
      /**
       * If the input was expanded manually.
       */
      if (textAreaEl.style.height) {
        const styledHeight = Number(textAreaEl.style.height.replace(/[^\d.-]/g, ''))
        if (textAreaEl.scrollHeight > styledHeight) {
          textAreaEl.style.height = null
        }
      }
      /**
       * Automatically expand.
       */
      if (props.elementConfig && props.elementConfig.rows) {
        textAreaEl.rows = Math.max(minRows + rows + 1, props.elementConfig.rows)
      } else {
        textAreaEl.rows = minRows + rows
      }
    }
  }

  /**
   * Max character length indicator.
   */
  const length: number | undefined = String(props.value).length
  let maxLength: number | undefined = undefined
  if (props.elementConfig && props.elementConfig.maxLength) {
    maxLength = props.elementConfig.maxLength
  }
  
  return (
    <React.Fragment>
      <textarea
        type='text'
        ref={myTextArea}
        className={[props.className, classes.TextAreaElement].join(' ')} 
        {...{ 
          rows: 3,
          ...defaultConfig, 
          ...props.elementConfig 
        }}
        required={props.required}
        value={props.value}
        onChange={onChangeHandler}
        style={props.style} />
      {maxLength ? (
        <span className={classes.Length}>{maxLength - length}</span>
      )
      : null}
    </React.Fragment>
  )
}

export default textarea
