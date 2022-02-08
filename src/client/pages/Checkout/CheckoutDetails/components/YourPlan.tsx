import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { getFormattedPrice } from 'utils/getFormattedPrice'
import { usePriceQuery } from 'data/graphql'
import { CampaignBadge } from '../../../../components/CampaignBadge/CampaignBadge'
import { SubSection } from './SubSection'

const { gray300 } = colorsV3

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
`
const TotalPrice = styled.div`
  font-size: 0.875rem;
  line-height: 1.4;
`

export const Row = styled.div`
  font-size: 0.875rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  line-height: 1.4;
`

const Value = styled.div``
const Label = styled.div``

const Total = styled.div`
  border-top: 1px solid ${gray300};
  margin: 0.5rem 0;
  padding-top: 0.5rem;
`

const StyledCampaignBadge = styled(CampaignBadge)``

export const YourPlan = () => {
  const textKeys = useTextKeys()
  const { isoLocale, currencyLocale } = useCurrentLocale()
  const { id: quoteCartId } = useParams<{ id: string }>()
  const [isNorwegianBundle, setIsNorwegianBundle] = useState(false)
  const { data, loading: isLoading, error } = usePriceQuery({
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

  if (quotes.length > 1 && currency === 'NOK') {
    setIsNorwegianBundle(true)
  }

  const formattedPrice = (value: string) => {
    return getFormattedPrice({
      locale: currencyLocale,
      amount: value,
      currency,
    })
  }

  return (
    <Wrapper>
      <SubSection headlineText={textKeys.CHECKOUT_YOUR_HOME_SECTION_TITLE()}>
        <>
          {quotes.map(({ displayName, price }, key) => (
            <Row key={key}>
              <Label>{displayName}</Label>
              <Value>
                {formattedPrice(price.amount)}
                {textKeys.PRICE_SUFFIX_INTERVAL()}
              </Value>
            </Row>
          ))}
          {discount !== '0.00' && (
            <Row>
              <StyledCampaignBadge
                quoteCartId={quoteCartId}
                isNorwegianBundle={isNorwegianBundle}
              />
              <Value>
                - {formattedPrice(discount)}
                {textKeys.PRICE_SUFFIX_INTERVAL()}
              </Value>
            </Row>
          )}
        </>

        <Total>
          <Row>
            <div>{textKeys.CHECKOUT_PRICE_TOTAL()}</div>
            <TotalPrice>
              {formattedPrice(total)}
              {textKeys.PRICE_SUFFIX_INTERVAL()}
            </TotalPrice>
          </Row>
        </Total>
      </SubSection>
    </Wrapper>
  )
}
