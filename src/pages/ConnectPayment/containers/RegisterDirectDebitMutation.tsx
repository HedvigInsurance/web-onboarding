import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation, MutationFn } from 'react-apollo'

const REGISTER_DIRECT_DEBIT_MUTATION = gql`
  mutation RegisterDirectDebit(
    $clientContext: RegisterDirectDebitClientContext!
  ) {
    registerDirectDebit(clientContext: $clientContext) {
      url
    }
  }
`

interface RegisterDirectDebitData {
  registerDirectDebit: {
    url: string
    orderId: string
  }
}

interface RegisterDirectDebitVariables {
  clientContext?: {
    successUrl: string
    failureUrl: string
  }
}

type RedeemCodeChild = (
  mutate: MutationFn<RegisterDirectDebitData, RegisterDirectDebitVariables>,
) => React.ReactNode

interface Props {
  children: RedeemCodeChild
}

export const RegisterDirectDebitMutation: React.FunctionComponent<Props> = ({
  children,
}) => (
  <Mutation<RegisterDirectDebitData, RegisterDirectDebitVariables>
    mutation={REGISTER_DIRECT_DEBIT_MUTATION}
  >
    {(mutate) => children(mutate)}
  </Mutation>
)
