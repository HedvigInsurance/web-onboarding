import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { Button, TextButton } from 'components/buttons'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { CookieStorage } from 'cookie-storage'
import {
  Campaign,
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
import * as React from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { formatPostalNumber } from 'utils/postalNumbers'
import { Price } from '../../components'
import {
  hasAddress,
  insuranceTypeTextKeys,
  isBundle,
  isSwedishApartment,
  isSwedishHouse,
} from '../../utils'
import { DetailsModal } from './DetailsModal/index'
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

const Container = styled.div<{ sticky: boolean }>`
  width: 26rem;
  background-color: ${colorsV2.white};
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  position: ${(props) => (props.sticky ? `fixed` : `relative`)};
  ${(props) => props.sticky && `top: 6rem`};

  @media (max-width: 1020px) {
    width: 100%;
    position: relative;
    top: 0;
    margin-bottom: 4rem;
  }
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 2rem 1.5rem 2rem 2rem;
  align-items: flex-start;
  position: relative;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`

const DiscountInfo = styled.div`
  width: 100%;
  border-radius: 8px 8px 0 0;
  min-height: 2rem;
  padding: 0.375rem 1rem;
  background: ${colorsV2.grass500};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: ${colorsV2.white};
  text-align: center;
`

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const PreTitle = styled.div`
  font-family: ${fonts.FAVORIT};
  font-size: 0.75rem;
  line-height: 0.875rem;
  letter-spacing: 0.075rem;
  color: ${colorsV2.gray};
  text-transform: uppercase;
`

const Title = styled.div`
  font-family: ${fonts.FAVORIT};
  font-size: 2rem;
  font-weight: 500;
  color: ${colorsV2.black};
  max-width: 50%;
  flex-shrink: 1;
  line-height: 1.25;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`

const SummaryText = styled.div`
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: ${colorsV2.darkgray};
`

const Body = styled.div`
  padding: 2rem;
  padding-top: 0;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`

const Footer = styled.div`
  width: 100%;
  padding: 2rem;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 2rem 1rem;
  }
`

const FooterExtraActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;

  > * {
    margin-right: 1.375rem;
    :last-child {
      margin-right: 0;
    }
  }
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
    const redeemedCampaigns: Campaign[] =
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
              <Container sticky={sticky}>
                {discountText && <DiscountInfo>{discountText}</DiscountInfo>}
                <Header>
                  <Summary>
                    {market !== Market.No && (
                      <PreTitle>{textKeys.SIDEBAR_LABEL()}</PreTitle>
                    )}

                    <Title>
                      {!isBundle(offerData) &&
                        textKeys[
                          insuranceTypeTextKeys[
                            offerData.quotes[0].contractType
                          ]
                        ]()}
                      {isBundle(offerData) &&
                        textKeys.SIDEBAR_INSURANCE_TYPE_NO_BUNDLE()}
                    </Title>

                    <SummaryContent>
                      <SummaryText>
                        <b>{`${offerData.person.firstName} ${offerData.person.lastName}`}</b>{' '}
                        {offerData.person.householdSize - 1 > 0 &&
                          textKeys.SIDEBAR_INSURED_PERSONS_SUFFIX({
                            AMOUNT: offerData.person.householdSize - 1,
                          })}
                      </SummaryText>
                      {hasAddress(offerData) && (
                        <SummaryText>
                          {`${
                            offerData.person.address!.street
                          }, ${formatPostalNumber(
                            offerData.person.address!.zipCode,
                          )}`}
                        </SummaryText>
                      )}

                      {offerData.quotes.map((quote) => {
                        return (
                          (isSwedishHouse(quote.quoteDetails) ||
                            isSwedishApartment(quote.quoteDetails)) && (
                            <TextButton
                              key={quote.id}
                              onClick={() => setDetailsModalIsOpen(true)}
                            >
                              {textKeys.SIDEBAR_SHOW_DETAILS_BUTTON()}
                            </TextButton>
                          )
                        )
                      })}
                    </SummaryContent>
                  </Summary>

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

                <Body>
                  <StartDate
                    offerData={offerData}
                    refetch={refetch}
                    modal={true}
                  />
                </Body>

                <Footer>
                  <Button size="lg" onClick={() => onCheckoutOpen()}>
                    {textKeys.SIDEBAR_GETHEDVIG_BUTTON()}
                  </Button>

                  <FooterExtraActions>
                    {redeemedCampaigns.length === 0 && (
                      <TextButton
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
                          color={colorsV2.coral700}
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
                offerQuote={offerData.quotes[0]}
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
