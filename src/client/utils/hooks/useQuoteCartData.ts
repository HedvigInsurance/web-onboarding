import { useParams } from 'react-router-dom'

import { useQuoteCartQuery, BundledQuote } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import {
  getMainQuote,
  getDiscountAmount,
  getTotalBundleCost,
  getBundleCurrency,
} from 'api/quoteBundleSelectors'
import {
  getSelectedBundleVariant,
  getCampaign,
  getPossibleVariations,
  getAllQuotes,
  getCheckoutStatus,
} from 'api/quoteCartQuerySelectors'
import {
  typeOfResidenceTextKeys,
  HomeInsuranceTypeOfContract,
} from 'pages/Offer/utils'
import { GenericQuoteData } from '../../pages/Offer/types'
import { formatPostalNumber } from '../postalNumbers'
import {
  useSelectedInsuranceTypes,
  InsuranceType,
} from './useSelectedInsuranceTypes'

export type Value = {
  value?: string | number
  textKey?: string
  prefix?: string
  suffix?: string
}

type Details = {
  label: string
  value: Value
}

type DetailsGroup = Details[]

const getHomeDetails = (mainQuote: BundledQuote) => {
  const { street, zipCode, livingSpace, squareMeters } = mainQuote.data
  const { typeOfContract } = mainQuote
  if ('floor' in mainQuote.data && 'apartment' in mainQuote.data) {
    const { floor, apartment } = mainQuote.data
    if (floor || apartment) {
      const formattedFloor = floor ? `${floor}.` : ''
      const apartmentString = apartment ? ` ${apartment}` : ''
      street === `${street}, ${formattedFloor}${apartmentString}`
    }
  }

  const baseDetails: DetailsGroup = [
    {
      label: 'CHECKOUT_DETAILS_ADDRESS',
      value: { value: street },
    },
    {
      label: 'CHECKOUT_DETAILS_ZIPCODE',
      value: {
        value: zipCode && formatPostalNumber(zipCode),
      },
    },
  ]

  const area = livingSpace || squareMeters
  if (area) {
    baseDetails.push({
      label: 'CHECKOUT_DETAILS_LIVING_SPACE',
      value: {
        value: area,
        suffix: 'CHECKOUT_DETAILS_SQM_SUFFIX',
      },
    })
  }

  const residenceTextKey =
    typeOfResidenceTextKeys[typeOfContract as HomeInsuranceTypeOfContract]
  if (residenceTextKey) {
    baseDetails.push({
      label: 'CHECKOUT_DETAILS_RESIDENCE_TYPE',
      value: { textKey: residenceTextKey },
    })
  }

  return [...baseDetails, ...getHouseDetails(mainQuote.data)]
}

const getHouseDetails = (data: GenericQuoteData) => {
  if (
    !data.ancillaryArea &&
    !data.numberOfBathrooms &&
    !data.yearOfConstruction &&
    !data.isSubleted
  ) {
    return []
  }

  const houseDetails = [
    {
      label: 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS',
      value: {
        value: data.numberOfBathrooms || data.numberOfWetUnits,
        suffix:
          data.numberOfBathrooms && data.numberOfBathrooms > 1
            ? 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS_SUFFIX_MANY'
            : 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS_SUFFIX_ONE',
      },
    },
    {
      label: 'CHECKOUT_DETAILS_YEAR_OF_CONSTRUCTION',
      value: { value: data.yearOfConstruction },
    },
    {
      label: 'CHECKOUT_DETAILS_IS_PARTLY_SUBLET',
      value: {
        textKey: data.isSubleted ? 'YES' : 'NO',
      },
    },
  ]

  if (data.ancillaryArea) {
    houseDetails.push({
      label: 'CHECKOUT_DETAILS_ANCILLARY_SPACE',
      value: {
        value: data.ancillaryArea,
        suffix: 'CHECKOUT_DETAILS_SQM_SUFFIX',
      },
    })
  } else if (data.yearOfOwnership) {
    houseDetails.push({
      label: 'CHECKOUT_DETAILS_YEAR_OF_OWNERSHIP',
      value: { value: data.yearOfOwnership },
    })
  }

  if (data.type === InsuranceType.NORWEGIAN_HOUSE) {
    houseDetails.push({
      label: 'CHECKOUT_DETAILS_WATER_LEAKAGE',
      value: {
        textKey: data.waterLeakageDetector ? 'YES' : 'NO',
      },
    })
  }

  return houseDetails
}

