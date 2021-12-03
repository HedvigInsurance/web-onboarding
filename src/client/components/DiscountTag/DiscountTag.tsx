import styled from '@emotion/styled'
import React from 'react'
import { useRedeemedCampaignsQuery } from 'data/graphql'
import { getDiscountText } from 'pages/OfferNew/Introduction/Sidebar/utils'
import { OfferData } from 'pages/OfferNew/types'
import { isBundle, isNorwegian } from 'pages/OfferNew/utils'
import { useTextKeys } from 'utils/textKeys'
import { Badge } from '../Badge/Badge'

type DiscountTagProps = {
  offerData: OfferData
}

const DiscountInfo = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;

  *:not(:last-child) {
    margin-right: 0.5rem;
  }
`

const DiscountBadge = styled(Badge)`
  margin-bottom: 0.5rem;
`

export const DiscountTag: React.FC<DiscountTagProps> = ({ offerData }) => {
  const textKeys = useTextKeys()
  const isNorwegianBundle = isBundle(offerData) && isNorwegian(offerData)
  const { data: campaignData } = useRedeemedCampaignsQuery()
  const redeemedCampaigns = campaignData ? campaignData.redeemedCampaigns : []

  const discountText = getDiscountText(textKeys)(
    redeemedCampaigns,
    offerData.cost.monthlyGross.currency,
  )

  const discounts: Array<React.ReactNode> = [
    ...(isNorwegianBundle ? [textKeys.SIDEBAR_NO_BUNDLE_DISCOUNT_TEXT()] : []),
    ...(discountText ? [discountText] : []),
  ]
  return discounts.length > 0 ? (
    <DiscountInfo>
      {discounts.map((text, index) => (
        <DiscountBadge key={index}>{text}</DiscountBadge>
      ))}
    </DiscountInfo>
  ) : null
}
