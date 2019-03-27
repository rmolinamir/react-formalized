/**
 * Numeric, an input of type `number` that handles natural numbers **only** (`integers`).
 */

interface INumericProps {
  onChange?: (value: number) => void
  value?: number
  minValue?: number
  maxValue?: number
  style?: React.CSSProperties
  shouldNotType?: boolean
  /**
   * Theme context.
   */
  _context: IInputContext
}