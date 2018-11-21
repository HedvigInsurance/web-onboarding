import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

const ROWWIDTH = 1200
const COLWIDTH = 270
const COLWIDTHSMALL = 250
const COLWIDTHCOLLAPSED = 350

const Card = styled('div')({
  marginTop: '70px',
  paddingBottom: '40px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Header = styled('h1')({
  color: colors.BLACK,
  margin: 0,
  paddingTop: '40px',
  paddingBottom: '30px',
  paddingLeft: '10px',
  paddingRight: '10px',
})

const Image = styled('img')({
  marginBottom: '20px',
  width: COLWIDTH,
  '@media (max-width: 1000px)': {
    width: COLWIDTHSMALL,
  },
  '@media (max-width: 800px)': {
    width: COLWIDTHCOLLAPSED,
  },
  '@media (max-width: 400px)': {
    width: COLWIDTHSMALL,
  },
})

const Col = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: COLWIDTH,
  '@media (max-width: 1000px)': {
    width: COLWIDTHSMALL,
  },
  '@media (max-width: 800px)': {
    width: COLWIDTHCOLLAPSED,
  },
  '@media (max-width: 400px)': {
    width: COLWIDTHSMALL,
  },
})

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'baseline',
  maxWidth: ROWWIDTH,
  '@media (max-width: 800px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Title = styled('div')({
  margin: '0px',
  color: colors.OFF_BLACK,
})

const Paragraph = styled('div')({
  color: colors.DARK_GRAY,
  marginTop: '10px',
})

const cols: ReadonlyArray<{
  imageUrl: string
  titleKey: string
  paragraphKey: string
}> = [
  {
    imageUrl: '/new-member-assets/offering/enkel-overblick.svg',
    titleKey: 'OFFER_INFO_COL_ONE_TITLE',
    paragraphKey: 'OFFER_INFO_COL_ONE_PARAGRAPH',
  },
  {
    imageUrl: '/new-member-assets/offering/snabbt-svar.svg',
    titleKey: 'OFFER_INFO_COL_TWO_TITLE',
    paragraphKey: 'OFFER_INFO_COL_TWO_PARAGRAPH',
  },
  {
    imageUrl: '/new-member-assets/offering/anmal-skador.svg',
    titleKey: 'OFFER_INFO_COL_THREE_TITLE',
    paragraphKey: 'OFFER_INFO_COL_THREE_PARAGRAPH',
  },
]

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
            {cols.map((col) => (
              <Col key={col.titleKey + col.paragraphKey}>
                <Image src={col.imageUrl} />
                <Title>
                  <TranslationsConsumer textKey={col.titleKey}>
                    {(title) => title}
                  </TranslationsConsumer>
                </Title>
                <Paragraph>
                  <TranslationsConsumer textKey={col.paragraphKey}>
                    {(paragraph) => paragraph}
                  </TranslationsConsumer>
                </Paragraph>
              </Col>
            ))}
          </Row>
        </Card>
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
