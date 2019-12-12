import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { CompleteOfferData } from 'pages/OfferNew/types'
import { getInsuranceType, insuranceTypeTextKeys } from 'pages/OfferNew/utils'
import * as React from 'react'
import { TextKeyMap, useTextKeys } from 'utils/hooks/useTextKeys'
import { formatPostalNumber } from 'utils/postalNumbers'

const Wrapper = styled('div')`
  padding: 0 0.5rem;
`
const Headline = styled('h3')`
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
  offer: CompleteOfferData
}

export const InsuranceSummary: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <Headline>Dina detaljer</Headline>
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

const getDetails = (
  offer: CompleteOfferData,
  textKeys: TextKeyMap,
): ReadonlyArray<ReadonlyArray<{
  key: string
  label: React.ReactNode
  value: React.ReactNode
}>> => [
  [
    { key: 'adress', label: 'Adress', value: offer.quote.details.street },
    {
      key: 'postnummer',
      label: 'Postnummer',
      value: formatPostalNumber(offer.quote.details.zipCode),
    },
    {
      key: 'bostadstyp',
      label: 'Bostadstyp',
      value: textKeys[insuranceTypeTextKeys[getInsuranceType(offer.quote)]],
    },
  ],
  [
    { key: 'personnummer', label: 'Personnummer', value: 'TODO-****' }, // TODO
    {
      key: 'antal-personer',
      label: 'Antal personer',
      value: `${offer.quote.details.householdSize} personer`, // TODO
    },
  ],
]
