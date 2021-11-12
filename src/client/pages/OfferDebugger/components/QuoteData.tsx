import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Form, Formik, FormikProps } from 'formik'
import { colorsV3 } from '@hedviginsurance/brand'
import { CreateQuoteVariables } from '@hedviginsurance/embark'
import {
  CreateOnboardingQuoteInput,
  useCreateOnboardingQuoteMutation,
  useOnboardingSessionQuery,
  ApartmentType,
} from 'data/graphql'
import { Button, LinkButton } from 'components/buttons'
import { InputField } from 'components/inputs'
import { useMarket, Market } from 'components/utils/CurrentLocale'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LoadingDots } from '../../../components/LoadingDots/LoadingDots'
import { initialSeApartmentValues, SwedishApartment } from './QuoteFormSweden'
import {
  initialNoHomeValues,
  initialNoTravelValues,
  NorwegianHome,
  NorwegianTravel,
} from './QuoteFormNorway'
import { DanishQuote, initialDkHomeValues } from './QuoteFormDenmark'

type OfferProps = { sessionId: string }

type Values = Partial<CreateOnboardingQuoteInput>

export type WithFormikProps = {
  formik: FormikProps<any>
}

enum QuoteType {
  DanishHome = 'danish-home',
  DanishHomeAccident = 'danish-home-accident',
  DanishHomeAccidentTravel = 'danish-home-accident-travel',
  NorwegianHome = 'norwegian-home',
  NorwegianTravel = 'norwegian-travel',
  SwedishApartment = 'swedish-apartment',
  SwedishHouse = 'swedish-house',
  SwedishApartmentAccident = 'swedish-apartment-accident',
}

type QuoteData = {
  label: string
  value: QuoteType
  initialFormValues?: Record<string, unknown>
}

type QuotesByMarket = Record<Market, QuoteData[]>

const quotesByMarket: QuotesByMarket = {
  DK: [
    {
      label: 'Danish Home',
      value: QuoteType.DanishHome,
      initialFormValues: initialDkHomeValues,
    },
    {
      label: 'Danish Home + Accident',
      value: QuoteType.DanishHomeAccident,
      initialFormValues: initialDkHomeValues,
    },
    {
      label: 'Danish Home + Accident + Travel',
      value: QuoteType.DanishHomeAccidentTravel,
      initialFormValues: initialDkHomeValues,
    },
  ],
  NO: [
    {
      label: 'Norwegian Home',
      value: QuoteType.NorwegianHome,
      initialFormValues: initialNoHomeValues,
    },
    {
      label: 'Norwegian Travel',
      value: QuoteType.NorwegianTravel,
      initialFormValues: initialNoTravelValues,
    },
  ],
  SE: [
    {
      label: 'Swedish Apartment',
      value: QuoteType.SwedishApartment,
      initialFormValues: initialSeApartmentValues,
    },
    {
      label: 'Swedish House',
      value: QuoteType.SwedishHouse,
    },
    {
      label: 'Swedish Apartment + Accident',
      value: QuoteType.SwedishApartmentAccident,
      initialFormValues: initialSeApartmentValues,
    },
  ],
}

const getCurrentAvailableQuoteData = (
  currentMarket: Market,
  currentQuoteType: QuoteType,
) => {
  const marketQuoteTypes = quotesByMarket[currentMarket]
  const currentQuoteTypeData = marketQuoteTypes.find(
    ({ value }) => value === currentQuoteType,
  )
  return currentQuoteTypeData
}

const getDanishQuoteValues = (
  values: Values,
  quoteType: 'danishTravel' | 'danishAccident',
) => {
  const { danishHomeContentsData, ...filteredValues } = values
  const { type, livingSpace, ...quoteTypeValues } = danishHomeContentsData!
  return {
    ...filteredValues,
    [quoteType]: quoteTypeValues,
  } as CreateOnboardingQuoteInput
}

const getSwedishAccidentQuoteValues = (values: Values) => {
  const { swedishApartmentData, ...filteredValues } = values
  const { subType, ...quoteTypeValues } = swedishApartmentData!
  return {
    ...filteredValues,
    swedishAccidentData: {
      ...quoteTypeValues,
      isStudent:
        subType === ApartmentType.StudentBrf ||
        subType === ApartmentType.StudentRent,
    },
  } as CreateOnboardingQuoteInput
}

const ButtonLoadingIndicator = styled(LoadingDots)`
  display: inline-flex;
  margin-left: 0.5rem;
`

