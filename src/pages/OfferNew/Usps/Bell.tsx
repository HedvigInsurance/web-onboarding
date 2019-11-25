import * as React from 'react'

export const Bell: React.FunctionComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 80 80"
  >
    <g fill="none" fillRule="evenodd">
      <path fill="#141033" d="M0 0h80v80H0z" opacity=".01" />
      <path
        stroke="#9B9BAA"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M35 23h10c16.569 0 30 13.431 30 30H5c0-16.569 13.431-30 30-30z"
      />
      <path
        stroke="#9B9BAA"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M11 48c0-1.507 1.553-7.162 5-11.324 3.585-4.327 9.108-7.15 11.25-7.926"
      />
      <rect
        width="76"
        height="10"
        x="2"
        y="57"
        stroke="#9B9BAA"
        strokeWidth="1.5"
        rx="4"
      />
      <path
        stroke="#9B9BAA"
        strokeWidth="1.5"
        d="M18 53h44v4H18zM32.5 14h15v5h-15zM35 19h10v4H35z"
      />
    </g>
  </svg>
)
