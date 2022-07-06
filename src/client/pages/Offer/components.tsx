import styled from '@emotion/styled'
import { fonts, colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  MEDIUM_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'

export * from './Checkout/Price/price'

export const Heading = styled('h2')`
  font-family: ${fonts.HEDVIG_LETTERS_STANDARD};
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin: 0;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
  }
`

export const HeadingXS = styled.h3`
  margin: 0;
  font-family: ${fonts.HEDVIG_LETTERS_STANDARD};
  font-size: 1.25rem;
  line-height: 1.2;
  color: ${colorsV3.gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
  }
`

export const HeadingBlack = styled(Heading)`
  color: ${colorsV3.gray900};
`

export const HeadingWrapper = styled('div')`
  margin-bottom: 1.5rem;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    margin-bottom: 3.5rem;
  }
`

export const Body = styled('p')`
  color: ${colorsV3.gray700};
  font-size: 1rem;
  line-height: 1.5;

  margin: 0.5rem 0 0;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.125rem;
    margin-top: 1.5rem;
  }
`

export const ContainerWrapper = styled.div`
  padding-top: 5rem;
  background-color: ${colorsV3.gray100};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-top: 7.5rem;
  }
`

export const Container = styled('div')`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  max-width: 80rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
  position: relative;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding: 0 2rem;
    flex-direction: row;
  }
`

export const Column = styled('div')`
  display: flex;
  flex-direction: column;
  max-width: 47.5rem;
  width: 100%;
  flex-grow: 0;
  box-sizing: border-box;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-right: 1rem;
  }
`

export const ColumnSpacing = styled('div')`
  width: 26rem;
  flex-shrink: 0;
`

const SectionWrapper = styled.section`
  width: 100%;
  position: relative;
`

export const Section: React.FC = ({ children }) => (
  <SectionWrapper>{children}</SectionWrapper>
)
