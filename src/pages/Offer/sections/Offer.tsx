import { colors } from '@hedviginsurance/brand'
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
import { CardWrapperSmall } from '../components/CardWrapperSmall'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { PriceAndInclusions } from '../components/PriceAndInclusions'

const Wrapper = styled('div')({
  marginTop: '70px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
  textAlign: 'center',
})

const Card = styled('div')({
  marginTop: '70px',
  backgroundColor: colors.WHITE,
  paddingBottom: '40px',
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const Header = styled('h1')({
  color: colors.WHITE,
  margin: 0,
  paddingTop: '40px',
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

interface Props {
  signButtonVisibility: (isVisible: boolean) => void
  offer: OfferData
}

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
          <PriceAndInclusions offer={offer} />
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
                    <LinkTag
                      to={'/new-member/sign'}
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
