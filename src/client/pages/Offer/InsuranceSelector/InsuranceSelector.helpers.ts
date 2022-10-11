import {
  QuoteBundleVariant,
  ExternalInsuranceDataQuery,
  InsuranceDataCollection,
} from 'data/graphql'

/**
 * Only Car is supported
 */
export const getInsuranceExposure = (variants: QuoteBundleVariant[]) => {
  const registrationNumber =
    variants[0]?.bundle.quotes[0].data['registrationNumber']
  return registrationNumber as string | undefined
}

export const getDataCollection = (
  data: ExternalInsuranceDataQuery,
  exposure?: string,
) => {
  const dataCollections = data.externalInsuranceProvider?.dataCollection
  return dataCollections?.find(
    (dataCollection) => dataCollection.exposure === exposure,
  )
}

export const matchVariantAndDataCollection = (
  variant: QuoteBundleVariant,
  dataCollection: InsuranceDataCollection,
) => {
  return variant.bundle.quotes[0].typeOfContract === dataCollection.coverage
}
