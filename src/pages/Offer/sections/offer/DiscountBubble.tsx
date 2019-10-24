import { colors } from '@hedviginsurance/brand'
import { OfferData } from 'containers/OfferContainer'
import {
  isFreeMonths,
  isMonthlyCostDeduction,
  isNoDiscount,
} from 'containers/types'
import * as React from 'react'
import styled, { keyframes } from 'react-emotion'

const bubbleKeyframe = keyframes`
  from {
    transform: translateX(-50px) translateY(-50px) scale(0);
    opacity: 0;
  }
  to {
    transform: translateX(-50px) translateY(-50px);
    opacity: 1
  }
`

const bubbleKeyframeResponsive = keyframes`
  from {
    transform: translateX(-50%) translateY(-24px) scale(0);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(-24px);
    opacity: 1
  }
`

const DiscountBubbleWrapper = styled('div')({
  position: 'absolute',
  height: 100,
  width: 100,
  backgroundColor: colors.PINK,
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  borderRadius: 50,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  animation: `${bubbleKeyframe} 0.3s ease-out forwards`,
  transform: 'translateX(-50px) translateY(-50px)',
  '@media (max-width: 900px)': {
    width: '90%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-24px)',
    height: 48,
    borderRadius: 10,
    animation: `${bubbleKeyframeResponsive} 0.3s ease-out forwards`,
  },
})

const DiscountBubbleTitle = styled('p')({
  color: colors.OFF_WHITE,
  fontSize: '0.75em',
  fontWeight: 'normal',
  lineHeight: 1,
  margin: 0,
  textAlign: 'center',
})

const DiscountBubbleText = styled('p')({
  color: colors.OFF_WHITE,
  fontSize: '1em',
  lineHeight: 1,
  textAlign: 'center',
  margin: '5px 0 0 0',
  '@media (max-width: 900px)': {
    margin: 0,
  },
})

interface DiscountBubbleProps {
  offer: OfferData
}

export const DiscountBubble: React.FunctionComponent<DiscountBubbleProps> = ({
  offer,
}) =>
  offer.redeemedCampaigns.length > 0 &&
  !isNoDiscount(offer.redeemedCampaigns[0].incentive) ? (
    <DiscountBubbleWrapper>
      {isFreeMonths(offer.redeemedCampaigns[0].incentive) && (
        <DiscountBubbleTitle>Rabatt!</DiscountBubbleTitle>
      )}
      {isMonthlyCostDeduction(offer.redeemedCampaigns[0].incentive) && (
        <DiscountBubbleText>Inbjuden!</DiscountBubbleText>
      )}
      {isFreeMonths(offer.redeemedCampaigns[0].incentive) && (
        <DiscountBubbleText>
          {offer.redeemedCampaigns[0].incentive.quantity} månader gratis!
        </DiscountBubbleText>
      )}
    </DiscountBubbleWrapper>
  ) : null
