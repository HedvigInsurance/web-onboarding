import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

interface Props {
  title: string
}

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

const COLUMNS = [
  {
    key: 0,
    title: 'Anmäl skador och få betalt på nolltid',
    paragraph:
      'Med vår smarta chattbot baserad på AI och maskininlärning kan vi snabbt göra bedömningar av skador och betala ut pengarna till dig utan krångliga formulär eller väntetider.',
    image: '/assets/offering/placeholder.svg',
  },
  {
    key: 1,
    title: 'Schysstare affärsmodell',
    paragraph:
      'Hedvig gör saker annorlunda än andra försäkringsbolag, istället för att överskottet från alla premier går till vår vinst tar vi en månatlig fast avgift. Därför har vi inget incitament till att hålla inne med pengar!',
    image: '/assets/offering/placeholder.svg',
  },
  {
    key: 2,
    title: 'Överskottet går till välgörenhet',
    paragraph:
      'Det som blir över efter årets skadeutbetalningar går till en välgörenhetsorganisation som du själv  väljer.',
    image: '/assets/offering/placeholder.svg',
  },
]

export const HedvigInfo: React.SFC<Props> = (props) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapper>
        <Card>
          <HeaderWrapper>
            <Header>{props.title}</Header>
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
