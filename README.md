# react-formalized

> Collection of pre-styled JSX elements based on the HTML Form Elements. Offers an easy way to collect form and input values.

[![NPM](https://img.shields.io/npm/v/react-formalized.svg)](https://www.npmjs.com/package/react-formalized) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

---

## Install

```bash
npm install --save react-png-modal
```

---

## Showcase

### [Showcase hosted on CodeSandbox](https://codesandbox.io/s/6l4w83xqpk)

#### Input Elements

![Input Elements](https://i.imgur.com/Pnw7QEo.gif)

#### Checkbox Elements

![Checkbox Elements](https://i.imgur.com/vzyTALz.gif)

#### Select Element

![Select Element](https://i.imgur.com/dfcc4C1.gif)

#### Range Element

![Range Element](https://i.imgur.com/lYjmtiE.gif)

#### Numeric Element

![Numeric Element](https://i.imgur.com/iLav2Jg.gif)

---

## Instructions

This package contains multiple exports, each used differently but similarly. Below you will find instructions for each element and their respective `props`. Here's a list of all the possible elements you may import:

```js
import {
  Input,
  Select,
  Range,
  Checkbox,
  CheckboxGroup,
  Numeric,
  Form,
  Context,
  Provider,
  defaultTheme,
  darkTheme
} from 'react-formalized'
```

### **Note:**

Remember there are examples displayed on the showcase with their respective code snippters. The following type declarations are referenced in some of the previously listed elements' sections, here are their type definitions:

#### Input value attribute type

```ts
type value = string | number | string[] | undefined;
```

#### Input component validation object structure

```ts
interface IInputValidation {
  customRules?: ICustomRulesValidation
  required?: boolean
  email?: boolean
  number?: boolean
  minLength?: number
  maxLength?: number
}
```

Custom rule object structure:

```ts
interface ICustomRuleValidation {
  evaluation: (value: value) => boolean
  message?: string
}
```

#### Input component elementConfig prop

```ts
interface IInputConfig {
  autoCapitalize?: string
  autoComplete?: string
  autoCorrect?: string
  autoFocus?: boolean
  autoSave?: string
  cols?: number
  disabled?: boolean
  form?: string
  list?: string
  maxLength?: number
  minLength?: number
  name?: string
  readOnly?: boolean
  rows?: number
  tabIndex?: number
  type?: string
  defaultValue?: string | string[]
  wrap?: string
  /**
   * Global HTML Props
   */
  spellCheck?: boolean
}
```

#### Input onChange callback prop, fired after the input change events

```ts
type onChange = (identifier: string, value: value, valid: boolean) => void;
```

---

## Input

Based on the HTML `<input>` element, this component accepts data from the user. It can be of type `text` (by default), `email`, `password`, and `textarea`. It accepts the following props:

| Props | Type | Default | Definition |
|:------------------------:|:---------------------:|:--------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| type | `string` | `'text'` | The input will be rendered based on the respective types previously mentioned. If the type does not match any of the available inputs, a `console.warn` will trigger. |
| identifier | `string` | Generated string based on props. | The identifier is used to let the Form component assign a namespace for the input values, more info on the Form section. |
| required | `boolean` | `false` | HTML input required attribute. |
| validation | *validation `object` | Depends on type and if required. | Validation rules, there are some pre-set rules such as minimum and maximum amount of values, required, email, number, and custom rules. More detailed information above. Will displayed validation messages. |
| valueType | `string` | Placeholder to lower case, or undefined if placeholder is undefined. | Value type to indicate what is being handled in the validation messages. Typically used when the placeholder is not appropriate for the validation messages. |
| elementConfig | *elementConfig `object` | Depends on type. | HTML input common attributes. [More information available in the MDN official documentation about inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes). |
| value | *value | Empty string (`''`). | Input value. |
| placeholder | `string` | Undefined. | Placeholder displayed on the label element tag. |
| className | `string` | Default aesthetic class (margin, and padding). | CSS class name string. |
| onChange | *onChange `function` | Undefined. | Callback that executes after the input change event is fired. |
| valid | `boolean` | `false` | Boolean value used by the Form to calculate validity of all inputs. It depends on the validation rules and if the input is required. |
| touched | `boolean` | `false` | Determines if the label should be active initially or not. Rarely used. |
| minRows | `number` | 3 | Minimum rows for the `textarea` input. |
| passwordHandler | `string` | Undefined. | Renders a button that displays the password, basically switches the input from type `text` to type `password`, note that it must be of type `password` initially for it to work. **Note that it won't display on mobile**. |
| passwordHandlerClassName | `string` | Bold font-weight, margin. | CSS class name for the passwordHandler button. |

---

## Select

---

## Range

---

## Checkbox

---

## CheckboxGroup

---

## Numeric

---

## Form

---

## Context

---

## Provider

---

## License

MIT © [author](https://github.com/author)
