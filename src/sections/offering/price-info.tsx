import { colors, fonts } from '@hedviginsurance/brand'
import { Col } from 'components/offering/col'
import {
  GetInsuredButton,
  LinkTag,
} from 'components/offering/get-insured-button'
import { Header } from 'components/offering/header'
import { InnerWrapper } from 'components/offering/inner-wrapper'
import { SubTitle } from 'components/offering/sub-title'
import * as React from 'react'
import styled from 'react-emotion'
import * as VisibilitySensor from 'react-visibility-sensor'

const Wrapper = styled('div')({
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
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
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
  fontSize: '32px',
  textAlign: 'center',
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
})

const InfoText = styled('p')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '14px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
})

const Row = styled('div')({
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  '@media (max-width: 400px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Image = styled('img')({
  marginTop: '30px',
  marginBottom: '10px',
  maxWidth: '70px',
  '@media (max-width: 400px)': {
    margin: '0px',
    maxWidth: '150px',
  },
})

export const ImageText = styled('p')({
  marginBottom: '10px',
  fontSize: '14px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  maxWidth: '200px',
})

interface Props {
  update: (isVisible: boolean) => void
  alreadyInsured: boolean
  header: string
  subTitle1: string
  subTitle2: string
  subTitle3: string
  price: string
  startDate: string
  start: string
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
    title: 'Inget pappersarbete',
    image: '/assets/offering/oval-light-purple.svg',
  },
  {
    key: 1,
    title: 'Ingen bindningstid',
    image: '/assets/offering/oval-orange.svg',
  },
  {
    key: 2,
    title: 'Blixtsnabb ersättning',
    image: '/assets/offering/oval-dark-purple.svg',
  },
]

export const PriceInfo: React.SFC<Props> = (props) => {
  const handleChange = (isVisible: boolean) => {
    props.update(isVisible)
  }
  return (
    <Wrapper>
      <InnerWrapper>
        <Card>
          <Header>{props.header}</Header>
          <SubTitle>
            {props.subTitle1} • {props.subTitle2} • {props.subTitle3}
          </SubTitle>
          <Price>{props.price}</Price>
          <InfoText>{props.protection}</InfoText>
          <InfoText>
            {props.startDate} {props.start}
          </InfoText>
          <Row>
            {COLUMNS.map((col) => (
              <Col key={col.key}>
                <Image src={col.image} />
                <ImageText>{col.title}</ImageText>
              </Col>
            ))}
          </Row>
          <VisibilitySensor partialVisibility onChange={handleChange}>
            {() => (
              <GetInsuredButton>
                <LinkTag to={'/hedvig'}>{props.getInsured}</LinkTag>
              </GetInsuredButton>
            )}
          </VisibilitySensor>
        </Card>
      </InnerWrapper>
    </Wrapper>
  )
}
