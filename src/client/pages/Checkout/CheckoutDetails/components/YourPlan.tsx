import React from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { getFormattedPrice } from 'utils/getFormattedPrice'
import { usePriceQuery } from 'data/graphql'
import { SubSection } from '../SubSection'
import { CampaignBadge } from '../../../../components/CampaignBadge/CampaignBadge'

const { gray900, gray300 } = colorsV3

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
`
const TotalPrice = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${gray900};
`

export const Row = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  line-height: 1.42;
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

  const formattedPrice = (value: string) => {
    return getFormattedPrice({
      locale: currencyLocale,
      amount: value,
      currency,
    })
  }

  console.log(data)

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
          <Row>
            <StyledCampaignBadge quoteCartId={quoteCartId} />
            <Value>
              - {formattedPrice(discount)}
              {textKeys.PRICE_SUFFIX_INTERVAL()}
            </Value>
          </Row>
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
