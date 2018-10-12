import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { ActionMap, Container } from 'constate'
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
  getStartedButtonVisible: boolean
}
interface Actions {
  updateVisibility: (visible: boolean) => void
}

export const Offering: React.SFC<{}> = () => (
  <>
    <TranslationsConsumer textKey="OFFER_PAGE_TITLE">
      {(title) => (
        <Helmet>
          <title>{title}</title>
        </Helmet>
      )}
    </TranslationsConsumer>

    <>
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
              insuranceOffer={InsuranceOffer}
              buttonVisibility={state.updateVisibility}
            />

            <PageDown />

            <HedvigInfo title={'Det här är Hedvig'} />

            {InsuranceOffer.insuredAtOtherCompany ? (
              <HedvigSwitch
                title={'Hedvig sköter bytet från din gamla försäkring'}
              />
            ) : null}

            <InsuranceCoverage
              headline={'Vad försäkringen täcker'}
              subTitle={'Klicka på ikonerna för mer info.'}
            />

            <InsuredAmount title={'Försäkrade belopp'} info={'Läs mer'} />

            <Terms />

            <GetInsured
              title={'Försäkra'}
              name={'Fantastiska Gatan'}
              buttonText={'Bli försäkrad'}
              subTitle1={'Zak Kjellin  23 år gammal'}
              subTitle2={'Fantastiska Gatan 23B'}
              subTitle3={'112 34 Stockholm'}
              buttonVisibility={state.updateVisibility}
              price={InsuranceOffer.monthlyCost}
            />
            <Legal
              legalText={
                'Genom att trycka på ”Bli försäkrad” godkänner jag att jag har tagit del av förköpsinformation, villkor och att mina personuppgifter behandlas enligt GDPR'
              }
            />
          </>
        )}
      </Container>
    </>
  </>
)
const InsuranceOffer = {
  insuredAtOtherCompany: true,
  monthlyCost: 199,
  name: 'Zak Kjellin',
  address: 'Fantastiska Gatan 23B',
  zip: '112 34 Stockholm',
}

/* TODO: Add proptypes check */
