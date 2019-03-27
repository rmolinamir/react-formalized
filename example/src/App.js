import React, { useState } from 'react'
// CSS
import classes from './App.module.css'
// JSX
import { withContext } from 'with-context-react'
import Button from 'react-png-button'
import Modal from 'react-png-modal'
import { Form, Input, Range, Select, Checkbox, CheckboxGroup, Numeric, Context, Provider, defaultTheme, darkTheme } from 'react-formalized'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Example from './Example/Example'

const app = (props) => {
  const [bIsLightTheme, setHandler] = useState(true)
  const [bIsModalOpen, setIsModalOpen] = useState(false)

  const onChangeHandler = (formState) => {
    console.log('app onChangeHandler formState', formState)
  }

  const onSubmitHandler = (event, formState) => {
    event.preventDefault()
    window.alert(JSON.stringify(formState, null, 3))
  }

  const changeThemeHandler = () => {
    if (bIsLightTheme) {
      props._context.setTheme(darkTheme)
      setHandler(false)
    } else {
      props._context.setTheme(defaultTheme)
      setHandler(true)
    }
  }

  return (
    <div className={[
      classes.App,
      bIsLightTheme ? classes.LightTheme : classes.DarkTheme
    ].join(' ')}>
      <Button
        style={{
          position: 'sticky',
          top: '0',
          left: '0',
          borderRadius: '0',
          zIndex: '5'
        }}
        blockButton
        button={!bIsLightTheme ? 'light' : 'dark'}
        onClick={changeThemeHandler}>Change Theme</Button>
      <div style={{
        margin: '0 36px'
      }}>
        <h1 className={classes.Title}>react-formalized</h1>
        <h2 className={classes.Header}>Examples</h2>
        <ul className={classes.List}>
          <li className={classes.Item}><a className={classes.Anchor} href='#elements'>Input Elements</a></li>
          <li className={classes.Item}><a className={classes.Anchor} href='#range-element'>Range Element (Similar to type Range)</a></li>
          <li className={classes.Item}><a className={classes.Anchor} href='#select-element'>Select Element</a></li>
          <li className={classes.Item}><a className={classes.Anchor} href='#numeric-element'>Numeric Element</a></li>
          <li className={classes.Item}><a className={classes.Anchor} href='#checkbox-elements'>Checkbox Elements (Similar to type Checkbox, Radio)</a></li>
          <li className={classes.Item}><a className={classes.Anchor} href='#form-element'>Form Element</a></li>
          <li className={classes.Item}><a className={classes.Anchor} href='#checkbox-form-example'>CheckboxGroup with Form Element example</a></li>
          <li className={classes.Item}><a className={classes.Anchor} href='#sign-in-example'>Sign in modal example</a></li>
        </ul>
      </div>
      <div className={classes.Examples}>
        <div style={{
          display: 'flex',
          flexFlow: 'column',
          width: '100%',
          margin: '0 auto 64px',
          justifyContent: 'center'
        }}>
          <Example title='Input Elements' id='elements'>
            <Input
              validation={{
                required: true,
                minLength: 4,
                maxLength: 10
              }}
              placeholder='Username' />
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
<Input
  validation={{
    required: true,
    minLength: 4,
    maxLength: 10
  }}
  placeholder='Username' />`}
            </SyntaxHighlighter>
            <Input
              type='email'
              validation={{
                minLength: 3
              }}
              placeholder='Email' />
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
<Input
  type='email'
  validation={{
    minLength: 3
  }}
  placeholder='Email' />`}
            </SyntaxHighlighter>
            <Input
              type='password'
              validation={{
                required: true,
                minLength: 4,
                maxLength: 10
              }}
              placeholder='Password' />
            <Input
              passwordHandler
              type='password'
              validation={{
                required: true,
                minLength: 4,
                maxLength: 10
              }}
              valueType='Password'
              placeholder='Password (with a show/hide toggle)' />
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
<Input
  type='password'
  validation={{
    required: true,
    minLength: 4,
    maxLength: 10
  }}
  placeholder='Password' />

<Input
  passwordHandler // Passing this prop will render the toggle, it's disabled on mobile for the time being though.
  type='password'
  validation={{
    required: true,
    minLength: 4,
    maxLength: 10
  }}
  valueType='Password' // For the validation messages.
  placeholder='Password (with a show/hide toggle)' />`}
            </SyntaxHighlighter>
            <Input
              type='textarea'
              placeholder='TextArea'
              elementConfig={{
                maxLength: 150
              }} />
            <Input
              type='textarea'
              placeholder='TextArea (2000 characters limit)'
              elementConfig={{
                maxLength: 2000
              }} />
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
<Input
  type='textarea'
  placeholder='TextArea'
  elementConfig={{
    maxLength: 150
  }} />
  
<Input
  type='textarea'
  placeholder='TextArea (2000 characters limit)'
  elementConfig={{
    maxLength: 2000
  }} />`}
            </SyntaxHighlighter>
            <Input
              disabled
              validation={{
                required: true,
                minLength: 4,
                maxLength: 10
              }}
              placeholder='Disabled' />
            <Input
              disabled
              type='textarea'
              placeholder='TextArea (Disabled)'
              elementConfig={{
                maxLength: 150
              }} />
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
<Input
  disabled
  validation={{
    required: true,
    minLength: 4,
    maxLength: 10
  }}
  placeholder='Disabled' />

