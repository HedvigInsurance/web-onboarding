import React, { useRef, useCallback, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useFormik, FormikHelpers, FormikProps } from 'formik'
import { GraphQLError } from 'graphql'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router'
import { useTrackOfferEvent } from 'utils/tracking/hooks/useTrackOfferEvent'
import { useTrackSignedCustomerEvent } from 'utils/tracking/hooks/useTrackSignedCustomerEvent'
import { useTextKeys } from 'utils/textKeys'
import { QuoteInput } from 'components/DetailsModal/types'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import {
  useStartCheckoutMutation,
  useCheckoutStatusLazyQuery,
  useCreateQuoteBundleMutation,
  QuoteBundleVariant,
  BundledQuote,
  CheckoutStatus,
} from 'data/graphql'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Headline } from 'components/Headline/Headline'

import { isQuoteBundleError, getLimitsHit } from 'api/quoteBundleErrorSelectors'
import { setupQuoteCartSession } from 'containers/SessionContainer'
import { useStorage } from 'utils/StorageContainer'
import { ErrorEventType, EventName } from 'utils/tracking/gtm/types'

import { useScrollToTop } from 'utils/hooks/useScrollToTop'
import { useDebounce } from 'utils/hooks/useDebounce'
import { useAdyenCheckout } from '../../ConnectPayment/components/useAdyenCheckout'
import {
  CheckoutPageWrapper,
  WrapperWidth,
} from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { CheckoutIntercomVariation } from '../shared/CheckoutIntercomVariation'
import { getUniqueQuotesFromVariantList } from '../../OfferNew/utils'
import { getCheckoutDetailsValidationSchema } from '../../Offer/Checkout/UserDetailsForm'
import { PriceData } from '../shared/types'
import { apolloClient as realApolloClient } from '../../../apolloClient'
import { CheckoutSuccessRedirect } from '../../Offer/CheckoutSuccessRedirect'
import {
  CheckoutErrorModal,
  ThreeDSErrorModal,
  onRetry,
} from '../shared/ErrorModal'
import { checkIsManualReviewRequired, isSsnInvalid } from '../utils'
import { ContactInformation } from './ContactInformation/ContactInformation'

const { gray100, gray600, gray700, gray300, gray900 } = colorsV3

