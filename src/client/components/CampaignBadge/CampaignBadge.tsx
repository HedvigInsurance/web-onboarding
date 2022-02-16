import React from 'react'
import styled from '@emotion/styled'

import { Badge, BadgeProps } from 'components/Badge/Badge'

import { useAppliedCampaignNameQuery } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

/* https://coryrylan.com/blog/css-gap-space-with-flexbox */
const InlineFlexGap = styled.div`
  --gap: 0.5rem;
  display: inline-flex;
  flex-wrap: wrap;
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
  width: calc(100% + var(--gap));

  > * {
    margin: var(--gap) 0 0 var(--gap);
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
    <InlineFlexGap className={className}>
      {discounts.map((text, index) => (
        <Badge key={index} {...others}>
          {text}
        </Badge>
      ))}
    </InlineFlexGap>
  )
}
