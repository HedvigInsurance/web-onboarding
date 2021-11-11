import styled from '@emotion/styled'
import React from 'react'
import { useEditQuoteMutation } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { useUnderwritingLimitsHitReporter } from 'utils/sentry-client'
import { PriceBreakdown } from '../common/PriceBreakdown'
import { StartDate } from '../Introduction/Sidebar/StartDate'
import { OfferData } from '../types'
import { getQuoteIds } from '../utils'
import { InsuranceSummary } from './InsuranceSummary'
import { UserDetailsForm } from './UserDetailsForm'
import { useSsnError } from './hooks'

const Section = styled.div`
  width: 100%;
`

const StartDateWrapper = styled.div`
  position: relative;
  margin-top: 0.375rem;
  margin-bottom: 2rem;
`

const StartDateLabel = styled.p`
  margin: 0 0 0.5rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1;
`

const Heading = styled.h3`
  margin: 0;
  font-size: 2rem;
  line-height: 2.5rem;
  padding-top: 1.875rem;
`

interface Props {
  offerData: OfferData
  refetch: () => Promise<void>
  onEmailUpdate: (onCompletion: Promise<void>) => void
  onSsnUpdate: (onCompletion: Promise<void>) => void
  onSubmit: () => void
}

export const CheckoutContent: React.FC<Props> = ({
  offerData,
  onEmailUpdate,
  onSsnUpdate,
  refetch,
  onSubmit,
}) => {
  const textKeys = useTextKeys()
  const [fakeLoading, setFakeLoading] = React.useState(false)
  const [reallyLoading, setReallyLoading] = React.useState(false)
  const [editQuote, editQuoteResult] = useEditQuoteMutation()
  const { ssnBackendError } = useSsnError(editQuoteResult)
  const quoteIds = getQuoteIds(offerData)

  useUnderwritingLimitsHitReporter(
    editQuoteResult.data?.editQuote?.__typename === 'UnderwritingLimitsHit' &&
      editQuoteResult.data.editQuote.limits.map((limit) => limit.code),
    quoteIds,
  )

  return (
    <>
      <Section>
        <Heading>{textKeys.CHECKOUT_HEADING()}</Heading>
        <PriceBreakdown
          offerData={offerData}
          showTotal={true}
          isLoading={fakeLoading || reallyLoading}
        />
        <UserDetailsForm
          onSubmit={onSubmit}
          email={offerData.person.email ?? ''}
          onEmailChange={(email) => {
            const onCompletion = new Promise<void>((resolve, reject) => {
              Promise.all(
                quoteIds.map((quoteId) =>
                  editQuote({ variables: { input: { id: quoteId, email } } }),
                ),
              )
                .then(() => refetch())
                .then(() => resolve())
                .catch((e) => {
                  reject(e)
                  throw e
                })
            })
            onEmailUpdate(onCompletion)
          }}
          ssn={offerData.person.ssn ?? ''}
          ssnBackendError={ssnBackendError}
          onSsnChange={(ssn) => {
            const onCompletion = new Promise<void>((resolve, reject) => {
              setFakeLoading(true)
              setReallyLoading(true)
              window.setTimeout(() => setFakeLoading(false), 1000)
              Promise.all(
                quoteIds.map((quoteId) =>
                  editQuote({ variables: { input: { id: quoteId, ssn } } }),
                ),
              )
                .then(() => refetch())
                .then(() => setReallyLoading(false))
                .then(() => resolve())
                .catch((e) => {
                  setReallyLoading(false)
                  reject(e)
                  throw e
                })
            })
            onSsnUpdate(onCompletion)
          }}
        />
        <StartDateWrapper>
          <StartDateLabel>
            {textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}
          </StartDateLabel>
          <StartDate offerData={offerData} refetch={refetch} />
        </StartDateWrapper>
        <InsuranceSummary offerData={offerData} />
      </Section>
    </>
  )
}
