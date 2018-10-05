import { ActionMap, Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { GetInsured } from '../sections/offering/get-insured'
import { HedvigInfo } from '../sections/offering/hedvig-info'
import { HedvigSwitch } from '../sections/offering/hedvig-switch'
import { InsuranceCoverage } from '../sections/offering/insurance-coverage'
import { InsuredAmount } from '../sections/offering/insured-amount'
import { Legal } from '../sections/offering/legal'
import { PriceInfo } from '../sections/offering/price-info'
import { TopBar } from '../sections/offering/top-bar'

export const OuterContainer = styled('div')({})

interface State {
  getStartedButtonVisible: boolean
  alreadyInsured: boolean
}
interface Actions {
  handleChange: (visible: boolean) => void
}

export const Offering: React.SFC<{}> = () => (
  <OuterContainer>
    <Container<State, ActionMap<State, Actions>>
      initialState={{ getStartedButtonVisible: true, alreadyInsured: true }}
      actions={{
        handleChange: (visible: boolean) => (_) => ({
          getStartedButtonVisible: visible,
        }),
      }}
    >
      {(state) => (
        <OuterContainer>
          <TopBar
            progress={1}
            getInsured={'Bli försäkrad'}
            state={state.getStartedButtonVisible}
          />

          <PriceInfo
            update={state.handleChange}
            alreadyInsured={false}
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
            getInsured={'Bli försäkrad'}
          />
          <Legal
            legalText={
              'Genom att trycka på ”Bli försäkrad” godkänner jag att jag har tagit del av förköpsinformation, villkor och att mina personuppgifter behandlas enligt GDPR'
            }
          />
        </OuterContainer>
      )}
    </Container>
  </OuterContainer>
)

/* TODO: Add proptypes check */
