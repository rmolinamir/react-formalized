import * as React from 'react'
const { useState } = React
// JSX
import Checkmark from './BulletItems/bullet-checkmark-no-bg'
import Hide from './Interface/hide'
import Show from './Interface/show'
import Verification from './Interface/verification-checkmark'
import Warning from './Interface/warning-checkmark'
import Minus from './MathRelated/minus-symbol'
import Plus from './MathRelated/plus-symbol'

interface ISVGProps {
  icon: string,
  style?: React.CSSProperties,
  className?: string,
  size?: string,
  fill?: string,
  stroke?: string,
  strokeWidth?: number,
  /**
   * Custom props for SVG icons with clipPaths, animations or gradient colors.
   */
  gradient?: string[],
  animationFill?: string[],
  clipPathFill?: number // Number from 0 to 1.
}

const svgKeys = {
  'bullet-checkmark-no-bg': Checkmark,
  'hide': Hide,
  'show': Show,
  'verification-checkmark': Verification,
  'warning-checkmark': Warning,
  'minus-symbol': Minus,
  'plus-symbol': Plus
}

const Icon = (props: ISVGProps) => {
  const [bIsNotFound, setIsNotFound] = useState(false)
  const svgSize = props.size || '1em'
  let className; if (props.className) { className = props.className };

  /**
   * Custom props for SVG icons with animations or gradient colors.
   */
  const { ...svgProps } = props

  const DynamicLoader = () => {
    const Component = svgKeys[props.icon]
    /**
     * If no component was found between props, then return null and set state to not found.
     */
    if (!Component) {
      console.error('No SVG was found that match your query.')
      setIsNotFound(true)
      return null
    }
    return (
      <Component {...svgProps} />
    )
  }

  if (bIsNotFound) { return null }

  return (
    <svg
      fill={props.fill ? props.fill : 'currentColor'}
      stroke={props.stroke ? props.stroke : 'currentColor'}
      strokeWidth={props.strokeWidth ? props.strokeWidth : 0}
      className={className}
      style={{ ...props.style }}
      viewBox='0 0 100 100'
      preserveAspectRatio='none'
      height={svgSize}
      width={svgSize}>
      <DynamicLoader />
    </svg>
  )
}

const SVG = (props: ISVGProps) => {
  return <Icon {...props} />
}

export default React.memo(SVG)