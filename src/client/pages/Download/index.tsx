import React from 'react'
import { SemanticEvents } from 'quepasa'
import Helmet from 'react-helmet-async'
import { Mount } from 'react-lifecycle-components/dist'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useTextKeys } from 'utils/textKeys'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import { DownloadApp } from './components/DownloadApp'

export const Download: React.FC = () => {
  const textKeys = useTextKeys()

  return (
    <Page>
      <SessionTokenGuard>
        <>
          <Helmet>
            <title>{textKeys.ONBOARDING_DOWNLOAD_PAGE_TITLE()}</title>
          </Helmet>
          <TopBar />
          <DownloadApp />
          <TrackAction
            event={{
              name: SemanticEvents.Ecommerce.PaymentInfoEntered,
              properties: {
                category: 'web-onboarding-steps',
                label: 'Payment',
                ...getUtmParamsFromCookie(),
              },
            }}
          >
            {({ track }) => <Mount on={track}>{null}</Mount>}
          </TrackAction>
        </>
      </SessionTokenGuard>
    </Page>
  )
}
