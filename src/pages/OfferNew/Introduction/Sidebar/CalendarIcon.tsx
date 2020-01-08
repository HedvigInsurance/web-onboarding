import * as React from 'react'

interface CalendarIconProps {
  color: string
}

export const CalendarIcon: React.FC<CalendarIconProps> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" fillOpacity=".01" d="M0 0h24v24H0z" />
      <path
        fill={color}
        fillRule="nonzero"
        d="M19 9V5h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1v4h14zm-6-2h-2V5h2v2z"
      />
      <path
        fill={color}
        fillRule="nonzero"
        d="M20 9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h16zm-1 2H5v8h14v-8z"
      />
      <circle cx="16.5" cy="13.5" r="1.5" fill={color} />
      <path fill={color} d="M7 3h2v4H7zM15 3h2v4h-2z" />
    </g>
  </svg>
)
