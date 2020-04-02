import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Tick } from 'components/icons/Tick'
import { OfferData } from 'pages/OfferNew/types'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { useDocumentScroll } from '../../../utils/hooks/useDocumentScroll'
import { Column, Container, Section } from '../components'
import { Sidebar } from './Sidebar'

interface Props {
  offerData: OfferData
  refetch: () => Promise<void>
  onCheckoutOpen: () => void
}

const Wrapper = styled.div`
  width: 100%;
  padding: 12.5rem 0 7rem 0;
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

const UspsColumn = styled(Column)`
  justify-content: center;
  min-height: 50vh;
`

const Usps = styled.ul`
  font-size: 1.5rem;
  line-height: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  color: ${colorsV3.white};
  font-weight: 300;

  @media (max-width: 600px) {
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
`

const Usp = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin: 0;
  line-height: 1;
`

const TickWrapper = styled.div`
  width: 2em;
  height: 2em;
  margin-right: 1em;
  flex-shrink: 0;
`

export const Introduction: React.FC<Props> = ({
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

  return (
    <Section>
      <Wrapper>
        <Container>
          <UspsColumn>
            <Usps>
              <Usp>
                <TickWrapper>
                  <Tick />
                </TickWrapper>
                {textKeys.OFFER_USPS_USP_0()}
              </Usp>
              <Usp>
                <TickWrapper>
                  <Tick />
                </TickWrapper>
                {textKeys.OFFER_USPS_USP_1()}
              </Usp>
              <Usp>
                <TickWrapper>
                  <Tick />
                </TickWrapper>
                {textKeys.OFFER_USPS_USP_2()}
              </Usp>
            </Usps>
          </UspsColumn>

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
