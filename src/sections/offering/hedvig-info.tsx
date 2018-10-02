import * as React from 'react'
import styled from 'react-emotion'
import { colors } from '@hedviginsurance/brand'
import { Header } from './price-info'
import { Container, InnerContainer, Card } from './insured-amount'

interface Props {
  title: string
}

export const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'baseline',
  '@media (max-width: 710px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

export const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '30px',
})

const Image = styled('img')({
  margin: '20px',
  maxWidth: '200px',
  '@media (max-width: 710px)': {
    maxWidth: '300px',
  },
  '@media (max-width: 400px)': {
    maxWidth: '200px',
  },
})

export const Title = styled('label')({
  marginBottom: '10px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.BLACK,
  maxWidth: '200px',
})

export const SubTitle = styled('label')({
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  maxWidth: '200px',
})

export const HedvigInfo: React.SFC<Props> = (props) => (
  <Container>
    <InnerContainer>
      <Card>
        <Header>{props.title}</Header>
        <Row>
          {COLUMNS.map((col, index) => (
            <Col key={index}>
              <Image src={col.image} />
              <Title>{col.title}</Title>
              <SubTitle>{col.subTitle}</SubTitle>
            </Col>
          ))}
        </Row>
      </Card>
    </InnerContainer>
  </Container>
)

const COLUMNS = [
  {
    title: 'Anmäl skador snabbt i vår chatt',
    subTitle:
      'Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet.',
    image: '/assets/offering/Placeholder.png',
  },
  {
    title: 'Schyssta villkor som människor förstår',
    subTitle:
      'Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar.',
    image: '/assets/offering/Placeholder.png',
  },
  {
    title: 'Överskottet går till välgörenhet',
    subTitle:
      'Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark och senare med mjukvaror som Aldus PageMaker.',
    image: '/assets/offering/Placeholder.png',
  },
]
