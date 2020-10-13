import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import * as React from 'react'
import { Button } from 'components/buttons'
import { StorageContainer } from 'utils/StorageContainer'
import { Offer } from './components/Offer'
import { Session } from './components/Session'

const Row = styled.div`
  padding-bottom: 1rem;
`

export const ActualDebugger: React.FC = () => {
  return (
    <>
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
                background={colorsV2.coral500}
              >
                Nuke all state 💣
              </Button>
            </>
          )}
        </StorageContainer>
      </Row>

      <Row>
        <h3>Session</h3>
        <Session />
      </Row>

      <Row>
        <h3>Offer</h3>
        <Offer />
      </Row>
    </>
  )
}
