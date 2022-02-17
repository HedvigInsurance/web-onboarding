import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
// import { InputField, Wrapper } from 'components/inputs'
import { useTextKeys } from 'utils/textKeys'
import { Headline } from 'components/Headline/Headline'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import {
  AdyenCheckout,
  Wrapper,
} from '../../../ConnectPayment/components/AdyenCheckout'
const { gray600, gray700, gray300, gray900 } = colorsV3

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & > div {
    width: 45%;
  }
  & > div:first-child {
    flex: 1 0 100%;
  }
  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 2fr 140px 140px;
    & > div {
      width: auto;
    }
  }
`

const Description = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  line-height: 1.4;
  color: ${gray700};
`

const Terms = styled.div`
  color: ${gray600};
  margin-top: 1rem;
  font-size: 0.75rem;
  line-height: 1.33;
  a {
    text-decoration: none;
  }
`

const AdyenContainer = styled.div`
  ${Wrapper} {
    .adyen-checkout__payment-method__header {
      display: none;
    }
    .adyen-checkout__payment-method {
      background: transparent;

      &:not(:first-of-type) {
        border-top: 0;
      }
    }
    .adyen-checkout__label__text {
      color: ${gray900};
      font-size: 0.875rem;
      line-height: 1.4;
    }
    .adyen-checkout__label--focused .adyen-checkout__label__text {
      color: ${gray900};
    }
    .adyen-checkout__input {
      background-color: white;
      border: 1px solid ${gray300};
      border-radius: 8px;
      color: white;
      &:hover {
        border: 1px solid ${gray700};
      }
    }
    .adyen-checkout__button {
      display: none;
    }

    js-iframe-input input-field {
      background: white;
    }
  }
`

export const PaymentDetails = () => {
  const textKeys = useTextKeys()

  return (
    <>
      <Headline variant="s" headingLevel="h2" colorVariant="dark">
        {textKeys.CHECKOUT_PAYMENT_DETAILS_TITLE()}
      </Headline>
      <Description>
        {textKeys.CHECKOUT_PAYMENT_DETAILS_DESCRIPTION()}
      </Description>
      <AdyenContainer>
        <AdyenCheckout />
      </AdyenContainer>

      <Terms>{textKeys.CHECKOUT_PAYMENT_DETAILS_TERMS()}</Terms>
    </>
  )
}
