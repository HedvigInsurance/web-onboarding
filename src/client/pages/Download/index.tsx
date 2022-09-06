import React from 'react'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { DownloadPageContent } from './components/DownloadPageContent'

export const Download = () => {
  return (
    <Page>
      <SessionTokenGuard>
        <DownloadPageContent />
      </SessionTokenGuard>
    </Page>
  )
}
