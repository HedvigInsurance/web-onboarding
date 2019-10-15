import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { EmptyTopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'
import { OfferContainer } from '../../containers/OfferContainer'
import { SessionTokenGuard } from '../../containers/SessionTokenGuard'
import { StorageContainer } from '../../utils/StorageContainer'
import { DownloadApp } from './sections/DownloadApp'

const ProceedLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  color: colors.PURPLE,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
})

const RightArrowSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 408 408"
  >
    <polygon points="204,0 168.3,35.7 311.1,178.5 0,178.5 0,229.5 311.1,229.5 168.3,372.3 204,408 408,204" />
  </svg>
)

const RightArrow = styled(RightArrowSvg)({
  width: 14,
  height: 14,
  fill: colors.PURPLE,
  marginLeft: 10,
})

export const Download: React.SFC<{}> = () => (
  <Page>
    <SessionTokenGuard>
      <OfferContainer>
        {(offer) => (
          <>
            <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_PAGE_TITLE">
              {(t) => (
                <Helmet>
                  <title>{t}</title>
                </Helmet>
              )}
            </TranslationsConsumer>
            <StorageContainer>
              {({ session }) => (
                <EmptyTopBar
                  proceedComponent={
                    <ProceedLink href="/">
                      <TranslationsConsumer textKey="ONBOARDING_DOWNLOAD_PROCEED_TEXT">
                        {(text) => text}
                      </TranslationsConsumer>
                      <RightArrow />
                    </ProceedLink>
                  }
                  partner={
                    session &&
                    session.getSession() &&
                    session.getSession()!.partner
                  }
                />
              )}
            </StorageContainer>

            <DownloadApp
              hasCurrentInsurer={offer.insurance.insuredAtOtherCompany}
            />
          </>
        )}
      </OfferContainer>
    </SessionTokenGuard>
  </Page>
)
