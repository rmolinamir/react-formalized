import * as React from 'react'

interface IFormProps {
  children: React.ReactElement[] | React.ReactElement
  onChange: () => void
}

export const Form = (props: IFormProps): JSX.Element => {
  const { onChange, children } = props

  /**
   * Cloning children to pass props in scale. Will only pass props to elements who's `displayName`
   * property is equal to `react-png-input/input`. This is so that the props will be passed as 
   * intented. Otherwise it will simply return the child without any changes.
   */
  const childrenWithProps = React.Children.map(children, child => {
    if (typeof child.type === 'function' && React.isValidElement(child)) {
      const RFC_Child: React.FunctionComponent = child.type as React.FunctionComponent
      const displayName = RFC_Child.displayName
      if (displayName === 'react-png-input/input') {
        return React.cloneElement(
          child as React.ReactElement<any>, 
          {
            onChange: onChange
          }
        )
      } else {
        return child
      }
    } else {
      return child
    }
  })

  return (
    <form>
      {childrenWithProps}
    </form>
  )
}
