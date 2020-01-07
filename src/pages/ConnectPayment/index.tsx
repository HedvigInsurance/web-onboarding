import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { TopBar } from 'new-components/TopBar'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { StorageContainer } from '../../utils/StorageContainer'
import { ConnectPaymentPage } from './sections/ConnectPayment'

export const ConnectPayment: React.FC = () => {
  const textKeys = useTextKeys()

  return (
    <Page>
      <SessionTokenGuard>
        <Helmet>
          <title>{textKeys.ONBOARDING_CONNECT_DD_PAGE_TITLE()}</title>
        </Helmet>
        <StorageContainer>
          {({ session }) => <TopBar partner={session?.getSession()?.partner} />}
        </StorageContainer>
        <ConnectPaymentPage />
      </SessionTokenGuard>
    </Page>
  )
}
