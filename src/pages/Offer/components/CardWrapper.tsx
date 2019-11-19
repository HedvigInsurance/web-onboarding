import styled from '@emotion/styled'

const CARDWIDTH = 1200

export const CardWrapper = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  minWidth: CARDWIDTH,
  maxWidth: CARDWIDTH,
  [`@media (max-width: ${CARDWIDTH}px)`]: {
    minWidth: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})
