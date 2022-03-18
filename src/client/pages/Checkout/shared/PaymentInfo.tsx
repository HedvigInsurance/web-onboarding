import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { getFormattedPrice } from 'utils/getFormattedPrice'
import { PriceData } from './types'

const { gray900, gray700 } = colorsV3

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
`
const TotalPrice = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${gray900};
`
const CancelInfo = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${gray700};
`

export const PaymentInfo = ({ currency, totalBundleCost }: PriceData) => {
  const textKeys = useTextKeys()
  const { currencyLocale } = useCurrentLocale()
  const formattedPrice = getFormattedPrice({
    locale: currencyLocale,
    amount: totalBundleCost,
    currency,
  })
  return (
    <Wrapper>
      <TotalPrice>
        {formattedPrice}
        {textKeys.PRICE_SUFFIX_INTERVAL()}
      </TotalPrice>
      <CancelInfo>{textKeys.CHECKOUT_FOOTER_CANCELLATION_INFO()}</CancelInfo>
    </Wrapper>
  )
}
