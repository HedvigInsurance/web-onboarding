import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import {
  Column,
  ColumnSpacing,
  Container,
  Heading,
  PreHeading,
} from './components'

const OuterWrapper = styled.div`
  padding: 3rem 0;
  background-color: ${colorsV2.offwhite};

  @media (min-width: 376px) {
    padding: 5rem 0;
  }
`

const HeadingWrapper = styled.div``

const ContentWrapper = styled.div`
  @media (min-width: 400px) {
    padding: 4rem 3rem;
  }
`

const Quote = styled.blockquote`
  border: 1px solid ${colorsV2.lightgray};
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  font-size: 1.125rem;
  margin: 2rem 0;
`
const CiteFooter = styled.footer`
  padding-top: 1rem;
  font-size: 0.875rem;
`
const Cite = styled.cite`
  font-style: normal;
  font-weight: 800;
`

const MobileRatingWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 500px) {
    display: none;
  }
`

const DesktopRatingWrapper = styled.div`
  display: none;

  @media (min-width: 500px) {
    display: table;
    max-width: 100%;
  }
`
const RatingRow = styled.div`
  display: block;
  max-width: 200px;
  margin: auto;
  text-align: center;

  &:not(:last-of-type) {
    padding-bottom: 1rem;
  }

  @media (min-width: 500px) {
    display: table-row;
    text-align: left;
    max-width: none;
    padding-bottom: 0;
  }
`
const RatingGrid = styled.div`
  display: table-cell;
  width: 50%;

  &:last-of-type {
    padding-left: 1rem;
  }
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
    <g fill="none" fillRule="evenodd">
      <path
        fill="#E9ECEF"
        d="M288 37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L288 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362z"
      />
      <path
        fill="#121212"
        d="M288 0v37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L288 0zM24 37.5L9.305 45.225l2.807-16.362L.224 17.275l16.429-2.388L24 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zm66 0l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L90 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zm66 0l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L156 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zm66 0l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L222 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362z"
      />
    </g>
  </svg>
)
const TrustpilotScore15: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="312"
    height="46"
    viewBox="0 0 312 46"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g fill="none" fillRule="evenodd">
      <path
        fill="#121212"
        d="M24 37.5L9.305 45.225l2.807-16.362L.224 17.275l16.429-2.388L24 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362z"
      />
      <path
        fill="#E9ECEF"
        d="M156 37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L156 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zM90 37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L90 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362z"
      />
      <path
        d="M90 0v37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L90 0z"
        fill="#121212"
      />
      <path
        fill="#E9ECEF"
        d="M222 37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L222 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362zM288 37.5l-14.695 7.725 2.807-16.362-11.888-11.588 16.429-2.388L288 0l7.347 14.887 16.43 2.388-11.889 11.588 2.807 16.362z"
      />
    </g>
  </svg>
)

const TrustpilotScore45Styled = styled(TrustpilotScore45)`
  max-width: calc(100% - 1rem);
`
const TrustpilotScore15Styled = TrustpilotScore45Styled.withComponent(
  TrustpilotScore15,
)

export const TestimonialsSection: React.FC = () => {
  const textKeys = useTextKeys()

  return (
    <OuterWrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>{textKeys.OFFER_TESTIMONIAL_PRE_HEADING()}</PreHeading>
            <Heading>{textKeys.OFFER_TESTIMONIAL_HEADING()}</Heading>
          </HeadingWrapper>
          <ContentWrapper>
            <Quote>
              {textKeys.OFFER_TESTIMONIALS_TESTIMONIAL_0()}
              <CiteFooter>
                <Cite>
                  {textKeys.OFFER_TESTIMONIALS_TESTIMONIAL_0_AUTHOR()}
                </Cite>
              </CiteFooter>
            </Quote>
          </ContentWrapper>

          <DesktopRatingWrapper>
            <RatingRow>
              <RatingGrid>
                <RatingColumnHeadline>Hedvig</RatingColumnHeadline>
              </RatingGrid>
              <RatingGrid>
                <RatingColumnHeadline>
                  {textKeys.OFFER_TESTIMONIALS_OTHER_COMPANIES_REVIEW_HEADLINE()}
                </RatingColumnHeadline>
              </RatingGrid>
            </RatingRow>

            <RatingRow>
              <RatingGrid>
                <RatingColumnSubHeadline>
                  {textKeys.OFFER_TESTIMONIALS_HEDVIG_REVIEW_ON_TRUSTPILOT()}
                </RatingColumnSubHeadline>
              </RatingGrid>
              <RatingGrid>
                <RatingColumnSubHeadline>
                  {textKeys.OFFER_TESTIMONIALS_OTHERS_REVIEW_ON_TRUSTPILOT()}
                </RatingColumnSubHeadline>
              </RatingGrid>
            </RatingRow>

            <RatingRow>
              <RatingGrid>
                <TrustpilotScore45Styled />
              </RatingGrid>

              <RatingGrid>
                <TrustpilotScore15Styled />
              </RatingGrid>
            </RatingRow>
          </DesktopRatingWrapper>

          <MobileRatingWrapper>
            <RatingRow>
              <RatingColumnHeadline>Hedvig</RatingColumnHeadline>
              <RatingColumnSubHeadline>
                {textKeys.OFFER_TESTIMONIALS_HEDVIG_REVIEW_ON_TRUSTPILOT()}
              </RatingColumnSubHeadline>
              <TrustpilotScore45Styled />
            </RatingRow>

            <RatingRow>
              <RatingColumnHeadline>
                {textKeys.OFFER_TESTIMONIALS_OTHER_COMPANIES_REVIEW_HEADLINE()}
              </RatingColumnHeadline>
              <RatingColumnSubHeadline>
                {textKeys.OFFER_TESTIMONIALS_OTHERS_REVIEW_ON_TRUSTPILOT()}
              </RatingColumnSubHeadline>
              <TrustpilotScore15Styled />
            </RatingRow>
          </MobileRatingWrapper>
        </Column>
        <ColumnSpacing />
      </Container>
    </OuterWrapper>
  )
}
