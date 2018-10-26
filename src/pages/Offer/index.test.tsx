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
import { HedvigSwitch } from './sections/HedvigSwitch'
import { PersonalInfo, Price } from './sections/Offer'

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
            monthlyCost: 99,
            insuredAtOtherCompany: false,
            type: 'RENT',
            postalNumber: '12345',
            personsInHousehold: 1,
            __typename: 'Insurance',
          },
          member: {
            firstName: 'Test',
            lastName: 'Testerson',
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
  expect(wrapper.find(Redirect)).toHaveLength(0)
  expect(wrapper.find(Price).text()).toBe('99 kr/mån')
  expect(wrapper.find(PersonalInfo).text()).toContain('Testerson')
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
            monthlyCost: 99,
            insuredAtOtherCompany: true,
            type: 'RENT',
            postalNumber: '12345',
            personsInHousehold: 1,
            __typename: 'Insurance',
          },
          member: {
            firstName: 'Test',
            lastName: 'Testerson',
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
