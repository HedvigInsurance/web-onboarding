import { colors } from '@hedviginsurance/brand'
import { Card } from 'components/offering/Card'
import { Header } from 'components/offering/Header'
import { InnerWrapper } from 'components/offering/InnerWrapper'
import { Wrapper } from 'components/offering/Wrapper'
import * as React from 'react'
import styled from 'react-emotion'

interface Props {
  title: string
}

const Paragraph = styled('p')({
  marginTop: '0px',
  marginBottom: '0px',
  fontSize: '14px',
  textAlign: 'center',
  maxWidth: '250px',
  color: colors.DARK_GRAY,
})

const Title = styled('h3')({
  marginBottom: '10px',
  fontSize: '14px',
  textAlign: 'center',
  color: colors.BLACK,
  maxWidth: '210px',
})

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'baseline',
  maxWidth: '1000px',
  '@media (max-width: 710px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '30px',
})

const COLUMNS = [
  {
    key: 0,
    title: '1',
    paragraph:
      'Hedvig kontaktar ditt försäkringsbolag och säger upp din gamla försäkring',
  },
  {
    key: 1,
    title: '2',
    paragraph:
      'Vi håller dig uppdaterad och så fort vi vet när din bindningstid tar slut meddlar vi dig',
  },
  {
    key: 2,
    title: '3',
    paragraph:
      'Din Hedvig-försäkring aktiveras samma dag som din gamla försäkring går ut',
  },
]

export const HedvigSwitch: React.SFC<Props> = (props) => (
  <Wrapper>
    <InnerWrapper>
      <Card>
        <Header>{props.title}</Header>
        <Row>
          {COLUMNS.map((col) => (
            <Col key={col.key}>
              <Title>{col.title}</Title>
              <Paragraph>{col.paragraph}</Paragraph>
            </Col>
          ))}
        </Row>
      </Card>
    </InnerWrapper>
  </Wrapper>
)
