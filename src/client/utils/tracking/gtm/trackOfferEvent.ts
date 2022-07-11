import { datadogRum } from '@datadog/browser-rum'
import { MarketLabel } from 'l10n/locales'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { QuoteBundle } from 'data/graphql'
import { EmbarkStory } from 'utils/embarkStory'

import { getGTMOfferBase, getGTMUserData } from 'utils/tracking/gtm/helpers'
import { GTMPhoneNumberData, pushToGTMDataLayer } from './dataLayer'
import { ErrorEventType, EventName } from './types'

export type OptionalParameters = {
  switchedFrom?: QuoteBundle
  phoneNumberData?: GTMPhoneNumberData
  quoteCartId?: string
  memberId?: string
  marketLabel?: MarketLabel
  buttonId?: string
  error?: Error | unknown
  errorType?: ErrorEventType
}

export type EventParameters = {
  eventName: EventName
  options?: Partial<OptionalParameters>
}

export const trackOfferEvent = async (
  eventName: EventName,
  bundle: QuoteBundle,
  referralCodeUsed: boolean,
  options: OptionalParameters = {},
) => {
  const { quoteCartId, marketLabel, ...optionsWithoutId } = options
  const { switchedFrom, phoneNumberData, memberId } = optionsWithoutId
  const grossPrice = Math.round(
    Number(quoteBundleSelector.getGrossPrice(bundle)),
  )
  const netPrice = Math.round(
    Number(quoteBundleSelector.getTotalBundleCost(bundle)),
  )

  const gtmUserData = await getGTMUserData(bundle.quotes[0], marketLabel)

  try {
    pushToGTMDataLayer({
      event: eventName,
      offerData: {
        referral_code: referralCodeUsed ? 'yes' : 'no',
        number_of_people: quoteBundleSelector.getHouseholdSize(bundle),
        insurance_price: grossPrice,
        ...(grossPrice !== netPrice && { discounted_premium: netPrice }),
        currency: quoteBundleSelector.getBundleCurrency(bundle),
        quote_cart_id: quoteCartId,
        ...getGTMOfferBase(bundle),
        ...(switchedFrom && {
          switch_from: {
            ...getGTMOfferBase(switchedFrom),
          },
        }),
        ...(memberId && { member_id: memberId }),
        flow_type: EmbarkStory.get() ?? undefined,
      },
      ...phoneNumberData,
      ...optionsWithoutId,
      ...gtmUserData,
    })
  } catch (error) {
    datadogRum.addError(error)
  }
}
