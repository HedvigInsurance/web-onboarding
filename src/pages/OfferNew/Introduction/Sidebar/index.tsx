import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { OfferData } from 'containers/OfferContainer'
import { isMonthlyCostDeduction } from 'containers/types'
import { Button, TextButton } from 'new-components/buttons'
import * as React from 'react'
import { formatPostalNumber } from 'utils/postalNumbers'
import { DiscountCodeModal } from './DiscountCodeModal'
import { insuranceTypeMapping, otherInsuranceCompanies } from './mock'
import { PreviousInsurancePicker } from './PreviousInsurancePicker'
import { StartDate } from './StartDate'

interface Props {
  sticky: boolean
  offer: OfferData
  refetch: () => void
}

const Wrapper = styled.div`
  width: 26rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  height: 0;

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
  overflow: hidden;
  position: ${(props) => (props.sticky ? `fixed` : `relative`)};
  ${(props) => props.sticky && `top: 6rem;`}

  @media (max-width: 1020px) {
    width: calc(100% + 2rem);
    margin: 0 -1rem;
    position: relative;
    top: 0;
    margin-bottom: 4rem;
  }
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
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
`

const Summary = styled.div`
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
  margin-top: 0.25rem;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`

const SummaryContent = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 1.5rem;
`

const SummaryText = styled.div`
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: ${colorsV2.darkgray};
`

const Price = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 1rem;
  align-items: flex-start;
  position: relative;
`

const PriceNet = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  color: ${colorsV2.gray};
  text-decoration: line-through;
  margin-bottom: 0.5rem;
  position: absolute;
  top: 0;
`

const PriceNumbers = styled.div`
  display: flex;
  flex-flow: row;
  margin-bottom: 0.5rem;
`

const PriceGross = styled.div<{ monthlyConstDeduction: boolean }>`
  font-size: 3.5rem;
  line-height: 3.5rem;
  color: ${(props) =>
    props.monthlyConstDeduction ? colorsV2.grass500 : colorsV2.black};
  font-family: ${fonts.GEOMANIST};
  font-weight: 600;
`

const PriceSuffix = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
  flex-shrink: 0;
  margin-left: 0.5rem;
`

const PriceUnit = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  font-weight: 700;
  color: ${colorsV2.darkgray};
  margin-bottom: 0.25rem;
`

const PriceInterval = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV2.darkgray};
  white-space: nowrap;
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
  display: flex;
  flex-flow: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 2rem 1rem;
  }
`

const FooterExtraActions = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
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
  ({ sticky, offer, refetch }, ref) => {
    const [
      discountCodeModalIsOpen,
      setDiscountCodeModalIsOpen,
    ] = React.useState(false)
    const monthlyConstDeduction =
      offer.redeemedCampaigns.length > 0 &&
      isMonthlyCostDeduction(offer.redeemedCampaigns[0].incentive)

    return (
      <Wrapper ref={ref}>
        <Container sticky={sticky}>
          {offer.redeemedCampaigns.length > 0 && (
            <DiscountInfo>Rabatt</DiscountInfo>
          )}
          <Header>
            <Summary>
              <PreTitle>Hemförsäkring</PreTitle>
              <Title>{insuranceTypeMapping[offer.insurance.type]}</Title>
              <SummaryContent>
                <SummaryText>
                  <b>{`${offer.member.firstName} ${offer.member.lastName}`}</b>
                  {offer.insurance.personsInHousehold - 1 > 0 &&
                    ` + ${offer.insurance.personsInHousehold - 1} pers`}
                </SummaryText>
                <SummaryText>{`${offer.insurance.address}, ${formatPostalNumber(
                  offer.insurance.postalNumber,
                )}`}</SummaryText>
                <TextButton>Visa detaljer</TextButton>
              </SummaryContent>
            </Summary>

            <Price>
              {monthlyConstDeduction && (
                <PriceNet>
                  {Number(offer.insurance.cost.monthlyNet.amount)}kr/mån
                </PriceNet>
              )}

              <PriceNumbers>
                <PriceGross monthlyConstDeduction={monthlyConstDeduction}>
                  {Number(offer.insurance.cost.monthlyNet.amount)}
                </PriceGross>

                <PriceSuffix>
                  <PriceUnit>kr</PriceUnit>
                  <PriceInterval>/mån</PriceInterval>
                </PriceSuffix>
              </PriceNumbers>
            </Price>
          </Header>

          <Body>
            {offer.insurance.insuredAtOtherCompany && (
              <PreviousInsurancePicker insurances={otherInsuranceCompanies} />
            )}
            <StartDate
              insuredAtOtherCompany={offer.insurance.insuredAtOtherCompany}
            />
          </Body>

          <Footer>
            <Button size="lg">Skaffa Hedvig nu</Button>
            <FooterExtraActions>
              <TextButton
                onClick={() => {
                  setDiscountCodeModalIsOpen(true)
                }}
              >
                Lägg till rabattkod
              </TextButton>
            </FooterExtraActions>
          </Footer>

          <DiscountCodeModal
            isOpen={discountCodeModalIsOpen}
            close={() => setDiscountCodeModalIsOpen(false)}
            refetch={refetch}
          />
        </Container>
      </Wrapper>
    )
  },
)
