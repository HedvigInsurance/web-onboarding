import { Provider } from 'constate'
import { OFFER_QUERY } from 'containers/OfferContainer'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils'
import { HelmetProvider } from 'react-helmet-async'
import { Redirect, StaticRouter } from 'react-router-dom'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession, SESSION_KEY } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { mockNetworkWait } from 'utils/test-utils'
import { Offering } from '.'
import { Price } from './components/PriceAndInclusions'
import { HedvigSwitch } from './sections/HedvigSwitch'

jest.mock('client/apolloClient', () => ({
  apolloClient: {
    subscriptionClient: { close: jest.fn() },
  },
}))

it('queries when it has a session', async () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: OFFER_QUERY,
      },
      result: {
        data: {
          insurance: {
            address: 'Testvägen 1',
            cost: {
              monthlyNet: {
                amount: '99.00',
                currency: 'SEK',
                __typename: 'MonetaryAmount',
              },
              monthlyGross: {
                amount: '99.00',
                currency: 'SEK',
                __typename: 'MonetaryAmount',
              },
              monthlyDiscount: {
                amount: '0.00',
                currency: 'SEK',
                __typename: 'MonetaryAmount',
              },
              __typename: 'InsuranceCost',
            },
            insuredAtOtherCompany: false,
            type: 'RENT',
            postalNumber: '12345',
            personsInHousehold: 1,
            currentInsurerName: 'FOLKSAM',
            __typename: 'Insurance',
          },
          redeemedCampaigns: [],
          member: {
            id: '1337',
            firstName: 'Test',
            lastName: 'Testerson',
            email: 'test@testerson.se',
            __typename: 'Member',
          },
        },
      },
    },
  ]
  const wrapper = mount(
    <HelmetProvider>
      <StaticRouter context={{}}>
        <MockedProvider mocks={mocks}>
          <Provider
            initialState={{
              storage: {
                session: createSession(
                  new MockStorage({
                    [SESSION_KEY]: JSON.stringify({ token: 'test-token' }),
                  }),
                ),
              },
            }}
          >
            <MockTextKeyProvider
              textKeys={{ OFFER_SUMMARY_PRICE: '{price} kr/mån' }}
            >
              <Offering />
            </MockTextKeyProvider>
          </Provider>
        </MockedProvider>
      </StaticRouter>
    </HelmetProvider>,
  )

  await mockNetworkWait()
  wrapper.update()
  expect(
    wrapper
      .find(Price)
      .at(0)
      .text(),
  ).toBe('99 kr/mån')
  expect(
    wrapper
      .find(Price)
      .at(1)
      .text(),
  ).toBe('99 kr/mån')
  expect(wrapper.find(Redirect)).toHaveLength(0)
  expect(wrapper.find(HedvigSwitch)).toHaveLength(0)
})

it('shows information about switching if you have an insurance', async () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: OFFER_QUERY,
      },
      result: {
        data: {
          insurance: {
            address: 'Testvägen 1',
            cost: {
              monthlyNet: {
                amount: '99.00',
                currency: 'SEK',
                __typename: 'MonetaryAmount',
              },
              monthlyGross: {
                amount: '99.00',
                currency: 'SEK',
                __typename: 'MonetaryAmount',
              },
              monthlyDiscount: {
                amount: '0.00',
                currency: 'SEK',
                __typename: 'MonetaryAmount',
              },
              __typename: 'InsuranceCost',
            },
            insuredAtOtherCompany: true,
            type: 'RENT',
            postalNumber: '12345',
            personsInHousehold: 1,
            currentInsurerName: 'FOLKSAM',
            __typename: 'Insurance',
          },
          redeemedCampaigns: [],
          member: {
            id: '1337',
            firstName: 'Test',
            lastName: 'Testerson',
            email: 'test@testerson.se',
            __typename: 'Member',
          },
        },
      },
    },
  ]
  const wrapper = mount(
    <HelmetProvider>
      <StaticRouter context={{}}>
        <MockedProvider mocks={mocks}>
          <Provider
            initialState={{
              storage: {
                session: createSession(
                  new MockStorage({
                    [SESSION_KEY]: JSON.stringify({ token: 'test-token' }),
                  }),
                ),
              },
            }}
          >
            <Offering />
          </Provider>
        </MockedProvider>
      </StaticRouter>
    </HelmetProvider>,
  )

  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find(Redirect)).toHaveLength(0)
  expect(wrapper.find(HedvigSwitch)).toHaveLength(1)
})
