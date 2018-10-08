import { fonts } from '@hedviginsurance/brand'
import styled from 'react-emotion'

export const Header = styled('h1')({
  maxWidth: '400px',
  marginTop: '30px',
  marginBottom: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontFamily: fonts.SORAY,
  fontSize: '28px',
  fontWeight: 'normal',
  textAlign: 'center',
  '@media (max-width: 640px)': {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  '@media (max-width: 400px)': {
    fontSize: '25px',
  },
})
