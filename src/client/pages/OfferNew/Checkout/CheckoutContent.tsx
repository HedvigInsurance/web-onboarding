import styled from '@emotion/styled'
import React from 'react'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { useEditQuoteMutation, useRedeemedCampaignsQuery } from 'data/graphql'
import { Price } from 'pages/OfferNew/components'
import { useTextKeys } from 'utils/textKeys'
import { useUnderwritingLimitsHitReporter } from 'utils/sentry-client'
import { StartDate } from '../Introduction/Sidebar/StartDate'
import { OfferData } from '../types'
import {
  getQuoteIds,
  insuranceTypeTextKeys,
  isBundle,
  isMonthlyCostDeduction,
} from '../utils'
import { InsuranceSummary } from './InsuranceSummary'
import { UserDetailsForm } from './UserDetailsForm'
import { useSsnError } from './hooks'

const Section = styled.div`
  width: 100%;
`

const Excerpt = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 1.5rem;

  @media (min-width: 40rem) {
    padding-bottom: 2rem;
  }
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

const InsuranceHeading = styled.h3`
  font-size: 1.5rem;
  line-height: 2rem;

  span {
    display: block;
  }
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
  const market = useMarket()
  const redeemedCampaignsQuery = useRedeemedCampaignsQuery()
  const monthlyCostDeduction = isMonthlyCostDeduction(
    redeemedCampaignsQuery.data?.redeemedCampaigns ?? [],
  )
  const [fakeLoading, setFakeLoading] = React.useState(false)
  const [reallyLoading, setReallyLoading] = React.useState(false)
  const [editQuote, editQuoteResult] = useEditQuoteMutation()
  const { ssnBackendError } = useSsnError(editQuoteResult)
  const quoteIds = getQuoteIds(offerData)

  useUnderwritingLimitsHitReporter(
    editQuoteResult.data?.editQuote?.__typename === 'UnderwritingLimitsHit' &&
      editQuoteResult.data.editQuote.limits.map((limit) => limit.description),
    quoteIds,
  )

  return (
    <>
      <Section>
        <Excerpt>
          <InsuranceHeading>
            {market === Market.Se && <span>{textKeys.SIDEBAR_LABEL()}</span>}
            <span>
              {!isBundle(offerData) &&
                textKeys[
                  insuranceTypeTextKeys[offerData.quotes[0].contractType]
                ]()}
              {isBundle(offerData) &&
                textKeys.SIDEBAR_INSURANCE_TYPE_NO_BUNDLE()}
            </span>
          </InsuranceHeading>
          <div>
            <Price
              loading={fakeLoading || reallyLoading}
              monthlyGross={offerData.cost.monthlyGross}
              monthlyNet={offerData.cost.monthlyNet}
              isDiscountPrice={monthlyCostDeduction}
            />
          </div>
        </Excerpt>

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
