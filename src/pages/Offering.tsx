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

export const Container = styled('div')({})

interface MyComponentState {
  alreadyInsured: boolean
}

export class Offering extends React.Component<{}, MyComponentState> {
  constructor(props: any) {
    super(props)

    this.setState({
      alreadyInsured: true,
    })

    this.alreadyInsured = this.alreadyInsured.bind(this)
  }

  public render() {
    return (
      /*TODO: graphql data */
      <Container>
        {/* Top Bar Section*/}
        <TopBar progress={1} getInsured={'Bli försäkrad'} />

        {/* Pice Info Section */}
        <PriceInfo
          alreadyInsured={false}
          header={'Hej Zak, det här är din hemförsäkring hos Hedvig!'}
          subTitle1={'Zak Kjellin  23 år gammal'}
          subTitle2={'Fantastiska Gatan 23B, 112 34 Stockholm'}
          price={'299 kr/mån'}
          subscriptionTime={'Ingen bindningstid'}
          startDate={'Startdatum:'}
          coverage={'Gäller i hela världen'}
          getInsured={'Bli försäkrad'}
          BackgroundImage={'url(assets/offering/map-background.png)'}
          iconClock={'/assets/offering/start-date.png'}
          iconWorld={'/assets/offering/world.png'}
          alreadyInsuredLabel={'Gamla försäkringens slutdatum'}
          todayLabel={'Idag'}
          protection={'Med skydd för'}
        />

        {/* Hedvig Info Section */}
        <HedvigInfo title={'Det här är Hedvig'} />

        {/* Hedvig Switch Section */}
        {this.alreadyInsured ? (
          <HedvigSwitch
            title={'Hedvig sköter bytet från din gamla försäkring'}
          />
        ) : null}

        {/* Insurance Coverage Section */}
        <InsuranceCoverage
          headline={'Vad försäkringen täcker'}
          subTitle={'Klicka på ikonerna för mer info.'}
        />

        {/* Insured Amount Section */}
        <InsuredAmount title={'Försäkrade belopp'} info={'Läs mer'} />

        {/* Get Insured Section */}
        <GetInsured
          title={'Försäkra'}
          name={'Fantastiska Gatan'}
          getInsured={'Bli försäkrad'}
        />

        {/* Legal Section */}
        <Legal
          legalText={
            'Genom att trycka på ”Bli försäkrad” godkänner jag att jag har tagit del av förköpsinformation, villkor och att mina personuppgifter behandlas enligt GDPR'
          }
        />
      </Container>
    )
  }

  protected alreadyInsured() {
    return this.state.alreadyInsured
  }
}

/* TODO: Add proptypes check */
