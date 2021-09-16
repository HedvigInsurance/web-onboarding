import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Spinner } from 'components/utils'
import { MonetaryAmount } from 'containers/types'
import { useTextKeys } from 'utils/textKeys'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  SMALL_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  ${SMALL_SCREEN_MEDIA_QUERY} {
    align-items: flex-end;
  }
`

const PriceGross = styled.div`
  font-size: 1rem;
  margin-right: 0.5rem;
  line-height: 1.625rem;
  color: ${colorsV3.gray700};
  text-decoration: line-through;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    line-height: 2rem;
  }
`

const OldPriceSuffix = styled.span`
  font-size: 0.875rem;
`

const PriceNumbers = styled.div<{
  lightAppearance?: boolean
}>`
  display: flex;
  align-items: baseline;
  color: ${colorsV3.gray900};
  ${({ lightAppearance }) => lightAppearance && `color: ${colorsV3.white}`};
`

const PriceNet = styled.div`
  font-size: 1.375rem;
  line-height: 1.625rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`

const PriceSuffix = styled.div`
  display: block;
  flex-shrink: 0;
  margin-left: 0.25rem;
`

const PriceUnit = styled.span`
  margin-right: 0.125rem;
  line-height: 1;
  letter-spacing: -0.02rem;
`

const PriceInterval = styled.span<{
  lightAppearance?: boolean
}>`
  font-size: 1rem;
  line-height: 1;
  ${({ lightAppearance }) => lightAppearance && `color: ${colorsV3.white}`};
`

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 3.5rem;
  font-size: 2rem;
  color: ${colorsV3.gray900};
`

export const Price: React.FC<{
  isDiscountPrice?: boolean
  monthlyNet: MonetaryAmount
  monthlyGross: MonetaryAmount
  lightAppearance?: boolean
  loading?: boolean
}> = ({
  isDiscountPrice,
  monthlyNet,
  monthlyGross,
  lightAppearance,
  loading,
}) => {
  const textKeys = useTextKeys()
  const grossPrice = Math.round(Number(monthlyGross.amount))
  const netPrice = Math.round(Number(monthlyNet.amount))
  const currency = monthlyGross.currency
  const localizedPerMonth = textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()
  return (
    <PriceWrapper>
      <PriceNumbers lightAppearance={lightAppearance}>
        {isDiscountPrice && (
          <PriceGross>
            {grossPrice}
            <OldPriceSuffix>{currency}</OldPriceSuffix>
          </PriceGross>
        )}
        {!loading ? (
          <PriceNet>{netPrice}</PriceNet>
        ) : (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        )}
        <PriceSuffix>
          <PriceUnit>{currency}</PriceUnit>
          <PriceInterval lightAppearance={lightAppearance}>
            {localizedPerMonth}
          </PriceInterval>
        </PriceSuffix>
      </PriceNumbers>
    </PriceWrapper>
  )
}
