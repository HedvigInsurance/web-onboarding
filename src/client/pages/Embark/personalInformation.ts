import { PersonalInformationData } from '@hedviginsurance/embark'
import { apolloClient } from 'apolloClient'
import gql from 'graphql-tag'

const QUERY = gql`
  query PersonalInformation($input: PersonalInformationInput!) {
    personalInformation(input: $input) {
      firstName
      lastName
      streetAddress
      city
      postalNumber
    }
  }
`

export const resolvePersonalInformation = async (
  personalNumber: string,
): Promise<PersonalInformationData | Error> => {
  if (!apolloClient) {
    return Error('Missing apollo client')
  }

  const result = await apolloClient.client.query({
    query: QUERY,
    variables: { input: { personalNumber } },
  })
  return result.data
}
