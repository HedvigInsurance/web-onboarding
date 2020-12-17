import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { SignStatus as GraphQLSignStatus, BankIdStatus } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { WarningIcon } from '../../../components/icons/Warning'
import { SignUiState } from './Sign'
import { LinkToChat } from './LinkToChat'

type Props = {
  signStatus: GraphQLSignStatus | null
  signUiState: SignUiState
  isLoading: boolean
}

type StatusMessageTextKey =
  | 'CHECKOUT_SIGN_STARTED_WITH_REDIRECT'
  | 'CHECKOUT_SIGN_GENERIC_ERROR'
  | 'SE_BANKID_START_SIGN'
  | 'SE_BANKID_CERTIFICATE_ERR'
  | 'SE_BANKID_SIGN_CANCELLED'

type StatusTextKey = StatusMessageTextKey | null

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

const getStatusMessageFromCode = (
  bankIdStatusCode: string,
): StatusMessageTextKey => {
  switch (bankIdStatusCode) {
    case 'noClient':
    case 'outstandingTransaction':
    case 'started':
    case 'userSign':
      return 'SE_BANKID_START_SIGN'
    case 'certificateErr':
      return 'SE_BANKID_CERTIFICATE_ERR'
    case 'userCancel':
    case 'cancelled':
      return 'SE_BANKID_SIGN_CANCELLED'
    case 'startFailed':
    case 'expiredTransaction':
    default:
      return 'CHECKOUT_SIGN_GENERIC_ERROR'
  }
}

export const SignStatus: React.FC<Props> = ({
  signStatus,
  signUiState,
  isLoading,
}) => {
  const [hasSigningError, setHasSigningError] = useState(false)
  const [statusTextKey, setStatusTextKey] = useState<StatusTextKey>(null)
  const textKeys = useTextKeys()

  useEffect(() => {
    setHasSigningError(signUiState === 'FAILED')

    if (
      (signUiState !== 'FAILED' &&
        signStatus?.collectStatus?.status === BankIdStatus.Failed) ||
      (signUiState === 'FAILED' && isLoading)
    ) {
      setStatusTextKey(null)
      return
    }

    if (signUiState === 'STARTED_WITH_REDIRECT') {
      setStatusTextKey('CHECKOUT_SIGN_STARTED_WITH_REDIRECT')
      return
    }

    const statusCode = signStatus?.collectStatus?.code

    if (statusCode) {
      const statusMessage = getStatusMessageFromCode(statusCode)
      setStatusTextKey(statusMessage)
    }

    if (!statusCode) {
      const textKey =
        signUiState === 'FAILED' ? 'CHECKOUT_SIGN_GENERIC_ERROR' : null
      setStatusTextKey(textKey)
    }
  }, [signUiState, signStatus, isLoading])

  return (
    <>
      {statusTextKey && (
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
            {textKeys[statusTextKey]()}
          </StatusText>
          {statusTextKey === 'CHECKOUT_SIGN_GENERIC_ERROR' && <LinkToChat />}
        </SignStatusWrapper>
      )}
    </>
  )
}
