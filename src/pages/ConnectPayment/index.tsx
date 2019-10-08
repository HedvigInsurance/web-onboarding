import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { ConnectPaymentPage } from './sections/ConnectPayment'

export const ConnectPayment: React.SFC = () => (
  <Page>
    <SessionTokenGuard>
      <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_PAGE_TITLE">
        {(t) => (
          <Helmet>
            <title>{t}</title>
          </Helmet>
        )}
      </TranslationsConsumer>
      <TopBar progress={3} />
      <ConnectPaymentPage />
    </SessionTokenGuard>
  </Page>
)
