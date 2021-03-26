import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { OfferData } from 'pages/OfferNew/types'
import { quoteDetailsHasAddress, isBundle } from 'pages/OfferNew/utils'
import { useTextKeys } from 'utils/textKeys'
import { InsuranceSummaryDetails } from './InsuranceSummaryDetails'

const Wrapper = styled('div')`
  padding: 0 0.5rem;
`
const Title = styled.div`
  font-size: 18px;
  letter-spacing: -0.23px;
  font-family: ${fonts.FAVORIT};
  padding: 1rem 0;
  border-bottom: 1px solid ${colorsV3.gray300};
`

const Table = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  letter-spacing: -0.2px;
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
      <Title>{textKeys.CHECKOUT_SUMMARY_TITLE()}</Title>
      <Table>
        <InsuranceSummaryDetails
          personalDetails={offerData.person}
          quoteDetails={mainQuote.quoteDetails}
        />
      </Table>
    </Wrapper>
  )
}
