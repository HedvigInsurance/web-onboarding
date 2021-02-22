import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { externalInsuranceProviders } from '@hedviginsurance/embark'
import { useExternalInsuranceDataQuery } from 'data/graphql'
import { OfferQuote } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'

type Props = {
  dataCollectionId: OfferQuote['dataCollectionId']
}

const DataCollectedStartDateWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  text-align: right;
  margin-right: 0.5rem;
`

const DataCollectedStartDateDescription = styled.span`
  font-size: 0.75rem;
  line-height: 0.75rem;
  color: ${colorsV3.gray700};
`

const DataCollectedStartDateValue = styled.span`
  font-size: 1rem;
`

const GenericLabel = styled.span`
  font-size: 0.875rem;
  line-height: 1;
  color: ${colorsV3.gray500};
`

export const StartDateLabelSwitcher: React.FC<Props> = ({
  dataCollectionId,
}) => {
  const { data: externalInsuranceData } = useExternalInsuranceDataQuery({
    variables: {
      reference: dataCollectionId || '',
    },
    skip: !dataCollectionId,
  })
  const textKeys = useTextKeys()

  // TODO: when implementing Insurely in Norway this 👇 needs to be remade since renewal dates can differ on the two existing insurances
  const firstExternalInsurance =
    externalInsuranceData?.externalInsuranceProvider?.dataCollection[0]
  const renewalDate = firstExternalInsurance?.renewalDate

  if (renewalDate) {
    const externalInsuranceProvider = externalInsuranceProviders.find(
      (provider: { externalCollectionId?: string }) =>
        provider.externalCollectionId ===
        firstExternalInsurance?.insuranceProvider?.toUpperCase(),
    )

    return (
      <DataCollectedStartDateWrapper>
        <DataCollectedStartDateValue>{renewalDate}</DataCollectedStartDateValue>
        <DataCollectedStartDateDescription>
          {textKeys.START_DATE_EXTERNAL_PROVIDER_SWITCH({
            insuranceProvider: externalInsuranceProvider?.name,
          })}
        </DataCollectedStartDateDescription>
      </DataCollectedStartDateWrapper>
    )
  }

  return (
    <GenericLabel>
      {textKeys.SIDEBAR_STARTDATE_CELL_VALUE_SWITCHER()}
    </GenericLabel>
  )
}
