import { useCallback } from 'react'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { QuoteBundle, QuoteCartDocument, QuoteCartQuery } from 'data/graphql'
import { quoteBundleTrackingContractType } from 'api/quoteBundleTrackingContractType'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useSelectedInsuranceTypes } from 'utils/hooks/useSelectedInsuranceTypes'
import {
  getMonthlyCostDeductionIncentive,
  getSelectedBundleVariant,
} from 'api/quoteCartQuerySelectors'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { apolloClient } from 'apolloClient'
import { EmbarkStory } from '../embarkStory'
import { captureSentryError } from '../sentry-client'

import {
  ErrorEventType,
  EventName,
  GTMPhoneNumberData,
  pushToGTMDataLayer,
} from './gtm'

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
  buttonId?: string
  error?: Error | unknown
  errorType?: ErrorEventType
}

export type EventParameters = {
  eventName: EventName
  options?: Partial<OptionalParameters>
}

export const trackOfferEvent = (
  eventName: EventName,
  bundle: QuoteBundle,
  referralCodeUsed: boolean,
  options: OptionalParameters = {},
) => {
  const { quoteCartId, ...optionsWithoutId } = options
  const { switchedFrom, phoneNumberData, memberId } = optionsWithoutId
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
        is_student:
          quoteBundleSelector.isStudentOffer(bundle) ||
          quoteBundleSelector.isYouthOffer(bundle),
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
      ...optionsWithoutId,
    })
  } catch (error) {
    captureSentryError(error)
  }
}

export const useTrackOfferEvent = () => {
  const { isoLocale } = useCurrentLocale()

  const { quoteCartId } = useQuoteCartIdFromUrl()

  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()

  const trackOfferHandler = useCallback(
    ({ eventName, options = {} }: EventParameters) => {
      const runQuery = async () => {
        if (apolloClient && quoteCartId) {
          try {
            const quoteCartQuery = await apolloClient!.client.query<
              QuoteCartQuery
            >({
              query: QuoteCartDocument,
              variables: {
                id: quoteCartId,
                locale: isoLocale,
              },
            })
            return quoteCartQuery.data
          } catch (e) {
            return
          }
        } else return
      }
      const trackOfferCallback = async () => {
        const quoteCartQueryData = await runQuery()
        const isReferralCodeUsed =
          getMonthlyCostDeductionIncentive(quoteCartQueryData) !== undefined
        const selectedBundleVariant = getSelectedBundleVariant(
          quoteCartQueryData,
          selectedInsuranceTypes,
        )

        if (selectedBundleVariant) {
          trackOfferEvent(
            eventName,
            selectedBundleVariant.bundle,
            isReferralCodeUsed,
            {
              quoteCartId,
              ...options,
            },
          )
        }
      }
      trackOfferCallback()
    },
    [quoteCartId, isoLocale, selectedInsuranceTypes],
  )

  return trackOfferHandler
}
