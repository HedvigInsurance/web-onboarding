import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { Button } from 'components/buttons'
import { InputField } from 'components/inputs'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import { useTextKeys } from 'utils/textKeys'
import { useMarket } from 'components/utils/CurrentLocale'
import { ssnLengthByMarket, ssnRegExpByMarket } from 'pages/OfferNew/utils'
import {
  getSsnLabel,
  getSsnPlaceholder,
} from 'pages/OfferNew/Checkout/UserDetailsForm'

export type LoginFormValue = {
  ssn: string
}

type LoginFormProps = {
  onSubmit: (
    values: LoginFormValue,
    actions: FormikHelpers<LoginFormValue>,
  ) => void
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

const LoginFormikForm = styled(Form)`
  display: block;
  width: 100%;

  @media (min-width: 480px) {
    max-width: 21rem;
  }
`

const SsnField = styled.div`
  width: 100%;
  margin: 0 auto 0.5rem;

  @media (min-width: 480px) {
    margin-bottom: 1rem;
  }

  input {
    width: 100%;
    padding-right: 0;
    text-transform: uppercase;
  }
`

const Heading = styled.h1`
  margin-bottom: 1.25rem;
  text-align: center;
  color: ${colorsV3.gray100};
  font-size: 2rem;
  line-height: 2.5rem;
`

const SubmitButton = styled(Button)<{ disabled?: boolean }>`
  width: 100%;
  height: 3.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: ${(props) => (props.disabled ? colorsV3.gray500 : colorsV3.gray900)};
  background-color: ${(props) =>
    props.disabled ? colorsV3.gray800 : colorsV3.purple500};
`

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const textKeys = useTextKeys()
  const market = useMarket()
  const ssnMaxLength = ssnLengthByMarket[market]
  const ssnRegExp = ssnRegExpByMarket[market]

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<LoginFormValue>['setFieldValue'],
  ) => {
    const { value } = event.currentTarget
    const nonNumbersRegex = /\D/
    const newSsn = value.replace(nonNumbersRegex, '')
    setFieldValue('ssn', newSsn)
  }

  const ssnSchema = Yup.object({
    ssn: Yup.string().matches(ssnRegExp, 'INVALID_SSN'),
  })

  return (
    <Wrapper>
      <Formik
        initialValues={{ ssn: '' }}
        validationSchema={ssnSchema}
        onSubmit={onSubmit}
      >
        {({
          touched,
          errors,
          values,
          isSubmitting,
          setFieldValue,
          handleBlur,
        }) => (
          <LoginFormikForm>
            <Heading>{textKeys.LOGIN_APP_HEADING()}</Heading>

            <SsnField>
              <InputField
                label={getSsnLabel(market, textKeys)}
                placeholder={getSsnPlaceholder(market, textKeys)}
                value={values.ssn}
                name="ssn"
                id="ssn"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={ssnMaxLength}
                touched={touched.ssn}
                errors={touched.ssn && errors.ssn ? textKeys[errors.ssn]() : ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e, setFieldValue)
                }
                onBlur={handleBlur}
                variant="dark"
              />
            </SsnField>
            <SubmitButton
              background={colorsV3.purple500}
              foreground={colorsV3.gray900}
              disabled={!values.ssn}
              type="submit"
            >
              {isSubmitting ? (
                <LoadingDots color={colorsV3.gray800} />
              ) : (
                textKeys.LOGIN_APP_BTN_LABEL()
              )}
            </SubmitButton>
          </LoginFormikForm>
        )}
      </Formik>
    </Wrapper>
  )
}
