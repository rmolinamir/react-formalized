interface IValidation { 
  status: boolean, 
  message?: string 
}

/**
 * Evaluates the rule. If not met then returns a validation message.
 */
const evaluate = (evaluation: boolean, message: string) => {
  const validation: IValidation = {
    status: evaluation
  }
  if (!evaluation) {
    validation.message = message
  }
  return validation
}

/**
 * `checkValidity` will evaluate the validity of the value depending on its parameters and rules, only if a value exists.
 * @param value Input value.
 * @param rules Input rules selected by the developer.
 * @param valueType Literal type of the value, e.g. First Name, Last Name, etc. Used for validation messages.
 */
export const checkValidity = (value: value, rules: IInputValidation | undefined, valueType?: string): IValidation => {
  let validation: IValidation = {
    status: false
  }
  if (rules && value) {
    /**
     * Any custom rules passed as props will be evaluated.
     */
    if (rules.customRules) {
      const { customRules } = rules
      for (let key in customRules) {
        const rule = customRules[key]
        validation.status = rule.evaluation(value)
        if (!validation.status) {
          validation.message = rule.message
          return validation
        }
      }
    }
    /**
     * The **required** rule evaluates if the input value is not empty.
     */
    if (rules.required) {
      value = String(value)
      validation = evaluate(value.trim() !== '', `Please enter a valid ${valueType || 'value'}.`)
      if (!validation.status) return validation
    }
    /**
     * Both the `minLength` and `maxLength` rules evaluate the length of the input's value type string.
     * Validation message depends on which of them are `true`, or both if both are `true`.
     */
    if (rules.minLength || rules.maxLength) {
      value = String(value)
      const { minLength, maxLength } = rules
      if (minLength && maxLength) {
        validation = evaluate(value.length >= minLength && value.length <= maxLength, `${valueType || 'Value'} must be between ${minLength} and ${maxLength} characters.`)
      } else if (minLength) {
        validation = evaluate(value.length >= minLength, `${valueType || 'Value'} must have at least ${minLength} characters.`)
      } else if (maxLength) {
        validation = evaluate(value.length <= maxLength, `${valueType || 'Value'} must have no more than ${maxLength} characters.`)
      }
      if (!validation.status) return validation
    }
    /**
     * The `email` rule evaluates if the value include the following characters:
     *  1. `@` symbol.
     *  2. `.` dot symbol.
     */
    if (rules.email) {
      value = String(value)
      validation = evaluate(value.includes('@') && value.includes('.'), `Please enter a valid email address.`)
      if (!validation.status) return validation
    }
    /**
     * The `number` rule evaluates if the value is a number or not.
     */
    if (rules.number) {
      value = Number(value)
      validation = evaluate(!isNaN(value), `Please enter a valid number.`)
      if (!validation.status) return validation
    }
  }
  return validation
}