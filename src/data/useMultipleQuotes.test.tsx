import { MockedProvider } from '@apollo/react-testing'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import {
  ApartmentType,
  CompleteQuote,
  Locale,
  TypeOfContract,
} from 'data/graphql'
import { mount } from 'enzyme'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { mockNetworkWait } from 'utils/test-utils'
import introspectionQueryResultData from '../fragmentTypes.json'
import { QuoteDocument } from './graphql'
import { useMultipleQuotes } from './useMultipleQuotes'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const QuotesDisplayer: React.FC<{
  quoteIds: ReadonlyArray<string>
  localeIsoCode: Locale
}> = ({ quoteIds, localeIsoCode }) => {
  const [quotes] = useMultipleQuotes(quoteIds, localeIsoCode)
  return (
    <ul>
      {quotes.map((quote) => (
        <li key={quote.id}>{quote.id}</li>
      ))}
    </ul>
  )
}

it('does nothing on no quote ids', async () => {
  const wrapper = mount(
    <MockedProvider mocks={[]}>
      <QuotesDisplayer quoteIds={[]} localeIsoCode={Locale.SvSe} />
    </MockedProvider>,
  )

  await act(() => mockNetworkWait())
  wrapper.update()

  expect(wrapper.find('li').length).toBe(0)
})

const quoteMock: CompleteQuote = {
  id: 'b2571926-fbae-4ade-8a55-ebc7f6375ad1',
  dataCollectionId: null,
  ssn: '1212121212',
  email: 'blargis@hedvig.com',
  firstName: 'Blargh',
  lastName: 'Blarghson',
  startDate: null,
  currentInsurer: null,
  price: { __typename: 'MonetaryAmountV2', amount: '9650.42', currency: 'SEK' },
  birthDate: '2012-12-12',
  expiresAt: '1942-12-21',
  insurableLimits: [],
  insuranceCost: {
    freeUntil: null,
    monthlyDiscount: {
      amount: '0.00',
      currency: 'SEK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyGross: {
      amount: '9650.42',
      currency: 'SEK',
      __typename: 'MonetaryAmountV2',
    },
    monthlyNet: {
      amount: '9650.42',
      currency: 'SEK',
      __typename: 'MonetaryAmountV2',
    },
    __typename: 'InsuranceCost',
  },
  quoteDetails: {
    householdSize: 2,
    livingSpace: 23,
    street: 'Gulebøjsveien 1',
    type: ApartmentType.Brf,
    zipCode: '1234',
    __typename: 'SwedishApartmentQuoteDetails',
  },
  details: {
    householdSize: 2,
    livingSpace: 23,
    street: 'Gulebøjsveien 1',
    type: ApartmentType.Brf,
    zipCode: '1234',
    __typename: 'CompleteApartmentQuoteDetails',
  },
  termsAndConditions: {
    displayName: '',
    url: '',
    __typename: 'InsuranceTerm',
  },
  typeOfContract: TypeOfContract.NoHomeContentOwn,
  termsAndConditions: {
    url: 'https://important',
    displayName: 'Important ToC',
  },
  insuranceTerms: [],
  perils: [],
  __typename: 'CompleteQuote',
}

it('fetches quote on one quote', async () => {
  const wrapper = mount(
    <MockedProvider
      cache={new InMemoryCache({ fragmentMatcher })}
      mocks={[
        {
          request: {
            query: QuoteDocument,
            variables: { id: quoteMock.id, perilsLocale: Locale.SvSe },
          },
          result: {
            data: {
              quote: quoteMock,
            },
          },
        },
      ]}
    >
      <QuotesDisplayer quoteIds={[quoteMock.id]} localeIsoCode={Locale.SvSe} />
    </MockedProvider>,
  )

  await act(() => mockNetworkWait())
  act(() => {
    wrapper.update()
  })

  expect(wrapper.find('li').length).toBe(1)
  expect(
    wrapper
      .find('li')
      .first()
      .text(),
  ).toBe(quoteMock.id)
})
