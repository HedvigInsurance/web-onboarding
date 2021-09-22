import styled from '@emotion/styled'
import { colorsV2, colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { FadeIn } from 'components/animations/appearings'
import { InfoIcon } from 'components/icons/Info'
import { useTextKeys } from 'utils/textKeys'

const InfoBox = styled.div`
  padding: 1rem;
  padding-left: 3rem;
  margin-bottom: 1.5rem;
  background-color: ${colorsV2.violet100};
  position: relative;
  border-radius: 8px;
  svg {
    position: absolute;
    left: 1.125rem;
    top: 1.125rem;
  }
`

const InfoHeader = styled.p`
  color: ${colorsV3.gray900};
  margin: 0;
  line-height: 24px;
`
const InfoContent = styled.p`
  color: ${colorsV3.gray700};
  margin: 0;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 20px;
`

export const CreditCheckInfo = () => {
  const textKeys = useTextKeys()
  return (
    <FadeIn>
      <InfoBox>
        <InfoHeader>
          <InfoIcon width={20} height={20} />
          {textKeys.CHECKOUT_CREDIT_CHECK_INFO_HEADER()}
        </InfoHeader>
        <InfoContent>
          {textKeys.CHECKOUT_CREDIT_CHECK_INFO_CONTENT()}
        </InfoContent>
      </InfoBox>
    </FadeIn>
  )
}