<Input
  disabled
  type='textarea'
  placeholder='TextArea (Disabled)'
  elementConfig={{
    maxLength: 150
  }} />`}
            </SyntaxHighlighter>
          </Example>

          <Example title='Range Element' id='range-element'>
            <Range
              minValue='100'
              maxValue='350' />
            <Range
              step={65}
              minValue='125'
              maxValue='350' />
            <Range
              indicator
              value='325'
              minValue='200'
              maxValue='350' />
            <Range
              indicator
              step={25}
              value='99' />
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
<Range
  minValue='100'
  maxValue='350' />

<Range
  step={65}
  minValue='125'
  maxValue='350' />

<Range
  indicator
  value='325'
  minValue='200'
  maxValue='350' />

<Range
  indicator
  step={25}
  value='99' />`}
            </SyntaxHighlighter>
          </Example>

          <Example title='Select Element' id='select-element'>
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
            <Select
              disabled
              placeholder='Select (Disabled)'
              datalist={[
                'Option A',
                'Obtion B']} />
            <Select
              required
              placeholder='Select (Required, has validity)'
              datalist={[
                '',
                'Option A',
                'Obtion B']} />
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
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

<Select
  disabled
  placeholder='Select (Disabled)'
  datalist={[
    'Option A',
    'Obtion B']} />

<Select
  required
  placeholder='Select (Required, has validity)'
  datalist={[
    '',
    'Option A',
    'Obtion B']} />`}
            </SyntaxHighlighter>
          </Example>

          <Example title='Numeric Element (recommended only for small natural numbers - integers)' id='numeric-element'>
            <Numeric />
            <Numeric value={50} />
            <Numeric shouldNotType value={5} />
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
<Numeric />

<Numeric value={50} />

<Numeric shouldNotType value={5} />`}
            </SyntaxHighlighter>
          </Example>

          <Example title='Checkbox Elements' id='checkbox-elements'>
            <div className={classes.Divider}>Checkboxes:</div>
            <Checkbox checked label='Checkbox A (checked)' />
            <Checkbox label='Checkbox B' />
            <Checkbox multiple checked type='radio' label='Checkbox C, radio as checkbox.' />
            <Checkbox disabled label='Checkbox D (disabled)' />
            <div className={classes.Divider}>Radio inputs:</div>
            <Checkbox checked type='radio' label='Radio A' />
            <Checkbox disabled single type='radio' label='Radio B (disabled)' />
            <Checkbox type='radio' label='Radio C' />
            <Checkbox type='radio' label='Radio D' />
            <div className={classes.Divider}>Inside a checkbox group:</div>
            <CheckboxGroup name='checkbox-group'>
              <Checkbox disabled type='radio' label='Radio E (disabled)' />
              <Checkbox type='radio' label='Radio F' />
              <Checkbox type='radio' label='Radio G' />
            </CheckboxGroup>
            <div className={classes.Divider}>Bubbles as checkboxes:</div>
            <Checkbox type='bubble' label='Bubble A' />
            <Checkbox checked type='bubble' label='Bubble B' />
            <Checkbox type='bubble' label='Bubble C' />
            <div className={classes.Divider}>Bubbles as radio inputs:</div>
            <CheckboxGroup type='bubble' single name='bubble-group'>
              <Checkbox label='Bubble D' />
              <Checkbox label='Bubble F' />
              <Checkbox label='Bubble G' />
            </CheckboxGroup>
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
/**
* Default Checkboxes
*/
<Checkbox checked label='Checkbox A (checked)' />
<Checkbox label='Checkbox B' />
<Checkbox multiple checked type='radio' label='Checkbox C, radio as checkbox.' />
<Checkbox disabled label='Checkbox D (disabled)' />

