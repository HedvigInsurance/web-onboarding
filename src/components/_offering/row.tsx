import styled from 'react-emotion'

export const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'baseline',
  maxWidth: '1000px',
  '@media (max-width: 710px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})
