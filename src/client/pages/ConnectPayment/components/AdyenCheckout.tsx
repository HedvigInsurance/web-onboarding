import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { match } from 'matchly'
import color from 'color'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { datadogRum } from '@datadog/browser-rum'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LocaleData, LocaleLabel } from 'l10n/locales'
import { Spinner } from 'components/utils'
import {
  Scalars,
  SubmitAdditionalPaymentDetialsMutationFn,
  TokenizationChannel,
  TokenizePaymentDetailsMutationFn,
  useAvailablePaymentMethodsQuery,
  useSubmitAdditionalPaymentDetialsMutation,
  useTokenizePaymentDetailsMutation,
} from 'data/graphql'
import { SpinnerWrapper } from './Spinner'

export const Wrapper = styled('div')`
  position: relative;
  width: 100%;
  max-width: 440px;

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
    background: ${colorsV3.gray100};
    border: 1px solid ${colorsV3.gray500};
    padding: 1rem;
    height: 3.5rem;
    border-radius: 0;

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
    background-color: ${colorsV3.purple500};
    color: ${colorsV3.gray900};
    transition: transform 300ms;

    &:hover {
      background-color: ${colorsV3.purple500};
      transform: translateY(-2px);
    }
  }
  .adyen-checkout__button.adyen-checkout__button--loading {
    background-color: ${color(colorsV3.purple500)
      .lighten(0.2)
      .toString()};
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

interface Props {
  onSuccess?: () => void
}

export const AdyenCheckout: React.FC<Props> = ({ onSuccess }) => {
  const availablePaymentMethods = useAvailablePaymentMethodsQuery()
  const adyenCheckoutRef = useRef<HTMLDivElement>()
  const [adyenLoaded, setAdyenLoaded] = useState(false)
  const [tokenizePaymentMutation] = useTokenizePaymentDetailsMutation()
  const [
    submitAdditionalPaymentDetails,
  ] = useSubmitAdditionalPaymentDetialsMutation()
  const history = useHistory()
  const currentLocale = useCurrentLocale()
  const textKeys = useTextKeys()

  const paymentMethodsResponse =
    availablePaymentMethods.data?.availablePaymentMethods.paymentMethodsResponse

  useEffect(() => {
    if (!paymentMethodsResponse || !adyenLoaded) {
      return
    }
    createAdyenCheckout({
      payButtonText: textKeys.ONBOARDING_CONNECT_DD_CTA(),
      currentLocale,
      paymentMethodsResponse,
      tokenizePaymentMutation,
      submitAdditionalPaymentDetails,
      history,
      onSuccess,
    }).mount(adyenCheckoutRef.current)
  }, [
    paymentMethodsResponse,
    adyenLoaded,
    textKeys,
    currentLocale,
    tokenizePaymentMutation,
    submitAdditionalPaymentDetails,
    history,
    onSuccess,
  ])

  useEffect(() => {
    mountAdyenJs(setAdyenLoaded)()
  }, [])

  useEffect(mountAdyenCss, [])

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

const getReturnUrl = ({
  currentLocalePath,
}: {
  currentLocalePath: LocaleLabel
}) => {
  return `${window.location.origin}/${currentLocalePath}/new-member/connect-payment/adyen-callback`
}

const getOnSuccessRedirectUrl = ({
  currentLocalePath,
}: {
  currentLocalePath: LocaleLabel
}) => {
  return `/${currentLocalePath}/new-member/download`
}

interface AdyenCheckoutProps {
  payButtonText: string
  currentLocale: LocaleData
  paymentMethodsResponse: Scalars['PaymentMethodsResponse']
  tokenizePaymentMutation: TokenizePaymentDetailsMutationFn
  submitAdditionalPaymentDetails: SubmitAdditionalPaymentDetialsMutationFn
  history: ReturnType<typeof useHistory>
  onSuccess?: () => void
}

const createAdyenCheckout = ({
  payButtonText,
  currentLocale,
  paymentMethodsResponse,
  tokenizePaymentMutation,
  submitAdditionalPaymentDetails,
  history,
  onSuccess = () => {
    /* noop */
  },
}: AdyenCheckoutProps) => {
  const { isoLocale, path } = currentLocale
  const locale = match<LocaleData['isoLocale'], string>([
    ['nb_NO', 'no-NO'],
    ['da_DK', 'da-DK'],
    [match.any(), 'en-US'],
  ])(isoLocale)

  const returnUrl = getReturnUrl({ currentLocalePath: path })

  const handleResult = (dropinComponent: any, resultCode: string) => {
    if (['Authorised', 'Pending'].includes(resultCode)) {
      history.push(getOnSuccessRedirectUrl({ currentLocalePath: path }))
      onSuccess()
    } else {
      console.error(
        `Received unknown or faulty status type "${resultCode}" as request finished from Adyen`,
      )

      dropinComponent.setStatus('error')
      window.setTimeout(() => dropinComponent.setStatus('ready'), 1000)
    }
  }

  const configuration = {
    locale,
    translations: {
      'no-NO': {
        payButton: payButtonText,
      },
      'da-DK': {
        payButton: payButtonText,
      },
      'en-US': {
        payButton: payButtonText,
      },
    },
    environment: window.hedvigClientConfig.adyenEnvironment,
    clientKey: window.hedvigClientConfig.adyenClientKey,
    paymentMethodsResponse: JSON.parse(paymentMethodsResponse),
    paymentMethodsConfiguration: {
      card: {
        styles: {
          base: {
            color: colorsV3.gray700,
            background: colorsV3.gray100,
          },
          placeholder: {
            color: colorsV3.gray700,
          },
          error: {
            color: colorsV3.gray700,
          },
        },
      },
      applepay: {
        amount: {
          value: 0,
          currency: currentLocale.currencyCode,
        },
        buttonType: 'subscribe',
        buttonColor: 'white-with-line',
        countryCode: currentLocale.marketLabel,
      },
    },
    enableStoreDetails: true,
    returnUrl,
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
    'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.18.2/adyen.js'
  script.integrity =
    'sha384-/5SuEQKK7mLmDWB+eUPAur02KPkNC7pwAqyPez1TuNjeqRjsNDJdAnrbSxrzua2P'
  script.crossOrigin = 'anonymous'
  script.id = 'adyen-script'
  script.onload = () => setAdyenLoaded(true)
  document.body.append(script)
  return () => {
    try {
      document.body.contains(script) && document.body.removeChild(script)
    } catch (error) {
      datadogRum.addError(error)
    }
  }
}
const mountAdyenCss = () => {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href =
    'https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/3.18.2/adyen.css'
  link.integrity =
    'sha384-5K4T5NNVv7ZBvNypROEUSjvOL45HszUg/eYfYadY82UF4b+hc+TPQ4SsfTGXufJp'
  link.crossOrigin = 'anonymous'

  document.body.append(link)
  return () => {
    try {
      document.body.contains(link) && document.body.removeChild(link)
    } catch (error) {
      datadogRum.addError(error)
    }
  }
}
