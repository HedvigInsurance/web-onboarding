import * as React from 'react'
import styled from 'react-emotion'
import { Col, Row, SubTitle, Title } from './hedvig-info'
import { Card, Container, InnerContainer } from './insured-amount'
import { Header } from './price-info'

interface Props {
  title: string
}

const Spacer = styled('div')({
  marginTop: '40px',
})

export const HedvigSwitch: React.SFC<Props> = (props) => (
  <Container>
    <InnerContainer>
      <Card>
        <Header>{props.title}</Header>
        <Spacer />
        <Row>
          {COLUMNS.map((col, index) => (
            <Col key={index}>
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
    title: '1',
    subTitle:
      'Hedvig kontaktar ditt försäkringsbolag och säger upp din gamla försäkring',
  },
  {
    title: '2',
    subTitle:
      'Vi håller dig uppdaterad och så fort vi vet när din bindningstid tar slut meddlar vi dig',
  },
  {
    title: '3',
    subTitle:
      'Din Hedvig-försäkring aktiveras samma dag som din gamla försäkring går ut',
  },
]
