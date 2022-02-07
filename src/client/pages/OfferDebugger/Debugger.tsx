import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Button } from 'components/buttons'
import { useCreateQuoteCart } from 'utils/hooks/useCreateQuoteCart'
import { Label } from 'components/inputs/index'
import { QuoteData } from './components/QuoteData'

const Wrapper = styled.div`
  max-width: 900px;
  padding: 1rem;
  margin: 0 auto;
  color: ${colorsV3.gray100};
  ${Label} {
    color: white;
  }
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
  const [createQuoteCart, { data }] = useCreateQuoteCart()
  const quoteCartId = data?.onboardingQuoteCart_create.id

  useEffect(() => {
    // create initial onboarding session
    createQuoteCart()
  }, [createQuoteCart])

  return (
    <Wrapper>
      <h1>Offer Page Debugger</h1>

      <Row>
        <h3>Quote Cart: {quoteCartId}</h3>
        <Button
          background={colorsV3.gray100}
          foreground={colorsV3.gray900}
          onClick={() => createQuoteCart()}
        >
          Create new cart
        </Button>
      </Row>

      {quoteCartId && (
        <Row>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => createQuoteCart()}
          >
            <h3>Offer</h3>
            <QuoteData quoteCartId={quoteCartId} />
          </ErrorBoundary>
        </Row>
      )}
    </Wrapper>
  )
}
