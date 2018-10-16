import { colors, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { SessionContainer } from 'containers/SessionContainer'
import { Field, Form, Formik } from 'formik'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation, Subscription } from 'react-apollo'
import styled from 'react-emotion'
import { Redirect } from 'react-router-dom'
import * as Yup from 'yup'

const CARDWIDTH = 788
const HEADERWIDTH = 400
const FORMWIDTH = 300
const FORMWIDTHSMALL = 100

const OuterWrapper = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: colors.OFF_WHITE,
  position: 'absolute',
  bottom: 0,
})

const CardWrapper = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  minWidth: CARDWIDTH,
  maxWidth: CARDWIDTH,
  [`@media (max-width: ${CARDWIDTH}px)`]: {
    minWidth: '100%',
    marginLeft: '0px',
    marginRight: '0px',
  },
})

const Card = styled('div')({
  marginTop: '140px',
  paddingTop: '30px',
  paddingBottom: '30px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const HeaderWrapper = styled('div')({
  maxWidth: HEADERWIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
  fontFamily: fonts.SORAY,
  fontWeight: 'normal',
  lineHeight: '40px',
  textAlign: 'center',
})

const Header = styled('h1')({
  color: colors.BLACK,
  marginTop: '0px',
  paddingTop: '30px',
  marginBottom: '10px',
  fontSize: '32px',
  '@media (max-width: 300px)': {
    fontSize: '26px',
  },
})

const InputTitle = styled('div')({
  marginTop: '20px',
  lineHeight: '23px',
  fontSize: '20px',
  '@media (max-width: 300px)': {
    marginLeft: '10px',
    marginRight: '10px',
    fontSize: '18px',
  },
})

const CustomForm = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: FORMWIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
  '@media (max-width: 300px)': {
    minWidth: FORMWIDTHSMALL,
  },
})

const InputField = styled(Field)({
  marginTop: '10px',
  marginBottom: '10px',
  minWidth: FORMWIDTH,
  lineHeight: '48px',
  fontSize: '20px',
  backgroundColor: colors.OFF_WHITE,
  borderRadius: '5px',
  border: 'none',
  outline: 'none',
  '@media (max-width: 300px)': {
    marginLeft: '10px',
    marginRight: '10px',
    minWidth: FORMWIDTHSMALL,
    fontSize: '18px',
  },
})

const InputSubmit = styled('input')({
  backgroundColor: colors.GREEN,
  fontSize: '16px',
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
  cursor: 'pointer',
  border: 'none',
  '@media (max-width: 300px)': {
    fontSize: '14px',
  },
})

const GetInsuredButton = styled('div')({
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

const SigningStatusText = styled('div')({
  textAlign: 'center',
  marginTop: '20px',
  color: colors.DARK_GRAY,
  fontSize: '16px',
})

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

const ErrorMessage = styled('div')({
  minHeight: '24px',
  fontSize: '16px',
  '@media (max-width: 300px)': {
    marginLeft: '10px',
    marginRight: '10px',
    fontSize: '14px',
  },
})

const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('SIGN_EMAIL_CHECK')
    .required('SIGN_EMAIL_REQUIRED'),
  personalNumber: Yup.string()
    .matches(/^\d{8}[\s\-]?\d{4}$/, 'SIGN_PERSONAL_NUMBER_CHECK')
    .required('SIGN_PERSONAL_NUMBER_REQUIRED'),
})

