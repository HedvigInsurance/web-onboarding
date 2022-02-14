import React from 'react'
import { QuoteDetails } from '../data/graphql'
import { OfferQuote } from '../pages/OfferNew/types'
import {
  typeOfResidenceTextKeys,
  quoteDetailsHasAddress,
  getHouseholdSize,
  HomeInsuranceTypeOfContract,
} from '../pages/OfferNew/utils'
import { TextKeyMap } from './textKeys'
import { formatPostalNumber } from './postalNumbers'

type DetailsGroup = ReadonlyArray<{
  key: string
  label: React.ReactNode
  value: React.ReactNode
}>

function getHouseSummaryDetailsMaybe(
  textKeys: TextKeyMap,
  quoteDetails: QuoteDetails,
): DetailsGroup {
  if (quoteDetails.__typename !== 'SwedishHouseQuoteDetails') {
    return []
  }

  return [
    {
      key: 'ancillaryarea',
      label: textKeys.CHECKOUT_DETAILS_ANCILLARY_SPACE(),
      value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
        VALUE: quoteDetails.ancillarySpace,
      }),
    },
    {
      key: 'bathrooms',
      label: textKeys.CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS(),
      value: textKeys.CHECKOUT_DETAILS_COUNT_VALUE({
        VALUE: quoteDetails.numberOfBathrooms,
      }),
    },
    {
      key: 'yearOfConstruction',
      label: textKeys.CHECKOUT_DETAILS_YEAR_OF_CONSTRUCTION(),
      value: quoteDetails.yearOfConstruction,
    },
  ]
}

const getHouseExtraBuildingsMaybe = (
  textKeys: TextKeyMap,
  quoteDetails: QuoteDetails,
): ReadonlyArray<DetailsGroup> => {
  if (quoteDetails.__typename !== 'SwedishHouseQuoteDetails') {
    return []
  }

  return quoteDetails.extraBuildings.map<DetailsGroup>((extraBuilding) => [
    {
      key: 'buildingType',
      label: textKeys.CHECKOUT_DETAILS_EXTRA_BUILDINGS_BUILDING_TYPE(),
      value: extraBuilding.displayName,
    },
    {
      key: 'buildingSize',
      label: textKeys.CHECKOUT_DETAILS_EXTRA_BUILDINGS_SIZE(),
      value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
        VALUE: extraBuilding.area ?? '',
      }),
    },
    {
      key: 'hasWater',
      label: textKeys.CHECKOUT_DETAILS_EXTRA_BUILDINGS_HAS_WATER_CONNECTED(),
      value: extraBuilding.hasWaterConnected ? textKeys.YES() : textKeys.NO(),
    },
  ])
}

export const getQuoteDetails = (
  mainQuote: OfferQuote,
  textKeys: TextKeyMap,
): ReadonlyArray<DetailsGroup> => {
  const { quoteDetails, contractType } = mainQuote

  const typeOfResidenceTextKey =
    typeOfResidenceTextKeys[contractType as HomeInsuranceTypeOfContract]

  const detailsGroups: DetailsGroup[] = []

  if (quoteDetailsHasAddress(quoteDetails)) {
    detailsGroups.push(
      [
        {
          key: 'address',
          label: textKeys.CHECKOUT_DETAILS_ADDRESS(),
          value: getAddress(quoteDetails),
        },
        {
          key: 'zipcode',
          label: textKeys.CHECKOUT_DETAILS_ZIPCODE(),
          value: formatPostalNumber(quoteDetails.zipCode),
        },
        {
          key: 'livingspace',
          label: textKeys.CHECKOUT_DETAILS_LIVING_SPACE(),
          value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
            VALUE: quoteDetails.livingSpace,
          }),
        },
        {
          key: 'residenceType',
          label: textKeys.CHECKOUT_DETAILS_RESIDENCE_TYPE(),
          value: typeOfResidenceTextKey
            ? textKeys[typeOfResidenceTextKey]()
            : '',
        },
        ...getHouseSummaryDetailsMaybe(textKeys, quoteDetails),
      ],

      ...getHouseExtraBuildingsMaybe(textKeys, quoteDetails),
    )
  }

  detailsGroups.push([
    {
      key: 'householdSize',
      label: textKeys.CHECKOUT_DETAILS_HOUSEHOLD_SIZE(),
      value: getHouseholdSizeValue(getHouseholdSize(quoteDetails), textKeys),
    },
  ])

  return detailsGroups
}

export const getAddress = (quoteDetails: QuoteDetails) => {
  if (!quoteDetailsHasAddress(quoteDetails)) {
    throw new Error('Quote details need to include address field')
  }

  const { street } = quoteDetails

  if ('floor' in quoteDetails && 'apartment' in quoteDetails) {
    const { floor, apartment } = quoteDetails

    if (floor || apartment) {
      const formattedFloor = floor ? `${floor}.` : ''
      const apartmentString = apartment ? ` ${apartment}` : ''
      return `${street}, ${formattedFloor}${apartmentString}`
    }

    return street
  }

  return street
}

const getHouseholdSizeValue = (householdSize: number, textKeys: TextKeyMap) => {
  if (householdSize === 1) {
    return textKeys.CHECKOUT_DETAILS_SINGLE_PERSON()
  }
  if (householdSize > 1) {
    return textKeys.CHECKOUT_DETAILS_PERSONS_VALUE({
      VALUE: householdSize,
    })
  }
  throw new Error(
    'Total number of people covered by the insurance must be at least 1',
  )
}
