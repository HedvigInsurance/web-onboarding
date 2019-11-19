import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { GetInsuredButton, LinkTag } from 'components/buttons'
import { CurrentLanguage } from 'components/utils/CurrentLanguage'
import { OfferData } from 'containers/OfferContainer'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { formatPostalNumber } from 'utils/postalNumbers'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking'
import { CardWrapperSmall } from '../../components/CardWrapperSmall'
import { HeaderWrapper } from '../../components/HeaderWrapper'
import { InnerWrapper } from '../../components/InnerWrapper'
import { PriceAndInclusions } from '../../components/PriceAndInclusions'
import { Discount } from './Discount'
import { DiscountBubble } from './DiscountBubble'

const Wrapper = styled('div')({
  marginTop: '70px',
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
  textAlign: 'center',
  paddingLeft: '20px',
  paddingRight: '20px',
  '@media (max-width: 900px)': {
    marginTop: '50px',
  },
  '@media (max-width: 350px)': {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
})

const Card = styled('div')({
  marginTop: '70px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 40px -12px rgba(0, 0, 0, 0.67)',
  borderRadius: '10px',
  paddingBottom: 40,
  position: 'relative',
  '@media (max-width: 350px)': {
    boxShadow: '0px 8px 22px -12px rgba(0, 0, 0, 0.40)',
  },
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
  paddingLeft: '10px',
  paddingRight: '10px',
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
  refetch: () => void
}

export const Offer: React.SFC<Props> = ({
  signButtonVisibility,
  offer,
  refetch,
}) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapperSmall>
        <Card>
          <DiscountBubble offer={offer} />
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
                    <TrackAction
                      event={{
                        name: SemanticEvents.Ecommerce.CheckoutStarted,
                        properties: {
                          value: Number(offer.insurance.cost.monthlyNet.amount),
                          label: 'Offer',
                          ...getUtmParamsFromCookie(),
                        },
                      }}
                    >
                      {({ track }) => (
                        <CurrentLanguage>
                          {({ currentLanguage }) => (
                            <LinkTag
                              to={`/${currentLanguage &&
                                currentLanguage + '/'}new-member/sign`}
                              onClick={() => track()}
                            >
                              {ctaText}
                            </LinkTag>
                          )}
                        </CurrentLanguage>
                      )}
                    </TrackAction>
                  )}
                </TranslationsConsumer>
              </GetInsuredButton>
            )}
          </VisibilitySensor>
          <Discount refetch={refetch} offer={offer} />
        </Card>
      </CardWrapperSmall>
    </InnerWrapper>
  </Wrapper>
)
