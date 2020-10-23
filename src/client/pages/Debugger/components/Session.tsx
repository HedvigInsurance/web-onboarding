import React from 'react'

type SessionProps = { token?: string | null }

export const Session: React.FC<SessionProps> = ({ token }) => {
  return (
    <>
      {token && <>Token: {token}</>}
      {!token && <>No token active</>}
    </>
  )
}
