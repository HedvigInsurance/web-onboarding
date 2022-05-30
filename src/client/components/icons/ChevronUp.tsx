import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { IconRoot, IconRootProps } from './IconRoot'

export const ChevronUp = (props: IconRootProps) => (
  <IconRoot {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 9.06066L4.53033 16.5303L3.46967 15.4697L12 6.93934L20.5303 15.4697L19.4697 16.5303L12 9.06066Z"
      fill="currentColor"
    />
  </IconRoot>
)

ChevronUp.defaultProps = {
  color: colorsV3.gray500,
}
