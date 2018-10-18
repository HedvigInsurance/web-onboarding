import { TopBar } from 'components/TopBar'
import * as React from 'react'
import { SignUp } from './sections/SignUp'

export const Sign: React.SFC = () => (
  <>
    <TopBar progress={2} buttonOneVisible={false} buttonTwoVisible={false} />
    <SignUp />
  </>
)
