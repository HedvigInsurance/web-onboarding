import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import * as React from 'react'
import { SignUp } from './sections/SignUp'

export const Sign: React.SFC = () => (
  <Page>
    <TopBar progress={2} />
    <SignUp />
  </Page>
)
