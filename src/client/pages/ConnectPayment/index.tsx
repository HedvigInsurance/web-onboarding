import { SemanticEvents } from 'quepasa'
import React from 'react'
import Helmet from 'react-helmet-async'
import { Mount } from 'react-lifecycle-components/dist'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { LanguagePicker } from 'pages/Embark/LanguagePicker'
import { useTextKeys } from 'utils/textKeys'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { PhoneNumber } from 'components/PhoneNumber/PhoneNumber'
import { ConnectPaymentPage } from './sections/ConnectPayment'

export const ConnectPayment: React.FC = () => {
  const textKeys = useTextKeys()
  const market = useMarket()

  return (
    <Page>
      <SessionTokenGuard>
        <Helmet>
          <title>{textKeys.ONBOARDING_CONNECT_DD_PAGE_TITLE()}</title>
        </Helmet>
        <TopBar>
          {market === Market.Se ? (
            <PhoneNumber color="white" />
          ) : (
            <LanguagePicker path="/new-member/connect-payment" />
          )}
        </TopBar>
        <ConnectPaymentPage />

        <TrackAction
          event={{
            name: SemanticEvents.Ecommerce.CheckoutStepCompleted,
            properties: {
              category: 'web-onboarding-steps',
              action: 'Signed',
              label: 'Completed',
              ...getUtmParamsFromCookie(),
            },
          }}
        >
          {({ track }) => <Mount on={track}>{null}</Mount>}
        </TrackAction>
      </SessionTokenGuard>
    </Page>
  )
}
