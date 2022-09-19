import React, { useState, useCallback, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { colorsV3 } from '@hedviginsurance/brand'

import {
  useAddCampaignCodeMutation,
  useRemoveCampaignCodeMutation,
  CampaignDataFragment,
  useQuoteCartQuery,
} from 'data/graphql'

import { Button, TextButton, LinkButton } from 'components/buttons'
import { CampaignBadge } from 'components/CampaignBadge/CampaignBadge'
import { OfferData } from 'pages/Offer/types'
import { Price } from 'pages/Offer/Checkout/Price/price'
import { PriceBreakdown } from 'pages/Offer/Checkout/Price/PriceBreakdown'

import { useTextKeys } from 'utils/textKeys'
import { CampaignCode } from 'utils/campaignCode'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'

import {
  LARGE_SCREEN_MEDIA_QUERY,
  SMALL_SCREEN_MEDIA_QUERY,
} from 'utils/mediaQueries'
import { TOP_BAR_Z_INDEX } from 'components/TopBar'

import { useFeature, Features } from 'utils/hooks/useFeature'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { TooltipIcon } from 'components/Tooltip/TooltipIcon'
import { hasCurrentInsurer } from 'api/quoteCartQuerySelectors'
import { isCar } from 'api/quoteSelector'
import { isCarSwitcher } from 'api/quoteBundleSelectors'
import { isStartDateValidForCarSwitching } from 'utils/isStartDateValidForCarSwitching'
import { StickyBottomSidebar } from './StickyBottomSidebar'
import { CampaignCodeModal } from './CampaignCodeModal'
import { StartDate, useStartDateProps } from './StartDate'
import { SwitchingNotice } from './SwitchingNotice'
import { useHasScrolledPastElement } from './useHasScrolledPastElement'

const SIDEBAR_WIDTH = '26rem'
const SIDEBAR_SPACING_LEFT = '2rem'
const FIXED_MARGIN = 16

const Wrapper = styled.div`
  width: calc(${SIDEBAR_WIDTH} + ${SIDEBAR_SPACING_LEFT});
  max-width: 100%;
  z-index: ${TOP_BAR_Z_INDEX};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding-left: ${SIDEBAR_SPACING_LEFT};
    flex-shrink: 0;
  }
`

type ContainerProps = {
  stickyToTop?: boolean
  stickyToBottom?: boolean
}

const Container = styled.div(
  ({ stickyToTop, stickyToBottom }: ContainerProps) => ({
    width: SIDEBAR_WIDTH,
    maxWidth: '100%',
    padding: '1.25rem 1rem 1rem 1rem',
    marginTop: '3rem',
    backgroundColor: colorsV3.white,
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',

    [LARGE_SCREEN_MEDIA_QUERY]: stickyToTop
      ? {
          margin: 0,
          position: 'fixed',
          top: `${FIXED_MARGIN}px`,
        }
      : stickyToBottom
      ? {
          margin: 0,
          position: 'fixed',
          bottom: `${FIXED_MARGIN}px`,
        }
      : {
          margin: 0,
          position: 'absolute',
          top: '8rem',
        },
  }),
)

const StyledCampaignBadge = styled(CampaignBadge)`
  margin-bottom: 1rem;
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
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    :hover {
      color: ${colorsV3.gray700};
      cursor: pointer;
    }
  }

  p {
    margin: 0 0.5rem 0 0;
  }
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
  offerData: OfferData
  campaign?: CampaignDataFragment
  onCheckoutOpen: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  offerData,
  campaign,
  onCheckoutOpen,
}) => {
  const { quoteCartId } = useQuoteCartIdFromUrl()
  const textKeys = useTextKeys()
  const { isoLocale, path: localePath } = useCurrentLocale()
  const isCarQuote = offerData.quotes.some((quote) => isCar(quote))

  const { loading: isLoadingQuoteCart } = useQuoteCartQuery({
    variables: {
      id: quoteCartId,
      locale: isoLocale,
    },
    notifyOnNetworkStatusChange: true,
  })
  const [campaignCodeModalIsOpen, setCampaignCodeModalIsOpen] = useState(false)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const [addCampaignCode, addCampaignCodeData] = useAddCampaignCodeMutation({
    refetchQueries: ['QuoteCart'],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true,
  })
  const [
    removeCampaignCode,
    removeCampaignCodeData,
  ] = useRemoveCampaignCodeMutation({
    refetchQueries: ['QuoteCart'],
    awaitRefetchQueries: true,
    notifyOnNetworkStatusChange: true,
  })

  const startDateProps = useStartDateProps()

  const [isConnectPaymentAtSignEnabled] = useFeature([
    Features.CONNECT_PAYMENT_AT_SIGN,
  ])

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
    CampaignCode.remove()
    await removeCampaignCode({ variables: { quoteCartId } })
  }, [quoteCartId, removeCampaignCode])

  useEffect(() => {
    const isMissingCampaignCode = campaign?.code === undefined
    const savedCampaignCode = CampaignCode.get()
    if (savedCampaignCode && isMissingCampaignCode) {
      handleAddCampaignCode(savedCampaignCode)
    }
  }, [handleAddCampaignCode, campaign])

  const containerReference = useRef<HTMLDivElement>(null)
  // This is because the Sidebar might be too high for small screens, therefore
  // we want it to stick to top or bottom of screen when user scrolls past it
  const [isStickyToTop, isStickyToBottom] = useHasScrolledPastElement(
    containerReference,
    {
      margin: FIXED_MARGIN,
    },
  )

  const showRemoveCampaignButton =
    campaign !== undefined && campaign.incentive?.__typename !== 'NoDiscount'
  const isDiscountPrice =
    offerData.cost.monthlyGross.amount !== offerData.cost.monthlyNet.amount

  const isLoadingCampaign =
    addCampaignCodeData.loading || removeCampaignCodeData.loading
  const isLoading =
    isLoadingQuoteCart || isLoadingCampaign || startDateProps.isLoading
  const isSwitcher = hasCurrentInsurer(offerData)
  const [carCancellationEnabled] = useFeature([Features.CAR_CANCELLATION])
  const isSwitchableForCar =
    carCancellationEnabled && isCarSwitcher(offerData.quotes)
  const carStartDate = offerData.quotes.find(isCar)?.startDate

  // we might need to have a different data point for checking current insurer for car... // siau 2022-09-01
  // It seems that `hasCurrentInsurer` returns true for some Car offers even though we do not support that yet. So let's play it safe and just define it as false for now.
  const showSwitchingNotice =
    isCarQuote &&
    isSwitchableForCar &&
    // Show notice if date is valid _or_ user hasn't selected a date yet
    (isStartDateValidForCarSwitching(carStartDate) || !carStartDate)

  return (
    <>
      <ReactVisibilitySensor partialVisibility onChange={setIsSidebarVisible}>
        {() => (
          <Wrapper data-testid="offer-sidebar">
            <Container
              ref={containerReference}
              stickyToBottom={isStickyToBottom}
              stickyToTop={isStickyToTop}
            >
              <StyledCampaignBadge quoteCartId={quoteCartId} />
              <Header>
                <Title>{textKeys.SIDEBAR_TITLE()}</Title>
                <Price
                  isDiscountPrice={isDiscountPrice}
                  monthlyGross={offerData.cost.monthlyGross}
                  monthlyNet={offerData.cost.monthlyNet}
                />
              </Header>
              <Body>
                <PriceBreakdown offerData={offerData} />
                <BodyTitle>
                  {isSwitchableForCar ? (
                    <p>{textKeys.SIDEBAR_STARTDATE_CELL_LABEL_SWITCHER()}</p>
                  ) : (
                    <p>{textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}</p>
                  )}
                  {!isSwitcher && (
                    <TooltipIcon
                      body={textKeys.SIDEBAR_START_DATE_INFO_TEXT()}
                      filled={true}
                      size="1rem"
                    />
                  )}
                </BodyTitle>
                <StartDate {...startDateProps} modal size="sm" />
                {showSwitchingNotice && (
                  <SwitchingNotice
                    isDateValid={isStartDateValidForCarSwitching(carStartDate)}
                  />
                )}
              </Body>
              <Footer>
                {isConnectPaymentAtSignEnabled ? (
                  <LinkButton
                    size="sm"
                    fullWidth
                    to={`/${localePath}/new-member/checkout/details/${quoteCartId}`}
                    foreground={colorsV3.gray900}
                    background={colorsV3.purple500}
                    disabled={isLoading}
                    onClick={(e) => {
                      if (isLoading) e.preventDefault()
                    }}
                  >
                    {textKeys.SIDEBAR_PROCEED_BUTTON()}
                  </LinkButton>
                ) : (
                  <Button
                    size="sm"
                    fullWidth
                    onClick={onCheckoutOpen}
                    foreground={colorsV3.gray900}
                    background={colorsV3.purple500}
                    disabled={isLoading}
                  >
                    {textKeys.SIDEBAR_PROCEED_BUTTON()}
                  </Button>
                )}
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
        isLoadingQuoteCart={isLoading}
      />
    </>
  )
}
