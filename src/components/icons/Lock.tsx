import { colorsV3 } from '@hedviginsurance/brand/dist'
import * as React from 'react'

export const Lock: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10 13"
    width={18}
    height={18}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M-5-3h20v20H-5z" />
      <path
        d="M7.375 3.857c0-1.226-1.057-2.232-2.375-2.232-1.263 0-2.286.924-2.37 2.08l-.005.152V6h-1.25V3.857C1.375 1.927 3.005.375 5 .375c1.931 0 3.52 1.453 3.62 3.297l.005.185V6H9a1 1 0 011 1v5a1 1 0 01-1 1H1a1 1 0 01-1-1V7a1 1 0 011-1h6.375V3.857z"
        fill={colorsV3.gray500}
      />
    </g>
  </svg>
)
