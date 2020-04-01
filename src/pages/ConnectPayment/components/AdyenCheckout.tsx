import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import {
  getLocaleIsoCode,
  useCurrentLocale,
} from 'components/utils/CurrentLocale'
import {
  Scalars,
  TokenizationChannel,
  TokenizePaymentDetailsMutationFn,
  useAvailablePaymentMethodsQuery,
  useTokenizePaymentDetailsMutation,
} from 'data/graphql'
import { match } from 'matchly'
import { Spinner } from 'new-components/utils'
import * as React from 'react'
import { useHistory } from 'react-router'
import { SpinnerWrapper } from './Spinner'

const Wrapper = styled('div')`
  position: relative;

  @media (min-width: 801px) {
    padding-right: 5rem;
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
    background: ${colorsV2.offwhite};
  }
`

export const AdyenCheckout = () => {
  const availablePaymentMethods = useAvailablePaymentMethodsQuery()
  const adyenCheckoutRef = React.useRef<HTMLDivElement>()
  const [adyenLoaded, setAdyenLoaded] = React.useState(false)
  const [tokenizePaymentMutation] = useTokenizePaymentDetailsMutation()
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
  history: ReturnType<typeof useHistory>
}

const createAdyenCheckout = ({
  currentLocale,
  paymentMethodsResponse,
  tokenizePaymentMutation,
  history,
}: AdyenCheckoutProps) => {
  const locale = match([
    ['sv_SE', 'sv-SE'],
    ['en_SE', 'en-US'],
    ['nb_NO', 'no-NO'],
    ['en_NO', 'en-US'],
  ])(getLocaleIsoCode(currentLocale))

  const returnUrl = `${window.location.origin}${
    currentLocale ? '/' + currentLocale : ''
  }/new-member/connect-payment` // FIXME maybe this should be /download?

  const configuration = {
    locale,
    environment: (window as any).ADYEN_ENVIRONMENT,
    originKey: (window as any).ADYEN_ORIGIN_KEY,
    paymentMethodsResponse: JSON.parse(paymentMethodsResponse),
    paymentMethodsConfiguration: {
      card: {
        hasHolderName: true,
        holderNameRequired: true,
      },
    },
    enableStoreDetails: true,
    returnUrl,
    // onChange: console.log,
    onAdditionalDetails: (state: any, _dropinComponent: any) => {
      // TODO call to additional details mutation?
      // tslint:disable-next-line no-console
      console.log(state)
    },
    onSubmit: async (state: any, dropinComponent: any) => {
      dropinComponent.setStatus('loading')
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
        if (
          ['Authorised', 'Pending'].includes(
            result.data.tokenizePaymentDetails.resultCode,
          )
        ) {
          history.push(
            currentLocale
              ? '/' + currentLocale + '/new-member/download'
              : '/new-member/download',
          )
        } else {
          // tslint:disable-next-line no-console
          console.error(
            `Received unknown or faulty status type "${result.data.tokenizePaymentDetails.resultCode}" as TokenizationResponseFinished from Adyen`,
          )
          dropinComponent.setStatus('error') // FIXME Can we handle this in a better way? Rentry logic maybe?
        }
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
