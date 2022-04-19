import { ExternalInsuranceDataQuery } from 'data/graphql'

export function getExternalInsuranceData(
  externalInsuranceQuery: ExternalInsuranceDataQuery | null,
) {
  const currentCurrency =
    externalInsuranceQuery?.externalInsuranceProvider?.dataCollection[0]
      ?.monthlyPremium?.currency
  const currentPrice =
    externalInsuranceQuery?.externalInsuranceProvider?.dataCollection[0]
      ?.monthlyPremium?.amount
  return {
    currentPrice,
    currentCurrency,
  }
}
