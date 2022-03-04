import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useIsQuoteCartIdValid } from 'utils/hooks/useIsQuoteCartIdValid'
import { hideIntercomLauncher } from 'utils/intercom.helpers'
import { TopBar } from 'components/TopBar'
import { BackButton } from 'components/BackButton/BackButton'
import { CheckoutPageErrorModal } from './CheckoutPageErrorModal'

const { gray100 } = colorsV3

type Props = {
  children: React.ReactNode
}

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${gray100};
`
const InnerWrapper = styled.div`
  padding: 6.5rem 2rem;
`

export const CheckoutPageWrapper = ({ children }: Props) => {
  const { isQuoteCartValid } = useIsQuoteCartIdValid()

  useEffect(() => {
    hideIntercomLauncher()
  })

  return (
    <>
      {!isQuoteCartValid && <CheckoutPageErrorModal />}
      <Wrapper>
        <InnerWrapper>
          <TopBar isTransparent textColorVariant="dark" />
          <BackButton />
          {children}
        </InnerWrapper>
      </Wrapper>
    </>
  )
}
