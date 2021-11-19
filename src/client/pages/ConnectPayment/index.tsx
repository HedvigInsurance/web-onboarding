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
import { PhoneNumber } from 'components/PhoneNumber/PhoneNumber'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { ConnectPaymentPage } from './sections/ConnectPayment'

export const ConnectPayment: React.FC = () => {
  const textKeys = useTextKeys()
  const currentLocale = useCurrentLocale()

  return (
    <Page>
      <SessionTokenGuard>
        <Helmet>
          <title>{textKeys.ONBOARDING_CONNECT_DD_PAGE_TITLE()}</title>
        </Helmet>
        <TopBar>
          {currentLocale.phoneNumber ? (
            <PhoneNumber color="black" />
          ) : (
            <LanguagePicker />
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
