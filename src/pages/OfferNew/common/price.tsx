import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { MonetaryAmount } from 'containers/types'
import * as React from 'react'

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`

const PriceNet = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  color: ${colorsV2.gray};
  text-decoration: line-through;
  margin-bottom: 0.5rem;
  position: absolute;
  top: 0;
`

const PriceNumbers = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
`

const PriceGross = styled.div<{
  monthlyCostDeduction: boolean
  highlightAmount?: boolean
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

const PriceUnit = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  font-weight: 700;
  color: ${colorsV2.darkgray};
  margin-bottom: 0.25rem;
`

const PriceInterval = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV2.darkgray};
  white-space: nowrap;
`

export const Price: React.FC<{
  monthlyCostDeduction?: boolean
  monthlyNet: MonetaryAmount
  monthlyGross: MonetaryAmount
  highlightAmount?: boolean
}> = ({ monthlyCostDeduction, monthlyNet, monthlyGross, highlightAmount }) => (
  <PriceWrapper>
    {monthlyCostDeduction && (
      <PriceNet>
        <TranslationsPlaceholderConsumer
          textKey="SIDEBAR_OLD_PRICE"
          replacements={{
            PRICE: Number(monthlyNet.amount),
          }}
        >
          {(t) => t}
        </TranslationsPlaceholderConsumer>
      </PriceNet>
    )}

    <PriceNumbers>
      <PriceGross
        monthlyCostDeduction={!!monthlyCostDeduction}
        highlightAmount={highlightAmount}
      >
        {Number(monthlyGross.amount)}
      </PriceGross>

      <PriceSuffix>
        <PriceUnit>
          <TranslationsConsumer textKey="SIDEBAR_PRICE_SUFFIX_UNIT">
            {(t) => t}
          </TranslationsConsumer>
        </PriceUnit>
        <PriceInterval>
          <TranslationsConsumer textKey="SIDEBAR_PRICE_SUFFIX_INTERVAL">
            {(t) => t}
          </TranslationsConsumer>
        </PriceInterval>
      </PriceSuffix>
    </PriceNumbers>
  </PriceWrapper>
)
