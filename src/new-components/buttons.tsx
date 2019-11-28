import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'

export const Button = styled.button<{
  background?: string
  foreground?: string
  size?: 'sm' | 'lg'
}>`
  font-size: ${(props) =>
    props.size && props.size === 'lg' ? `1rem` : `0.875rem`};
  line-height: ${(props) =>
    props.size && props.size === 'lg' ? `1rem` : `1.25rem`};
  padding: ${(props) =>
    props.size && props.size === 'lg' ? `1.5rem 4rem` : `0.875rem 1.5rem`};
  background: ${(props) => props.background || colorsV2.violet500};
  color: ${(props) => props.foreground || colorsV2.white};
  font-weight: ${(props) => (props.size && props.size === 'lg' ? 600 : 500)};
  border-radius: ${(props) =>
    props.size && props.size === 'lg' ? `2rem` : `1.5rem`};
  border: none;
  cursor: pointer;

  :focus {
    outline: none;
  }
`
