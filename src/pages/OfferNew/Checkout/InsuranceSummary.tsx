import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { CompleteApartmentQuoteDetails } from 'generated/graphql'
import { CompleteOfferDataForMember } from 'pages/OfferNew/types'
import {
  apartmentTypeTextKeys,
  maskAndFormatRawSsn,
} from 'pages/OfferNew/utils'
import * as React from 'react'
import { TextKeyMap, useTextKeys } from 'utils/hooks/useTextKeys'
import { formatPostalNumber } from 'utils/postalNumbers'

const Wrapper = styled('div')`
  padding: 0 0.5rem;
`
const Title = styled('h3')`
  font-size: 1rem;
  letter-spacing: -0.23px;
  font-family: ${fonts.CIRCULAR};
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
    border-bottom: 1px solid ${colorsV2.lightgray};
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
  color: ${colorsV2.gray};
`
const Value = styled('div')`
  width: 50%;
  color: ${colorsV2.darkgray};
  text-align: right;
`

interface Props {
  offer: CompleteOfferDataForMember
}

export const InsuranceSummary: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <Title>{textKeys.CHECKOUT_SUMMARY_TITLE()}</Title>
      <Table>
        {getDetails(offer, textKeys).map((group, index) => (
          <Group key={index}>
            {group.map(({ key, value, label }) => (
              <Row key={key}>
                <Label>{label}</Label>
                <Value>{value}</Value>
              </Row>
            ))}
          </Group>
        ))}
      </Table>
    </Wrapper>
  )
}

type DetailsGroup = ReadonlyArray<{
  key: string
  label: React.ReactNode
  value: React.ReactNode
}>
const getDetails = (
  offer: CompleteOfferDataForMember,
  textKeys: TextKeyMap,
) => [
  [
    {
      key: 'address',
      label: textKeys.CHECKOUT_DETAILS_ADDRESS(),
      value: offer.lastQuoteOfMember.details.street,
    },
    {
      key: 'zipcode',
      label: textKeys.CHECKOUT_DETAILS_ZIPCODE(),
      value: formatPostalNumber(offer.lastQuoteOfMember.details.zipCode),
    },
    {
      key: 'bostadstyp',
      label: textKeys.CHECKOUT_DETAILS_QUOTE_TYPE(),
      value:
        offer.lastQuoteOfMember.details.__typename ===
        'CompleteApartmentQuoteDetails'
          ? textKeys.CHECKOUT_APARTMENT()
          : textKeys.CHECKOUT_HOUSE(),
    },
    offer.lastQuoteOfMember.details.__typename ===
      'CompleteApartmentQuoteDetails' && {
      key: 'subtype',
      label: textKeys.CHECKOUT_DETAILS_APARTMENT_TYPE(),
      value: textKeys[
        apartmentTypeTextKeys[
          (offer.lastQuoteOfMember.details as CompleteApartmentQuoteDetails)
            .type
        ]
      ](),
    },
    {
      key: 'livingspace',
      label: textKeys.CHECKOUT_DETAILS_LIVING_SPACE(),
      value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
        VALUE: offer.lastQuoteOfMember.details.livingSpace,
      }),
    },
    ...(offer.lastQuoteOfMember.details.__typename ===
    'CompleteHouseQuoteDetails'
      ? ([
          {
            key: 'ancillaryarea',
            label: textKeys.CHECKOUT_DETAILS_ANCILLARY_SPACE(),
            value: textKeys.CHECKOUT_DETAILS_SQM_VALUE({
              VALUE: offer.lastQuoteOfMember.details.ancillarySpace,
            }),
          },
          {
            key: 'bathrooms',
            label: textKeys.CHECKOUT_DETAILS_NUMBER_OF_BATHROOMS(),
            value: textKeys.CHECKOUT_DETAILS_COUNT_VALUE({
              VALUE: offer.lastQuoteOfMember.details.numberOfBathrooms,
            }),
          },
          {
            key: 'yearOfConstruction',
            label: textKeys.CHECKOUT_DETAILS_YEAR_OF_CONSTRUCTION(),
            value: offer.lastQuoteOfMember.details.yearOfConstruction,
          },
        ] as DetailsGroup)
      : []),
  ].filter(Boolean) as DetailsGroup,

  ...(offer.lastQuoteOfMember.details.__typename === 'CompleteHouseQuoteDetails'
    ? offer.lastQuoteOfMember.details.extraBuildings.map<DetailsGroup>(
        (extraBuilding) => [
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
            value: extraBuilding.hasWaterConnected
              ? textKeys.YES()
              : textKeys.NO(),
          },
        ],
      )
    : []),

  [
    {
      key: 'ssn',
      label: textKeys.CHECKOUT_DETAILS_SSN(),
      value: maskAndFormatRawSsn(offer.lastQuoteOfMember.ssn),
    },
    {
      key: 'antal-personer',
      label: textKeys.CHECKOUT_DETAILS_HOUSEHOLD_SIZE(),
      value:
        offer.lastQuoteOfMember.details.householdSize === 1
          ? textKeys.CHECKOUT_DETAILS_SINGLE_PERSON()
          : textKeys.CHECKOUT_DETAILS_PERSONS_VALUE({
              VALUE: offer.lastQuoteOfMember.details.householdSize,
            }),
    },
  ],
]
