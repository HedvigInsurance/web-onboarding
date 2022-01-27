import React from 'react'
import styled from '@emotion/styled'
import { Form, Formik, FormikHelpers } from 'formik'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { Modal, ModalProps } from 'components/ModalNew'
import {
  BundledQuote,
  useCreateQuoteBundleMutation,
  useQuoteCartQuery,
  UnderwritingLimit,
} from 'data/graphql'

import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { getSelectedBundleVariant } from 'api/quoteCartQuerySelectors'
import {
  getLimitsHit,
  LimitCode,
  isLimitHit,
} from 'api/quoteBundleErrorSelectors'
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

type FormErrors = {
  [key: string]: string
} & { data: Record<string, string> }

function getFormErrorsFromUnderwritterLimits(
  limits: UnderwritingLimit[],
  invalidFieldErrorMessage: string,
) {
  const invalidFields = limits.reduce((acc, limit) => {
    const { code } = limit
    switch (code as LimitCode) {
      case LimitCode.INVALID_BIRTHDATE:
      case LimitCode.UNDERAGE:
      case LimitCode.STUDENT_OVERAGE:
        return [...acc, 'birthDate']
      case LimitCode.TOO_SMALL_LIVING_SPACE:
      case LimitCode.TOO_MUCH_LIVING_SPACE:
      case LimitCode.STUDENT_TOO_MUCH_LIVING_SPACE:
      case LimitCode.YOUTH_TOO_MUCH_LIVING_SPACE:
        return [...acc, 'data.livingSpace']
      case LimitCode.NEGATIVE_NUMBER_OF_CO_INSURED:
      case LimitCode.TOO_HIGH_NUMBER_OF_CO_INSURED:
      case LimitCode.YOUTH_TOO_HIGH_NUMBER_OF_CO_INSURED:
      case LimitCode.TOO_SMALL_NUMBER_OF_HOUSE_HOLD_SIZE:
      case LimitCode.TOO_HIGH_NUMBER_OF_HOUSE_HOLD_SIZE:
      case LimitCode.STUDENT_TOO_BIG_HOUSE_HOLD_SIZE:
        return [...acc, 'data.householdSize']
      case LimitCode.TOO_EARLY_YEAR_OF_CONSTRUCTION:
        return [...acc, 'data.yearOfConstruction']
      default:
        return []
    }
  }, [] as string[])

  return invalidFields.reduce(
    (acc, fieldName) => {
      if (fieldName.startsWith('data.')) {
        const subFieldName = fieldName.split('.')[1]
        acc.data = {
          ...acc.data,
          [subFieldName]: invalidFieldErrorMessage,
        }
      } else {
        acc[fieldName] = invalidFieldErrorMessage
      }
      return acc
    },
    { data: {} } as FormErrors,
  )
}

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

  const { data: quoteCartQueryData } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })
  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()
  const selectedQuoteBundle = getSelectedBundleVariant(
    quoteCartQueryData,
    selectedInsuranceTypes,
  )

  if (!selectedQuoteBundle) return null

  const {
    firstName,
    lastName,
    birthDate,
    ssn,
    email,
    phoneNumber,
    startDate,
    data: mainQuoteData,
  } = selectedQuoteBundle?.bundle.quotes[0]

  const { type: mainQuoteType, numberCoInsured } = mainQuoteData
  const initialValues = {
    firstName,
    lastName,
    birthDate,
    ssn,
    email,
    phoneNumber,
    startDate,
    data: {
      ...mainQuoteData,
      householdSize: numberCoInsured + 1,
    },
  } as QuoteInput

  const isInvalidCreateQuoteBundleInput = isLimitHit(createQuoteBundleData)

  const reCreateQuoteBundle = (form: QuoteInput) => {
    const {
      data: { householdSize },
    } = form
    return createQuoteBundle({
      variables: {
        locale: isoLocale,
        quoteCartId,
        quotes: allQuotes.map(({ data: { id, type, typeOfContract } }) => {
          return {
            ...form,
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
    })
  }

  const onSubmit = async (
    form: QuoteInput,
    { setErrors }: FormikHelpers<QuoteInput>,
  ) => {
    const { data } = await reCreateQuoteBundle(form)
    const limits = getLimitsHit(data)

    if (limits.length) {
      const errors = getFormErrorsFromUnderwritterLimits(
        limits,
        textKeys.INVALID_FIELD(),
      )
      setErrors(errors)
    } else {
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
            mainQuoteType,
            textKeys,
          )}
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
