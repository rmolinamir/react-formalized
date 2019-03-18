import React, { Component } from 'react'

import { Input, Slider, Select, Checkbox } from 'react-png-input'

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
          placeholder='TextArea'
          elementConfig={{
            maxLength: 3500,
            minLength: 15
          }} />
        <Input
          type='textarea'
          placeholder='TextArea'
          elementConfig={{
            maxLength: 3500,
            minLength: 15,
            rows: 5
          }} />
        {/* <Slider /> */}
        <Slider
          // value='325'
          minValue='100'
          maxValue='350' />
        <Slider
          step={65}
          // value='325'
          minValue='125'
          maxValue='350' />
        <Slider
          indicator
          value='325'
          minValue='200'
          maxValue='350' />
        <Slider
          indicator
          step={25}
          value='99' />
        <Select
          placeholder='Select'
          datalist={[
            'Option A',
            {
              value: '35193BB0sk2F',
              displayValue: 'Option B (custom value)'
            },
            'Option C', 'Option D',
            {
              value: '192aaa3349130',
              displayValue: 'Option F (custom value)'
            }]} />
        <Checkbox checked option='Checkbox A (checked)' />
        <Checkbox option='Checkbox B' />
        <Checkbox single checked type='radio' option='Radio A' />
        <Checkbox single type='radio' option='Radio B' />
      </div>
    )
  }
}
