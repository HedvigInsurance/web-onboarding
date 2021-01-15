import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { AdyenCheckout } from 'pages/ConnectPayment/components/AdyenCheckout'
import { TrustlyCheckout } from 'pages/ConnectPayment/components/TrustlyCheckout'
import { useTextKeys } from 'utils/textKeys'
import {
  MOBILE_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { AVYWindow } from 'utils/tracking/signing'
import { ErrorModal } from '../components/ErrorModal'

const SITEWRAPPER = 1300

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${colorsV3.gray900};
  z-index: -1;
`

const InnerWrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  flex-direction: row;
  align-items: flex-start;
  max-width: ${SITEWRAPPER}px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 7.25rem;
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 6.75rem;
    flex-direction: column-reverse;
    width: 100%;
  }
`

const TextColumn = styled.div`
  width: 60%;
  padding-bottom: 2.5rem;
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: 100%;
  }
`

const ImageColumn = styled.div`
  width: 40%;
  margin-top: 0.5rem;
  padding-left: 2rem;
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: 100%;
    padding: 0;
    text-align: center;
  },
}
`

const Header = styled.h1`
  margin-top: 0;
  margin-bottom: 2.25rem;
  font-size: 3rem;
  color: ${colorsV3.white};
  ${MOBILE_SCREEN_MEDIA_QUERY} {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    line-height: 2rem;
  }
`

type HeaderPartProps = {
  addWhiteSpace?: boolean
}
const HeaderPart = styled.span<HeaderPartProps>`
  display: block;
  font-family: ${fonts.FAVORIT};
  font-weight: 400;

  ${MOBILE_SCREEN_MEDIA_QUERY} {
    display: initial;
    ${(props) =>
      props.addWhiteSpace &&
      `
      :before {
        content:'\\00a0';
      }`}
`
const ConnectText = styled.div`
  width: 65%;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: ${colorsV3.white};
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: 100%;
  }
  ${MOBILE_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
  }
`
const InstructionWrapper = styled(ConnectText)`
  margin-bottom: 1rem;
  color: ${colorsV3.gray500};
`

const ConnectPaymentImage = styled.img`
  width: 80%;
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: 40%;
    margin-bottom: 2rem;
  }
`

const InstructionsList = styled.ol`
  list-style: none;
  padding: 0;
  counter-reset: styled-number;
`
const InstructionItem = styled.li`
  counter-increment: styled-number;
  :: before {
    content: counter(styled-number) '. ';
  }
`

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
            <HeaderPart addWhiteSpace>
              {textKeys.ONBOARDING_CONNECT_DD_HEADLINE()}
            </HeaderPart>
          </Header>
          <ConnectText>{textKeys.ONBOARDING_CONNECT_DD_BODY()}</ConnectText>
          <InstructionWrapper>
            <InstructionsList>
              <InstructionItem>
                {textKeys.ONBOARDING_CONNECT_DD_INSTRUCTIONS_CONNECT_PAYMENT()}
              </InstructionItem>
              <InstructionItem>
                {textKeys.ONBOARDING_CONNECT_DD_INSTRUCTIONS_DOWNLOAD_APP()}
              </InstructionItem>
            </InstructionsList>
          </InstructionWrapper>
          {market === Market.Se && <TrustlyCheckout onSuccess={onSuccess} />}
          {(market === Market.No || market === Market.Dk) && (
            <AdyenCheckout onSuccess={onSuccess} />
          )}
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
