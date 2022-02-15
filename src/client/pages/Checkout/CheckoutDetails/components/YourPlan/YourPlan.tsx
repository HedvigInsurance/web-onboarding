import React from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { getFormattedPrice } from 'utils/getFormattedPrice'
import { usePriceQuery } from 'data/graphql'
import { Badge } from 'components/Badge/Badge'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { SubSection } from '../SubSection'

const { gray700, gray300 } = colorsV3

export const Row = styled.div`
  font-size: 0.875rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  line-height: 1.4;
`

const Value = styled.div`
  color: ${gray700};
`
const Label = styled.div``

const Total = styled.div`
  border-top: 1px solid ${gray300};
  margin: 0.5rem 0;
  padding-top: 0.5rem;
`

const StyledBadge = styled(Badge)`
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    overflow: auto;
    max-width: 100%;
`

export const YourPlan = () => {
  const textKeys = useTextKeys()
  const { isoLocale, currencyLocale } = useCurrentLocale()
  const { id: quoteCartId } = useParams<{ id: string }>()
  const { data, error } = usePriceQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })
  const quoteBundle = data?.quoteCart.bundle

  if (error || !quoteBundle) {
    return null
  }
  const total = quoteBundle.bundleCost.monthlyNet.amount
  const discount = quoteBundle.bundleCost.monthlyDiscount.amount
  const currency = quoteBundle.quotes[0].price.currency
  const quotes = quoteBundle.quotes
  const campaignName = data?.quoteCart?.campaign?.displayValue

  const formattedPrice = (value: string) => {
    return getFormattedPrice({
      locale: currencyLocale,
      amount: value,
      currency,
    })
  }

  return (
    <SubSection headlineText={textKeys.CHECKOUT_INSURANCE_TITLE()}>
      <>
        {quotes.map(({ displayName, price }, key) => (
          <Row key={key}>
            <Label>{displayName}</Label>
            <Value>{formattedPrice(price.amount)}</Value>
          </Row>
        ))}
        {Number(discount) > 0 && (
          <Row>
            {/* need to handle NO bundle */}
            <StyledBadge>{campaignName}</StyledBadge>
            <Value>-{formattedPrice(discount)}</Value>
          </Row>
        )}
      </>

      <Total>
        <Row>
          <div>{textKeys.CHECKOUT_PRICE_TOTAL()}</div>
          <Value>{formattedPrice(total)}</Value>
        </Row>
      </Total>
    </SubSection>
  )
}
