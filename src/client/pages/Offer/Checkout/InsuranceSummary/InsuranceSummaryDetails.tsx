import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { OfferPersonInfo, GenericQuoteData } from 'pages/Offer/types'
import {
  formatCarRegistrationNumberSE,
  parseAddress,
  typeOfResidenceTextKeys,
  getFormattedBirthdate,
  HomeInsuranceTypeOfContract,
} from 'pages/Offer/utils'
import { formatPostalNumber } from 'utils/postalNumbers'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { TypeOfContract, BundledQuote } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

import { Group, Row } from './InsuranceSummary'

const Label = styled.div`
  color: ${colorsV3.gray500};
`
const Value = styled.div`
  color: ${colorsV3.gray700};
  text-align: right;
`
const HorizontalSpacer = styled.div`
  width: 48px;
`

type Props = {
  personalDetails: OfferPersonInfo
  mainQuote: BundledQuote
}

export const InsuranceSummaryDetails: React.FC<Props> = ({
  personalDetails,
  mainQuote,
}) => {
  const textKeys = useTextKeys()

  const { data } = mainQuote

  const currentLocale = useCurrentLocale()

  const studentOrYouthLabel = getStudentOrYouthLabel(data, textKeys)

  return (
    <>
      <Group>
        {getPersonalDetails({
          person: personalDetails,
          textKeys,
          currentLocale: currentLocale.path,
        }).map(({ key, label, value }) => (
          <Row key={key}>
            <Label>{label}</Label>
            <HorizontalSpacer />
            <Value>{value}</Value>
          </Row>
        ))}
      </Group>
      {getQuoteDetails(mainQuote, textKeys).map((group, index) => (
        <Group key={index}>
          {group.map(({ key, value, label }) => (
            <Row key={key}>
              <Label>{label}</Label>
              <HorizontalSpacer />
              <Value>{value}</Value>
            </Row>
          ))}
        </Group>
      ))}
      {studentOrYouthLabel && (
        <Group>
          <Row>
            <Label>+</Label>
            <Value>{studentOrYouthLabel}</Value>
          </Row>
        </Group>
      )}
    </>
  )
}

type DetailsGroup = ReadonlyArray<{
  key: string
  label: React.ReactNode
  value: React.ReactNode
}>

const getHouseSummaryDetailsMaybe = (
  textKeys: TextKeyMap,
  data: GenericQuoteData,
): DetailsGroup => {
  return [
    ...(data.ancillaryArea !== undefined
      ? [
          {
            key: 'ancillaryarea',
            label: textKeys.CHECKOUT_DETAILS_ANCILLARY_SPACE(),
            value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
              VALUE: data.ancillaryArea,
            }),
          },
        ]
      : []),
    ...(data.numberOfBathrooms !== undefined
      ? [
          {
            key: 'bathrooms',
            label: textKeys.CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS(),
            value: textKeys.CHECKOUT_DETAILS_COUNT_VALUE({
              VALUE: data.numberOfBathrooms,
            }),
          },
        ]
      : data.numberOfWetUnits !== undefined
      ? [
          {
            key: 'bathrooms',
            label: textKeys.CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS(),
            value: textKeys.CHECKOUT_DETAILS_COUNT_VALUE({
              VALUE: data.numberOfWetUnits,
            }),
          },
        ]
      : []),
    ...(data.yearOfConstruction !== undefined
      ? [
          {
            key: 'yearOfConstruction',
            label: textKeys.CHECKOUT_DETAILS_YEAR_OF_CONSTRUCTION(),
            value: data.yearOfConstruction,
          },
        ]
      : []),
  ]
}

const getLivingSpaceMaybe = (textKeys: TextKeyMap, data: GenericQuoteData) => {
  return [
    ...(data.livingSpace !== undefined
      ? [
          {
            key: 'livingspace',
            label: textKeys.CHECKOUT_DETAILS_LIVING_SPACE(),
            value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
              VALUE: data.livingSpace,
            }),
          },
        ]
      : []),
    ...(data.squareMeters !== undefined
      ? [
          {
            key: 'livingspace',
            label: textKeys.CHECKOUT_DETAILS_LIVING_SPACE(),
            value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
              VALUE: data.squareMeters,
            }),
          },
        ]
      : []),
  ]
}

