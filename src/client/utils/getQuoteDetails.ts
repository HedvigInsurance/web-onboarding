import { QuoteDetails, HomeQuoteDetails } from 'api/quoteDetailsDataTypes'
import {
  getMainQuoteDetailsData,
  isHouseQuoteDetailsData,
  isHomeQuoteDetailsData,
  MultipleQuotesDetailsData,
} from 'api/quoteDetailsDataSelectors'
import {
  typeOfResidenceTextKeys,
  HomeInsuranceTypeOfContract,
} from 'pages/OfferNew/utils'
import { formatPostalNumber } from './postalNumbers'

export type QuoteProps = {
  groups: DetailsGroup[]
}

export type Value = {
  value?: string | number
  textKey?: string
  prefix?: string
  suffix?: string
}

export type Details = {
  label: string
  value: Value
}

export type DetailsGroup = Details[]

type SingleQuoteDetailsParams = {
  quoteDetailsData: QuoteDetails
}

export const getAddressValue = (quoteDetails: HomeQuoteDetails) => {
  const { street } = quoteDetails

  if ('floor' in quoteDetails && 'apartment' in quoteDetails) {
    const { floor, apartment } = quoteDetails

    if (floor || apartment) {
      const formattedFloor = floor ? `${floor}.` : ''
      const apartmentString = apartment ? ` ${apartment}` : ''
      return `${street}, ${formattedFloor}${apartmentString}`
    }
  }

  return street
}

const getHouseDetails = ({
  quoteDetailsData,
}: SingleQuoteDetailsParams): DetailsGroup => {
  if (!isHouseQuoteDetailsData(quoteDetailsData)) {
    return []
  }

  return [
    {
      label: 'CHECKOUT_DETAILS_ANCILLARY_SPACE',
      value: {
        value: quoteDetailsData.ancillaryArea,
        suffix: 'CHECKOUT_DETAILS_SQM_SUFFIX',
      },
    },
    {
      label: 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS',
      value: {
        value: quoteDetailsData.numberOfBathrooms,
        suffix:
          quoteDetailsData.numberOfBathrooms > 1
            ? 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS_SUFFIX_MANY'
            : 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS_SUFFIX_ONE',
      },
    },
    {
      label: 'CHECKOUT_DETAILS_YEAR_OF_CONSTRUCTION',
      value: { value: quoteDetailsData.yearOfConstruction },
    },
    {
      label: 'CHECKOUT_DETAILS_IS_PARTLY_SUBLET',
      value: {
        textKey: quoteDetailsData.isSubleted ? 'YES' : 'NO',
      },
    },
  ]
}

const getHomeDetails = ({
  quoteDetailsData,
}: SingleQuoteDetailsParams): DetailsGroup => {
  if (!isHomeQuoteDetailsData(quoteDetailsData)) {
    return []
  }

  const { typeOfContract } = quoteDetailsData

  return [
    {
      label: 'CHECKOUT_DETAILS_ADDRESS',
      value: { value: getAddressValue(quoteDetailsData) },
    },
    {
      label: 'CHECKOUT_DETAILS_ZIPCODE',
      value: { value: formatPostalNumber(quoteDetailsData.zipCode) },
    },
    {
      label: 'CHECKOUT_DETAILS_LIVING_SPACE',
      value: {
        value: quoteDetailsData.livingSpace,
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
    ...getHouseDetails({ quoteDetailsData }),
  ]
}

const getExtraBuildingsDetails = ({
  quoteDetailsData,
}: SingleQuoteDetailsParams): DetailsGroup[] => {
  if (
    !isHouseQuoteDetailsData(quoteDetailsData) ||
    !quoteDetailsData.extraBuildings
  ) {
    return []
  }

  const extraBuildings = quoteDetailsData.extraBuildings.map<DetailsGroup>(
    (extraBuilding) => [
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

const getStudentOrYouth = (quoteDetails: QuoteDetails): DetailsGroup => {
  if ('isStudent' in quoteDetails && quoteDetails.isStudent) {
    return [{ label: '+', value: { textKey: 'CHECKOUT_DETAILS_STUDENT' } }]
  }

  if ('isYouth' in quoteDetails && quoteDetails.isYouth) {
    return [{ label: '+', value: { textKey: 'CHECKOUT_DETAILS_YOUTH' } }]
  }

  return []
}

const getPeopleDetails = ({
  quoteDetailsData,
}: SingleQuoteDetailsParams): DetailsGroup => {
  const { numberCoInsured } = quoteDetailsData
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
    ...getStudentOrYouth(quoteDetailsData),
  ]
}

export const getQuoteDetails = ({
  quoteDetailsData,
}: MultipleQuotesDetailsData): DetailsGroup[] => {
  const mainQuoteDetailsData = getMainQuoteDetailsData({
    quoteDetailsData,
  })

  const homeDetailsGroup: DetailsGroup = getHomeDetails({
    quoteDetailsData: mainQuoteDetailsData,
  })

  const extraBuildingsGroups = getExtraBuildingsDetails({
    quoteDetailsData: mainQuoteDetailsData,
  })

  const peopleDetailsGroup = getPeopleDetails({
    quoteDetailsData: mainQuoteDetailsData,
  })

  const quoteDetailsGroups = [
    homeDetailsGroup,
    ...extraBuildingsGroups,
    peopleDetailsGroup,
  ]

  return quoteDetailsGroups
}
