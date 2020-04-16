import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
export const Spinner = styled.div`
  display: inline-block;
  width: 1em;
  height: 1em;
  flex: 1;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 4rem;
  animation: ${spin} 500ms linear infinite;
`
