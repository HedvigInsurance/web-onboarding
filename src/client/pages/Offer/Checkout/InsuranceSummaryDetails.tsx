import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  OfferPersonInfo,
  OfferQuote,
  GenericQuoteData,
} from 'pages/OfferNew/types'
import { parseAddress } from 'pages/Offer/utils'
import {
  getFormattedBirthdate,
  typeOfResidenceTextKeys,
  HomeInsuranceTypeOfContract,
} from 'pages/OfferNew/utils'
import { formatPostalNumber } from 'utils/postalNumbers'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
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
  mainQuote: OfferQuote
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
          currentLocale,
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

function getHouseSummaryDetailsMaybe(
  textKeys: TextKeyMap,
  data: GenericQuoteData,
): DetailsGroup {
  if (data.type !== InsuranceType.SWEDISH_HOUSE) {
    return []
  }

  return [
    {
      key: 'ancillaryarea',
      label: textKeys.CHECKOUT_DETAILS_ANCILLARY_SPACE(),
      value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
        VALUE: data.ancillaryArea as number,
      }),
    },
    {
      key: 'bathrooms',
      label: textKeys.CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS(),
      value: textKeys.CHECKOUT_DETAILS_COUNT_VALUE({
        VALUE: data.numberOfBathrooms as number,
      }),
    },
    {
      key: 'yearOfConstruction',
      label: textKeys.CHECKOUT_DETAILS_YEAR_OF_CONSTRUCTION(),
      value: data.yearOfConstruction,
    },
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

const getQuoteDetails = (
  mainQuote: OfferQuote,
  textKeys: TextKeyMap,
): ReadonlyArray<DetailsGroup> => {
  const { data, contractType } = mainQuote

  const typeOfResidenceTextKey =
    typeOfResidenceTextKeys[contractType as HomeInsuranceTypeOfContract]

  const detailsGroups: DetailsGroup[] = []

  const homeData = getHomeData(data)
  if (homeData) {
    detailsGroups.push(
      [
        {
          key: 'address',
          label: textKeys.CHECKOUT_DETAILS_ADDRESS(),
          value: parseAddress({
            street: homeData.street,
            zipCode: homeData.zipCode,
            apartment: data.apartment,
            floor: data.floor?.toString(),
          }),
        },
        {
          key: 'zipcode',
          label: textKeys.CHECKOUT_DETAILS_ZIPCODE(),
          value: formatPostalNumber(homeData.zipCode),
        },
        {
          key: 'livingspace',
          label: textKeys.CHECKOUT_DETAILS_LIVING_SPACE(),
          value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
            VALUE: homeData.livingSpace,
          }),
        },
        {
          key: 'residenceType',
          label: textKeys.CHECKOUT_DETAILS_RESIDENCE_TYPE(),
          value: typeOfResidenceTextKey
            ? textKeys[typeOfResidenceTextKey]()
            : '',
        },
        ...getHouseSummaryDetailsMaybe(textKeys, data),
      ],

      ...getHouseExtraBuildingsMaybe(textKeys, data),
    )
  }

  detailsGroups.push([
    {
      key: 'householdSize',
      label: textKeys.CHECKOUT_DETAILS_HOUSEHOLD_SIZE(),
      value: getHouseholdSizeValue(data.numberCoInsured + 1, textKeys),
    },
  ])

  return detailsGroups
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

const getHomeData = (data: GenericQuoteData) => {
  if (data.street && data.zipCode && data.livingSpace) {
    return {
      street: data.street,
      zipCode: data.zipCode,
      livingSpace: data.livingSpace,
    }
  }

  return null
}
