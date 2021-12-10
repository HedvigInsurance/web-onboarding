import React from 'react'
import * as Yup from 'yup'
import styled from '@emotion/styled'
import { Form, Formik } from 'formik'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { Modal, ModalProps } from 'components/ModalNew'
import {
  BundledQuote,
  useCreateQuoteBundleMutation,
  useQuoteCartQuery,
  QuoteBundleVariant,
} from 'data/graphql'

import { useTextKeys } from 'utils/textKeys'
import { CreateQuoteInsuranceType } from 'utils/insuranceType'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { birthDateFormats } from 'l10n/birthDateAndSsnFormats'
import { MarketLabel } from 'l10n/locales'
import { getBundleVariantFromInsuranceTypes } from 'pages/OfferNew/utils'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { useQuoteCartIdFromUrl } from '../../useQuoteCartIdFromUrl'
import { QuoteInput } from './types'
import { Details } from './Details'

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
  z-index: 2;
`

const getValidationSchema = (
  market: MarketLabel,
  type: CreateQuoteInsuranceType,
) => {
  const isSwedishHouse = type === CreateQuoteInsuranceType.SwedishHouse

  return Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    birthDate: Yup.string().matches(birthDateFormats.backEndDefault),
    data: Yup.object({
      street: Yup.string().required(),
      zipCode:
        market === 'SE'
          ? Yup.string().matches(/^[0-9]{3}[0-9]{2}$/)
          : Yup.string().matches(/^[0-9]{4}$/),
      livingSpace: Yup.number()
        .min(1)
        .required(),
      householdSize: Yup.number()
        .min(1)
        .required(),
      isYouth: Yup.boolean(),
      isStudent: Yup.boolean(),

      ...(!isSwedishHouse && { subType: Yup.string().required() }),

      ...(isSwedishHouse && {
        ancillaryArea: Yup.number()
          .min(1)
          .required(),
        numberOfBathrooms: Yup.number()
          .min(0)
          .required(),
        yearOfConstruction: Yup.number().required(),
        isSubleted: Yup.boolean().required(),
        extraBuildings: Yup.array().of(
          Yup.object().shape({
            type: Yup.string().required(),
            area: Yup.number()
              .min(1)
              .required(),
            hasWaterConnected: Yup.boolean().required(),
          }),
        ),
      }),
    }).required(),
  })
}

type DetailsModalProps = {
  allQuotes: BundledQuote[]
  refetch: () => Promise<void>
}

export const DetailsModal: React.FC<ModalProps & DetailsModalProps> = ({
  refetch,
  allQuotes,
  isVisible,
  onClose,
}) => {
  const textKeys = useTextKeys()
  const { isoLocale, marketLabel } = useCurrentLocale()
  const quoteCartId = useQuoteCartIdFromUrl()

  const [
    createQuoteBundle,
    { error: createQuoteBundleError, loading: isBundleCreationInProgress },
  ] = useCreateQuoteBundleMutation()
  const [
    isUnderwritingGuidelineHit,
    setIsUnderwritingGuidelineHit,
  ] = React.useState(false)

  const { data } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })
  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()

  const bundleVariants = (data?.quoteCart.bundle?.possibleVariations ??
    []) as Array<QuoteBundleVariant>
  const selectedQuoteBundle =
    getBundleVariantFromInsuranceTypes(
      bundleVariants,
      selectedInsuranceTypes,
    ) || bundleVariants[0]

  if (!selectedQuoteBundle) return null

  const mainQuote = selectedQuoteBundle?.bundle.quotes[0]
  const initialValues = {
    firstName: mainQuote.firstName,
    lastName: mainQuote.lastName,
    birthDate: mainQuote.birthDate,
    ssn: mainQuote.ssn,
    data: {
      ...mainQuote.data,
      householdSize: mainQuote.data.numberCoInsured + 1,
    },
  } as QuoteInput

  const reCreateQuoteBundle = (form: QuoteInput) => {
    return createQuoteBundle({
      variables: {
        quoteCartId,
        quotes: allQuotes.map(({ data: { type, typeOfContract } }) => {
          return {
            ...form,
            data: {
              ...form.data,
              numberCoInsured:
                form.data.householdSize && form.data.householdSize - 1,
              type,
              typeOfContract,
            },
          }
        }),
      },
    })
  }

  const onSubmit = async (form: QuoteInput) => {
    const { data } = await reCreateQuoteBundle(form)
    const isLimitHit =
      data?.quoteCart_createQuoteBundle.__typename === 'CreateQuoteBundleError'

    if (isLimitHit) {
      setIsUnderwritingGuidelineHit(true)
    } else {
      refetch()
      onClose()
    }
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <LoadingDimmer visible={isBundleCreationInProgress} />
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(
            marketLabel,
            mainQuote.data.type,
          )}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <Form>
              <Headline>{textKeys.DETAILS_MODULE_HEADLINE()}</Headline>
              <Details formikProps={formikProps} />
              <Footer>
                <Button type="submit" disabled={isBundleCreationInProgress}>
                  {textKeys.DETAILS_MODULE_BUTTON()}
                </Button>
                {createQuoteBundleError && (
                  <ErrorMessage>
                    {textKeys.DETAILS_MODULE_BUTTON_ERROR()}
                  </ErrorMessage>
                )}
                {isUnderwritingGuidelineHit && (
                  <ErrorMessage>
                    {textKeys.DETAILS_MODULE_BUTTON_UNDERWRITING_GUIDELINE_HIT()}
                  </ErrorMessage>
                )}
                {!createQuoteBundleError && !isUnderwritingGuidelineHit && (
                  <Warning>{textKeys.DETAILS_MODULE_BUTTON_WARNING()}</Warning>
                )}
              </Footer>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  )
}
