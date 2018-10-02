import * as React from 'react'
import styled from 'react-emotion'
import { Header, SubTitle } from './price-info'
import { colors, fonts } from '@hedviginsurance/brand'
import { Card } from './insured-amount'

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

export const CardHeader = styled('h2')({
  fontFamily: fonts.MERRIWEATHER,
  fontSize: '20px',
  fontWeight: 'normal',
  maxWidth: '100px',
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

export class InsuranceCoverage extends React.Component<Props> {

  constructor(props:any) {
    super(props)

  }


  render() {
    return (
      <Container>
        {/* {this.state.showInfo ? <div>true</div> : null} */}
        <InnerContainer>
          <Card>
            <Header>{this.props.headline}</Header>
            <SubTitle>{this.props.subTitle}</SubTitle>
            {CARDS.map((card, index) => (
              <BigRow key={index}>
                <TitleRow>
                  <Col>
                    <ImageIcon src={card.icon} />
                    <CardHeader>{card.name}</CardHeader>
                  </Col>
                </TitleRow>
                <Row>
                  {card.icons.map((column, index) => (
                    <Col key={index}>
                      <ImageIcon
                        src={column.image}
                      />
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
  }
}

const CARDS = [
  {
    name: 'Dig och din familj',
    icon: '/assets/offering/du_och_din_familj.png',
    icons: [
      {
        title: 'Juridisk tvist',
        image: '/assets/offering/juridisk_tvist.png',
      },
      {
        title: 'Överfall',
        image: '/assets/offering/overfall_2.png',
      },
      {
        title: 'Sjuk på resa',
        image: '/assets/offering/sjuk_pa_resa.png',
      },
      {
        title: 'Försenad resa',
        image: '/assets/offering/forsenad_resa.png',
      },
      {
        title: 'Försenat bagage',
        image: '/assets/offering/forsenad_resa.png',
      },
    ],
  },
  {
    name: 'Din lägenhet',
    icon: '/assets/offering/lagenhet.png',
    icons: [
      {
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada.png',
      },
      {
        title: 'Inbrott',
        image: '/assets/offering/inbrott.png',
      },
      {
        title: 'Oväder',
        image: '/assets/offering/ovader.png',
      },
      {
        title: 'Skadedjur',
        image: '/assets/offering/skadedjur.png',
      },
    ],
  },
  {
    name: 'Dina prylar',
    icon: '/assets/offering/prylar.png',
    icons: [
      {
        title: 'Drulle',
        image: '/assets/offering/Drulle.png',
      },
      {
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada_green.png',
      },
      {
        title: 'Oväder',
        image: '/assets/offering/ovader_green.png',
      },
      {
        title: 'Stöld',
        image: '/assets/offering/stold.png',
      },
      {
        title: 'Vattenläcka',
        image: '/assets/offering/vattenlacka.png',
      },
    ],
  },
]
