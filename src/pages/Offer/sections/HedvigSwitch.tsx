import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

const ROWWIDTH = 1200
const PARAGRAPHWIDTH = 250
const TITLEWIDTH = 210
const IMAGESIDE = 72

const Card = styled('div')({
  marginTop: '70px',
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

const Paragraph = styled('p')({
  marginTop: '0px',
  marginBottom: '0px',
  fontSize: '14px',
  textAlign: 'center',
  maxWidth: PARAGRAPHWIDTH,
  color: colors.DARK_GRAY,
})

const Title = styled('h3')({
  marginBottom: '10px',
  fontSize: '25px',
  textAlign: 'center',
  color: colors.WHITE,
  maxWidth: TITLEWIDTH,
  zIndex: 2,
  position: 'absolute',
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

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const ImageIcon = styled('img')({
  marginBottom: '10px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: IMAGESIDE,
  height: IMAGESIDE,
  zIndex: 1,
  position: 'relative',
})

export const HedvigSwitch: React.SFC = () => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapper>
        <Card>
          <HeaderWrapper>
            <Header>
              <TranslationsConsumer textKey="OFFER_SWITCH_TITLE">
                {(title) => title}
              </TranslationsConsumer>
            </Header>
          </HeaderWrapper>
          <Row>
            <Col>
              <ImageIcon src="assets/offering/hedvig-dot-1.svg" />
              <Title>1</Title>
              <Paragraph>
                <TranslationsConsumer textKey="OFFER_SWITCH_COL_ONE_PARAGRAPH">
                  {(paragraph) => paragraph}
                </TranslationsConsumer>
              </Paragraph>
            </Col>
            <Col>
              <ImageIcon src="assets/offering/hedvig-dot-2.svg" />
              <Title>2</Title>
              <Paragraph>
                <TranslationsConsumer textKey="OFFER_SWITCH_COL_TWO_PARAGRAPH">
                  {(paragraph) => paragraph}
                </TranslationsConsumer>
              </Paragraph>
            </Col>
            <Col>
              <ImageIcon src="assets/offering/hedvig-dot-3.svg" />
              <Title>3</Title>
              <Paragraph>
                <TranslationsConsumer textKey="OFFER_SWITCH_COL_THREE_PARAGRAPH">
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
