import { colors } from '@hedviginsurance/brand'
import { Card } from 'components/offering/card'
import { Col } from 'components/offering/col'
import { Container } from 'components/offering/container'
import { Header } from 'components/offering/header'
import { InnerContainer } from 'components/offering/inner-container'
import { Row } from 'components/offering/row'
import { TitleDarkWide } from 'components/offering/title-dark'
import * as React from 'react'
import styled from 'react-emotion'

interface Props {
  title: string
}

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

const SubTitle = styled('label')({
  fontSize: '16px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  maxWidth: '250px',
})

const COLUMNS = [
  {
    key: 0,
    title: 'Anmäl skador och få betalt på nolltid',
    subTitle:
      'Med vår smarta chattbot baserad på AI och maskininlärning kan vi snabbt göra bedömningar av skador och betala ut pengarna till dig utan krångliga formulär eller väntetider.',
    image: '/assets/offering/Placeholder.svg',
  },
  {
    key: 1,
    title: 'Schysstare affärsmodell',
    subTitle:
      'Hedvig gör saker annorlunda än andra försäkringsbolag, istället för att överskottet från alla premier går till vår vinst tar vi en månatlig fast avgift. Därför har vi inget incitament till att hålla inne med pengar!',
    image: '/assets/offering/Placeholder.svg',
  },
  {
    key: 2,
    title: 'Överskottet går till välgörenhet',
    subTitle:
      'Det som blir över efter årets skadeutbetalningar går till en välgörenhetsorganisation som du själv  väljer.',
    image: '/assets/offering/Placeholder.svg',
  },
]

export const HedvigInfo: React.SFC<Props> = (props) => (
  <Container>
    <InnerContainer>
      <Card>
        <Header>{props.title}</Header>
        <Row>
          {COLUMNS.map((col) => (
            <Col key={col.key}>
              <Image src={col.image} />
              <TitleDarkWide>{col.title}</TitleDarkWide>
              <SubTitle>{col.subTitle}</SubTitle>
            </Col>
          ))}
        </Row>
      </Card>
    </InnerContainer>
  </Container>
)
