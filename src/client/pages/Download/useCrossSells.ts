import { useMemo } from 'react'
import { usePotentialCrossSellsQuery, CrossSellType } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

const RELEVANT_CROSS_SELL_TYPES = new Set<CrossSellType>([
  CrossSellType.Car,
  CrossSellType.HomeContent,
  CrossSellType.House,
])

const CROSS_SELL_URLS: Partial<Record<CrossSellType, string>> = {
  [CrossSellType.Car]: '/new-member/car?code=getcar20',
  [CrossSellType.HomeContent]: '/new-member/home-insurance?code=gethome20',
  [CrossSellType.House]: '/new-member/home-insurance?code=gethome20',
}

export const useCrossSells = () => {
  const { isoLocale } = useCurrentLocale()

  const result = usePotentialCrossSellsQuery({
    variables: { locale: isoLocale },
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
    }
  }, [result])
}
