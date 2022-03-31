import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { useHistory } from 'react-router'
import { Button } from 'components/buttons'
import { useOnboardingQuoteCartId } from 'utils/hooks/useOnboardingQuoteCartId'
import { QuoteData } from './components/QuoteData'

const Wrapper = styled.div`
  max-width: 900px;
  padding: 1rem;
  margin: 0 auto;
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
  const history = useHistory()
  const quoteCartId = useOnboardingQuoteCartId()

  return (
    <Wrapper>
      <h1>Offer Page Debugger</h1>

      <Row>
        <h3>Quote Cart: {quoteCartId}</h3>
        <Button
          background={colorsV3.gray900}
          foreground={colorsV3.gray100}
          onClick={() => {
            history.push('?reset=true')
            window.location.reload()
          }}
        >
          Create new cart
        </Button>
      </Row>

      <Row>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            history.push('?reset=true')
            window.location.reload()
          }}
        >
          <h3>Offer</h3>
          <QuoteData quoteCartId={quoteCartId} />
        </ErrorBoundary>
      </Row>
    </Wrapper>
  )
}
