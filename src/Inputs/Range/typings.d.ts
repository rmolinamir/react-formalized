/**
 * Range, an input of type `range`.
 */

/* Range value type. */
type rangeValue = string | number | undefined;

interface IRangeProps extends IInputConfig {
  indicator: boolean
  indicatorClassName: string
  step: string
  value: rangeValue
  minValue: rangeValue
  maxValue: rangeValue
  onChange: (value: rangeValue) => void
  /**
   * Theme context.
   */
  _context: IInputContext
}