export const QuoteData: React.FC<OfferProps> = ({ sessionId }) => {
  const { data, refetch } = useOnboardingSessionQuery({
    variables: { id: sessionId },
  })
  const [createOnboardingQuote] = useCreateOnboardingQuoteMutation()

  const [quoteCreatingError, setQuoteCreatingError] = useState<string | null>(
    null,
  )
  const currentLocale = useCurrentLocale()
  const currentMarket = useMarket()

  const [quoteType, setQuoteType] = useState(
    quotesByMarket[currentMarket][0].value,
  )

  useEffect(() => {
    setQuoteCreatingError(null)
  }, [sessionId])

  const handleSubmit = async (values: Values) => {
    const input = {
      ...values,
      currentInsurer: values.currentInsurer || undefined,
      startDate: values.startDate || undefined,
    }
    try {
      if (quoteType === QuoteType.DanishHomeAccident) {
        await Promise.all([
          createOnboardingQuote({
            variables: {
              id: sessionId,
              input: input as CreateOnboardingQuoteInput,
            },
          }),
          createOnboardingQuote({
            variables: {
              id: sessionId,
              input: getDanishQuoteValues(input, 'danishAccident'),
            },
          }),
        ])
      } else if (quoteType === QuoteType.DanishHomeAccidentTravel) {
        await Promise.all([
          createOnboardingQuote({
            variables: {
              id: sessionId,
              input: input as CreateOnboardingQuoteInput,
            },
          }),
          createOnboardingQuote({
            variables: {
              id: sessionId,
              input: getDanishQuoteValues(input, 'danishAccident'),
            },
          }),
          createOnboardingQuote({
            variables: {
              id: sessionId,
              input: getDanishQuoteValues(input, 'danishTravel'),
            },
          }),
        ])
      } else if (quoteType === QuoteType.SwedishApartmentAccident) {
        await Promise.all([
          createOnboardingQuote({
            variables: {
              id: sessionId,
              input: input as CreateOnboardingQuoteInput,
            },
          }),
          createOnboardingQuote({
            variables: {
              id: sessionId,
              input: getSwedishAccidentQuoteValues(input),
            },
          }),
        ])
      } else {
        await createOnboardingQuote({
          variables: {
            id: sessionId,
            input: input as CreateQuoteVariables['input'],
          },
        })
      }
    } catch (error) {
      setQuoteCreatingError(error.message)
    }

    await refetch()
  }

  return (
    <>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          /* noop */
        }}
      >
        {() => (
          <InputField
            label="Type"
            options={quotesByMarket[currentMarket]}
            value={quoteType}
            onChange={(value: React.ChangeEvent<HTMLSelectElement>) =>
              setQuoteType(value.target.value as QuoteType)
            }
          />
        )}
      </Formik>

      {!data?.onboardingSession.bundle && !quoteCreatingError && (
        <Formik
          initialValues={
            getCurrentAvailableQuoteData(currentMarket, quoteType)
              ?.initialFormValues || {}
          }
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              {!props.isSubmitting && (
                <>
                  <InputField
                    label="First name"
                    placeholder=""
                    {...props.getFieldProps('firstName')}
                  />
                  <InputField
                    label="Last name"
                    placeholder=""
                    {...props.getFieldProps('lastName')}
                  />
                  <InputField
                    label="Birth date"
                    placeholder="2012-12-12"
                    {...props.getFieldProps('birthDate')}
                  />
                  {currentMarket === Market.Se && (
                    <InputField
                      label="ssn"
                      placeholder=""
                      {...props.getFieldProps('ssn')}
                    />
                  )}
                  <InputField
                    label="Start Date (optional)"
                    placeholder="2020-03-13"
                    {...props.getFieldProps('startDate')}
                  />
                  <InputField
                    label="Email"
                    placeholder=""
                    {...props.getFieldProps('email')}
                  />

                  {[
                    QuoteType.SwedishApartment,
                    QuoteType.SwedishApartmentAccident,
                  ].includes(quoteType) && <SwedishApartment formik={props} />}
                  {quoteType === QuoteType.NorwegianHome && (
                    <NorwegianHome formik={props} />
                  )}
                  {quoteType === QuoteType.NorwegianTravel && (
                    <NorwegianTravel formik={props} />
                  )}
                  {(quoteType === QuoteType.DanishHome ||
                    quoteType === QuoteType.DanishHomeAccident ||
                    quoteType === QuoteType.DanishHomeAccidentTravel) && (
                    <DanishQuote formik={props} />
                  )}
                </>
              )}

              <Button
                type="submit"
                background={colorsV3.purple500}
                foreground={colorsV3.gray900}
                disabled={props.isSubmitting}
              >
                Create quote
                {props.isSubmitting && (
                  <ButtonLoadingIndicator color={colorsV3.gray900} />
                )}
              </Button>
            </Form>
          )}
        </Formik>
      )}
      {data?.onboardingSession.bundle && (
        <>
          <LinkButton
            background={colorsV3.gray100}
            foreground={colorsV3.gray900}
            to={`/${currentLocale.path}/new-member/offer`}
          >
            Go to offer page →
          </LinkButton>
          <div style={{ padding: '2rem 0' }}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </>
      )}
      {quoteCreatingError && (
        <>
          <h2>Something went wrong 😔</h2>
          <div>
            <u>Error message:</u>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{quoteCreatingError}</pre>
          </div>
          <h3>👉 Try starting over by nuking all state!</h3>
        </>
      )}
    </>
  )
}
