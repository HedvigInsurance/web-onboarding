import React from 'react'
import { getQuoteDetails } from 'utils/getQuoteDetails'
import { useTextKeys } from 'utils/textKeys'
import { OfferQuote } from '../../OfferNew/types'
import { Row } from '../components/Row'
import { Label } from '../components/Label'
import { Value } from '../components/Value'
import { SubSection } from '../components/SubSection'
import { Group } from '../components/Group'

export const YourHome = ({ mainQuote }: { mainQuote: OfferQuote }) => {
  const textKeys = useTextKeys()

  return (
    <SubSection headlineText="Your home">
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
    </SubSection>
  )
}
