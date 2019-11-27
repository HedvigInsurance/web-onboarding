import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'

interface Props {
  color?: string
  direction?: 'up' | 'down'
}

const Svg = styled.svg<Props>`
  ${(props) => props.direction === 'down' && `transform: rotate(180deg);`}
  fill: ${(props) => props.color};
`

export const Blob: React.FC<Props> = ({
  color = colorsV2.black,
  direction = 'up',
}) => (
  <Svg
    width="100%"
    height="45"
    viewBox="0 0 375 44"
    preserveAspectRatio="none"
    color={color}
    direction={direction}
  >
    <path d="M.032 44A9.744 9.744 0 0 1 0 43.207c0-24.246 54 2.987 151-30.379s224 6.133 224 30.38c0 .263-.01.527-.031.792H.032z"></path>
  </Svg>
)
