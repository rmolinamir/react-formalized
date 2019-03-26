

/**
 * Default theme for CSS variables & theme color.
 */
export const defaultTheme: ITheme = {
  general: {
    '--my-highlight-color': '#1EA3CC',
    '--my-icon-color': '#FFF',
  },
  input: {
    '--input-border-radius': '4px',
    '--input-border-color': '#EBEBEB',
    '--input-background-color': '#FAFBFC',
    '--input-focused-color': '#FFF',
    '--input-label-color': '#A4A4A4',
    '--input-valid-color': '#28A745',
    '--input-invalid-color': '#DC3545'
  },
  range: {
    '--range-progressbar-background-color': '#EBEBEB',
    '--range-indicator-background-color': '#484848',
    '--range-indicator-color': '#FFF',
  },
  checkbox: {
    '--checkbox-color': '#FFF',
    '--checkbox-hover-color': '#CCC',
    '--checkbox-animation-duration': '200ms',
    '--checkbox-background-color': '#E6E6E6',
  }
}

/**
 * Dark theme.
 */
export const darkTheme: ITheme = {
  general: {
    '--my-highlight-color': '#E87C03',
    '--my-icon-color': '#484848'
  },
  input: {
    '--input-border-radius': '4px',
    '--input-border-color': '#EBEBEB',
    '--input-background-color': '#383838',
    '--input-focused-color': '#2F2F2F',
    '--input-label-color': '#C4C4C4',
    '--input-valid-color': '#E87C03',
    '--input-invalid-color': '#E87C03'
  },
  range: {
    '--range-progressbar-background-color': '#2F2F2F',
    '--range-indicator-background-color': '#2F2F2F',
    '--range-indicator-color': '#FFF',
  },
  checkbox: {
    '--checkbox-color': '#FFF',
    '--checkbox-hover-color': '#383838',
    '--checkbox-animation-duration': '200ms',
    '--checkbox-background-color': '#2F2F2F'
  }
}