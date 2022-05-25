import React from 'react'
import { IconRoot, IconRootProps } from './IconRoot'

export const ChevronUp: React.FC<IconRootProps> = (props) => (
  <IconRoot {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 15L12 9L6 15"
      stroke="currentColor"
      strokeWidth="1.25"
    />
  </IconRoot>
)
