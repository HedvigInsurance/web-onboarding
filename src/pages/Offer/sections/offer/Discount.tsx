import { colors } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { Button } from 'components/buttons'
import { InputField } from 'components/userInput/InputField'
import { ActionMap, Container } from 'constate'
import { isNoDiscount } from 'containers/types'
import { Form, Formik } from 'formik'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import styled from '@emotion/styled'
import { OfferData } from 'src/containers/OfferContainer'
import * as Yup from 'yup'
import { RedeemCodeMutation } from '../../containers/RedeemCodeMutation'

const DiscountButtonLink = styled('button')({
  marginTop: '1rem',
  display: 'inline-block',
  fontSize: '0.875em',
  appearance: 'none',
  textDecoration: 'none',
  border: 'none',
  color: colors.OFF_BLACK,
  paddingBottom: 2,
  borderBottom: `2px solid ${colors.LIGHT_GRAY}`,
  font: 'inherit',
  backgroundColor: 'transparent',
  padding: 0,
  outline: 0,
  cursor: 'pointer',
})

const SubmitButton = styled(Button)({
  marginTop: 16,
  fontSize: '0.875em',
})

const DiscountContainer = styled('div')({
  marginTop: 20,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
})

const DiscountInput = styled(InputField)({
  maxWidth: 220,
  minWidth: 220,
  marginRight: 34,
})

const ErrorText = styled('p')({
  color: colors.PINK,
})

const TermsParagraph = styled('p')({
  fontSize: '0.75em',
  color: colors.DARK_GRAY,
})

const TermsLink = styled('a')({
  textDecoration: 'none',
  color: colors.PURPLE,
})

const REMOVE_CODE_MUTATION = gql`
  mutation RemoveDiscountCode {
    removeDiscountCode {
      __typename
    }
  }
`

interface DiscountState {
  visible: boolean
}

interface DiscountActions {
  setVisibility: (visibile: boolean) => void
}

const discountSchema = Yup.object({
  code: Yup.string().required('WEB_REFERRAL_ERROR_INVALIDCODE_BODY'),
})

interface Props {
  refetch: () => void
  offer: OfferData
}

export const Discount: React.FunctionComponent<Props> = ({ offer, refetch }) =>
  offer.redeemedCampaigns.length === 0 ? (
    <RedeemCodeMutation>
      {(mutate) => (
        <Container<DiscountState, ActionMap<DiscountState, DiscountActions>>
          initialState={{ visible: false }}
          actions={{ setVisibility: (visible) => () => ({ visible }) }}
        >
          {({ visible, setVisibility }) => (
            <>
              <DiscountButtonLink onClick={() => setVisibility(!visible)}>
                <TranslationsConsumer textKey="WEB_OFFER_ADD_DISCOUNT_BUTTON">
                  {(text) => text}
                </TranslationsConsumer>
              </DiscountButtonLink>
              {visible && (
                <DiscountContainer>
                  <Formik
                    validateOnBlur
                    validationSchema={discountSchema}
                    initialValues={{ code: '' }}
                    onSubmit={(form, actions) =>
                      mutate({ variables: { code: form.code } })
                        .then((result) => {
                          if (!result) {
                            return
                          }
                          if (result.errors && result.errors.length > 0) {
                            actions.setFieldError(
                              'code',
                              'WEB_REFERRAL_ERROR_MISSINGCODE_BODY',
                            )
                          }
                          refetch()
                        })
                        .catch(() => {
                          actions.setFieldError(
                            'code',
                            'WEB_REFERRAL_ERROR_MISSINGCODE_BODY',
                          )
                        })
                    }
                  >
                    {({ touched, errors }) => (
                      <Form>
                        <TranslationsConsumer textKey="WEB_REFERRAL_ADDCOUPON_INPUTPLACEHOLDER">
                          {(placeholder) => (
                            <DiscountInput
                              placeholder={placeholder}
                              name="code"
                              touched={touched.code}
                              errors={errors.code}
                            />
                          )}
                        </TranslationsConsumer>
                        <SubmitButton
                          background={colors.PURPLE}
                          foreground={colors.OFF_WHITE}
                          type="submit"
                        >
                          <TranslationsConsumer textKey="WEB_REFERRAL_ADDCOUPON_HEADLINE">
                            {(text) => text}
                          </TranslationsConsumer>
                        </SubmitButton>
                        {errors.code && (
                          <TranslationsConsumer textKey={errors.code}>
                            {(text) => <ErrorText>{text}</ErrorText>}
                          </TranslationsConsumer>
                        )}
                      </Form>
                    )}
                  </Formik>
                  <TermsParagraph>
                    <TranslationsPlaceholderConsumer
                      textKey="WEB_REFERRAL_ADDCOUPON_TC"
                      replacements={{
                        TERMS_AND_CONDITIONS_LINK: (
                          <TranslationsConsumer textKey="WEB_REFERRAL_ADDCOUPON_TC_LINK">
                            {(terms) => (
                              <TranslationsConsumer textKey="WEB_REFERRAL_MORE_INFO_LINK">
                                {(termsLink) => (
                                  <TermsLink href={termsLink}>
                                    {terms}
                                  </TermsLink>
                                )}
                              </TranslationsConsumer>
                            )}
                          </TranslationsConsumer>
                        ),
                      }}
                    >
                      {(text) => text}
                    </TranslationsPlaceholderConsumer>
                  </TermsParagraph>
                </DiscountContainer>
              )}
            </>
          )}
        </Container>
      )}
    </RedeemCodeMutation>
  ) : !isNoDiscount(offer.redeemedCampaigns[0].incentive) ? (
    <Mutation<{ __typename: string }> mutation={REMOVE_CODE_MUTATION}>
      {(mutate) => (
        <DiscountButtonLink
          onClick={() => {
            mutate().then(() => {
              refetch()
            })
          }}
        >
          <TranslationsConsumer textKey="WEB_OFFER_REMOVE_DISCOUNT_BUTTON">
            {(text) => text}
          </TranslationsConsumer>
        </DiscountButtonLink>
      )}
    </Mutation>
  ) : null
