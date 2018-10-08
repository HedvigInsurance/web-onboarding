import { colors, fonts } from '@hedviginsurance/brand'
import { GetInsuredButton, LinkTag } from 'components/get-insured-button'
import * as React from 'react'
import styled from 'react-emotion'
import * as VisibilitySensor from 'react-visibility-sensor'
import { InnerWrapper } from '.././components/InnerWrapper'

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
  minWidth: '788px',
  paddingBottom: 40,
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
  '@media (max-width: 788px)': {
    minWidth: '0px',
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

const Header = styled('h1')({
  color: colors.WHITE,
  marginTop: '0px',
  maxWidth: '400px',
  paddingTop: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  fontFamily: fonts.SORAY,
  fontSize: '28px',
  marginBottom: '10px',
  fontWeight: 'normal',
  textAlign: 'center',
  lineHeight: '40px',
  '@media (max-width: 640px)': {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  '@media (max-width: 400px)': {
    fontSize: '25px',
  },
})

const HeaderBackground = styled('div')({
  backgroundColor: colors.PURPLE,
})

const PersonalInfo = styled('div')({
  marginTop: '0px',
  marginBottom: '0px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: '30px',
  fontSize: '14px',
  lineHeight: '22px',
  textAlign: 'center',
  maxWidth: '100%',
  color: colors.WHITE,
})

const Price = styled('h1')({
  marginBottom: '0px',
  marginTop: '30px',
  fontSize: '32px',
  textAlign: 'center',
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
})

const InfoText = styled('div')({
  marginBottom: '0px',
  marginTop: '0px',
  fontSize: '14px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '30px',
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

const Icon = styled('img')({
  marginTop: '30px',
  marginBottom: '10px',
  maxWidth: '70px',
  '@media (max-width: 400px)': {
    margin: '0px',
    maxWidth: '150px',
  },
})

const IconTitle = styled('p')({
  marginBottom: '10px',
  fontSize: '14px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  maxWidth: '200px',
})

interface Props {
  buttonVisibility: (isVisible: boolean) => void
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
    icon: '/assets/offering/oval-light-purple.svg',
  },
  {
    key: 1,
    title: 'Ingen bindningstid',
    icon: '/assets/offering/oval-orange.svg',
  },
  {
    key: 2,
    title: 'Blixtsnabb ersättning',
    icon: '/assets/offering/oval-dark-purple.svg',
  },
]

export const Offer: React.SFC<Props> = (props) => (
  <Wrapper>
    <InnerWrapper>
      <Card>
        <HeaderBackground>
          <Header>{props.header}</Header>
          <PersonalInfo>
            {props.subTitle1} • {props.subTitle2} • {props.subTitle3}
          </PersonalInfo>
        </HeaderBackground>
        <Price>{props.price}</Price>
        <InfoText>{props.protection}</InfoText>
        <InfoText>
          {props.startDate} {props.start}
        </InfoText>
        <Row>
          {COLUMNS.map((col) => (
            <Col key={col.key}>
              <Icon src={col.icon} />
              <IconTitle>{col.title}</IconTitle>
            </Col>
          ))}
        </Row>
        <VisibilitySensor
          partialVisibility
          onChange={(isVisible: boolean) => {
            props.buttonVisibility(isVisible)
          }}
        >
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
