import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { colorsV3 } from '@hedviginsurance/brand'

import {
  useAppliedCampaignQuery,
  useAddCampaignCodeMutation,
  useRemoveCampaignCodeMutation,
} from 'data/graphql'

import { Button, TextButton } from 'components/buttons'
import { Badge } from 'components/Badge/Badge'
import { OfferData } from 'pages/OfferNew/types'
import { Price } from 'pages/OfferNew/common/price'
import { PriceBreakdown } from 'pages/OfferNew/common/PriceBreakdown'

import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { CampaignCode } from 'utils/campaignCode'

import {
  LARGE_SCREEN_MEDIA_QUERY,
  SMALL_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { isBundle, isNorwegian } from 'pages/OfferNew/utils'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'

import { StartDate } from '../../../OfferNew/Introduction/Sidebar/StartDate'
import { StickyBottomSidebar } from '../../../OfferNew/Introduction/Sidebar/StickyBottomSidebar'
import { CampaignCodeModal } from './CampaignCodeModal'

const SIDEBAR_WIDTH = '26rem'
const SIDEBAR_SPACING_LEFT = '2rem'

const Wrapper = styled.div`
  width: calc(${SIDEBAR_WIDTH} + ${SIDEBAR_SPACING_LEFT});
  max-width: 100%;
  z-index: ${TOP_BAR_Z_INDEX};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-left: ${SIDEBAR_SPACING_LEFT};
    flex-shrink: 0;
  }
`

const Container = styled.div`
  width: ${SIDEBAR_WIDTH};
  max-width: 100%;
  padding: 1.25rem 1rem 1rem 1rem;
  margin-top: 3rem;
  background-color: ${colorsV3.white};
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);

  ${LARGE_SCREEN_MEDIA_QUERY} {
    position: fixed;
    top: 8rem;
    margin-top: 0;
  }
`

const DiscountInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`

const DiscountBadge = styled(Badge)`
  &:not(:last-child) {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`

const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  ${SMALL_SCREEN_MEDIA_QUERY} {
    flex-wrap: nowrap;
  }
`

const Title = styled.h3`
  width: 100%;
  margin: 0 1rem 0 0;
  font-size: 1.375rem;
  line-height: 1.625rem;
  white-space: pre-line;
  color: ${colorsV3.gray900};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`

const Body = styled.div`
  margin-bottom: 2.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`

const BodyTitle = styled.div`
  margin-bottom: 0.75rem;
  color: ${colorsV3.gray900};
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const FooterExtraActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
`

export type SidebarProps = {
  quoteCartId: string
  offerData: OfferData
  refetchOfferData: () => Promise<void>
  onCheckoutOpen: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  quoteCartId,
  offerData,
  refetchOfferData,
  onCheckoutOpen,
}) => {
  const textKeys = useTextKeys()
  const { isoLocale } = useCurrentLocale()

  const [campaignCodeModalIsOpen, setCampaignCodeModalIsOpen] = useState(false)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const { data: campaignData } = useAppliedCampaignQuery({
    variables: { quoteCartId, locale: isoLocale },
  })

  const [addCampaignCode] = useAddCampaignCodeMutation()
  const [removeCampaignCode] = useRemoveCampaignCodeMutation({
    refetchQueries: ['QuoteCart'],
    awaitRefetchQueries: true,
  })

  const campaign = campaignData?.quoteCart.campaign
  const campaignText = campaign?.displayValue ?? ''

  const handleAddCampaignCode = useCallback(
    async (code: string) => {
      const { data: result } = await addCampaignCode({
        variables: { id: quoteCartId, code },
      })
      const hasError = result?.quoteCart_addCampaign.__typename === 'BasicError'

      if (!hasError) {
        CampaignCode.save(code)
      }

      return { hasError }
    },
    [quoteCartId, addCampaignCode],
  )

  const handleRemoveCampaign = useCallback(async () => {
    await removeCampaignCode({ variables: { quoteCartId } })
    CampaignCode.remove()
  }, [quoteCartId, removeCampaignCode])

  const isNorwegianBundle = isBundle(offerData) && isNorwegian(offerData)
  const discounts: Array<React.ReactNode> = [
    ...(isNorwegianBundle ? [textKeys.SIDEBAR_NO_BUNDLE_CAMPAIGN_TEXT()] : []),
    ...(campaignText ? [campaignText] : []),
  ]

  const showRemoveCampaignButton =
    campaign && campaign.incentive?.__typename !== 'NoDiscount'
  const isDiscountPrice =
    campaign?.incentive?.__typename === 'MonthlyCostDeduction' ||
    campaign?.incentive?.__typename === 'PercentageDiscountMonths' ||
    isNorwegianBundle

  return (
    <>
      <ReactVisibilitySensor partialVisibility onChange={setIsSidebarVisible}>
        {() => (
          <Wrapper>
            <Container>
              {discounts.length > 0 ? (
                <DiscountInfo>
                  {discounts.map((text, index) => (
                    <DiscountBadge key={index}>{text}</DiscountBadge>
                  ))}
                </DiscountInfo>
              ) : null}
              <Header>
                <Title>Hedvig</Title>
                <Price
                  isDiscountPrice={isDiscountPrice}
                  monthlyGross={offerData.cost.monthlyGross}
                  monthlyNet={offerData.cost.monthlyNet}
                />
              </Header>
              <Body>
                <PriceBreakdown offerData={offerData} />
                <BodyTitle>{textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}</BodyTitle>
                <StartDate
                  offerData={offerData}
                  refetch={refetchOfferData}
                  modal={true}
                  size="sm"
                />
              </Body>
              <Footer>
                <Button
                  size="sm"
                  fullWidth
                  onClick={onCheckoutOpen}
                  foreground={colorsV3.gray900}
                  background={colorsV3.purple500}
                >
                  {textKeys.SIDEBAR_PROCEED_BUTTON()}
                </Button>

                <FooterExtraActions>
                  {!campaign && (
                    <TextButton
                      onClick={() => setCampaignCodeModalIsOpen(true)}
                    >
                      {textKeys.SIDEBAR_ADD_CAMPAIGN_BUTTON()}
                    </TextButton>
                  )}
                  {showRemoveCampaignButton && (
                    <TextButton
                      color={colorsV3.red500}
                      onClick={handleRemoveCampaign}
                    >
                      {textKeys.SIDEBAR_REMOVE_CAMPAIGN_BUTTON()}
                    </TextButton>
                  )}
                </FooterExtraActions>
              </Footer>
              <CampaignCodeModal
                isOpen={campaignCodeModalIsOpen}
                onClose={() => setCampaignCodeModalIsOpen(false)}
                onAddCampaignCode={handleAddCampaignCode}
              />
            </Container>
          </Wrapper>
        )}
      </ReactVisibilitySensor>
      <StickyBottomSidebar
        isVisible={!isSidebarVisible}
        onCheckoutOpen={onCheckoutOpen}
      />
    </>
  )
}
