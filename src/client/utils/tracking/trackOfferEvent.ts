import { useEffect, useCallback, useState } from 'react'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import {
  QuoteBundle,
  QuoteBundleVariant,
  useQuoteCartQuery,
} from 'data/graphql'
import { quoteBundleTrackingContractType } from 'api/quoteBundleTrackingContractType'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  getMonthlyCostDeductionIncentive,
  getSelectedBundleVariant,
} from 'api/quoteCartQuerySelectors'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { EmbarkStory } from '../embarkStory'
import { captureSentryError } from '../sentry-client'
import { EventName, GTMPhoneNumberData, pushToGTMDataLayer } from './gtm'

import {
  getTrackableContractCategory,
  getInitialOfferFromSessionStorage,
  setInitialOfferToSessionStorage,
} from './tracking'

type OptionalParameters = {
  switchedFrom?: QuoteBundle
  phoneNumberData?: GTMPhoneNumberData
  quoteCartId?: string
  memberId?: string
  error?: Error | unknown
}

type EventParameters = {
  eventName: EventName
  options?: Partial<OptionalParameters>
}

export const trackOfferEvent = (
  eventName: EventName,
  bundle: QuoteBundle,
  referralCodeUsed: boolean,
  options: OptionalParameters = {},
) => {
  const { switchedFrom, phoneNumberData, quoteCartId, memberId } = options
  const contractType = quoteBundleTrackingContractType(bundle)
  const contractCategory = getTrackableContractCategory(contractType)
  const grossPrice = Math.round(Number(bundle.bundleCost.monthlyGross.amount))
  const netPrice = Math.round(Number(bundle.bundleCost.monthlyNet.amount))

  const initialOffer = getInitialOfferFromSessionStorage()
  if (!initialOffer) {
    setInitialOfferToSessionStorage(contractCategory)
  }

  const mainQuote = quoteBundleSelector.getMainQuote(bundle)

  try {
    pushToGTMDataLayer({
      event: eventName,
      offerData: {
        insurance_type: contractType,
        referral_code: referralCodeUsed ? 'yes' : 'no',
        number_of_people: mainQuote.data.numberCoInsured + 1,
        insurance_price: grossPrice,
        ...(grossPrice !== netPrice && { discounted_premium: netPrice }),
        currency: bundle.bundleCost.monthlyNet.currency,
        is_student: quoteBundleSelector.isStudentOffer(bundle),
        has_home: true,
        has_accident: quoteBundleSelector.hasAccident(bundle),
        has_travel: quoteBundleSelector.hasTravel(bundle),
        initial_offer: initialOffer ?? contractCategory,
        current_offer: contractCategory,
        quote_cart_id: quoteCartId,
        ...(switchedFrom && {
          switched_from: getTrackableContractCategory(
            quoteBundleTrackingContractType(switchedFrom),
          ),
          switched_to: contractCategory,
        }),
        ...(memberId && { member_id: memberId }),
        flow_type: EmbarkStory.get() ?? undefined,
        current_insurer: mainQuote.currentInsurer?.id ?? undefined,
      },
      ...phoneNumberData,
    })
  } catch (error) {
    captureSentryError(error)
  }
}

export const useTrackOfferEvent = () => {
  const { isoLocale } = useCurrentLocale()

  const { quoteCartId } = useQuoteCartIdFromUrl()

  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()

  const { data: quoteCartQueryData } = useQuoteCartQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })

  const isReferralCodeUsed =
    getMonthlyCostDeductionIncentive(quoteCartQueryData) !== undefined

  const selectedBundleVariant = getSelectedBundleVariant(
    quoteCartQueryData,
    selectedInsuranceTypes,
  )

  const [eventQueue, setEventQueue] = useState<EventParameters[]>([])

  const trackOfferCallback = useCallback(
    (
      { eventName, options = {} }: EventParameters,
      selectedBundleVariant: QuoteBundleVariant,
    ) => {
      trackOfferEvent(
        eventName,
        selectedBundleVariant.bundle,
        isReferralCodeUsed,
        {
          quoteCartId,
          ...options,
        },
      )
    },
    [isReferralCodeUsed, quoteCartId],
  )

  const trackOfferHandler = useCallback((eventParams: EventParameters) => {
    setEventQueue((prevQueue) => [...prevQueue, eventParams])
  }, [])

  //cleanup the queue
  useEffect(() => {
    if (selectedBundleVariant) {
      const event = eventQueue[0]
      if (event) {
        trackOfferCallback(event, selectedBundleVariant)
        setEventQueue((prevQueue) => [...prevQueue].splice(1))
      }
    }
  }, [trackOfferCallback, selectedBundleVariant, eventQueue])

  return trackOfferHandler
}
