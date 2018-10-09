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
const PARAGRAPHWIDTH = 250
const TITLEWIDTH = 210
const IMAGESIDE = 72

const Card = styled('div')({
  marginTop: '70px',
  paddingTop: '30px',
  paddingBottom: '30px',
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

const Paragraph = styled('p')({
  marginTop: '0px',
  marginBottom: '0px',
  fontSize: '14px',
  textAlign: 'center',
  maxWidth: PARAGRAPHWIDTH,
  color: colors.DARK_GRAY,
})

const Title = styled('h3')({
  marginBottom: '10px',
  fontSize: '25px',
  textAlign: 'center',
  color: colors.WHITE,
  maxWidth: TITLEWIDTH,
  zIndex: 2,
  position: 'absolute',
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

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})

const ImageIcon = styled('img')({
  marginBottom: '10px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: IMAGESIDE,
  height: IMAGESIDE,
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
      <CardWrapper>
        <Card>
          <HeaderWrapper>
            <Header>{props.title}</Header>
          </HeaderWrapper>
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
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
