import { CreateQuoteData, CreateQuoteVariables } from '@hedviginsurance/embark'
import gql from 'graphql-tag'
import { apolloClient } from '../../client/apolloClient'
import { CREATE_SESSION_TOKEN_MUTATION } from '../../containers/SessionContainer'

const MUTATION = gql`
  mutation CreateQuote($input: CreateQuoteInput!) {
    createQuote(input: $input) {
      ... on CompleteQuote {
        id
        price {
          amount
          currency
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

const afterTick = (f: () => void) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      f()
      resolve()
    }, 0)
  })
}

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

  if (result.data!.createQuote.__typename === 'CompleteQuote') {
    storage.session.setSession({
      ...storage.session.getSession(),
      quoteId: result.data!.createQuote!.id,
    })
  }

  return result.data!
}
