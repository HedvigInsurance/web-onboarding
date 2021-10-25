import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { IconRoot, IconRootProps } from './IconRoot'

export const ChevronDown: React.FC<IconRootProps> = (props) => (
  <IconRoot {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 14.9393L4.53033 7.46967L3.46967 8.53033L12 17.0607L20.5303 8.53033L19.4697 7.46967L12 14.9393Z"
      fill="currentColor"
    />
  </IconRoot>
)

ChevronDown.defaultProps = {
  color: colorsV3.gray500,
}
