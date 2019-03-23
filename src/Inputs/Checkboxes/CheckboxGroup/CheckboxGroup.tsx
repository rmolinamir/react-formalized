import * as React from 'react'

/**
 * `CheckboxGroup` copies the same props passed to it to any of its children.
 * Should be used only for the `Checkbox` functional component.
 * Copies and passes the following props:
 *  1. `name`,
 *  2. `type`,
 *  3. `style`,
 *  4. `className`,
 *  5. `single`.
 */
export const CheckboxGroup = React.memo((props: ICheckboxGroupProps): JSX.Element => {
  const { children, name, type, style, className, single } = props;

  /**
   * Cloning children to pass props in scale. Will only pass props to elements who's `displayName`
   * property is equal to `react-png-input/checkbox`. This is so that the props will
   * be passed as intented. Otherwise it will simply return the child without any changes.
   */
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      const RFC_Child: React.FunctionComponent = child.type as React.FunctionComponent
      const displayName = RFC_Child.displayName
      if (displayName === 'react-png-input/checkbox') {
        return React.cloneElement(
          child as React.ReactElement<any>, 
          {
            name: name,
            type: type,
            style: style,
            className: className,
            single: single || false
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
    <React.Fragment>
      {childrenWithProps}
    </React.Fragment>
  )
})
