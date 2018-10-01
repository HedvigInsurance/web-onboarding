import * as React from 'react';

import { PriceInfo } from '../sections/offering/price-info';
import { InsuranceCoverage } from '../sections/offering/insurance-coverage';
import { TopBar } from '../sections/offering/top-bar';
import { InsuredAmount } from '../sections/offering/insured-amount';
import styled from 'react-emotion';
import { HedvigInfo } from '../sections/offering/hedvig-info';
import { HedvigSwitch } from '../sections/offering/hedvig-switch';

const Container = styled('div')({

});

export class Offering extends React.Component {

  render(){
    return(

      /*TODO: graphql data */
      <Container>

        {/* Top Bar */}
        <TopBar getInsured={"Bli försäkrad"}/>

        {/* Pice Info Section */}
        <PriceInfo
          alreadyInsured={false}
          header={"Min hemförsäkring"}
          subTitle={"Krukmakargatn 5"}
          price={"299 kr/mån"}
          subscriptionTime={"Ingen bindningstid"}
          startDate={"Startdatum:"}
          coverage={"Gäller i hela världen"}
          getInsured={"Bli försäkrad"}
          BackgroundImage={"url(assets/offering/map-background.png)"}
          iconClock={'/assets/offering/start-date.png'}
          iconWorld={'/assets/offering/world.png'}
          alreadyInsuredLabel={'Gamla försäkringens slutdatum'}
          todayLabel={'Idag'}
        />

        {/* Hedvig Info Section */}
        <HedvigInfo title={'Det här är Hedvig'}/>


        <HedvigSwitch title={'Hedvig sköter bytet från din gamla försäkring'} />
        {/* Insurance Coverage Section */}
        <InsuranceCoverage
          headline={"Vad försäkringen täcker"}
          subTitle={"Klicka på ikonerna för mer info."}
        />

        {/* Insured Amount Section */}
        <InsuredAmount title={'Försäkrade belopp'} info={'Läs mer'}/>

      </Container>
    );
  }

}

/* TODO: Add proptypes check */
