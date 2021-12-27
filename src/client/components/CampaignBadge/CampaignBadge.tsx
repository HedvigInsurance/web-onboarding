import React from 'react'
import styled from '@emotion/styled'

import { Badge, BadgeProps } from 'components/Badge/Badge'

import { useAppliedCampaignNameQuery } from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import { isNorwegianBundle } from 'pages/OfferNew/utils'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

const CampaignBadgeStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;

  & > *:not(:last-child) {
    margin-right: 0.5rem;
  }
`

export type CampaignBadgeProps = Omit<BadgeProps, 'children'> & {
  offerData: OfferData
  quoteCartId: string
}

export const CampaignBadge: React.FC<CampaignBadgeProps> = ({
  className,
  quoteCartId,
  offerData,
  ...others
}) => {
  const { isoLocale } = useCurrentLocale()
  const textKeys = useTextKeys()

  const { data: campaignData, loading } = useAppliedCampaignNameQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
  })
  const campaignText = campaignData?.quoteCart.campaign?.displayValue ?? ''

  if (loading || !campaignText) return null

  const discounts: Array<React.ReactNode> = [
    ...(isNorwegianBundle(offerData)
      ? [textKeys.SIDEBAR_NO_BUNDLE_CAMPAIGN_TEXT()]
      : []),
    ...(campaignText ? [campaignText] : []),
  ]

  return (
    <CampaignBadgeStyled className={className}>
      {discounts.map((text, index) => (
        <Badge key={index} {...others}>
          {text}
        </Badge>
      ))}
    </CampaignBadgeStyled>
  )
}
