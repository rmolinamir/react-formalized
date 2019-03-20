import * as React from 'react'

export const Checkbox = React.memo((props: any): JSX.Element => {
  const { children, name } = props;

  /**
   * Cloning children to pass props.
   */
  const childrenWithNameProp = React.Children.map(children, child =>
    React.cloneElement(
      child, 
      {
        name: name 
      })
  )

  return (
    <React.Fragment>
      {childrenWithNameProp}
    </React.Fragment>
  )
})
