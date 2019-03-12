import * as React from 'react'

const defaultConfig = {
    type: 'text',
    placeholder: 'Enter text',
    autoComplete: 'off',
    autoCorrect:"off",
    autoCapitalize:"off",
    spellCheck:"false"
}

const text = (props: any) => {
  // console.log('text', props)
  return (
    <input
      type='text'
    // autoCapitalize
    // autoComplete
    // autoCorrect
    // autoFocus
    // autoSave
    // disabled
    // form
    // list
    // name
    // readOnly
    // required
    // tabIndex
    // type
    // defaultValue
    // value
      className={props.className} 
      // style={props.elementConfig.disabled ? { cursor: 'not-allowed' } : null}
      {...{ 
        ...defaultConfig, 
        ...props.elementConfig 
      }} 
      required={props.required}
      valid={props.valid.toString()}
      value={props.value}
      onChange={props.onChange} />
  )
}

export default text
