import React, { useState, useCallback, useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { CookieStorage } from 'cookie-storage'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { Button, TextButton } from 'components/buttons'
import {
  useRedeemCodeMutation,
  useRedeemedCampaignsQuery,
  useRemoveDiscountCodeMutation,
} from 'data/graphql'
import {
  getDiscountText,
  isMonthlyCostDeduction,
  isNoDiscount,
  isPercentageDiscountMonths,
} from 'pages/OfferNew/Introduction/Sidebar/utils'
import { OfferData } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'
import {
  LARGE_SCREEN_MEDIA_QUERY,
  SMALL_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { Badge } from 'components/Badge/Badge'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'
import { Price } from '../../common/price'
import { PriceBreakdown } from '../../common/PriceBreakdown'

import { isBundle, isNorwegian } from '../../utils'
import { DiscountCodeModal } from './DiscountCodeModal'
import { StartDate } from './StartDate'
import { StickyBottomSidebar } from './StickyBottomSidebar'

export const SIDEBAR_WIDTH = '26rem'
const SIDEBAR_SPACING_LEFT = '2rem'

type Props = {
  offerData: OfferData
  refetchOfferData: () => Promise<void>
  onCheckoutOpen: () => void
}

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

export const Sidebar: React.FC<Props> = ({
  offerData,
  refetchOfferData,
  onCheckoutOpen,
}) => {
  const textKeys = useTextKeys()
  const [discountCodeModalIsOpen, setDiscountCodeModalIsOpen] = useState(false)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const [removeDiscountCode] = useRemoveDiscountCodeMutation()
  const [redeemCode] = useRedeemCodeMutation()
  const {
    data: campaignData,
    refetch: refetchCampaigns,
  } = useRedeemedCampaignsQuery()
  const redeemedCampaigns = campaignData ? campaignData.redeemedCampaigns : []

  const refetchAll = useCallback(async () => {
    await refetchOfferData()
    await refetchCampaigns()
    return
  }, [refetchOfferData, refetchCampaigns])

  useEffect(() => {
    const campaignCodes = campaignData?.redeemedCampaigns.map(
      (campaign) => campaign.code,
    )
    const cookieStorage = new CookieStorage()
    const preRedeemedCode = cookieStorage.getItem('_hvcode')
    if (
      preRedeemedCode &&
      !campaignCodes?.includes(preRedeemedCode.toUpperCase())
    ) {
      redeemCode({ variables: { code: preRedeemedCode } }).then(() =>
        refetchAll(),
      )
    }
  }, [redeemCode, campaignData, refetchAll])

  const isNorwegianBundle = isBundle(offerData) && isNorwegian(offerData)
  const discountText = getDiscountText(textKeys)(
    redeemedCampaigns,
    offerData.cost.monthlyGross.currency,
  )
  const clearDiscountCode = () => {
    removeDiscountCode()
      .then(() => {
        const cookieStorage = new CookieStorage()
        cookieStorage.setItem('_hvcode', '', {
          path: '/',
        })
      })
      .then(() => refetchAll())
  }

  const discounts: Array<React.ReactNode> = [
    ...(isNorwegianBundle ? [textKeys.SIDEBAR_NO_BUNDLE_DISCOUNT_TEXT()] : []),
    ...(discountText ? [discountText] : []),
  ]

  const hasMultipleQuotes = offerData.quotes.length > 1
  const hasRedeemedCampaigns = redeemedCampaigns.length > 0

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
                  isDiscountPrice={
                    isMonthlyCostDeduction(redeemedCampaigns[0]?.incentive) ||
                    isPercentageDiscountMonths(
                      redeemedCampaigns[0]?.incentive,
                    ) ||
                    isNorwegianBundle
                  }
                  monthlyGross={offerData.cost.monthlyGross}
                  monthlyNet={offerData.cost.monthlyNet}
                />
              </Header>
              <Body>
                {hasMultipleQuotes && <PriceBreakdown offerData={offerData} />}
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
                  onClick={() => onCheckoutOpen()}
                  foreground={colorsV3.gray900}
                  background={colorsV3.purple500}
                >
                  {textKeys.SIDEBAR_PROCEED_BUTTON()}
                </Button>

                <FooterExtraActions>
                  {!hasRedeemedCampaigns && (
                    <TextButton
                      onClick={() => setDiscountCodeModalIsOpen(true)}
                    >
                      {textKeys.SIDEBAR_ADD_DISCOUNT_BUTTON()}
                    </TextButton>
                  )}
                  {hasRedeemedCampaigns &&
                    !isNoDiscount(
                      redeemedCampaigns[0]?.incentive ?? undefined,
                    ) && (
                      <TextButton
                        color={colorsV3.red500}
                        onClick={clearDiscountCode}
                      >
                        {textKeys.SIDEBAR_REMOVE_DISCOUNT_BUTTON()}
                      </TextButton>
                    )}
                </FooterExtraActions>
              </Footer>
              <DiscountCodeModal
                isOpen={discountCodeModalIsOpen}
                close={() => setDiscountCodeModalIsOpen(false)}
                refetch={refetchAll}
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
