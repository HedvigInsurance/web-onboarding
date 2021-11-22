import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { motion } from 'framer-motion'
import React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { Page } from 'components/utils/Page'
import { LoadingPage } from 'components/LoadingPage'
import { Button } from 'components/buttons'
import {
  ExchangeTokenRetrieval,
  ExchangeTokenRetrievalState,
} from 'utils/ExchangeTokenRetrieval'
import { useTextKeys } from 'utils/textKeys'
import { useCurrentLocale } from 'src/client/l10n/useCurrentLocale'

const ButtonWrapper = styled.div`
  padding-top: 1rem;
`

export const ConnectPaymentsDirectEntry: React.FC<RouteComponentProps<
  Record<string, string | undefined>
>> = () => {
  const currentLocale = useCurrentLocale()
  const textKeys = useTextKeys()

  return (
    <Page>
      <Helmet>
        <title>{textKeys.ONBOARDING_CONNECT_DD_PAGE_TITLE()}</title>
        <meta
          property="og:image"
          content="https://www.hedvig.com/new-member-assets/social/hedvig-hemforsakring-2.jpg"
        />
        <meta
          property="og:title"
          content={textKeys.ONBOARDING_CONNECT_DD_PAGE_TITLE()}
        />
      </Helmet>

      <ExchangeTokenRetrieval>
        {({ exchangeTokenState, retry }) => (
          <LoadingPage
            loading={exchangeTokenState === ExchangeTokenRetrievalState.Loading}
          >
            {exchangeTokenState === ExchangeTokenRetrievalState.Success && (
              <Redirect
                to={`/${currentLocale.path}/new-member/connect-payment`}
              />
            )}
            <FadeInUp
              visible={[
                ExchangeTokenRetrievalState.InvalidToken,
                ExchangeTokenRetrievalState.ExpiredToken,
                ExchangeTokenRetrievalState.Error,
              ].includes(exchangeTokenState)}
            >
              {exchangeTokenState ===
                ExchangeTokenRetrievalState.InvalidToken &&
                textKeys.CONNECT_PAYMENT_DIRECT_ERROR_INVALID_TOKEN()}
              {exchangeTokenState ===
                ExchangeTokenRetrievalState.ExpiredToken &&
                textKeys.CONNECT_PAYMENT_DIRECT_ERROR_EXPIRED_TOKEN()}
              {exchangeTokenState === ExchangeTokenRetrievalState.Error &&
                textKeys.CONNECT_PAYMENT_DIRECT_ERROR_UNKNOWN()}

              <ButtonWrapper>
                <Button
                  foreground={colorsV3.gray900}
                  background={colorsV3.purple500}
                  onClick={() => {
                    retry()
                  }}
                >
                  {textKeys.RETRY()}
                </Button>
              </ButtonWrapper>
            </FadeInUp>
            <FadeInUp
              visible={
                exchangeTokenState === ExchangeTokenRetrievalState.TakingTooLong
              }
            >
              <div>
                {textKeys.CONNECT_PAYMENT_DIRECT_ERROR_TAKING_TOO_LONG()}
              </div>
              <ButtonWrapper>
                <Button
                  foreground={colorsV3.gray900}
                  background={colorsV3.purple500}
                  onClick={() => {
                    location.reload()
                  }}
                >
                  {textKeys.RETRY()}
                </Button>
              </ButtonWrapper>
            </FadeInUp>
          </LoadingPage>
        )}
      </ExchangeTokenRetrieval>
    </Page>
  )
}

const FadeInUp: React.FC<{ visible: boolean }> = ({ visible, children }) => (
  <motion.div
    initial="hidden"
    animate={visible ? 'visible' : 'hidden'}
    style={{ padding: '1rem' }}
    variants={{
      hidden: {
        opacity: 0,
        height: 0,
      },
      visible: {
        opacity: 1,
        height: 'auto',
      },
    }}
  >
    {children}
  </motion.div>
)
