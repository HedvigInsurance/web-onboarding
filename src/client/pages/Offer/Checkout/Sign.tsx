import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { Button } from 'components/buttons'
import { Spinner } from 'components/utils'
import { CheckoutMethod } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { WarningIcon } from '../../../components/icons/Warning'
import { LinkToChat } from '../../OfferNew/Checkout/LinkToChat'
import { SignUiState } from './'

type WrapperProps = {
  isDesktop: boolean
}

const DESKTOP_BREAKPOINT = 600

const Wrapper = styled('div')<WrapperProps>`
  background: ${colorsV3.gray100};
  box-shadow: 0 -1px 4px ${colorsV3.gray500};
  width: 100%;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  @media screen and (min-width: ${DESKTOP_BREAKPOINT}px) {
    padding: 1.5rem 2rem;
  }
`

const SpinnerWrapper = styled(motion.div)`
  display: inline-block;
`

const SignStatusWrapper = styled(motion.div)`
  padding: 2rem 1rem;
`

const StatusText = styled.div`
  color: ${colorsV3.gray700};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  text-align: center;
`

const IconWrapper = styled.div`
  padding: 0.25rem 0.5rem 0 0;
  align-items: center;

  svg {
    width: 1rem;
    height: 1rem;
  }
`

interface Props {
  checkoutMethod?: CheckoutMethod
  signUiState: SignUiState
  canInitiateSign: boolean
  onSignStart: () => void
}

export const Sign: React.FC<Props> = ({
  checkoutMethod,
  signUiState,
  canInitiateSign,
  onSignStart,
}) => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_BREAKPOINT })
  const textKeys = useTextKeys()
  const isLoading = signUiState === 'STARTED' || !checkoutMethod
  const signButtonText =
    checkoutMethod === CheckoutMethod.SimpleSign
      ? textKeys.CHECKOUT_SIMPLE_SIGN_BUTTON_TEXT()
      : textKeys.CHECKOUT_SIGN_BUTTON_TEXT()

  return (
    <Wrapper isDesktop={isDesktop}>
      <Button
        onClick={() => onSignStart()}
        size={isDesktop ? 'lg' : 'sm'}
        fullWidth
        foreground={colorsV3.gray900}
        background={colorsV3.purple500}
        disabled={!canInitiateSign}
      >
        {isLoading ? (
          <SpinnerWrapper
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
          >
            <Spinner />
          </SpinnerWrapper>
        ) : (
          signButtonText
        )}
      </Button>

      {signUiState !== 'NOT_STARTED' && checkoutMethod && (
        <SignStatusWrapper
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 50 }}
        >
          {checkoutMethod === CheckoutMethod.SwedishBankId &&
            signUiState === 'STARTED' && (
              <StatusText>{textKeys.SE_BANKID_START_SIGN()}</StatusText>
            )}
          {signUiState === 'FAILED' && (
            <>
              <StatusText>
                <IconWrapper>
                  <WarningIcon color={colorsV3.gray700} />
                </IconWrapper>
                {textKeys.CHECKOUT_SIGN_GENERIC_ERROR()}
              </StatusText>
              <LinkToChat />
            </>
          )}
        </SignStatusWrapper>
      )}
    </Wrapper>
  )
}
