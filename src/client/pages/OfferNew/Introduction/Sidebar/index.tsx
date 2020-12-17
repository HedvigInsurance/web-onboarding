import styled from '@emotion/styled'
import { colorsV2, colorsV3, HedvigSymbol } from '@hedviginsurance/brand'
import { CookieStorage } from 'cookie-storage'
import React from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { Button, TextButton } from 'components/buttons'
import { Market, useMarket } from 'components/utils/CurrentLocale'
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
import { Price } from '../../components'
import { insuranceTypeTextKeys, isBundle } from '../../utils'
import { DetailsModal } from './DetailsModal'
import { DiscountCodeModal } from './DiscountCodeModal'
import { StartDate } from './StartDate'
import { StickyBottomSidebar } from './StickyBottomSidebar'

interface Props {
  sticky: boolean
  offerData: OfferData
  refetch: () => Promise<void>
  onCheckoutOpen: () => void
}

const Wrapper = styled.div`
  width: 26rem;
  flex-shrink: 0;
  position: relative;
  height: 0;
  z-index: 1000;

  @media (max-width: 1020px) {
    width: 100%;
    height: auto;
  }
`

const Container = styled.div<{ sticky: boolean; hasDiscount: boolean }>`
  position: ${(props) => (props.sticky ? `fixed` : `relative`)};
  ${(props) => props.sticky && `top: 6rem`};
  width: 26rem;
  padding: 1rem;
  flex-shrink: 0;
  background-color: ${colorsV3.white};
  border-radius: 8px;
  ${(props) => props.hasDiscount && 'padding-top: 0;'};
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);

  @media (max-width: 1020px) {
    width: 100%;
    position: relative;
    top: 0;
    margin-bottom: 4rem;
  }
`

const DiscountInfo = styled.div`
  width: 100%;
  border-radius: 8px 8px 0 0;
  min-height: 2rem;
  padding: 0.375rem 1rem;
  margin-bottom: 2rem;
  background: ${colorsV2.grass500};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: ${colorsV3.white};
  text-align: center;
`

const HeaderTop = styled.div`
  display: flex;
  margin-bottom: 2rem;
`

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
`

const PreTitle = styled.span`
  display: block;
`

const Title = styled.h3`
  width: 100%;
  margin: 0;
  font-size: 1.5rem;
  line-height: 2rem;
`

const Body = styled.div`
  margin-bottom: 2rem;
  font-size: 0.875rem;
`
const BodyTitle = styled.div`
  margin-bottom: 0.75rem;
  color: ${colorsV3.gray700};
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

export const Sidebar = React.forwardRef<HTMLDivElement, Props>(
  ({ sticky, offerData, refetch, onCheckoutOpen }, ref) => {
    const textKeys = useTextKeys()
    const market = useMarket()
    const [
      discountCodeModalIsOpen,
      setDiscountCodeModalIsOpen,
    ] = React.useState(false)
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(true)

    const [detailsModalIsOpen, setDetailsModalIsOpen] = React.useState(false)

    const [removeDiscountCode] = useRemoveDiscountCodeMutation()
    const [redeemCode] = useRedeemCodeMutation()
    const redeemedCampaignsQuery = useRedeemedCampaignsQuery()
    const redeemedCampaigns =
      redeemedCampaignsQuery.data?.redeemedCampaigns ?? []

    const refetchAll = () =>
      refetch()
        .then(() => redeemedCampaignsQuery.refetch())
        .then(() => {
          return // void
        })

    React.useEffect(() => {
      const campaignCodes =
        redeemedCampaigns.map((campaign) => campaign!.code) ?? []
      const cookieStorage = new CookieStorage()
      const preRedeemedCode = cookieStorage.getItem('_hvcode')
      if (
        preRedeemedCode &&
        !campaignCodes.includes(preRedeemedCode.toUpperCase())
      ) {
        redeemCode({ variables: { code: preRedeemedCode } }).then(() =>
          refetchAll(),
        )
      }
    }, [])

    const discountText = getDiscountText(textKeys)(redeemedCampaigns)

    return (
      <>
        <ReactVisibilitySensor partialVisibility onChange={setIsSidebarVisible}>
          {() => (
            <Wrapper ref={ref}>
              <Container
                sticky={sticky}
                hasDiscount={redeemedCampaigns.length > 0}
              >
                {discountText && <DiscountInfo>{discountText}</DiscountInfo>}
                <HeaderTop>
                  <HedvigSymbol />
                </HeaderTop>

                <Header>
                  <Title>
                    {market === Market.Se && (
                      <PreTitle>{textKeys.SIDEBAR_LABEL()}</PreTitle>
                    )}
                    {!isBundle(offerData) &&
                      textKeys[
                        insuranceTypeTextKeys[offerData.quotes[0].contractType]
                      ]()}
                    {isBundle(offerData) &&
                      textKeys.SIDEBAR_INSURANCE_TYPE_NO_BUNDLE()}
                  </Title>

                  <Price
                    monthlyCostDeduction={
                      isMonthlyCostDeduction(
                        redeemedCampaigns[0]?.incentive ?? undefined,
                      ) ||
                      isPercentageDiscountMonths(
                        redeemedCampaigns[0]?.incentive ?? undefined,
                      )
                    }
                    monthlyGross={offerData.cost.monthlyGross}
                    monthlyNet={offerData.cost.monthlyNet}
                  />
                </Header>

                <TextButton onClick={() => setDetailsModalIsOpen(true)}>
                  {textKeys.SIDEBAR_SHOW_DETAILS_BUTTON()}
                </TextButton>

                <Body>
                  <BodyTitle>
                    {textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}
                  </BodyTitle>
                  <StartDate
                    offerData={offerData}
                    refetch={refetch}
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
                    {textKeys.SIDEBAR_GETHEDVIG_BUTTON()}
                  </Button>

                  <FooterExtraActions>
                    {redeemedCampaigns.length === 0 && (
                      <TextButton
                        color={colorsV3.gray500}
                        onClick={() => {
                          setDiscountCodeModalIsOpen(true)
                        }}
                      >
                        {textKeys.SIDEBAR_ADD_DISCOUNT_BUTTON()}
                      </TextButton>
                    )}
                    {redeemedCampaigns.length > 0 &&
                      !isNoDiscount(
                        redeemedCampaigns[0]?.incentive ?? undefined,
                      ) && (
                        <TextButton
                          color={colorsV3.red500}
                          onClick={() => {
                            removeDiscountCode()
                              .then(() => {
                                const cookieStorage = new CookieStorage()
                                cookieStorage.setItem('_hvcode', '', {
                                  path: '/',
                                })
                              })
                              .then(() => refetchAll())
                          }}
                        >
                          {textKeys.SIDEBAR_REMOVE_DISCOUNT_BUTTON()}
                        </TextButton>
                      )}
                  </FooterExtraActions>
                </Footer>

                <DiscountCodeModal
                  isOpen={discountCodeModalIsOpen}
                  close={() => setDiscountCodeModalIsOpen(false)}
                  refetch={() => refetchAll()}
                />
              </Container>
              <DetailsModal
                offerData={offerData}
                refetch={refetchAll}
                isVisible={detailsModalIsOpen}
                onClose={() => setDetailsModalIsOpen(false)}
              />
            </Wrapper>
          )}
        </ReactVisibilitySensor>
        <StickyBottomSidebar
          isVisible={!isSidebarVisible}
          onCheckoutOpen={onCheckoutOpen}
        />
      </>
    )
  },
)
