import { ApolloClient } from '@apollo/client'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { getSelectedBundleVariant } from 'api/quoteCartQuerySelectors'
import {
  QuoteCartQuery,
  QuoteCartDocument,
  QuoteCartQueryVariables,
  Locale,
  TypeOfContract,
} from 'data/graphql'
import { getQuoteIdsFromBundleVariant } from '../utils'

type GetQuoteCartParams = {
  apolloClient: ApolloClient<unknown>
  quoteCartId: string
  locale: Locale
}

export const getQuoteCart = async ({
  apolloClient,
  quoteCartId,
  locale,
}: GetQuoteCartParams) => {
  const { data } = await apolloClient.query<
    QuoteCartQuery,
    QuoteCartQueryVariables
  >({
    query: QuoteCartDocument,
    variables: { id: quoteCartId, locale },
    fetchPolicy: 'network-only',
  })
  return data
}

type GetQuoteIdsParams = {
  quoteCart: QuoteCartQuery
  insuranceTypes: Array<InsuranceType> | Array<TypeOfContract>
}

export const getQuoteIds = ({
  quoteCart,
  insuranceTypes,
}: GetQuoteIdsParams) => {
  const bundleVariant = getSelectedBundleVariant(quoteCart, insuranceTypes)
  if (bundleVariant === undefined) throw new Error('No bundle variant selected')
  return getQuoteIdsFromBundleVariant(bundleVariant)
}
