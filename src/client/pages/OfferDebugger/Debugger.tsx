import React, { useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Button } from 'components/buttons'
import { useCreateOnboardingSessionMutation } from 'data/graphql'
import { useMarket } from 'components/utils/CurrentLocale'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { QuoteData } from './components/QuoteData'

const Wrapper = styled.div`
  max-width: 900px;
  padding: 1rem;
  margin: 0 auto;
  color: ${colorsV3.gray100};
`

const Row = styled.div`
  padding-bottom: 1rem;
`

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => (
  <div>
    <h2>Something went wrong 😔</h2>
    <div>
      <p>Error message:</p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error}</pre>
    </div>
    <Button
      background={colorsV3.red500}
      foreground={colorsV3.gray100}
      onClick={resetErrorBoundary}
    >
      👉 Try starting over by creating a new session!
    </Button>
  </div>
)

export const Debugger: React.FC = () => {
  const market = useMarket()
  const locale = useCurrentLocale().isoLocale
  const [
    createOnboardingSession,
    { data },
  ] = useCreateOnboardingSessionMutation()
  const sessionId = data?.onboardingSession_create

  const createNewSession = useCallback(async () => {
    await createOnboardingSession({ variables: { country: market, locale } })
  }, [createOnboardingSession, market, locale])

  useEffect(() => {
    // create initial onboarding session
    createNewSession()
  }, [createNewSession])

  return (
    <Wrapper>
      <h1>Offer Page Debugger</h1>

      <Row>
        <h3>Session: {sessionId}</h3>
        <Button
          background={colorsV3.purple500}
          foreground={colorsV3.gray900}
          onClick={createNewSession}
        >
          Create new session
        </Button>
      </Row>

      {sessionId && (
        <Row>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={createNewSession}
          >
            <h3>Offer</h3>
            <QuoteData sessionId={sessionId} />
          </ErrorBoundary>
        </Row>
      )}
    </Wrapper>
  )
}
