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
   * Cloning children to pass props.
   */
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
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
      return null
    }
  })

  return (
    <React.Fragment>
      {childrenWithProps}
    </React.Fragment>
  )
})
