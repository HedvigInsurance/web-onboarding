import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { getFormattedPrice } from 'utils/getFormattedPrice'
import { Badge } from 'components/Badge/Badge'
import { MEDIUM_SMALL_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { SubSection } from '../SubSection'
import { Divider } from '../../../shared/Divider'
import { PriceData } from '../../../shared/types'

const { gray700 } = colorsV3
type Props = PriceData

export const Row = styled.div`
  font-size: 0.875rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  line-height: 1.4;
`

const Value = styled.div`
  color: ${gray700};
`
const Label = styled.div``

const StyledBadge = styled(Badge)`
  max-width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${MEDIUM_SMALL_SCREEN_MEDIA_QUERY} {
    overflow: auto;
    max-width: 100%;
`

const HorizontalDivider = styled(Divider)`
  margin: 0.5rem 0;
`

export const YourPlan = ({
  prices,
  totalBundleCost,
  discount,
  currency,
  campaignName,
}: Props) => {
  const textKeys = useTextKeys()
  const { currencyLocale } = useCurrentLocale()
  const formattedPrice = (value: string) => {
    return getFormattedPrice({
      locale: currencyLocale,
      amount: value,
      currency,
    })
  }

  return (
    <SubSection headlineText={textKeys.CHECKOUT_INSURANCE_TITLE()}>
      <>
        {prices.map(({ displayName, price }) => (
          <Row key={displayName}>
            <Label>{displayName}</Label>
            <Value>{formattedPrice(price)}</Value>
          </Row>
        ))}
        {discount && Number(discount) > 0 && (
          <Row>
            <StyledBadge>{campaignName}</StyledBadge>
            <Value>-{formattedPrice(discount)}</Value>
          </Row>
        )}
      </>
      <HorizontalDivider />
      <Row>
        <div>{textKeys.CHECKOUT_PRICE_TOTAL()}</div>
        <Value>{formattedPrice(totalBundleCost)}</Value>
      </Row>
    </SubSection>
  )
}
