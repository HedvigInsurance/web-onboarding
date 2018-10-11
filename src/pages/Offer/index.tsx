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

interface State {
  getStartedButtonVisible: boolean
  alreadyInsured: boolean
  price: string
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
          alreadyInsured: true,
          price: '299 kr/mån',
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
              buttonVisibility={state.updateVisibility}
              alreadyInsured={state.alreadyInsured}
              header={'Hej Zak, det här är din hemförsäkring hos Hedvig!'}
              subTitle1={'Zak Kjellin  23 år gammal'}
              subTitle2={'Fantastiska Gatan 23B'}
              subTitle3={'112 34 Stockholm'}
              price={state.price}
              startDate={'Startdatum:'}
              start={'När din gamla försäkring går ut'}
              coverage={'Gäller i hela världen'}
              getInsured={'Bli försäkrad'}
              backgroundImage={'url(assets/offering/map-background.png)'}
              alreadyInsuredLabel={'Gamla försäkringens slutdatum'}
              todayLabel={'Idag'}
              protection={'Självrisk: 1500 kr'}
            />

            <PageDown />

            <HedvigInfo title={'Det här är Hedvig'} />

            {state.alreadyInsured ? (
              <HedvigSwitch
                title={'Hedvig sköter bytet från din gamla försäkring'}
              />
            ) : null}

            <InsuranceCoverage
              headline={'Vad försäkringen täcker'}
              subTitle={'Klicka på ikonerna för mer info.'}
            />

            <InsuredAmount title={'Försäkrade belopp'} info={'Läs mer'} />

            <GetInsured
              title={'Försäkra'}
              name={'Fantastiska Gatan'}
              buttonText={'Bli försäkrad'}
              subTitle1={'Zak Kjellin  23 år gammal'}
              subTitle2={'Fantastiska Gatan 23B'}
              subTitle3={'112 34 Stockholm'}
              buttonVisibility={state.updateVisibility}
              price={state.price}
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

/* TODO: Add proptypes check */
