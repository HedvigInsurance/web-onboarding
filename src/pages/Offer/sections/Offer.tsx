import { colors, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { GetInsuredButton, LinkTag } from 'components/buttons'
import { OfferData } from 'containers/OfferContainer'
import * as React from 'react'
import styled from 'react-emotion'
import VisibilitySensor from 'react-visibility-sensor'
import { trackEvent } from 'utils/tracking'
import { CardWrapperSmall } from '../components/CardWrapperSmall'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'

const ICONWIDTH = 70
const ICONWIDTHMOBILE = 150
const ICONTITLEWIDTH = 200

const Wrapper = styled('div')({
  marginTop: '70px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
})

const Card = styled('div')({
  marginTop: '70px',
  backgroundColor: colors.WHITE,
  paddingBottom: '30px',
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Header = styled('h1')({
  color: colors.WHITE,
  marginTop: '0px',
  paddingTop: '30px',
  marginBottom: '10px',
  fontSize: '32px',
})

const HeaderBackground = styled('div')({
  backgroundColor: colors.PURPLE,
})

export const PersonalInfo = styled('div')({
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

export const Price = styled('h1')({
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
  marginLeft: '100px',
  marginRight: '100px',
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
  maxWidth: ICONWIDTH,
  '@media (max-width: 400px)': {
    margin: '0px',
    maxWidth: ICONWIDTHMOBILE,
  },
})

const IconTitle = styled('p')({
  marginBottom: '10px',
  fontSize: '14px',
  textAlign: 'center',
  color: colors.DARK_GRAY,
  maxWidth: ICONTITLEWIDTH,
})

interface Props {
  signButtonVisibility: (isVisible: boolean) => void
  offer: OfferData
}

// TODO: TEXT KEY THIS
const COLUMNS = [
  {
    key: 0,
    title: 'Lagenhetsskydd',
    icon: '/assets/offering/lagenhetsskyddet.svg',
  },
  {
    key: 1,
    title: 'Personskydd',
    icon: '/assets/offering/familjeskyddet.svg',
  },
  {
    key: 2,
    title: 'Prylskydd',
    icon: '/assets/offering/prylskyddet.svg',
  },
]

const addSpace = (postalNumber: string) =>
  postalNumber.substr(0, 3) + ' ' + postalNumber.substr(3, 4)

export const Offer: React.SFC<Props> = ({ signButtonVisibility, offer }) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapperSmall>
        <Card>
          <HeaderBackground>
            <HeaderWrapper>
              <Header>
                <TranslationsConsumer textKey="OFFER_HEADER">
                  {(title) => title}
                </TranslationsConsumer>
              </Header>
            </HeaderWrapper>
            <PersonalInfo>
              {`${offer.member.firstName} ${offer.member.lastName}`}
              {' · '}
              {offer.insurance.address}
              {' · '}
              {addSpace(offer.insurance.postalNumber)}
            </PersonalInfo>
          </HeaderBackground>
          <TranslationsPlaceholderConsumer
            textKey="OFFER_SUMMARY_PRICE"
            replacements={{ price: offer.insurance.monthlyCost }}
          >
            {(priceText) => <Price>{priceText}</Price>}
          </TranslationsPlaceholderConsumer>
          <InfoText>
            <TranslationsConsumer textKey="OFFER_RISK_LABEL">
              {(riskLabel) => riskLabel}
            </TranslationsConsumer>
          </InfoText>
          <InfoText>
            Startdatum:{' '}
            {offer.insurance.insuredAtOtherCompany ? (
              <TranslationsConsumer textKey="OFFER_START_LATER">
                {(riskLabel) => riskLabel}
              </TranslationsConsumer>
            ) : (
              <TranslationsConsumer textKey="OFFER_START_NOW">
                {(riskLabel) => riskLabel}
              </TranslationsConsumer>
            )}
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
              signButtonVisibility(isVisible)
            }}
          >
            {() => (
              <GetInsuredButton>
                <TranslationsConsumer textKey="OFFER_SUMMARY_SIGN_CTA">
                  {(ctaText) => (
                    <LinkTag
                      to={'/sign'}
                      onClick={() =>
                        trackEvent('Checkout Started', {
                          category: 'offer',
                          value: offer.insurance.monthlyCost,
                          label: 'Offer',
                        })
                      }
                    >
                      {ctaText}
                    </LinkTag>
                  )}
                </TranslationsConsumer>
              </GetInsuredButton>
            )}
          </VisibilitySensor>
        </Card>
      </CardWrapperSmall>
    </InnerWrapper>
  </Wrapper>
)
