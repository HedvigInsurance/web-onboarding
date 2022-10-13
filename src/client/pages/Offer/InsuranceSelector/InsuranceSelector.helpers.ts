import { QuoteBundleVariant, InsuranceDataCollection } from 'data/graphql'

export const matchVariantAndDataCollection = (
  variant: QuoteBundleVariant,
  dataCollection: InsuranceDataCollection,
) => {
  return variant.bundle.quotes[0].typeOfContract === dataCollection.coverage
}
