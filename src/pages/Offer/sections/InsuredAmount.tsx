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
})

const BoldInfoText = styled('div')({
  color: colors.BLACK,
  display: 'inline',
  fontWeight: 600,
})
const InfoText = styled('div')({
  color: colors.OFF_BLACK,
  display: 'inline',
})

const rows: ReadonlyArray<{
  titleKey: string
  amountKey: string
}> = [
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
            {rows.map((row, index) => (
              <Row
                key={row.titleKey + row.amountKey}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? colors.OFF_WHITE : colors.WHITE,
                }}
              >
                <Col>
                  <BoldInfoText>
                    <TranslationsConsumer textKey={row.titleKey}>
                      {(text) => text}
                    </TranslationsConsumer>
                  </BoldInfoText>
                </Col>
                <Col>
                  <InfoText>
                    <TranslationsConsumer textKey={row.amountKey}>
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
