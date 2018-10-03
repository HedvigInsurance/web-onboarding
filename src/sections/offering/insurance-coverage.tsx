import { colors, fonts } from '@hedviginsurance/brand'
import { Card } from 'components/offering/card'
import { Header } from 'components/offering/header'
import { SubTitle } from 'components/offering/sub-title'
import * as React from 'react'
import styled from 'react-emotion'

interface Props {
  headline: string
  subTitle: string
}

const Container = styled('div')({
  backgroundColor: colors.OFF_WHITE,
})

const InnerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const BigRow = styled('div')({})

const TitleRow = styled('div')({
  marginTop: '30px',
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  '@media (max-width: 700px)': {
    flexDirection: 'column',
  },
})

const Row = styled('div')({
  marginBottom: '30px',
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  '@media (max-width: 700px)': {
    flexFlow: 'wrap',
    justifyContent: 'flex-start',
  },
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '30px',
})

const CardHeader = styled('h2')({
  fontFamily: fonts.MERRIWEATHER,
  fontSize: '18px',
  fontWeight: 'normal',
  maxWidth: '120px',
  textAlign: 'center',
  marginBottom: '0px',
  marginTop: '0px',
})

const ImageIcon = styled('img')({
  marginBottom: '10px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: '72px',
  height: '72px',
})

const Label = styled('p')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  maxWidth: '100px',
  color: colors.DARK_GRAY,
})

const CARDS = [
  {
    key: 0,
    name: 'Dig och din familj',
    icon: '/assets/offering/du_och_din_familj.png',
    icons: [
      {
        key: 0,
        title: 'Juridisk tvist',
        image: '/assets/offering/juridisk_tvist.png',
      },
      {
        key: 1,
        title: 'Överfall',
        image: '/assets/offering/overfall_2.png',
      },
      {
        key: 2,
        title: 'Sjuk på resa',
        image: '/assets/offering/sjuk_pa_resa.png',
      },
      {
        key: 3,
        title: 'Försenad resa',
        image: '/assets/offering/forsenad_resa.png',
      },
      {
        key: 4,
        title: 'Försenat bagage',
        image: '/assets/offering/forsenad_resa.png',
      },
    ],
  },
  {
    key: 1,
    name: 'Din lägenhet',
    icon: '/assets/offering/lagenhet.png',
    icons: [
      {
        key: 0,
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada.png',
      },
      {
        key: 1,
        title: 'Inbrott',
        image: '/assets/offering/inbrott.png',
      },
      {
        key: 2,
        title: 'Oväder',
        image: '/assets/offering/ovader.png',
      },
      {
        key: 3,
        title: 'Skadedjur',
        image: '/assets/offering/skadedjur.png',
      },
    ],
  },
  {
    key: 2,
    name: 'Dina prylar',
    icon: '/assets/offering/prylar.png',
    icons: [
      {
        key: 0,
        title: 'Drulle',
        image: '/assets/offering/Drulle.png',
      },
      {
        key: 1,
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada_green.png',
      },
      {
        key: 2,
        title: 'Oväder',
        image: '/assets/offering/ovader_green.png',
      },
      {
        key: 3,
        title: 'Stöld',
        image: '/assets/offering/stold.png',
      },
      {
        key: 4,
        title: 'Vattenläcka',
        image: '/assets/offering/vattenlacka.png',
      },
    ],
  },
]

export const InsuranceCoverage: React.SFC<Props> = (props) => (
  <Container>
    <InnerContainer>
      <Card>
        <Header>{props.headline}</Header>
        <SubTitle>{props.subTitle}</SubTitle>
        {CARDS.map((card) => (
          <BigRow key={card.key}>
            <TitleRow>
              <Col>
                <ImageIcon src={card.icon} />
                <CardHeader>{card.name}</CardHeader>
              </Col>
            </TitleRow>
            <Row>
              {card.icons.map((column) => (
                <Col key={column.key}>
                  <ImageIcon src={column.image} />
                  <Label>{column.title}</Label>
                </Col>
              ))}
            </Row>
          </BigRow>
        ))}
      </Card>
    </InnerContainer>
  </Container>
)
