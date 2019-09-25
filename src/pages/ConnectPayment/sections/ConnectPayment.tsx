import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'

const SITEWRAPPER = 1200
const BP = 800

const Background = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: colors.OFF_WHITE,
  zIndex: -1,
})

const InnerWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: SITEWRAPPER,
  margin: 'auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '20vh',
  [`@media (max-width: ${BP}px)`]: {
    maxWidth: '100%',
    flexDirection: 'column',
    paddingTop: 20 + 70,
  },
})

const Column = styled('div')({
  width: '50%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const DownloadButton = styled('a')({
  backgroundColor: colors.GREEN,
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
  cursor: 'pointer',
  border: 'none',
  outlineStyle: 'none',
  marginTop: '10px',
  marginBottom: '30px',
})

const DownloadImage = styled('img')({
  marginBottom: '30px',
  marginTop: '30px',
  marginLeft: 'auto',
  width: '100%',
  '@media (max-width: 800px)': {
    marginRight: 'auto',
    width: '80%',
  },
})

const Header = styled('h1')({
  marginTop: '0px',
  marginBottom: '0px',
  fontSize: '55px',
})

const InsuredText = styled('div')({
  marginBottom: '45px',
})

export const ConnectPaymentPage: React.SFC<{}> = () => (
  <>
    <Background />
    <InnerWrapper>
      <h1>Om du vill ha cash fort, koppla ditt bankkonto</h1>
    </InnerWrapper>
  </>
)
