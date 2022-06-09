import React from 'react'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { DownloadPageContent } from './components/DownloadPageContent'

export const Download = () => {
  return (
    <Page>
      <SessionTokenGuard>
        <>
          <TopBar textColorVariant="dark" />
          <DownloadPageContent />
        </>
      </SessionTokenGuard>
    </Page>
  )
}
