import { colors, fonts } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { OfferData } from 'containers/OfferContainer'
import * as React from 'react'
import styled from 'react-emotion'
import { HeaderWrapper } from '../components/HeaderWrapper'

interface Props {
  offer: OfferData
}

const ICONSIDE = 32

const Card = styled('div')({
  paddingBottom: '60px',
  backgroundColor: colors.WHITE,
})

const Header = styled('h1')({
  color: colors.BLACK,
  marginTop: '30px',
  marginBottom: '30px',
})

const Row = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  flexDirection: 'row',
  '@media (max-width: 700px)': {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginRight: '20px',
  marginLeft: '20px',
  width: '130px',
  '@media (max-width: 700px)': {
    width: 'calc(50% - 40px)',
    marginBottom: '20px',
  },
})

const CheckIcon = styled('img')({
  marginBottom: '0px',
  marginTop: '10px',
  marginRight: '30px',
  marginLeft: '30px',
  width: ICONSIDE,
  height: ICONSIDE,
})

const IconTitle = styled('div')({
  marginBottom: '0px',
  marginTop: '10px',
  fontFamily: fonts.CIRCULAR,
  textAlign: 'center',
  color: colors.DARK_PURPLE,
  lineHeight: 'normal',
  maxWidth: '130px',
  fontWeight: 600,
})

const IconInfo = styled('div')({
  marginBottom: '0px',
  marginTop: '0px',
  fontFamily: fonts.CIRCULAR,
  textAlign: 'center',
  color: colors.OFF_BLACK,
  lineHeight: 'normal',
})

export const OtherInfo: React.SFC<Props> = ({ offer }) => (
  <Card>
    <HeaderWrapper>
      <Header>
        <TranslationsConsumer textKey="OFFER_OTHER_INFORMATION_TITLE">
          {(header) => header}
        </TranslationsConsumer>
      </Header>
    </HeaderWrapper>
    <Row>
      <Col>
        <CheckIcon src="/new-member-assets/offering/checkmark.svg" />
        <TranslationsConsumer textKey="OFFER_PERSONS_INSURED_LABEL">
          {(title) => <IconTitle>{title}</IconTitle>}
        </TranslationsConsumer>
        <IconInfo>
          {offer.member.firstName}
          {offer.insurance.personsInHousehold > 1 &&
            ` + ${offer.insurance.personsInHousehold - 1}`}
        </IconInfo>
      </Col>
      <Col>
        <CheckIcon src="/new-member-assets/offering/checkmark.svg" />
        <TranslationsConsumer textKey="OFFER_PAYMENT_LABEL">
          {(title) => <IconTitle>{title}</IconTitle>}
        </TranslationsConsumer>
        <TranslationsConsumer textKey="OFFER_AUTOGIRO_LABEL">
          {(title) => <IconInfo>{title}</IconInfo>}
        </TranslationsConsumer>
      </Col>
      <Col>
        <CheckIcon src="/new-member-assets/offering/checkmark.svg" />
        <TranslationsConsumer textKey="OFFER_TRAVEL_PROTECTION_LABEL">
          {(title) => <IconTitle>{title}</IconTitle>}
        </TranslationsConsumer>
        <TranslationsConsumer textKey="OFFER_TRAVEL_PROTECTION_TIME_VALUE">
          {(title) => <IconInfo>{title}</IconInfo>}
        </TranslationsConsumer>
      </Col>
      <Col>
        <CheckIcon src="/new-member-assets/offering/checkmark.svg" />
        <TranslationsConsumer textKey="OFFER_SUBSCRIPTION_TIME_LABEL">
          {(title) => <IconTitle>{title}</IconTitle>}
        </TranslationsConsumer>
      </Col>
    </Row>
  </Card>
)
