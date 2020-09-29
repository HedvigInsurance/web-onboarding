import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { Spinner } from 'components/utils'
import { MonetaryAmount } from 'containers/types'
import React from 'react'
import { useTextKeys } from 'utils/textKeys'

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`

const PriceGross = styled.div<{ visible: boolean }>`
  font-size: 1rem;
  line-height: 1rem;
  color: ${colorsV3.gray500};
  text-decoration: line-through;
  margin-bottom: 0.5rem;
  height: 0.875rem;

  ${({ visible }) => !visible && 'visibility: hidden;'};
`

const PriceNumbers = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
`

const PriceNet = styled.div<{
  monthlyCostDeduction: boolean
  lightAppearance?: boolean
}>`
  font-size: 3.5rem;
  line-height: 3.5rem;
  color: ${(props) => {
    if (props.monthlyCostDeduction) {
      return colorsV3.purple500
    }

    return colorsV3.gray900
  }};
  font-family: ${fonts.FAVORIT};

  ${({ lightAppearance }) => lightAppearance && `color: ${colorsV3.white}`};

  @media (max-width: 330px) {
    font-size: 2.75rem;
  }
`

const PriceSuffix = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
  flex-shrink: 0;
  margin-left: 0.5rem;
`

const PriceUnit = styled.div<{ lightAppearance?: boolean }>`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV3.gray700};
  margin-bottom: 0.25rem;
  ${({ lightAppearance }) => lightAppearance && `color: ${colorsV3.white}`};
`

const PriceInterval = styled.div<{ lightAppearance?: boolean }>`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV3.gray700};
  white-space: nowrap;
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
  monthlyCostDeduction?: boolean
  monthlyNet: MonetaryAmount
  monthlyGross: MonetaryAmount
  lightAppearance?: boolean
  loading?: boolean
}> = ({
  monthlyCostDeduction,
  monthlyNet,
  monthlyGross,
  lightAppearance,
  loading,
}) => {
  const textKeys = useTextKeys()
  return (
    <PriceWrapper>
      <PriceGross
        visible={monthlyCostDeduction!}
        aria-hidden={!monthlyCostDeduction}
      >
        {textKeys.SIDEBAR_OLD_PRICE({
          PRICE: Math.round(Number(monthlyGross.amount)),
        })}
      </PriceGross>

      <PriceNumbers>
        {!loading && (
          <PriceNet
            monthlyCostDeduction={!!monthlyCostDeduction}
            lightAppearance={lightAppearance}
          >
            {Math.round(Number(monthlyNet.amount))}
          </PriceNet>
        )}
        {loading && (
          <SpinnerWrapper>
            <Spinner />
          </SpinnerWrapper>
        )}

        <PriceSuffix>
          <PriceUnit lightAppearance={lightAppearance}>
            {monthlyGross.currency}
          </PriceUnit>
          <PriceInterval lightAppearance={lightAppearance}>
            {textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()}
          </PriceInterval>
        </PriceSuffix>
      </PriceNumbers>
    </PriceWrapper>
  )
}