const AdyenContainer = styled.div`
  #dropin-container {
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

    .adyen-checkout__button {
      background-color: ${colorsV3.purple500};
      color: ${colorsV3.gray900};
      transition: transform 300ms;

      &:hover {
        background-color: ${colorsV3.purple500};
        transform: translateY(-2px);
        box-shadow: 0 3px 5px rgb(55 55 55 / 15%);
      }
    }

    .adyen-checkout__button__icon {
      display: none;
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

const useSubmitFormOnSsnChange = (formik: FormikProps<QuoteInput>) => {
  const debouncedSsn = useDebounce(formik.values.ssn, 500)
  const formikInitialSsn = formik.initialValues.ssn
  const formikSubmitForm = formik.submitForm
  useEffect(() => {
    if (debouncedSsn !== formikInitialSsn) {
      formikSubmitForm()
    }
  }, [debouncedSsn, formikInitialSsn, formikSubmitForm])
}

type Props = {
  bundleVariants: QuoteBundleVariant[]
  quoteCartId: string
  priceData: PriceData
  mainQuote: BundledQuote
  selectedQuoteBundleVariant: QuoteBundleVariant
  quoteIds: string[]
  checkoutStatus?: CheckoutStatus
}

export const CheckoutPayment = ({
  bundleVariants,
  quoteCartId,
  priceData,
  mainQuote,
  quoteIds,
  selectedQuoteBundleVariant,
  checkoutStatus,
}: Props) => {
  const textKeys = useTextKeys()

  const locale = useCurrentLocale()
  const client = useApolloClient()
  const storage = useStorage()
  const trackOfferEvent = useTrackOfferEvent()
  const trackSignedCustomerEvent = useTrackSignedCustomerEvent()

  const adyenRef = useRef<HTMLDivElement | null>(null)
  const [
    createQuoteBundle,
    { loading: isBundleCreationInProgress },
  ] = useCreateQuoteBundleMutation()
  const [startCheckout] = useStartCheckoutMutation()
  const [getStatus] = useCheckoutStatusLazyQuery({
    pollInterval: 1000,
  })
  const history = useHistory()
  const {
    location: { search },
  } = history
  const is3DsError = search.includes('error')
  const is3DsComplete = search.includes('3dsSuccess')
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [is3dsError, setIs3dsError] = useState(false)
  const [isPaymentConnected, setIsPaymentConnected] = useState(false)

  useScrollToTop()

  //handle 3ds error
  useEffect(() => {
    if (is3DsError) {
      history.replace('?')
      trackOfferEvent({
        eventName: EventName.SignError,
        options: { errorType: ErrorEventType.threeDS },
      })
      setIs3dsError(true)
    }
  }, [is3DsError, history, trackOfferEvent])

  const addPaymentToCart = () => {
    setIsPaymentConnected(true)
  }

  const performCheckout = useCallback(async () => {
    try {
      setIsDataLoading(true)
      const { data } = await startCheckout({
        variables: { quoteIds, quoteCartId },
      })
      if (data?.quoteCart_startCheckout.__typename === 'BasicError') {
        console.error('Could not start checkout')
        trackOfferEvent({
          eventName: EventName.SignError,
          options: { errorType: ErrorEventType.BasicError },
        })
        setIsError(true)
      }
      // Poll for Status
      getStatus({
        variables: {
          quoteCartId,
        },
      })
    } catch (error) {
      const isManualReviewRequired = checkIsManualReviewRequired(
        (error.graphQLErrors || []) as GraphQLError[],
      )
      if (isManualReviewRequired) {
        trackOfferEvent({
          eventName: EventName.SignError,
          options: { error, errorType: ErrorEventType.ManualReviewRequired },
        })
        throw new Error('Manual Review required')
      }
      setIsDataLoading(false)
      trackOfferEvent({
        eventName: EventName.SignError,
        options: { error, errorType: ErrorEventType.CheckoutStart },
      })
      console.error('Could not start checkout')
      setIsError(true)
    }
  }, [getStatus, quoteCartId, quoteIds, startCheckout, trackOfferEvent])
  useAdyenCheckout({
    adyenRef,
    onSuccess: addPaymentToCart,
    quoteCartId,
    isSuccess: isPaymentConnected,
  })

  const { firstName, lastName, email, ssn, phoneNumber } = mainQuote
  const formik = useFormik<QuoteInput>({
    initialValues: {
      firstName,
      lastName,
      email,
      ssn,
      phoneNumber,
      data: {
        ...mainQuote.data,
      },
    } as QuoteInput,
    validationSchema: getCheckoutDetailsValidationSchema(locale, textKeys),
    validateOnChange: false,
    onSubmit: async (
      form: QuoteInput,
      { setErrors }: FormikHelpers<QuoteInput>,
    ) => {
      try {
        const { data } = await reCreateQuoteBundle(form)
        const isUpdateQuotesFailed = isQuoteBundleError(data)
        const limits = getLimitsHit(data)
        if (isUpdateQuotesFailed && limits.length) {
          setErrors({ ssn: textKeys.INVALID_FIELD() })
        }
        return data
      } catch (error) {
        if (isSsnInvalid(error.graphQLErrors)) {
          setErrors({ ssn: textKeys.INVALID_FIELD() })
        }
        return undefined
      }
    },
    enableReinitialize: true,
  })
  const isFormikError = Object.keys(formik.errors).length > 0
  useEffect(() => {
    if (is3DsComplete && checkoutStatus === undefined) {
      trackOfferEvent({ eventName: EventName.PaymentDetailsConfirmed })
      addPaymentToCart()
    }
  }, [is3DsComplete, checkoutStatus, storage.session, trackOfferEvent])

  useEffect(() => {
    if (isPaymentConnected) {
      trackOfferEvent({ eventName: EventName.PaymentDetailsConfirmed })
    }
  }, [isPaymentConnected, trackOfferEvent])

  const completeCheckout = useCallback(async () => {
    try {
      const memberId = await setupQuoteCartSession({
        quoteCartId,
        apolloClientUtils: {
          ...realApolloClient!,
          client,
        },
        storage,
      })
      trackSignedCustomerEvent({ memberId })
    } catch (error) {
      trackOfferEvent({
        eventName: EventName.SignError,
        options: { errorType: ErrorEventType.QuoteCartSetup },
      })
      throw new Error('Setup quote cart session failed')
    }
  }, [client, quoteCartId, storage, trackOfferEvent, trackSignedCustomerEvent])

  const reCreateQuoteBundle = (form: QuoteInput) => {
    const {
      firstName,
      lastName,
      birthDate,
      email,
      ssn,
      phoneNumber,
      dataCollectionId,
    } = form
    return createQuoteBundle({
      variables: {
        locale: locale.isoLocale,
        quoteCartId,
        quotes: getUniqueQuotesFromVariantList(bundleVariants).map(
          ({
            startDate,
            currentInsurer,
            data: { type, typeOfContract, isStudent },
          }) => {
            return {
              firstName,
              lastName,
              email,
              birthDate,
              ssn,
              startDate,
              currentInsurer: currentInsurer?.id,
              phoneNumber: phoneNumber?.replace(/\s/g, ''),
              dataCollectionId,
              data: {
                ...form.data,
                type,
                typeOfContract,
                isStudent,
              },
            }
          },
        ),
      },
    })
  }

  const handleClickCompletePurchase = async () => {
    if (!isPaymentConnected) return

    trackOfferEvent({
      eventName: EventName.ButtonClick,
      options: { buttonId: 'complete_purchase' },
    })

    const { validateForm, submitForm, dirty: isFormDataUpdated } = formik

    const errors = await validateForm()
    if (Object.keys(errors).length > 0) return

    if (isFormDataUpdated) {
      const { data } = await submitForm()
      const isUpdateQuotesFailed = isQuoteBundleError(data)
      if (isUpdateQuotesFailed) throw Error('Updating quotes has failed')
    }

    await performCheckout()
  }

  useSubmitFormOnSsnChange(formik)

  useEffect(() => {
    if (checkoutStatus === CheckoutStatus.Signed) {
      completeCheckout()
    }
  }, [checkoutStatus, completeCheckout])

  if (checkoutStatus === CheckoutStatus.Completed) {
    return (
      <CheckoutSuccessRedirect
        bundle={selectedQuoteBundleVariant.bundle}
        connectPayment={false}
      />
    )
  }

  if (isError) {
    return <CheckoutErrorModal isVisible onRetry={onRetry} />
  }

  const handleClickBackButton = () => {
    trackOfferEvent({ eventName: EventName.ContactInformationPageGoBack })
  }

  return (
    <CheckoutPageWrapper handleClickBackButton={handleClickBackButton}>
      <ThreeDSErrorModal
        isVisible={is3dsError}
        onClose={() => setIs3dsError(false)}
      />
      <ContactInformation formikProps={formik} />
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
      <CheckoutIntercomVariation />
      {mainQuote && (
        <Footer
          buttonText={textKeys.CHECKOUT_FOOTER_COMPLETE_PURCHASE()}
          buttonOnClick={handleClickCompletePurchase}
          isLoading={isBundleCreationInProgress || isDataLoading}
          disabled={isFormikError || !isPaymentConnected}
        >
          <PaymentInfo {...priceData} />
        </Footer>
      )}
    </CheckoutPageWrapper>
  )
}
