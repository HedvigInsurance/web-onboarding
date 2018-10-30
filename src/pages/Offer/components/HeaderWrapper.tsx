import { fonts } from '@hedviginsurance/brand'
import styled from 'react-emotion'

const HEADERWIDTH = 400
const MOBILESMALL = 640

export const HeaderWrapper = styled('div')({
  maxWidth: HEADERWIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
  fontFamily: fonts.SORAY,
  fontWeight: 'normal',
  lineHeight: 1.3,
  textAlign: 'center',
  [`@media (max-width: ${MOBILESMALL}px)`]: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
})
