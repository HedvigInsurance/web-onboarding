import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Form, Formik, FormikProps } from 'formik'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  useCreateQuoteBundleMutation,
  useQuoteCartQuery,
  ApartmentType,
} from 'data/graphql'
import { Button, LinkButton } from 'components/buttons'
import { InputField } from 'components/inputs'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { MarketLabel } from 'l10n/locales'
import { LoadingDots } from '../../../components/LoadingDots/LoadingDots'
import { initialSeApartmentValues, SwedishApartment } from './QuoteFormSweden'
import {
  initialNoHomeValues,
  initialNoTravelValues,
  NorwegianHome,
  NorwegianTravel,
} from './QuoteFormNorway'
import { DanishQuote, initialDkHomeValues } from './QuoteFormDenmark'

type OfferProps = { quoteCartId: string }

export type WithFormikProps = {
  formik: FormikProps<any>
}

enum QuoteBundleType {
  DanishHome = 'danish-home',
  DanishHomeAccident = 'danish-home-accident',
  DanishHomeAccidentTravel = 'danish-home-accident-travel',
  NorwegianHome = 'norwegian-home',
  NorwegianTravel = 'norwegian-travel',
  SwedishApartment = 'swedish-apartment',
  SwedishHouse = 'swedish-house',
  SwedishApartmentAccident = 'swedish-apartment-accident',
}

enum QuoteType {
  DanishHome = 'danishHomeContent',
  DanishAccident = 'danishAccident',
  DanishTravel = 'danishTravel',
  NorwegianHome = 'norwegianHomeContent',
  NorwegianTravel = 'norwegianTravel',
  SwedishApartment = 'apartment',
  SwedishHouse = 'house',
  SwedishAccident = 'swedishAccident',
}

const singleQuoteBundleToQuoteType = (
  bundleType: QuoteBundleType,
): QuoteType => {
  switch (bundleType) {
    case QuoteBundleType.DanishHome:
      return QuoteType.DanishHome
    case QuoteBundleType.NorwegianHome:
      return QuoteType.NorwegianHome
    case QuoteBundleType.NorwegianTravel:
      return QuoteType.NorwegianTravel
    case QuoteBundleType.SwedishApartment:
      return QuoteType.SwedishApartment
    case QuoteBundleType.SwedishHouse:
      return QuoteType.SwedishHouse
    default:
      throw new Error(`Unsupported single quote bundle type: ${bundleType}`)
  }
}

type QuoteData = {
  label: string
  value: QuoteBundleType
  initialFormValues?: Record<string, unknown>
}

type QuotesByMarket = Record<MarketLabel, QuoteData[]>

const quotesByMarket: QuotesByMarket = {
  DK: [
    {
      label: 'Danish Home',
      value: QuoteBundleType.DanishHome,
      initialFormValues: initialDkHomeValues,
    },
    {
      label: 'Danish Home + Accident',
      value: QuoteBundleType.DanishHomeAccident,
      initialFormValues: initialDkHomeValues,
    },
    {
      label: 'Danish Home + Accident + Travel',
      value: QuoteBundleType.DanishHomeAccidentTravel,
      initialFormValues: initialDkHomeValues,
    },
  ],
  NO: [
    {
      label: 'Norwegian Home',
      value: QuoteBundleType.NorwegianHome,
      initialFormValues: initialNoHomeValues,
    },
    {
      label: 'Norwegian Travel',
      value: QuoteBundleType.NorwegianTravel,
      initialFormValues: initialNoTravelValues,
    },
  ],
  SE: [
    {
      label: 'Swedish Apartment',
      value: QuoteBundleType.SwedishApartment,
      initialFormValues: initialSeApartmentValues,
    },
    {
      label: 'Swedish House',
      value: QuoteBundleType.SwedishHouse,
    },
    {
      label: 'Swedish Apartment + Accident',
      value: QuoteBundleType.SwedishApartmentAccident,
      initialFormValues: initialSeApartmentValues,
    },
  ],
}

const getCurrentAvailableQuoteData = (
  currentMarket: MarketLabel,
  currentQuoteType: QuoteBundleType,
) => {
  const marketQuoteTypes = quotesByMarket[currentMarket]
  const currentQuoteTypeData = marketQuoteTypes.find(
    ({ value }) => value === currentQuoteType,
  )

  const randomId = Math.random()
    .toString(36)
    .substr(2, 5)
  const email = `sven.svensson.${randomId}@hedvig.com`

  return {
    ...currentQuoteTypeData,
    initialFormValues: {
      ...currentQuoteTypeData?.initialFormValues,
      email,
    },
  }
}

const getDanishQuoteValues = (values: any) => {
  const { data: danishHomeContent, ...filteredValues } = values
  const { subType, livingSpace, ...quoteTypeValues } = danishHomeContent
  return {
    ...filteredValues,
    data: quoteTypeValues,
  }
}

