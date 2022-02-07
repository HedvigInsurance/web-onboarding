import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { TopBar } from 'components/TopBar'
import { BackButton } from './BackButton'

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
  return (
    <Wrapper>
      <InnerWrapper>
        <TopBar isTransparent textColorVariant="dark" />
        <BackButton />
        {children}
      </InnerWrapper>
    </Wrapper>
  )
}
