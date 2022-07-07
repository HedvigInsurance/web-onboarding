import faker from '@faker-js/faker'

const GRAPHQL_ENDPOINT = 'https://graphql.dev.hedvigit.com/graphql'

export const getRandomBirthDateDK = () => {
  const pastDate = faker.date.between('1940-01-01', '1990-01-01')
  const date = String(pastDate.getDate()).padStart(2, '0')
  const month = String(pastDate.getMonth() + 1).padStart(2, '0')
  return `${date}-${month}-${pastDate.getFullYear()}`
}

const QUOTE_CART_MUTATION = /* GraphQL */ `
  mutation CreateOnboardingQuoteCart($market: Market!, $locale: String!) {
    onboardingQuoteCart_create(input: { market: $market, locale: $locale }) {
      id
    }
  }
`

const QUOTE_BUNDLE_MUTATION = /* GraphQL */ `
  mutation CreateQuoteBundle($id: ID!, $input: CreateQuoteBundleInput!) {
    quoteCart_createQuoteBundle(id: $id, input: $input) {
      ... on QuoteCart {
        id
        bundle {
          quotes {
            id
          }
        }
      }
      ... on QuoteBundleError {
        message
        type
        limits {
          code
        }
      }
    }
  }
`

type CreateQuoteBundleParams = {
  quoteCartId: string
  quotes: Array<any>
}

export const createQuoteBundle = ({
  quoteCartId,
  quotes,
}: CreateQuoteBundleParams) => {
  return cy.request('POST', GRAPHQL_ENDPOINT, {
    query: QUOTE_BUNDLE_MUTATION,
    variables: {
      id: quoteCartId,
      input: {
        payload: quotes,
      },
    },
  })
}

type CreateQuoteCartParams = {
  locale: string
  market: string
}

export const createQuoteCart = ({ locale, market }: CreateQuoteCartParams) => {
  return cy
    .request('POST', GRAPHQL_ENDPOINT, {
      query: QUOTE_CART_MUTATION,
      variables: { locale, market },
    })
    .then((response) => {
      const quoteCartId = response.body.data.onboardingQuoteCart_create.id
      return quoteCartId
    })
}
