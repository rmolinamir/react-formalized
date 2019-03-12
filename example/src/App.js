import React, { Component } from 'react'

import { Input } from 'react-png-input'

export default class App extends Component {
  render () {
    return (
      <div style={{
        display: 'flex',
        flexFlow: 'column',
        maxWidth: '644px',
        margin: '64px auto',
        justifyContent: 'center'
      }}>
        <Input
          validation={{
            required: true,
            minLength: 4,
            maxLength: 10
          }}
          placeholder='Username' />
        {/* <Select />
        <Slider /> */}
      </div>
    )
  }
}
