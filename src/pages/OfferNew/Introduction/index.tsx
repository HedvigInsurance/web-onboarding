import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { OfferData } from 'pages/OfferNew/types'
import * as React from 'react'
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

const Usps = styled('ul')`
  font-size: 1.5rem;
  line-height: 2rem;
  color: ${colorsV3.white};
  font-weight: 300;
`

const Usp = styled('li')`
  padding: 1rem 0;
`

export const Introduction: React.FC<Props> = ({
  offerData,
  refetch,
  onCheckoutOpen,
}) => {
  const [sidebarIsSticky, setSidebarIsSticky] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  // const textKeys = useTextKeys()

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
              <Usp>Drulle ingar</Usp>
              <Usp>Ingen bindningstid, avsluta när som helst</Usp>
              <Usp>Automatisk betalning varje månad</Usp>
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
