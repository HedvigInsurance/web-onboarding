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
  max-width: 80rem;
  padding: 6rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    flex-direction: row-reverse;
    align-items: flex-start;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 8rem;
    justify-content: space-between;
  }
`
const ImageContainer = styled.div`
  padding-bottom: 3rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: 45%;
    padding-top: 1rem;
    padding-left: 2rem;
    justify-content: flex-start;
  }
`
const ConnectPaymentImage = styled.img`
  max-width: 40vw;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: 100%;
    max-width: 100%;
  }
`
const TextContainer = styled.div`
  padding-bottom: 2.5rem;
  flex-shrink: 0;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    width: 60%;
    align-items: flex-start;
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

  ${LARGE_SCREEN_MEDIA_QUERY} {
    text-align: left;
  }
`
const HeadlinePart = styled.span`
  display: block;
`
const Body = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem 0;
  font-size: 1rem;
  line-height: 1.5rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding: 3rem 0;
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
  max-width: 400px;
  padding: 1rem 0;
  margin: 0;
  list-style: none;
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
            alt=""
            width={637}
            height={600}
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
