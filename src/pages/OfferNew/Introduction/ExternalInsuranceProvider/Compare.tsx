import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { externalInsuranceProviders } from '@hedviginsurance/embark'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { Price } from '../../components'

import { hedvigCompany, otherCompanies } from '../../Compare/mock'

import {
  InsuranceCost,
  InsuranceDataCollection,
} from '../../../../data/graphql'

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  @media all and (max-width: 1020px) {
    margin-bottom: 2.25rem;
  }

  @media all and (max-width: 600px) {
    flex-direction: column;

    > *:first-child {
      margin-bottom: 1.25rem;
    }
  }
`

const CompareBox = styled.div<{ isExternalProvider?: boolean }>`
  background-color: ${colorsV2.white};
  padding: 1.25rem;
  border-radius: 0.5rem;
  width: 100%;
  ${({ isExternalProvider }) =>
    isExternalProvider &&
    `
    background-color: rgba(255,255,255,0.25);
    color: ${colorsV2.white};
  `};
`

const CompareBoxName = styled.div`
  display: flex;
  align-items: center;
`

const ProviderLogoContainer = styled.div`
  background-color: ${colorsV2.white};
  padding: 0.5rem;
  border-radius: 0.25rem;

  > * {
    margin-right: 0 !important;
  }
`

const CompareBoxTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const Spacer = styled.div`
  width: 1.25rem;
`

const TrustpilotScoreWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const TrustpilotScoreName = styled.span<{ isExternalProvider?: boolean }>`
  color: ${colorsV2.darkgray};

  ${({ isExternalProvider }) =>
    isExternalProvider &&
    `
    color: ${colorsV2.white};
  `};
`

interface Props {
  insuranceDataCollection: InsuranceDataCollection
  cost: InsuranceCost
}

export const Compare: React.FC<Props> = ({ insuranceDataCollection, cost }) => {
  const textKeys = useTextKeys()
  const externalInsuranceProvider = externalInsuranceProviders.find(
    (provider: { externalCollectionId?: string }) =>
      provider.externalCollectionId ===
      insuranceDataCollection.insuranceProvider?.toUpperCase(),
  )
  const externalTrustpilotScore = otherCompanies.find(
    (company) => externalInsuranceProvider?.id === company.id,
  )?.trustpilotScore

  return (
    <Wrapper>
      <CompareBox>
        <CompareBoxTitle>
          <CompareBoxName>
            <HedvigLogo />
          </CompareBoxName>
          <Price
            monthlyGross={cost.monthlyGross}
            monthlyNet={cost.monthlyNet}
          />
        </CompareBoxTitle>
        <TrustpilotScoreWrapper>
          <TrustpilotScoreName>
            {textKeys.EXTERNAL_PROVIDER_TRUSTPILOT_SCORE()}
          </TrustpilotScoreName>
          <span>
            {textKeys.EXTERNAL_PROVIDER_TRUSTPILOT_SCORE_VALUE({
              value: hedvigCompany.trustpilotScore,
            })}
          </span>
        </TrustpilotScoreWrapper>
      </CompareBox>
      <Spacer />
      <CompareBox isExternalProvider>
        <CompareBoxTitle>
          <CompareBoxName>
            <ProviderLogoContainer>
              {externalInsuranceProvider?.icon({ forceWidth: false })}
            </ProviderLogoContainer>
            {!externalInsuranceProvider?.icon &&
              externalInsuranceProvider?.name}
          </CompareBoxName>
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
        <TrustpilotScoreWrapper>
          <TrustpilotScoreName isExternalProvider>
            {textKeys.EXTERNAL_PROVIDER_TRUSTPILOT_SCORE()}
          </TrustpilotScoreName>
          <span>
            {textKeys.EXTERNAL_PROVIDER_TRUSTPILOT_SCORE_VALUE({
              value: externalTrustpilotScore,
            })}
          </span>
        </TrustpilotScoreWrapper>
      </CompareBox>
    </Wrapper>
  )
}
