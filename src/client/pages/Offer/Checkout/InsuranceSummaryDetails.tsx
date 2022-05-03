import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  OfferPersonInfo,
  OfferQuote,
  GenericQuoteData,
} from 'pages/OfferNew/types'
import {
  formatNumber,
  formatCarRegistrationNumberSE,
  parseAddress,
} from 'pages/Offer/utils'
import {
  getFormattedBirthdate,
  typeOfResidenceTextKeys,
  HomeInsuranceTypeOfContract,
} from 'pages/OfferNew/utils'
import { formatPostalNumber } from 'utils/postalNumbers'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { TypeOfContract } from 'src/client/data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { LocaleLabel } from 'l10n/locales'
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
          currentLocale: currentLocale.path,
        }).map(({ key, label, value }) => (
          <Row key={key}>
            <Label>{label}</Label>
            <HorizontalSpacer />
            <Value>{value}</Value>
          </Row>
        ))}
      </Group>
      {getQuoteDetails(mainQuote, textKeys, currentLocale.path).map(
        (group, index) => (
          <Group key={index}>
            {group.map(({ key, value, label }) => (
              <Row key={key}>
                <Label>{label}</Label>
                <HorizontalSpacer />
                <Value>{value}</Value>
              </Row>
            ))}
          </Group>
        ),
      )}
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
            key: 'livingspace',
            label: textKeys.CHECKOUT_DETAILS_LIVING_SPACE(),
            value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
              VALUE: data.livingSpace,
            }),
          },
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
  return data.numberCoInsured
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

const getCarDataMaybe = (
  textKeys: TextKeyMap,
  data: GenericQuoteData,
  currentLocale: LocaleLabel,
) => {
  return data.registrationNumber && data.mileage
    ? [
        {
          key: 'registrationNumber',
          label: textKeys.CHECKOUT_DETAILS_REGISTRATION_NUMBER(),
          value: formatCarRegistrationNumberSE(data.registrationNumber),
        },
        {
          key: 'mileage',
          label: textKeys.CHECKOUT_DETAILS_MILEAGE(),
          value: textKeys.CHECKOUT_DETAILS_MILEAGE_VALUE({
            VALUE: formatNumber(data.mileage, currentLocale),
          }),
        },
      ]
    : null
}

const getQuoteDetails = (
  mainQuote: OfferQuote,
  textKeys: TextKeyMap,
  currentLocale: LocaleLabel,
): ReadonlyArray<DetailsGroup> => {
  const { data, contractType } = mainQuote

  const coInsured = getCoInsuredMaybe(textKeys, data)
  const carData = getCarDataMaybe(textKeys, data, currentLocale)

  const detailsGroups: DetailsGroup[] = [
    [
      ...getAddressDataMaybe(textKeys, data),
      ...getHomeInsuranceDetailsMaybe(textKeys, data, contractType),
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
