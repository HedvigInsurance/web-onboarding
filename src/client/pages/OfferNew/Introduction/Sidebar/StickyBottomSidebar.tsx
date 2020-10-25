import styled from '@emotion/styled'
import React from 'react'
import { Button } from 'components/buttons'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import { useTextKeys } from 'utils/textKeys'

interface Hidable {
  isVisible: boolean
}

const Wrapper = styled.div<Hidable & { displayNone: boolean }>`
  display: ${({ displayNone }) => (displayNone ? 'none' : 'flex')};
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${TOP_BAR_Z_INDEX};
  justify-content: center;
  transform: ${({ isVisible }) =>
    isVisible ? 'translateY(0)' : 'translateY(100%)'};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0.8)};
  transition: transform 500ms, opacity 500ms;
  height: 135px;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.04);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #fff;
  padding: 1rem 1rem 54px 1rem; // 54px = spacing needed before ios safari opens bottom toolbar

  @media (min-width: 601px) {
    display: none;
  }
`

const CtaWrapper = styled.div`
  width: 100%;
`
const Cta = styled(Button)`
  @media (max-width: 374px) {
    padding: 0.75rem;
  }
`

export const StickyBottomSidebar: React.FC<Hidable & {
  onCheckoutOpen: () => void
}> = ({ isVisible, onCheckoutOpen }) => {
  const [reallyIsVisible, setReallyIsVisible] = React.useState(false)
  const [displayNone, setDisplayNone] = React.useState(false)
  React.useEffect(() => {
    if (isVisible) {
      setDisplayNone(false)
      setTimeout(() => setReallyIsVisible(true), 20)
    } else {
      setReallyIsVisible(false)
      setTimeout(() => {
        setDisplayNone(true)
      }, 500)
    }
  }, [isVisible])
  const textKeys = useTextKeys()

  return (
    <Wrapper isVisible={reallyIsVisible} displayNone={displayNone}>
      <CtaWrapper>
        <Cta fullWidth onClick={() => onCheckoutOpen()}>
          {textKeys.BOTTOMBAR_GETHEDVIG_BUTTON()}
        </Cta>
      </CtaWrapper>
    </Wrapper>
  )
}
