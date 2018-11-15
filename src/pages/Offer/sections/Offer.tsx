import { colors, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { GetInsuredButton, LinkTag } from 'components/buttons'
import { OfferData } from 'containers/OfferContainer'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import styled from 'react-emotion'
import VisibilitySensor from 'react-visibility-sensor'
import { isStudentInsurance } from 'utils/insuranceDomainUtils'
import { formatPostalNumber } from 'utils/postalNumbers'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking'
import { CardWrapperSmall } from '../components/CardWrapperSmall'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { StudentBadge } from '../components/StudentOfferBadge'

const ICONWIDTH = 70
const ICONWIDTHMOBILE = 150
const ICONTITLEWIDTH = 200
const COLWIDTH = 100

const Wrapper = styled('div')({
  marginTop: '70px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
  textAlign: 'center',
})

const Card = styled('div')({
  marginTop: '70px',
  backgroundColor: colors.WHITE,
  paddingBottom: '50px',
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Header = styled('h1')({
  color: colors.WHITE,
  marginTop: '0px',
  paddingTop: '30px',
  marginBottom: '10px',
})

const HeaderBackground = styled('div')({
  backgroundColor: colors.PURPLE,
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
})

export const PersonalInfo = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: '30px',
  textAlign: 'center',
  maxWidth: '100%',
  color: colors.WHITE,
})

const PriceWrapper = styled('div')({
  display: 'inline-block',
  position: 'relative',
  margin: '0 auto',
})
export const Price = styled('h1')({
  marginBottom: '10px',
  marginTop: '30px',
  textAlign: 'center',
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
})

const InsuranceInfo = styled('div')({
  textAlign: 'center',
})

const BoldInfoText = styled('div')({
  color: colors.BLACK,
  display: 'inline',
  fontWeight: 600,
})

const InfoText = styled('div')({
  color: colors.OFF_BLACK,
  display: 'inline',
})

const Col = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: COLWIDTH,
})

const Row = styled('div')({
  marginTop: '30px',
  marginBottom: '40px',
  marginLeft: '100px',
  marginRight: '100px',
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  justifyContent: 'space-around',
  '@media (max-width: 400px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Icon = styled('img')({
  maxWidth: ICONWIDTH,
  '@media (max-width: 400px)': {
    margin: '0px',
    maxWidth: ICONWIDTHMOBILE,
  },
})

const IconTitle = styled('p')({
  marginTop: '10px',
  marginBottom: '10px',
  textAlign: 'center',
  color: colors.OFF_BLACK,
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
    title: 'OFFER_PERIL_TITLE_APARTMENT_PROTECTION',
    icon: '/new-member-assets/offering/lagenhetsskyddet.svg',
  },
  {
    key: 1,
    title: 'OFFER_PERIL_TITLE_PERSONAL_PROTECTION',
    icon: '/new-member-assets/offering/familjeskyddet.svg',
  },
  {
    key: 2,
    title: 'OFFER_PERIL_TITLE_STUFF_PROTECTION',
    icon: '/new-member-assets/offering/prylskyddet.svg',
  },
]

export const Offer: React.SFC<Props> = ({ signButtonVisibility, offer }) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapperSmall>
        <Card>
          <HeaderBackground>
            <HeaderWrapper>
              <Header>
                <TranslationsPlaceholderConsumer
                  textKey="OFFER_HEADER"
                  replacements={{
                    firstName: (
                      <span data-hj-supress>{offer.member.firstName}</span>
                    ),
                  }}
                >
                  {(title) => title}
                </TranslationsPlaceholderConsumer>
              </Header>
            </HeaderWrapper>
            <PersonalInfo data-hj-supress>
              {`${offer.member.firstName} ${offer.member.lastName}`}
              {' · '}
              {offer.insurance.address}
              {' · '}
              {formatPostalNumber(offer.insurance.postalNumber)}
            </PersonalInfo>
          </HeaderBackground>
          <PriceWrapper>
            <TranslationsPlaceholderConsumer
              textKey="OFFER_SUMMARY_PRICE"
              replacements={{ price: offer.insurance.monthlyCost }}
            >
              {(priceText) => <Price>{priceText}</Price>}
            </TranslationsPlaceholderConsumer>
            {isStudentInsurance(offer.insurance.type) && (
              <StudentBadge placement="right" />
            )}
          </PriceWrapper>
          <InsuranceInfo>
            <BoldInfoText>
              <TranslationsConsumer textKey="OFFER_SELF_RISK_LABEL">
                {(text) => text}
              </TranslationsConsumer>
            </BoldInfoText>
            <InfoText>
              <TranslationsConsumer textKey="OFFER_SELF_RISK_VALUE">
                {(text) => text}
              </TranslationsConsumer>
            </InfoText>
          </InsuranceInfo>
          <InsuranceInfo>
            <BoldInfoText>
              <TranslationsConsumer textKey="OFFER_START_DATE_LABEL">
                {(text) => text}
              </TranslationsConsumer>
            </BoldInfoText>
            <InfoText>
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
          </InsuranceInfo>
          <Row>
            {COLUMNS.map((col) => (
              <Col key={col.key}>
                <Icon src={col.icon} />
                <IconTitle>
                  <TranslationsConsumer textKey={col.title}>
                    {(title) => title}
                  </TranslationsConsumer>
                </IconTitle>
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
              <GetInsuredButton centered>
                <TranslationsConsumer textKey="OFFER_SUMMARY_SIGN_CTA">
                  {(ctaText) => (
                    <TrackAction
                      event={{
                        name: SemanticEvents.Ecommerce.CheckoutStarted,
                        properties: {
                          value: offer.insurance.monthlyCost,
                          label: 'Offer',
                          ...getUtmParamsFromCookie(),
                        },
                      }}
                    >
                      {({ track }) => (
                        <LinkTag
                          to={'/new-member/sign'}
                          onClick={() => track()}
                        >
                          {ctaText}
                        </LinkTag>
                      )}
                    </TrackAction>
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