const getExtraBuildingsDetails = (quoteDetails: GenericQuoteData) => {
  if (!quoteDetails.extraBuildings) {
    return []
  }
  const extraBuildings = quoteDetails.extraBuildings.map(
    (extraBuilding: any) => [
      {
        label: 'CHECKOUT_DETAILS_EXTRA_BUILDINGS_BUILDING_TYPE',
        value: { value: extraBuilding.displayName },
      },
      {
        label: 'CHECKOUT_DETAILS_EXTRA_BUILDINGS_SIZE',
        value: {
          value: extraBuilding.area,
          suffix: 'CHECKOUT_DETAILS_SQM_SUFFIX',
        },
      },
      {
        label: 'CHECKOUT_DETAILS_EXTRA_BUILDINGS_HAS_WATER_CONNECTED',
        value: { textKey: extraBuilding.hasWaterConnected ? 'YES' : 'NO' },
      },
    ],
  )
  return extraBuildings
}

const getPeopleDetails = (quoteDetails: GenericQuoteData) => {
  const { numberCoInsured } = quoteDetails
  const householdSize = numberCoInsured + 1
  return [
    {
      label: 'CHECKOUT_DETAILS_HOUSEHOLD_SIZE',
      value: {
        value: householdSize,
        suffix:
          householdSize > 1
            ? 'CHECKOUT_DETAILS_NUMBER_OF_PEOPLE_SUFFIX_MANY'
            : 'CHECKOUT_DETAILS_NUMBER_OF_PEOPLE_SUFFIX_ONE',
      },
    },
    ...getStudent(quoteDetails),
  ]
}

const getStudent = (data: GenericQuoteData) => {
  if (data.isStudent) {
    return [{ label: '+', value: { textKey: 'CHECKOUT_DETAILS_STUDENT' } }]
  }

  return []
}

export const useQuoteCartData = () => {
  const { id: quoteCartId } = useParams<{ id: string }>()
  const { isoLocale } = useCurrentLocale()
  const { data, loading, error } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })

  const allQuotes = getAllQuotes(data)
  const bundleVariants = getPossibleVariations(data)
  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()

  const selectedQuoteBundleVariant = getSelectedBundleVariant(
    data,
    selectedInsuranceTypes,
  )

  if (!selectedQuoteBundleVariant) return { error, loading, data: null }

  const prices = selectedQuoteBundleVariant?.bundle.quotes.map((item) => {
    return { displayName: item.displayName, price: item.price.amount }
  })

  const mainQuote = getMainQuote(selectedQuoteBundleVariant.bundle)

  const priceData = {
    prices: prices,
    discount: getDiscountAmount(selectedQuoteBundleVariant.bundle),
    currency: getBundleCurrency(selectedQuoteBundleVariant.bundle),
    totalBundleCost: getTotalBundleCost(selectedQuoteBundleVariant.bundle),
    campaignName: getCampaign(data)?.displayValue,
    campaignCode: getCampaign(data)?.code,
    isDiscountMonthlyCostDeduction:
      getCampaign(data)?.incentive?.__typename === 'MonthlyCostDeduction',
  }
  const quoteDetails = mainQuote.data
  const quoteDetailsGroups: DetailsGroup[] = [
    getHomeDetails(mainQuote),
    ...getExtraBuildingsDetails(quoteDetails),
    getPeopleDetails(quoteDetails),
  ]

  return {
    loading,
    error,
    data: {
      quoteCartQuery: data,
      priceData,
      quoteDetails: quoteDetailsGroups,
      selectedQuoteBundleVariant,
      quoteCartId,
      allQuotes,
      bundleVariants,
      mainQuote,
      checkoutStatus: getCheckoutStatus(data),
    },
  }
}
