import styled from '@emotion/styled'

interface MufflableProps {
  muffled: boolean
  unMuffled?: boolean
  unMufflable?: boolean
  direction?: string
}

export const Mufflable = styled.div<MufflableProps>`
  opacity: ${(props) => (props.muffled && !props.unMuffled ? 0.5 : 1)};
  font-size: ${(props) => (props.muffled ? 16 : 12)};
  transition: opacity 200ms, font 200ms;
  :hover {
    opacity: ${(props) => (props.unMufflable ? 1 : undefined)};
  }
`
