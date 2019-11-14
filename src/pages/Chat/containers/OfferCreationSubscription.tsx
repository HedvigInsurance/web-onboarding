import gql from 'graphql-tag'
import * as React from 'react'
import { Subscription } from 'react-apollo'

export interface OfferCreationSubscriptionData {
  offer: {
    status: 'SUCCESS' | 'FAIL'
    insurance: {
      status:
        | 'PENDING'
        | 'ACTIVE'
        | 'INACTIVE'
        | 'INACTIVE_WITH_START_DATE'
        | 'TERMINATED'
    }
  }
}

export const OFFER_CREATION_SUBSCRIPTION = gql`
  subscription onOfferCreation {
    offer {
      status
      insurance {
        status
      }
    }
  }
`

interface OfferCreationSubscriptionProps {
  children: (offer: OfferCreationSubscriptionData | null) => React.ReactNode
}

export const OfferCreationSubscription: React.SFC<OfferCreationSubscriptionProps> = ({
  children,
}) => (
  <Subscription<OfferCreationSubscriptionData>
    subscription={OFFER_CREATION_SUBSCRIPTION}
  >
    {({ data }) => children(data ? data : null)}
  </Subscription>
)
