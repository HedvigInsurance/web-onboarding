import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { Card } from '.././components/Card'
import { Header } from '.././components/Header'
import { InnerWrapper } from '.././components/InnerWrapper'
import { Wrapper } from '.././components/Wrapper'

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
  fontSize: '25px',
  textAlign: 'center',
  color: colors.WHITE,
  maxWidth: '210px',
  zIndex: 2,
  position: 'absolute',
})

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'baseline',
  maxWidth: '1200px',
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

const ImageIcon = styled('img')({
  marginBottom: '10px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: '72px',
  height: '72px',
  zIndex: 1,
  position: 'relative',
})

const COLUMNS = [
  {
    key: 0,
    title: '1',
    image: 'assets/offering/hedvig-dot-1.svg',
    paragraph:
      'Hedvig kontaktar ditt försäkringsbolag och säger upp din gamla försäkring',
  },
  {
    key: 1,
    title: '2',
    image: 'assets/offering/hedvig-dot-2.svg',
    paragraph:
      'Vi håller dig uppdaterad och så fort vi vet när din bindningstid tar slut meddlar vi dig',
  },
  {
    key: 2,
    title: '3',
    image: 'assets/offering/hedvig-dot-3.svg',
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
              <ImageIcon src={col.image} />
              <Title>{col.title}</Title>
              <Paragraph>{col.paragraph}</Paragraph>
            </Col>
          ))}
        </Row>
      </Card>
    </InnerWrapper>
  </Wrapper>
)
