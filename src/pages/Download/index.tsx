import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { SessionTokenGuard } from '../../containers/SessionTokenGuard'
import { DownloadApp } from './sections/DownloadApp'

const TopBarWrapper = styled('div')`
  color: ${colorsV3.black};
`

export const Download: React.FC = () => (
  <Page>
    <SessionTokenGuard>
      <>
        <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_PAGE_TITLE">
          {(t) => (
            <Helmet>
              <title>{t}</title>
            </Helmet>
          )}
        </TranslationsConsumer>
        <TopBarWrapper>
          <TopBar />
        </TopBarWrapper>

        <DownloadApp />
      </>
    </SessionTokenGuard>
  </Page>
)
