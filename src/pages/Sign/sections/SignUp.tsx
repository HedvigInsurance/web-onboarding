import { colors, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { Field, Form, Formik } from 'formik'
import * as React from 'react'
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
        <Formik
          initialValues={{
            email: '',
            personalNumber: '',
          }}
          validationSchema={UserSchema}
          onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
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
                  <TranslationsConsumer textKey={errors.personalNumber}>
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
              <TranslationsConsumer textKey="SIGN_BANKID_ERROR_MESSAGE">
                {(errorMessage) =>
                  errorMessage ? <ErrorText>{errorMessage}</ErrorText> : null
                }
              </TranslationsConsumer>
            </CustomForm>
          )}
        </Formik>
      </Card>
    </CardWrapper>
  </OuterWrapper>
)
