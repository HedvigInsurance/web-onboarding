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
  width: '60%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const Header = styled('h1')({
  marginTop: '0px',
  marginBottom: '0px',
  fontSize: '55px',
  lineHeight: '60px',
})

const ConnectText = styled('div')({
  marginBottom: '45px',
})

export const ConnectPaymentPage: React.SFC<{}> = () => (
  <>
    <Background />
    <InnerWrapper>
      <Column>
        <Header>Om du vill ha cash fort, koppla ditt bankkonto</Header>
        <ConnectText>
          För att din försäkring ska gälla framöver behöver du koppla autogiro
          från din bank så att du kan betala och få utbetalt. Vi sköter det med
          Trustly.
        </ConnectText>
      </Column>
    </InnerWrapper>
  </>
)
