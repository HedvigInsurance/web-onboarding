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
import * as Yup from 'yup'

const CARDWIDTH = 788
const HEADERWIDTH = 400
const FORMWIDTH = 300

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
})

const InputTitle = styled('div')({
  marginTop: '20px',
  lineHeight: '23px',
  fontSize: '20px',
})

const CustomForm = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: FORMWIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
})

const InputField = styled(Field)({
  marginTop: '10px',
  marginBottom: '10px',
  minWidth: FORMWIDTH,
  lineHeight: '23px',
  fontSize: '20px',
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
  outlineStyle: 'none',
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
})

const ErrorMessage = styled('div')({
  minHeight: '24px',
  fontSize: '16px',
})

const UserSchema = Yup.object().shape({
  email: Yup.string()
    .email('SIGN_EMAIL_CHECK')
    .required('SIGN_EMAIL_REQUIRED'),
  personalNumber: Yup.string()
    .matches(/^\d{8}[\s\-]?\d{4}$/, 'SIGN_PERSONAL_NUMBER_CHECK')
    .required('SIGN_PERSONAL_NUMBER_REQUIRED'),
})

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
        code: string
      }
    }
  }
}

// interface Props {
//   isSubmitting: boolean
// }

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
                      validationSchema={UserSchema}
                      onSubmit={(values) =>
                        signOffer({
                          variables: {
                            personalNumber: values.personalNumber,
                            email: values.email,
                          },
                        })
                      }
                    >
                      {({ errors, touched }) => (
                        <CustomForm>
                          <InputTitle>
                            <TranslationsConsumer textKey="SIGN_INPUT_ONE_TITLE">
                              {(title) => title}
                            </TranslationsConsumer>
                          </InputTitle>

                          <InputField name="email" />
                          {errors.email && touched.email ? (
                            <ErrorMessage>
                              <TranslationsConsumer textKey={errors.email}>
                                {(errorMessage) => errorMessage}
                              </TranslationsConsumer>
                            </ErrorMessage>
                          ) : (
                            <ErrorMessage />
                          )}
                          <InputTitle>
                            <TranslationsConsumer textKey="SIGN_INPUT_TWO_TITLE">
                              {(title) => title}
                            </TranslationsConsumer>
                          </InputTitle>
                          <InputField name="personalNumber" />
                          {errors.personalNumber && touched.personalNumber ? (
                            <ErrorMessage>
                              <TranslationsConsumer
                                textKey={errors.personalNumber}
                              >
                                {(errorMessage) => errorMessage}
                              </TranslationsConsumer>
                            </ErrorMessage>
                          ) : (
                            <ErrorMessage />
                          )}
                          <GetInsuredButton>
                            <TranslationsConsumer textKey="SIGN_BUTTON_TEXT">
                              {(buttonText) => (
                                <InputSubmit type="submit" value={buttonText} />
                              )}
                            </TranslationsConsumer>
                          </GetInsuredButton>
                          <Subscription<SignStatusData>
                            subscription={SIGN_SUBSCRIPTION}
                          >
                            {({ data, loading, error }) => {
                              if (loading) {
                                return null
                              }
                              if (error) {
                                return (
                                  <div>
                                    <ErrorText>
                                      <TranslationsConsumer textKey="SIGN_BANKID_STANDARD_ERROR_MESSAGE">
                                        {(errorText) => errorText}
                                      </TranslationsConsumer>
                                    </ErrorText>
                                  </div>
                                )
                              }
                              if (data) {
                                const dataStatus =
                                  data.signStatus.status.collectStatus
                                const signingState =
                                  data.signStatus.status.signState
                                if (signingState === SIGNSTATE.INITIATED) {
                                  return (
                                    <div>
                                      *BankID signing initated, open bankid*
                                    </div>
                                  )
                                } else if (
                                  signingState === SIGNSTATE.IN_PROGRESS
                                ) {
                                  if (
                                    dataStatus.status === BANKIDSTATUS.PENDING
                                  ) {
                                    if (dataStatus.code === 'started') {
                                      return (
                                        <SigningStatusText>
                                          Bankid signing: started
                                        </SigningStatusText>
                                      )
                                    } else if (dataStatus.code === 'userSign') {
                                      return (
                                        <SigningStatusText>
                                          <TranslationsConsumer textKey="SIGN_BANKID_USER_SIGN">
                                            {(message) => message}
                                          </TranslationsConsumer>
                                        </SigningStatusText>
                                      )
                                    } else if (dataStatus.code === 'noClient') {
                                      return (
                                        <SigningStatusText>
                                          Bankid signing: noClient
                                        </SigningStatusText>
                                      )
                                    } else if (
                                      dataStatus.code ===
                                      'outstandingTransaction'
                                    ) {
                                      return (
                                        <SigningStatusText>
                                          Bankid signing: outstandingTransaction
                                        </SigningStatusText>
                                      )
                                    }
                                  }
                                } else if (
                                  signingState === SIGNSTATE.COMPLETED
                                ) {
                                  if (
                                    dataStatus.status === BANKIDSTATUS.COMPLETE
                                  ) {
                                    window.location.href = '/download'
                                  }
                                } else if (signingState === SIGNSTATE.FAILED) {
                                  if (
                                    dataStatus.status === BANKIDSTATUS.FAILED
                                  ) {
                                    if (
                                      dataStatus.code === 'expiredTransaction'
                                    ) {
                                      return (
                                        <SigningStatusText>
                                          <TranslationsConsumer textKey="SIGN_BANKID_EXPIRED_TRANSACTION">
                                            {(message) => message}
                                          </TranslationsConsumer>
                                        </SigningStatusText>
                                      )
                                    } else if (
                                      dataStatus.code === 'certificateErr'
                                    ) {
                                      return (
                                        <SigningStatusText>
                                          <TranslationsConsumer textKey="SIGN_BANKID_CERTIFICATE_ERR">
                                            {(message) => message}
                                          </TranslationsConsumer>
                                        </SigningStatusText>
                                      )
                                    } else if (
                                      dataStatus.code === 'userCancel'
                                    ) {
                                      return (
                                        <SigningStatusText>
                                          <TranslationsConsumer textKey="SIGN_BANKID_USER_CANCEL">
                                            {(message) => message}
                                          </TranslationsConsumer>
                                        </SigningStatusText>
                                      )
                                    } else if (
                                      dataStatus.code === 'cancelled'
                                    ) {
                                      return (
                                        <SigningStatusText>
                                          <TranslationsConsumer textKey="SIGN_BANKID_CANCELLED">
                                            {(message) => message}
                                          </TranslationsConsumer>
                                        </SigningStatusText>
                                      )
                                    } else if (
                                      dataStatus.code === 'startFailed'
                                    ) {
                                      return (
                                        <SigningStatusText>
                                          <TranslationsConsumer textKey="SIGN_BANKID_START_FAILED">
                                            {(message) => message}
                                          </TranslationsConsumer>
                                        </SigningStatusText>
                                      )
                                    }
                                  }
                                }
                              }
                              return null
                            }}
                          </Subscription>
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
