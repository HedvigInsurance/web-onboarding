import React, { useEffect, useState } from 'react'

import { colorsV3 } from '@hedviginsurance/brand'
import { match } from 'matchly'
import { useHistory } from 'react-router'
import { datadogRum } from '@datadog/browser-rum'
import { useTrackOfferEvent } from 'utils/tracking/hooks/useTrackOfferEvent'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LocaleData, LocaleLabel } from 'l10n/locales'
import {
  Scalars,
  usePaymentConnection_ConnectPaymentMutation,
  usePaymentConnection_SubmitAdditionalPaymentDetailsMutation,
  ConnectPaymentInput,
  PaymentConnectChannel,
  usePaymentMethodsQuery,
  PaymentMethodsQuery,
  useAddPaymentTokenMutation,
  PaymentConnection_ConnectPaymentMutationFn,
  AddPaymentTokenMutationFn,
} from 'data/graphql'
import { useStorage, StorageState } from 'utils/StorageContainer'
import { EventName, ErrorEventType } from 'utils/tracking/gtm/types'
import { useSendDatadogAction } from 'utils/tracking/hooks/useSendDatadogAction'

interface Params {
  onSuccess?: () => void
  adyenRef: React.MutableRefObject<HTMLDivElement | null>
  quoteCartId: string
}

const getAvailablePaymentMethods = (
  paymentMethodsResponseNew: PaymentMethodsQuery,
) => {
  if (paymentMethodsResponseNew.quoteCart.paymentConnection) {
    for (const provider of paymentMethodsResponseNew.quoteCart.paymentConnection
      .providers) {
      if (provider?.__typename === 'Adyen') {
        return provider.availablePaymentMethods
      }
    }
  }
}

type ADYEN_STATE = 'NOT_LOADED' | 'LOADED' | 'MOUNTED'

export const useAdyenCheckout = ({
  onSuccess,
  adyenRef,
  quoteCartId,
}: Params) => {
  const [adyenState, setAdyenState] = useState<ADYEN_STATE>('NOT_LOADED')
  const [connectPaymentMutation] = usePaymentConnection_ConnectPaymentMutation()
  const storage = useStorage()
  const [addPaymentTokenMutation] = useAddPaymentTokenMutation()
  const sendDatadogAction = useSendDatadogAction()

  const [
    submitAdditionalPaymentDetails,
  ] = usePaymentConnection_SubmitAdditionalPaymentDetailsMutation()

  const history = useHistory()
  const currentLocale = useCurrentLocale()
  const textKeys = useTextKeys()
  const paymentMethodsResponseNew = usePaymentMethodsQuery({
    variables: {
      id: quoteCartId,
    },
  })

  const paymentMethodsResponse =
    paymentMethodsResponseNew.data &&
    getAvailablePaymentMethods(paymentMethodsResponseNew.data)

  const trackOfferEvent = useTrackOfferEvent()

  const successMessage = textKeys.CHECKOUT_PAYMENT_ADYEN_SETUP_DONE_MESSAGE()

  useEffect(() => {
    if (
      !paymentMethodsResponse ||
      adyenState === 'NOT_LOADED' ||
      adyenState === 'MOUNTED' ||
      !adyenRef.current
    ) {
      return
    }

    const dropinApi = createAdyenCheckout({
      payButtonText: textKeys.CHECKOUT_BUTTON_CONNECT_CARD(),
      successMessage,
      currentLocale,
      paymentMethodsResponse,
      connectPaymentMutation,
      submitAdditionalPaymentDetails,
      quoteCartId,
      history,
      onSubmit: () => sendDatadogAction('payment_submit'),
      onSuccess,
      addPaymentTokenMutation,
      storage,
      onError: (error) =>
        trackOfferEvent({
          eventName: EventName.PaymentConnectedFailed,
          options: { error, errorType: ErrorEventType.PaymentError },
        }),
    })

    dropinApi.mount(adyenRef.current)
    setAdyenState('MOUNTED')
  }, [
    paymentMethodsResponse,
    adyenState,
    textKeys,
    currentLocale,
    connectPaymentMutation,
    submitAdditionalPaymentDetails,
    quoteCartId,
    history,
    adyenRef,
    onSuccess,
    storage,
    trackOfferEvent,
    successMessage,
    addPaymentTokenMutation,
    sendDatadogAction,
  ])

  useEffect(() => {
    mountAdyenJs(() => setAdyenState('LOADED'))()
  }, [])

  useEffect(mountAdyenCss, [])
}

