import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { Mount } from 'react-lifecycle-components/dist'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking'
import { DownloadAppHedvigForeverMember } from './sections/DownloadApp'

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
          <TopBar centered />
        </TopBarWrapper>

        <DownloadAppHedvigForeverMember />

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
