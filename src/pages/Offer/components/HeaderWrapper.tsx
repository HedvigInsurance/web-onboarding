import styled from '@emotion/styled'

const MOBILESMALL = 640

export const HeaderWrapper = styled('div')({
  marginLeft: '20px',
  marginRight: '20px',
  fontWeight: 'normal',
  lineHeight: 1.3,
  textAlign: 'center',
  [`@media (max-width: ${MOBILESMALL}px)`]: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
})
