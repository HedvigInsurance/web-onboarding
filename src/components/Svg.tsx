import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'

export interface SvgProps {
  fill?: string
  width?: number | string
  height?: number | string
}

export const Svg = styled.svg<SvgProps>`
  fill: ${(props) => props.fill || colorsV2.black};
  ${(props) => props.width && `width: ${props.width}px;`}
  ${(props) => props.height && `height: ${props.height}px;`}
`
