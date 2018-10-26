import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { SignUp } from './sections/SignUp'

export const Sign: React.SFC = () => (
  <Page>
    <TranslationsConsumer textKey="SIGN_PAGE_TITLE">
      {(t) => (
        <Helmet>
          <title>{t}</title>
        </Helmet>
      )}
    </TranslationsConsumer>
    <TopBar progress={2} />
    <SignUp />
  </Page>
)
