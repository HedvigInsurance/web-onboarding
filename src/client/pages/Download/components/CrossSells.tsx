import styled from '@emotion/styled'
import React from 'react'
import {
  Description,
  Header,
  ImageFrame,
  LinkCard,
  Image,
  Section,
  Title,
} from 'components/AdditionalProductCard'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { useTextKeys } from 'utils/textKeys'
import { Arrow } from 'components/icons/Arrow'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'
import { useTrackEvent } from 'utils/tracking/gtm/useTrackEvent'
import { useActiveContractBundles } from '../useActiveContractBundles'

const CrossSellSectionHeader = styled.p({
  textTransform: 'uppercase',
  fontSize: '0.875rem',
  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    fontSize: '1rem',
  },
})

const StyledLinkCard = styled(LinkCard)({
  maxWidth: '40rem',
})

const Cta = styled.p({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.875rem',

  [MEDIUM_SCREEN_MEDIA_QUERY]: {
    fontSize: '1rem',
  },
})

export const CrossSells = () => {
  const { crossSells } = useActiveContractBundles()
  const textKeys = useTextKeys()
  const currentLocale = useCurrentLocale()
  const [trackEvent] = useTrackEvent('cross_sell_click')

  if (!crossSells || crossSells.length === 0) return null

  return (
    <div>
      <CrossSellSectionHeader>
        {textKeys.ONBOARDING_CROSS_SELL_HEADER()}
      </CrossSellSectionHeader>
      {crossSells?.map((crossSell) => (
        <StyledLinkCard
          key={crossSell.id}
          href={`/${currentLocale.path}${crossSell.href}`}
          orientation="row"
          onClick={() => trackEvent({ type: crossSell.type })}
        >
          <ImageFrame>
            <Image src={crossSell.image} />
          </ImageFrame>
          <Section>
            <Header>
              <Title>{crossSell.title}</Title>
            </Header>
            <Description>{crossSell.description}</Description>
            <Cta>
              {crossSell.callToAction}{' '}
              <Arrow size="1.25rem" direction="forward" />
            </Cta>
          </Section>
        </StyledLinkCard>
      ))}
    </div>
  )
}
