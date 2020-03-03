import { CreateQuoteData, CreateQuoteVariables } from '@hedviginsurance/embark'
import { MemberInsuranceDocument } from 'generated/graphql'
import gql from 'graphql-tag'
import { apolloClient } from '../../client/apolloClient'
import { CREATE_SESSION_TOKEN_MUTATION } from '../../containers/SessionContainer'
import { afterTick } from './utils'

const MUTATION = gql`
  mutation CreateQuote($input: CreateQuoteInput!) {
    createQuote(input: $input) {
      ... on CompleteQuote {
        id
        insuranceCost {
          monthlyGross {
            amount
            currency
          }
          monthlyDiscount {
            amount
            currency
          }
          monthlyNet {
            amount
            currency
          }
          freeUntil
        }
        details {
          ... on CompleteApartmentQuoteDetails {
            type
            street
            zipCode
            householdSize
            livingSpace
          }
          ... on CompleteHouseQuoteDetails {
            ancillarySpace
            street
            zipCode
            householdSize
            livingSpace
            extraBuildings {
              ... on ExtraBuildingCore {
                displayName
                area
                hasWaterConnected
              }
            }
          }
        }
      }
    }
  }
`

export const createQuote = (storage: any) => async (
  variables: CreateQuoteVariables,
): Promise<CreateQuoteData | Error> => {
  if (!apolloClient) {
    return Error('Missing apollo client')
  }

  if (!storage.session.getSession().token) {
    const sessionResult = await apolloClient.client.mutate({
      mutation: CREATE_SESSION_TOKEN_MUTATION,
    })
    await afterTick(() => {
      apolloClient!.subscriptionClient.close(true, true)
      storage.setToken(sessionResult.data.createSessionV2.token)
    })
  }

  const result = await apolloClient.client.mutate<
    CreateQuoteData,
    CreateQuoteVariables
  >({
    mutation: MUTATION,
    variables,
  })

  if (result.data && result.data.createQuote.__typename === 'CompleteQuote') {
    // Update the cache
    await apolloClient.client.query({
      query: MemberInsuranceDocument,
      fetchPolicy: 'network-only',
    })

    storage.session.setSession({
      ...storage.session.getSession(),
      quoteId: result.data!.createQuote!.id,
    })
  }

  return result.data!
}
