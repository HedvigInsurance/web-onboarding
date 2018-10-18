import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { ActionMap, Container } from 'constate'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { Mount } from 'react-lifecycle-components'
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
  getStartedButtonVisible: boolean
}
interface Actions {
  updateVisibility: (visible: boolean) => void
}

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
                getStartedButtonVisible: true,
              }}
              actions={{
                updateVisibility: (visible: boolean) => (_) => ({
                  getStartedButtonVisible: visible,
                }),
              }}
            >
              {(state) => (
                <>
                  <TopBar
                    progress={1}
                    buttonText={'Bli försäkrad'}
                    showButton={state.getStartedButtonVisible}
                  />
                  <Offer
                    offer={offer}
                    buttonVisibility={state.updateVisibility}
                  />
                  <PageDown />
                  <HedvigInfo />
                  {insuredAtOtherCompany ? <HedvigSwitch /> : null}
                  <InsuranceCoverage />
                  <InsuredAmount />
                  <Terms insuranceType={offer.insurance.type} />
                  <GetInsured
                    offer={offer}
                    buttonVisibility={state.updateVisibility}
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
