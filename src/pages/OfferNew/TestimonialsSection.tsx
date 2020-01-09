import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import {
  Column,
  ColumnSpacing,
  Container,
  Heading,
  PreHeading,
} from './components'

const OuterWrapper = styled.div`
  padding: 5rem 0;
  background-color: ${colorsV2.offwhite};
`

const HeadingWrapper = styled.div``

const ContentWrapper = styled.div`
  padding: 4rem 3rem;
`

const Quote = styled.blockquote`
  border: 1px solid ${colorsV2.lightgray};
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  font-size: 1.125rem;
`
const CiteFooter = styled.footer`
  padding-top: 1rem;
  font-size: 0.875rem;
`
const Cite = styled.cite`
  font-style: normal;
  font-weight: 800;
`

const RatingWrapper = styled.div`
  display: flex;
`
const RatingColumn = styled.div`
  width: 50%;
  padding-right: 1rem;
`
const RatingColumnHeadline = styled.h4`
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
`

const RatingColumnSubHeadline = styled.div`
  color: ${colorsV2.gray};
  margin: 0 0 1rem 0;
`

const TrustpilotScore45: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 312 46"
    width="312"
    height="46"
    className={className}
  >
    <g fill="none" fill-rule="evenodd">
      <path
        fill="#E9ECEF"
        d="M288 37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L288 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362z"
      />
      <path
        fill="#009175"
        d="M288 0v37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L288 0zM24 37.5L9.305 45.225l2.807-16.362L.224 17.275l16.429-2.388L24 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zm66 0l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L90 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zm66 0l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L156 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zm66 0l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L222 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362z"
      />
    </g>
  </svg>
)
const TrustpilotScore20: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 312 46"
    width="312"
    height="46"
    className={className}
  >
    <g fill="none" fill-rule="evenodd">
      <path
        fill="#FF8A80"
        d="M24 37.5L9.305 45.225l2.807-16.362L.224 17.275l16.429-2.388L24 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zm66 0l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L90 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362z"
      />
      <path
        fill="#E9ECEF"
        d="M156 37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L156 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zm66 0l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L222 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zm66 0l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L288 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362z"
      />
    </g>
  </svg>
)

const TrustpilotScore45Styled = styled(TrustpilotScore45)`
  max-width: 100%;
`
const TrustpilotScore20Styled = TrustpilotScore45Styled.withComponent(
  TrustpilotScore20,
)

export const TestimonialsSection: React.FC = () => (
  <OuterWrapper>
    <Container>
      <Column>
        <HeadingWrapper>
          <PreHeading>Nöjdhet</PreHeading>
          <Heading>Vad våra medlemmar säger om varför de valt Hedvig</Heading>
        </HeadingWrapper>
        <ContentWrapper>
          <Quote>
            Bästa företaget jag blivit kund hos någonsin, allt är superenkelt
            samt fantastisk kundservice. Rekommenderar starkt!
            <CiteFooter>
              <Cite>Adam S via Trustpilot</Cite>
            </CiteFooter>
          </Quote>
        </ContentWrapper>
        <RatingWrapper>
          <RatingColumn>
            <RatingColumnHeadline>Hedvig</RatingColumnHeadline>
            <RatingColumnSubHeadline>4,5 på Trustpilot</RatingColumnSubHeadline>
            <TrustpilotScore45Styled />
          </RatingColumn>
          <RatingColumn>
            <RatingColumnHeadline>
              Sveriges 5 största försäkringsbolag
            </RatingColumnHeadline>
            <RatingColumnSubHeadline>2,0 på Trustpilot</RatingColumnSubHeadline>
            <TrustpilotScore20Styled />
          </RatingColumn>
        </RatingWrapper>
      </Column>
      <ColumnSpacing />
    </Container>
  </OuterWrapper>
)
