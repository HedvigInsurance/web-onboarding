import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { CookieStorage } from 'cookie-storage'
import {
  useRedeemCodeMutation,
  useRemoveDiscountCodeMutation,
} from 'generated/graphql'
import { Button, TextButton } from 'new-components/buttons'
import {
  getDiscountText,
  isMonthlyCostDeduction,
  isNoDiscount,
  isPercentageDiscountMonths,
} from 'pages/OfferNew/Introduction/Sidebar/utils'
import * as React from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { formatPostalNumber } from 'utils/postalNumbers'
import { Price } from '../../components'
import { CompleteOfferDataForMember } from '../../types'
import { getInsuranceType, insuranceTypeTextKeys } from '../../utils'
import { DetailsModal } from './DetailsModal/index'
import { DiscountCodeModal } from './DiscountCodeModal'
import { StartDate } from './StartDate'
import { StickyBottomSidebar } from './StickyBottomSidebar'

interface Props {
  sticky: boolean
  offer: CompleteOfferDataForMember
  refetch: () => Promise<void>
  onCheckoutOpen: () => void
}

const Wrapper = styled.div`
  width: 26rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
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
  font-family: ${fonts.GEOMANIST};
  font-size: 0.75rem;
  line-height: 0.875rem;
  letter-spacing: 0.075rem;
  color: ${colorsV2.gray};
  text-transform: uppercase;
`

const Title = styled.div`
  font-family: ${fonts.GEOMANIST};
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
  padding: 2rem 1rem;

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
  ({ sticky, offer, refetch, onCheckoutOpen }, ref) => {
    const textKeys = useTextKeys()
    const [
      discountCodeModalIsOpen,
      setDiscountCodeModalIsOpen,
    ] = React.useState(false)
    const [isSidebarVisible, setIsSidebarVisible] = React.useState(true)

    const [detailsModalIsOpen, setDetailsModalIsOpen] = React.useState(false)

    const [removeDiscountCode] = useRemoveDiscountCodeMutation()
    const [redeemCode] = useRedeemCodeMutation()

    React.useEffect(() => {
      const campaignCodes =
        offer.redeemedCampaigns?.map((campaign) => campaign!.code) ?? []
      const cookieStorage = new CookieStorage()
      const preRedeemedCode = cookieStorage.getItem('_hvcode')
      if (
        preRedeemedCode &&
        !campaignCodes.includes(preRedeemedCode.toUpperCase())
      ) {
        redeemCode({ variables: { code: preRedeemedCode } }).then(() =>
          refetch(),
        )
      }
    }, [])

    const discountText = getDiscountText(textKeys)(offer.redeemedCampaigns)

    return (
      <>
        <ReactVisibilitySensor partialVisibility onChange={setIsSidebarVisible}>
          {() => (
            <Wrapper ref={ref}>
              <Container sticky={sticky}>
                {discountText && <DiscountInfo>{discountText}</DiscountInfo>}
                <Header>
                  <Summary>
                    <PreTitle>{textKeys.SIDEBAR_LABEL()}</PreTitle>

                    <Title>
                      {textKeys[
                        insuranceTypeTextKeys[
                          getInsuranceType(offer.lastQuoteOfMember)
                        ]
                      ]()}
                    </Title>

                    <SummaryContent>
                      <SummaryText>
                        <b>{`${offer.lastQuoteOfMember.firstName} ${offer.lastQuoteOfMember.lastName}`}</b>{' '}
                        {offer.lastQuoteOfMember.details.householdSize - 1 >
                          0 &&
                          textKeys.SIDEBAR_INSURED_PERSONS_SUFFIX({
                            AMOUNT:
                              offer.lastQuoteOfMember.details.householdSize - 1,
                          })}
                      </SummaryText>
                      <SummaryText>
                        {`${
                          offer.lastQuoteOfMember.details.street
                        }, ${formatPostalNumber(
                          offer.lastQuoteOfMember.details.zipCode,
                        )}`}
                      </SummaryText>

                      <TextButton onClick={() => setDetailsModalIsOpen(true)}>
                        {textKeys.SIDEBAR_SHOW_DETAILS_BUTTON()}
                      </TextButton>
                    </SummaryContent>
                  </Summary>

                  <Price
                    monthlyCostDeduction={
                      isMonthlyCostDeduction(
                        offer.redeemedCampaigns[0]?.incentive ?? undefined,
                      ) ||
                      isPercentageDiscountMonths(
                        offer.redeemedCampaigns[0]?.incentive ?? undefined,
                      )
                    }
                    monthlyGross={
                      offer.lastQuoteOfMember.insuranceCost.monthlyGross
                    }
                    monthlyNet={
                      offer.lastQuoteOfMember.insuranceCost.monthlyNet
                    }
                  />
                </Header>

                <Body>
                  <StartDate
                    dataCollectionId={offer.lastQuoteOfMember.dataCollectionId}
                    startDate={offer.lastQuoteOfMember.startDate}
                    offerId={offer.lastQuoteOfMember.id}
                    currentInsurer={
                      offer.lastQuoteOfMember.currentInsurer || null
                    }
                    refetch={refetch}
                  />
                </Body>

                <Footer>
                  <Button size="lg" onClick={() => onCheckoutOpen()}>
                    {textKeys.SIDEBAR_GETHEDVIG_BUTTON()}
                  </Button>

                  <FooterExtraActions>
                    {offer.redeemedCampaigns.length === 0 && (
                      <TextButton
                        onClick={() => {
                          setDiscountCodeModalIsOpen(true)
                        }}
                      >
                        {textKeys.SIDEBAR_ADD_DISCOUNT_BUTTON()}
                      </TextButton>
                    )}
                    {offer.redeemedCampaigns.length > 0 &&
                      !isNoDiscount(
                        offer.redeemedCampaigns[0]?.incentive ?? undefined,
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
                              .then(() => refetch())
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
                  refetch={refetch}
                />
              </Container>
              <DetailsModal
                quote={offer.lastQuoteOfMember}
                refetch={refetch}
                isVisible={detailsModalIsOpen}
                onClose={() => setDetailsModalIsOpen(false)}
              />
            </Wrapper>
          )}
        </ReactVisibilitySensor>
        <StickyBottomSidebar
          isVisible={!isSidebarVisible}
          offer={offer}
          onCheckoutOpen={onCheckoutOpen}
        />
      </>
    )
  },
)
