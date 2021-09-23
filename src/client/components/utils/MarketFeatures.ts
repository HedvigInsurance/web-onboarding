import { Market, useMarket } from './CurrentLocale'

export const useCreditCheckInfo = () => {
  const market = useMarket()

  return [Market.No].includes(market)
}
