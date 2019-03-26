import React from 'react'
import propTypes from 'prop-types'
// CSS
import classes from './Example.module.css'
import Button from 'react-png-button'

const example = (props) => {
  return (
    <div
      style={{
        borderBottom: '1px dashed rgb(206, 212, 222)',
        paddingBottom: '12px'
      }}
      id={props.id}
      className={classes.Example}>
      <h2 className={classes.Title}>{props.title}</h2>
      <div
        style={{
          padding: '12px 0 0'
        }}
        className={classes.Example}>
        {props.children}
      </div>
      <Button style={{ padding: '6px' }} button='primary' onClick={() => window.scrollTo(0, 0)}>Back to top</Button>
    </div>
  )
}

example.propTypes = {
  children: propTypes.any,
  id: propTypes.string,
  title: propTypes.string
}

export default example
