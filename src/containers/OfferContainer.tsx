import gql from 'graphql-tag'
import * as React from 'react'
import { Query } from 'react-apollo'
import { Insurer } from 'src/pages/Chat/state'
import { InsuranceType } from 'utils/insuranceDomainUtils'
import { Incentive, MonetaryAmount } from './types'

export const OFFER_QUERY = gql`
  query Offer {
    insurance {
      address
      insuredAtOtherCompany
      type
      postalNumber
      personsInHousehold
      currentInsurerName
      cost {
        monthlyDiscount {
          amount
        }
        monthlyNet {
          amount
        }
        monthlyGross {
          amount
        }
      }
    }

    redeemedCampaigns {
      incentive {
        ... on FreeMonths {
          quantity
        }
        ... on MonthlyCostDeduction {
          amount {
            amount
            currency
          }
        }
      }
      code
      owner {
        displayName
      }
    }

    member {
      id
      firstName
      lastName
      email
    }
  }
`

export interface OfferData {
  insurance: {
    address: string
    insuredAtOtherCompany: boolean
    type: InsuranceType
    postalNumber: string
    personsInHousehold: number
    currentInsurerName: Insurer
    cost: {
      monthlyGross: MonetaryAmount
      monthlyNet: MonetaryAmount
      monthlyDiscount: MonetaryAmount
    }
  }
  redeemedCampaigns: Array<{
    incentive: Incentive
    code: string
    owner: {
      displayName: string
    }
  }>
  member: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

interface OfferContainerProps {
  children: (
    offer: OfferData,
    props: { refetch: () => void; loading: boolean },
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
