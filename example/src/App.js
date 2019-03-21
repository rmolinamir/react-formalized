import React from 'react'
// CSS
import classes from './App.module.css'
// JSX
import { Input, Slider, Select, Checkbox, CheckboxGroup } from 'react-png-input'

const app = () => {
  return (
    <div style={{
      display: 'flex',
      flexFlow: 'column',
      maxWidth: '644px',
      margin: '64px auto',
      justifyContent: 'center'
    }}>
      <input type='color' />
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
          maxLength: 150
        }} />
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
      <span className={classes.Divider}>Checkboxes:</span>
      <Checkbox checked label='Checkbox A (checked)' />
      <Checkbox label='Checkbox B' />
      <Checkbox multiple checked type='radio' label='Checkbox C' />
      <Checkbox
        label='Checkbox D (if checked, renders option E)'
        dynamic={(<Checkbox style={{ paddingLeft: '9px' }} label='Checkbox E' />)} />
      <span className={classes.Divider}>Radio inputs:</span>
      <Checkbox checked type='radio' label='Radio A' />
      <Checkbox disabled single type='radio' label='Radio B (disabled)' />
      <Checkbox type='radio' label='Radio C' />
      <Checkbox type='radio' label='Radio D' />
      <span className={classes.Divider}>Inside a checkbox group:</span>
      <CheckboxGroup name='checkbox-group'>
        <Checkbox disabled type='radio' label='Radio E (disabled)' />
        <Checkbox type='radio' label='Radio F' />
        <Checkbox type='radio' label='Radio G' />
      </CheckboxGroup>
      <span className={classes.Divider}>Bubbles as checkboxes:</span>
      <Checkbox type='bubble' label='Bubble A' />
      <Checkbox checked type='bubble' label='Bubble B' />
      <Checkbox type='bubble' label='Bubble C' />
      <span className={classes.Divider}>Bubbles as radio inputs:</span>
      <CheckboxGroup single name='bubble-group'>
        <Checkbox type='bubble' label='Bubble D' />
        <Checkbox type='bubble' label='Bubble F' />
        <Checkbox type='bubble' label='Bubble G' />
      </CheckboxGroup>
    </div>
  )
}

export default app
