import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import {
  InsuranceCost,
  InsuranceDataCollection,
  TypeOfContract,
} from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { Price } from '../../components'

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  @media all and (max-width: 1020px) {
    margin-bottom: 2.25rem;
  }

  @media all and (max-width: 600px) {
    flex-direction: column;

    > *:first-of-type {
      margin-bottom: 1.25rem;
    }
  }
`

const CompareBox = styled.div<{ isExternalProvider?: boolean }>`
  background-color: ${colorsV3.white};
  padding: 1.25rem;
  border-radius: 0.5rem;
  width: 100%;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  ${({ isExternalProvider }) =>
    isExternalProvider &&
    `
    background-color: ${colorsV3.gray300};
    color: ${colorsV3.gray700};
    box-shadow: none;
  `};
`

const CompareBoxName = styled.div<{ isExternalProvider?: boolean }>`
  display: flex;
  align-items: center;
  font-weight: 300;
  line-height: 2rem;
  font-size: ${({ isExternalProvider = false }) =>
    isExternalProvider ? '1.3rem' : '1.5rem'};
`

const CompareBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
`

const Spacer = styled.div`
  width: 1.25rem;
`

const CompareBoxDescription = styled.div({
  fontSize: '0.875rem',
  marginTop: '0.5rem',
  color: '#505050',
})

interface Props {
  insuranceDataCollection: InsuranceDataCollection
  cost: InsuranceCost
}

export const Compare: React.FC<Props> = ({ insuranceDataCollection, cost }) => {
  const translateCoverage = useTranslateCoverage()

  return (
    <Wrapper>
      <CompareBox>
        <CompareBoxTitle>
          <CompareBoxName>Hedvig</CompareBoxName>
          <Price
            monthlyGross={cost.monthlyGross}
            monthlyNet={cost.monthlyNet}
          />
        </CompareBoxTitle>
      </CompareBox>
      <Spacer />
      <CompareBox isExternalProvider>
        <CompareBoxTitle>
          <CompareBoxName isExternalProvider>
            {insuranceDataCollection.insuranceProviderDisplayName}
          </CompareBoxName>
          <Price
            monthlyGross={
              insuranceDataCollection.monthlyPremium || {
                amount: '0',
                currency: 'SEK',
              }
            }
            monthlyNet={
              insuranceDataCollection.monthlyPremium || {
                amount: '0',
                currency: 'SEK',
              }
            }
          />
        </CompareBoxTitle>
        {insuranceDataCollection.coverage && (
          <CompareBoxDescription>
            {translateCoverage(insuranceDataCollection.coverage)}
          </CompareBoxDescription>
        )}
      </CompareBox>
    </Wrapper>
  )
}

const useTranslateCoverage = () => {
  const textKeys = useTextKeys()

  return (coverage: string) => {
    switch (coverage) {
      case TypeOfContract.SeCarFull:
        return textKeys.CONTRACT_DISPLAY_NAME_SE_CAR_FULL()
      case TypeOfContract.SeCarHalf:
        return textKeys.CONTRACT_DISPLAY_NAME_SE_CAR_HALF()
      case TypeOfContract.SeCarTraffic:
        return textKeys.CONTRACT_DISPLAY_NAME_SE_CAR_TRAFFIC()
      default:
        return coverage
    }
  }
}
