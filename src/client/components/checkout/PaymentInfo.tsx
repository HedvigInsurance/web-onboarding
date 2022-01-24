import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'

const PRICE_PLACEHOLDER = '239 NOK/month'

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

export const PaymentInfo = () => {
  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <TotalPrice>{PRICE_PLACEHOLDER}</TotalPrice>
      <CancelInfo>{textKeys.CANCEL_ANYTIME()}</CancelInfo>
    </Wrapper>
  )
}
