import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { Button } from 'components/buttons'
import { LoadingPage } from 'components/LoadingPage'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { motion } from 'framer-motion'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import {
  ExchangeTokenRetrieval,
  ExchangeTokenRetrievalState,
} from 'utils/ExchangeTokenRetrieval'

const ButtonWrapper = styled.div`
  padding-top: 1rem;
`

export const ConnectPaymentsDirectEntry: React.FC<RouteComponentProps<
  object
>> = () => {
  const locale = useCurrentLocale()

  return (
    <ExchangeTokenRetrieval>
      {({ exchangeTokenState, retry }) => (
        <LoadingPage
          loading={exchangeTokenState === ExchangeTokenRetrievalState.Loading}
        >
          {exchangeTokenState === ExchangeTokenRetrievalState.Success && (
            <Redirect to={`/${locale}/new-member/connect-payment`} />
          )}
          <FadeInUp
            visible={[
              ExchangeTokenRetrievalState.InvalidToken,
              ExchangeTokenRetrievalState.ExpiredToken,
              ExchangeTokenRetrievalState.Error,
            ].includes(exchangeTokenState)}
          >
            Something went wrong. Try again. Please change this message.
            <ButtonWrapper>
              <Button
                foreground={colorsV3.gray900}
                background={colorsV3.purple300}
                onClick={() => {
                  retry()
                }}
              >
                Retry
              </Button>
            </ButtonWrapper>
          </FadeInUp>
          <FadeInUp
            visible={
              exchangeTokenState === ExchangeTokenRetrievalState.TakingTooLong
            }
          >
            <div>
              Something is taking too long. Try again. Also change this message.
            </div>
            <ButtonWrapper>
              <Button
                foreground={colorsV3.gray900}
                background={colorsV3.purple300}
                onClick={() => {
                  location.reload()
                }}
              >
                Try again
              </Button>
            </ButtonWrapper>
          </FadeInUp>
        </LoadingPage>
      )}
    </ExchangeTokenRetrieval>
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
