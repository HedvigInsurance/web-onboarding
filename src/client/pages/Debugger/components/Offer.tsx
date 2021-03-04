import React, { useEffect, useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { v4 as uuid } from 'uuid'
import { colorsV3 } from '@hedviginsurance/brand'
import { CreateQuoteVariables } from '@hedviginsurance/embark'
import {
  CreateQuoteInput,
  useCreateDanishHomeAccidentQuoteMutation,
  useCreateDanishHomeAccidentTravelQuoteMutation,
  useQuoteBundleLazyQuery,
} from 'data/graphql'
import { createQuote } from 'pages/Embark/createQuote'
import { Button, LinkButton } from 'components/buttons'
import { InputField } from 'components/inputs'
import { StorageContainer, useStorage } from 'utils/StorageContainer'
import {
  getIsoLocale,
  useCurrentLocale,
  useMarket,
  Market,
} from 'components/utils/CurrentLocale'
import { initialSeApartmentValues, SwedishApartment } from './QuoteFormSweden'
import {
  initialNoHomeValues,
  initialNoTravelValues,
  NorwegianHome,
  NorwegianTravel,
} from './QuoteFormNorway'
import { DanishQuote, initialDkHomeValues } from './QuoteFormDenmark'

type OfferProps = { sessionToken?: string | null }

type Values = Partial<CreateQuoteInput>

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
  const { danishHomeContents, ...filteredValues } = values
  const { type, livingSpace, ...QuoteTypeValues } = danishHomeContents!
  return {
    ...filteredValues,
    [quoteType]: QuoteTypeValues,
  } as CreateQuoteInput
}

export const Offer: React.FC<OfferProps> = ({ sessionToken }) => {
  const [quoteIds, setQuoteIds] = useState<string[]>([])
  const [getQuotes, { data, refetch }] = useQuoteBundleLazyQuery()
  const [createHomeAccidentQuote] = useCreateDanishHomeAccidentQuoteMutation()
  const [
    createHomeAccidentTravelQuote,
  ] = useCreateDanishHomeAccidentTravelQuoteMutation()

  const [quoteCreatingError, setQuoteCreatingError] = useState<string | null>(
    null,
  )
  const storageState = useStorage()
  const currentLocale = useCurrentLocale()
  const localeIsoCode = getIsoLocale(currentLocale)
  const currentMarket = useMarket()

  const [quoteType, setQuoteType] = useState(
    quotesByMarket[currentMarket][0].value,
  )

  const handleSubmit = async (
    values: Values,
    storage: Record<string, unknown>,
  ) => {
    const input = {
      ...values,
      id: quoteIds[0],
      currentInsurer: values.currentInsurer || undefined,
      startDate: values.startDate || undefined,
    }
    if (quoteType === QuoteType.DanishHomeAccident) {
      const accidentInput = getDanishQuoteValues(
        { ...input, id: quoteIds[1] },
        'danishAccident',
      )
      await createHomeAccidentQuote({
        variables: {
          homeInput: input as CreateQuoteInput,
          accidentInput,
        },
      })
    } else if (quoteType === QuoteType.DanishHomeAccidentTravel) {
      const accidentInput = getDanishQuoteValues(
        { ...input, id: quoteIds[1] },
        'danishAccident',
      )
      const travelInput = getDanishQuoteValues(
        { ...input, id: quoteIds[2] },
        'danishTravel',
      )
      await createHomeAccidentTravelQuote({
        variables: {
          homeInput: input as CreateQuoteInput,
          accidentInput,
          travelInput,
        },
      })
    } else {
      await createQuote(
        storage,
        localeIsoCode,
      )({
        input: input as CreateQuoteVariables['input'],
      }).catch((error) => setQuoteCreatingError(error.message))
    }

    if (refetch) {
      await refetch()
    }
  }

  useEffect(() => {
    const sessionQuoteIds = storageState.session.getSession()?.quoteIds ?? []
    if (quoteIds.length === 0 && sessionQuoteIds[0]) {
      setQuoteIds([...sessionQuoteIds])
      return
    }
    if (quoteIds.length === 0 && !sessionQuoteIds.length) {
      setQuoteIds([uuid()])
    }
    storageState.session.setSession({
      ...storageState.session.getSession(),
      quoteIds: quoteIds,
    })
  }, [getQuotes, localeIsoCode, quoteIds, storageState.session])

  useEffect(() => {
    if (quoteIds.every((quote) => quote?.length === 36) && sessionToken) {
      getQuotes({
        variables: { input: { ids: quoteIds }, locale: localeIsoCode },
      })
    }
  }, [quoteIds, sessionToken, localeIsoCode, getQuotes])

  useEffect(() => {
    if (quoteType === QuoteType.DanishHomeAccident) {
      setQuoteIds((prev) => [prev[0], uuid()])
      return
    }
    if (quoteType === QuoteType.DanishHomeAccidentTravel) {
      setQuoteIds((prev) => [prev[0], uuid(), uuid()])
      return
    }
    setQuoteIds((prev) => [prev[0]])
  }, [quoteType])

  return (
    <StorageContainer>
      {(storage) => (
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
          <Formik
            initialValues={{ quoteIds }}
            onSubmit={() => {
              /* noop */
            }}
          >
            {() => {
              return quoteIds.map((quoteId, index) => (
                <InputField
                  key={`quote_ids_${index}`}
                  label="Quote id"
                  name="Quote id"
                  placeholder="d6c60432-dc7b-4405-840e-b4fd8164e310"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = e.target.value
                    setQuoteIds((prev) => {
                      const newState = [...prev]
                      newState[index] = newValue
                      return newState
                    })
                  }}
                  value={quoteId}
                />
              ))
            }}
          </Formik>

          {!data?.quoteBundle && !quoteCreatingError && (
            <>
              <Formik
                initialValues={
                  getCurrentAvailableQuoteData(currentMarket, quoteType)
                    ?.initialFormValues || {}
                }
                onSubmit={(values) => handleSubmit(values, storage)}
              >
                {(props) => (
                  <>
                    <Form>
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

                      {quoteType === QuoteType.SwedishApartment && (
                        <SwedishApartment formik={props} />
                      )}
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

                      <Button
                        background={colorsV3.purple500}
                        foreground={colorsV3.gray900}
                        type="submit"
                      >
                        Create quote
                      </Button>
                    </Form>
                  </>
                )}
              </Formik>
            </>
          )}
          {data?.quoteBundle && (
            <>
              <LinkButton
                background={colorsV3.gray100}
                foreground={colorsV3.gray900}
                to={`/${currentLocale}/new-member/offer`}
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
                <pre style={{ whiteSpace: 'pre-wrap' }}>
                  {quoteCreatingError}
                </pre>
              </div>
              <h3>👉 Try starting over by nuking all state!</h3>
            </>
          )}
        </>
      )}
    </StorageContainer>
  )
}
