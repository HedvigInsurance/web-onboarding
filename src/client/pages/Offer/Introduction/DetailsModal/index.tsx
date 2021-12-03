import React from 'react'
import styled from '@emotion/styled'
import { Form, Formik } from 'formik'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { Modal, ModalProps } from 'components/ModalNew'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import {
  BundledQuote,
  useCreateQuoteBundleMutation,
  QuoteData,
  ExtraBuildingInput,
  CreateQuoteInput,
} from 'data/graphql'
import { LocaleLabel, locales } from 'l10n/locales'
import { OfferData } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'
import { captureSentryError } from 'utils/sentry-client'
import { CreateQuoteInsuranceType } from 'utils/insuranceType'
import { getMainQuote, isBundle } from '../../../OfferNew/utils'
import { useQuoteCartIdFromUrl } from '../../useQuoteCartIdFromUrl'
import { Details } from './Details'
import {
  getFieldSchema,
  getInitialInputValues,
  getValidationSchema,
  hasEditQuoteErrors,
  isUnderwritingLimitsHit,
} from './utils'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    padding: 3rem 3rem 1.5rem 3rem;
  }

  @media (max-width: 800px) {
    padding: 2rem 2rem 1.5rem 2rem;
  }

  @media (max-width: 500px) {
    padding: 2rem 1rem 1.5rem 1rem;
  }
`

const Headline = styled.div`
  font-family: ${fonts.FAVORIT};
  font-size: 2.5rem;
  line-height: 3.5rem;
  color: ${colorsV3.black};

  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 3rem;
  }
`

const Footer = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Warning = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 1rem;
  color: ${colorsV3.gray900};
  text-align: center;
`

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 1rem;
  color: ${colorsV3.red500};
  text-align: center;
