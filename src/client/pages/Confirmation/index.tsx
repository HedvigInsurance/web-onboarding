import React from 'react'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { DownloadPageContent } from '../Download/components/DownloadPageContent'

export const Confirmation = () => {
  return (
    <Page>
      <SessionTokenGuard>
        <TopBar textColorVariant="dark" />
        <DownloadPageContent
          paragraphTextKeys={[
            'ONBOARDING_CONFIRMATION_PARAGRAPH_1',
            'ONBOARDING_CONFIRMATION_PARAGRAPH_2',
          ]}
          headlineTextKeys={[
            'ONBOARDING_CONFIRMATION_HEADLINE_PART_1',
            'ONBOARDING_CONFIRMATION_HEADLINE_PART_2',
          ]}
        />
      </SessionTokenGuard>
    </Page>
  )
}
