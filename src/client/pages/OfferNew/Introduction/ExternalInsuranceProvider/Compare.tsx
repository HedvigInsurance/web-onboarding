import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { externalInsuranceProviders } from '@hedviginsurance/embark'
import React from 'react'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { InsuranceCost, InsuranceDataCollection } from 'data/graphql'
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
  ${({ isExternalProvider }) =>
    isExternalProvider &&
    `
    background-color: rgba(255,255,255,0.25);
    color: ${colorsV3.white};
  `};
`

const CompareBoxName = styled.div`
  display: flex;
  align-items: center;
  font-weight: 300;
`

const CompareBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Spacer = styled.div`
  width: 1.25rem;
`

interface Props {
  insuranceDataCollection: InsuranceDataCollection
  cost: InsuranceCost
}

export const Compare: React.FC<Props> = ({ insuranceDataCollection, cost }) => {
  const externalInsuranceProvider = externalInsuranceProviders.find(
    (provider: { externalCollectionId?: string }) =>
      provider.externalCollectionId ===
      insuranceDataCollection.insuranceProvider?.toUpperCase(),
  )

  return (
    <Wrapper>
      <CompareBox>
        <CompareBoxTitle>
          <CompareBoxName>
            <HedvigLogo width={94} />
          </CompareBoxName>
          <Price
            monthlyGross={cost.monthlyGross}
            monthlyNet={cost.monthlyNet}
          />
        </CompareBoxTitle>
      </CompareBox>
      <Spacer />
      <CompareBox isExternalProvider>
        <CompareBoxTitle>
          <CompareBoxName>{externalInsuranceProvider?.name}</CompareBoxName>
          <Price
            lightAppearance
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
      </CompareBox>
    </Wrapper>
  )
}
