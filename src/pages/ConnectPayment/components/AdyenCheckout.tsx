import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Spinner } from 'components/utils'
import {
  getLocaleIsoCode,
  useCurrentLocale,
} from 'components/utils/CurrentLocale'
import {
  Scalars,
  SubmitAdditionalPaymentDetialsMutationFn,
  TokenizationChannel,
  TokenizePaymentDetailsMutationFn,
  useAvailablePaymentMethodsQuery,
  useSubmitAdditionalPaymentDetialsMutation,
  useTokenizePaymentDetailsMutation,
} from 'data/graphql'
import { match } from 'matchly'
import React from 'react'
import { useHistory } from 'react-router'
import { SpinnerWrapper } from './Spinner'

const Wrapper = styled('div')`
  position: relative;

  @media (min-width: 801px) {
    padding-right: 5rem;
  }

  .adyen-checkout__payment-method__header {
    color: ${colorsV3.gray500};
    padding-left: 0;
    padding-right: 0;
  }
  .adyen-checkout__payment-method {
    &,
    &:first-child,
    &:last-child {
      border-radius: 3px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
  }
  .adyen-checkout__payment-method--selected {
    background: ${colorsV3.gray900};
  }
  .adyen-checkout__payment-method {
    border: none;
    padding: 0;
    background: ${colorsV3.gray900};

    &:not(:first-of-type) {
      border-top: 1px solid ${colorsV3.gray700};
      border-radius: 0;
    }
  }
  .adyen-checkout__payment-method__details {
    padding-left: 0;
    padding-right: 0;
  }

  .adyen-checkout__label__text {
    color: ${colorsV3.gray500};
    padding-bottom: 0.5rem;
  }
  .adyen-checkout__label--focused .adyen-checkout__label__text {
    color: ${colorsV3.gray300};
  }
  .adyen-checkout__input {
    background: ${colorsV3.gray900};
    border: 1px solid ${colorsV3.gray500};
    padding: 1rem;
    height: 4rem;
    border-radius: 8px;

    &:focus {
      border: 1px solid ${colorsV3.gray300};
      box-shadow: none;
    }
  }

  .adyen-checkout__input--focus {
    &,
    &:hover {
      border: 1px solid ${colorsV3.gray300};
      box-shadow: none;
    }
  }

  .adyen-checkout__button {
    background-color: ${colorsV3.white};
    color: ${colorsV3.gray900};
    transition: transform 300ms;

    &:hover {
      background-color: ${colorsV3.white};
      transform: translateY(-2px);
    }
  }
  .adyen-checkout__button.adyen-checkout__button--loading {
    background-color: ${colorsV3.gray500};
  }
  .adyen-checkout__button .adyen-checkout__spinner {
    border-color: transparent ${colorsV3.gray900} ${colorsV3.gray900};
  }
  .adyen-checkout__button__icon {
    display: none;
  }

  .adyen-checkout__status {
    background-color: ${colorsV3.gray900};
    color: ${colorsV3.white};
  }
`

export const AdyenCheckout = () => {
  const availablePaymentMethods = useAvailablePaymentMethodsQuery()
  const adyenCheckoutRef = React.useRef<HTMLDivElement>()
  const [adyenLoaded, setAdyenLoaded] = React.useState(false)
  const [tokenizePaymentMutation] = useTokenizePaymentDetailsMutation()
  const [
    submitAdditionalPaymentDetails,
  ] = useSubmitAdditionalPaymentDetialsMutation()
  const history = useHistory()
  const currentLocale = useCurrentLocale()

  const paymentMethodsResponse =
    availablePaymentMethods.data?.availablePaymentMethods.paymentMethodsResponse

  React.useEffect(() => {
    if (!paymentMethodsResponse || !adyenLoaded) {
      return
    }

    createAdyenCheckout({
      currentLocale,
      paymentMethodsResponse,
      tokenizePaymentMutation,
      submitAdditionalPaymentDetails,
      history,
    }).mount(adyenCheckoutRef.current)
  }, [paymentMethodsResponse, adyenLoaded])

  React.useEffect(mountAdyenJs(setAdyenLoaded), [])

  React.useEffect(mountAdyenCss, [])

  return (
    <Wrapper>
      {!adyenLoaded && (
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      )}
      <div
        ref={adyenCheckoutRef as React.MutableRefObject<HTMLDivElement>}
      ></div>
    </Wrapper>
  )
}

interface AdyenCheckoutProps {
  currentLocale: string
  paymentMethodsResponse: Scalars['PaymentMethodsResponse']
  tokenizePaymentMutation: TokenizePaymentDetailsMutationFn
  submitAdditionalPaymentDetails: SubmitAdditionalPaymentDetialsMutationFn
  history: ReturnType<typeof useHistory>
}

