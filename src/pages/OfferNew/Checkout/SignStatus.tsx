import styled from '@emotion/styled'
import { SignState, useSignStatusLazyQuery } from 'generated/graphql'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

const Wrapper = styled('div')`
  padding: 1rem 0.5rem 0 0.5rem;
`

const BANK_ID_STATUS_TEXT_KEYS: Record<string, string> = {
  started: 'SIGN_BANKID_CODE_STARTED',
  userSign: 'SIGN_BANKID_CODE_USER_SIGN',
  noClient: 'SIGN_BANKID_CODE_NO_CLIENT',
  outstandingTransaction: 'SIGN_BANKID_CODE_OUTSTANDING_TRANSACTION',
  expiredTransaction: 'SIGN_BANKID_CODE_EXPIRED_TRANSACTION',
  certificateErr: 'SIGN_BANKID_CODE_CERTIFICATE_ERR',
  userCancel: 'SIGN_BANKID_CODE_USER_CANCEL',
  cancelled: 'SIGN_BANKID_CODE_CANCELLED',
  startFailed: 'SIGN_BANKID_CODE_START_FAILED',
}

interface Props {
  isSigning: boolean
  error?: boolean
}

export const SignStatus: React.FC<Props> = ({ isSigning, error }) => {
  const textKeys = useTextKeys()
  const [executeSignStatusQuery, signStatusQuery] = useSignStatusLazyQuery({
    pollInterval: 1000, // TODO replace with subscription? or not really?
  })

  React.useEffect(() => {
    if (!isSigning) {
      return
    }

    executeSignStatusQuery()
  }, [isSigning])

  React.useEffect(() => {
    if (signStatusQuery?.data?.signStatus?.signState === SignState.Completed) {
      // TODO tracking
    }
  }, [signStatusQuery?.data?.signStatus?.signState === SignState.Completed])

  if (error) {
    return <Wrapper>{textKeys.SIGN_BANKID_CODE_START_FAILED()}</Wrapper>
  }

  if (!isSigning) {
    return null
  }

  return (
    <Wrapper>
      {(() => {
        if (!signStatusQuery.data?.signStatus?.signState) {
          return null
        }

        if (
          signStatusQuery.data?.signStatus?.signState === SignState.Initiated
        ) {
          return textKeys.SIGN_BANKID_INITIATED()
        }

        if (
          signStatusQuery.data?.signStatus?.signState === SignState.InProgress
        ) {
          const collectStatus =
            signStatusQuery.data?.signStatus?.collectStatus?.status

          return textKeys[BANK_ID_STATUS_TEXT_KEYS[collectStatus!]]()
        }

        if (signStatusQuery.data?.signStatus?.signState === SignState.Failed) {
          return textKeys.SIGN_BANKID_CODE_START_FAILED()
        }

        return null
      })()}
    </Wrapper>
  )
}
