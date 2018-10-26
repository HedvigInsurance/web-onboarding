import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'

export const OFFER_QUERY = gql`
  query Offer {
    insurance {
      address
      monthlyCost
      insuredAtOtherCompany
      type
      postalNumber
    }

    member {
      firstName
      lastName
    }
  }
`

export enum InsuranceType {
  RENT = 'RENT',
  BRF = 'BRF',
  STUDENT_RENT = 'STUDENT_RENT',
  STUDENT_BRF = 'STUDENT_BRF',
}

export interface OfferData {
  insurance: {
    address: string
    monthlyCost: number
    insuredAtOtherCompany: boolean
    type: InsuranceType
    postalNumber: string
  }
  member: {
    firstName: string
    lastName: string
  }
}

interface OfferContainerProps {
  children: (
    offer: OfferData,
    props: { refetch: any; loading: boolean },
  ) => React.ReactNode
  childrenHandlesLoadingState?: boolean
}

export const OfferContainer: React.SFC<OfferContainerProps> = ({
  children,
  childrenHandlesLoadingState,
}) => (
  <Query<OfferData> query={OFFER_QUERY}>
    {({ loading, error, data, refetch }) => {
      if (!childrenHandlesLoadingState && (loading || !data)) {
        return null
      }
      if (error) {
        return <div>Error</div>
      }
      return children(data!, { refetch, loading })
    }}
  </Query>
)
