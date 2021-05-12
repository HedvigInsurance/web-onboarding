import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Section } from 'pages/OfferNew/components'
import { OfferData } from 'pages/OfferNew/types'
import { BackgroundImage } from 'components/BackgroundImage'
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

const HERO_HEIGHT = 400

const Hero = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colorsV3.gray100};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    height: ${HERO_HEIGHT}px;
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
  const hasDataCollection =
    !isBundle(offerData) && !!offerData.quotes[0].dataCollectionId

  return (
    <Section>
      <Hero>
        <BackgroundImage zIndex={0} height={HERO_HEIGHT} />
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
