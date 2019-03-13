interface IValidation { 
  status: boolean, 
  message: string 
}

export const checkValidity = (value: string | number | string[] | undefined, rules: IInputValidation | undefined, valueType: string): IValidation => {
  const validation: IValidation = {
    status: false,
    message: `Please enter valid a ${valueType}.`
  }
  if (rules && value) {
      if (typeof value === 'string') {
        if (rules.required) {
          validation.status = value.trim() !== ''
          validation.message = `Please enter valid a ${valueType}.`
          if (!validation.status) { return validation }
        }
        if (rules.minLength || rules.maxLength) {
          const { minLength, maxLength } = rules
          if (minLength && maxLength) {
            validation.status = value.length >= minLength && value.length <= maxLength
            validation.message = `${valueType} must be between ${minLength} and ${maxLength} characters.`
          } else if (minLength) {
            validation.status = value.length >= minLength
            validation.message = `${valueType} must have at least ${minLength} characters.`
          } else if (maxLength) {
            validation.status = value.length <= maxLength
            validation.message = `${valueType} must have no more than ${maxLength} characters.`
          }
          if (!validation.status) { return validation }
        }
        if (rules.email) {
          validation.message = `Please enter a valid email address.`
          validation.status = value.includes('@') && value.includes('.')
          if (!validation.status) { return validation }
        }
      } else if (typeof value === 'number') {
        if (rules.number) {
          validation.status = !isNaN(value)
          if (!validation.status) { return validation }
        }
      }
  }
  return validation
}