import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import gql from 'graphql-tag'
import * as React from 'react'
import { Subscription } from 'react-apollo'
import styled from 'react-emotion'
import { Redirect } from 'react-router-dom'

const ErrorText = styled('div')({
  textAlign: 'center',
  marginTop: '20px',
  color: 'red',
  fontSize: '16px',
  '@media (max-width: 300px)': {
    marginLeft: '10px',
    marginRight: '10px',
    fontSize: '14px',
  },
})

const SigningStatusText = styled('div')({
  textAlign: 'center',
  marginTop: '20px',
  color: colors.DARK_GRAY,
  fontSize: '16px',
})

enum SIGNSTATE {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}

enum BANKIDSTATUS {
  PENDING = 'pending',
  FAILED = 'failed',
  COMPLETE = 'complete',
}

const SIGN_SUBSCRIPTION = gql`
  subscription SignStatus {
    signStatus {
      status {
        signState
        collectStatus {
          status
          code
        }
      }
    }
  }
`

interface SignStatusData {
  signStatus: {
    status: {
      signState: SIGNSTATE
      collectStatus: {
        status: BANKIDSTATUS
        code:
          | 'started'
          | 'userSign'
          | 'noClient'
          | 'outstandingTransaction'
          | 'expiredTransaction'
          | 'certificateErr'
          | 'userCancel'
          | 'cancelled'
          | 'startFailed'
      }
    }
  }
}

const CODETEXTKEYS = {
  started: 'SIGN_BANKID_CODE_STARTED',
  userSign: 'SIGN_BANKID_CODE_USER_SIGN',
  noClient: 'SIGN_BANKID_CODE_NO_CLIENT',
  outstandingTransaction: 'SIGN_BANKID_CODE_OUTSTANDING_TRANSACTION',
  expiredTransaction: 'SIGN_BANKID_CODE_EXPIRED_TRANSACTION',
  certificateErr: 'SIGN_BANKID_CODE_CERTIFICATE_ERR',
  outstauserCancelndingTransaction: 'SIGN_BANKID_CODE_USER_CANCEL',
  cancelled: 'SIGN_BANKID_CODE_CANCELLED',
  startFailed: 'SIGN_BANKID_CODE_START_FAILED',
}

const handleMessage = (
  textkeys: { [key: string]: string },
  message: string,
) => {
  return textkeys[message]
}

export const SubscriptionComponent: React.SFC = () => (
  <Subscription<SignStatusData> subscription={SIGN_SUBSCRIPTION}>
    {({ data, loading, error }) => {
      if (loading || !data) {
        return null
      }
      if (error) {
        return (
          <ErrorText>
            <TranslationsConsumer textKey="SIGN_BANKID_STANDARD_ERROR_MESSAGE">
              {(errorText) => errorText}
            </TranslationsConsumer>
          </ErrorText>
        )
      }
      const dataStatus = data.signStatus.status.collectStatus
      const signingState = data.signStatus.status.signState

      switch (signingState) {
        case SIGNSTATE.INITIATED:
          return (
            <SigningStatusText>
              <TranslationsConsumer textKey="SIGN_BANKID_INITIATED">
                {(message) => message}
              </TranslationsConsumer>
            </SigningStatusText>
          )
        case SIGNSTATE.IN_PROGRESS:
          if (dataStatus.status === BANKIDSTATUS.PENDING) {
            return <BankidStatus message={dataStatus.code} />
          }
        case SIGNSTATE.COMPLETED:
          if (dataStatus.status === BANKIDSTATUS.COMPLETE) {
            return <Redirect to="/download" />
          }
        case SIGNSTATE.FAILED:
          if (dataStatus.status === BANKIDSTATUS.FAILED) {
            return <BankidStatus message={dataStatus.code} />
          }
        default:
          return null
      }
    }}
  </Subscription>
)

interface StatusProps {
  message: string
}

export const BankidStatus: React.SFC<StatusProps> = (props) => (
  <div>
    <SigningStatusText>
      <TranslationsConsumer
        textKey={handleMessage(CODETEXTKEYS, props.message)}
      >
        {(message) => message}
      </TranslationsConsumer>
    </SigningStatusText>
  </div>
)
