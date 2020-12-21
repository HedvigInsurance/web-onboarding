import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Container, Section } from 'pages/OfferNew/components'
import { OfferData } from 'pages/OfferNew/types'
import { isBundle } from 'pages/OfferNew/utils'
import { useDocumentScroll } from '../../../utils/hooks/useDocumentScroll'
import { ExternalInsuranceProvider } from './ExternalInsuranceProvider'
import { Sidebar } from './Sidebar'

type Props = {
  offerData: OfferData
  refetch: () => Promise<void>
  onCheckoutOpen: () => void
}

type HeroImageProps = {
  hasLoaded: boolean
}

const Wrapper = styled.div`
  width: 100%;
`

const Background = styled.div`
  height: 480px;
  overflow: hidden;
`

const HeroImage = styled.img<HeroImageProps>`
  width: 100%;
  height: auto;
  opacity: ${({ hasLoaded }) => (hasLoaded ? 1 : 0)};
  transition: opacity 0.8s;
`

const DesktopLeadingContainer = styled.div`
  margin-right: 1.875rem;
  display: none;
  width: 100%;
  min-height: 50vh;

  @media (min-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const MobileLeadingContainer = styled.div`
  display: none;
  width: 100%;

  @media (max-width: 1000px) {
    display: block;
  }
`

export const Introduction: React.FC<Props> = ({
  offerData,
  refetch,
  onCheckoutOpen,
}) => {
  const [hasHeroImageLoaded, setHasHeroImageLoaded] = useState(false)
  const [sidebarIsSticky, setSidebarIsSticky] = useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  useDocumentScroll(() => {
    const distanceToTop =
      ref.current !== null
        ? ref.current.getBoundingClientRect().top
        : Math.pow(10, 10)

    if (distanceToTop <= 96) {
      setSidebarIsSticky(true)
    } else {
      setSidebarIsSticky(false)
    }
  })

  const hasDataCollection =
    !isBundle(offerData) && !!offerData.quotes[0].dataCollectionId

  return (
    <Section>
      <Wrapper>
        <Background>
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
          <Container>
            <DesktopLeadingContainer>
              {hasDataCollection && (
                <ExternalInsuranceProvider
                  dataCollectionId={offerData.quotes[0].dataCollectionId || ''}
                  offerData={offerData}
                />
              )}
            </DesktopLeadingContainer>
            <MobileLeadingContainer>
              {hasDataCollection && (
                <ExternalInsuranceProvider
                  dataCollectionId={offerData.quotes[0].dataCollectionId || ''}
                  offerData={offerData}
                />
              )}
            </MobileLeadingContainer>
            <Sidebar
              ref={ref}
              sticky={sidebarIsSticky}
              offerData={offerData}
              refetch={refetch}
              onCheckoutOpen={onCheckoutOpen}
            />
          </Container>
        </Background>
      </Wrapper>
    </Section>
  )
}
