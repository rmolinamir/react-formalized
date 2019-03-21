import * as React from 'react'

/**
 * Themes initial context for CSS variables & theme color.
 */
const defaultState: ITheme = {
  /**
   * Input.
   */
  ['--my-border-color']: '#EBEBEB',
  ['--my-border-radius']: '4px',
  ['--my-background-color']: '#FAFBFC',
  ['--my-hightligh-color']: '#1EA3CC',
  /** 
   * Label.
   */
  ['--my-label-color']: '#A4A4A4',
  /**
   * Validity.
   */
  ['--my-valid-color']: '#28A745',
  ['--my-invalid-color']: '#DC3545',
  /**
   * Slider & Checkbox.
   */
  ['--my-indicator-background-color']: '#484848',
  ['--my-icon-color']: '#FFF',
  /**
   * Checkbox.
   */
  ['--my-animation-duration']: '200ms',
  ['--checkbox-background-color']: '#E6E6E6',
  ['--my-hover-color']: '#CCC',
}

interface IContextProps extends ITheme {
  children: React.ReactChildren
}

const reducer = (state: ITheme, action: ITheme): ITheme => {
  const { ...newState } = action
  return {
    ...state,
    ...newState
  }
}

export const Context = React.createContext<any>(defaultState)

export const Provider = (props: IContextProps) => {
  const initialState: ITheme = {
    ...defaultState,
    ...props
  }

  const [state, dispatch] = React.useReducer(reducer, initialState)

  const setTheme = (CSSProps: ITheme):void => {
    dispatch({ ...CSSProps })
  }

  return (
    <Context.Provider value={{
      theme: state,
      setTheme: setTheme
    }}>
      {props.children}
    </Context.Provider>
  )
}
