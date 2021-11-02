import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { FadeIn } from 'components/animations/appearings'
import { InfoIcon } from 'components/icons/Info'
import { useTextKeys } from 'utils/textKeys'

const InfoBox = styled.div`
  padding: 1rem;
  padding-left: 3rem;
  margin-bottom: 1.5rem;
  background-color: ${colorsV3.purple100};
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
  margin-bottom: 0.25rem;
  line-height: 1.5rem;
`
const InfoContent = styled.p`
  color: ${colorsV3.gray700};
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
`

export const CreditCheckInfo = () => {
  const textKeys = useTextKeys()
  return (
    <FadeIn>
      <InfoBox>
        <InfoHeader>
          <InfoIcon size="20px" />
          {textKeys.CHECKOUT_CREDIT_CHECK_INFO_HEADER()}
        </InfoHeader>
        <InfoContent>
          {textKeys.CHECKOUT_CREDIT_CHECK_INFO_CONTENT()}
        </InfoContent>
      </InfoBox>
    </FadeIn>
  )
}
