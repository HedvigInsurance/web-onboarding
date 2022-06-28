import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React, { ReactNode, Component } from 'react'
import { datadogRum } from '@datadog/browser-rum'
import { useTextKeys } from 'utils/textKeys'
import * as quoteBundleSelectors from 'api/quoteBundleSelectors'
import { QuoteBundle } from 'data/graphql'
import { InsuranceSummaryDetails } from './InsuranceSummaryDetails'
import { InsuranceSummaryTermsLinks } from './InsuranceSummaryTermsLinks'

const Wrapper = styled.div`
  padding: 0 8px;
`
const Title = styled.div`
  font-size: 1.125rem;
  font-family: ${fonts.HEDVIG_LETTERS_STANDARD};
  padding: 1rem 0;
`

const Table = styled.div`
  width: 100%;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
`
export const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  border-top: 1px solid ${colorsV3.gray300};
`

export const Row = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  line-height: 1;
`

interface ErrorBoundaryProps {
  children?: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    datadogRum.addError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

type Props = {
  quoteBundle: QuoteBundle
}

export const InsuranceSummary: React.FC<Props> = ({ quoteBundle }) => {
  const textKeys = useTextKeys()

  const mainQuote = quoteBundleSelectors.getMainQuote(quoteBundle)
  const personalDetails = quoteBundleSelectors.getOfferPersonInfo(quoteBundle)

  return (
    <Wrapper>
      <Title>{textKeys.CHECKOUT_SUMMARY_HEADLINE()}</Title>
      <Table>
        <ErrorBoundary
          fallback={<p>{textKeys.CONNECT_PAYMENT_ERROR_HEADLINE()}</p>}
        >
          <InsuranceSummaryDetails
            personalDetails={personalDetails}
            mainQuote={mainQuote}
          />
        </ErrorBoundary>
      </Table>
      <Title>{textKeys.CHECKOUT_TERMS_HEADLINE()}</Title>
      <Table>
        <InsuranceSummaryTermsLinks quotes={quoteBundle.quotes} />
      </Table>
    </Wrapper>
  )
}
