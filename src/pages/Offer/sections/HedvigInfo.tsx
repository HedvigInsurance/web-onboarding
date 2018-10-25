import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

const ROWWIDTH = 1200
const COLWIDTH = 300
const COLWIDTHSMALL = 250
const COLWIDTHCOLLAPSED = 350

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
  alignItems: 'center',
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
  justifyContent: 'space-evenly',
  alignItems: 'baseline',
  maxWidth: ROWWIDTH,
  '@media (max-width: 800px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Title = styled('h3')({
  margin: '0px',
  fontSize: '14px',
  color: colors.BLACK,
})

const Paragraph = styled('p')({
  fontSize: '14px',
  color: colors.DARK_GRAY,
})

const COLUMNS = [
  {
    key: 0,
    title: 'Enkel överblick',
    paragraph: 'Sköt alla ärenden enkelt och snabbt via Hedvigs app.',
    image: '/assets/offering/enkel_overblick.svg',
  },
  {
    key: 1,
    title: 'Få snabbt svar på frågor',
    paragraph:
      'Sveriges mest tillgängliga försäkrings-support. Oavsett vad du behöver hjälp med finns vi bara ett knapptryck bort.',
    image: '/assets/offering/snabbt_svar.svg',
  },
  {
    key: 2,
    title: 'Anmäl skador direkt i chatten',
    paragraph:
      'Rapportera dina ärenden genom att spela in ett meddelande i vår app.',
    image: '/assets/offering/anmal_skador.svg',
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
            {COLUMNS.map((col) => (
              <Col key={col.key}>
                <Image src={col.image} />
                <Title>{col.title}</Title>
                <Paragraph>{col.paragraph}</Paragraph>
              </Col>
            ))}
          </Row>
        </Card>
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
