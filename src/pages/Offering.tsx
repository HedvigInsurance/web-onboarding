import * as React from 'react';
import { PriceInfo } from '../sections/offering/price-info';

export class Offering extends React.Component {

  render(){
    return(
      <PriceInfo alreadyInsured={false}/>
    );
  }

}
