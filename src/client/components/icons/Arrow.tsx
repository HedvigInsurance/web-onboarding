import React from 'react'
import { IconRoot, IconRootProps } from './IconRoot'

type Props = IconRootProps & {
  direction: 'forward' | 'backward'
}

export const Arrow = ({ direction, ...rest }: Props) => (
  <IconRoot {...rest} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      transform={direction === 'backward' ? 'rotate(180 12 12)' : ''}
      d="M13.5303 3.46967L22.0607 12L13.5303 20.5303L12.4697 19.4697L19.1893 12.75H3V11.25L19.1893 11.25L12.4697 4.53033L13.5303 3.46967Z"
    />
  </IconRoot>
)