/**
* Radio Checkboxes
*/
<div className={classes.Divider}>Radio inputs:</div>
<Checkbox checked type='radio' label='Radio A' />
<Checkbox disabled single type='radio' label='Radio B (disabled)' />
<Checkbox type='radio' label='Radio C' />
<Checkbox type='radio' label='Radio D' />
<div className={classes.Divider}>Inside a checkbox group:</div>

/**
* CheckboxGroup
*/
<CheckboxGroup name='checkbox-group'>
  <Checkbox disabled type='radio' label='Radio E (disabled)' />
  <Checkbox type='radio' label='Radio F' />
  <Checkbox type='radio' label='Radio G' />
</CheckboxGroup>

/**
* "Bubbles" Checkboxes
*/
<div className={classes.Divider}>Bubbles as checkboxes:</div>
<Checkbox type='bubble' label='Bubble A' />
<Checkbox checked type='bubble' label='Bubble B' />
<Checkbox type='bubble' label='Bubble C' />

/**
* Bubbles as radio inputs
*/
<CheckboxGroup type='bubble' single name='bubble-group'>
  <Checkbox label='Bubble D' />
  <Checkbox label='Bubble F' />
  <Checkbox label='Bubble G' />
</CheckboxGroup>`}
            </SyntaxHighlighter>
          </Example>

          <Example title='Form Element' id='form-element'>
            <div className={classes.Divider}>Form:</div>
            <Form
              onChange={onChangeHandler}
              onSubmit={onSubmitHandler} >
              <Input
                identifier='username'
                required
                validation={{
                  minLength: 3
                }}
                placeholder='Username' />
              <Input
                identifier='email'
                required
                type='email'
                validation={{
                  minLength: 3
                }}
                placeholder='Email' />
              <Input
                identifier='password'
                required
                type='password'
                validation={{
                  required: true,
                  minLength: 4,
                  maxLength: 10
                }}
                placeholder='Password' />
              <Select
                identifier='select'
                required
                placeholder='Select (Required, has validity)'
                datalist={[
                  '',
                  'Option A',
                  {
                    value: '35193BB0sk2F',
                    displayValue: 'Option B (custom value)'
                  }]} />
              <Input
                identifier='first_name'
                placeholder='First Name (Optional)' />
              <Select
                identifier='select_optional'
                placeholder='Select (Optional)'
                datalist={[
                  '',
                  'Option A',
                  {
                    value: '35193BB0sk2F',
                    displayValue: 'Option B (custom value)'
                  }]} />
              <Button
                type='submit'
                blockButton button='danger'>Sign up</Button>
            </Form>
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
const onChangeHandler = (formState) => {
  console.log('app onChangeHandler formState', formState)
}

const onSubmitHandler = (event, formState) => {
  event.preventDefault()
  window.alert(JSON.stringify(formState, null, 3))
}

<Form
  onChange={onChangeHandler}
  onSubmit={onSubmitHandler} >
  <Input
    identifier='username'
    required
    validation={{
      minLength: 3
    }}
    placeholder='Username' />
  <Input
    identifier='email'
    required
    type='email'
    validation={{
      minLength: 3
    }}
    placeholder='Email' />
  <Input
    identifier='password'
    required
    type='password'
    validation={{
      required: true,
      minLength: 4,
      maxLength: 10
    }}
    placeholder='Password' />
  <Select
    identifier='select'
    required
    placeholder='Select (Required, has validity)'
    datalist={[
      '',
      'Option A',
      {
        value: '35193BB0sk2F',
        displayValue: 'Option B (custom value)'
      }]} />
  <Input
    identifier='first_name'
    placeholder='First Name (Optional)' />
  <Select
    identifier='select_optional'
    placeholder='Select (Optional)'
    datalist={[
      '',
      'Option A',
      {
        value: '35193BB0sk2F',
        displayValue: 'Option B (custom value)'
      }]} />
  <button>Sign up</button>
</Form>

/**
* This is an example of formState:
*/

{
  isValid: true,
  email: {
    bIsInputValid: true,
    shouldValidate: true,
    value: "rmolinamir@gmail.com"
  },
  first_name: {
    bIsInputValid: false,
    shouldValidate: false,
    value: "Rob"
  },
  password: {
    bIsInputValid: true,
    shouldValidate: true,
    value: "123123"
  },
  select: {
    bIsInputValid: true,
    shouldValidate: true,
    value: "Option A"
  },
  select_optional: {
    bIsInputValid: true,
    shouldValidate: false,
    value: "35193BB0sk2F"
  },
  username: {
    bIsInputValid: true
    shouldValidate: true
    value: "rmolinamir"
  }
}`}
            </SyntaxHighlighter>
          </Example>

          <Example title='CheckboxGroup with a Form Element Example' id='checkbox-form-example'>
            <Form
              onChange={onChangeHandler}
              onSubmit={onSubmitHandler} >
              <div className={classes.Divider}>Which ice cream flavours do you like?</div>
              <CheckboxGroup identifier='favoritePet' type='bubble' required name='favorite-ice-creams'>
                <Checkbox value='FLAV_01' label='Chocolate' />
                <Checkbox value='FLAV_02' label='Vanilla' />
                <Checkbox value='FLAV_03' label='Strawberry' />
              </CheckboxGroup>
              <Button
                type='submit'
                blockButton button='danger'>Submit</Button>
            </Form>
            <SyntaxHighlighter language='javascript' style={atomDark}>{`
const onChangeHandler = (formState) => {
  console.log('app onChangeHandler formState', formState)
}

const onSubmitHandler = (event, formState) => {
  event.preventDefault()
  window.alert(JSON.stringify(formState, null, 3))
}

<Form
  onChange={onChangeHandler}
  onSubmit={onSubmitHandler} >
  <CheckboxGroup identifier='favoritePet' type='bubble' required name='favorite-ice-creams'>
    <Checkbox value='FLAV_01' label='Chocolate' />
    <Checkbox value='FLAV_02' label='Vanilla' />
    <Checkbox value='FLAV_03' label='Strawberry' />
  </CheckboxGroup>
  <button>Submit</button>
</Form>

/**
* This is an example of formState:
*/

"favorite-ice-creams": {
    shouldValidate: true,
    value: {
        chocolate: {
          checked: true,
          value: "FLAV_01"
        },
        vanilla: {
          checked: true,
          value: "FLAV_02"
        },
        strawberry: {
          checked: false,
          value: "FLAV_03"
        }
      },
    bIsInputValid: true
  },
  isValid:true
}`}
            </SyntaxHighlighter>
          </Example>

          <Example title='CheckboxGroup with a Form Element Example' id='sign-in-example'>
            <Modal
              open={bIsModalOpen}
              closeModal={() => setIsModalOpen(false)}>
              <Provider>
                <Form
                  onChange={onChangeHandler}
                  onSubmit={onSubmitHandler}>
                  <div className={classes.Divider}>Sign in</div>
                  <Input
                    identifier='email'
                    required
                    type='email'
                    validation={{
                      required: true,
                      minLength: 3
                    }}
                    placeholder='Email' />
                  <Input
                    identifier='password'
                    required
                    type='password'
                    validation={{
                      required: true,
                      minLength: 4
                    }}
                    placeholder='Password' />
                  <Button
                    type='submit'
                    blockButton button='success'>Sign in</Button>
                </Form>
              </Provider>
              <SyntaxHighlighter language='javascript' style={atomDark}>{`
<Modal
  open={bIsModalOpen}
  closeModal={() => setIsModalOpen(false)}>
  <Form
    onChange={onChangeHandler}
    onSubmit={onSubmitHandler}>
    <Input
      identifier='email'
      required
      type='email'
      validation={{
        required: true,
        minLength: 3
      }}
      placeholder='Email' />
    <Input
      identifier='password'
      required
      type='password'
      validation={{
        required: true,
        minLength: 4
      }}
      placeholder='Password' />
    <button>Sign in</button>
  </Form>
</Modal>`}
              </SyntaxHighlighter>
            </Modal>
            <div className={classes.Divider}>Example sign in modal</div>
            <Button
              blockButton
              button='danger'
              onClick={() => setIsModalOpen(true)}>Sign in</Button>
          </Example>
        </div>
      </div>
    </div>
  )
}

export default withContext(app, Context, Provider)
