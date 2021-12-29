import React from 'react'
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
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { getBundleVariantFromInsuranceTypesWithFallback } from 'pages/OfferNew/utils'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { QuoteInput } from './types'
import { Details, getValidationSchema } from './Details'

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

type DetailsModalProps = {
  quoteCartId: string
  allQuotes: BundledQuote[]
}

export const DetailsModal: React.FC<ModalProps & DetailsModalProps> = ({
  quoteCartId,
  allQuotes,
  isVisible,
  onClose,
}) => {
  const textKeys = useTextKeys()
  const { isoLocale, marketLabel } = useCurrentLocale()

  const [
    createQuoteBundle,
    {
      data: createQuoteBundleData,
      error: createQuoteBundleError,
      loading: isBundleCreationInProgress,
    },
  ] = useCreateQuoteBundleMutation()

  const { data } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })
  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()

  const bundleVariants = (data?.quoteCart.bundle?.possibleVariations ??
    []) as Array<QuoteBundleVariant>
  const selectedQuoteBundle = getBundleVariantFromInsuranceTypesWithFallback(
    bundleVariants,
    selectedInsuranceTypes,
  )

  if (!selectedQuoteBundle) return null

  const {
    firstName,
    lastName,
    birthDate,
    ssn,
    email,
    data: mainQuoteData,
  } = selectedQuoteBundle?.bundle.quotes[0]

  const { type: mainQuoteType, numberCoInsured } = mainQuoteData
  const initialValues = {
    firstName,
    lastName,
    birthDate,
    ssn,
    email,
    data: {
      ...mainQuoteData,
      householdSize: numberCoInsured + 1,
    },
  } as QuoteInput

  const isInvalidCreateQuoteBundleInput =
    createQuoteBundleData?.quoteCart_createQuoteBundle.__typename ===
    'QuoteBundleError'

  const reCreateQuoteBundle = (form: QuoteInput) => {
    return createQuoteBundle({
      variables: {
        locale: isoLocale,
        quoteCartId,
        quotes: allQuotes.map(({ data: { id, type, typeOfContract } }) => {
          const {
            firstName,
            lastName,
            birthDate,
            ssn,
            email,
            data: { householdSize, phoneNumber },
          } = form

          return {
            firstName,
            lastName,
            birthDate,
            ssn,
            email,
            phoneNumber,
            data: {
              ...form.data,
              numberCoInsured: householdSize && householdSize - 1,
              id,
              type,
              typeOfContract,
            },
          }
        }),
      },
      refetchQueries: ['quoteCart'],
      awaitRefetchQueries: true,
    })
  }

  const onSubmit = async (form: QuoteInput) => {
    const { data } = await reCreateQuoteBundle(form)
    const isLimitHit =
      data?.quoteCart_createQuoteBundle.__typename === 'QuoteBundleError'

    if (!isLimitHit) {
      onClose()
    }
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <LoadingDimmer visible={isBundleCreationInProgress} />
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(marketLabel, mainQuoteType)}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formikProps) => (
            <Form>
              <Headline>{textKeys.DETAILS_MODULE_HEADLINE()}</Headline>
              <Details
                market={marketLabel}
                type={mainQuoteType}
                formikProps={formikProps}
              />
              <Footer>
                <Button
                  type="submit"
                  disabled={isBundleCreationInProgress || !formikProps.isValid}
                >
                  {textKeys.DETAILS_MODULE_BUTTON()}
                </Button>
                {createQuoteBundleError && (
                  <ErrorMessage>
                    {textKeys.DETAILS_MODULE_BUTTON_ERROR()}
                  </ErrorMessage>
                )}
                {isInvalidCreateQuoteBundleInput && (
                  <ErrorMessage>
                    {textKeys.DETAILS_MODULE_BUTTON_UNDERWRITING_GUIDELINE_HIT()}
                  </ErrorMessage>
                )}
                {!createQuoteBundleError &&
                  !isInvalidCreateQuoteBundleInput && (
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
