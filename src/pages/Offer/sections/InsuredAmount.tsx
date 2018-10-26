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
  marginBottom: '20px',
  borderBottom: '1px solid ' + colors.LIGHT_GRAY,
  marginLeft: '40px',
  marginRight: '40px',
})

const Col = styled('div')({
  display: 'flex',
  paddingBottom: '10px',
  flexDirection: 'column',
  color: colors.BLACK,
  fontSize: '14px',
})

const rows: ReadonlyArray<{ titleKey: string; amountKey: string }> = [
  {
    titleKey: 'OFFER_INSURED_AMOUNT_COL_ONE_TITLE',
    amountKey: 'OFFER_INSURED_AMOUNT_COL_ONE_AMOUNT',
  },
  {
    titleKey: 'OFFER_INSURED_AMOUNT_COL_TWO_TITLE',
    amountKey: 'OFFER_INSURED_AMOUNT_COL_TWO_AMOUNT',
  },
  {
    titleKey: 'OFFER_INSURED_AMOUNT_COL_THREE_TITLE',
    amountKey: 'OFFER_INSURED_AMOUNT_COL_THREE_AMOUNT',
  },
  {
    titleKey: 'OFFER_INSURED_AMOUNT_COL_FOUR_TITLE',
    amountKey: 'OFFER_INSURED_AMOUNT_COL_FOUR_AMOUNT',
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
            {rows.map((row) => (
              <Row key={row.titleKey + row.amountKey}>
                <Col>
                  <TranslationsConsumer textKey={row.titleKey}>
                    {(title) => title}
                  </TranslationsConsumer>
                </Col>
                <Col>
                  <TranslationsConsumer textKey={row.amountKey}>
                    {(amount) => amount}
                  </TranslationsConsumer>
                </Col>
              </Row>
            ))}
          </Table>
        </Card>
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
