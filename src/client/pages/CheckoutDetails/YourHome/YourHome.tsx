import React from 'react'
import { getQuoteDetails } from 'src/client/utils/getQuoteDetails'
import { useTextKeys } from 'src/client/utils/textKeys'
import { OfferQuote } from '../../OfferNew/types'
import { Row } from '../components/Row'
import { Label } from '../components/Label'
import { Value } from '../components/Value'

export const YourHome = (mainQuote: OfferQuote) => {
  const textKeys = useTextKeys()

  return (
    <div>
      {getQuoteDetails(mainQuote, textKeys).map((group, index) => (
        <div key={index}>
          {group.map(({ key, value, label }) => (
            <Row key={key}>
              <Label>{label}</Label>
              <Value>{value}</Value>
            </Row>
          ))}
        </div>
      ))}
    </div>
  )
}
