import React from 'react'

export const WarningTriangle = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.9611 0.833374C6.51858 0.833374 6.08395 0.951133 5.70235 1.17466C5.32073 1.39821 5.00589 1.71945 4.79097 2.10538L0.82878 9.47087C0.612798 9.84556 0.499336 10.2703 0.500034 10.7026C0.500736 11.1378 0.617107 11.565 0.837131 11.9408C1.05714 12.3166 1.37289 12.6276 1.75212 12.8427C2.13083 13.0576 2.55961 13.1692 2.99524 13.1667L11.036 13.1667L11.0402 13.1667C11.4733 13.163 11.898 13.0466 12.2721 12.8289C12.6462 12.6111 12.9566 12.2995 13.1722 11.9248C13.3879 11.55 13.501 11.1254 13.5 10.6933C13.4991 10.2634 13.3853 9.84143 13.1702 9.469L9.13275 2.10821L9.13119 2.10541C8.91628 1.71948 8.60147 1.39821 8.21985 1.17466C7.83826 0.951133 7.40362 0.833374 6.9611 0.833374ZM7 11.3334C7.55228 11.3334 8 10.8857 8 10.3334C8 9.78109 7.55228 9.33337 7 9.33337C6.44772 9.33337 6 9.78109 6 10.3334C6 10.8857 6.44772 11.3334 7 11.3334ZM6.37503 3.66675V8.33342H7.62503V3.66675H6.37503Z"
      fill="currentColor"
    />
  </svg>
)

export const WarningTriangleOutlined = () => (
  <svg
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.0933 14.75L13.1651 2.75C12.2028 1.08333 9.79722 1.08333 8.83497 2.75L1.90676 14.75C0.94451 16.4167 2.14732 18.5 4.07182 18.5H17.9282C19.8527 18.5 21.0555 16.4167 20.0933 14.75ZM14.4641 2C12.9245 -0.666665 9.07553 -0.666668 7.53593 2L0.607723 14C-0.931877 16.6667 0.99262 20 4.07182 20H17.9282C21.0074 20 22.9319 16.6667 21.3923 14L14.4641 2ZM10.25 6H11.75V13H10.25V6ZM11 16.5C11.6904 16.5 12.25 15.9404 12.25 15.25C12.25 14.5596 11.6904 14 11 14C10.3096 14 9.75 14.5596 9.75 15.25C9.75 15.9404 10.3096 16.5 11 16.5Z"
      fill="#121212"
    />
  </svg>
)