import md5 from 'md5'
import { QuoteBundle } from 'data/graphql'
import { quoteBundleTrackingContractType } from 'api/quoteBundleTrackingContractType'
import {
  ADTRACTION_CONTRACT_VALUES,
  TypeOfContractExcludedUnused,
} from './adtraction'

const getBundleAdtractionProductValue = (bundle: QuoteBundle) => {
  return ADTRACTION_CONTRACT_VALUES[
    quoteBundleTrackingContractType(bundle) as TypeOfContractExcludedUnused
  ]
}

export const adtractionQuoteCart = (
  orderValue: number,
  orderId: string,
  emailAddress: string,
  bundle: QuoteBundle,
  couponCode?: string,
) => {
  try {
    const adt = ADT
    adt.Tag = adt.Tag || {}
    adt.Tag.t = 3
    adt.Tag.c = bundle.bundleCost.monthlyGross.currency
    adt.Tag.am = orderValue
    adt.Tag.ti = orderId
    adt.Tag.xd = md5(emailAddress)

    if (couponCode) {
      adt.Tag.cpn = couponCode
    }

    adt.Tag.tp = getBundleAdtractionProductValue(bundle)
    adt.Tag.doEvent()
  } catch (e) {
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      ;(window as any).Sentry.captureMessage(e)
    }
  }
}