const handleMessage = (
  textkeys: { [key: string]: string },
  message: string,
) => {
  return textkeys[message]
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

const SIGN_MUTATION = gql`
  mutation SignOffer($personalNumber: String!, $email: String!) {
    signOffer(details: { personalNumber: $personalNumber, email: $email })
  }
`

interface SignOfferMutationVariables {
  personalNumber: string
  email: string
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

export const SignUp: React.SFC = () => (
  <OuterWrapper>
    <CardWrapper>
      <Card>
        <HeaderWrapper>
          <Header>
            <TranslationsPlaceholderConsumer
              textKey="SIGN_HEADER_TITLE"
              replacements={{
                address: 'Fantastiska Gatan 23B',
              }}
            >
              {(title) => title}
            </TranslationsPlaceholderConsumer>
          </Header>
        </HeaderWrapper>
        <SessionContainer>
          {(token) =>
            token ? (
              <>
                <Mutation<boolean, SignOfferMutationVariables>
                  mutation={SIGN_MUTATION}
                >
                  {(signOffer) => (
                    <Formik
                      initialValues={{
                        email: '',
                        personalNumber: '',
                      }}
                      validationSchema={userSchema}
                      onSubmit={(values) =>
                        signOffer({
                          variables: {
                            personalNumber: values.personalNumber,
                            email: values.email,
                          },
                        })
                      }
                    >
                      {({ errors, touched, isValid }) => (
                        <CustomForm>
                          <InputTitle>
                            <TranslationsConsumer textKey="SIGN_INPUT_ONE_TITLE">
                              {(title) => title}
                            </TranslationsConsumer>
                          </InputTitle>

                          <InputField
                            name="email"
                            style={{
                              borderBottom: touched.email
                                ? errors.email
                                  ? '3px solid red'
                                  : [`3px solid ${colors.GREEN}`]
                                : [`3px solid ${colors.DARK_PURPLE}`],
                            }}
                          />
                          {errors.email && touched.email ? (
                            <ErrorMessage>
                              <TranslationsConsumer textKey={errors.email}>
                                {(errorMessage) => errorMessage}
                              </TranslationsConsumer>
                            </ErrorMessage>
                          ) : null}
                          <InputTitle>
                            <TranslationsConsumer textKey="SIGN_INPUT_TWO_TITLE">
                              {(title) => title}
                            </TranslationsConsumer>
                          </InputTitle>
                          <InputField
                            name="personalNumber"
                            style={{
                              borderBottom: touched.email
                                ? errors.email
                                  ? '3px solid red'
                                  : [`3px solid ${colors.GREEN}`]
                                : [`3px solid ${colors.DARK_PURPLE}`],
                            }}
                          />
                          {errors.personalNumber && touched.personalNumber ? (
                            <ErrorMessage>
                              <TranslationsConsumer
                                textKey={errors.personalNumber}
                              >
                                {(errorMessage) => errorMessage}
                              </TranslationsConsumer>
                            </ErrorMessage>
                          ) : null}
                          <GetInsuredButton>
                            <TranslationsConsumer textKey="SIGN_BUTTON_TEXT">
                              {(buttonText) => (
                                <InputSubmit type="submit" value={buttonText} />
                              )}
                            </TranslationsConsumer>
                          </GetInsuredButton>
                          <SubscriptionComponent />
                        </CustomForm>
                      )}
                    </Formik>
                  )}
                </Mutation>
              </>
            ) : null
          }
        </SessionContainer>
      </Card>
    </CardWrapper>
  </OuterWrapper>
)

const SubscriptionComponent: React.SFC = () => (
  <Subscription<SignStatusData> subscription={SIGN_SUBSCRIPTION}>
    {({ data, loading, error }) => {
      if (loading) {
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
      if (data) {
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
            } else {
              return null
            }
          case SIGNSTATE.COMPLETED:
            // return <pre>{JSON.stringify(data, null, 2)}</pre>
            if (dataStatus.status === BANKIDSTATUS.COMPLETE) {
              return <Redirect to="/download" />
            } else {
              return null
            }
          case SIGNSTATE.FAILED:
            if (dataStatus.status === BANKIDSTATUS.FAILED) {
              return <BankidStatus message={dataStatus.code} />
            } else {
              return null
            }
          default:
            return null
        }
      }
      return null
    }}
  </Subscription>
)

interface StatusProps {
  message: string
}

const BankidStatus: React.SFC<StatusProps> = (props) => (
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
