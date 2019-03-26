# react-formalized

> Collection of pre-styled JSX elements based on the HTML Form Elements. Offers an easy way to collect form and input values.

[![NPM](https://img.shields.io/npm/v/react-formalized.svg)](https://www.npmjs.com/package/react-formalized) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

---

## Install

```bash
npm install --save react-formalized
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
  /**
   * Context, Provider, and themes, are used to manage CSS variables.
   */
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

Based on the HTML `<input>` element, this component accepts data from the user. It can be of type `text` (by default), `email`, `password`, and `textarea`. The Input component is already programmed to handle many things such as validation and CSS styling with support of CSS variables.

- The `email` type component will always check validity for email and let the user know if the value is valid or not.
- The `password` can switch between type `text` and `password` to display the password if the programmer allows for it.
- The `textarea` will auto expand depending on how many characters are typed, it can also be manually expanded, spellcheck is enabled by default.

This component accepts the following props:

| Props | Type | Default | Definition |
|:------------------------:|:---------------------:|:--------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| type | `string` | `'text'` | The input will be rendered based on the respective types previously mentioned. If the type does not match any of the available inputs, a `console.warn` will trigger. |
| identifier | `string` | Generated string based on props. | The identifier is used to let the Form component assign a namespace for the input values, more info on the Form section. |
| required | `boolean` | `false` | HTML input required attribute. |
| disabled | `boolean` | `false` | HTML input disabled attribute. Also provides additional styling for the component, to better indicate it's disabled. |
| validation | *validation `object` | Depends on type and if required. | Validation rules, there are some pre-set rules such as minimum and maximum amount of values, required, email, number, and custom rules. More detailed information above. Will displayed validation messages. |
| valueType | `string` | Placeholder to lower case, or undefined if placeholder is undefined. | Value type to indicate what is being handled in the validation messages. Typically used when the placeholder is not appropriate for the validation messages. |
| elementConfig | *elementConfig `object` | Depends on type. | HTML input common attributes. [More information available in the MDN official documentation about inputs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes). |
| value | *value | Empty string (`''`). | Input value. |
| placeholder | `string` | Undefined. | Placeholder displayed on the label element tag. |
| className | `string` | Default aesthetic class (margin, and padding). | CSS class name string. |
| onChange | *onChange `function` | Undefined. | Callback that executes after the input change event is fired. |
| valid | `boolean` | `false` | Boolean value used by the Form to calculate validity of all inputs. It depends on the validation rules and if the input is required. |
| touched | `boolean` | `false` | Determines if the label should be active initially or not. Rarely used. |
| minRows | `number` | `3` | Minimum rows for the `textarea` input. |
| passwordHandler | `string` | Undefined. | Renders a button that displays the password, basically switches the input from type `text` to type `password`, note that it must be of type `password` initially for it to work. **Note that it won't display on mobile**. |
| passwordHandlerClassName | `string` | Bold font-weight, margin. | CSS class name for the passwordHandler button. |

---

## Range

Heavily based on the HTML `<input>` element of type range. To quote the MDN, this component lets the user specify a numeric value which must be no less than a given value, and no more than another given value. It supports the step, minimum and maximum values, and of course initial value.

This component accepts the following props. Note that the Range component `onChange` prop is a function defined as:

```ts
type onChange = (value: rangeValue) => void;
```

| Props | Type | Default | Definition |
|:------------------:|:------------------------:|:------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------:|
| indicator | `boolean` | `false` | A small indicator component will be rendered next to the range slider that indicates the current value if `true`. |
| indicatorClassName | `string` | Default CSS (dark background, white color, arrow pointing to the range input). | The indicator component `className`. |
| step | `string` | `'1'` | The stepping interval, used both for user interface and validation purposes. |
| value | ` string`   or ` number` | Average of minValue and maxValue. | The HTML input value attribute. |
| minValue | ` string`   or ` number` | `0` | The minimum permitted value. |
| maxValue | `string`  or `number` | `100` | The maximum permitted value. |
| onChange | *onChange `function` | Undefined. | Callback that executes after the input change event is fired. |

---

## Select

Based on the HTML `<select>` element with some differences. The main difference is that in actuality it's a common input of type `'text'`, and the list is rendered through a React state. It's easy to set-up since the options are passed as an array, and you may also set up values with different display names. It can also validate.

Closing the list is user friendly. An user may click on the background, on the arrow button, or press the ESC key if not on a mobile device to close it.

The `<Select />` datalist prop type is defined as:

```ts
// props.datalist
type datalist = (value | ISelectValue)[]

// props.datalist
interface ISelectValue {
  value: value
  displayValue: string | number
}
```

It is based on the HTML `<datalist>` element that contains a set of  `<option>` elements which represent the values available for other controls. Except, instead of a set of `<option>` elements, the datalist is an array of options.

**What this means is that the datalist is an `array` that accepts a `value` for each array item (options), or an object structured like the `ISelectValue` interface shown above**. The `displayValue` will be the value displayed on the input, but the `value` will be the value returned from the `onChange` callbacks. If `displayValue` is null it will simply fallback to `value`.

`<Select />` accepts the following props:

| Props | Type | Default | Definition |
|:-----------------------:|:-----------------------------:|:-----------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| identifier | `string` | Generated string based on props. | The identifier is used to let the Form component assign a namespace for the input values, more info on the Form section. |
| value | *value | Empty string `('')`. | Input value. |
| datalist | (*value or *datalist `object`)[] | [] | Based on the HTML `<datalist>` element that contains a set of  `<option>` elements which represent the values available for other controls. Each array item will be an available option, for more information about the value type options, see the paragraphs above for an explanation. |
| onChange | *onChange `function` | Undefined. | Callback that executes after the input change event is fired. |
| elementConfig | *elementConfig  `object` | Undefined. | HTML input common attributes. [More information available in the MDN official documentation about inputs ](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes ). |
| disabled | `boolean` | Undefined. | HTML input disabled attribute. Also provides additional styling for the component, to better indicate it's disabled. |
| placeholder | `string` | Undefined. | Placeholder displayed on the label element tag. |
| required | `boolean` | Undefined. | HTML input required attribute. |
| shouldValidate | `boolean` | If `required` is true then `shouldValidate` is true, otherwise `false`. | Determines if the component validates the value or not. |
| shouldCloseListOnChange | `boolean` | `true` | Determines if the list should close after an option is selected, defaults to `true`. |

---

## Numeric

---

## Checkbox

---

## CheckboxGroup

---

## Form

---

## Context

---

## Provider

---

## License

MIT © [author](https://github.com/author)
