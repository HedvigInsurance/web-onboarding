import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useMediaQuery } from 'react-responsive'
import { useIsQuoteCartIdValid } from 'utils/hooks/useIsQuoteCartIdValid'
import { hideIntercomLauncher } from 'utils/intercom.helpers'
import { TopBar } from 'components/TopBar'
import { BackButton } from 'components/BackButton/BackButton'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { BREAKPOINTS, MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { CheckoutPageErrorModal } from './CheckoutPageErrorModal'

const { gray100 } = colorsV3

type Props = {
  children: React.ReactNode
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${gray100};
  position: relative;
  padding: 0;
  margin-bottom: 5rem;

  > button {
    position: absolute;
    left: 1rem;
    top: 1.5rem;
    z-index: 1;
  }

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin-bottom: 0;
    > button {
      top: 6.5rem;
      left: 5rem;
    }
  }
`
const InnerWrapper = styled.div`
  margin: 0 auto;
  position: relative;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    padding: 6.5rem 2rem;
  }
`

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  color: black;
  text-align: center;
  padding: 1.25rem;
`

export const WrapperWidth = 628

export const CheckoutPageWrapper = ({ children }: Props) => {
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.mediumScreen })
  const { isQuoteCartValid } = useIsQuoteCartIdValid()

  useEffect(() => {
    hideIntercomLauncher()
  })

  const { path } = useCurrentLocale()

  return (
    <>
      {!isQuoteCartValid && <CheckoutPageErrorModal />}
      <Wrapper>
        {isDesktop ? (
          <TopBar textColorVariant="dark" isTransparent />
        ) : (
          <LogoLink href={'/' + path}>
            <HedvigLogo width={94} />
          </LogoLink>
        )}
        <BackButton />
        <InnerWrapper>{children}</InnerWrapper>
      </Wrapper>
    </>
  )
}
