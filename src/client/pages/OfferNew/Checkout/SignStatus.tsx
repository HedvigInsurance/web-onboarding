import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { SignState, SignStatus as GraphQLSignStatus } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { WarningIcon } from '../../../components/icons/Warning'
import { SignUiState } from './Sign'
import { LinkToChat } from './LinkToChat'

const SignStatusWrapper = styled(motion.div)`
  padding: 2rem 1rem;
`

const StatusText = styled.div`
  color: ${colorsV3.gray700};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  text-align: center;
`

const IconWrapper = styled.div`
  padding: 0.25rem 0.5rem 0 0;
  align-items: center;

  svg {
    width: 1rem;
    height: 1rem;
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

type Props = {
  signStatus: GraphQLSignStatus | null
  signUiState: SignUiState
}

export const SignStatus: React.FC<Props> = ({ signStatus, signUiState }) => {
  const [hasSigningError, setHasSigningError] = useState(false)
  const [signStatusTextKey, setSignStatusTextKey] = useState<string | null>(
    null,
  )
  const textKeys = useTextKeys()

  useEffect(() => {
    if (signUiState === 'FAILED') {
      setSignStatusTextKey('CHECKOUT_SIGN_GENERIC_ERROR')
      setHasSigningError(true)
    }
    if (signUiState === 'STARTED_WITH_REDIRECT') {
      setSignStatusTextKey('CHECKOUT_SIGN_STARTED_WITH_REDIRECT')
    }
  }, [signUiState])

  useEffect(() => {
    if (signStatus?.signState) {
      const { signState } = signStatus

      if (
        signState === SignState.InProgress ||
        signState === SignState.Failed
      ) {
        const statusCode = signStatus?.collectStatus?.code || ''
        setSignStatusTextKey(BANK_ID_STATUS_TEXT_KEYS[statusCode])
      }
      if (signState === SignState.Failed) {
        setHasSigningError(true)
      }
    }
  }, [signStatus])

  return (
    <>
      {signStatusTextKey && (
        <SignStatusWrapper
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 100 }}
        >
          <StatusText>
            {hasSigningError && (
              <IconWrapper>
                <WarningIcon color={colorsV3.gray700} />
              </IconWrapper>
            )}
            {textKeys[signStatusTextKey]()}
          </StatusText>
          {hasSigningError && <LinkToChat />}
        </SignStatusWrapper>
      )}
    </>
  )
}
