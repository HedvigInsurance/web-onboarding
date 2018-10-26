import { fonts } from '@hedviginsurance/brand'
import styled from 'react-emotion'

const HEADERWIDTH = 350
const MOBILESMALL = 640
const MOBILETINY = 400

export const HeaderWrapper = styled('div')({
  maxWidth: HEADERWIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
  fontFamily: fonts.SORAY,
  fontWeight: 'normal',
  lineHeight: '40px',
  textAlign: 'center',
  [`@media (max-width: ${MOBILESMALL}px)`]: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  [`@media (max-width: ${MOBILETINY}px)`]: {
    fontSize: '25px',
  },
})
