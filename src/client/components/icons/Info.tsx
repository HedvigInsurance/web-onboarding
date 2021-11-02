import React from 'react'
import { IconRoot, IconRootProps } from './IconRoot'

export const InfoIcon: React.FC<IconRootProps> = (props) => (
  <IconRoot viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd">
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
      <path
        fill="currentColor"
        d="M8.558 12V6.228H7.442V12h1.116zM7.19 4.044c0 .444.36.804.804.804a.81.81 0 1 0-.804-.804z"
      />
    </g>
  </IconRoot>
)
