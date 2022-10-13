import {
  QuoteCartQuery,
  useExternalInsuranceDataQuery,
  InsuranceDataCollection,
  ExternalInsuranceDataQuery,
} from 'data/graphql'
import { getDataCollectionId } from 'api/quoteCartQuerySelectors'

type Options = {
  onCompleted?: (data: InsuranceDataCollection) => void
}

export const useExternalDataCollection = (
  quoteCartQueryData?: QuoteCartQuery,
  { onCompleted }: Options = {},
) => {
  const variants = quoteCartQueryData?.quoteCart.bundle?.possibleVariations
  const exposure = variants ? getInsuranceExposure(variants) : undefined
  const dataCollectionId = getDataCollectionId(quoteCartQueryData) ?? null

  const { data } = useExternalInsuranceDataQuery({
    skip: !dataCollectionId,
    variables: dataCollectionId ? { reference: dataCollectionId } : undefined,
    onCompleted(newData) {
      const matchingDataCollection = getDataCollection(newData, exposure)
      if (matchingDataCollection) onCompleted?.(matchingDataCollection)
    },
  })

  return data ? getDataCollection(data, exposure) : null
}

type QuoteCartQuoteBundleVariant = NonNullable<
  QuoteCartQuery['quoteCart']['bundle']
>['possibleVariations'][number]

/**
 * Only Car is supported
 */
const getInsuranceExposure = (variants: QuoteCartQuoteBundleVariant[]) => {
  const registrationNumber =
    variants[0]?.bundle.quotes[0].data['registrationNumber']
  return registrationNumber as string | undefined
}

const getDataCollection = (
  data: ExternalInsuranceDataQuery,
  exposure?: string,
) => {
  const dataCollections = data.externalInsuranceProvider?.dataCollection
  return dataCollections?.find(
    (dataCollection) => dataCollection.exposure === exposure,
  )
}
