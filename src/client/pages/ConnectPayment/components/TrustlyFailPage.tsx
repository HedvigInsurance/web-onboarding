import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Button } from 'components/buttons'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { useTextKeys } from 'utils/textKeys'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`

const Text = styled.div`
  margin-bottom: 16px;
`

export const TrustlyFailPage: React.FC = () => {
  const textKeys = useTextKeys()
  const currentLocale = useCurrentLocale()

  return (
    <Wrapper>
      <Text>{textKeys.ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_FAIL_BODY()}</Text>

      <Button
        background={colorsV3.purple500}
        foreground={colorsV3.gray900}
        onClick={() => {
          const baseUrl = `${window.location.origin}/${currentLocale}/new-member/connect-payment`

          window.location.href = `${baseUrl}/retry`
        }}
      >
        {textKeys.ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_FAIL_CTA()}
      </Button>
    </Wrapper>
  )
}
