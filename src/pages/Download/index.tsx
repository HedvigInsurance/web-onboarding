import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import * as React from 'react'
import { DownloadApp } from './sections/DownloadApp'

export const Download: React.SFC<{}> = () => (
  <Page>
    <TopBar progress={3} />
    <DownloadApp />
  </Page>
)
