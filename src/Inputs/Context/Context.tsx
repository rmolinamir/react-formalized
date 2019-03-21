import * as React from 'react'
// Pre-set themes
import { defaultTheme } from './Themes/Themes'

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

export const Context = React.createContext<IContext | ITheme>(defaultTheme)

export const Provider = (props: IContextProps) => {
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
