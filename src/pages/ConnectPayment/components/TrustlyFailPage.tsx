import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import styled from '@emotion/styled'
import { Button } from '../../../components/buttons'
import { CurrentLanguage } from '../../../components/utils/CurrentLanguage'

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

export const TrustlyFailPage: React.FC = () => (
  <Wrapper>
    <Text>
      <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_FAIL_BODY">
        {(header) => header}
      </TranslationsConsumer>
    </Text>
    <CurrentLanguage>
      {({ currentLanguage }) => (
        <Button
          background={colors.PURPLE}
          foreground={colors.WHITE}
          onClick={() => {
            const baseUrl = `${window.location.origin}/${currentLanguage &&
              currentLanguage + '/'}new-member/connect-payment`

            window.location.href = `${baseUrl}/retry`
          }}
        >
          <TranslationsConsumer textKey="ONBOARDING_CONNECT_DD_TRUSTLY_MODAL_FAIL_CTA">
            {(header) => header}
          </TranslationsConsumer>
        </Button>
      )}
    </CurrentLanguage>
  </Wrapper>
)
