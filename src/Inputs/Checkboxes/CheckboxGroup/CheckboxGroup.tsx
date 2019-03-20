import * as React from 'react'

export const CheckboxGroup = React.memo((props: any): JSX.Element => {
  const { children, name, style, className } = props;

  /**
   * Cloning children to pass props.
   */
  const childrenWithNameProp = React.Children.map(children, child =>
    React.cloneElement(
      child, 
      {
        name: name,
        style: style,
        className: className
      })
  )

  return (
    <React.Fragment>
      {childrenWithNameProp}
    </React.Fragment>
  )
})
