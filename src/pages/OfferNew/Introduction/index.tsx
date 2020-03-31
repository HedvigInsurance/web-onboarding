import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { DownArrow } from 'components/icons/DownArrow'
import { CompleteQuote } from 'data/graphql'
import { OfferData, OfferQuote } from 'pages/OfferNew/types'
import * as React from 'react'
import { animateScroll } from 'react-scroll'
import { useDocumentScroll } from 'utils/hooks/useDocumentScroll'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import {
  Column,
  Container,
  HeadingWhite,
  HeadingWrapper,
  PreHeading,
  Section,
} from '../components'
import { ExternalInsuranceProvider } from './ExternalInsuranceProvider'
import { Sidebar } from './Sidebar'
import { Usps } from './Usps'

interface Props {
  offerQuote: OfferQuote
  offerData: OfferData
  refetch: () => Promise<void>
  onCheckoutOpen: () => void
}

const Wrapper = styled.div`
  width: 100%;
  padding: 12.5rem 0 7rem 0;
  background-color: ${colorsV2.black};
  position: relative;
  box-sizing: border-box;

  @media (max-width: 1020px) {
    padding: 7rem 0 7rem 0;
  }

  @media (max-width: 600px) {
    padding: 7rem 0 5rem 0;
  }
`

const UspsMobile = styled(Usps)`
  @media (min-width: 1021px) {
    display: none;
  }
`

const UspsDesktop = styled(Usps)`
  @media (max-width: 1020px) {
    display: none;
  }
`

const scrollButtonKeyframes = keyframes`
  0% {
    transform: translateY(0rem);
  }
  50% {
    transform: translateY(-0.75rem);
  }
  100% {
    transform: translateY(0rem);
  }
`

const ScrollButton = styled.button`
  font-size: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV2.black};
  cursor: pointer;
  border-radius: 28px;
  background: ${colorsV2.lightgray};
  padding: 1rem 1rem 1rem 1.5rem;
  position: absolute;
  border: none;
  z-index: 1;
  left: 1rem;
  bottom: -10.875rem;
  animation: ${scrollButtonKeyframes} 6s ease-in-out infinite;
  transition: background 0.1s ease;

  :focus {
    outline: none;
  }

  :hover {
    background: ${colorsV2.semilightgray};
  }

  svg {
    margin-left: 0.75rem;
    fill: ${colorsV2.black};
  }

  @media (max-width: 600px) {
    bottom: -8.875rem;
  }
`

export const Introduction: React.FC<Props> = ({
  offerQuote,
  offerData,
  refetch,
  onCheckoutOpen,
}) => {
  const [sidebarIsSticky, setSidebarIsSticky] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const textKeys = useTextKeys()

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

  const hasDataCollection = !!offerData.dataCollectionId || false

  return (
    <Section bottomBlobColor={colorsV2.black}>
      <Wrapper>
        <Container>
          <Column>
            <HeadingWrapper>
              <PreHeading>{textKeys.HERO_LABEL()}</PreHeading>
              <HeadingWhite>
                {textKeys.HERO_HEADLINE({
                  FIRST_NAME: offerData.firstName ?? '',
                })}
              </HeadingWhite>
            </HeadingWrapper>
            {hasDataCollection ? (
              <ExternalInsuranceProvider
                dataCollectionId={offerData.dataCollectionId || ''}
                firstQuote={offerData as CompleteQuote}
              />
            ) : (
              <UspsDesktop />
            )}
          </Column>

          <Sidebar
            ref={ref}
            sticky={sidebarIsSticky}
            offerQuote={offerQuote}
            offerData={offerData}
            refetch={refetch}
            onCheckoutOpen={onCheckoutOpen}
          />

          <UspsMobile />

          <ScrollButton
            onClick={() => {
              animateScroll.scrollTo(800)
            }}
          >
            {textKeys.HERO_SCROLL_BUTTON()}
            <DownArrow />
          </ScrollButton>
        </Container>
      </Wrapper>
    </Section>
  )
}
