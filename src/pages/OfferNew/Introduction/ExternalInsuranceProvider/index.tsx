import * as React from 'react'
import styled from '@emotion/styled'
import {
  useExternalInsuranceDataQuery,
  useExternalInsuranceDataStatusSubscription,
} from '../../../../generated/graphql'

import { CompleteOfferDataForMember } from '../../types'
import { Compare } from './Compare'
import { useTextKeys } from 'utils/hooks/useTextKeys'

interface Props {
  offer: CompleteOfferDataForMember
}

const ErrorBox = styled.div`
  display: flex;
  padding: 1.25rem;
  background-color: white;
  border-radius: 0.5rem;
`

export const ExternalInsuranceProvider: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()
  const { loading, error, data, refetch } = useExternalInsuranceDataQuery({
    variables: {
      reference: offer.lastQuoteOfMember.dataCollectionId || '',
    },
  })

  const { data: subscriptionData } = useExternalInsuranceDataStatusSubscription(
    {
      variables: {
        reference: offer.lastQuoteOfMember.dataCollectionId || '',
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

  return <Compare offer={offer} insuranceDataCollection={firstInsurance} />
}
