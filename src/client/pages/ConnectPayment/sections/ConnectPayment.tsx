import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { AdyenCheckout } from 'pages/ConnectPayment/components/AdyenCheckout'
import { TrustlyCheckout } from 'pages/ConnectPayment/components/TrustlyCheckout'
import { useTextKeys } from 'utils/textKeys'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { AVYWindow } from 'utils/tracking/signing'
import { ErrorModal } from '../components/ErrorModal'

const SITEWRAPPER = 1300
const BP = 800
const MOBILE = 450

const Background = styled('div')({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: colorsV3.gray900,
  zIndex: -1,
})

const InnerWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: SITEWRAPPER,
  margin: 'auto',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '25vh',
  color: colorsV3.gray500,
  [`@media (max-width: ${BP}px)`]: {
    maxWidth: '100%',
    flexDirection: 'column',
    paddingTop: 40 + 70,
  },
})

const TextColumn = styled('div')({
  width: '60%',
  paddingRight: 20,
  paddingLeft: 20,
  paddingBottom: 40,

  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
    textAlign: 'center',
  },
})

const ImageColumn = styled('div')({
  width: '40%',
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
  marginBottom: '30px',
  fontSize: '56px',
  lineHeight: '60px',
  color: colorsV3.white,
  [`@media (max-width: ${MOBILE}px)`]: {
    fontSize: '44px',
    lineHeight: '52px',
  },
})

const HeaderPart = styled('span')({
  display: 'block',
  fontFamily: fonts.FAVORIT,
  fontWeight: 400,
})

const ConnectText = styled('div')({
  width: '65%',
  marginBottom: '45px',
  [`@media (max-width: ${BP}px)`]: {
    width: '100%',
  },
})

const ConnectPaymentImage = styled('img')({
  marginBottom: '30px',
  marginTop: '30px',
  marginLeft: 'auto',
  width: '100%',
  [`@media (max-width: ${BP}px)`]: {
    marginRight: 'auto',
    width: '80%',
  },
  [`@media (max-width: ${MOBILE}px)`]: {
    width: '100%',
  },
})

export const ConnectPaymentPage: React.FC = () => {
  const textKeys = useTextKeys()
  const market = useMarket()
  const variation = useVariation()

  const onSuccess = () => {
    if (variation === Variation.AVY) {
      const message = JSON.stringify({ event: 'PaymentConnected' })
      const avyWindow = window as AVYWindow
      avyWindow.frames.parent.postMessage(message, '*')
      if (avyWindow.ReactNativeWebView) {
        avyWindow.ReactNativeWebView.postMessage(message)
      }
    }
  }

  return (
    <>
      <Background />
      <InnerWrapper>
        <TextColumn>
          <Header>
            <HeaderPart>
              {textKeys.ONBOARDING_CONNECT_DD_PRE_HEADLINE()}
            </HeaderPart>
            <HeaderPart>{textKeys.ONBOARDING_CONNECT_DD_HEADLINE()}</HeaderPart>
          </Header>
          <ConnectText>{textKeys.ONBOARDING_CONNECT_DD_BODY()}</ConnectText>
          {market === Market.Se && <TrustlyCheckout onSuccess={onSuccess} />}
          {market === Market.No && <AdyenCheckout onSuccess={onSuccess} />}
          <ErrorModal />
        </TextColumn>
        <ImageColumn>
          <ConnectPaymentImage
            src={
              '/new-member-assets/connect-payment/connect-payments-illustration-mono.svg'
            }
          />
        </ImageColumn>
      </InnerWrapper>
    </>
  )
}
