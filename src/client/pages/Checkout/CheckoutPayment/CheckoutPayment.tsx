import React from 'react'
import { useFormik, FormikHelpers } from 'formik'
import { GraphQLError } from 'graphql'
import { useTextKeys } from 'utils/textKeys'
import { QuoteInput } from 'pages/Offer/Introduction/DetailsModal/types'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import {
  useCreateQuoteBundleMutation,
  QuoteBundleVariant,
  BundledQuote,
} from 'data/graphql'
import { LimitCode, isQuoteBundleError } from 'api/quoteBundleErrorSelectors'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { getUniqueQuotesFromVariantList } from '../../OfferNew/utils'
import { getCheckoutDetailsValidationSchema } from '../../Offer/Checkout/UserDetailsForm'
import { PriceData } from '../shared/types'
import { ContactInformation } from './ContactInformation/ContactInformation'
import { PaymentDetails } from './PaymentDetails/PaymentDetails'

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
}

export const CheckoutPayment = ({
  bundleVariants,
  quoteCartId,
  priceData,
  mainQuote,
}: Props) => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()
  const [
    createQuoteBundle,
    { loading: isBundleCreationInProgress },
  ] = useCreateQuoteBundleMutation()

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
  }

  return (
    <CheckoutPageWrapper>
      <ContactInformation formikProps={formik} />
      <PaymentDetails />
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        buttonOnClick={() => {
          startSign()
        }}
        isLoading={isBundleCreationInProgress}
      >
        <PaymentInfo {...priceData} />
      </Footer>
    </CheckoutPageWrapper>
  )
}
