import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { Button } from 'new-components/buttons'
import { CompleteOfferDataForMember } from 'pages/OfferNew/types'
import { getInsuranceType, insuranceTypeTextKeys } from 'pages/OfferNew/utils'
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
  z-index: 1010;
  justify-content: space-between;
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

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PreTitle = styled.div`
  color: ${colorsV2.gray};
  font-weight: 200;
  font-size: 0.75rem;
`
const Title = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${colorsV2.black};
`
const Price = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
  color: ${colorsV2.black};
  line-height: 1.25;
`
const PriceUnit = styled.span`
  font-size: 0.75rem;
  color: ${colorsV2.darkgray};
  line-height: 1.25;
`

const CtaWrapper = styled.div`
  padding-right: calc(80px + 1rem);
`
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
  offer: CompleteOfferDataForMember
  onCheckoutOpen: () => void
}> = ({ isVisible, offer, onCheckoutOpen }) => {
  const [reallyIsVisible, setReallyIsVisible] = React.useState(false)
  const [displayNone, setDisplayNone] = React.useState(false)
  React.useEffect(
    avoidDisplayNoneGlitch(setReallyIsVisible, setDisplayNone, isVisible),
    [isVisible],
  )
  const textKeys = useTextKeys()

  return (
    <Wrapper isVisible={reallyIsVisible} displayNone={displayNone}>
      <TextWrapper>
        <PreTitle>{textKeys.SIDEBAR_LABEL()}</PreTitle>
        <Title>
          {textKeys[
            insuranceTypeTextKeys[getInsuranceType(offer.lastQuoteOfMember)]
          ]()}
        </Title>
        <div>
          <Price>
            {Number(offer.lastQuoteOfMember.insuranceCost.monthlyNet.amount)}
            &nbsp;
          </Price>
          <PriceUnit>
            {textKeys.SIDEBAR_PRICE_SUFFIX_UNIT()}
            {textKeys.SIDEBAR_PRICE_SUFFIX_INTERVAL()}
          </PriceUnit>
        </div>
      </TextWrapper>

      <CtaWrapper>
        <Cta onClick={() => onCheckoutOpen()}>
          {textKeys.BOTTOMBAR_GETHEDVIG_BUTTON()}
        </Cta>
      </CtaWrapper>
    </Wrapper>
  )
}
