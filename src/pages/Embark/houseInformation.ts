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

export const resolveHouseInformation = async (input: any) => {
  if (!apolloClient) {
    return Error('Missing apollo client')
  }

  const result = await apolloClient.client.query({
    query: QUERY,
    variables: { input },
  })

  return result.data
}
