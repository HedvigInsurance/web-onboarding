import {
  HouseInformationData,
  HouseInformationVariables,
} from '@hedviginsurance/embark'
import gql from 'graphql-tag'
import { apolloClient } from '../../client/apolloClient'

const QUERY = gql`
  query HouseInformationQuery($input: HouseInformationInput!) {
    houseInformation(input: $input) {
      livingSpace
      ancillaryArea
      yearOfConstruction
    }
  }
`

export const resolveHouseInformation = async (
  variables: HouseInformationVariables,
) => {
  if (!apolloClient) {
    return Error('Missing apollo client')
  }

  const result = await apolloClient.client.query<
    HouseInformationData,
    HouseInformationVariables
  >({
    query: QUERY,
    variables,
  })

  return result.data
}
