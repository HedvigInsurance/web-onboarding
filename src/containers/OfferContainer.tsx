import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'
import { InsuranceType } from 'utils/insuranceDomainUtils'
import { Insurer } from 'src/pages/Chat/state'

export const OFFER_QUERY = gql`
  query Offer {
    insurance {
      address
      monthlyCost
      insuredAtOtherCompany
      type
      postalNumber
      personsInHousehold
      currentInsurerName
    }

    member {
      firstName
      lastName
    }
  }
`

export interface OfferData {
  insurance: {
    address: string
    monthlyCost: number
    insuredAtOtherCompany: boolean
    type: InsuranceType
    postalNumber: string
    personsInHousehold: number
    currentInsurerName: Insurer
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
