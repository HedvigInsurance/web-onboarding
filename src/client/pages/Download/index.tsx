import React from 'react'
import Helmet from 'react-helmet-async'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useTextKeys } from 'utils/textKeys'
import { DownloadPageContent } from './components/DownloadPageContent'

export const Download: React.FC = () => {
  const textKeys = useTextKeys()

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
