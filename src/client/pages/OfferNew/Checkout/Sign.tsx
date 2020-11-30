import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { Button } from 'components/buttons'
import { Spinner } from 'components/utils'
import { SignStatus as GraphQLSignStatus } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { SignStatus } from './SignStatus'

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

export enum SignUiState {
  NOT_STARTED,
  STARTED_WITH_REDIRECT,
  STARTED,
  FAILED,
}

interface Props {
  signUiState: SignUiState
  signStatus: GraphQLSignStatus | null
  isLoading: boolean
  canInitiateSign: boolean
  onSignStart: () => void
}

export const Sign: React.FC<Props> = ({
  signUiState,
  signStatus,
  isLoading,
  canInitiateSign,
  onSignStart,
}) => {
  const isDesktop = useMediaQuery({ minWidth: DESKTOP_BREAKPOINT })
  const textKeys = useTextKeys()

  return (
    <Wrapper isDesktop={isDesktop}>
      <Button
        onClick={async () => {
          if (!canInitiateSign) {
            return
          }

          onSignStart()
        }}
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
          textKeys.CHECKOUT_SIGN_BUTTON_TEXT()
        )}
      </Button>
      {signStatus && (
        <SignStatus signStatus={signStatus} signUiState={signUiState} />
      )}
    </Wrapper>
  )
}
