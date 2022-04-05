import React, { useRef, useCallback, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useFormik, FormikHelpers } from 'formik'
import { GraphQLError } from 'graphql'
import { Redirect } from 'react-router'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import {
  useStartCheckoutMutation,
  useCheckoutStatusQuery,
  useCheckoutStatusLazyQuery,
  useCreateQuoteBundleMutation,
  QuoteBundleVariant,
  BundledQuote,
  CheckoutStatus,
} from 'data/graphql'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { Headline } from 'components/Headline/Headline'
import { QuoteInput } from 'pages/Offer/Introduction/DetailsModal/types'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LimitCode, isQuoteBundleError } from 'api/quoteBundleErrorSelectors'
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
  quoteIds: string[]
}

export const CheckoutPayment = ({
  bundleVariants,
  quoteCartId,
  priceData,
  mainQuote,
  quoteIds,
}: Props) => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()
  const [
    createQuoteBundle,
    { loading: isBundleCreationInProgress },
  ] = useCreateQuoteBundleMutation()
  const { path: currentLocalePath } = useCurrentLocale()

  const adyenRef = useRef<HTMLDivElement | null>(null)
  const [startCheckout] = useStartCheckoutMutation()
  const [getStatus] = useCheckoutStatusLazyQuery({
    pollInterval: 1000,
  })
  const [finishedPayment, setFinishedPayment] = useState(false)
  useEffect(() => {
    finishedPayment && startSign()
  }, [finishedPayment])

  const onSuccess = useCallback(async () => {
    setFinishedPayment(true)
  }, [])

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

    //submit Adyen
    checkoutAPI?.submit()
    console.log(checkoutAPI?.onComplete())
    const data = await startCheckout({
      variables: { quoteCartId, quoteIds },
    })

    console.log(data)

    const checkoutStatus = getStatus({
      variables: {
        quoteCartId,
      },
    })

    console.log(checkoutStatus)
    // after the flow has finished we should redirect to the last page
    // if (checkoutStatus === CheckoutStatus.Signed) {
    //   return <Redirect to={`/${currentLocalePath}/download`} />
    // }
  }

  const checkoutAPI = useAdyenCheckout({
    adyenRef,
    onSuccess,
  })

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
