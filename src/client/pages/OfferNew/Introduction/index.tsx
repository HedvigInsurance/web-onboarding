import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Section } from 'pages/OfferNew/components'
import { OfferData } from 'pages/OfferNew/types'
import { HeroOfferDetails } from './HeroOfferDetails'
import { Sidebar } from './Sidebar'

type Props = {
  offerData: OfferData
  refetch: () => Promise<void>
  onCheckoutOpen: () => void
}

type HeroImageProps = {
  hasLoaded: boolean
}

const MIN_WIDTH_MEDIA_QUERY = '@media screen and (min-width: 1000px)'
const HERO_HEIGHT = '400px'

const Wrapper = styled.div`
  width: 100%;
  height: ${HERO_HEIGHT};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Hero = styled.div`
  width: 100vw;
  height: ${HERO_HEIGHT};
  background: ${colorsV3.gray900};
  overflow: hidden;
  position: absolute;
`

const HeroImage = styled.img<HeroImageProps>`
  height: 1000px;
  object-fit: cover;
  object-position: -550px -100px;
  opacity: ${({ hasLoaded }) => (hasLoaded ? 0.5 : 0)};
  transition: opacity 0.8s;

  ${MIN_WIDTH_MEDIA_QUERY} {
    object-position: right -88px;
  }
`

const HeroContentWrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  position: absolute;
  padding-top: 3rem;

  ${MIN_WIDTH_MEDIA_QUERY} {
    padding-top: 8rem;
  }
`

const ContentContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;

  ${MIN_WIDTH_MEDIA_QUERY} {
    padding: 0 2rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`

export const Introduction: React.FC<Props> = ({
  offerData,
  refetch,
  onCheckoutOpen,
}) => {
  const [hasHeroImageLoaded, setHasHeroImageLoaded] = useState(false)

  return (
    <Section>
      <Wrapper>
        <Hero>
          <HeroImage
            alt="laptop grip"
            onLoad={() => setHasHeroImageLoaded(true)}
            hasLoaded={hasHeroImageLoaded}
            src="/new-member-assets/landing/laptop_grip_small.jpg"
            sizes="100vw"
            srcSet="
          /new-member-assets/landing/laptop_grip_small.jpg 1600w,
          /new-member-assets/landing/laptop_grip_medium.jpg 2200w"
          />
        </Hero>
        <HeroContentWrapper>
          <ContentContainer>
            <HeroOfferDetails {...{ offerData }} />
            <Sidebar
              offerData={offerData}
              refetchOfferData={refetch}
              onCheckoutOpen={onCheckoutOpen}
            />
          </ContentContainer>
        </HeroContentWrapper>
      </Wrapper>
    </Section>
  )
}
