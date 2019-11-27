import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { animateScroll } from 'react-scroll'
import { DownArrow } from '../../../components/icons/DownArrow'
import { useDocumentScroll } from '../../../utils/hooks/useDocumentScroll'
import {
  Column,
  Container,
  HeadingWhite,
  HeadingWrapper,
  PreHeading,
  Section,
} from '../components'
import { Sidebar } from './Sidebar'
import { Usps } from './Usps'

const Wrapper = styled.div`
  width: 100%;
  height: 53rem;
  padding: 12.5rem 0 5rem 0;
  background-color: ${colorsV2.black};
  position: relative;
  box-sizing: border-box;
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
  z-index: 100;
  left: 0;
  bottom: -8.875rem;
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
`

export const Introduction = () => {
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

  return (
    <Section bottomBlobColor={colorsV2.black}>
      <Wrapper>
        <Container>
          <Column>
            <HeadingWrapper>
              <PreHeading>Förslag</PreHeading>
              <HeadingWhite>
                Hej Magnus,
                <br /> här är ditt personliga erbjudande
              </HeadingWhite>
            </HeadingWrapper>
            <Usps />
          </Column>

          <Sidebar ref={ref} sticky={sidebarIsSticky} />

          <ScrollButton
            onClick={() => {
              animateScroll.scrollTo(800)
            }}
          >
            Scrolla för mer
            <DownArrow />
          </ScrollButton>
        </Container>
      </Wrapper>
    </Section>
  )
}
