import { Incentive, MonetaryAmount } from 'containers/types'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation, MutationFn } from 'react-apollo'

const REDEEM_CODE_MUTATION = gql`
  mutation RedeemCode($code: String!) {
    redeemCode(code: $code) {
      campaigns {
        incentive {
          ... on MonthlyCostDeduction {
            amount {
              amount
              currency
            }
          }
          ... on FreeMonths {
            quantity
          }
        }
      }
      cost {
        monthlyGross {
          amount
          currency
        }
        monthlyNet {
          amount
          currency
        }
      }
    }
  }
`
interface RedeemCodeData {
  redeemCode: {
    campaigns: Array<{
      incentive: Incentive
    }>
    cost: {
      monthlyGross: MonetaryAmount
      monthlyNet: MonetaryAmount
    }
  }
}

interface RedeemCodeVariables {
  code: string
}

type RedeemCodeChild = (
  mutate: MutationFn<RedeemCodeData, RedeemCodeVariables>,
) => React.ReactNode

interface Props {
  children: RedeemCodeChild
}

export const RedeemCodeMutation: React.FunctionComponent<Props> = ({
  children,
}) => (
  <Mutation<RedeemCodeData, RedeemCodeVariables>
    mutation={REDEEM_CODE_MUTATION}
  >
    {(mutate) => children(mutate)}
  </Mutation>
)
