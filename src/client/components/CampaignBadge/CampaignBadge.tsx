import React from 'react'
import styled from '@emotion/styled'

import { Badge, BadgeProps } from 'components/Badge/Badge'

import { useAppliedCampaignNameQuery } from 'data/graphql'
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
  quoteCartId: string
  isNorwegianBundle: boolean
}

export const CampaignBadge: React.FC<CampaignBadgeProps> = ({
  className,
  quoteCartId,
  isNorwegianBundle,
  ...others
}) => {
  const { isoLocale } = useCurrentLocale()
  const textKeys = useTextKeys()

  const { data: campaignData, loading } = useAppliedCampaignNameQuery({
    variables: {
      quoteCartId,
      locale: isoLocale,
    },
  })
  const campaignText = campaignData?.quoteCart.campaign?.displayValue ?? ''

  const discounts: Array<React.ReactNode> = [
    ...(isNorwegianBundle ? [textKeys.SIDEBAR_NO_BUNDLE_CAMPAIGN_TEXT()] : []),
    ...(campaignText ? [campaignText] : []),
  ]

  if (loading || discounts.length === 0) return null

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
