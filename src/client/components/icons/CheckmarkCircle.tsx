import React from 'react'
import { IconRoot, IconRootProps } from './IconRoot'

export const CheckmarkCircle: React.FC<IconRootProps> = (props) => (
  <IconRoot {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.934 16.26l6.741-7.062-.986-.942-5.755 6.03-3.077-3.224-.987.941 4.064 4.257z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 .41C5.599.41.41 5.598.41 12S5.598 23.59 12 23.59 23.59 18.402 23.59 12 18.402.41 12 .41zM1.773 12C1.773 6.352 6.352 1.773 12 1.773c5.648 0 10.227 4.579 10.227 10.227 0 5.648-4.579 10.227-10.227 10.227-5.648 0-10.227-4.579-10.227-10.227z"
    />
  </IconRoot>
)
