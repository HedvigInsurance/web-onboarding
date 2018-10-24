import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

const ROWWIDTH = 1200
const PARAGRAPHWIDTH = 240

const Card = styled('div')({
  paddingTop: '30px',
  paddingBottom: '60px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Header = styled('h1')({
  color: colors.BLACK,
  marginTop: '30px',
  marginBottom: '30px',
  fontSize: '32px',
})

const Image = styled('img')({
  marginBottom: '20px',
  maxWidth: '240px',
  '@media (max-width: 710px)': {
    maxWidth: '300px',
  },
  '@media (max-width: 400px)': {
    maxWidth: '210px',
  },
})

const Col = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'baseline',
  maxWidth: ROWWIDTH,
  '@media (max-width: 710px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Title = styled('h3')({
  margin: '0px',
  fontSize: '14px',
  color: colors.BLACK,
  maxWidth: '240px',
})

const Paragraph = styled('p')({
  fontSize: '14px',
  color: colors.DARK_GRAY,
  maxWidth: PARAGRAPHWIDTH,
})

export const HedvigInfo: React.SFC = () => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapper>
        <Card>
          <HeaderWrapper>
            <Header>
              <TranslationsConsumer textKey="OFFER_HEDVIG_INFO_TITLE">
                {(title) => title}
              </TranslationsConsumer>
            </Header>
          </HeaderWrapper>
          <Row>
            <Col>
              <Image src="/assets/offering/placeholder.svg" />
              <Title>
                <TranslationsConsumer textKey="OFFER_INFO_COL_ONE_TITLE">
                  {(title) => title}
                </TranslationsConsumer>
              </Title>
              <Paragraph>
                <TranslationsConsumer textKey="OFFER_INFO_COL_ONE_PARAGRAPH">
                  {(paragraph) => paragraph}
                </TranslationsConsumer>
              </Paragraph>
            </Col>
            <Col>
              <Image src="/assets/offering/placeholder.svg" />
              <Title>
                <TranslationsConsumer textKey="OFFER_INFO_COL_TWO_TITLE">
                  {(title) => title}
                </TranslationsConsumer>
              </Title>
              <Paragraph>
                <TranslationsConsumer textKey="OFFER_INFO_COL_TWO_PARAGRAPH">
                  {(paragraph) => paragraph}
                </TranslationsConsumer>
              </Paragraph>
            </Col>
            <Col>
              <Image src="/assets/offering/placeholder.svg" />
              <Title>
                <TranslationsConsumer textKey="OFFER_INFO_COL_THREE_TITLE">
                  {(title) => title}
                </TranslationsConsumer>
              </Title>
              <Paragraph>
                <TranslationsConsumer textKey="OFFER_INFO_COL_THREE_PARAGRAPH">
                  {(paragraph) => paragraph}
                </TranslationsConsumer>
              </Paragraph>
            </Col>
          </Row>
        </Card>
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
