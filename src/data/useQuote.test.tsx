import { MockedProvider } from '@apollo/react-testing'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { ApartmentType, CompleteQuote, TypeOfContract } from 'data/graphql'
import { useQuote } from 'data/useQuote'
import { mount } from 'enzyme'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { mockNetworkWait } from 'utils/test-utils'
import introspectionQueryResultData from '../fragmentTypes.json'
import { QuoteDocument } from './graphql'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const QuotesDisplayer: React.FC<{ quoteId: string }> = ({ quoteId }) => {
  const [quote] = useQuote(quoteId)
  return (
    <ul>
      <li key={quote?.id}>{quote?.id}</li>
    </ul>
  )
}

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
  typeOfContract: TypeOfContract.NoHomeContentOwn,
  perils: [],
  __typename: 'CompleteQuote',
}

it('fetches quote on one quote', async () => {
  const wrapper = mount(
    <MockedProvider
      cache={new InMemoryCache({ fragmentMatcher })}
      mocks={[
        {
          request: { query: QuoteDocument, variables: { id: quoteMock.id } },
          result: {
            data: {
              quote: quoteMock,
            },
          },
        },
      ]}
    >
      <QuotesDisplayer quoteId={quoteMock.id} />
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
