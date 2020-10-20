import { Form, Formik, FormikProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  ApartmentType,
  CreateQuoteInput,
  useQuoteLazyQuery,
} from 'data/graphql'
import { createQuote } from 'pages/Embark/createQuote'
import { Button } from 'components/buttons'
import { InputField } from 'components/inputs'
import { StorageContainer, useStorage } from 'utils/StorageContainer'
import {
  getLocaleIsoCode,
  useCurrentLocale,
  useMarket,
} from 'components/utils/CurrentLocale'

enum QuoteType {
  DanishHome = 'danish-home',
  NorwegianHome = 'norwegian-home',
  NorwegianTravel = 'norwegian-travel',
  SwedishApartment = 'swedish-apartment',
  SwedishHouse = 'swedish-house',
}

const quotesByMarket = {
  DK: [
    {
      label: 'Danish Home',
      value: QuoteType.DanishHome,
    },
  ],
  NO: [
    {
      label: 'Norwegian Home',
      value: QuoteType.NorwegianHome,
    },
    {
      label: 'Norwegian Travel',
      value: QuoteType.NorwegianTravel,
    },
  ],
  SE: [
    {
      label: 'Swedish Apartment',
      value: QuoteType.SwedishApartment,
    },
    {
      label: 'Swedish House',
      value: QuoteType.SwedishHouse,
    },
  ],
}

export const Offer: React.FC = () => {
  const [quoteId, setQuoteId] = useState<string>('') // TODO handle multiple quotes
  const [getQuote, { data, refetch }] = useQuoteLazyQuery()
  const storageState = useStorage()
  const currentLocale = useCurrentLocale()
  const localeIsoCode = getLocaleIsoCode(currentLocale)
  const currentMarket = useMarket()

  const [quoteType, setQuoteType] = useState(
    quotesByMarket[currentMarket][0].value,
  )

  useEffect(() => {
    const quoteIds = storageState.session.getSession()?.quoteIds ?? []

    if (!quoteId && !quoteIds.length) {
      fetch('https://www.uuidgenerator.net/api/version1')
        .then((res) => res.text())
        .then((res) => setQuoteId(res))
    }

    if (!quoteId && quoteIds[0]) {
      setQuoteId(quoteIds[0] ?? '')
      return
    }

    if (quoteId) {
      storageState.session.setSession({
        ...storageState.session.getSession(),
        quoteIds: [quoteId],
      })
      getQuote({ variables: { id: quoteId, perilsLocale: localeIsoCode } })
    }
  }, [quoteId])

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
                label="Quote id - generated from https://www.uuidgenerator.net/api"
                name="Quote id"
                placeholder="d6c60432-dc7b-4405-840e-b4fd8164e310"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setQuoteId(e.target.value)
                }}
                value={quoteId}
              />
            )}
          </Formik>

          {!data?.quote && (
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

              {quoteType === QuoteType.NorwegianHome && (
                <Formik
                  initialValues={{
                    firstName: 'Ole',
                    lastName: 'Olsen',
                    currentInsurer: '',
                    birthDate: '1959-11-23',
                    ssn: '23115994336',
                    startDate: '',
                    email: 'ole.olsen@hedvig.com',
                    norwegianHomeContents: {
                      coInsured: 0,
                      isYouth: false,
                      livingSpace: 44,
                      street: 'Gulebøjsveien 1',
                      type: 'RENT',
                      zipCode: '1234',
                    },
                  }}
                  onSubmit={async (values) => {
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
                    })

                    if (refetch) {
                      await refetch()
                    }
                  }}
                >
                  {(props) => (
                    <>
                      <QuoteForm formik={props}>
                        <NorwegianHome formik={props} />
                      </QuoteForm>
                    </>
                  )}
                </Formik>
              )}

              {quoteType === QuoteType.DanishHome && (
                <Formik
                  initialValues={{
                    firstName: 'Helle',
                    lastName: 'Hansen',
                    currentInsurer: '',
                    birthDate: '1988-08-08',
                    ssn: '8808081234',
                    startDate: '',
                    email: 'helle.hansen@hedvig.com',
                    danishHomeContents: {
                      coInsured: 0,
                      livingSpace: 34,
                      street: 'Nørrebrogade 50',
                      zipCode: '1234',
                    },
                  }}
                  onSubmit={async (values) => {
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
                    })

                    if (refetch) {
                      await refetch()
                    }
                  }}
                >
                  {(props) => (
                    <>
                      <QuoteForm formik={props}>
                        <DanishHome formik={props} />
                      </QuoteForm>
                    </>
                  )}
                </Formik>
              )}

              {quoteType === QuoteType.NorwegianTravel && (
                <Formik
                  initialValues={{
                    firstName: 'Ole',
                    lastName: 'Olsen',
                    currentInsurer: '',
                    birthDate: '1959-11-23',
                    ssn: '23115994336',
                    startDate: '',
                    email: 'ole.olsen@hedvig.com',
                    norwegianTravel: {
                      coInsured: 0,
                      isYouth: false,
                    },
                  }}
                  onSubmit={async (values) => {
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
                    })

                    if (refetch) {
                      await refetch()
                    }
                  }}
                >
                  {(props) => (
                    <>
                      <QuoteForm formik={props}>
                        <NorwegianTravel formik={props} />
                      </QuoteForm>
                    </>
                  )}
                </Formik>
              )}

              {quoteType === QuoteType.SwedishApartment && (
                <Formik<Partial<CreateQuoteInput>>
                  initialValues={{
                    firstName: 'Sven',
                    lastName: 'Svensson',
                    currentInsurer: '',
                    birthDate: '1995-09-29',
                    ssn: '199509291234',
                    startDate: '',
                    email: 'sven.svensson@hedvig.com',
                    swedishApartment: {
                      street: 'Storgatan 1',
                      zipCode: '12345',
                      livingSpace: 23,
                      householdSize: 1,
                      type: ApartmentType.Rent,
                    },
                  }}
                  onSubmit={async (values) => {
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
                    })

                    if (refetch) {
                      await refetch()
                    }
                  }}
                >
                  {(props) => (
                    <>
                      <QuoteForm formik={props}>
                        <SwedishApartment formik={props} />
                      </QuoteForm>
                    </>
                  )}
                </Formik>
              )}
            </>
          )}
          {data?.quote && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </>
      )}
    </StorageContainer>
  )
}

