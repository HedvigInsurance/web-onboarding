import {
  QuoteDetails,
  HomeQuoteDetails,
  HouseQuoteDetails,
  QuoteDetailsData,
} from 'api/quoteDetailsDataTypes'
import {
  typeOfResidenceTextKeys,
  HomeInsuranceTypeOfContract,
} from 'pages/OfferNew/utils'
import { formatPostalNumber } from './postalNumbers'

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

export type DetailsGroup = Details[]

type MultipleQuoteDetailsParams = {
  quoteDetailsData: QuoteDetailsData
}
type SingleQuoteDetailsParams = {
  quoteDetailsData: QuoteDetails
}

const isHomeQuoteDetailsData = (
  data: QuoteDetails,
): data is HomeQuoteDetails => {
  const isHome = 'street' in data && 'zipCode' in data && 'livingSpace' in data
  return isHome
}

const isHouseQuoteDetailsData = (
  data: QuoteDetails,
): data is HouseQuoteDetails => {
  const isHouse =
    'ancillaryArea' in data &&
    'yearOfConstruction' in data &&
    'numberOfBathrooms' in data &&
    'isSubleted' in data &&
    'extraBuildings' in data
  return isHouse
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

const getExtraBuildingsGroups = ({
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

const getMainQuoteDetailsData = ({
  quoteDetailsData,
}: MultipleQuoteDetailsParams): QuoteDetails => {
  const homeQuoteDetailsData = quoteDetailsData.find((data) => {
    return isHomeQuoteDetailsData(data)
  })

  return homeQuoteDetailsData ? homeQuoteDetailsData : quoteDetailsData[0]
}

export const getQuoteDetails = ({
  quoteDetailsData,
}: MultipleQuoteDetailsParams): DetailsGroup[] => {
  const mainQuoteDetailsData = getMainQuoteDetailsData({
    quoteDetailsData,
  })

  const { typeOfContract, numberCoInsured } = mainQuoteDetailsData

  const homeDetailsGroup: DetailsGroup | null = isHomeQuoteDetailsData(
    mainQuoteDetailsData,
  )
    ? [
        {
          label: 'CHECKOUT_DETAILS_ADDRESS',
          value: { value: getAddressValue(mainQuoteDetailsData) },
        },
        {
          label: 'CHECKOUT_DETAILS_ZIPCODE',
          value: { value: formatPostalNumber(mainQuoteDetailsData.zipCode) },
        },
        {
          label: 'CHECKOUT_DETAILS_LIVING_SPACE',
          value: {
            value: mainQuoteDetailsData.livingSpace,
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
        ...getHouseDetails({ quoteDetailsData: mainQuoteDetailsData }),
      ]
    : null

  const extraBuildingsGroups = getExtraBuildingsGroups({
    quoteDetailsData: mainQuoteDetailsData,
  })

  const householdSize = numberCoInsured + 1

  const commonQuoteDetailsGroup = [
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
    ...getStudentOrYouth(mainQuoteDetailsData),
  ]

  const allGroups = [
    homeDetailsGroup,
    ...extraBuildingsGroups,
    commonQuoteDetailsGroup,
  ]

  const quoteDetailsGroups = allGroups.filter(
    (group): group is DetailsGroup => group !== null,
  )

  return quoteDetailsGroups
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

const getStudentOrYouth = (quoteDetails: QuoteDetails): DetailsGroup => {
  if ('isStudent' in quoteDetails && quoteDetails.isStudent) {
    return [{ label: '+', value: { textKey: 'CHECKOUT_DETAILS_STUDENT' } }]
  }

  if ('isYouth' in quoteDetails && quoteDetails.isYouth) {
    return [{ label: '+', value: { textKey: 'CHECKOUT_DETAILS_YOUTH' } }]
  }

  return []
}
