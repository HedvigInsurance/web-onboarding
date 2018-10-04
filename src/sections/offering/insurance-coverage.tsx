import { colors, fonts } from '@hedviginsurance/brand'
import { Card } from 'components/offering/card'
import { Header } from 'components/offering/header'
import { SubTitle } from 'components/offering/sub-title'
import { ActionMap, Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'

interface Props {
  headline: string
  subTitle: string
}

const OuterContainer = styled('div')({
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

const DropDownText = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '60px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  maxWidth: '700px',
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
        expandableText:
          '0,0. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 1,
        title: 'Överfall',
        image: '/assets/offering/overfall_2.png',
        expandableText:
          '0,1. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 2,
        title: 'Sjuk på resa',
        image: '/assets/offering/sjuk_pa_resa.png',
        expandableText:
          '0,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 3,
        title: 'Försenad resa',
        image: '/assets/offering/forsenad_resa.png',
        expandableText:
          '0,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 4,
        title: 'Försenat bagage',
        image: '/assets/offering/forsenad_resa.png',
        expandableText:
          '0,4. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
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
        expandableText:
          '1,0. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 1,
        title: 'Inbrott',
        image: '/assets/offering/inbrott.png',
        expandableText:
          '1,1. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 2,
        title: 'Oväder',
        image: '/assets/offering/ovader.png',
        expandableText:
          '1,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 3,
        title: 'Skadedjur',
        image: '/assets/offering/skadedjur.png',
        expandableText:
          '1,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
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
        expandableText:
          '2,0. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 1,
        title: 'Eldsvåda',
        image: '/assets/offering/eldsvada_green.png',
        expandableText:
          '2,1. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 2,
        title: 'Oväder',
        image: '/assets/offering/ovader_green.png',
        expandableText:
          '2,2. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 3,
        title: 'Stöld',
        image: '/assets/offering/stold.png',
        expandableText:
          '2,3. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
      {
        key: 4,
        title: 'Vattenläcka',
        image: '/assets/offering/vattenlacka.png',
        expandableText:
          '2,4. Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
      },
    ],
  },
]

interface State {
  showIconNumber: number
  showPerilNumber: number
  textToShow: string
}
interface Actions {
  handleIconClick: (peril: number, icon: number, text: string) => void
}

export const InsuranceCoverage: React.SFC<Props> = (props) => (
  <OuterContainer>
    <Container<State, ActionMap<State, Actions>>
      initialState={{ showPerilNumber: undefined }}
      actions={{
        handleIconClick: (peril: number, icon: number, text: string) => () => ({
          showPerilNumber: peril,
          showIconNumber: icon,
          textToShow: text,
        }),
      }}
    >
      {(state) => (
        <OuterContainer>
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
                      <Col
                        key={column.key}
                        onClick={() =>
                          state.handleIconClick(
                            card.key,
                            column.key,
                            column.expandableText,
                          )
                        }
                      >
                        <ImageIcon src={column.image} />
                        <Label>{column.title}</Label>
                      </Col>
                    ))}
                  </Row>
                  {state.showPerilNumber === card.key ? (
                    <DropDownText>{state.textToShow}</DropDownText>
                  ) : null}
                </BigRow>
              ))}
            </Card>
          </InnerContainer>
        </OuterContainer>
      )}
    </Container>
  </OuterContainer>
)

export const InsuranceCoverageOld: React.SFC<Props> = (props) => {
  return (
    <OuterContainer>
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
    </OuterContainer>
  )
}
