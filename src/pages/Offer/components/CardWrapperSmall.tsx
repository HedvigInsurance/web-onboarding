import styled from 'react-emotion'

const CARDWIDTHSMALL = 788

export const CardWrapperSmall = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  minWidth: CARDWIDTHSMALL,
  maxWidth: CARDWIDTHSMALL,
  [`@media (max-width: ${CARDWIDTHSMALL}px)`]: {
    minWidth: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})
