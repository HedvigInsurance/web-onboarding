import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

import { isBundle } from 'pages/Offer/utils'
import { BackgroundImage } from 'components/BackgroundImage'
import { Section } from 'src/client/pages/Offer/components'

import { OfferData } from 'src/client/pages/Offer/types'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { BundledQuote, CampaignDataFragment } from 'src/client/data/graphql'
import { hasCar } from 'api/quoteBundleSelectors'

import { ExternalInsuranceProvider } from './ExternalInsuranceProvider'

import { Sidebar } from './Sidebar'
import { HeroOfferDetails } from './HeroOfferDetails'

const HERO_HEIGHT_LARGE_SCREEN = 600
const HERO_HEIGHT = 400

const Hero = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colorsV3.gray100};
  height: auto;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    height: ${HERO_HEIGHT_LARGE_SCREEN}px;
  }
`

const HeroContentWrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  position: relative;
  padding-top: 3rem;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-top: 12.5rem;
  }
`

const InsuranceProviderWrapper = styled.div`
  margin-top: 3rem;
`

const HeroOfferDetailsContainer = styled.div`
  width: 100%;
`

const ContentContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding: 0 2rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const HeroBackgroundImage = styled(BackgroundImage)`
  height: ${HERO_HEIGHT}px;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    height: ${HERO_HEIGHT_LARGE_SCREEN}px;
  }
`

export type IntroductionProps = {
  quoteCartId: string
  offerData: OfferData
  campaign?: CampaignDataFragment
  allQuotes: BundledQuote[]
  onCheckoutOpen: () => void
}

export const Introduction: React.FC<IntroductionProps> = ({
  quoteCartId,
  offerData,
  campaign,
  allQuotes,
  onCheckoutOpen,
}) => {
  const hasDataCollection =
    !isBundle(offerData) && !!offerData.quotes[0].dataCollectionId

  return (
    <Section>
      <Hero>
        <HeroBackgroundImage
          zIndex={0}
          variant={hasCar(allQuotes) ? 'car' : 'home'}
        />
        <HeroContentWrapper>
          <ContentContainer>
            <HeroOfferDetailsContainer>
              <HeroOfferDetails
                quoteCartId={quoteCartId}
                offerData={offerData}
                allQuotes={allQuotes}
              />
              {hasDataCollection && (
                <InsuranceProviderWrapper>
                  <ExternalInsuranceProvider
                    dataCollectionId={
                      offerData.quotes[0].dataCollectionId || ''
                    }
                    offerData={offerData}
                  />
                </InsuranceProviderWrapper>
              )}
            </HeroOfferDetailsContainer>
            <Sidebar
              offerData={offerData}
              campaign={campaign}
              onCheckoutOpen={onCheckoutOpen}
            />
          </ContentContainer>
        </HeroContentWrapper>
      </Hero>
    </Section>
  )
}
