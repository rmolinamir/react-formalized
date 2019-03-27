
/**
 * Context
 */

interface ITheme {
  general: IThemeGeneral
  input: IThemeInput
  range: IThemeRange
  checkbox: IThemeCheckbox
}

/**
 * Provider
 */

interface IProviderProps extends ITheme {
  children: React.ReactChildren
}

/**
 * General
 */

interface IInputContext {
  theme: ITheme
  setTheme: (CSSProps: ITheme) => void
}

interface IThemeGeneral {
  '--my-highlight-color': string
  '--my-icon-color': string
}

/**
 * Input.
 */
interface IThemeInput {
  '--input-border-radius': string
  '--input-border-color': string
  '--input-background-color': string
  '--input-focused-color': string
  '--input-label-color': string
  '--input-valid-color': string
  '--input-invalid-color': string
}

/**
 * Range.
 */
interface IThemeRange {
  '--range-progressbar-background-color': string
  '--range-indicator-background-color': string
  '--range-indicator-color': string
}

/**
 * Checkbox.
 */
interface IThemeCheckbox {
  '--checkbox-color': string
  '--checkbox-hover-color': string
  '--checkbox-animation-duration': string
  '--checkbox-background-color': string
}