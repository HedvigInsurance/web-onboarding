import React from 'react'
import styled from '@emotion/styled'

import { Badge, BadgeProps } from 'components/Badge/Badge'

import { useAppliedCampaignNameQuery } from 'data/graphql'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

/* https://coryrylan.com/blog/css-gap-space-with-flexbox */
const InlineFlexGap = styled.div`
  --gap: 0.5rem;
  display: inline-flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--gap));
  margin-left: calc(-1 * var(--gap));
  width: calc(100% + var(--gap));

  > * {
    margin: var(--gap) 0 0 var(--gap);
  }
`

export type CampaignBadgeProps = Omit<BadgeProps, 'children'> & {
  quoteCartId: string
}

export const CampaignBadge: React.FC<CampaignBadgeProps> = ({
  className,
  quoteCartId,
  ...others
}) => {
  const { isoLocale } = useCurrentLocale()

  const { data: campaignData } = useAppliedCampaignNameQuery({
    variables: {
      quoteCartId,
      locale: isoLocale,
    },
  })
  const campaignText = campaignData?.quoteCart.campaign?.displayValue ?? ''

  if (!campaignText) return null

  return (
    <InlineFlexGap className={className}>
      <Badge {...others}>{campaignText}</Badge>
    </InlineFlexGap>
  )
}
