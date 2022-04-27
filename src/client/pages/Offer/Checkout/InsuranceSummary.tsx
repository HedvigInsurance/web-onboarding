import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { ErrorBoundary } from '@sentry/react'
import { OfferData } from 'pages/OfferNew/types'
import { getMainQuote } from 'pages/OfferNew/utils'
import { useTextKeys } from 'utils/textKeys'
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

type Props = {
  offerData: OfferData
}

export const InsuranceSummary: React.FC<Props> = ({ offerData }) => {
  const textKeys = useTextKeys()

  const mainQuote = getMainQuote(offerData)

  return (
    <Wrapper>
      <Title>{textKeys.CHECKOUT_SUMMARY_HEADLINE()}</Title>
      <Table>
        <ErrorBoundary
          fallback={<p>{textKeys.CONNECT_PAYMENT_ERROR_HEADLINE()}</p>}
        >
          <InsuranceSummaryDetails
            personalDetails={offerData.person}
            mainQuote={mainQuote}
          />
        </ErrorBoundary>
      </Table>
      <Title>{textKeys.CHECKOUT_TERMS_HEADLINE()}</Title>
      <Table>
        <InsuranceSummaryTermsLinks offerData={offerData} />
      </Table>
    </Wrapper>
  )
}
