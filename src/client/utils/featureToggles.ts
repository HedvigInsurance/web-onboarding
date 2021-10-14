import { Market, useMarket } from '../components/utils/CurrentLocale'

export const useCreditCheckInfo = () => {
  const market = useMarket()

  return [Market.No].includes(market)
}
