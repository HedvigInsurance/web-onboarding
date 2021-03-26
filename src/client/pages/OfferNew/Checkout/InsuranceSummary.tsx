import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { QuoteDetails } from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import {
  apartmentTypeTextKeys,
  getHouseholdSize,
  quoteDetailsHasAddress,
  isBundle,
} from 'pages/OfferNew/utils'
import { formatPostalNumber } from 'utils/postalNumbers'
import { TextKeyMap, useTextKeys } from 'utils/textKeys'

const Wrapper = styled('div')`
  padding: 0 0.5rem;
`
const Title = styled('h3')`
  font-size: 18px;
  letter-spacing: -0.23px;
  font-family: ${fonts.FAVORIT};
`

const Table = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  letter-spacing: -0.2px;
`

const Group = styled('div')`
  :not(:last-of-type) {
    margin-bottom: 1rem;
    border-bottom: 1px solid ${colorsV3.gray300};
  }
`

const Row = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 1rem;
  line-height: 1;
`
const Label = styled('div')`
  width: 50%;
  color: ${colorsV3.gray700};
`
const Value = styled('div')`
  width: 50%;
  color: ${colorsV3.gray700};
  text-align: right;
`

interface Props {
  offerData: OfferData
}

export const InsuranceSummary: React.FC<Props> = ({ offerData }) => {
  const textKeys = useTextKeys()

  const mainQuoteInBundle = offerData.quotes.filter((quote) => {
    return quoteDetailsHasAddress(quote.quoteDetails)
  })

  const mainQuote = isBundle(offerData)
    ? mainQuoteInBundle[0]
    : offerData.quotes[0]

  return (
    <Wrapper>
      <Group>
        <Title>{textKeys.CHECKOUT_SUMMARY_TITLE()}</Title>
      </Group>
      <Table>
        {getQuoteDetails(mainQuote.quoteDetails, textKeys).map(
          (group, index) => (
            <Group key={index}>
              {group.map(({ key, value, label }) => (
                <Row key={key}>
                  <Label>{label}</Label>
                  <Value>{value}</Value>
                </Row>
              ))}
            </Group>
          ),
        )}
      </Table>
    </Wrapper>
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

function getApartmentSummaryDetailsMaybe(
  textKeys: TextKeyMap,
  quoteDetails: QuoteDetails,
): DetailsGroup {
  if (quoteDetails.__typename !== 'SwedishApartmentQuoteDetails') {
    return []
  }

  return [
    {
      key: 'subtype',
      label: textKeys.CHECKOUT_DETAILS_APARTMENT_TYPE(),
      value: textKeys[apartmentTypeTextKeys[quoteDetails.type]](),
    },
  ]
}

const getQuoteDetails = (
  quoteDetails: QuoteDetails,
  textKeys: TextKeyMap,
): ReadonlyArray<DetailsGroup> => {
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
          key: 'bostadstyp',
          label: textKeys.CHECKOUT_DETAILS_QUOTE_TYPE(),
          value:
            quoteDetails.__typename === 'SwedishApartmentQuoteDetails' ||
            quoteDetails.__typename === 'NorwegianHomeContentsDetails' ||
            quoteDetails.__typename === 'DanishHomeContentsDetails'
              ? textKeys.CHECKOUT_APARTMENT()
              : textKeys.CHECKOUT_HOUSE(),
        },
        ...getApartmentSummaryDetailsMaybe(textKeys, quoteDetails),
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
