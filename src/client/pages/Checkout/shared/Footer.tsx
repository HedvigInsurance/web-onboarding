import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { motion } from 'framer-motion'
import { Button, ButtonProps, LinkButton } from 'components/buttons'
import { Spinner } from 'components/utils'
import { WrapperWidth } from './CheckoutPageWrapper'

const { white, purple500, gray900 } = colorsV3

export type Props = {
  buttonText: string
  buttonOnClick?: () => void
  buttonLinkTo?: string
  children: React.ReactNode
  isLoading?: boolean
}
type FooterButtonProps = {
  background: ButtonProps['background']
  foreground: ButtonProps['foreground']
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 5rem;
  padding: 1rem;
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${white};
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.05),
    0px -8px 16px rgba(0, 0, 0, 0.05);
`
const InnerWrapper = styled.div`
  width: 100%;
  max-width: ${WrapperWidth}px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
`
const ButtonWrapper = styled.div`
  justify-self: end;
`

const SpinnerWrapper = styled(motion.div)`
  display: inline-block;
`

export const Footer = ({
  buttonText,
  buttonOnClick,
  buttonLinkTo,
  children,
  isLoading,
}: Props) => {
  const buttonProps: FooterButtonProps = {
    background: purple500,
    foreground: gray900,
  }

  return (
    <Wrapper>
      <InnerWrapper>
        {isLoading ? (
          <SpinnerWrapper
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
          >
            <Spinner />
          </SpinnerWrapper>
        ) : (
          children
        )}
        {buttonText && (
          <ButtonWrapper>
            {buttonLinkTo && (
              <LinkButton {...buttonProps} to={buttonLinkTo}>
                {buttonText}
              </LinkButton>
            )}
            {buttonOnClick && (
              <Button
                {...buttonProps}
                onClick={buttonOnClick}
                disabled={isLoading}
              >
                {buttonText}
              </Button>
            )}
          </ButtonWrapper>
        )}
      </InnerWrapper>
    </Wrapper>
  )
}
