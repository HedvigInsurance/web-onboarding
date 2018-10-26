import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

const Card = styled('div')({
  marginTop: '70px',
  paddingTop: '30px',
  paddingBottom: '60px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Table = styled('div')({
  marginTop: '20px',
})

const Header = styled('h1')({
  color: colors.BLACK,
  marginTop: '30px',
  marginBottom: '30px',
  fontSize: '32px',
})

const Row = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  marginLeft: '150px',
  marginRight: '150px',
  '@media (max-width: 700px)': {
    marginLeft: '30px',
    marginRight: '30px',
  },
})

const Col = styled('div')({
  display: 'flex',
  paddingTop: '20px',
  paddingBottom: '20px',
  paddingRight: '5px',
  paddingLeft: '5px',
  flexDirection: 'column',
  color: colors.BLACK,
  fontSize: '14px',
})

const BoldInfoText = styled('div')({
  fontSize: '16px',
  color: colors.BLACK,
  display: 'inline',
})
const InfoText = styled('div')({
  fontSize: '16px',
  color: colors.DARK_GRAY,
  display: 'inline',
})

const AMOUNTS = [
  {
    key: 0,
    title: 'OFFER_INSURED_AMOUNT_LIVING',
    amount: 'OFFER_INSURED_AMOUNT_LIVING_AMOUNT',
  },
  {
    key: 1,
    title: 'OFFER_INSURED_AMOUNT_TOTAL',
    amount: 'OFFER_INSURED_AMOUNT_TOTAL_AMOUNT',
  },
  {
    key: 2,
    title: 'OFFER_INSURED_AMOUNT_CLUMSY',
    amount: 'OFFER_INSURED_AMOUNT_CLUMSY_AMOUNT',
  },
  {
    key: 3,
    title: 'OFFER_INSURED_AMOUNT_SELF_RISK',
    amount: 'OFFER_INSURED_AMOUNT_SELF_RISK_AMOUNT',
  },
]

export const InsuredAmount: React.SFC = () => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapper>
        <Card>
          <HeaderWrapper>
            <TranslationsConsumer textKey="OFFER_INSURED_AMOUNT_TITLE">
              {(title) => <Header>{title}</Header>}
            </TranslationsConsumer>
          </HeaderWrapper>
          <Table>
            {AMOUNTS.map((amount) => (
              <Row
                style={{
                  backgroundColor:
                    amount.key % 2 === 0 ? colors.OFF_WHITE : colors.WHITE,
                }}
                key={amount.key}
              >
                <Col>
                  <BoldInfoText>
                    <TranslationsConsumer textKey={amount.title}>
                      {(text) => text}
                    </TranslationsConsumer>
                  </BoldInfoText>
                </Col>
                <Col>
                  <InfoText>
                    <TranslationsConsumer textKey={amount.amount}>
                      {(text) => text}
                    </TranslationsConsumer>
                  </InfoText>
                </Col>
              </Row>
            ))}
          </Table>
        </Card>
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
