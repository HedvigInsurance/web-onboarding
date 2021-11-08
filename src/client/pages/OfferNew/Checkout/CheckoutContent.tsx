import styled from '@emotion/styled'
import React from 'react'
import { useTextKeys } from 'utils/textKeys'
import { PriceBreakdown } from '../common/PriceBreakdown'
import { StartDate } from '../Introduction/Sidebar/StartDate'
import { OfferData } from '../types'
import { InsuranceSummary } from './InsuranceSummary'

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
  isLoading: boolean
  refetch: () => Promise<void>
}

export const CheckoutContent: React.FC<Props> = ({
  offerData,
  children,
  isLoading,
  refetch,
}) => {
  const textKeys = useTextKeys()

  return (
    <>
      <Section>
        <Heading>{textKeys.CHECKOUT_HEADING()}</Heading>
        <PriceBreakdown
          offerData={offerData}
          showTotal={true}
          isLoading={isLoading}
        />

        {children}

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
