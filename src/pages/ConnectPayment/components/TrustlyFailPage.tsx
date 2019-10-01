import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { Button } from '../../../components/buttons'

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
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
    <Text>Något gick snett</Text>

    <Button
      background={colors.PURPLE}
      foreground={colors.WHITE}
      onClick={() => {
        window.location.href =
          'http://localhost:8080/new-member/connect-payment/retry'
      }}
    >
      Försök igen
    </Button>
  </Wrapper>
)
