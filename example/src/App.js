import React, { Component } from 'react'

import { Input, Slider } from 'react-png-input'

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
        <Input
          type='email'
          validation={{
            required: true,
            minLength: 3
          }}
          placeholder='Email' />
        <Input
          type='password'
          validation={{
            required: true,
            minLength: 4,
            maxLength: 10
          }}
          placeholder='Password' />
        <Input
          type='textarea'
          placeholder='Username' />
        {/* <Slider /> */}
        <Slider
          indicator
          step={43}
          // value='325'
          minValue='100'
          maxValue='350' />
        <Slider
          indicator
          step={65}
          // value='325'
          minValue='125'
          maxValue='350' />
        <Slider
          indicator
          step={65}
          value='325'
          minValue='200'
          maxValue='350' />
        <Slider
          indicator
          step={25}
          value='99' />
      </div>
    )
  }
}
