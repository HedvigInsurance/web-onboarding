import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { Button } from 'components/buttons'
import { InputField } from 'components/userInput/InputField'
import { ActionMap, Container } from 'constate'
import { Incentive, MonetaryAmount } from 'containers/types'
import { Form, Formik } from 'formik'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'react-emotion'
import { OfferData } from 'src/containers/OfferContainer'
import * as Yup from 'yup'

const DiscountButton = styled(Button)({
  marginTop: '1rem',
})

const SubmitButton = styled(Button)({
  marginTop: 16,
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

const REDEEM_CODE_MUTATION = gql`
  mutation RedeemCode($code: String!) {
    redeemCode(code: $code) {
      campaigns {
        incentive {
          ... on MonthlyCostDeduction {
            amount {
              amount
              currency
            }
          }
          ... on FreeMonths {
            quantity
          }
        }
      }
      cost {
        monthlyGross {
          amount
          currency
        }
        monthlyNet {
          amount
          currency
        }
      }
    }
  }
`

const discountSchema = Yup.object({
  code: Yup.string().required('WEB_REFERRAL_ERROR_INVALIDCODE_BODY'),
})

interface RedeemCodeData {
  redeemCode: {
    campaigns: Array<{
      incentive: Incentive
    }>
    cost: {
      monthlyGross: MonetaryAmount
      monthlyNet: MonetaryAmount
    }
  }
}

interface RedeemCodeVariables {
  code: string
}

interface Props {
  refetch: () => void
  offer: OfferData
}

export const Discount: React.FunctionComponent<Props> = ({ offer, refetch }) =>
  offer.redeemedCampaigns.length === 0 ? (
    <Mutation<RedeemCodeData, RedeemCodeVariables>
      mutation={REDEEM_CODE_MUTATION}
    >
      {(mutate) => (
        <Container<DiscountState, ActionMap<DiscountState, DiscountActions>>
          initialState={{ visible: false }}
          actions={{ setVisibility: (visible) => () => ({ visible }) }}
        >
          {({ visible, setVisibility }) => (
            <>
              <DiscountButton
                background={colors.LIGHT_GRAY}
                foreground={colors.OFF_BLACK_DARK}
                onClick={() => setVisibility(!visible)}
              >
                <TranslationsConsumer textKey="WEB_OFFER_ADD_DISCOUNT_BUTTON">
                  {(text) => text}
                </TranslationsConsumer>
              </DiscountButton>
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
                </DiscountContainer>
              )}
            </>
          )}
        </Container>
      )}
    </Mutation>
  ) : (
    <Mutation<{ __typename: string }> mutation={REMOVE_CODE_MUTATION}>
      {(mutate) => (
        <DiscountButton
          background={colors.LIGHT_GRAY}
          foreground={colors.OFF_BLACK_DARK}
          onClick={() => {
            mutate().then(() => {
              refetch()
            })
          }}
        >
          <TranslationsConsumer textKey="WEB_OFFER_REMOVE_DISCOUNT_BUTTON">
            {(text) => text}
          </TranslationsConsumer>
        </DiscountButton>
      )}
    </Mutation>
  )
