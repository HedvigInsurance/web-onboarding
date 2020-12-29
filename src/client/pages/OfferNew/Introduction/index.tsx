import React, { useState } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Container, Section } from 'pages/OfferNew/components'
import { OfferData } from 'pages/OfferNew/types'
import { useDocumentScroll } from '../../../utils/hooks/useDocumentScroll'
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
const HERO_HEIGHT = '480px'

const Wrapper = styled.div`
  width: 100%;
  height: ${HERO_HEIGHT};
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
  object-position: -700px -100px;
  opacity: ${({ hasLoaded }) => (hasLoaded ? 0.5 : 0)};
  transition: opacity 0.8s;

  ${MIN_WIDTH_MEDIA_QUERY} {
    /* height: 1000px; */
    object-position: right -88px;
  }
`

const OfferDetails = styled.div`
  margin: 0;
  ${MIN_WIDTH_MEDIA_QUERY} {
    margin-right: 1.875rem;
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
        <Container>
          <OfferDetails />
          <Sidebar
            ref={ref}
            sticky={sidebarIsSticky}
            offerData={offerData}
            refetchOfferData={refetch}
            onCheckoutOpen={onCheckoutOpen}
          />
        </Container>
      </Wrapper>
    </Section>
  )
}
