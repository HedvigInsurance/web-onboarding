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
import {
  BREAKPOINTS,
  MEDIUM_LARGE_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { CheckoutPageErrorModal } from './CheckoutPageErrorModal'

const { gray100 } = colorsV3

type Props = {
  children: React.ReactNode
  className?: string
  handleClickBackButton: () => void
}

const Wrapper = styled.div`
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

  ${MEDIUM_LARGE_SCREEN_MEDIA_QUERY} {
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
  background: ${colorsV3.gray200};

  ${MEDIUM_LARGE_SCREEN_MEDIA_QUERY} {
    padding: 6.5rem 2rem;
    background: none !important;
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

export const CheckoutPageWrapper = ({
  children,
  handleClickBackButton,
  className,
}: Props) => {
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.mediumLargeScreen })
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
        <BackButton onClick={handleClickBackButton} />
        <InnerWrapper className={className}>{children}</InnerWrapper>
      </Wrapper>
    </>
  )
}
