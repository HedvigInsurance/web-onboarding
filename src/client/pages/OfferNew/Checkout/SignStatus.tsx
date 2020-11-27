import styled from '@emotion/styled'
import React from 'react'
import { motion } from 'framer-motion'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { SignState, SignStatus as GraphQLSignStatus } from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import { SignUiState } from './Sign'

const SignStatusWrapper = styled(motion.div)`
  padding: 2rem 0;
  text-align: center;
  color: ${colorsV3.gray900};
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
  const textKeys = useTextKeys()

  if (!signStatus) {
    return null
  }

  return (
    <SignStatusWrapper
      initial={{ height: 0, opacity: 0 }}
      animate={
        ![SignUiState.STARTED, SignUiState.FAILED].includes(signUiState)
          ? { height: 0, opacity: 0 }
          : { height: 'auto', opacity: 1 }
      }
      transition={{ type: 'spring', stiffness: 400, damping: 100 }}
    >
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
    </SignStatusWrapper>
  )
}