const getHouseExtraBuildingsMaybe = (
  textKeys: TextKeyMap,
  data: GenericQuoteData,
): ReadonlyArray<DetailsGroup> => {
  if (!data.extraBuildings) {
    return []
  }

  return data.extraBuildings.map<DetailsGroup>((extraBuilding) => [
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

const getHomeInsuranceDetailsMaybe = (
  textKeys: TextKeyMap,
  data: GenericQuoteData,
  contractType: TypeOfContract,
): DetailsGroup => {
  const typeOfResidenceTextKey =
    typeOfResidenceTextKeys[contractType as HomeInsuranceTypeOfContract]

  return [
    ...(data.livingSpace
      ? [
          {
            key: 'residenceType',
            label: textKeys.CHECKOUT_DETAILS_RESIDENCE_TYPE(),
            value: typeOfResidenceTextKey
              ? textKeys[typeOfResidenceTextKey]()
              : '',
          },
        ]
      : []),
  ]
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

const getCoInsuredMaybe = (
  textKeys: TextKeyMap,
  data: GenericQuoteData,
): DetailsGroup | null => {
  return typeof data.numberCoInsured === 'number'
    ? [
        {
          key: 'householdSize',
          label: textKeys.CHECKOUT_DETAILS_HOUSEHOLD_SIZE(),
          value: getHouseholdSizeValue(data.numberCoInsured + 1, textKeys),
        },
      ]
    : null
}

const getAddressDataMaybe = (textKeys: TextKeyMap, data: GenericQuoteData) => {
  const arr = []

  if (data.street && data.zipCode) {
    arr.push({
      key: 'address',
      label: textKeys.CHECKOUT_DETAILS_ADDRESS(),
      value: parseAddress({
        street: data.street,
        zipCode: data.zipCode,
        apartment: data.apartment,
        floor: data.floor,
      }),
    })
  }

  if (data.zipCode) {
    arr.push({
      key: 'zipcode',
      label: textKeys.CHECKOUT_DETAILS_ZIPCODE(),
      value: formatPostalNumber(data.zipCode),
    })
  }
  return arr
}

const getCarDataMaybe = (textKeys: TextKeyMap, data: GenericQuoteData) => {
  if (!(data.registrationNumber && data.mileage)) return null

  const mileageTextKey = `DETAILS_MODULE_TABLE_ANNUAL_MILEAGE_OPTION_${
    data.mileage === 2501 ? '25000_PLUS' : data.mileage * 10
  }`

  return [
    {
      key: 'registrationNumber',
      label: textKeys.CHECKOUT_DETAILS_REGISTRATION_NUMBER(),
      value: formatCarRegistrationNumberSE(data.registrationNumber),
    },
    {
      key: 'mileage',
      label: textKeys.CHECKOUT_DETAILS_MILEAGE(),
      value: textKeys[mileageTextKey](),
    },
  ]
}

const getQuoteDetails = (
  mainQuote: BundledQuote,
  textKeys: TextKeyMap,
): ReadonlyArray<DetailsGroup> => {
  const { data, typeOfContract } = mainQuote

  const coInsured = getCoInsuredMaybe(textKeys, data)
  const carData = getCarDataMaybe(textKeys, data)

  const detailsGroups: DetailsGroup[] = [
    [
      ...getAddressDataMaybe(textKeys, data),
      ...getLivingSpaceMaybe(textKeys, data),
      ...getHomeInsuranceDetailsMaybe(textKeys, data, typeOfContract),
      ...getHouseSummaryDetailsMaybe(textKeys, data),
    ],

    ...getHouseExtraBuildingsMaybe(textKeys, data),
  ]

  if (coInsured) detailsGroups.push(coInsured)
  if (carData) detailsGroups.push(carData)

  return detailsGroups
}

type GetPersonalDetailsParams = {
  person: OfferPersonInfo
  textKeys: TextKeyMap
  currentLocale: string
}

const getPersonalDetails = ({
  person,
  textKeys,
  currentLocale,
}: GetPersonalDetailsParams): DetailsGroup => {
  return [
    {
      key: 'birthDate',
      label: textKeys.CHECKOUT_DETAILS_BIRTHDATE(),
      value: getFormattedBirthdate({
        birthDate: person.birthDate,
        currentLocale,
      }),
    },
  ]
}

const getStudentOrYouthLabel = (
  data: GenericQuoteData,
  textKeys: TextKeyMap,
) => {
  if (isStudent(data)) {
    return textKeys.CHECKOUT_DETAILS_STUDENT()
  }

  return data.isYouth ? textKeys.CHECKOUT_DETAILS_YOUTH() : null
}

const isStudent = (data: GenericQuoteData) => {
  return data.isStudent ?? false
}
