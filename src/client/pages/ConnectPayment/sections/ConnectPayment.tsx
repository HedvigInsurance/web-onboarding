import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { AdyenCheckout } from 'pages/ConnectPayment/components/AdyenCheckout'
import { TrustlyCheckout } from 'pages/ConnectPayment/components/TrustlyCheckout'
import { useTextKeys } from 'utils/textKeys'
import {
  MEDIUM_SMALL_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { useVariation, Variation } from 'utils/hooks/useVariation'
import { AVYWindow } from 'utils/tracking/signing'
import { ErrorModal } from '../components/ErrorModal'

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
  flex-direction: column-reverse;
  align-items: flex-start;
  max-width: 80rem;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 6.75rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    flex-direction: row;

    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 7.25rem;
  }
`

const TextColumn = styled.div`
  padding-bottom: 2.5rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: 60%;
  }
`

const ImageColumn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    justify-content: flex-start;
    width: 40%;
    padding-left: 2rem;
  }
`

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.5rem;
  text-align: center;
  color: ${colorsV3.white};
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    text-align: left;
    margin-bottom: 2.25rem;
    font-size: 3rem;
    line-height: 3.5rem;
  }
`

type HeaderPartProps = {
  addWhiteSpace?: boolean
}
const HeaderPart = styled.span<HeaderPartProps>`
  font-family: ${fonts.FAVORIT};
  font-weight: 400;
  ${(props) =>
    props.addWhiteSpace &&
    `
        margin-left: 0.375rem;
      `}

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    display: block;
    margin-left: 0;
  }
`
const ConnectText = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colorsV3.white};

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    font-size: 1.125rem;
  }

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: 65%;
  }
`
const InstructionWrapper = styled(ConnectText)`
  color: ${colorsV3.gray500};
`

const ConnectPaymentImage = styled.img`
  display: block;
  width: 40%;
  height: 100%;
  margin-bottom: 2rem;
  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    width: 100%;
    max-width: 430px;
  }
`

const InstructionsList = styled.ol`
  list-style: none;
  padding: 0;
  counter-reset: styled-number;
`
const InstructionItem = styled.li`
  counter-increment: styled-number;
  :before {
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
          <Heading>
            <HeaderPart>
              {textKeys.ONBOARDING_CONNECT_DD_HEADLINE_PART_1()}
            </HeaderPart>
            <HeaderPart addWhiteSpace>
              {textKeys.ONBOARDING_CONNECT_DD_HEADLINE_PART_2()}
            </HeaderPart>
          </Heading>
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
