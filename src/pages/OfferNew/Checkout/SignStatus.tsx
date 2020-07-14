import styled from '@emotion/styled'
import { SignState, SignStatus as GraphQLSignStatus } from 'data/graphql'
import React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'

const Wrapper = styled('div')`
  padding: 1rem 0.5rem 0 0.5rem;

  @media (max-width: 600px) {
    text-align: center;
  }
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
  signStatus: GraphQLSignStatus | null
}

export const SignStatus: React.FC<Props> = ({ signStatus }) => {
  const textKeys = useTextKeys()

  if (!signStatus) {
    return null
  }

  return (
    <Wrapper>
      {(() => {
        if (!signStatus?.signState) {
          return null
        }

        if (signStatus?.signState === SignState.Initiated) {
          return textKeys.SIGN_BANKID_INITIATED()
        }

        if (
          [SignState.InProgress, SignState.Failed].includes(
            signStatus?.signState,
          )
        ) {
          const collectCode = signStatus.collectStatus?.code

          if (!collectCode) {
            return null
          }

          return textKeys[BANK_ID_STATUS_TEXT_KEYS[collectCode!]]()
        }

        return null
      })()}
    </Wrapper>
  )
}
