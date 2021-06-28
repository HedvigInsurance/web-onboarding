import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Button } from 'components/buttons'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import { useTextKeys } from 'utils/textKeys'

const Wrapper = styled('div')({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexFlow: 'column',
})

const Text = styled('div')({
  marginBottom: 16,
})

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
