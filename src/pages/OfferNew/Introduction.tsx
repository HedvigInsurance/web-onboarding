import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import {
  Column,
  Container,
  HeadingWhite,
  HeadingWrapper,
  PreHeading,
} from './components'
import { Usps } from './Usps'

const Wrapper = styled('div')`
  width: 100%;
  height: 53rem;
  padding: 12.5rem 0 5rem 0;
  background-color: ${colorsV2.black};
  position: relative;
  box-sizing: border-box;
`

const SummaryBox = styled('div')`
  width: 26rem;
  height: 31rem;
  background-color: ${colorsV2.white};
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  right: 0;
  flex-shrink: 0;
`

export const Introduction = () => (
  <Wrapper>
    <Container>
      <Column>
        <HeadingWrapper>
          <PreHeading>Förslag</PreHeading>
          <HeadingWhite>
            Hej Magnus, här är ditt personliga erbjudande
          </HeadingWhite>
        </HeadingWrapper>
        <Usps />
      </Column>
      <SummaryBox />
    </Container>
  </Wrapper>
)
