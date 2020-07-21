import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const REGISTER_DIRECT_DEBIT_MUTATION = gql`
  mutation RegisterDirectDebit(
    $clientContext: RegisterDirectDebitClientContext!
  ) {
    registerDirectDebit(clientContext: $clientContext) {
      url
      orderId
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

export const useRegisterDirectDebitMutation = () =>
  useMutation<RegisterDirectDebitData, RegisterDirectDebitVariables>(
    REGISTER_DIRECT_DEBIT_MUTATION,
  )
