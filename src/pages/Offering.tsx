import { ActionMap, Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { GetInsured } from '../sections/offering/GetInsured'
import { HedvigInfo } from '../sections/offering/HedvigInfo'
import { HedvigSwitch } from '../sections/offering/HedvigSwitch'
import { InsuranceCoverage } from '../sections/offering/InsuranceCoverage'
import { InsuredAmount } from '../sections/offering/InsuredAmount'
import { Legal } from '../sections/offering/LegalText'
import { Offer } from '../sections/offering/Offer'
import { PageDown } from '../sections/offering/PageDown'
import { TopBar } from '../sections/offering/TopBar'

export const Wrapper = styled('div')({})

interface State {
  getStartedButtonVisible: boolean
  alreadyInsured: boolean
}
interface Actions {
  updateVisibility: (visible: boolean) => void
}

export const Offering: React.SFC<{}> = () => (
  <Wrapper>
    <Container<State, ActionMap<State, Actions>>
      initialState={{ getStartedButtonVisible: true, alreadyInsured: true }}
      actions={{
        updateVisibility: (visible: boolean) => (_) => ({
          getStartedButtonVisible: visible,
        }),
      }}
    >
      {(state) => (
        <Wrapper>
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
            price={'299 kr/mån'}
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
            buttonVisibility={state.updateVisibility}
          />
          <Legal
            legalText={
              'Genom att trycka på ”Bli försäkrad” godkänner jag att jag har tagit del av förköpsinformation, villkor och att mina personuppgifter behandlas enligt GDPR'
            }
          />
        </Wrapper>
      )}
    </Container>
  </Wrapper>
)

/* TODO: Add proptypes check */
