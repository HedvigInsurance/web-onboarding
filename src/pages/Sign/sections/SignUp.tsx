import { colors, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { OfferContainer } from 'containers/OfferContainer'
import { SessionTokenGuard } from 'containers/SessionTokenGuard'
import { Field, Form, Formik } from 'formik'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'react-emotion'
import * as Yup from 'yup'
import { SubscriptionComponent } from './SignSubscription'

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
})

const InputTitle = styled('div')({
  marginTop: '20px',
  lineHeight: '23px',
  '@media (max-width: 300px)': {
    marginLeft: '10px',
    marginRight: '10px',
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

const InputField = styled(Field)(
  ({ touched, errors }: { touched?: boolean; errors?: string }) => ({
    marginTop: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    minWidth: FORMWIDTH,
    lineHeight: '48px',
    backgroundColor: colors.OFF_WHITE,
    borderRadius: '5px',
    borderRight: 'none',
    borderLeft: 'none',
    borderTop: 'none',
    outline: 'none',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottom: touched
      ? errors
        ? `3px solid ${colors.PINK}`
        : `3px solid ${colors.GREEN}`
      : `3px solid ${colors.PURPLE}`,
    '@media (max-width: 300px)': {
      marginLeft: '10px',
      marginRight: '10px',
      minWidth: FORMWIDTHSMALL,
    },
    '&:focus': {
      borderBottom: `3px solid ${colors.DARK_PURPLE}`,
    },
  }),
)

const ErrorMessage = styled('div')({
  minHeight: '24px',
  '@media (max-width: 300px)': {
    marginLeft: '10px',
    marginRight: '10px',
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

export const SIGN_MUTATION = gql`
  mutation SignOffer($personalNumber: String!, $email: String!) {
    signOffer(details: { personalNumber: $personalNumber, email: $email })
  }
`

interface SignOfferMutationVariables {
  personalNumber: string
  email: string
}

export const SignUp: React.SFC = () => (
  <SessionTokenGuard>
    <OuterWrapper>
      <CardWrapper>
        <Card>
          <HeaderWrapper>
            <Header>
              <OfferContainer>
                {(offer) => (
                  <TranslationsPlaceholderConsumer
                    textKey="SIGN_HEADER_TITLE"
                    replacements={{
                      address: (
                        <span data-hj-supress>{offer.insurance.address}</span>
                      ),
                    }}
                  >
                    {(title) => title}
                  </TranslationsPlaceholderConsumer>
                )}
              </OfferContainer>
            </Header>
          </HeaderWrapper>
          <>
            <Mutation<boolean, SignOfferMutationVariables>
              mutation={SIGN_MUTATION}
            >
              {(signOffer, { loading, error }) => (
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
                  {({ errors, touched }) => (
                    <CustomForm>
                      <InputTitle>
                        <TranslationsConsumer textKey="SIGN_INPUT_ONE_TITLE">
                          {(title) => title}
                        </TranslationsConsumer>
                      </InputTitle>
                      <TranslationsConsumer textKey="SIGN_INPUT_EMAIL_PLACEHOLDER">
                        {(placeholder) => (
                          <InputField
                            name="email"
                            id="email"
                            touched={touched.email}
                            errors={errors.email}
                            placeholder={placeholder}
                          />
                        )}
                      </TranslationsConsumer>
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
                      <TranslationsConsumer textKey="SIGN_INPUT_PERSONAL_NUMBER_PLACEHOLDER">
                        {(placeholder) => (
                          <InputField
                            name="personalNumber"
                            id="personalNumber"
                            touched={touched.personalNumber}
                            errors={errors.personalNumber}
                            placeholder={placeholder}
                          />
                        )}
                      </TranslationsConsumer>
                      {errors.personalNumber && touched.personalNumber ? (
                        <ErrorMessage>
                          <TranslationsConsumer textKey={errors.personalNumber}>
                            {(errorMessage) => errorMessage}
                          </TranslationsConsumer>
                        </ErrorMessage>
                      ) : null}
                      <SubscriptionComponent isSignLoading={loading} />

                      {error !== undefined ? (
                        <pre>
                          {error.graphQLErrors.map(
                            ({ message }, i) =>
                              message === 'Failed to fetch, status: 403' && (
                                /*TODO: Styled component*/
                                <div key={i}>
                                  Du verkar redan vara medlem hos Hedvig.
                                </div>
                              ),
                          )}
                        </pre>
                      ) : null}
                    </CustomForm>
                  )}
                </Formik>
              )}
            </Mutation>
          </>
        </Card>
      </CardWrapper>
    </OuterWrapper>
  </SessionTokenGuard>
)
