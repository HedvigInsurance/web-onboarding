import * as React from 'react';
import { PriceInfo } from '../sections/offering/price-info';
import { InsuranceCoverage } from '../sections/offering/insurance-coverage';
import styled from 'react-emotion';
const Container = styled('div')({

});

export class Offering extends React.Component {

  render(){
    return(
      <Container>
        <PriceInfo alreadyInsured={false}/>
        <InsuranceCoverage headline={"Vad försäkringen täcker"}/>
      </Container>
    );
  }

}
