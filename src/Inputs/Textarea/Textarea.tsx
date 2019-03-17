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
    } else {
      window.addEventListener('resize', autoExpand);
    }
    return (() => {
      if (bIsMobile) {
        window.removeEventListener('orientationchange', autoExpand);
      } else {
        window.removeEventListener('resize', autoExpand);
      }
    })
  }, [])

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

  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    autoExpand()
    if (props.onChangeHandler) {
      props.onChangeHandler(event)
    }
  }

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
        onChange={onChangeHandler} />
      {maxLength ? (
        <span className={classes.Length}>{maxLength - length}</span>
      )
      : null}
    </React.Fragment>
  )
}

export default textarea
