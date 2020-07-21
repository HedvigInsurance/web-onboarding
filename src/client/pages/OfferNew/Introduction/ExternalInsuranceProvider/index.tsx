import styled from '@emotion/styled'
import {
  useExternalInsuranceDataQuery,
  useExternalInsuranceDataStatusSubscription,
} from 'data/graphql'
import { OfferData } from 'pages/OfferNew/types'
import React from 'react'

import { useTextKeys } from 'utils/hooks/useTextKeys'
import { Compare } from './Compare'

interface Props {
  dataCollectionId: string
  offerData: OfferData
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

export const ExternalInsuranceProvider: React.FC<Props> = ({
  dataCollectionId,
  offerData,
}) => {
  const textKeys = useTextKeys()
  const { loading, error, data, refetch } = useExternalInsuranceDataQuery({
    variables: {
      reference: dataCollectionId,
    },
  })

  const { data: subscriptionData } = useExternalInsuranceDataStatusSubscription(
    {
      variables: {
        reference: dataCollectionId,
      },
    },
  )

  React.useEffect(() => {
    refetch()
  }, [subscriptionData?.dataCollectionStatus?.status])

  if (
    loading ||
    error ||
    !data ||
    !subscriptionData?.dataCollectionStatus?.status
  ) {
    return null
  }

  switch (subscriptionData?.dataCollectionStatus?.status) {
    case 'COLLECTING':
      return <ErrorBox>{textKeys.EXTERNAL_INSURANCE_COLLECTING()}</ErrorBox>
    case 'COMPLETED_EMPTY':
      return <ErrorBox>{textKeys.EXTERNAL_INSURANCE_EMPTY()}</ErrorBox>
    case 'FAILED':
      return <ErrorBox>{textKeys.EXTERNAL_INSURANCE_FAILED()}</ErrorBox>
  }

  const firstInsurance = data.externalInsuranceProvider?.dataCollection[0]

  if (!firstInsurance) {
    return <ErrorBox>{textKeys.EXTERNAL_INSURANCE_FAILED()}</ErrorBox>
  }

  return (
    <Compare cost={offerData.cost} insuranceDataCollection={firstInsurance} />
  )
}
