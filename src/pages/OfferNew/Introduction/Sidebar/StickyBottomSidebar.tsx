import styled from '@emotion/styled'
import { Button } from 'new-components/buttons'
import { TOP_BAR_Z_INDEX } from 'new-components/TopBar'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

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
  padding: 1rem;
  padding-bottom: 54px;

  @media (min-width: 601px) {
    display: none;
  }
`

const CtaWrapper = styled.div``
const Cta = styled(Button)`
  @media (max-width: 374px) {
    padding: 0.75rem;
  }
`

type BooleanSetter = (state: boolean) => void
const avoidDisplayNoneGlitch = (
  setVisible: BooleanSetter,
  setDisplayNone: BooleanSetter,
  isVisible: boolean,
) => () => {
  if (isVisible) {
    setDisplayNone(false)
    setTimeout(() => setVisible(true), 20)
  } else {
    setVisible(false)
    setTimeout(() => {
      setDisplayNone(true)
    }, 500)
  }
}

export const StickyBottomSidebar: React.FC<Hidable & {
  onCheckoutOpen: () => void
}> = ({ isVisible, onCheckoutOpen }) => {
  const [reallyIsVisible, setReallyIsVisible] = React.useState(false)
  const [displayNone, setDisplayNone] = React.useState(false)
  React.useEffect(
    avoidDisplayNoneGlitch(setReallyIsVisible, setDisplayNone, isVisible),
    [isVisible],
  )
  const textKeys = useTextKeys()

  return (
    <Wrapper isVisible={reallyIsVisible} displayNone={displayNone}>
      <CtaWrapper>
        <Cta onClick={() => onCheckoutOpen()}>
          {textKeys.BOTTOMBAR_GETHEDVIG_BUTTON()}
        </Cta>
      </CtaWrapper>
    </Wrapper>
  )
}
