import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { TopBar } from 'components/TopBar'
import { Page } from 'components/utils/Page'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'
import { Legal } from './sections/LegalText'
import { SignUp } from './sections/SignUp'

const OuterWrapper = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: colors.OFF_WHITE,
  position: 'absolute',
  bottom: 0,
})

export const Sign: React.SFC = () => (
  <Page>
    <SessionTokenGuard>
      <OfferContainer>
        {(offer) => {
          if (!offer || !offer.insurance.type) {
            return null
          }
          return (
            <OuterWrapper>
              {' '}
              <TranslationsConsumer textKey="SIGN_PAGE_TITLE">
                {(t) => (
                  <Helmet>
                    <title>{t}</title>
                  </Helmet>
                )}
              </TranslationsConsumer>
              <TopBar progress={2} />
              <SignUp offer={offer} />
              <Legal insuranceType={offer.insurance.type} />
            </OuterWrapper>
          )
        }}
      </OfferContainer>
    </SessionTokenGuard>
  </Page>
)
