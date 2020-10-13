import * as React from 'react'
import { SessionContainer } from 'containers/SessionContainer'

export const Session = () => {
  return (
    <>
      <SessionContainer>
        {(token) => (
          <>
            {token && <>Token: {token}</>}
            {!token && <>No token active</>}
          </>
        )}
      </SessionContainer>
    </>
  )
}