const createAdyenCheckout = ({
  currentLocale,
  paymentMethodsResponse,
  tokenizePaymentMutation,
  submitAdditionalPaymentDetails,
  history,
}: AdyenCheckoutProps) => {
  const locale = match([
    ['sv_SE', 'sv-SE'],
    ['en_SE', 'en-US'],
    ['nb_NO', 'no-NO'],
    ['en_NO', 'en-US'],
  ])(getLocaleIsoCode(currentLocale))

  const returnUrl = `${window.location.origin}/${currentLocale}/new-member/connect-payment/adyen-callback`

  const handleResult = (dropinComponent: any, resultCode: string) => {
    if (['Authorised', 'Pending'].includes(resultCode)) {
      history.push(`/${currentLocale}/new-member/download`)
    } else {
      // tslint:disable-next-line no-console
      console.error(
        `Received unknown or faulty status type "${resultCode}" as request finished from Adyen`,
      )

      dropinComponent.setStatus('error')
      window.setTimeout(() => dropinComponent.setStatus('ready'), 1000)
    }
  }

  const configuration = {
    locale,
    environment: (window as any).ADYEN_ENVIRONMENT,
    originKey: (window as any).ADYEN_ORIGIN_KEY,
    paymentMethodsResponse: JSON.parse(paymentMethodsResponse),
    paymentMethodsConfiguration: {
      card: {
        styles: {
          base: {
            color: colorsV3.white,
            background: colorsV3.gray900,
          },
          placeholder: {
            color: colorsV3.gray700,
          },
          error: {
            color: colorsV3.white,
          },
        },
      },
    },
    enableStoreDetails: true,
    returnUrl,
    // onChange: console.log,
    onAdditionalDetails: async (state: any, dropinComponent: any) => {
      try {
        const result = await submitAdditionalPaymentDetails({
          variables: {
            request: {
              paymentsDetailsRequest: JSON.stringify(state.data),
            },
          },
        })

        if (!result) {
          return
        }

        if (
          result.data?.submitAdditionalPaymentDetails.__typename ===
          'AdditionalPaymentsDetailsResponseAction'
        ) {
          dropinComponent.handleAction(
            JSON.parse(result.data?.submitAdditionalPaymentDetails.action),
          )
          return
        }

        if (
          result.data?.submitAdditionalPaymentDetails.__typename ===
          'AdditionalPaymentsDetailsResponseFinished'
        ) {
          handleResult(
            dropinComponent,
            result.data?.submitAdditionalPaymentDetails.resultCode,
          )
        }
      } catch (e) {
        handleResult(dropinComponent, 'error')
      }
    },
    onSubmit: async (state: any, dropinComponent: any) => {
      dropinComponent.setStatus('loading')
      try {
        const result = await tokenizePaymentMutation({
          variables: {
            paymentsRequest: {
              browserInfo: state.data.browserInfo,
              paymentMethodDetails: JSON.stringify(state.data.paymentMethod),
              channel: TokenizationChannel.Web,
              returnUrl,
            },
          },
        })

        if (!result) {
          return
        }

        if (
          result.data?.tokenizePaymentDetails?.__typename ===
          'TokenizationResponseAction'
        ) {
          dropinComponent.handleAction(
            JSON.parse(result.data.tokenizePaymentDetails.action),
          )
          return
        }

        if (
          result.data?.tokenizePaymentDetails?.__typename ===
          'TokenizationResponseFinished'
        ) {
          handleResult(
            dropinComponent,
            result.data?.tokenizePaymentDetails.resultCode,
          )
        }
      } catch (e) {
        handleResult(dropinComponent, 'error')
      }
    },
  }

  const adyenCheckout = new (window as any).AdyenCheckout(configuration)

  return adyenCheckout.create('dropin')
}

const mountAdyenJs = (setAdyenLoaded: (adyenLoaded: boolean) => void) => () => {
  const script = document.createElement('script')

  script.src =
    'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.1/adyen.js'
  script.integrity =
    'sha384-hUb/CFxzLJZWUbDBmQfccbVjE3LFxAx3Wt4O37edYVLZmNhcmVUyYLgn6kWk3Hz+'
  script.crossOrigin = 'anonymous'
  script.id = 'adyen-script'
  script.onload = () => setAdyenLoaded(true)
  document.body.append(script)
  return () => {
    document.body.removeChild(script)
  }
}
const mountAdyenCss = () => {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href =
    'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.6.1/adyen.css'
  link.integrity =
    'sha384-l5/gSrWMFWCKnEqoG1F21fvhDesLnZt/JlXjkA0FWp6E68Pc/9mxg+nPvvx+uB4G'
  link.crossOrigin = 'anonymous'

  document.body.append(link)
  return () => {
    document.body.removeChild(link)
  }
}
