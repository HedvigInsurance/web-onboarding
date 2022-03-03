import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useIsQuoteCartValid } from 'utils/hooks/useIsQuoteCartValid'
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
  const { isQuoteCartValid } = useIsQuoteCartValid()

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
