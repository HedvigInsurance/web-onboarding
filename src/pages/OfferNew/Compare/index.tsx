import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import {
  Column,
  Container,
  HeadingBlack,
  HeadingWrapper,
  PreHeading,
} from '../components'
import { CompareTable } from './CompareTable'
import { hedvigCompany, insuranceProperties, otherCompanies } from './mock'

const Wrapper = styled('div')`
  padding: 80px 0;
  background-color: ${colorsV2.offwhite};
`

export const Compare = () => {
  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>Villkor</PreHeading>
            <HeadingBlack>Jämför gärna!</HeadingBlack>
          </HeadingWrapper>

          <CompareTable
            insuranceProperties={insuranceProperties}
            primaryCompany={hedvigCompany}
            otherCompanies={otherCompanies}
          />
        </Column>
      </Container>
    </Wrapper>
  )
}
