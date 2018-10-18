import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { split } from 'apollo-link'
import { Provider } from 'constate'
import { OFFER_QUERY, OfferContainer } from 'containers/OfferContainer'
import { mount } from 'enzyme'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import {
  MockedProvider,
  MockedResponse,
  MockLink,
  MockSubscriptionLink,
} from 'react-apollo/test-utils'
import { HelmetProvider } from 'react-helmet-async'
import { Redirect, StaticRouter } from 'react-router-dom'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession, SESSION_KEY } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { mockNetworkWait } from 'utils/test-utils'
import { BankidStatus } from './SignSubscription'
import { SIGN_MUTATION, SignUp } from './SignUp'

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
            <MockTextKeyProvider textKeys={{ SIGN_HEADER_TITLE: '{address}' }}>
              <SignUp />
            </MockTextKeyProvider>
          </Provider>
        </MockedProvider>
      </StaticRouter>
    </HelmetProvider>,
  )

  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find(Redirect)).toHaveLength(0)
  expect(wrapper.find(OfferContainer).text()).toBe('Testvägen 1')
})

it('signs without 💥', async () => {
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
    {
      request: {
        query: SIGN_MUTATION,
        variables: {
          personalNumber: '201212121212',
          email: 'test@hedvig.com',
        },
      },
      result: {
        data: {
          signOffer: true,
        },
      },
    },
  ]
  const queryMutationLink = new MockLink(mocks)
  const subscriptionLink = new MockSubscriptionLink()
  const link = split(
    (op) => op.operationName === 'SignStatus',
    subscriptionLink,
    queryMutationLink,
  )
  const client = new ApolloClient({ link, cache: new InMemoryCache() })
  const wrapper = mount(
    <HelmetProvider>
      <StaticRouter context={{}} location="/sign">
        <ApolloProvider client={client}>
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
            <MockTextKeyProvider textKeys={{ SIGN_HEADER_TITLE: '{address}' }}>
              <SignUp />
            </MockTextKeyProvider>
          </Provider>
        </ApolloProvider>
      </StaticRouter>
    </HelmetProvider>,
  )

  await mockNetworkWait()
  wrapper.update()

  wrapper.find('input[name="email"]').simulate('change', {
    target: { value: 'test@hedvig.com', name: 'email' },
  })
  wrapper.find('input[name="personalNumber"]').simulate('change', {
    target: { value: '201212121212', name: 'personalNumber' },
  })
  wrapper.find('form').simulate('submit')
  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find('button[type="submit"]').prop('disabled')).toBe(true)
  subscriptionLink.simulateResult({
    result: {
      data: {
        signStatus: {
          status: {
            signState: 'COMPLETED',
            collectStatus: {
              status: 'complete',
              code: null,
              __typename: 'CollectData',
            },
            __typename: 'SignStatus',
          },
          __typename: 'SignEvent',
        },
      },
    },
  })
  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find(Redirect).prop('to')).toBe('/download')
})

it('shows an error when bankid errors', async () => {
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
    {
      request: {
        query: SIGN_MUTATION,
        variables: {
          personalNumber: '201212121212',
          email: 'test@hedvig.com',
        },
      },
      result: {
        data: {
          signOffer: true,
        },
      },
    },
  ]
  const queryMutationLink = new MockLink(mocks)
  const subscriptionLink = new MockSubscriptionLink()
  const link = split(
    (op) => op.operationName === 'SignStatus',
    subscriptionLink,
    queryMutationLink,
  )
  const client = new ApolloClient({ link, cache: new InMemoryCache() })
  const wrapper = mount(
    <HelmetProvider>
      <StaticRouter context={{}} location="/sign">
        <ApolloProvider client={client}>
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
            <MockTextKeyProvider textKeys={{ SIGN_HEADER_TITLE: '{address}' }}>
              <SignUp />
            </MockTextKeyProvider>
          </Provider>
        </ApolloProvider>
      </StaticRouter>
    </HelmetProvider>,
  )

  await mockNetworkWait()
  wrapper.update()

  wrapper.find('input[name="email"]').simulate('change', {
    target: { value: 'test@hedvig.com', name: 'email' },
  })
  wrapper.find('input[name="personalNumber"]').simulate('change', {
    target: { value: '201212121212', name: 'personalNumber' },
  })
  wrapper.find('form').simulate('submit')
  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find('button[type="submit"]').prop('disabled')).toBe(true)
  subscriptionLink.simulateResult({
    result: {
      data: {
        signStatus: {
          status: {
            signState: 'FAILED',
            collectStatus: {
              status: 'failed',
              code: 'startFailed',
              __typename: 'CollectData',
            },
            __typename: 'SignStatus',
          },
          __typename: 'SignEvent',
        },
      },
    },
  })
  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find(BankidStatus).text()).toContain(
    'SIGN_BANKID_CODE_START_FAILED',
  )
})
