import React, { useRef, useCallback, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import {
  useStartCheckoutMutation,
  useCheckoutStatusQuery,
  useCheckoutStatusLazyQuery,
} from 'data/graphql'

import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Headline } from 'components/Headline/Headline'
import {
  CheckoutPageWrapper,
  WrapperWidth,
} from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { useAdyenCheckout } from '../../ConnectPayment/components/useAdyenCheckout'
import { ContactInformation } from './ContactInformation/ContactInformation'
const { gray100, gray600, gray700, gray300, gray900 } = colorsV3

const AdyenContainer = styled.div`
  #dropin-container {
    .adyen-checkout__payment-method__header {
      display: none;
    }
    .adyen-checkout__payment-method {
      background: transparent;
      border: 0;
      &:not(:first-of-type) {
        border-top: 0;
      }
      .adyen-checkout__payment-method__details {
        padding: 0;
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
      background-color: ${gray100};
      border: 1px solid ${gray300};
      border-radius: 8px;
      color: ${gray100};
      height: 52px;
      &:hover {
        border: 1px solid ${gray700};
        box-shadow: none;
      }
      &:focus {
        border: 1px solid ${gray700};
        box-shadow: none;
      }
    }
    .adyen-checkout__card__form {
      ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        .adyen-checkout__field adyen-checkout__field--cardNumber {
          width: 50%;
        }
        .adyen-checkout__card__exp-cvc adyen-checkout__field-wrapper {
          width: 50%;
        }
      }
    }

    js-iframe-input input-field {
      background: ${gray100};
    }
  }
`
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${WrapperWidth}px;
  padding: 0 1rem 2rem 1rem;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    padding: 0;
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
  margin: 1rem 0;
  font-size: 0.75rem;
  line-height: 1.33;
  a {
    text-decoration: none;
  }
`
export const CheckoutPayment = () => {
  const textKeys = useTextKeys()
  const data = useQuoteCartData()
  const adyenRef = useRef<HTMLDivElement | null>(null)
  const [startCheckout] = useStartCheckoutMutation()
  const quoteIds = data?.quoteIds as string | string[]
  const quoteCartId = data?.quoteCartId as string
  const [getStatus] = useCheckoutStatusLazyQuery({
    pollInterval: 1000,
  })
  const [finishedPayment, setFinishedPayment] = useState(false)
  useEffect(() => {
    finishedPayment && finishFlow()
  }, [finishedPayment])

  const onSuccess = useCallback(async () => {
    setFinishedPayment(true)
  }, [])

  const finishFlow = async () => {
    const res = await startCheckout({
      variables: { quoteCartId, quoteIds },
    })
    const checkoutStatus = getStatus({
      variables: {
        quoteCartId,
      },
    })
  }
  // handle redirect
  // add paymenttokenid to quotecart using mutation

  const checkoutAPI = useAdyenCheckout({
    adyenRef,
    onSuccess,
  })

  return (
    <CheckoutPageWrapper>
      <ContactInformation {...data?.userDetails} />
      <AdyenContainer>
        <Wrapper>
          <Headline variant="s" headingLevel="h2" colorVariant="dark">
            {textKeys.CHECKOUT_PAYMENT_DETAILS_TITLE()}
          </Headline>
          <Description>
            {textKeys.CHECKOUT_PAYMENT_DETAILS_DESCRIPTION()}
          </Description>
          <div id="dropin-container" ref={adyenRef}></div>
          <Terms>{textKeys.CHECKOUT_PAYMENT_DETAILS_TERMS()}</Terms>
        </Wrapper>
      </AdyenContainer>
      {data && (
        <Footer
          buttonText={textKeys.CHECKOUT_SIMPLE_SIGN_BUTTON_TEXT()}
          buttonOnClick={() => {
            checkoutAPI?.submit()
          }}
        >
          <PaymentInfo {...data.priceData} />
        </Footer>
      )}
    </CheckoutPageWrapper>
  )
}
