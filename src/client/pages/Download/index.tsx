import React, { useEffect } from 'react'
import { SemanticEvents } from 'quepasa'
import Helmet from 'react-helmet-async'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useTextKeys } from 'utils/textKeys'
import { getUtmParamsFromCookie } from 'utils/tracking/gtm/helpers'
import { useTrackSegmentEvent } from 'utils/tracking/hooks/useTrackSegmentEvent'
import { DownloadPageContent } from './components/DownloadPageContent'

export const Download: React.FC = () => {
  const textKeys = useTextKeys()
  const trackSegmentEvent = useTrackSegmentEvent()
  useEffect(() => {
    trackSegmentEvent({
      name: SemanticEvents.Ecommerce.PaymentInfoEntered,
      properties: {
        category: 'web-onboarding-steps',
        label: 'Payment',
        ...getUtmParamsFromCookie(),
      },
    })
  }, [trackSegmentEvent])

  return (
    <Page>
      <SessionTokenGuard>
        <>
          <Helmet>
            <title>{textKeys.ONBOARDING_DOWNLOAD_PAGE_TITLE()}</title>
          </Helmet>
          <TopBar textColorVariant="dark" />
          <DownloadPageContent />
        </>
      </SessionTokenGuard>
    </Page>
  )
}
