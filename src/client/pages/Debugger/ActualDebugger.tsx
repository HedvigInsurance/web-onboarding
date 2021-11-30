import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { SessionContainer } from 'containers/SessionContainer'
import { Button } from 'components/buttons'
import { StorageContainer } from 'utils/StorageContainer'
import { QuoteData } from './components/QuoteData'
import { Session } from './components/Session'

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  color: ${colorsV3.gray100};
`

const Row = styled.div`
  padding-bottom: 1rem;
`

export const ActualDebugger: React.FC = () => {
  return (
    <Wrapper>
      <h1>Web onboarding state debugger</h1>

      <Row>
        <StorageContainer>
          {(storage) => (
            <>
              <Button
                onClick={() => {
                  localStorage.clear()
                  sessionStorage.clear()
                  storage.session.setSession({})
                  storage.setToken(undefined)
                  window.location.reload() // sorry, not sorry
                }}
                background={colorsV3.red500}
              >
                Nuke all state 💣
              </Button>
            </>
          )}
        </StorageContainer>
      </Row>

      <SessionContainer>
        {(token) => (
          <>
            <Row>
              <h3>Session</h3>
              <Session token={token} />
            </Row>

            <Row>
              <h3>Offer</h3>
              <QuoteData sessionToken={token} />
            </Row>
          </>
        )}
      </SessionContainer>
    </Wrapper>
  )
}
