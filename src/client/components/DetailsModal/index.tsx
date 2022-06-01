import React from 'react'
import styled from '@emotion/styled'
import { Form, Formik, FormikHelpers } from 'formik'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { Button, ButtonGroup } from 'components/buttons'
import { Modal, ModalFooter, ModalProps } from 'components/ModalNew'
import {
  useCreateQuoteBundleMutation,
  useQuoteCartQuery,
  UnderwritingLimit,
  ApartmentType,
  BundledQuote,
} from 'data/graphql'

import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import { getSelectedBundleVariant } from 'api/quoteCartQuerySelectors'
import * as quoteSelector from 'api/quoteSelector'
import * as bundleSelector from 'api/quoteBundleSelectors'
import {
  getLimitsHit,
  LimitCode,
  isLimitHit,
  isQuoteBundleError,
} from 'api/quoteBundleErrorSelectors'
import { QuoteDataCommon } from 'api/quoteDetailsDataTypes'
import { QuoteDetailsInput, QuoteInput } from './types'

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
  font-family: ${fonts.HEDVIG_LETTERS_STANDARD};
  font-size: 2.5rem;
  line-height: 3.5rem;
  color: ${colorsV3.black};

  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 3rem;
  }
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
      case LimitCode.YOUTH_OVERAGE:
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

const getSubType = (data: QuoteDetailsInput) => {
  switch (data.subType) {
    case ApartmentType.Brf:
    case ApartmentType.StudentBrf:
      return data.isStudent ? ApartmentType.StudentBrf : ApartmentType.Brf
    case ApartmentType.Rent:
    case ApartmentType.StudentRent:
      return data.isStudent ? ApartmentType.StudentRent : ApartmentType.Rent
    default:
      return data.subType
  }
}

type DetailsModalProps = Pick<ModalProps, 'isVisible'> & {
  onClose: () => void
  quoteCartId: string
  allQuotes: BundledQuote[]
}

export const DetailsModal = ({
  quoteCartId,
  isVisible,
  onClose,
  allQuotes,
}: DetailsModalProps) => {
  const textKeys = useTextKeys()
  const { isoLocale, marketLabel } = useCurrentLocale()
  const [
    createQuoteBundle,
    {
      data: createQuoteBundleData,
      error: unexpectedQuoteBundleError,
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
  const mainQuote = bundleSelector.getMainQuote(selectedQuoteBundle.bundle)
  const {
    firstName,
    lastName,
    birthDate,
    ssn,
    email,
    phoneNumber,
    startDate,
    data: mainQuoteData,
  } = mainQuote

  const {
    type: mainQuoteType,
    numberCoInsured,
    squareMeters,
    livingSpace,
  } = mainQuoteData
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
      ...(!quoteSelector.isCar(mainQuote) && {
        isStudent: bundleSelector.isStudent(selectedQuoteBundle.bundle.quotes),
        isYouth: bundleSelector.isYouth(selectedQuoteBundle.bundle.quotes),
        householdSize: numberCoInsured + 1,
        livingSpace: squareMeters ? squareMeters : livingSpace,
      }),
    },
  } as QuoteInput

  const isUnderwritingGuidelinesHit = isLimitHit(createQuoteBundleData)
  const isQuoteCreationFailed = isQuoteBundleError(createQuoteBundleData)

  const reCreateQuoteBundle = (form: QuoteInput) => {
    // cleanup null form fields
    Object.keys(form).forEach(
      (k) =>
        form[k as keyof QuoteInput] == null &&
        delete form[k as keyof QuoteInput],
    )

    const newQuotes = allQuotes.map((quote) => {
      const { startDate, currentInsurer, data } = quote
      const quoteData = Object.keys(data).reduce<
        Partial<QuoteDetailsInput & QuoteDataCommon>
      >((acc, key) => {
        switch (key) {
          case 'numberCoInsured':
            acc[key] =
              typeof form.data.householdSize === 'number'
                ? form.data.householdSize - 1
                : data[key]
            return acc
          case 'livingSpace':
          case 'squareMeters':
            acc.squareMeters =
              form.data['livingSpace'] ||
              form.data['squareMeters'] ||
              data['livingSpace'] ||
              data['squareMeters']
            acc.livingSpace =
              form.data['livingSpace'] ||
              form.data['squareMeters'] ||
              data['livingSpace'] ||
              data['squareMeters']
            return acc
          case 'subType':
            if (marketLabel === 'SE') {
              acc[key] =
                mainQuote.id === quote.id
                  ? getSubType(form.data)
                  : getSubType(data)
            } else {
              acc[key] =
                mainQuote.id === quote.id
                  ? form.data['subType']
                  : data['subType']
            }
            return acc
          case 'id':
          case 'type':
          case 'typeOfContract':
            acc[key] = data[key]
            return acc
          default: {
            const formValue = form.data[key as keyof QuoteDetailsInput]
            acc[key as keyof QuoteDetailsInput] =
              formValue !== undefined && formValue !== null
                ? formValue
                : data[key]
            return acc
          }
        }
      }, {})
      return {
        ...form,
        startDate,
        currentInsurer: currentInsurer?.id,
        data: quoteData,
      }
    })
    return createQuoteBundle({
      variables: {
        locale: isoLocale,
        quoteCartId,
        quotes: newQuotes,
      },
    })
  }
  const onSubmit = async (
    form: QuoteInput,
    { setErrors }: FormikHelpers<QuoteInput>,
  ) => {
    const { data } = await reCreateQuoteBundle(form)
    const isCreationFailed = isQuoteBundleError(data)
    const limits = getLimitsHit(data)

    if (isCreationFailed) {
      if (limits.length) {
        const errors = getFormErrorsFromUnderwritterLimits(
          limits,
          textKeys.INVALID_FIELD(),
        )
        setErrors(errors)
      }
    } else {
      onClose()
    }
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <LoadingDimmer visible={isBundleCreationInProgress} />
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
          <>
            <Form>
              <Container>
                <Headline>{textKeys.DETAILS_MODULE_HEADLINE()}</Headline>
                <p>{textKeys.DETAILS_MODULE_BODY()}</p>
                <Details
                  market={marketLabel}
                  type={mainQuoteType}
                  formikProps={formikProps}
                />
              </Container>

              <ModalFooter>
                <ButtonGroup fullWidth>
                  <Button
                    background={colorsV3.white}
                    foreground={colorsV3.black}
                    border
                    fullWidth
                    onClick={onClose}
                  >
                    {textKeys.CLOSE()}
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={
                      isBundleCreationInProgress || !formikProps.isValid
                    }
                  >
                    {textKeys.DETAILS_MODULE_BUTTON()}
                  </Button>
                </ButtonGroup>

                {isUnderwritingGuidelinesHit ? (
                  <ErrorMessage>
                    {textKeys.DETAILS_MODULE_BUTTON_UNDERWRITING_GUIDELINE_HIT()}
                  </ErrorMessage>
                ) : (
                  (unexpectedQuoteBundleError || isQuoteCreationFailed) && (
                    <ErrorMessage>
                      {textKeys.DETAILS_MODULE_BUTTON_ERROR()}
                    </ErrorMessage>
                  )
                )}

                {!unexpectedQuoteBundleError &&
                  !isQuoteCreationFailed &&
                  !isUnderwritingGuidelinesHit && (
                    <Warning>
                      {textKeys.DETAILS_MODULE_BUTTON_WARNING()}
                    </Warning>
                  )}
              </ModalFooter>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  )
}
