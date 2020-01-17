import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { MonetaryAmount } from 'containers/types'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`

const PriceGross = styled.div<{ visible: boolean }>`
  font-size: 1rem;
  line-height: 1rem;
  color: ${colorsV2.gray};
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
  highlightAmount?: boolean
  lightAppearance?: boolean
}>`
  font-size: 3.5rem;
  line-height: 3.5rem;
  color: ${(props) => {
    if (props.monthlyCostDeduction) {
      return colorsV2.grass500
    }

    if (props.highlightAmount) {
      return colorsV2.violet500
    }

    return colorsV2.black
  }};
  font-family: ${fonts.GEOMANIST};
  font-weight: 600;

  ${({ lightAppearance }) => lightAppearance && `color: ${colorsV2.white}`};

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
  font-weight: 700;
  color: ${colorsV2.darkgray};
  margin-bottom: 0.25rem;
  ${({ lightAppearance }) => lightAppearance && `color: ${colorsV2.white}`};
`

const PriceInterval = styled.div<{ lightAppearance?: boolean }>`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV2.darkgray};
  white-space: nowrap;
  ${({ lightAppearance }) => lightAppearance && `color: ${colorsV2.white}`};
`

export const Price: React.FC<{
  monthlyCostDeduction?: boolean
  monthlyNet: MonetaryAmount
  monthlyGross: MonetaryAmount
  highlightAmount?: boolean
  lightAppearance?: boolean
}> = ({
  monthlyCostDeduction,
  monthlyNet,
  monthlyGross,
  highlightAmount,
  lightAppearance,
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
        <PriceNet
          monthlyCostDeduction={!!monthlyCostDeduction}
          highlightAmount={highlightAmount}
          lightAppearance={lightAppearance}
        >
          {Math.round(Number(monthlyNet.amount))}
        </PriceNet>

        <PriceSuffix>
          <PriceUnit lightAppearance={lightAppearance}>
            {textKeys.SIDEBAR_PRICE_SUFFIX_UNIT()}
          </PriceUnit>
          <PriceInterval lightAppearance={lightAppearance}>
            {textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()}
          </PriceInterval>
        </PriceSuffix>
      </PriceNumbers>
    </PriceWrapper>
  )
}
