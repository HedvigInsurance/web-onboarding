import styled from '@emotion/styled'

export type IconRootProps = {
  color?: string
  size?: string
}

export const IconRoot = styled.svg<IconRootProps>`
  width: 1em;
  height: 1em;
  fill: ${(props) => (props.color ? props.color : 'currentColor')};
  color: ${(props) => (props.color ? props.color : 'currentColor')};
  font-size: ${(props) => (props.size ? props.size : '1.5rem')};
`
