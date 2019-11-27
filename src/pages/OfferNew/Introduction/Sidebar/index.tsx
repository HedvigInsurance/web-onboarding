import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import { otherCompanies } from '../../mock'
import { PreviousInsurancePicker } from './PreviousInsurancePicker'

interface Props {
  sticky: boolean
}

const Wrapper = styled.div`
  width: 26rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1000;
`

const Container = styled.div<{ sticky: boolean }>`
  width: 26rem;
  background-color: ${colorsV2.white};
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  position: ${(props) => (props.sticky ? `fixed` : `relative`)};
  ${(props) => props.sticky && `top: 6rem;`}
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row;
  padding: 2rem 1.5rem 2rem 2rem;
  align-items: flex-start;
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
  align-items: flex-end;
`

const PriceNumbers = styled.div`
  display: flex;
  flex-flow: row;
  margin-bottom: 0.5rem;
`

const PriceValue = styled.div`
  font-size: 3.5rem;
  line-height: 3.5rem;
  color: ${colorsV2.black};
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

const TextButton = styled.button`
  background: none;
  padding: 0;
  margin: 0;
  color: ${colorsV2.violet500};
  font-size: 0.875rem;
  line-height: 1.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  transition: color 0.1s ease;

  :hover {
    color: ${colorsV2.violet700};
  }

  :focus {
    outline: none;
  }
`

const Body = styled.div`
  padding: 2rem 1rem;
  height: 12rem;
`

const Footer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-flow: column;
  align-items: center;
`

const FooterProceedButton = styled.button`
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 600;
  text-align: center;
  background: ${colorsV2.violet500};
  color: ${colorsV2.white};
  border-radius: 2rem;
  cursor: pointer;
  padding: 1.5rem 4rem;
  transition: background 0.1s ease;
  border: none;

  :hover {
    background: ${colorsV2.violet700};
  }

  :focus {
    outline: none;
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
  ({ sticky }, ref) => {
    console.log(otherCompanies)
    return (
      <Wrapper ref={ref}>
        <Container sticky={sticky}>
          <Header>
            <Summary>
              <PreTitle>Hemförsäkring</PreTitle>
              <Title>Bostadsrätt</Title>
              <SummaryContent>
                <SummaryText>
                  <b>John Doe</b> + 3 pers.
                </SummaryText>
                <SummaryText>Vagnvägen 9, 137 39</SummaryText>
                <TextButton>Visa detaljer</TextButton>
              </SummaryContent>
            </Summary>

            <Price>
              <PriceNumbers>
                <PriceValue>119</PriceValue>
                <PriceSuffix>
                  <PriceUnit>kr</PriceUnit>
                  <PriceInterval>/mån</PriceInterval>
                </PriceSuffix>
              </PriceNumbers>
            </Price>
          </Header>

          <Body>
            <PreviousInsurancePicker insurances={otherCompanies} />
          </Body>

          <Footer>
            <FooterProceedButton>Skaffa Hedvig nu</FooterProceedButton>
            <FooterExtraActions>
              <TextButton>Lägg till rabattkod</TextButton>
            </FooterExtraActions>
          </Footer>
        </Container>
      </Wrapper>
    )
  },
)
