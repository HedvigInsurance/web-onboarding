import * as React from 'react'

export const CircleTick: React.FC<{ color?: string }> = ({
  color = '#fff',
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
    <g transform="translate(1 1)" fill="none" fillRule="evenodd">
      <circle stroke={color} cx="12" cy="12" r="12" />
      <path
        fill={color}
        d="M9.646 15.322l-3.32-3.357L5.2 13.104 9.646 17.6 19.2 7.94 18.073 6.8z"
      />
    </g>
  </svg>
)
