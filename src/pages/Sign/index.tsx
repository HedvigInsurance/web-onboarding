import { TopBar } from 'components/TopBar'
import * as React from 'react'
import styled from 'react-emotion'
import { SignUp } from './sections/SignUp'

const Wrapper = styled('div')({})

export const Sign: React.SFC<{}> = () => (
  <Wrapper>
    <TopBar progress={2} showButton={false} />
    <SignUp
      title={'Hemförsäkring för'}
      adress={'Fantastiska Gatan 23B'}
      buttonText={'Signera med BankID'}
    />
  </Wrapper>
)
