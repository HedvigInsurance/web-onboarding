import { QuoteBundle, BundledQuote } from 'data/graphql'
import * as quoteSelector from 'api/quoteSelector'
import * as quoteBundleSelector from 'api/quoteBundleSelectors'
import { QuoteCarSubType, QuoteOwnershipType } from 'api/quoteSelector'
import { MarketLabel } from 'l10n/locales'
import { GTMOfferBase } from './dataLayer'

type OwnershipType = 'rent' | 'own'
export const getOwnershipType = (
  quote: BundledQuote,
): OwnershipType | undefined => {
  const subType = quoteSelector.getSubType(quote) as QuoteOwnershipType

  if (subType && ['RENT', 'STUDENT_RENT'].includes(subType)) {
    return 'rent'
  } else return 'own'
}

type CarSubtype = 'traffic_insurance' | 'half_insurance' | 'full_insurance'
export const getCarSubType = (quote: BundledQuote): CarSubtype => {
  const subType = quoteSelector.getSubType(quote) as QuoteCarSubType
  switch (subType) {
    case 'TRAFFIC':
      return 'traffic_insurance'
    case 'HALF':
      return 'half_insurance'
    case 'FULL':
      return 'full_insurance'
  }
}

export const getBundleSubTypes = (bundle: QuoteBundle) => {
  const carInsurance = bundle.quotes.find(quoteSelector.isCar)
  const homeInsurance = bundle.quotes.find(quoteSelector.isHomeContentsOrHouse)

  const carSubType = carInsurance && getCarSubType(carInsurance)
  const ownershipType = homeInsurance && getOwnershipType(homeInsurance)
  return {
    car_sub_type: carSubType,
    ownership_type: ownershipType,
  }
}

export const getGTMOfferBase = (bundle: QuoteBundle): GTMOfferBase => ({
  is_student: quoteBundleSelector.isStudentOffer(bundle),
  has_home: quoteBundleSelector.hasHomeContents(bundle),
  has_house: quoteBundleSelector.hasHouse(bundle),
  has_accident: quoteBundleSelector.hasAccident(bundle),
  has_travel: quoteBundleSelector.hasTravel(bundle),
  has_car: quoteBundleSelector.hasCar(bundle.quotes),
  ...getBundleSubTypes(bundle),
})

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
export const hashValue = async (message?: string) => {
  const msgUint8 = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

const removePunctuation = (message?: string) => {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
  return message?.replace(regex, '')
}

export const getGTMUserData = async (
  firstQuote: BundledQuote,
  market?: MarketLabel,
) => {
  // Reference for formatting user data
  // https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
  const firstName = await hashValue(
    removePunctuation(firstQuote.firstName?.toLowerCase().trim()),
  )
  const lastName = await hashValue(
    removePunctuation(firstQuote.lastName?.toLowerCase().trim()),
  )
  const email = await hashValue(firstQuote.email?.toLowerCase().trim())
  const zipCode = await hashValue(firstQuote.data.zipCode?.replace(/\s/g, ''))
  const city = await hashValue(
    removePunctuation(firstQuote.data.city?.toLowerCase().replace(/\s/g, '')),
  )
  const country = await hashValue(market?.toLowerCase())

  return {
    userData: {
      fn: firstName,
      ln: lastName,
      em: email,
      ad: {
        zp: zipCode,
        ct: city,
        co: country,
      },
    },
  }
}
