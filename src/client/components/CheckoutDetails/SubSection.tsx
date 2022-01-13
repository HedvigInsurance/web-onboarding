import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Headline } from '../Headline/Headline'

const { white } = colorsV3

type Props = {
  headlineText: string
  children: React.ReactNode
}

const Wrapper = styled.div`
  display: grid;
  gap: 8px;
`
const Card = styled.div`
  background-color: ${white};
  width: 100%;
  padding: 8px 16px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`

export const SubSection = ({ headlineText, children }: Props) => {
  return (
    <Wrapper>
      <Headline variant="overline" headingLevel="h2">
        {headlineText}
      </Headline>
      <Card>{children}</Card>
    </Wrapper>
  )
}
