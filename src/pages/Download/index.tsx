import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { DownloadApp } from './sections/DownloadApp'

export const Download: React.SFC<{}> = () => (
  <Page>
    <TranslationsConsumer textKey="DOWNLOAD_PAGE_TITLE">
      {(t) => (
        <Helmet>
          <title>{t}</title>
        </Helmet>
      )}
    </TranslationsConsumer>
    <TopBar progress={3} />
    <DownloadApp />
  </Page>
)
