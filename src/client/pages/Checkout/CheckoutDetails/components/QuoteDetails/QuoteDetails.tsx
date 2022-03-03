import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { getQuoteDetails } from 'utils/getQuoteDetails'
import { useTextKeys } from 'utils/textKeys'
import { OfferQuote } from '../../../../OfferNew/types'
import { SubSection } from '../SubSection'
import { Divider } from '../../../shared/Divider'

const { gray900, gray700 } = colorsV3

const Row = styled.div`
  font-size: 0.874rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  line-height: 1.4;
`

const Label = styled.div`
  color: ${gray900};
`
const Value = styled.div`
  color: ${gray700};
  text-align: right;
`

const HorizontalSpacer = styled.div`
  width: 48px;
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`

export const QuoteDetails = ({ mainQuote }: { mainQuote: OfferQuote }) => {
  const textKeys = useTextKeys()

  return (
    <SubSection headlineText={textKeys.CHECKOUT_QUOTE_DETAILS_TITLE()}>
      {getQuoteDetails(mainQuote, textKeys).map((group, index) => (
        <>
          <Group key={index}>
            {group.map(({ key, value, label }) => (
              <Row key={key}>
                <Label>{label}</Label>
                <HorizontalSpacer />
                <Value>{value}</Value>
              </Row>
            ))}
          </Group>
          {index != group.length && <Divider />}
        </>
      ))}
    </SubSection>
  )
}
