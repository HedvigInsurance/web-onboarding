import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { StorageContainer } from '../../utils/StorageContainer'
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
      <StorageContainer>
        {({ session }) => (
          <TopBar
            progress={3}
            partner={
              session && session.getSession() && session.getSession()!.partner
            }
          />
        )}
      </StorageContainer>
      <ConnectPaymentPage />
    </SessionTokenGuard>
  </Page>
)
