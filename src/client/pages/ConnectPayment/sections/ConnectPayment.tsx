import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { AdyenCheckout } from 'pages/ConnectPayment/components/AdyenCheckout'
import { TrustlyCheckout } from 'pages/ConnectPayment/components/TrustlyCheckout'
import { useTextKeys } from 'utils/textKeys'
import { useBreakpoint } from 'utils/hooks/useBreakpoint'
import {
  MEDIUM_SMALL_SCREEN_MEDIA_QUERY,
  LARGE_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { AVYWindow } from 'utils/tracking/signing'
import { ErrorModal } from '../components/ErrorModal'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  min-height: 100vh;
  background-color: ${colorsV3.gray900};
  display: flex;
  justify-content: center;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80rem;
  padding: 6rem 1rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    flex-direction: row-reverse;
    align-items: flex-start;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 8rem;
  }
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 2rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    justify-content: flex-start;
    width: 40%;
    padding-top: 2rem;
    padding-left: 2rem;
  }
`
const ConnectPaymentImage = styled.img`
  width: 50%;
  height: auto;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: 100%;
  }
`
const TextContainer = styled.div`
  padding-bottom: 2.5rem;
  flex-shrink: 0;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: 60%;
  }
`
const Headline = styled.h1`
  margin: 0;
  font-size: 2rem;
  line-height: 2.5rem;
  text-align: center;
  color: ${colorsV3.white};
  font-family: ${fonts.FAVORIT};
  font-weight: 400;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 2.5rem;
  }

  ${LARGE_SCREEN_MEDIA_QUERY} {
    text-align: left;
    font-size: 3rem;
    line-height: 3.5rem;
  }
`
const HeadlinePart = styled.span`
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    display: block;
  }
`
const Body = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 2rem 0;
  font-size: 1rem;
  line-height: 1.5rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 1.125rem;
  }
`
const Introduction = styled.div`
  color: ${colorsV3.white};
`
const Instructions = styled.div`
  color: ${colorsV3.gray500};
`
const InstructionsList = styled.ol`
  list-style: none;
  padding: 1rem 0;
  margin: 0;
  counter-reset: styled-number;
`
const InstructionItem = styled.li`
  counter-increment: styled-number;
  :before {
    content: counter(styled-number) '. ';
  }
`
const InstructionItemSeparator = styled.div`
  height: 0.5rem;
`

export const ConnectPaymentPage: React.FC = () => {
  const textKeys = useTextKeys()
  const market = useMarket()
  const { isLargeScreen } = useBreakpoint()
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
    <Wrapper>
      <InnerWrapper>
        <ImageContainer>
          <ConnectPaymentImage
            src={
              '/new-member-assets/connect-payment/connect-payments-illustration-mono.svg'
            }
          />
        </ImageContainer>
        <TextContainer>
          <Headline>
            <HeadlinePart>
              {textKeys.ONBOARDING_CONNECT_DD_HEADLINE_PART_1()}
            </HeadlinePart>
            <HeadlinePart>
              {!isLargeScreen && ' '}
              {textKeys.ONBOARDING_CONNECT_DD_HEADLINE_PART_2()}
            </HeadlinePart>
          </Headline>
          <Body>
            <Introduction>{textKeys.ONBOARDING_CONNECT_DD_BODY()}</Introduction>
            <Instructions>
              <InstructionsList>
                <InstructionItem>
                  {textKeys.ONBOARDING_CONNECT_DD_INSTRUCTIONS_CONNECT_PAYMENT()}
                </InstructionItem>
                <InstructionItemSeparator />
                <InstructionItem>
                  {textKeys.ONBOARDING_CONNECT_DD_INSTRUCTIONS_DOWNLOAD_APP()}
                </InstructionItem>
              </InstructionsList>
            </Instructions>
          </Body>
          {market === Market.Se && <TrustlyCheckout onSuccess={onSuccess} />}
          {(market === Market.No || market === Market.Dk) && (
            <AdyenCheckout onSuccess={onSuccess} />
          )}
          <ErrorModal />
        </TextContainer>
      </InnerWrapper>
    </Wrapper>
  )
}
