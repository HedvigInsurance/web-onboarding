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
import { formatPostalNumber } from 'utils/postalNumbers'
import { trackEvent } from 'utils/tracking'
import { isStudentInsurance } from '../../../utils/insuranceDomainUtils'
import { CardWrapperSmall } from '../components/CardWrapperSmall'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { StudentBadge } from '../components/StudentOfferBadge'
import { Wrapper } from '../components/Wrapper'

interface Props {
  offer: OfferData
  signButtonVisibility: (isVisible: boolean) => void
}

const Card = styled('div')({
  marginTop: '70px',
  marginBottom: '70px',
  backgroundColor: colors.WHITE,
  paddingBottom: '48px',
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
  textAlign: 'center',
})

const Header = styled('h1')({
  color: colors.WHITE,
  marginTop: '0px',
  marginBottom: '10px',
  paddingTop: '30px',
})

const PersonalInfo = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: '30px',
  textAlign: 'center',
  maxWidth: '100%',
  color: colors.WHITE,
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

const HeaderBackground = styled('div')({
  backgroundColor: colors.PURPLE,
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
})

const PriceWrapper = styled('div')({
  display: 'inline-block',
  position: 'relative',
  margin: '0 auto',
})
const PriceHeader = styled('h1')({
  marginBottom: '10px',
  textAlign: 'center',
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
})

export const GetInsured: React.SFC<Props> = ({
  offer,
  signButtonVisibility,
}) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapperSmall>
        <Card>
          <HeaderBackground>
            <HeaderWrapper>
              <TranslationsConsumer textKey="OFFER_GET_INSURED_TITLE">
                {(title) => <Header>{title}</Header>}
              </TranslationsConsumer>
            </HeaderWrapper>
            <PersonalInfo>
              {`${offer.member.firstName} ${offer.member.lastName}`}
              {' · '}
              {offer.insurance.address}
              {' · '}
              {formatPostalNumber(offer.insurance.postalNumber)}
            </PersonalInfo>
          </HeaderBackground>
          <PriceWrapper>
            {isStudentInsurance(offer.insurance.type) && (
              <StudentBadge placement="left" />
            )}
            <TranslationsPlaceholderConsumer
              textKey="OFFER_SUMMARY_PRICE"
              replacements={{
                price: offer.insurance.monthlyCost,
              }}
            >
              {(priceText) => <PriceHeader>{priceText}</PriceHeader>}
            </TranslationsPlaceholderConsumer>
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
          <VisibilitySensor
            partialVisibility
            onChange={(isVisible: boolean) => {
              signButtonVisibility(isVisible)
            }}
          >
            {() => (
              <TranslationsConsumer textKey="OFFER_SUMMARY_SIGN_CTA">
                {(ctaText) => (
                  <GetInsuredButton margin={'30px'} centered>
                    <LinkTag
                      to={'/new-member/sign'}
                      onClick={() =>
                        trackEvent('Checkout Started', {
                          category: 'offer',
                          value: offer.insurance.monthlyCost,
                          label: 'GetInsured',
                        })
                      }
                    >
                      {ctaText}
                    </LinkTag>
                  </GetInsuredButton>
                )}
              </TranslationsConsumer>
            )}
          </VisibilitySensor>
        </Card>
      </CardWrapperSmall>
    </InnerWrapper>
  </Wrapper>
)
