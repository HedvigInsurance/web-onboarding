import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { ActionMap, Container } from 'constate'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'
import { Mount } from 'react-lifecycle-components'
import { Link } from 'react-router-dom'
import { trackEvent } from 'utils/tracking'
import { GetInsured } from './sections/GetInsured'
import { HedvigInfo } from './sections/HedvigInfo'
import { HedvigSwitch } from './sections/HedvigSwitch'
import { InsuranceCoverage } from './sections/InsuranceCoverage'
import { InsuredAmount } from './sections/InsuredAmount'
import { Legal } from './sections/LegalText'
import { Offer } from './sections/Offer'
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

const BarButtonWrapper = styled('div')({
  width: '20%',
  justifyContent: 'flex-end',
  '@media (max-width: 850px)': {
    width: '33%',
  },
  '@media (max-width: 600px)': {
    width: '50%',
  },
})
const GetInsuredButton = styled('div')({
  display: 'flex',
  justifyContent: 'inherit',
  marginRight: '26px',
})

const LinkTag = styled(Link)({
  backgroundColor: colors.GREEN,
  fontSize: '16px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '10px 24px',
  textAlign: 'center',
})

export const Offering: React.SFC<{}> = () => (
  <SessionTokenGuard>
    <OfferContainer>
      {(offer) => {
        const { insuredAtOtherCompany } = offer.insurance

        return (
          <Mount
            on={() =>
              trackEvent('Product Viewed', {
                category: 'offer',
                value: offer.insurance.monthlyCost,
              })
            }
          >
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
                      !state.upperSignButtonVisible &&
                      !state.lowerSignButtonVisible && (
                        <BarButtonWrapper>
                          <GetInsuredButton>
                            <LinkTag
                              to={'/hedvig'}
                              onClick={() =>
                                trackEvent('Checkout Started', {
                                  category: 'offer',
                                  value: offer.insurance.monthlyCost,
                                  label: 'TopBar',
                                })
                              }
                            >
                              <TranslationsConsumer textKey="TOP_BAR_SIGN_BUTTON">
                                {(text) => text}
                              </TranslationsConsumer>
                            </LinkTag>
                          </GetInsuredButton>
                        </BarButtonWrapper>
                      )
                    }
                  />
                  <Offer
                    offer={offer}
                    signButtonVisibility={state.updateUpperButtonVisibility}
                  />
                  <PageDown />
                  <HedvigInfo />
                  {insuredAtOtherCompany ? <HedvigSwitch /> : null}
                  <InsuranceCoverage />
                  <InsuredAmount />
                  <Terms insuranceType={offer.insurance.type} />
                  <GetInsured
                    offer={offer}
                    signButtonVisibility={state.updateLowerButtonVisibility}
                  />
                  <Legal />
                </>
              )}
            </Container>
          </Mount>
        )
      }}
    </OfferContainer>
  </SessionTokenGuard>
)
