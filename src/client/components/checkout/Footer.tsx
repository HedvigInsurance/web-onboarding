import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Button, ButtonProps, LinkButton } from '../buttons'
import { PaymentInfo } from './PaymentInfo'

const { white, purple500, gray900 } = colorsV3

export type Props = {
  buttonText: string
  buttonOnClick?: () => void
  buttonLinkTo?: string
}
type FooterButtonProps = {
  background: ButtonProps['background']
  foreground: ButtonProps['foreground']
}

const Wrapper = styled.div`
  width: 100vw;
  height: 5rem;
  padding: 1rem;
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
  width: 100%;
  max-width: 628px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Footer = ({ buttonText, buttonOnClick, buttonLinkTo }: Props) => {
  const buttonProps: FooterButtonProps = {
    background: purple500,
    foreground: gray900,
  }

  return (
    <Wrapper>
      <InnerWrapper>
        <PaymentInfo />
        {buttonText && (
          <>
            {buttonLinkTo && (
              <LinkButton {...buttonProps} to={buttonLinkTo}>
                {buttonText}
              </LinkButton>
            )}
            {buttonOnClick && (
              <Button {...buttonProps} onClick={buttonOnClick}>
                {buttonText}
              </Button>
            )}
          </>
        )}
      </InnerWrapper>
    </Wrapper>
  )
}
