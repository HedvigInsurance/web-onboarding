import React from 'react'
import { useFormik, FormikHelpers } from 'formik'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { QuoteInput } from 'pages/Offer/Introduction/DetailsModal/types'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useCreateQuoteBundleMutation, QuoteBundleVariant } from 'data/graphql'
import { CheckoutPageWrapper } from '../shared/CheckoutPageWrapper'
import { Footer } from '../shared/Footer'
import { PaymentInfo } from '../shared/PaymentInfo'
import { getUniqueQuotesFromVariantList } from '../../OfferNew/utils'
import { getCheckoutDetailsValidationSchema } from '../../Offer/Checkout/UserDetailsForm'
import { UserData } from '../../OfferNew/types'
import { PriceData } from '../shared/types'
import { ContactInformation } from './ContactInformation/ContactInformation'
import { PaymentDetails } from './PaymentDetails/PaymentDetails'

type Props = {
  data: ReturnType<typeof useQuoteCartData>
  bundleVariants: QuoteBundleVariant[]
  selectedQuoteBundleVariant: QuoteBundleVariant
  quoteCartId: string
  priceData: PriceData
}

export const CheckoutPayment = ({
  data,
  bundleVariants,
  quoteCartId,
  priceData,
}: Props) => {
  const textKeys = useTextKeys()
  const locale = useCurrentLocale()
  const [
    createQuoteBundle,
    { loading: isBundleCreationInProgress },
  ] = useCreateQuoteBundleMutation()
  const mainQuoteData = data?.mainQuote?.data || {}
  console.log(data)
  const userData = data?.userDetails as QuoteInput
  const { firstName, lastName, email, ssn } = userData

  const formik = useFormik<QuoteInput>({
    initialValues: {
      firstName,
      lastName,
      email,
      ssn,
      data: {
        ...mainQuoteData,
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
        console.log(error)
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

  const handleClick = async () => {
    const { submitForm } = formik
    const { res } = await submitForm()
    console.log(res)
  }

  return (
    <CheckoutPageWrapper>
      <ContactInformation formikProps={formik} />
      <PaymentDetails />
      <Footer
        buttonText={textKeys.CHECKOUT_FOOTER_CONTINUE_TO_PAYMENT()}
        buttonOnClick={() => {
          handleClick()
        }}
      >
        <PaymentInfo {...priceData} />
      </Footer>
    </CheckoutPageWrapper>
  )
}
