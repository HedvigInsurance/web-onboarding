import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { IconRoot, IconRootProps } from './IconRoot'

export const UnselectedOptionCircle: React.FC<IconRootProps> = (props) => (
  <IconRoot {...props} viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0.5"
      y="0.5"
      width="21"
      height="21"
      rx="10.5"
      stroke="currentColor"
      fill="none"
    />
  </IconRoot>
)

UnselectedOptionCircle.defaultProps = {
  color: colorsV3.gray500,
}
