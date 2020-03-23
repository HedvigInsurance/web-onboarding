import { SessionContainer } from 'containers/SessionContainer'
import * as React from 'react'

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
