import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { OfferData } from 'pages/OfferNew/types'
import { isBundle } from 'pages/OfferNew/utils'
import * as React from 'react'
import { useDocumentScroll } from '../../../utils/hooks/useDocumentScroll'
import { Container, Section } from '../components'
import { ExternalInsuranceProvider } from './ExternalInsuranceProvider'
import { Sidebar } from './Sidebar'

import { Usps } from './USPS'

interface Props {
  offerData: OfferData
  refetch: () => Promise<void>
  onCheckoutOpen: () => void
}

const Wrapper = styled.div`
  width: 100%;
  padding: 7rem 0;
  background-color: ${colorsV3.gray900};
  position: relative;
  box-sizing: border-box;

  @media (max-width: 1020px) {
    padding: 7rem 0 7rem 0;
  }

  @media (max-width: 600px) {
    padding: 7rem 0 5rem 0;
  }
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
  const [sidebarIsSticky, setSidebarIsSticky] = React.useState(false)
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
        <Container>
          <DesktopLeadingContainer>
            <Usps />
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
            <Usps />
          </MobileLeadingContainer>
          <Sidebar
            ref={ref}
            sticky={sidebarIsSticky}
            offerData={offerData}
            refetch={refetch}
            onCheckoutOpen={onCheckoutOpen}
          />
        </Container>
      </Wrapper>
    </Section>
  )
}
