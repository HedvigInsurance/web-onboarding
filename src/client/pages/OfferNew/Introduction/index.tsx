import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Section } from 'pages/OfferNew/components'
import { OfferData } from 'pages/OfferNew/types'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { isBundle } from '../utils'
import { HeroOfferDetails } from './HeroOfferDetails'
import { Sidebar } from './Sidebar'
import { ExternalInsuranceProvider } from './ExternalInsuranceProvider'

type Props = {
  offerData: OfferData
  refetch: () => Promise<void>
  onCheckoutOpen: () => void
}

type HeroImageProps = {
  hasLoaded: boolean
}

const HERO_HEIGHT = '400px'

const Hero = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colorsV3.gray100};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    height: ${HERO_HEIGHT};
  }
`

const HeroImageWrapper = styled.div`
  width: 100vw;
  height: ${HERO_HEIGHT};
  background-color: ${colorsV3.gray900};
  overflow: hidden;
  position: absolute;
`

const HeroImage = styled.img<HeroImageProps>`
  height: 1000px;
  object-fit: cover;
  object-position: -550px -100px;
  opacity: ${({ hasLoaded }) => (hasLoaded ? 0.5 : 0)};
  transition: opacity 0.8s ease-out;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    height: auto;
    object-position: right -5vw;
  }
`

const HeroContentWrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  position: relative;
  padding-top: 3rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-top: 8rem;
  }
`

const HeroOfferDetailsContainer = styled.div`
  width: 100%;
`

const ContentContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;

  ${LARGE_SCREEN_MEDIA_QUERY} {
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

  const hasDataCollection =
    !isBundle(offerData) && !!offerData.quotes[0].dataCollectionId

  return (
    <Section>
      <Hero>
        <HeroImageWrapper>
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
        </HeroImageWrapper>
        <HeroContentWrapper>
          <ContentContainer>
            <HeroOfferDetailsContainer>
              <HeroOfferDetails offerData={offerData} />
              {hasDataCollection && (
                <ExternalInsuranceProvider
                  dataCollectionId={offerData.quotes[0].dataCollectionId || ''}
                  offerData={offerData}
                />
              )}
            </HeroOfferDetailsContainer>
            <Sidebar
              offerData={offerData}
              refetchOfferData={refetch}
              onCheckoutOpen={onCheckoutOpen}
            />
          </ContentContainer>
        </HeroContentWrapper>
      </Hero>
    </Section>
  )
}
