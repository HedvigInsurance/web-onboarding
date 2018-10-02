import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { Card, Container, InnerContainer } from './insured-amount'
import { Header } from './price-info'

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
  maxWidth: '210px',
  '@media (max-width: 710px)': {
    maxWidth: '300px',
  },
  '@media (max-width: 400px)': {
    maxWidth: '210px',
  },
})

export const Title = styled('label')({
  marginBottom: '10px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.BLACK,
  maxWidth: '210px',
})

export const SubTitle = styled('label')({
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  maxWidth: '210px',
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
    title: 'Anmäl skador och få betalt på nolltid',
    subTitle:
      'Med vår smarta chattbot baserad på AI och maskininlärning kan vi snabbt göra bedömningar av skador och betala ut pengarna till dig utan krångliga formulär eller väntetider.',
    image: '/assets/offering/Placeholder.png',
  },
  {
    title: 'Schysstare affärsmodell',
    subTitle:
      'Hedvig gör saker annorlunda än andra försäkringsbolag, istället för att överskottet från alla premier går till vår vinst tar vi en månatlig fast avgift. Därför har vi inget incitament till att hålla inne med pengar!',
    image: '/assets/offering/Placeholder.png',
  },
  {
    title: 'Överskottet går till välgörenhet',
    subTitle:
      'Det som blir över efter årets skadeutbetalningar går till en välgörenhetsorganisation som du själv  väljer.',
    image: '/assets/offering/Placeholder.png',
  },
]
