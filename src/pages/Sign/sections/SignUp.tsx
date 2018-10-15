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

const RegularText = styled('div')({
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

interface SignStatusData {
  signStatus: {
    status: {
      signState: string
      collectStatus: {
        status: string
        code: string
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
                                if (dataStatus.status === 'pending') {
                                  if (dataStatus.code === 'userSign') {
                                    return (
                                      <RegularText>
                                        <TranslationsConsumer textKey="SIGN_BANKID_WAITING_FOR_BANKID">
                                          {(message) => message}
                                        </TranslationsConsumer>
                                      </RegularText>
                                    )
                                  }
                                } else if (dataStatus.status === 'complete') {
                                  window.location.href = '/download'
                                } else if (dataStatus.status === 'failed') {
                                  if (dataStatus.code === 'userCancel') {
                                    return (
                                      <RegularText>
                                        <TranslationsConsumer textKey="SIGN_BANKID_CANCELLED_BY_USER">
                                          {(message) => message}
                                        </TranslationsConsumer>
                                      </RegularText>
                                    )
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
