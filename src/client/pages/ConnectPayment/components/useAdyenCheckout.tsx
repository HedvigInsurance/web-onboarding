import React, { useEffect, useState } from 'react'

import { colorsV3 } from '@hedviginsurance/brand'
import { match } from 'matchly'
import { useHistory } from 'react-router'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LocaleData, LocaleLabel } from 'l10n/locales'
import {
  Scalars,
  SubmitAdditionalPaymentDetialsMutationFn,
  TokenizationChannel,
  TokenizePaymentDetailsMutationFn,
  useAvailablePaymentMethodsQuery,
  useSubmitAdditionalPaymentDetialsMutation,
  useTokenizePaymentDetailsMutation,
} from 'data/graphql'

interface Params {
  onSuccess?: () => void
  adyenRef: React.MutableRefObject<HTMLDivElement | null>
}

type CheckoutAPI = {
  submit: () => void
  create: (type: 'dropin') => CheckoutAPI
  mount: (element: HTMLElement) => void
  onComplete: () => void
}

export const useAdyenCheckout = ({ onSuccess, adyenRef }: Params) => {
  const availablePaymentMethods = useAvailablePaymentMethodsQuery()
  const [checkoutAPI, setCheckoutAPI] = useState<CheckoutAPI | null>(null)
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
    if (!paymentMethodsResponse || !adyenLoaded || !adyenRef.current) {
      return
    }
    const newCheckoutAPI = createAdyenCheckout({
      payButtonText: textKeys.ONBOARDING_CONNECT_DD_CTA(),
      currentLocale,
      paymentMethodsResponse,
      tokenizePaymentMutation,
      submitAdditionalPaymentDetails,
      history,
      onSuccess,
    })

    newCheckoutAPI.mount(adyenRef.current)
    setCheckoutAPI(newCheckoutAPI)
  }, [
    paymentMethodsResponse,
    adyenLoaded,
    textKeys,
    currentLocale,
    tokenizePaymentMutation,
    submitAdditionalPaymentDetails,
    history,
    adyenRef,
    onSuccess,
  ])

  useEffect(() => {
    mountAdyenJs(setAdyenLoaded)()
  }, [])

  useEffect(mountAdyenCss, [])

  return checkoutAPI
}

interface AdyenCheckoutProps {
  payButtonText: string
  currentLocale: LocaleData
  paymentMethodsResponse: Scalars['PaymentMethodsResponse']
  tokenizePaymentMutation: TokenizePaymentDetailsMutationFn
  submitAdditionalPaymentDetails: SubmitAdditionalPaymentDetialsMutationFn
  history: ReturnType<typeof useHistory>
  onSuccess?: () => void
  setIsCompleted?: () => void
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
      // history.push(getOnSuccessRedirectUrl({ currentLocalePath: path }))
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
    showPayButton: false,
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
    },
    enableStoreDetails: true,
    returnUrl,
    onAdditionalDetails: async (state: any, dropinComponent: any) => {
      try {
        console.log('help')
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
    document.body.removeChild(script)
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
    document.body.removeChild(link)
  }
}
