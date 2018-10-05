import { colors } from '@hedviginsurance/brand'
import { Header } from 'components/offering/header'
import { InnerWrapper } from 'components/offering/inner-wrapper'
import { Row } from 'components/offering/row'
import { Wrapper } from 'components/offering/wrapper'
import * as React from 'react'
import styled from 'react-emotion'

interface Props {
  title: string
}

const Card = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: colors.WHITE,
  minWidth: '1000px',
  width: '1000px',
  maxWidth: '1000px',
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
  '@media (max-width: 1000px)': {
    width: '100%',
    minWidth: '0%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

const Image = styled('img')({
  marginBottom: '20px',
  maxWidth: '240px',
  '@media (max-width: 710px)': {
    maxWidth: '300px',
  },
  '@media (max-width: 400px)': {
    maxWidth: '210px',
  },
})

const Col = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '30px',
})

const Title = styled('h3')({
  margin: '0px',
  fontSize: '14px',
  color: colors.BLACK,
  maxWidth: '240px',
})

const InfoText = styled('p')({
  fontSize: '14px',
  color: colors.DARK_GRAY,
  maxWidth: '240px',
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
  <Wrapper>
    <InnerWrapper>
      <Card>
        <Header>{props.title}</Header>
        <Row>
          {COLUMNS.map((col) => (
            <Col key={col.key}>
              <Image src={col.image} />
              <Title>{col.title}</Title>
              <InfoText>{col.subTitle}</InfoText>
            </Col>
          ))}
        </Row>
      </Card>
    </InnerWrapper>
  </Wrapper>
)