interface AdyenCheckoutProps {
  payButtonText: string
  successMessage: string
  currentLocale: LocaleData
  paymentMethodsResponse: Scalars['PaymentMethodsResponse']
  connectPaymentMutation: PaymentConnection_ConnectPaymentMutationFn
  addPaymentTokenMutation: AddPaymentTokenMutationFn
  submitAdditionalPaymentDetails: any
  history: ReturnType<typeof useHistory>
  onSubmit?: () => void
  onSuccess?: (paymentTokenId?: string) => void
  onError: (e: Error | string) => void
  quoteCartId: string
  storage: StorageState
}

const createAdyenCheckout = ({
  payButtonText,
  successMessage,
  currentLocale,
  paymentMethodsResponse,
  connectPaymentMutation,
  submitAdditionalPaymentDetails,
  addPaymentTokenMutation,
  quoteCartId,
  storage,
  onSubmit,
  onSuccess = () => {
    /* noop */
  },
  onError,
}: AdyenCheckoutProps) => {
  const { isoLocale, path } = currentLocale
  const locale = match<LocaleData['isoLocale'], string>([
    ['nb_NO', 'no-NO'],
    ['da_DK', 'da-DK'],
    [match.any(), 'en-US'],
  ])(isoLocale)

  const returnUrl = getReturnUrl({ currentLocalePath: path })
  const handleResult = (
    dropinComponent: any,
    status: string,
    paymentTokenId?: string,
  ) => {
    if (['AUTHORISED', 'PENDING'].includes(status)) {
      dropinComponent.setStatus('success', { message: successMessage })
      onSuccess(paymentTokenId)
    } else {
      console.error(
        `Received unknown or faulty status type "${status}" as request finished from Adyen`,
      )
      onError(status)
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
      applepay: {
        amount: {
          value: 0,
          currency: currentLocale.currencyCode,
        },
        buttonType: 'subscribe',
        countryCode: currentLocale.marketLabel,
      },
      googlepay: {
        amount: {
          value: 0,
          currency: currentLocale.currencyCode,
        },
        countryCode: currentLocale.marketLabel,
        environment:
          window.hedvigClientConfig.adyenEnvironment === 'live'
            ? 'PRODUCTION'
            : 'TEST',
        buttonType: 'subscribe',
      },
    },
    enableStoreDetails: true,
    returnUrl,
    onSubmit: async (state: any, dropinComponent: any) => {
      onSubmit?.()
      dropinComponent.setStatus('loading')
      const paymentRequest = {
        browserInfo: state.data.browserInfo || null || undefined,
        paymentMethodDetails: state.data.paymentMethod,
        channel: PaymentConnectChannel.Web,
        market: currentLocale.apiMarket,
        returnUrl,
      }

      try {
        const result = await connectPaymentMutation({
          variables: {
            input: paymentRequest as ConnectPaymentInput,
          },
        })

        const paymentTokenId =
          result.data?.paymentConnection_connectPayment.paymentTokenId

        if (paymentTokenId === undefined) {
          handleResult(dropinComponent, 'error')
          return
        }
        storage.session.setSession({
          ...storage.session.getSession(),
          paymentTokenId,
          quoteCartId,
        })
        await addPaymentTokenMutation({
          variables: {
            id: quoteCartId,
            paymentTokenId,
          },
          refetchQueries: ['QuoteCart'],
        })

        if (
          result.data?.paymentConnection_connectPayment?.__typename ===
          'ActionRequired'
        ) {
          dropinComponent.handleAction(
            result.data.paymentConnection_connectPayment.action,
          )
          return
        } else if (
          result.data?.paymentConnection_connectPayment?.__typename ===
          'ConnectPaymentFinished'
        ) {
          handleResult(
            dropinComponent,
            result.data?.paymentConnection_connectPayment.status,
            paymentTokenId,
          )
        } else if (
          result.data?.paymentConnection_connectPayment?.__typename ===
          'ConnectPaymentFailed'
        ) {
          handleResult(dropinComponent, 'error')
          return
        }
      } catch (e) {
        onError(e as Error)
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
        onError(e as Error)
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
  return `${window.location.origin}/${currentLocalePath}/new-member/connect-payment/adyen-cps-callback`
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
