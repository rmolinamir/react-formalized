import * as React from 'react'
// Pre-set themes
import { defaultTheme } from './Themes/Themes'

const reducer = (state: ITheme, action: ITheme): ITheme => {
  const { ...newState } = action
  return {
    ...state,
    ...newState
  }
}

/**
 * The initial context includes the `defaultTheme` as the `theme`, and
 * the `setTheme` function. Will be changed or the store dispatcher later.
 */
const initialContext: IInputContext = {
  theme: defaultTheme,
  setTheme: function(theme) {
    this.theme = {
      ...this.theme,
      ...theme
    }
  }
}

export const Context = React.createContext<IInputContext>(initialContext)

export const Provider = (props: IProviderProps) => {
  const initialState: ITheme = {
    ...defaultTheme,
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