const getSwedishAccidentQuoteValues = (values: any) => {
  const { data: swedishApartmentData, ...filteredValues } = values
  const { subType, ...quoteTypeValues } = swedishApartmentData
  return {
    ...filteredValues,
    data: {
      ...quoteTypeValues,
      type: QuoteType.SwedishAccident,
      student:
        subType === ApartmentType.StudentBrf ||
        subType === ApartmentType.StudentRent,
    },
  }
}

const ButtonLoadingIndicator = styled(LoadingDots)`
  display: inline-flex;
  margin-left: 0.5rem;
`

export const QuoteData: React.FC<OfferProps> = ({ quoteCartId }) => {
  const { isoLocale, marketLabel, path: localePath } = useCurrentLocale()

  const { data, refetch } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })
  const [createQuoteBundle] = useCreateQuoteBundleMutation()

  const [quoteBundleType, setQuoteBundleType] = useState(
    quotesByMarket[marketLabel][0].value,
  )

  const [submitError, setSubmitError] = useState<Error>()
  const handleSubmit = async (values: any) => {
    const input = {
      ...values,
      currentInsurer: values.currentInsurer || undefined,
      startDate: values.startDate || undefined,
    }

    try {
      if (quoteBundleType === QuoteBundleType.SwedishApartmentAccident) {
        await createQuoteBundle({
          variables: {
            quoteCartId,
            quotes: [
              {
                ...input,
                data: {
                  ...input.data,
                  type: QuoteType.SwedishApartment,
                },
              },
              getSwedishAccidentQuoteValues(input),
            ],
          },
        })
      } else if (quoteBundleType === QuoteBundleType.DanishHomeAccident) {
        await createQuoteBundle({
          variables: {
            quoteCartId,
            quotes: [
              {
                ...input,
                data: {
                  ...input.data,
                  type: QuoteType.DanishHome,
                },
              },
              {
                ...input,
                data: {
                  ...getDanishQuoteValues(input),
                  type: QuoteType.DanishAccident,
                },
              },
            ],
          },
        })
      } else if (quoteBundleType === QuoteBundleType.DanishHomeAccidentTravel) {
        const danishQuoteValues = getDanishQuoteValues(input)

        await createQuoteBundle({
          variables: {
            quoteCartId,
            quotes: [
              {
                ...input,
                data: {
                  ...input.data,
                  type: QuoteType.DanishHome,
                },
              },
              {
                ...input,
                data: {
                  ...danishQuoteValues,
                  type: QuoteType.DanishAccident,
                },
              },
              {
                ...input,
                data: {
                  ...danishQuoteValues,
                  type: QuoteType.DanishTravel,
                },
              },
            ],
          },
        })
      } else {
        await createQuoteBundle({
          variables: {
            quoteCartId,
            quotes: [
              {
                ...input,
                data: {
                  ...input.data,
                  type: singleQuoteBundleToQuoteType(quoteBundleType),
                },
              },
            ],
          },
        })
      }

      await refetch()
    } catch (error) {
      setSubmitError(error)
    }
  }

  if (submitError) {
    throw submitError
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
            options={quotesByMarket[marketLabel]}
            value={quoteBundleType}
            onChange={(value: React.ChangeEvent<HTMLSelectElement>) =>
              setQuoteBundleType(value.target.value as QuoteBundleType)
            }
          />
        )}
      </Formik>

      {!data?.quoteCart.bundle ? (
        <Formik
          initialValues={
            getCurrentAvailableQuoteData(marketLabel, quoteBundleType)
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
                  {marketLabel === 'SE' && (
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
                    QuoteBundleType.SwedishApartment,
                    QuoteBundleType.SwedishApartmentAccident,
                  ].includes(quoteBundleType) && (
                    <SwedishApartment formik={props} />
                  )}
                  {quoteBundleType === QuoteBundleType.NorwegianHome && (
                    <NorwegianHome formik={props} />
                  )}
                  {quoteBundleType === QuoteBundleType.NorwegianTravel && (
                    <NorwegianTravel formik={props} />
                  )}
                  {(quoteBundleType === QuoteBundleType.DanishHome ||
                    quoteBundleType === QuoteBundleType.DanishHomeAccident ||
                    quoteBundleType ===
                      QuoteBundleType.DanishHomeAccidentTravel) && (
                    <DanishQuote formik={props} />
                  )}
                </>
              )}

              <Button
                type="submit"
                size="lg"
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
      ) : (
        <>
          <LinkButton
            background={colorsV3.gray100}
            foreground={colorsV3.gray900}
            to={{
              pathname: `/${localePath}/new-member/offer`,
              search: `?quoteCart=${quoteCartId}`,
            }}
          >
            Go to offer page →
          </LinkButton>
          <div style={{ padding: '2rem 0' }}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </>
      )}
    </>
  )
}
