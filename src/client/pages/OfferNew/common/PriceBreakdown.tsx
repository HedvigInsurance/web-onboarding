import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { OfferData } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'
import {
  SMALL_SCREEN_MEDIA_QUERY,
  LARGE_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { Spinner } from 'components/utils'

const PriceDetails = styled.div`
  margin-bottom: 2.5rem;
  color: ${colorsV3.gray700};
`

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 1rem 0 1rem 0;
  flex-wrap: wrap;

  ${SMALL_SCREEN_MEDIA_QUERY} {
    flex-wrap: nowrap;
  }

  span {
    margin-right: 0.125rem;
  }
`
const TotalRow = styled(PriceRow)`
  color: ${colorsV3.gray900};
`
const TotalPrice = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
`

const OriginalPrice = styled.div`
  display: inline-block;
  font-size: 1rem;
  margin-right: 0.2rem;
  line-height: 1.5rem;
  color: ${colorsV3.gray700};
  text-decoration: line-through;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    line-height: 2rem;
  }
`

const OriginalPriceCurrency = styled.span`
  font-size: 0.875rem;
`

const Price: React.FC<{
  amount: number
  currency: string
  timeInterval: string
  isLoading?: boolean
  nonDiscountedPrice?: number
}> = ({
  amount,
  currency,
  timeInterval,
  isLoading = false,
  nonDiscountedPrice,
}) => (
  <div>
    {!isLoading && nonDiscountedPrice && (
      <OriginalPrice>
        {nonDiscountedPrice}
        <OriginalPriceCurrency>{currency}</OriginalPriceCurrency>
      </OriginalPrice>
    )}
    {isLoading ? <Spinner /> : <span>{amount}</span>}
    <span>
      {currency}
      {timeInterval}
    </span>
  </div>
)

export const PriceBreakdown: React.FC<{
  offerData: OfferData
  showTotal?: boolean
  isLoading?: boolean
}> = ({ offerData, showTotal = false, isLoading = false }) => {
  const textKeys = useTextKeys()

  const priceBreakdowns = offerData.quotes.map((quote) => ({
    id: quote.id,
    name: quote.displayName,
    price: Math.round(Number(quote.price.amount)),
    currency: quote.price.currency,
  }))
  const localizedPerMonth = textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()

  const {
    monthlyNet: { amount: totalNetPrice, currency },
    monthlyGross: { amount: totalGrossPrice },
  } = offerData.cost

  const roundedTotalNetPrice = Math.round(Number(totalNetPrice))
  const roundedTotalGrossPrice = Math.round(Number(totalGrossPrice))

  return (
    <PriceDetails>
      {priceBreakdowns.map(({ id, name, price, currency }) => (
        <PriceRow key={id}>
          <div>{name}</div>
          <Price
            amount={price}
            currency={currency}
            timeInterval={localizedPerMonth}
          ></Price>
        </PriceRow>
      ))}
      {showTotal && (
        <TotalRow>
          <div>{textKeys.CHECKOUT_PRICE_TOTAL()}</div>
          <TotalPrice>
            <Price
              amount={roundedTotalNetPrice}
              currency={currency}
              timeInterval={localizedPerMonth}
              isLoading={isLoading}
              nonDiscountedPrice={
                roundedTotalNetPrice !== roundedTotalGrossPrice
                  ? roundedTotalGrossPrice
                  : undefined
              }
            />
          </TotalPrice>
        </TotalRow>
      )}
    </PriceDetails>
  )
}
