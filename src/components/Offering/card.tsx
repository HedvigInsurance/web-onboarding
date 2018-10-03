import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'

export const Card = styled('div')({
  marginTop: '70px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: colors.WHITE,
  minWidth: '1000px',
  width: '1000px',
  maxWidth: '1000px',
  '@media (max-width: 1000px)': {
    width: '100%',
    minWidth: '0%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})
