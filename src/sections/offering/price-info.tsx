import { colors } from '@hedviginsurance/brand'
import { Col } from 'components/offering/col'
import {
  GetInsuredButton,
  LinkTag,
} from 'components/offering/get-insured-button'
import { Header } from 'components/offering/header'
import { InnerContainer } from 'components/offering/inner-container'
import { SubTitle } from 'components/offering/sub-title'
import { Title } from 'components/offering/title'
import * as React from 'react'
import styled from 'react-emotion'

const Container = styled('div')({
  marginTop: '70px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Card = styled('div')({
  marginTop: '70px',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: colors.WHITE,
  minWidth: '700px',
  paddingBottom: 40,
  '@media (max-width: 700px)': {
    minWidth: '0px',
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

const Price = styled('p')({
  marginBottom: '0px',
  marginTop: '30px',
  fontSize: '20px',
  fontWeight: 100,
  textAlign: 'center',
  color: colors.PURPLE,
})

const Time = styled('p')({
  marginBottom: '30px',
  marginTop: '0px',
  fontSize: '16px',
  fontWeight: 100,
  textAlign: 'center',
  color: colors.BLACK_PURPLE,
})

const ProtectionLabel = styled('p')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '16px',
  textAlign: 'center',
  color: colors.BLACK,
})

const Row = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  justifyContent: 'center',
  '@media (max-width: 400px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Image = styled('img')({
  margin: '30px',
  maxWidth: '70px',
  '@media (max-width: 400px)': {
    margin: '0px',
    maxWidth: '150px',
  },
})

interface Props {
  alreadyInsured: boolean
  header: string
  subTitle1: string
  subTitle2: string
  price: string
  subscriptionTime: string
  startDate: string
  coverage: string
  getInsured: string
  backgroundImage: string
  alreadyInsuredLabel: string
  todayLabel: string
  protection: string
}

const COLUMNS = [
  {
    key: 0,
    title: 'Din bostad',
    image: '/assets/offering/Placeholder.png',
  },
  {
    key: 1,
    title: 'Dig och din familj',
    image: '/assets/offering/Placeholder.png',
  },
  {
    key: 2,
    title: 'Dina prylar',
    image: '/assets/offering/Placeholder.png',
  },
]

export const PriceInfo: React.SFC<Props> = (props) => (
  <Container>
    <InnerContainer>
      <Card>
        <Header>{props.header}</Header>
        <SubTitle>{props.subTitle1}</SubTitle>
        <SubTitle>{props.subTitle2}</SubTitle>
        <Price>{props.price}</Price>
        <Time>{props.subscriptionTime}</Time>
        <ProtectionLabel>{props.protection}</ProtectionLabel>
        <Row>
          {COLUMNS.map((col) => (
            <Col key={col.key}>
              <Image src={col.image} />
              <Title>{col.title}</Title>
            </Col>
          ))}
        </Row>
        <GetInsuredButton>
          <LinkTag to={'/hedvig'}>{props.getInsured}</LinkTag>
        </GetInsuredButton>
      </Card>
    </InnerContainer>
  </Container>
)
