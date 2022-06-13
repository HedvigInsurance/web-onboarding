import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { motion } from 'framer-motion'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { Page } from 'components/utils/Page'
import { LoadingPage } from 'components/LoadingPage'
import { Button } from 'components/buttons'
import {
  ExchangeTokenRetrieval,
  ExchangeTokenRetrievalState,
} from 'utils/ExchangeTokenRetrieval'
import { useTextKeys } from 'utils/textKeys'

const ButtonWrapper = styled.div`
  padding-top: 1rem;
`

export const ConnectPaymentsDirectEntry = () => {
  const { path: currentLocalePath } = useCurrentLocale()
  const textKeys = useTextKeys()

  return (
    <Page>
      <ExchangeTokenRetrieval>
        {({ exchangeTokenState, retry }) => (
          <LoadingPage
            loading={exchangeTokenState === ExchangeTokenRetrievalState.Loading}
          >
            {exchangeTokenState === ExchangeTokenRetrievalState.Success && (
              <Redirect
                to={`/${currentLocalePath}/new-member/connect-payment`}
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
