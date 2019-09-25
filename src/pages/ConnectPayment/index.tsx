import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'
import { ConnectPaymentPage } from './sections/ConnectPayment'

const OuterWrapper = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: colors.OFF_WHITE,
  position: 'absolute',
  top: 0,
  bottom: 0,
})

const InnerWrapper = styled('div')({
  backgroundColor: colors.OFF_WHITE,
  paddingBottom: 30,
})

export const ConnectPayment: React.SFC = () => (
  <Page>
    <SessionTokenGuard>
      <OfferContainer>
        {(offer) => (
          <>
            <TranslationsConsumer textKey="DOWNLOAD_PAGE_TITLE">
              {(t) => (
                <Helmet>
                  <title>{t}</title>
                </Helmet>
              )}
            </TranslationsConsumer>
            <TopBar progress={3} />
            <ConnectPaymentPage />
          </>
        )}
      </OfferContainer>
    </SessionTokenGuard>
  </Page>
)
