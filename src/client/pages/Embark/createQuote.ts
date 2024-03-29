import { CreateQuoteData, CreateQuoteVariables } from '@hedviginsurance/embark'
import gql from 'graphql-tag'
import { datadogRum } from '@datadog/browser-rum'
import { apolloClient } from 'apolloClient'
import { setupSession } from 'containers/SessionContainer'
import { Locale } from 'data/graphql'

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

export const createQuote = (storage: any, locale: Locale) => async (
  variables: CreateQuoteVariables,
): Promise<CreateQuoteData | Error> => {
  try {
    await setupSession(apolloClient!, storage, locale)
  } catch (error) {
    datadogRum.addError(error)
    throw error
  }

  const result = await apolloClient!.client
    .mutate<CreateQuoteData, CreateQuoteVariables>({
      mutation: MUTATION,
      variables,
    })
    .catch((e) => {
      datadogRum.addError(e, { email: variables.input.email })
      throw e
    })

  if (result.data && result.data.createQuote.__typename === 'CompleteQuote') {
    storage.session.setSession({
      ...storage.session.getSession(),
      quoteIds: [result.data!.createQuote!.id],
    })
  }

  return result.data!
}
