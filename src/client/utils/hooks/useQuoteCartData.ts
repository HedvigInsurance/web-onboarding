import { useParams } from 'react-router-dom'
import { useQuoteCartQuery } from 'data/graphql'
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
} from 'api/quoteCartQuerySelectors'
import {
  typeOfResidenceTextKeys,
  HomeInsuranceTypeOfContract,
} from 'pages/OfferNew/utils'
import { GenericQuoteData } from '/pages/OfferNew/types'
import { formatPostalNumber } from '../postalNumbers'
import { useSelectedInsuranceTypes } from './useSelectedInsuranceTypes'

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

const getHomeDetails = (quoteDetails: GenericQuoteData) => {
  const { typeOfContract } = quoteDetails

  const { street } = quoteDetails

  if ('floor' in quoteDetails && 'apartment' in quoteDetails) {
    const { floor, apartment } = quoteDetails

    if (floor || apartment) {
      const formattedFloor = floor ? `${floor}.` : ''
      const apartmentString = apartment ? ` ${apartment}` : ''
      street === `${street}, ${formattedFloor}${apartmentString}`
    }
  }
  return [
    {
      label: 'CHECKOUT_DETAILS_ADDRESS',
      value: { value: street },
    },
    {
      label: 'CHECKOUT_DETAILS_ZIPCODE',
      value: {
        value: quoteDetails.zipCode && formatPostalNumber(quoteDetails.zipCode),
      },
    },
    {
      label: 'CHECKOUT_DETAILS_LIVING_SPACE',
      value: {
        value: quoteDetails.livingSpace,
        suffix: 'CHECKOUT_DETAILS_SQM_SUFFIX',
      },
    },
    {
      label: 'CHECKOUT_DETAILS_RESIDENCE_TYPE',
      value: {
        textKey:
          typeOfResidenceTextKeys[
            typeOfContract as HomeInsuranceTypeOfContract
          ],
      },
    },

    ...getHouseDetails(quoteDetails),
  ]
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
  return [
    {
      label: 'CHECKOUT_DETAILS_ANCILLARY_SPACE',
      value: {
        value: data.ancillaryArea,
        suffix: 'CHECKOUT_DETAILS_SQM_SUFFIX',
      },
    },
    {
      label: 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS',
      value: {
        value: data.numberOfBathrooms,
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
          suffix: 'CHECKOUT_DETAILS_SQM_VALUE',
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
    ...getStudentOrYouth(quoteDetails),
  ]
}

const getStudentOrYouth = (data: GenericQuoteData) => {
  if (data.isStudent) {
    return [{ label: '+', value: { textKey: 'CHECKOUT_DETAILS_STUDENT' } }]
  }
  if (data.isYouth) {
    return [{ label: '+', value: { textKey: 'CHECKOUT_DETAILS_YOUTH' } }]
  }

  return []
}

export const useQuoteCartData = () => {
  const { id: quoteCartId } = useParams<{ id: string }>()
  const { isoLocale } = useCurrentLocale()
  const { data, loading, error } = useQuoteCartQuery({
    variables: { id: quoteCartId, locale: isoLocale },
  })

  const [selectedInsuranceTypes] = useSelectedInsuranceTypes()
  const selectedQuoteBundle = getSelectedBundleVariant(
    data,
    selectedInsuranceTypes,
  )
  if (!selectedQuoteBundle) return null

  const prices = selectedQuoteBundle?.bundle.quotes.map((item) => {
    return { displayName: item.displayName, price: item.price.amount }
  })

  const mainQuote = getMainQuote(selectedQuoteBundle.bundle)

  const priceData = {
    prices: prices,
    discount: getDiscountAmount(selectedQuoteBundle.bundle),
    currency: getBundleCurrency(selectedQuoteBundle.bundle),
    totalBundleCost: getTotalBundleCost(selectedQuoteBundle.bundle),
    campaignName: getCampaign(data)?.displayValue,
  }
  const quoteDetails = mainQuote.data

  const quoteDetailsGroups: DetailsGroup[] = [
    getHomeDetails(quoteDetails),
    ...getExtraBuildingsDetails(quoteDetails),
    getPeopleDetails(quoteDetails),
  ]

  const userDetails = {
    firstName: mainQuote.firstName,
    lastName: mainQuote.lastName,
    email: mainQuote.email,
    ssn: mainQuote.ssn,
  }

  return {
    priceData: priceData,
    quoteDetails: quoteDetailsGroups,
    userDetails: userDetails,
    loading,
    error,
  }
}
