import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { LoadingPage } from 'components/LoadingPage'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { useRedeemedCampaignsQuery } from 'data/graphql'
import { SemanticEvents } from 'quepasa'
import React from 'react'
import Helmet from 'react-helmet-async'
import { Mount } from 'react-lifecycle-components/dist'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking/tracking'
import {
  DownloadAppHedvigForeverMember,
  DownloadAppRegular,
} from './sections/DownloadApp'

const TopBarWrapper = styled('div')`
  color: ${colorsV3.black};
`

export const Download: React.FC = () => {
  const campaigns = useRedeemedCampaignsQuery()

  if (campaigns.loading) {
    return <LoadingPage loading />
  }

  const isReferral =
    campaigns.data?.redeemedCampaigns &&
    campaigns.data.redeemedCampaigns[0]?.incentive?.__typename ===
      'MonthlyCostDeduction'

  return (
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

          {isReferral ? (
            <DownloadAppHedvigForeverMember />
          ) : (
            <DownloadAppRegular />
          )}

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