`

const LoadingDimmer = styled.div<{ visible: boolean }>`
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 350ms;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`

type QuoteInput = QuoteHolderInput & {
  data: QuoteDetailsInput
}

type QuoteHolderInput = Pick<
  CreateQuoteInput,
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phoneNumber'
  | 'startDate'
  | 'currentInsurer'
  | 'ssn'
  | 'dataCollectionId'
>

type QuoteDetailsInput = {
  street?: string | null
  subType?: string | null
  floor?: string | null
  apartment?: string | null
  yearOfConstruction?: number | null
  numberOfBathrooms?: number | null
  isSubleted?: boolean | null
  extraBuildings?: Array<ExtraBuildingInput> | null
  zipCode?: string | null
  livingSpace?: number | null
  householdSize?: number | null
  youth?: boolean | null
  coInsured?: number | null
  student?: boolean | null
  ancillarySpace?: number | null
}

const quoteDataInsuranceTypeToInput = (insuranceType: string) => {
  switch (insuranceType) {
    case 'SWEDISH_APARTMENT':
      return CreateQuoteInsuranceType.SwedishApartment
    case 'SWEDISH_HOUSE':
      return CreateQuoteInsuranceType.SwedishHouse
    case 'SWEDISH_ACCIDENT':
      return CreateQuoteInsuranceType.SwedishAccident
    case 'NORWEGIAN_HOME_CONTENT':
      return CreateQuoteInsuranceType.NorwegianHome
    case 'NORWEGIAN_TRAVEL':
      return CreateQuoteInsuranceType.NorwegianTravel
    case 'DANISH_HOME_CONTENT':
      return CreateQuoteInsuranceType.DanishHome
    case 'DANISH_TRAVEL':
      return CreateQuoteInsuranceType.DanishTravel
    case 'DANISH_ACCIDENT':
      return CreateQuoteInsuranceType.DanishAccident
    default:
      throw new Error(`Unknown insurance type: ${insuranceType}`)
  }
}

const transformQuoteDataToInput = (data: QuoteData): QuoteDetailsInput => ({
  street: data.street,
  subType: data.subType,
  floor: data.floor,
  apartment: data.apartment,
  yearOfConstruction: data.yearOfConstruction,
  numberOfBathrooms: data.numberOfBathrooms,
  isSubleted: data.isSubleted,
  extraBuildings: data.extraBuildings,

  zipCode: data.postalCode,
  livingSpace: data.squareMeters,
  householdSize: data.numberCoInsured,
  youth: data.isYouth,
  coInsured: data.numberCoInsured,
  student: data.isStudent,
  ancillarySpace: data.ancillaryArea,
})

type DetailsModalProps = {
  offerData: OfferData
  allQuotes: BundledQuote[]
  refetch: () => Promise<void>
}

export const DetailsModal: React.FC<ModalProps & DetailsModalProps> = ({
  refetch,
  offerData,
  allQuotes,
  isVisible,
  onClose,
}) => {
  const quoteCartId = useQuoteCartIdFromUrl()
  const textKeys = useTextKeys()
  const [
    createQuoteBundle,
    createQuoteBundleResult,
  ] = useCreateQuoteBundleMutation()
  const mainOfferQuote = getMainQuote(offerData)
  const isBundleOffer = isBundle(offerData)
  const currentLocale = useCurrentLocale()
  const currentLocaleData = locales[currentLocale as LocaleLabel]
  const fieldSchema = getFieldSchema({
    offerQuote: mainOfferQuote,
    currentLocaleData,
  })
  const validationSchema = getValidationSchema(fieldSchema, mainOfferQuote)
  const initialValues = getInitialInputValues(offerData.person, mainOfferQuote)
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [
    isUnderwritingGuidelineHit,
    setIsUnderwritingGuidelineHit,
  ] = React.useState(false)

  const initialValues = transformQuoteDataToInput(mainOfferQuote.data)

  const reCreateQuoteBundle = (form: QuoteInput) => {
    return createQuoteBundle({
      variables: {
        quoteCartId,
        quotes: allQuotes.map((quote) => ({
          ...form,
          data: {
            ...form.data,
            type: quoteDataInsuranceTypeToInput(quote.data.insuranceType),
          },
        })),
      },
    })
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <LoadingDimmer visible={isUpdating} />
      <Container>
        <Formik<QuoteInput>
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={async (form) => {
            setIsUpdating(true)
            setIsUnderwritingGuidelineHit(false)
            try {
              const result = await reCreateQuoteBundle(form)
              if (hasEditQuoteErrors(result)) {
                setIsUpdating(false)
                return
              }
              if (isUnderwritingLimitsHit(result)) {
                setIsUnderwritingGuidelineHit(true)
                setIsUpdating(false)
                return
              }
              await refetch()
              onClose()
            } catch (e) {
              console.error(e)
              captureSentryError(e)
              // noop
            }
            setIsUpdating(false)
          }}
        >
          {(formikProps) => (
            <Form>
              <Headline>{textKeys.DETAILS_MODULE_HEADLINE()}</Headline>
              <Details
                fieldSchema={fieldSchema}
                formikProps={formikProps}
                offerQuote={mainOfferQuote}
              />
              <Footer>
                <Button type="submit" disabled={isUpdating}>
                  {textKeys.DETAILS_MODULE_BUTTON()}
                </Button>
                {createQuoteBundleResult.error && (
                  <ErrorMessage>
                    {textKeys.DETAILS_MODULE_BUTTON_ERROR()}
                  </ErrorMessage>
                )}
                {isUnderwritingGuidelineHit && (
                  <ErrorMessage>
                    {textKeys.DETAILS_MODULE_BUTTON_UNDERWRITING_GUIDELINE_HIT()}
                  </ErrorMessage>
                )}
                {!createQuoteBundleResult.error &&
                  !isUnderwritingGuidelineHit && (
                    <Warning>
                      {textKeys.DETAILS_MODULE_BUTTON_WARNING()}
                    </Warning>
                  )}
              </Footer>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  )
}
