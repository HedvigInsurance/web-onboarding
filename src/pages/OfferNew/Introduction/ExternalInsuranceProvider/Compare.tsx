import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { externalInsuranceProviders } from '@hedviginsurance/embark'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { Price } from '../../components'

import { hedvigCompany, otherCompanies } from '../../Compare/mock'

import { InsuranceDataCollection } from '../../../../generated/graphql'
import { CompleteOfferDataForMember } from '../../types'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`

const CompareBox = styled.div`
  background-color: ${colorsV2.white};
  padding: 1.25rem;
  border-radius: 0.5rem;
  width: 100%;
`

const CompareBoxName = styled.div`
  display: flex;
  align-items: center;
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

const TrustpilotScoreName = styled.span`
  color: ${colorsV2.darkgray};
`

interface Props {
  insuranceDataCollection: InsuranceDataCollection
  offer: CompleteOfferDataForMember
}

export const Compare: React.FC<Props> = ({
  insuranceDataCollection,
  offer,
}) => {
  const textKeys = useTextKeys()
  const externalInsuranceProvider = externalInsuranceProviders.find(
    (provider) =>
      provider.externalCollectionId ===
      insuranceDataCollection.insuranceProvider,
  )
  const externalTrustpilotScore = otherCompanies.find(
    (company) => externalInsuranceProvider.id === company.id,
  )?.trustpilotScore

  return (
    <Wrapper>
      <CompareBox>
        <CompareBoxTitle>
          <CompareBoxName>
            <HedvigLogo />
          </CompareBoxName>
          <Price
            monthlyGross={offer.lastQuoteOfMember.insuranceCost.monthlyGross}
            monthlyNet={offer.lastQuoteOfMember.insuranceCost.monthlyNet}
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
      <CompareBox>
        <CompareBoxTitle>
          <CompareBoxName>
            {externalInsuranceProvider?.icon({ forceWidth: false })}
            {externalInsuranceProvider?.name}
          </CompareBoxName>
          <Price
            monthlyGross={
              insuranceDataCollection.monthlyPremium || {
                amount: '0',
                currency: 'SEK',
              }
            }
            monthlyNet={
              insuranceDataCollection.monthlyDiscountedPremium || {
                amount: '0',
                currency: 'SEK',
              }
            }
          />
        </CompareBoxTitle>
        <TrustpilotScoreWrapper>
          <TrustpilotScoreName>
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
