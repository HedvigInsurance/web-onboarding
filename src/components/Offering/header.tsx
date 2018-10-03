import { fonts } from '@hedviginsurance/brand'
import styled from 'react-emotion'

export const Header = styled('h1')({
  maxWidth: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontFamily: fonts.MERRIWEATHER,
  fontSize: '28px',
  marginBottom: '10px',
  fontWeight: 'normal',
  textAlign: 'center',
  paddingBottom: '10px',
  '@media (max-width: 640px)': {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  '@media (max-width: 400px)': {
    fontSize: '25px',
  },
})
