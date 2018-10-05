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
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
  '@media (max-width: 1000px)': {
    width: '100%',
    minWidth: '0%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})
