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

enum StatusMessageTextKey {
  REDIRECTING = 'CHECKOUT_SIGN_STARTED_WITH_REDIRECT',
  GENERIC_ERROR = 'CHECKOUT_SIGN_GENERIC_ERROR',
  START_SIGNING = 'SE_BANKID_START_SIGN',
  CERTIFICATE_ERROR = 'SE_BANKID_CERTIFICATE_ERROR',
  CANCELLED = 'SE_BANKID_SIGN_CANCELLED',
}

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
      return StatusMessageTextKey.START_SIGNING
    case 'certificateErr':
      return StatusMessageTextKey.CERTIFICATE_ERROR
    case 'userCancel':
    case 'cancelled':
      return StatusMessageTextKey.CANCELLED
    case 'startFailed':
    case 'expiredTransaction':
    default:
      return StatusMessageTextKey.GENERIC_ERROR
  }
}

const getStatusText = ({
  signStatus,
  signUiState,
  isLoading,
}: Props): StatusTextKey => {
  if (signUiState === 'STARTED_WITH_REDIRECT') {
    return StatusMessageTextKey.REDIRECTING
  }

  const bankIdStatus = signStatus?.collectStatus?.status
  if (bankIdStatus === BankIdStatus.Failed && signUiState !== 'FAILED') {
    return null
  }
  const bankIdStatusCode = signStatus?.collectStatus?.code
  if (bankIdStatusCode) {
    return getStatusMessageFromCode(bankIdStatusCode)
  }
  if (!bankIdStatusCode && signUiState === 'FAILED') {
    return isLoading ? null : StatusMessageTextKey.GENERIC_ERROR
  }

  return null
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

    const textKey = getStatusText({ signStatus, signUiState, isLoading })
    setStatusTextKey(textKey)
  }, [signUiState, signStatus, isLoading])

  return (
    <>
      {statusTextKey && (
        <SignStatusWrapper
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 50 }}
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
