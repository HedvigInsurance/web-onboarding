import React, { useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Button } from 'components/buttons'
import { useCreateOnboardingQuoteCartMutation } from 'data/graphql'
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
      <p>Error message: {error.message}</p>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
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
  const locale = useCurrentLocale()
  const [
    createOnboardingQuoteCart,
    { data },
  ] = useCreateOnboardingQuoteCartMutation()
  const quoteCartId = data?.onboardingQuoteCart_create

  const createNewQuoteCart = useCallback(async () => {
    await createOnboardingQuoteCart({
      variables: { market: locale.apiMarket, locale: locale.isoLocale },
    })
  }, [createOnboardingQuoteCart, locale.apiMarket, locale.isoLocale])

  useEffect(() => {
    // create initial onboarding session
    createNewQuoteCart()
  }, [createNewQuoteCart])

  return (
    <Wrapper>
      <h1>Offer Page Debugger</h1>

      <Row>
        <h3>Session: {quoteCartId}</h3>
        <Button
          background={colorsV3.purple500}
          foreground={colorsV3.gray900}
          onClick={createNewQuoteCart}
        >
          Create new session
        </Button>
      </Row>

      {quoteCartId && (
        <Row>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={createNewQuoteCart}
          >
            <h3>Offer</h3>
            <QuoteData quoteCartId={quoteCartId} />
          </ErrorBoundary>
        </Row>
      )}
    </Wrapper>
  )
}
