import { TopBar } from 'components/TopBar'
import * as React from 'react'
import { SignUp } from './sections/SignUp'

export const Sign: React.SFC = () => (
  <>
    <TopBar progress={2} showButton={false} />
    <SignUp
      title={'Hemförsäkring för'}
      adress={'Fantastiska Gatan 23B'}
      buttonText={'Signera med BankID'}
      inputTitleEmail={'Email'}
      inputTitlePersonalNumber={'Personnummer (12 siffror)'}
      errorMessage={
        'Något verkar ha gått snett :( Är du säker på att du fyllt i alla uppgifter rätt?'
      }
    />
  </>
)
