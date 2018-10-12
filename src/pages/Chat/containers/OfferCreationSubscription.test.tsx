import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { mount } from 'enzyme'
import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { MockSubscriptionLink } from 'utils/react-apollo-test-links'
import { mockNetworkWait } from '../../../utils/test-utils'
import { OfferCreationSubscription } from './OfferCreationSubscription'

const createApolloClient = () => {
  const link = new MockSubscriptionLink()
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })

  return { link, client }
}

it('renders no data without data', async () => {
  const apolloClient = createApolloClient()
  const wrapper = mount(
    <ApolloProvider client={apolloClient.client}>
      <OfferCreationSubscription>
        {(offerCreationData) => (
          <div>
            {offerCreationData ? offerCreationData.offer.status : 'nope'}
          </div>
        )}
      </OfferCreationSubscription>
    </ApolloProvider>,
  )

  expect(wrapper.find('div').contains('nope')).toBe(true)
  apolloClient.link.simulateResult({
    result: {
      data: {
        offer: {
          __typename: 'OfferEvent',
          status: 'SUCCESS',
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
  expect(wrapper.find('div').contains('SUCCESS')).toBe(true)
})
