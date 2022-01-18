import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import { Button } from '../buttons'

const PRICE_PLACEHOLDER = '239 NOK/month'

const { white, purple500, gray900, gray700 } = colorsV3

export type Props = {
  buttonText: string
  buttonOnClick: () => void
}

const Wrapper = styled.div`
  width: 100vw;
  height: 5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background-color: ${white};
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.05),
    0px -8px 16px rgba(0, 0, 0, 0.05);
`
const InnerWrapper = styled.div`
  width: 628px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const PaymentInfo = styled.div`
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

export const Footer = ({ buttonText, buttonOnClick }: Props) => {
  const textKeys = useTextKeys()

  return (
    <Wrapper>
      <InnerWrapper>
        <PaymentInfo>
          <TotalPrice>{PRICE_PLACEHOLDER}</TotalPrice>
          <CancelInfo>{textKeys.CHECKOUT_CANCEL_INFO()}</CancelInfo>
        </PaymentInfo>
        <Button
          background={purple500}
          foreground={gray900}
          onClick={buttonOnClick}
        >
          {buttonText}
        </Button>
      </InnerWrapper>
    </Wrapper>
  )
}
