import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { TickProps } from './Tick'

export const ThinTick = ({ color = colorsV3.gray900 }: TickProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="15"
    viewBox="0 0 20 15"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.8818 1.51146L8.15214 14.0915L0.791992 6.41706L1.87459 5.3788L8.13679 11.9084L18.7847 0.488525L19.8818 1.51146Z"
      fill={color}
    />
  </svg>
)
