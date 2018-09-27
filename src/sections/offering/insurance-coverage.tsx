import * as React from 'react'
import styled from 'react-emotion'
import { Header, SubTitle, Label } from './price-info'
import { colors, fonts } from '@hedviginsurance/brand'

interface Props {
  headline: string
  subTitle: string
}

const Container = styled('div')({
  paddingTop: '20px',
  backgroundColor: colors.OFF_WHITE,
})

const InnerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const Card = styled('div')({
  marginTop: '20px',
  marginBottom: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: colors.WHITE,
  '@media (max-width: 640px)': {
    minWidth: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

const Row = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: '20px',
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

export const CardHeader = styled('h2')({
  fontFamily: fonts.MERRIWEATHER,
  fontSize: '20px',
  fontWeight: 'normal',
})

const ImageIcon = styled('img')({
  marginBottom: '20px',
  marginTop: '20px',
  marginRight: '30px',
  marginLeft: '30px',
  width: '72px',
  height: '72px',
})

export const InsuranceCoverage: React.SFC<Props> = (props) => (
  <Container>
    <Header>{props.headline}</Header>
    <SubTitle>{props.subTitle}</SubTitle>
    <InnerContainer>
      {/* TODO: Use the same components for the three sections, and map the content*/}
      {CARDS.map((card, index) => (
        <Card key={index}>
          <Row>
            <ImageIcon src={card.icon} />
            <CardHeader>{card.name}</CardHeader>
          </Row>
          <Row>

            <Col>
              <ImageIcon src={card.icons.one.image} />
              {card.icons.one.title == 'Hidden' ? (
                <Label style={{ visibility: 'hidden' }}>
                  {card.icons.one.title}
                </Label>
              ) : (
                <Label style={{ visibility: 'visible' }}>
                  {card.icons.one.title}
                </Label>
              )}
            </Col>

            <Col>
              <ImageIcon src={card.icons.two.image} />
              {card.icons.two.title === 'Hidden' ? (
                <Label style={{ visibility: 'hidden' }}>
                  {card.icons.two.title}
                </Label>
              ) : (
                <Label style={{ visibility: 'visible' }}>
                  {card.icons.two.title}
                </Label>
              )}
            </Col>

            <Col>
              <ImageIcon src={card.icons.three.image} />
              {card.icons.three.title === 'Hidden' ? (
                <Label style={{ visibility: 'hidden' }}>
                  {card.icons.three.title}
                </Label>
              ) : (
                <Label style={{ visibility: 'visible' }}>
                  {card.icons.three.title}
                </Label>
              )}
            </Col>

            <Col>
              <ImageIcon src={card.icons.four.image} />
              {card.icons.four.title === 'Hidden' ? (
                <Label style={{ visibility: 'hidden' }}>
                  {card.icons.four.title}
                </Label>
              ) : (
                <Label style={{ visibility: 'visible' }}>
                  {card.icons.four.title}
                </Label>
              )}
            </Col>

            <Col>
              <ImageIcon src={card.icons.five.image} />
              {card.icons.five.title === 'Hidden' ? (
                <Label style={{ visibility: 'hidden' }}>
                  {card.icons.five.title}
                </Label>
              ) : (
                <Label style={{ visibility: 'visible' }}>
                  {card.icons.five.title}
                </Label>
              )}
            </Col>

            <Col>
              <ImageIcon src={card.icons.six.image} />
              {card.icons.six.title === 'Hidden' ? (
                <Label style={{ visibility: 'hidden' }}>
                  {card.icons.six.title}
                </Label>
              ) : (
                <Label style={{ visibility: 'visible' }}>
                  {card.icons.six.title}
                </Label>
              )}
            </Col>
          </Row>
          <Row />
        </Card>
      ))}
    </InnerContainer>
  </Container>
)

const CARDS = [
  {
    name: 'Dig och din familj',
    icon: '/assets/offering/du_och_din_familj.png',
    icons: {
      one: {
        title: 'Juridisk tvist',
        image: '/assets/offering/juridisk_tvist.png',
      },
      two: {
        title: 'Överfall',
        image: '/assets/offering/overfall_2.png',
      },
      three: {
        title: 'Sjuk på resa',
        image: '/assets/offering/sjuk_pa_resa.png',
      },
      four: {
        title: 'Försenad resa',
        image: '/assets/offering/forsenad_resa.png',
      },
      five: {
        title: 'Försenat bagage',
        image: '/assets/offering/forsenad_resa.png',
      },
      six: {
        title: 'Hidden',
        image: '/assets/offering/Oval.png',
      },
    },
  },
  {
    name: 'Din lägenhet',
    icon: '/assets/offering/lagenhet.png',
    icons: {
      one: {
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada.png',
      },
      two: {
        title: 'Inbrott',
        image: '/assets/offering/inbrott.png',
      },
      three: {
        title: 'Oväder',
        image: '/assets/offering/ovader.png',
      },
      four: {
        title: 'Skadedjur',
        image: '/assets/offering/skadedjur.png',
      },
      five: {
        title: 'Hidden',
        image: '/assets/offering/Oval.png',
      },
      six: {
        title: 'Hidden',
        image: '/assets/offering/Oval.png',
      },
    },
  },
  {
    name: 'Dina prylar',
    icon: '/assets/offering/prylar.png',
    icons: {
      one: {
        title: 'Drulle',
        image: '/assets/offering/Drulle.png',
      },
      two: {
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada_green.png',
      },
      three: {
        title: 'Oväder',
        image: '/assets/offering/ovader_green.png',
      },
      four: {
        title: 'Stöld',
        image: '/assets/offering/stold.png',
      },
      five: {
        title: 'Vattenläcka',
        image: '/assets/offering/vattenlacka.png',
      },
      six: {
        title: 'Hidden',
        image: '/assets/offering/Oval.png',
      },
    },
  },
]
