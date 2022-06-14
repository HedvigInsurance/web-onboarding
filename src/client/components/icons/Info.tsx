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

export const InfoIconFilled = (props: IconRootProps) => (
  <IconRoot viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 7.99999C15 11.866 11.866 15 8.00002 15C4.13402 15 1 11.866 1 7.99999C1 4.13399 4.13402 0.999969 8.00002 0.999969C11.866 0.999969 15 4.13399 15 7.99999ZM7.37503 12V7H8.62503V12H7.37503ZM8.00003 5.5C8.55232 5.5 9.00003 5.05228 9.00003 4.5C9.00003 3.94772 8.55232 3.5 8.00003 3.5C7.44775 3.5 7.00003 3.94772 7.00003 4.5C7.00003 5.05228 7.44775 5.5 8.00003 5.5Z"
      fill="currentColor"
    />
  </IconRoot>
)
