import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
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

export const CheckoutPageWrapper = ({ children }: Props) => {
  return (
    <Wrapper>
      <BackButton />
      {children}
    </Wrapper>
  )
}
