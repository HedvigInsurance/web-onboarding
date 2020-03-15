import { Form, Formik, FormikProps } from 'formik'
import { useQuoteLazyQuery } from 'generated/graphql'
import { Button } from 'new-components/buttons'
import { InputField } from 'new-components/inputs'
import { createQuote } from 'pages/Embark/createQuote'
import * as React from 'react'
import { StorageContainer } from 'utils/StorageContainer'

enum QuoteType {
  NorwegianHome = 'norwegian-home',
  NorwegianTravel = 'norwegian-travel',
  SwedishApartment = 'swedish-apartment',
  SwedishHouse = 'swedish-house',
}

export const Offer: React.FC = () => {
  const [getQuote, { data, refetch }] = useQuoteLazyQuery()
  const [quoteId, setQuoteId] = React.useState<string>('')
  const [quoteType, setQuoteType] = React.useState(QuoteType.NorwegianHome)

  React.useEffect(() => {
    if (!quoteId && localStorage.getItem('hvg:debugger:quoteId')) {
      setQuoteId(localStorage.getItem('hvg:debugger:quoteId') ?? '')
      return
    }

    if (quoteId) {
      localStorage.setItem('hvg:debugger:quoteId', quoteId ?? '')
      getQuote({ variables: { id: quoteId } })
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
                label="Quote id"
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
                    options={[
                      {
                        label: 'Norwegian Home',
                        value: QuoteType.NorwegianHome,
                      },
                      {
                        label: 'Norwegian Travel',
                        value: QuoteType.NorwegianTravel,
                      },
                      {
                        label: 'Swedish Apartment',
                        value: QuoteType.SwedishApartment,
                      },
                      {
                        label: 'Swedish House',
                        value: QuoteType.SwedishHouse,
                      },
                    ]}
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
                    id: quoteId,
                    firstName: 'Blargh',
                    lastName: 'Blarghson',
                    currentInsurer: '',
                    birthDate: '1995-09-29',
                    ssn: '',
                    startDate: '',
                    email: 'blargis@hedvig.com',
                    norweiganHomeContents: {
                      coInsured: 0,
                      isSudent: false,
                      livingSpace: 0,
                      street: 'Gulebøjsveien 1',
                      type: 'RENT',
                      zipCode: '',
                    },
                  }}
                  onSubmit={async (values) => {
                    await createQuote(storage)({
                      input: {
                        ...values,
                        currentInsurer: values.currentInsurer || undefined,
                        // @ts-ignore
                        startDate: values.startDate || undefined,
                      },
                    })

                    await refetch()
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
        label="Quote id"
        placeholder=""
        {...formik.getFieldProps('id')}
      />
      <InputField
        label="First name"
        placeholder="First name"
        {...formik.getFieldProps('firstName')}
      />
      <InputField
        label="Last name"
        placeholder="Last name"
        {...formik.getFieldProps('lastName')}
      />
      <InputField
        label="Current Insurer"
        placeholder="Current Insurer?"
        {...formik.getFieldProps('currentInsurer')}
      />
      <InputField
        label="Birth date"
        placeholder="2012-12-12"
        {...formik.getFieldProps('birthDate')}
      />
      <InputField
        label="ssn"
        placeholder="ssn"
        {...formik.getFieldProps('ssn')}
      />
      <InputField
        label="Start Date"
        placeholder="2020-03-13"
        {...formik.getFieldProps('startDate')}
      />
      <InputField
        label="Email"
        placeholder="Email?"
        {...formik.getFieldProps('email')}
      />

      {children}

      <Button type="submit">Create quote</Button>
    </Form>
  )
}

export const NorwegianHome: React.FC<WithFormikProps> = ({ formik }) => {
  return (
    <>
      <InputField
        label="Co-insured"
        placeholder="1"
        type="number"
        {...formik.getFieldProps('norweiganHomeContents.coInsured')}
      />
      <div>isStudent TODO</div>
      <InputField
        label="Living space"
        placeholder="23"
        type="number"
        {...formik.getFieldProps('norweiganHomeContents.livingSpace')}
      />
      <InputField
        label="Street"
        placeholder="Gulebøjsveien 1"
        {...formik.getFieldProps('norweiganHomeContents.street')}
      />
      <InputField
        label="Zip code"
        placeholder="1234"
        {...formik.getFieldProps('norweiganHomeContents.zipCode')}
      />
      <InputField
        label="Type"
        placeholder=""
        options={[
          { label: 'Own', value: 'OWN' },
          { label: 'Rent', value: 'RENT' },
        ]}
        {...formik.getFieldProps('norweiganHomeContents.type')}
      />
    </>
  )
}
