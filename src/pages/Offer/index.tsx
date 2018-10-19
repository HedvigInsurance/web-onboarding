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
  upperSignButtonVisible: boolean
  lowerSignButtonVisible: boolean
}
interface Actions {
  updateUpperButtonVisibility: (visible: boolean) => void
  updateLowerButtonVisibility: (visible: boolean) => void
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
                    buttonText={'Bli försäkrad'}
                    upperSignButtonVisible={!state.upperSignButtonVisible}
                    lowerSignButtonVisible={!state.lowerSignButtonVisible}
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
          </>
        )
      }}
    </OfferContainer>
  </SessionTokenGuard>
)
