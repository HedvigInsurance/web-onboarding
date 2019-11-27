import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import { useDocumentScroll } from '../../../utils/hooks/useDocumentScroll'
import {
  Column,
  Container,
  HeadingWhite,
  HeadingWrapper,
  PreHeading,
  Section,
} from '../components'
import { Usps } from './Usps'
import { DownArrow } from '../../../components/icons/DownArrow'

const Wrapper = styled.div`
  width: 100%;
  height: 53rem;
  padding: 12.5rem 0 5rem 0;
  background-color: ${colorsV2.black};
  position: relative;
  box-sizing: border-box;
`

const SidebarWrapper = styled.div`
  width: 26rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1000;
`

const Sidebar = styled.div<{ sticky: boolean }>`
  width: 26rem;
  height: 31rem;
  background-color: ${colorsV2.white};
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  position: ${(props) => (props.sticky ? `fixed` : `relative`)};
  ${(props) => props.sticky && `top: 6rem;`}
`

const SidebarHeader = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  padding: 2rem 1.5rem 2rem 2rem;
`

const SidebarHeaderSummary = styled.div`
  width: 100%;
`

const SidebarHeaderSummaryPreTitle = styled.div`
  font-family: ${fonts.GEOMANIST};
  font-size: 0.75rem;
  line-height: 0.875rem;
  letter-spacing: 0.075rem;
  color: ${colorsV2.gray};
  text-transform: uppercase;
`

const SidebarHeaderSummaryTitle = styled.div`
  font-family: ${fonts.GEOMANIST};
  font-size: 2rem;
  font-weight: 500;
  color: ${colorsV2.black};
  margin-top: 0.25rem;
`

const SidebarHeaderPrice = styled.div`
  display: flex;
  flex-flow: row;
  padding-top: 1rem;
`

const SidebarHeaderPriceValue = styled.div`
  font-size: 3.5rem;
  line-height: 3.5rem;
  color: ${colorsV2.black};
  font-family: ${fonts.GEOMANIST};
  font-weight: 600;
`

const SidebarHeaderPriceSuffix = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
  flex-shrink: 0;
  margin-left: 0.5rem;
`

const SidebarHeaderPriceUnit = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  font-weight: 700;
  color: ${colorsV2.darkgray};
  margin-bottom: 0.25rem;
`

const SidebarHeaderPriceInterval = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV2.darkgray};
  white-space: nowrap;
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

  :focus {
    outline: none;
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
        : Math.pow(10, 4)

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

          <SidebarWrapper ref={ref}>
            <Sidebar sticky={sidebarIsSticky}>
              <SidebarHeader>
                <SidebarHeaderSummary>
                  <SidebarHeaderSummaryPreTitle>
                    Hemförsäkring
                  </SidebarHeaderSummaryPreTitle>

                  <SidebarHeaderSummaryTitle>
                    Bostadsrätt
                  </SidebarHeaderSummaryTitle>
                </SidebarHeaderSummary>

                <SidebarHeaderPrice>
                  <SidebarHeaderPriceValue>119</SidebarHeaderPriceValue>
                  <SidebarHeaderPriceSuffix>
                    <SidebarHeaderPriceUnit>kr</SidebarHeaderPriceUnit>
                    <SidebarHeaderPriceInterval>
                      /mån
                    </SidebarHeaderPriceInterval>
                  </SidebarHeaderPriceSuffix>
                </SidebarHeaderPrice>
              </SidebarHeader>
            </Sidebar>
          </SidebarWrapper>
          <ScrollButton onClick={() => {}}>
            Scrolla för mer
            <DownArrow />
          </ScrollButton>
        </Container>
      </Wrapper>
    </Section>
  )
}
