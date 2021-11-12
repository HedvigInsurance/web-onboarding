import React from 'react'
import styled from '@emotion/styled'
import { colorsV2, colorsV3 } from '@hedviginsurance/brand'
import { FetchResult } from '@apollo/client'
import { Button } from 'components/buttons'
import {
  CreateOnboardingSessionMutation,
  useCreateOnboardingSessionMutation,
} from 'data/graphql'
import { useMarket } from 'components/utils/CurrentLocale'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { QuoteData } from './components/QuoteData'

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  color: ${colorsV3.gray100};
`

const Row = styled.div`
  padding-bottom: 1rem;
`

type SessionResult = FetchResult<CreateOnboardingSessionMutation>

const useOnboardingSession = () => {
  const market = useMarket()
  const locale = useCurrentLocale().isoLocale
  const [createOnboardingSession] = useCreateOnboardingSessionMutation()
  const [result, setResult] = React.useState<SessionResult>()

  const create = async () => {
    const result = await createOnboardingSession({
      variables: { country: market, locale },
    })
    setResult(result)
  }

  return { create, result }
}

export const Debugger: React.FC = () => {
  const session = useOnboardingSession()
  const sessionId = session.result?.data?.onboardingSession_create

  return (
    <Wrapper>
      <h1>Offer Page Debugger</h1>

      <Row>
        <Button
          onClick={() => localStorage.clear()}
          background={colorsV2.coral500}
        >
          Nuke all state 💣
        </Button>
      </Row>

      <Row>
        <h3>Session</h3>
        <Button background={colorsV3.purple900} onClick={session.create}>
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
