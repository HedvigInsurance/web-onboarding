import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

import { BackgroundImage } from 'components/BackgroundImage'
import { Section } from 'pages/OfferNew/components'

import { OfferData } from 'pages/OfferNew/types'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { BundledQuote } from 'src/client/data/graphql'
import { isBundle } from 'pages/OfferNew/utils'

import { HeroOfferDetails } from '../../OfferNew/Introduction/HeroOfferDetails'
import { ExternalInsuranceProvider } from '../../OfferNew/Introduction/ExternalInsuranceProvider'

import { Sidebar } from './Sidebar'

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
  allQuotes: BundledQuote[]
  refetch: () => Promise<void>
  onCheckoutOpen: () => void
}

export const Introduction: React.FC<IntroductionProps> = ({
  quoteCartId,
  offerData,
  allQuotes,
  refetch,
  onCheckoutOpen,
}) => {
  const hasDataCollection =
    !isBundle(offerData) && !!offerData.quotes[0].dataCollectionId

  return (
    <Section>
      <Hero>
        <HeroBackgroundImage zIndex={0} />
        <HeroContentWrapper>
          <ContentContainer>
            <HeroOfferDetailsContainer>
              <HeroOfferDetails
                offerData={offerData}
                allQuotes={allQuotes}
                refetchOfferData={refetch}
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
              quoteCartId={quoteCartId}
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
