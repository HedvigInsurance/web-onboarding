import React, { useRef, useCallback, useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useFormik, FormikHelpers } from 'formik'
import { GraphQLError } from 'graphql'
import { useApolloClient } from '@apollo/client'
import { useParams } from 'react-router'
import { useTextKeys } from 'utils/textKeys'
import {
  useStartCheckoutMutation,
  useCheckoutStatusLazyQuery,
  useCreateQuoteBundleMutation,
  QuoteBundleVariant,
  BundledQuote,
  CheckoutStatus,
  useAddPaymentTokenMutation,
} from 'data/graphql'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Headline } from 'components/Headline/Headline'
import { QuoteInput } from 'pages/Offer/Introduction/DetailsModal/types'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LimitCode, isQuoteBundleError } from 'api/quoteBundleErrorSelectors'
import { setupQuoteCartSession } from 'containers/SessionContainer'
import { trackSignedCustomerEvent } from 'utils/tracking/trackSignedCustomerEvent'
import { useStorage } from 'utils/StorageContainer'
import { useVariation } from 'utils/hooks/useVariation'
import { useAdyenCheckout } from '../../ConnectPayment/components/useAdyenCheckout'
import {
  CheckoutPageWrapper,
  WrapperWidth,
} from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { getUniqueQuotesFromVariantList } from '../../OfferNew/utils'
import { getCheckoutDetailsValidationSchema } from '../../Offer/Checkout/UserDetailsForm'
import { PriceData } from '../shared/types'
import { apolloClient as realApolloClient } from '../../../apolloClient'
import { CheckoutSuccessRedirect } from '../../Offer/CheckoutSuccessRedirect'
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

// TODO These functions are duplicates
const checkIsManualReviewRequired = (errors: GraphQLError[]) => {
  const manualReviewRequiredError = errors.find((error) => {
    return error?.extensions?.body?.errorCode === 'MANUAL_REVIEW_REQUIRED'
  })

  return manualReviewRequiredError !== undefined
}

// TODO These functions are duplicates
const isSsnInvalid = (errors: GraphQLError[]) => {
  const invalidSsnError = errors.find((error) => {
    return error?.extensions?.body?.errorCode === LimitCode.INVALID_SSN
  })

  return invalidSsnError !== undefined
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
  const variation = useVariation()
  const adyenRef = useRef<HTMLDivElement | null>(null)
  const [
    createQuoteBundle,
    { loading: isBundleCreationInProgress },
  ] = useCreateQuoteBundleMutation()
  const [startCheckout] = useStartCheckoutMutation()
  const [addPaymentTokenMutation] = useAddPaymentTokenMutation()
  const [getStatus] = useCheckoutStatusLazyQuery({
    pollInterval: 1000,
  })

  const { payment: is3DsComplete } = useParams<{ payment: string }>()
  const onConnectPaymentSuccess = useCallback(async () => {
    const paymentTokenId = storage.session.getSession()?.paymentTokenId
    if (!paymentTokenId) throw new Error('No token payment id')
    addPaymentTokenMutation({
      variables: {
        id: quoteCartId,
        paymentTokenId,
      },
    })
    try {
      const { data } = await startCheckout({
        variables: { quoteIds, quoteCartId },
      })
      if (data?.quoteCart_startCheckout.__typename === 'BasicError') {
        throw new Error('Checkout Failed')
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
        throw new Error('Manual Review required')
      }

      throw new Error('Checkout Failed')
    }
  }, [
    addPaymentTokenMutation,
    getStatus,
    quoteCartId,
    quoteIds,
    startCheckout,
    storage,
  ])
  const checkoutAPI = useAdyenCheckout({
    adyenRef,
    onSuccess: onConnectPaymentSuccess,
    quoteCartId,
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
    onSubmit: async (
      form: QuoteInput,
      { setErrors }: FormikHelpers<QuoteInput>,
    ) => {
      try {
        return await reCreateQuoteBundle(form)
      } catch (error) {
        if (isSsnInvalid(error.graphQLErrors)) {
          setErrors({ ssn: textKeys.INVALID_FIELD() })
        }
        return undefined
      }
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    if (is3DsComplete === 'true') {
      onConnectPaymentSuccess()
    }
  }, [is3DsComplete, onConnectPaymentSuccess])

  const completeCheckout = useCallback(async () => {
    try {
      const memberId = await setupQuoteCartSession({
        quoteCartId,
        apolloClientUtils: {
          client,
          subscriptionClient: realApolloClient!.subscriptionClient,
          httpLink: realApolloClient!.httpLink,
        },
        storage,
      })
      trackSignedCustomerEvent({
        variation,
        campaignCode: priceData.campaignCode,
        isDiscountMonthlyCostDeduction:
          priceData.isDiscountMonthlyCostDeduction,
        memberId,
        bundle: selectedQuoteBundleVariant.bundle,
        quoteCartId,
      })
    } catch (error) {
      throw new Error('Setup quote cart session failed')
    }
  }, [
    priceData.campaignCode,
    priceData.isDiscountMonthlyCostDeduction,
    client,
    selectedQuoteBundleVariant.bundle,
    quoteCartId,
    storage,
    variation,
  ])

  useEffect(() => {
    if (checkoutStatus === CheckoutStatus.Signed) {
      completeCheckout()
    }
  }, [checkoutStatus, completeCheckout])

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

  const startSign = async () => {
    const { submitForm, dirty: isFormDataUpdated } = formik
    if (isFormDataUpdated) {
      const { data } = await submitForm()
      const isUpdateQuotesFailed = isQuoteBundleError(data)
      if (isUpdateQuotesFailed) throw Error('Updating quotes has failed')
    }

    checkoutAPI?.submit()
  }

  if (checkoutStatus === CheckoutStatus.Completed) {
    return (
      <CheckoutSuccessRedirect
        bundle={selectedQuoteBundleVariant.bundle}
        connectPayment={false}
      />
    )
  }

  return (
    <CheckoutPageWrapper>
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
      {mainQuote && (
        <Footer
          buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
          buttonOnClick={() => {
            startSign()
          }}
          isLoading={isBundleCreationInProgress}
        >
          <PaymentInfo {...priceData} />
        </Footer>
      )}
    </CheckoutPageWrapper>
  )
}
