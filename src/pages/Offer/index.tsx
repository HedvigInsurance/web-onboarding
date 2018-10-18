import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { ActionMap, Container } from 'constate'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import * as React from 'react'
import Helmet from 'react-helmet-async'
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
  signButtonOneVisible: boolean
  signButtonTwoVisible: boolean
}
interface Actions {
  updateVisibilityOne: (visible: boolean) => void
  updateVisibilityTwo: (visible: boolean) => void
}

export const Offering: React.SFC<{}> = () => (
  <SessionTokenGuard>
    <OfferContainer>
      {(offer) => {
        const { insuredAtOtherCompany } = offer.insurance

        return (
          <>
            <TranslationsConsumer textKey="OFFER_PAGE_TITLE">
              {(title) => (
                <Helmet>
                  <title>{title}</title>
                </Helmet>
              )}
            </TranslationsConsumer>

            <Container<State, ActionMap<State, Actions>>
              initialState={{
                signButtonOneVisible: true,
                signButtonTwoVisible: false,
              }}
              actions={{
                updateVisibilityOne: (visible: boolean) => (_) => ({
                  signButtonOneVisible: visible,
                }),
                updateVisibilityTwo: (visible: boolean) => (_) => ({
                  signButtonTwoVisible: visible,
                }),
              }}
            >
              {(state) => (
                <>
                  <TopBar
                    progress={1}
                    buttonText={'Bli försäkrad'}
                    buttonOneVisible={!state.signButtonOneVisible}
                    buttonTwoVisible={!state.signButtonTwoVisible}
                  />
                  <Offer
                    offer={offer}
                    buttonVisibility={state.updateVisibilityOne}
                  />
                  <PageDown />
                  <HedvigInfo />
                  {insuredAtOtherCompany ? <HedvigSwitch /> : null}
                  <InsuranceCoverage />
                  <InsuredAmount />
                  <Terms insuranceType={offer.insurance.type} />
                  <GetInsured
                    offer={offer}
                    buttonVisibility={state.updateVisibilityTwo}
                  />
                  <Legal />
                </>
              )}
            </Container>
          </>
        )
      }}
    </OfferContainer>
  </SessionTokenGuard>
)
