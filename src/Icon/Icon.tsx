import * as React from 'react'
// CSS
import classes from './Icon.module.css'
// JSX
// import { Icon } from 'react-svg-library'
import Icon from './SVG/SVG'

interface IIconProps {
  valid: boolean
  touched: boolean
}

const icon = (props: IIconProps) => {
  const [icon, setIcon] = React.useState<JSX.Element>()
  const [iconClasses, setIconClasses] = React.useState<string[]>([classes.Icon])

  const { valid, touched } = props

  React.useEffect(() => {
    if (touched) {
      if (valid) {
        setIconClasses([classes.Icon, classes.Valid])
        setIcon(<Icon size='0.9em' icon='verification-checkmark' fill='#28a745' />)
      } else {
        setIconClasses([classes.Icon, classes.Invalid])
        setIcon(<Icon size='0.9em' icon='warning-checkmark' fill='#dc3545' />)
      }
    } else {
      const newIconClasses:string[] = [...iconClasses, classes.FadeOut]
      setIconClasses(newIconClasses)
    }
  }, [valid, touched])

  return (
    <span className={iconClasses.join(' ')}>
      {icon}
    </span>
  )
}

export default React.memo(icon)
