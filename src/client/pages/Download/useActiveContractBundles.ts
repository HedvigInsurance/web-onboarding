import { useMemo } from 'react'
import {
  CrossSellType,
  useActiveContractBundlesQuery,
  ActiveContractBundlesQuery,
} from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

const RELEVANT_CROSS_SELL_TYPES = new Set<CrossSellType>([
  CrossSellType.Car,
  CrossSellType.HomeContent,
  CrossSellType.House,
])

const CROSS_SELL_URLS: Partial<Record<CrossSellType, string>> = {
  [CrossSellType.Car]: '/new-member/car?code=getcar200',
  [CrossSellType.HomeContent]: '/new-member/home-insurance?code=gethome200',
  [CrossSellType.House]: '/new-member/home-insurance?code=gethome200',
}

type Params = {
  onCompleted?: (data: ActiveContractBundlesQuery) => void
}

export const useActiveContractBundles = ({ onCompleted }: Params = {}) => {
  const { isoLocale } = useCurrentLocale()

  const result = useActiveContractBundlesQuery({
    variables: { locale: isoLocale },
    onCompleted,
  })

  return useMemo(() => {
    return {
      loading: result.loading,
      error: result.error,
      crossSells: result.data?.activeContractBundles
        .flatMap((bundle) =>
          bundle.potentialCrossSells.map((crossSell) => ({
            id: crossSell.contractType,
            type: crossSell.type,
            title: crossSell.webTitle,
            description: crossSell.webDescription,
            image: crossSell.imageUrl,
            callToAction: crossSell.callToAction,
          })),
        )
        .filter((crossSell) => RELEVANT_CROSS_SELL_TYPES.has(crossSell.type))
        .map((crossSell) => ({
          ...crossSell,
          href: CROSS_SELL_URLS[crossSell.type],
        })),
      contracts: result.data?.activeContractBundles.flatMap(
        (bundle) => bundle.contracts,
      ),
    }
  }, [result])
}
