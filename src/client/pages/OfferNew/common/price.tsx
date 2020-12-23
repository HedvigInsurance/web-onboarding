import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Spinner } from 'components/utils'
import { MonetaryAmount } from 'containers/types'
import { useTextKeys } from 'utils/textKeys'
import { SIDEBAR_TABLET_BP } from '../Introduction/Sidebar'

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
`

const PriceGross = styled.div`
  height: 0.875rem;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  line-height: 1rem;
  color: ${colorsV3.gray500};
  text-decoration: line-through;
`

const PriceNumbers = styled.div<{
  discount: boolean
  lightAppearance?: boolean
}>`
  display: flex;
  align-items: baseline;
  ${({ discount }) => discount && `color: ${colorsV3.purple700}`};
  ${({ lightAppearance }) => lightAppearance && `color: ${colorsV3.white}`};
`

const PriceNet = styled.div`
  font-size: 1.125rem;
  ${SIDEBAR_TABLET_BP} {
    font-size: 1.5rem;
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
  discount: boolean
  lightAppearance?: boolean
}>`
  font-size: 1rem;
  line-height: 1;
  color: ${colorsV3.gray500};
  ${({ discount }) => discount && `color: ${colorsV3.purple700}`};
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
  return (
    <PriceWrapper>
      {isDiscountPrice && (
        <PriceGross>
          {textKeys.SIDEBAR_OLD_PRICE({
            PRICE: Math.round(Number(monthlyGross.amount)),
          })}
        </PriceGross>
      )}

      <PriceNumbers
        discount={!!isDiscountPrice}
        lightAppearance={lightAppearance}
      >
        {!loading && (
          <PriceNet>{Math.round(Number(monthlyNet.amount))}</PriceNet>
        )}
        {loading && (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        )}

        <PriceSuffix>
          <PriceUnit>{monthlyGross.currency}</PriceUnit>
          <PriceInterval
            discount={!!isDiscountPrice}
            lightAppearance={lightAppearance}
          >
            {textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()}
          </PriceInterval>
        </PriceSuffix>
      </PriceNumbers>
    </PriceWrapper>
  )
}
