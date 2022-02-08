import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { getQuoteDetails } from 'utils/getQuoteDetails'
import { useTextKeys } from 'utils/textKeys'
import { OfferQuote } from '../../OfferNew/types'
import { SubSection } from '../components/SubSection'
import { HorizontalSpacer } from '../components/HorizontalSpacer'

const { gray500, gray300 } = colorsV3

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  line-height: 1;
`

const Label = styled.div`
  color: ${gray500};
`
const Value = styled.div`
  color: ${colorsV3.gray700};
  text-align: right;
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${gray300};

  :last-of-type {
    border-bottom: none;
  }
`

export const QuoteDetails = ({ mainQuote }: { mainQuote: OfferQuote }) => {
  const textKeys = useTextKeys()

  return (
    <SubSection headlineText={textKeys.CHECKOUT_QUOTE_DETAILS_TITLE()}>
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
    </SubSection>
  )
}
