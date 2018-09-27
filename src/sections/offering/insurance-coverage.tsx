import * as React from 'react';
import styled from 'react-emotion';
import { Header, SubTitle  } from './price-info';

interface Props {
  headline: string,
  subTitle: string,
  
}

const Container = styled('div')({
  marginTop: '80px',
});

export const InsuranceCoverage: React.SFC<Props> = (props) => (
  <Container>
    <Header>{props.headline}</Header>
    <SubTitle>{props.subTitle}</SubTitle>
  </Container>
);
