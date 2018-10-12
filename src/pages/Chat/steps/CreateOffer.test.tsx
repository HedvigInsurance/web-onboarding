import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { MockLink, MockSubscriptionLink } from 'utils/react-apollo-test-links'
import { mockNetworkWait } from 'utils/test-utils'
import { createSession, SESSION_KEY } from '../../../utils/sessionStorage'
import { MockStorage } from '../../../utils/storage/MockStorage'
import { StorageState } from '../../../utils/StorageContainer'
import { createCreateOfferMutationMock } from '../utils/test-utils'
import { CreateOffer } from './CreateOffer'

jest.mock('client/apolloClient', () => ({
  apolloClient: { subscriptionClient: {} },
}))
it('creates an offer without 💥', async () => {
  const mocks = createCreateOfferMutationMock()
  const subscriptionLink = new MockSubscriptionLink()
  const mockLink = new MockLink(mocks)
  const link = split(
    (op) => op.operationName === 'onOfferCreation',
    subscriptionLink,
    mockLink,
  )
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  const wrapper = mount(
    <ApolloProvider client={client}>
      <Provider<{ storage: StorageState }>
        initialState={{
          storage: {
            session: createSession(
              new MockStorage({
                [SESSION_KEY]: JSON.stringify({ token: 'abc123' }),
              }),
            ),
          },
        }}
      >
        <CreateOffer />
      </Provider>
    </ApolloProvider>,
  )

  wrapper.find('button').simulate('click')
  expect(wrapper.find('div').contains('loading')).toBe(true)

  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.find('div').contains('loading')).toBe(true)
  subscriptionLink.simulateResult({
    result: {
      data: {
        offer: {
          __typename: 'OfferEvent',
          status: 'PENDING ',
          insurance: {
            __typename: 'Insurance',
            status: 'PENDING',
          },
        },
      },
    },
  })
  await mockNetworkWait()
  wrapper.update()
  expect(wrapper.containsMatchingElement(<div>PENDING</div>)).toBe(true)
})