interface WithFormikProps {
  formik: FormikProps<any>
}

const QuoteForm: React.FC<WithFormikProps> = ({ children, formik }) => {
  return (
    <Form>
      <InputField
        label="First name"
        placeholder=""
        {...formik.getFieldProps('firstName')}
      />
      <InputField
        label="Last name"
        placeholder=""
        {...formik.getFieldProps('lastName')}
      />
      <InputField
        label="Current Insurer (optional)"
        placeholder=""
        {...formik.getFieldProps('currentInsurer')}
      />
      <InputField
        label="Birth date"
        placeholder="2012-12-12"
        {...formik.getFieldProps('birthDate')}
      />
      <InputField label="ssn" placeholder="" {...formik.getFieldProps('ssn')} />
      <InputField
        label="Start Date (optional)"
        placeholder="2020-03-13"
        {...formik.getFieldProps('startDate')}
      />
      <InputField
        label="Email"
        placeholder=""
        {...formik.getFieldProps('email')}
      />

      {children}

      <Button
        background={colorsV3.purple500}
        foreground={colorsV3.gray900}
        type="submit"
      >
        Create quote
      </Button>
    </Form>
  )
}

export const DanishHome: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <InputField
        label="Co-insured"
        placeholder="1"
        type="number"
        {...formik.getFieldProps('danishHomeContents.coInsured')}
      />
      <InputField
        label="Living space"
        placeholder="34"
        type="number"
        {...formik.getFieldProps('danishHomeContents.livingSpace')}
      />
      <InputField
        label="Street"
        placeholder="Nørrebrogade 50"
        {...formik.getFieldProps('danishHomeContents.street')}
      />
      <InputField
        label="Zip code"
        placeholder="2200"
        {...formik.getFieldProps('danishHomeContents.zipCode')}
      />
    </>
  )
}

export const NorwegianHome: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <InputField
        label="Co-insured"
        placeholder="1"
        type="number"
        {...formik.getFieldProps('norwegianHomeContents.coInsured')}
      />
      <InputField
        label="Living space"
        placeholder="23"
        type="number"
        {...formik.getFieldProps('norwegianHomeContents.livingSpace')}
      />
      <InputField
        label="Street"
        placeholder="Gulebøjsveien 1"
        {...formik.getFieldProps('norwegianHomeContents.street')}
      />
      <InputField
        label="Zip code"
        placeholder="1234"
        {...formik.getFieldProps('norwegianHomeContents.zipCode')}
      />
      <InputField
        label="Type"
        placeholder=""
        options={[
          { label: 'Own', value: 'OWN' },
          { label: 'Rent', value: 'RENT' },
        ]}
        {...formik.getFieldProps('norwegianHomeContents.type')}
      />
    </>
  )
}

export const NorwegianTravel: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <InputField
        label="Co-insured"
        placeholder="1"
        type="number"
        {...formik.getFieldProps('norwegianTravel.coInsured')}
      />
      <div>isYouth TODO</div>
    </>
  )
}

export const SwedishApartment: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <InputField
        label="Household size"
        placeholder="1"
        type="number"
        {...formik.getFieldProps('swedishApartment.householdSize')}
      />
      <InputField
        label="Living space"
        placeholder="23"
        type="number"
        {...formik.getFieldProps('swedishApartment.livingSpace')}
      />
      <InputField
        label="Street"
        placeholder="Gulebøjsveien 1"
        {...formik.getFieldProps('swedishApartment.street')}
      />
      <InputField
        label="Zip code"
        placeholder="12345"
        {...formik.getFieldProps('swedishApartment.zipCode')}
      />
      <InputField
        label="Type"
        placeholder=""
        options={[
          { label: 'Brf', value: ApartmentType.Brf },
          { label: 'Rent', value: ApartmentType.Rent },
          { label: 'Brf (student)', value: ApartmentType.StudentBrf },
          { label: 'Rent (student)', value: ApartmentType.StudentRent },
        ]}
        {...formik.getFieldProps('swedishApartment.type')}
      />
    </>
  )
}
