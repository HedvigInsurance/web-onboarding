import React from 'react'
import styled from '@emotion/styled'
import { useExternalInsuranceDataQuery } from 'data/graphql'
import { OfferData } from 'pages/Offer/types'

import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartData } from 'utils/hooks/useQuoteCartData'
import { Compare } from './Compare'

type Props = {
  dataCollectionId: string
  offerData: OfferData
}

export const ExternalInsuranceProvider = ({
  dataCollectionId,
  offerData,
}: Props) => {
  const textKeys = useTextKeys()

  const { loading, error, data } = useExternalInsuranceDataQuery({
    variables: {
      reference: dataCollectionId,
    },
  })
  const { data: quoteCartData } = useQuoteCartData()

  if (loading || error || !data) {
    return null
  }

  const firstInsurance = data.externalInsuranceProvider?.dataCollection[0]
  if (!firstInsurance) {
    return <ErrorBox>{textKeys.EXTERNAL_INSURANCE_FAILED()}</ErrorBox>
  }

  const bundleDisplayName =
    quoteCartData?.selectedQuoteBundleVariant.bundle.displayName

  return (
    <Compare
      description={bundleDisplayName}
      cost={offerData.cost}
      insuranceDataCollection={firstInsurance}
    />
  )
}

const ErrorBox = styled.div`
  display: flex;
  padding: 1.25rem;
  background-color: white;
  border-radius: 0.5rem;
  font-weight: 300;

  @media (max-width: 800px) {
    margin-bottom: 1.25rem;
    width: 100%;
  }
`
