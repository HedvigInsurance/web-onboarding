import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { useCreateOnboardingSessionMutation } from 'data/graphql'
import { useMarket } from 'components/utils/CurrentLocale'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { QuoteData } from './components/QuoteData'

const Wrapper = styled.div`
  max-width: 900px;
  padding: 1rem;
  margin: 0 auto;
  color: ${colorsV3.gray100};
`

const Row = styled.div`
  padding-bottom: 1rem;
`

export const Debugger: React.FC = () => {
  const market = useMarket()
  const locale = useCurrentLocale().isoLocale
  const [
    createOnboardingSession,
    { data },
  ] = useCreateOnboardingSessionMutation()
  const sessionId = data?.onboardingSession_create

  const handleClickNewSession = async () => {
    await createOnboardingSession({ variables: { country: market, locale } })
  }

  return (
    <Wrapper>
      <h1>Offer Page Debugger</h1>

      <Row>
        <h3>Session</h3>
        <Button background={colorsV3.purple900} onClick={handleClickNewSession}>
          Create new session
        </Button>

        {sessionId && <p>Active session: {sessionId}</p>}
      </Row>

      {sessionId && (
        <Row>
          <h3>Offer</h3>
          <QuoteData sessionId={sessionId} />
        </Row>
      )}
    </Wrapper>
  )
}
