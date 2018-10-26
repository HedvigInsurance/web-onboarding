import { colors, fonts } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { OfferData } from 'containers/OfferContainer'
import * as React from 'react'
import styled from 'react-emotion'
import { CardWrapper } from '../components/CardWrapper'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { Wrapper } from '../components/Wrapper'

interface Props {
  offer: OfferData
}

const ICONSIDE = 32

const Card = styled('div')({
  marginTop: '70px',
  paddingTop: '30px',
  paddingBottom: '60px',
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

const Row = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  flexDirection: 'row',
  '@media (max-width: 700px)': {
    justifyContent: 'flex-start',
  },
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  marginRight: '20px',
  marginLeft: '20px',
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
  <Wrapper>
    <InnerWrapper>
      <CardWrapper>
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
      </CardWrapper>
    </InnerWrapper>
  </Wrapper>
)
