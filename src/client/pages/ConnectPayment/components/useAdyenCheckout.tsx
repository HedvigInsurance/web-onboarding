import React, { useEffect, useState } from 'react'

import { colorsV3 } from '@hedviginsurance/brand'
import { match } from 'matchly'
import { useHistory } from 'react-router'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LocaleData, LocaleLabel } from 'l10n/locales'
import {
  Scalars,
  usePaymentConnection_ConnectPaymentMutation,
  usePaymentConnection_SubmitAdditionalPaymentDetailsMutation,
  ConnectPaymentInput,
  PaymentConnectChannel,
  Market,
  usePaymentMethodsQuery,
  usePaymentMethodsLazyQuery,
} from 'data/graphql'
import { useStorage, StorageState } from 'utils/StorageContainer'

interface Params {
  onSuccess?: () => void
  adyenRef: React.MutableRefObject<HTMLDivElement | null>
  quoteCartId?: string
}

type CheckoutAPI = {
  submit: () => void
  create: (type: 'dropin') => CheckoutAPI
  mount: (element: HTMLElement) => void
  onComplete: () => void
}

export const useAdyenCheckout = ({
  onSuccess,
  adyenRef,
  quoteCartId,
}: Params) => {
  const [checkoutAPI, setCheckoutAPI] = useState<CheckoutAPI | null>(null)
  const [adyenLoaded, setAdyenLoaded] = useState(false)
  const [connectPaymentMutation] = usePaymentConnection_ConnectPaymentMutation()
  const storage = useStorage()

  const [
    submitAdditionalPaymentDetails,
  ] = usePaymentConnection_SubmitAdditionalPaymentDetailsMutation()

  const history = useHistory()
  const currentLocale = useCurrentLocale()
  const textKeys = useTextKeys()
  const paymentMethodsResponseNew = usePaymentMethodsQuery({
    variables: {
      id: quoteCartId as string,
    },
  })
  const [getPaymentMethods] = usePaymentMethodsLazyQuery()

  const paymentMethodsResponse =
    paymentMethodsResponseNew?.data?.quoteCart.paymentConnection?.providers[0]
      ?.availablePaymentMethods

  useEffect(() => {
    if (
      !quoteCartId ||
      !paymentMethodsResponse ||
      !adyenLoaded ||
      !adyenRef.current
    ) {
      return
    }
    const newCheckoutAPI = createAdyenCheckout({
      payButtonText: textKeys.ONBOARDING_CONNECT_DD_CTA(),
      currentLocale,
      paymentMethodsResponse,
      connectPaymentMutation,
      submitAdditionalPaymentDetails,
      quoteCartId,
      history,
      onSuccess,
      storage,
    })

    newCheckoutAPI.mount(adyenRef.current)
    setCheckoutAPI(newCheckoutAPI)
  }, [
    paymentMethodsResponse,
    getPaymentMethods,
    adyenLoaded,
    textKeys,
    currentLocale,
    connectPaymentMutation,
    submitAdditionalPaymentDetails,
    quoteCartId,
    history,
    adyenRef,
    onSuccess,
    storage,
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
  connectPaymentMutation: any
  submitAdditionalPaymentDetails: any
  history: ReturnType<typeof useHistory>
  onSuccess?: () => void
  setIsCompleted?: () => void
  quoteCartId: string
  storage: StorageState
}

const createAdyenCheckout = ({
  payButtonText,
  currentLocale,
  paymentMethodsResponse,
  connectPaymentMutation,
  submitAdditionalPaymentDetails,
  quoteCartId,
  storage,
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

  const returnUrl = getReturnUrl({ currentLocalePath: path, quoteCartId })
  const handleResult = (dropinComponent: any, status: string) => {
    if (['AUTHORISED', 'PENDING'].includes(status)) {
      // history.push(getOnSuccessRedirectUrl({ currentLocalePath: path }))
      dropinComponent.setStatus('success', { message: 'Payment successful!' })
      onSuccess()
    } else {
      console.error(
        `Received unknown or faulty status type "${status}" as request finished from Adyen`,
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
    paymentMethodsResponse: paymentMethodsResponse,
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
    onSubmit: async (state: any, dropinComponent: any) => {
      dropinComponent.setStatus('loading')
      const paymentRequest = {
        browserInfo: state.data.browserInfo || null || undefined,
        paymentMethodDetails: state.data.paymentMethod,
        channel: PaymentConnectChannel.Web,
        market: Market.Denmark,
        returnUrl,
      }

      try {
        const result = await connectPaymentMutation({
          variables: {
            input: paymentRequest as ConnectPaymentInput,
          },
        })

        if (!result) {
          return
        }

        const paymentTokenId =
          result.data.paymentConnection_connectPayment.paymentTokenId

        storage.session.setSession({
          ...storage.session.getSession(),
          paymentTokenId,
          quoteCartId,
        })

        if (
          result.data?.paymentConnection_connectPayment?.__typename ===
          'ActionRequired'
        ) {
          dropinComponent.handleAction(
            result.data.paymentConnection_connectPayment.action,
          )
          return
        }

        if (
          result.data?.paymentConnection_connectPayment?.__typename ===
          'ConnectPaymentFinished'
        ) {
          handleResult(
            dropinComponent,
            result.data?.paymentConnection_connectPayment.status,
          )
        }
      } catch (e) {
        handleResult(dropinComponent, 'error')
      }
    },
    onAdditionalDetails: async (state: any, dropinComponent: any) => {
      const paymentTokenId = storage.session.getSession()?.paymentTokenId
      if (!paymentTokenId) return
      try {
        const result = await submitAdditionalPaymentDetails({
          variables: {
            paymentTokenId,
            paymentRequest: {
              paymentsDetailsRequest: JSON.stringify(state.data),
            },
          },
        })

        if (!result) {
          return
        }

        if (
          result.data?.submitAdditionalPaymentDetails.__typename ===
          'ActionRequired'
        ) {
          dropinComponent.handleAction(
            result.data?.submitAdditionalPaymentDetails.action,
          )
          return
        }

        if (
          result.data?.submitAdditionalPaymentDetails.__typename ===
          'ConnectPaymentFinished'
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
  }

  const adyenCheckout = new (window as any).AdyenCheckout(configuration)
  return adyenCheckout.create('dropin')
}

const getReturnUrl = ({
  currentLocalePath,
}: {
  currentLocalePath: LocaleLabel
}) => {
  return `${window.location.origin}/${currentLocalePath}/new-member/connect-payment/adyen-newcallback`
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
