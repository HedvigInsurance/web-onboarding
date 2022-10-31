import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useExternalInsuranceDataQuery } from 'data/graphql'
import { OfferQuote } from 'pages/Offer/types'
import { useTextKeys } from 'utils/textKeys'

type Props = {
  dataCollectionId: OfferQuote['dataCollectionId']
}

export const StartDateLabelSwitcher = ({ dataCollectionId }: Props) => {
  const textKeys = useTextKeys()

  const {
    data: externalInsuranceData,
    loading,
  } = useExternalInsuranceDataQuery({
    variables: {
      reference: dataCollectionId || '',
    },
    skip: !dataCollectionId,
  })

  // TODO: fix this when implementing Insurely in Norway 👇
  const firstCurrentInsurance =
    externalInsuranceData?.externalInsuranceProvider?.dataCollection[0]
  const renewalDate = firstCurrentInsurance?.renewalDate
  const currentInsurerName = firstCurrentInsurance?.insuranceProviderDisplayName

  if (loading) {
    return <Empty />
  }

  return (
    <>
      {renewalDate && (
        <DataCollectedStartDateWrapper>
          <DataCollectedStartDateValue>
            {renewalDate}
          </DataCollectedStartDateValue>
          <DataCollectedStartDateDescription>
            {textKeys.START_DATE_EXTERNAL_PROVIDER_SWITCH({
              insuranceProvider: currentInsurerName,
            })}
          </DataCollectedStartDateDescription>
        </DataCollectedStartDateWrapper>
      )}
      {!renewalDate && (
        <GenericLabel>
          {textKeys.SIDEBAR_STARTDATE_CELL_VALUE_SWITCHER()}
        </GenericLabel>
      )}
    </>
  )
}

const DataCollectedStartDateWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: right;
  padding-right: 1rem;
`
const DataCollectedStartDateDescription = styled.span`
  font-size: 0.75rem;
  line-height: 0.75rem;
  color: ${colorsV3.gray700};
`
const DataCollectedStartDateValue = styled.span`
  font-size: 1rem;
  padding-right: 0.5rem;
`
const GenericLabel = styled.span`
  font-size: 0.875rem;
  line-height: 1;
  color: ${colorsV3.gray500};
`
const Empty = styled.div`
  width: 100%;
`
