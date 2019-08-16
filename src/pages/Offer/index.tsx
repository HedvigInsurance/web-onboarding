import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { ActionMap, Container } from 'constate'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { getUtmParamsFromCookie, Track, TrackAction } from 'utils/tracking'
import { CurrentLanguage } from '../../components/utils/CurrentLanguage'
import { CardWrapper } from './components/CardWrapper'
import { InnerWrapper } from './components/InnerWrapper'
import { Wrapper } from './components/Wrapper'
import { DiscountAutoConsumer } from './DiscountAutoConsumer'
import { GetInsured } from './sections/GetInsured'
import { HedvigInfo } from './sections/HedvigInfo'
import { HedvigSwitch } from './sections/HedvigSwitch'
import { InsuranceCoverage } from './sections/InsuranceCoverage'
import { InsuredAmount } from './sections/InsuredAmount'
import { Offer } from './sections/offer'
import { OtherInfo } from './sections/OtherInfo'
import { PageDown } from './sections/PageDown'
import { Terms } from './sections/Terms'

interface State {
  upperSignButtonVisible: boolean
  lowerSignButtonVisible: boolean
}
interface Actions {
  updateUpperButtonVisibility: (visible: boolean) => void
  updateLowerButtonVisibility: (visible: boolean) => void
}

const BarButtonWrapper = styled('div')(
  ({
    upperSignButtonVisible,
    lowerSignButtonVisible,
  }: {
    upperSignButtonVisible: boolean
    lowerSignButtonVisible: boolean
  }) => ({
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 250ms 100ms',
    transform:
      upperSignButtonVisible === true && lowerSignButtonVisible === true
        ? `translateX(0)`
        : `translateX(calc(100% + 26px))`,
    willChange: 'transform',
    justifyContent: 'flex-end',
  }),
)

const GetInsuredButton = styled('div')({
  display: 'flex',
  justifyContent: 'inherit',
  '@media (max-width: 350px)': {
    marginRight: '10px',
  },
})

const LinkTag = styled(Link)({
  backgroundColor: colors.GREEN,
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '10px 24px',
  textAlign: 'center',
  '@media (max-width: 300px)': {
    padding: '10px 12px',
  },
})

const BigCard = styled('div')({
  paddingTop: '40px',
  paddingBottom: '40px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 15px -13px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

export const Offering: React.SFC<{}> = () => (
  <Page>
    <SessionTokenGuard>
      <OfferContainer>
        {(offer, { refetch }) => {
          if (!offer || !offer.insurance.type) {
            return null
          }

          const { insuredAtOtherCompany } = offer.insurance

          return (
            <Track
              event={{
                name: SemanticEvents.Ecommerce.ProductViewed,
                properties: {
                  category: 'offer',
                  value: Number(offer.insurance.cost.monthlyNet.amount),
                  ...getUtmParamsFromCookie(),
                },
              }}
            >
              <DiscountAutoConsumer refetch={refetch} />
              <TranslationsConsumer textKey="OFFER_PAGE_TITLE">
                {(title) => (
                  <Helmet>
                    <title>{title}</title>
                  </Helmet>
                )}
              </TranslationsConsumer>

              <Container<State, ActionMap<State, Actions>>
                initialState={{
                  upperSignButtonVisible: true,
                  lowerSignButtonVisible: false,
                }}
                actions={{
                  updateUpperButtonVisibility: (visible: boolean) => (_) => ({
                    upperSignButtonVisible: visible,
                  }),
                  updateLowerButtonVisibility: (visible: boolean) => (_) => ({
                    lowerSignButtonVisible: visible,
                  }),
                }}
              >
                {(state) => (
                  <>
                    <TopBar
                      progress={1}
                      button={
                        <BarButtonWrapper
                          upperSignButtonVisible={!state.upperSignButtonVisible}
                          lowerSignButtonVisible={!state.lowerSignButtonVisible}
                        >
                          <GetInsuredButton>
                            <TrackAction
                              event={{
                                name: SemanticEvents.Ecommerce.CheckoutStarted,
                                properties: {
                                  category: 'offer',
                                  value: Number(
                                    offer.insurance.cost.monthlyNet.amount,
                                  ),
                                  label: 'TopBar',
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
                                      <TranslationsConsumer textKey="TOP_BAR_SIGN_BUTTON">
                                        {(text) => text}
                                      </TranslationsConsumer>
                                    </LinkTag>
                                  )}
                                </CurrentLanguage>
                              )}
                            </TrackAction>
                          </GetInsuredButton>
                        </BarButtonWrapper>
                      }
                    />
                    <Offer
                      refetch={refetch}
                      offer={offer}
                      signButtonVisibility={state.updateUpperButtonVisibility}
                    />
                    <PageDown />

                    <Wrapper>
                      <InnerWrapper>
                        <CardWrapper>
                          <BigCard>
                            <CurrentLanguage>
                              {({ currentLanguage }) =>
                                (currentLanguage === '' ||
                                  currentLanguage === 'sv') && (
                                  <InsuranceCoverage />
                                )
                              }
                            </CurrentLanguage>
                            <InsuredAmount
                              insuranceType={offer.insurance.type}
                            />
                            <OtherInfo offer={offer} />
                            <Terms insuranceType={offer.insurance.type} />
                          </BigCard>
                        </CardWrapper>
                      </InnerWrapper>
                    </Wrapper>
                    <HedvigInfo />
                    {insuredAtOtherCompany ? (
                      <HedvigSwitch
                        currentInsuranceState={{
                          hasCurrentInsurance:
                            offer.insurance.insuredAtOtherCompany,
                          currentInsurer: offer.insurance.currentInsurerName,
                          otherInsurer: offer.insurance.currentInsurerName,
                        }}
                      />
                    ) : null}
                    <GetInsured
                      offer={offer}
                      signButtonVisibility={state.updateLowerButtonVisibility}
                    />
                  </>
                )}
              </Container>
            </Track>
          )
        }}
      </OfferContainer>
    </SessionTokenGuard>
  </Page>
)
