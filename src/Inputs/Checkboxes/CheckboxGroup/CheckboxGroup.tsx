import * as React from 'react'

export const CheckboxGroup = React.memo((props: any): JSX.Element => {
  const { children, name, style, className, single } = props;

  /**
   * Cloning children to pass props.
   */
  const childrenWithNameProp = React.Children.map(children, child =>
    React.cloneElement(
      child, 
      {
        name: name,
        style: style,
        className: className,
        single: single || false
      })
  )

  return (
    <React.Fragment>
      {childrenWithNameProp}
    </React.Fragment>
  )
})
