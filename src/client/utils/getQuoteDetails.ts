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

type DetailsGroup = {
  label: string
  value: Value
}[]

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

const getHouseDetailsGroup = ({
  quoteDetailsData,
}: SingleQuoteDetailsParams): DetailsGroup | null => {
  if (!isHouseQuoteDetailsData(quoteDetailsData)) {
    return null
  }

  return [
    {
      label: 'CHECKOUT_DETAILS_ANCILLARY_SPACE',
      value: {
        value: quoteDetailsData.ancillaryArea,
        suffix: 'CHECKOUT_DETAILS_SQM_VALUE',
      },
    },
    {
      label: 'CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS',
      value: {
        value: quoteDetailsData.numberOfBathrooms,
      },
    },
    {
      label: 'CHECKOUT_DETAILS_YEAR_OF_CONSTRUCTION',
      value: { value: quoteDetailsData.yearOfConstruction },
    },
  ]
}

const getExtraBuildingsGroups = ({
  quoteDetailsData,
}: SingleQuoteDetailsParams): DetailsGroup[] | null => {
  if (
    !isHouseQuoteDetailsData(quoteDetailsData) ||
    !quoteDetailsData.extraBuildings
  ) {
    return null
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
        value: { value: extraBuilding.hasWaterConnected ? 'YES' : 'NO' },
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

  const commonHomeDetailsGroup: DetailsGroup | null = isHomeQuoteDetailsData(
    mainQuoteDetailsData,
  )
    ? [
        {
          label: 'CHECKOUT_DETAILS_ADDRESS',
          value: { value: getAddress(mainQuoteDetailsData) },
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
      ]
    : null

  const houseDetailsGroup = getHouseDetailsGroup({
    quoteDetailsData: mainQuoteDetailsData,
  })

  const extraBuildingsGroups =
    getExtraBuildingsGroups({
      quoteDetailsData: mainQuoteDetailsData,
    }) || []

  const numberOfInsuredGroup = [
    {
      label: 'CHECKOUT_DETAILS_HOUSEHOLD_SIZE',
      value: {
        value: numberCoInsured,
        prefix: 'CHECKOUT_DETAILS_NUMBER_OF_PEOPLE_SUFFIX',
      },
    },
  ]

  const allGroups = [
    commonHomeDetailsGroup,
    houseDetailsGroup,
    ...extraBuildingsGroups,
    numberOfInsuredGroup,
  ]

  const quoteDetailsGroups = allGroups.filter(
    (group): group is DetailsGroup => group !== null,
  )

  return quoteDetailsGroups
}

export const getAddress = (quoteDetails: HomeQuoteDetails) => {
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
