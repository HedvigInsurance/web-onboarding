import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import Sticky from 'react-sticky-el'
import {
  Column,
  Container,
  HeadingWhite,
  HeadingWrapper,
  PreHeading,
} from './components'
import { useDocumentScroll } from '../../utils/hooks/useDocumentScroll'

const Wrapper = styled.div`
  width: 100%;
  height: 53rem;
  padding: 12.5rem 0 5rem 0;
  background-color: ${colorsV2.black};
  position: relative;
  box-sizing: border-box;
`

const SummaryBoxWrapper = styled.div<{ sticky: boolean }>`
  position: absolute;
  right: 0;
`

const SummaryBoxContainer = styled.div<{ sticky: boolean }>`
  width: 26rem;
  height: 31rem;
  background-color: ${colorsV2.white};
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
`

export const Introduction = () => {
  const [sidebarIsSticky, setSidebarIsSticky] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  useDocumentScroll(({ currentScrollTop }) => {
    console.log(ref.current && ref.current.offsetTop - 32, currentScrollTop)
    if (ref.current && ref.current.offsetTop - 32 <= currentScrollTop) {
      setSidebarIsSticky(true)
    } else {
      setSidebarIsSticky(false)
    }
  })

  return (
    <Wrapper>
      <Container>
        <Column>
          <HeadingWrapper>
            <PreHeading>Försäkringsförslag</PreHeading>
            <HeadingWhite>
              Tyckte du det där var enkelt? Då skulle du uppleva vår försäkring
            </HeadingWhite>
          </HeadingWrapper>
        </Column>

        <SummaryBoxWrapper ref={ref} sticky={sidebarIsSticky}>
          <SummaryBoxContainer sticky={sidebarIsSticky} />
        </SummaryBoxWrapper>
      </Container>
    </Wrapper>
  )
}
