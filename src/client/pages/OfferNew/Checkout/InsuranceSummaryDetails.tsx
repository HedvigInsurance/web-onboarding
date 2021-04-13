import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { QuoteDetails } from 'data/graphql'
import { OfferPersonInfo, OfferQuote } from 'pages/OfferNew/types'
import {
  getHouseholdSize,
  insuranceTypeTextKeys,
  isStudent,
  quoteDetailsHasAddress,
} from 'pages/OfferNew/utils'
import { formatPostalNumber } from 'utils/postalNumbers'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'
import { Group, Row } from './InsuranceSummary'

const Label = styled.div`
  width: 50%;
  color: ${colorsV3.gray500};
`
const Value = styled.div`
  width: 50%;
  color: ${colorsV3.gray700};
  text-align: right;
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

  const { quoteDetails } = mainQuote

  const studentOrYouthLabel = getStudentOrYouthLabel(quoteDetails, textKeys)

  return (
    <>
      <Group>
        {getPersonalDetails(personalDetails, textKeys).map(
          ({ key, label, value }) => (
            <Row key={key}>
              <Label>{label}</Label>
              <Value>{value}</Value>
            </Row>
          ),
        )}
      </Group>
      {getQuoteDetails(mainQuote, textKeys).map((group, index) => (
        <Group key={index}>
          {group.map(({ key, value, label }) => (
            <Row key={key}>
              <Label>{label}</Label>
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
        VALUE: extraBuilding.area ?? 'blah',
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
  const { quoteDetails, contractType } = mainQuote

  const typeOfResidenceTextKey =
    insuranceTypeTextKeys[contractType].typeOfResidence

  const detailsGroups: DetailsGroup[] = []

  if (quoteDetailsHasAddress(quoteDetails)) {
    detailsGroups.push(
      [
        {
          key: 'address',
          label: textKeys.CHECKOUT_DETAILS_ADDRESS(),
          value: quoteDetails.street,
        },
        {
          key: 'zipcode',
          label: textKeys.CHECKOUT_DETAILS_ZIPCODE(),
          value: formatPostalNumber(quoteDetails.zipCode),
        },
        {
          key: 'residence-type',
          label: textKeys.CHECKOUT_DETAILS_RESIDENCE_TYPE(),
          value: typeOfResidenceTextKey
            ? textKeys[typeOfResidenceTextKey]()
            : '',
        },
        {
          key: 'livingspace',
          label: textKeys.CHECKOUT_DETAILS_LIVING_SPACE(),
          value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
            VALUE: quoteDetails.livingSpace,
          }),
        },
        ...getHouseSummaryDetailsMaybe(textKeys, quoteDetails),
      ],

      ...getHouseExtraBuildingsMaybe(textKeys, quoteDetails),
    )
  }

  detailsGroups.push([
    {
      key: 'antal-personer',
      label: textKeys.CHECKOUT_DETAILS_HOUSEHOLD_SIZE(),
      value: getHouseHoldSizeValue(getHouseholdSize(quoteDetails), textKeys),
    },
  ])

  return detailsGroups
}

const getHouseHoldSizeValue = (householdSize: number, textKeys: TextKeyMap) => {
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

const getPersonalDetails = (
  person: OfferPersonInfo,
  textKeys: TextKeyMap,
): DetailsGroup => {
  return [
    {
      key: 'name',
      label: textKeys.CHECKOUT_DETAILS_NAME(),
      value: `${person.firstName} ${person.lastName}`,
    },
    {
      key: 'birthDate',
      label: textKeys.CHECKOUT_DETAILS_BIRTHDATE(),
      value: person.birthDate,
    },
  ]
}

const getStudentOrYouthLabel = (
  quoteDetails: QuoteDetails,
  textKeys: TextKeyMap,
) => {
  if (isStudent(quoteDetails)) {
    return textKeys.CHECKOUT_DETAILS_STUDENT()
  }

  if ('isYouth' in quoteDetails && quoteDetails.isYouth) {
    return textKeys.CHECKOUT_DETAILS_YOUTH()
  }

  return null
}
