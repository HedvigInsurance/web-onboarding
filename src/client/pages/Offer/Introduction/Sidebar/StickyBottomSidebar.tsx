import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useFeature, Features } from 'utils/hooks/useFeature'
import { Button, LinkButton } from 'components/buttons'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

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

  ${LARGE_SCREEN_MEDIA_QUERY} {
    display: none;
  }
`

const CtaWrapper = styled.div`
  width: 100%;
`

type BooleanSetter = (state: boolean) => void
const avoidDisplayNoneGlitch = (
  setVisible: BooleanSetter,
  setDisplayNone: BooleanSetter,
  isVisible: boolean,
) => {
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
  isLoadingQuoteCart?: boolean
}> = ({ isVisible, onCheckoutOpen, isLoadingQuoteCart }) => {
  const [reallyIsVisible, setReallyIsVisible] = React.useState(false)
  const [displayNone, setDisplayNone] = React.useState(false)
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const { path: localePath } = useCurrentLocale()
  const textKeys = useTextKeys()
  const [isConnectPaymentAtSignEnabled] = useFeature([
    Features.CONNECT_PAYMENT_AT_SIGN,
  ])
  useEffect(() => {
    avoidDisplayNoneGlitch(setReallyIsVisible, setDisplayNone, isVisible)
  }, [isVisible])

  return (
    <Wrapper isVisible={reallyIsVisible} displayNone={displayNone}>
      <CtaWrapper>
        {isConnectPaymentAtSignEnabled ? (
          <LinkButton
            size="sm"
            fullWidth
            to={`/${localePath}/new-member/checkout/details/${quoteCartId}`}
            foreground={colorsV3.gray900}
            background={colorsV3.purple500}
            disabled={isLoadingQuoteCart}
          >
            {textKeys.SIDEBAR_PROCEED_BUTTON()}
          </LinkButton>
        ) : (
          <Button
            size="sm"
            fullWidth
            onClick={onCheckoutOpen}
            foreground={colorsV3.gray900}
            background={colorsV3.purple500}
            disabled={isLoadingQuoteCart}
          >
            {textKeys.SIDEBAR_PROCEED_BUTTON()}
          </Button>
        )}
      </CtaWrapper>
    </Wrapper>
  )
}
