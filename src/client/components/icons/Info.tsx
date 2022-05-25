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
      d="M14 7.00002C14 10.866 10.866 14 7.00002 14C3.13402 14 0 10.866 0 7.00002C0 3.13402 3.13402 0 7.00002 0C10.866 0 14 3.13402 14 7.00002ZM6.37503 11V6.00003H7.62503V11H6.37503ZM7.00003 4.50003C7.55232 4.50003 8.00003 4.05232 8.00003 3.50003C8.00003 2.94775 7.55232 2.50003 7.00003 2.50003C6.44775 2.50003 6.00003 2.94775 6.00003 3.50003C6.00003 4.05232 6.44775 4.50003 7.00003 4.50003Z"
      fill="currentColor"
    />
  </IconRoot>
)
