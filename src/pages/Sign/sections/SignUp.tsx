import { colors, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import {
  FORMWIDTH,
  FORMWIDTHSMALL,
  InputField,
} from 'components/userInput/InputField'
import { OfferData } from 'containers/OfferContainer'
import { Form, Formik } from 'formik'
import gql from 'graphql-tag'
import { PriceAndInclusions } from 'pages/Offer/components/PriceAndInclusions'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'react-emotion'
import { formatPostalNumber } from 'utils/postalNumbers'
import * as Yup from 'yup'
import { SubscriptionComponent } from './SignSubscription'

const CARDWIDTH = 788
const ICONSIDE = 16

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
  paddingBottom: '30px',
  backgroundColor: colors.WHITE,
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
})

const HeaderBackground = styled('div')({
  backgroundColor: colors.PURPLE,
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  paddingLeft: '10px',
  paddingRight: '10px',
})

const HeaderWrapper = styled('div')({
  marginLeft: '20px',
  marginRight: '20px',
  fontWeight: 'normal',
  lineHeight: 1.3,
  textAlign: 'center',
})

const Header = styled('h1')({
  color: colors.WHITE,
  margin: 0,
  paddingTop: '40px',
})

const InputTitle = styled('div')({
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

export const Price = styled('h1')({
  marginBottom: '10px',
  marginTop: '30px',
  textAlign: 'center',
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
})

const ErrorMessage = styled('div')({
  color: colors.PINK,
  minHeight: '24px',
  '@media (max-width: 300px)': {
    marginLeft: '10px',
    marginRight: '10px',
  },
})

export const PersonalInfo = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: '30px',
  textAlign: 'center',
  maxWidth: '100%',
  color: colors.WHITE,
})

const VerificationIcon = styled('img')({
  width: ICONSIDE,
  height: ICONSIDE,
  position: 'absolute',
  right: 16,
})

const InputRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  position: 'relative',
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

interface SignUpProps {
  offer: OfferData
}

export const SignUp: React.SFC<SignUpProps> = ({ offer }) => (
  <CardWrapper>
    <Card>
      <HeaderBackground>
        <HeaderWrapper>
          <Header>
            <TranslationsPlaceholderConsumer
              textKey="SIGN_HEADER_TITLE"
              replacements={{
                address: <span data-hj-supress>{offer.insurance.address}</span>,
              }}
            >
              {(title) => title}
            </TranslationsPlaceholderConsumer>
          </Header>
        </HeaderWrapper>
        <PersonalInfo data-hj-supress>
          {`${offer.member.firstName} ${offer.member.lastName}`}
          {' · '}
          {offer.insurance.address}
          {' · '}
          {formatPostalNumber(offer.insurance.postalNumber)}
        </PersonalInfo>
      </HeaderBackground>
      <PriceAndInclusions offer={offer} />
      <>
        <Mutation<boolean, SignOfferMutationVariables> mutation={SIGN_MUTATION}>
          {(signOffer, { loading }) => (
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
                      <InputRow>
                        <InputField
                          name="email"
                          id="email"
                          touched={touched.email}
                          errors={errors.email}
                          placeholder={placeholder}
                        />
                        {touched.email ? (
                          errors.email ? (
                            <VerificationIcon src="/new-member-assets/offering/not_insured.svg" />
                          ) : (
                            <VerificationIcon src="/new-member-assets/offering/checkmark.svg" />
                          )
                        ) : null}
                      </InputRow>
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
                      <InputRow>
                        <InputField
                          name="personalNumber"
                          id="personalNumber"
                          touched={touched.personalNumber}
                          errors={errors.personalNumber}
                          placeholder={placeholder}
                        />
                        {touched.personalNumber ? (
                          errors.personalNumber ? (
                            <VerificationIcon src="/new-member-assets/offering/not_insured.svg" />
                          ) : (
                            <VerificationIcon src="/new-member-assets/offering/checkmark.svg" />
                          )
                        ) : null}
                      </InputRow>
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
                </CustomForm>
              )}
            </Formik>
          )}
        </Mutation>
      </>
    </Card>
  </CardWrapper>
)
