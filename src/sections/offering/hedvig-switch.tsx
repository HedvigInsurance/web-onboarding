import { colors } from '@hedviginsurance/brand'
import { Card } from 'components/offering/card'
import { Col } from 'components/offering/col'
import { Header } from 'components/offering/header'
import { InnerWrapper } from 'components/offering/inner-wrapper'
import { Row } from 'components/offering/row'
import { TitleDarkWide } from 'components/offering/title-dark'
import { Wrapper } from 'components/offering/wrapper'
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

const COLUMNS = [
  {
    key: 0,
    title: '1',
    subTitle:
      'Hedvig kontaktar ditt försäkringsbolag och säger upp din gamla försäkring',
  },
  {
    key: 1,
    title: '2',
    subTitle:
      'Vi håller dig uppdaterad och så fort vi vet när din bindningstid tar slut meddlar vi dig',
  },
  {
    key: 2,
    title: '3',
    subTitle:
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
              <TitleDarkWide>{col.title}</TitleDarkWide>
              <Paragraph>{col.subTitle}</Paragraph>
            </Col>
          ))}
        </Row>
      </Card>
    </InnerWrapper>
  </Wrapper>
)
