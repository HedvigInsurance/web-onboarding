import md5 from 'md5'
import { QuoteBundle } from 'data/graphql'
import { AdTractionMarketConfig } from 'l10n/adTractionConfigs'
import {
  isAccident,
  isHomeContents,
  isHouse,
  isTravel,
  isStudentOrYouth,
} from 'api/quoteSelector'

export const getProductCategories = (bundle: QuoteBundle) => {
  const categoryList = bundle.quotes.reduce((acc, quote) => {
    if (isAccident(quote)) return [...acc, 'accident_0']
    if (isTravel(quote)) return [...acc, 'travel_0']
    if (isHouse(quote)) return [...acc, 'house_0']
    if (isHomeContents(quote)) {
      return [
        ...acc,
        isStudentOrYouth(quote) ? 'homecontentstudent_0' : 'homecontent_0',
      ]
    }
    return acc
  }, [] as string[])
  return categoryList.join('-')
}

export const adtractionQuoteCart = (
  orderId: string,
  emailAddress: string,
  bundle: QuoteBundle,
  adTractionConfig: AdTractionMarketConfig,
  couponCode?: string,
) => {
  try {
    const adt = ADT
    adt.Tag = adt.Tag || {}
    adt.Tag.t = 3
    adt.Tag.c = bundle.bundleCost.monthlyGross.currency
    adt.Tag.am = 0
    adt.Tag.ti = orderId
    adt.Tag.xd = md5(emailAddress)

    if (couponCode) {
      adt.Tag.cpn = couponCode
    }

    adt.Tag.tp = adTractionConfig.tp
    adt.Tag.pc = getProductCategories(bundle)
    adt.Tag.doEvent()
  } catch (e) {
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      ;(window as any).Sentry.captureMessage(e)
    }
  }
}
