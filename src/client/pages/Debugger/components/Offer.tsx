import React, { useEffect, useState } from 'react'
import { Form, Formik, FormikProps } from 'formik'
import { v4 as uuid } from 'uuid'
import { colorsV3 } from '@hedviginsurance/brand'
import { CreateQuoteInput, useQuoteLazyQuery } from 'data/graphql'
import { createQuote } from 'pages/Embark/createQuote'
import { Button } from 'components/buttons'
import { InputField } from 'components/inputs'
import { StorageContainer, useStorage } from 'utils/StorageContainer'
import {
  getLocaleIsoCode,
  useCurrentLocale,
  useMarket,
  Market,
} from 'components/utils/CurrentLocale'
import { LinkButton } from '../../../components/buttons'
import { initialSeApartmentValues, SwedishApartment } from './QuoteFormSweden'
import {
  initialNoHomeValues,
  initialNoTravelValues,
  NorwegianHome,
  NorwegianTravel,
} from './QuoteFormNorway'
import { DanishHome, initialDkHomeValues } from './QuoteFormDenmark'

type OfferProps = { sessionToken?: string | null }

type Values = Partial<CreateQuoteInput>

export type WithFormikProps = {
  formik: FormikProps<any>
}

enum QuoteType {
  DanishHome = 'danish-home',
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

export const Offer: React.FC<OfferProps> = ({ sessionToken }) => {
  const [quoteId, setQuoteId] = useState<string>('') // TODO handle multiple quotes
  const [getQuote, { data, refetch }] = useQuoteLazyQuery()
  const [quoteCreatingError, setQuoteCreatingError] = useState<string | null>(
    null,
  )
  const storageState = useStorage()
  const currentLocale = useCurrentLocale()
  const localeIsoCode = getLocaleIsoCode(currentLocale)
  const currentMarket = useMarket()

  const [quoteType, setQuoteType] = useState(
    quotesByMarket[currentMarket][0].value,
  )

  const handleSubmit = async (
    values: Values,
    storage: Record<string, unknown>,
  ) => {
    if (sessionToken) {
      await createQuote(
        storage,
        localeIsoCode,
      )({
        input: {
          ...values,
          id: quoteId,
          currentInsurer: values.currentInsurer || undefined,
          // @ts-ignore
          startDate: values.startDate || undefined,
        },
      }).catch((error) => setQuoteCreatingError(error.message))

      if (refetch) {
        await refetch()
      }
    }
  }

  useEffect(() => {
    const quoteIds = storageState.session.getSession()?.quoteIds ?? []

    if (!quoteId && quoteIds[0]) {
      setQuoteId(quoteIds[0] ?? '')
      return
    }

    if (!quoteId && !quoteIds.length) {
      setQuoteId(uuid())
    }

    storageState.session.setSession({
      ...storageState.session.getSession(),
      quoteIds: [quoteId],
    })
  }, [quoteId])

  useEffect(() => {
    if (quoteId?.length === 36 && sessionToken) {
      getQuote({ variables: { id: quoteId, perilsLocale: localeIsoCode } })
    }
  }, [quoteId, sessionToken])

  return (
    <StorageContainer>
      {(storage) => (
        <>
          <Formik
            initialValues={{ quoteId }}
            onSubmit={() => {
              /* noop */
            }}
          >
            {() => (
              <InputField
                label="Quote id"
                name="Quote id"
                placeholder="d6c60432-dc7b-4405-840e-b4fd8164e310"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setQuoteId(e.target.value)
                }}
                value={quoteId}
              />
            )}
          </Formik>

          {!data?.quote && !quoteCreatingError && (
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
                    placeholder=""
                    options={quotesByMarket[currentMarket]}
                    value={quoteType}
                    onChange={(value: React.ChangeEvent<HTMLSelectElement>) =>
                      setQuoteType(value.target.value as QuoteType)
                    }
                  />
                )}
              </Formik>

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
                        label="Current Insurer (optional)"
                        placeholder=""
                        {...props.getFieldProps('currentInsurer')}
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
                      {quoteType === QuoteType.DanishHome && (
                        <DanishHome formik={props} />
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
          {data?.quote && (
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
