import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { Cross } from 'components/icons/Cross'
import { RedeemCodeMutation } from '../../../../pages/Offer/containers/RedeemCodeMutation'
import { Form, Formik } from 'formik'
import gql from 'graphql-tag'
import hexToRgba from 'hex-to-rgba'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import * as Yup from 'yup'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { InputField } from 'components/userInput/InputField'
import { Button } from 'new-components/buttons'

interface Props {
  isOpen: boolean
  close: () => void
}

const Wrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${hexToRgba(colorsV2.white, 0.8)};
  top: 0;
  left: 0;
  transition: all 0.2s;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  padding: 1rem;
  display: flex;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: ${colorsV2.white};
  border: 1px solid ${colorsV2.lightgray};
  position: relative;
`

const CloseButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: ${colorsV2.gray};
  border-radius: 50%;
  border: none;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    background-color: ${colorsV2.darkgray};
  }

  svg {
    width: 100%;
    height: 100%;
    fill: ${colorsV2.white};
  }
`

const Title = styled.div`
  font-size: 1.25rem;
  line-height: 1.25rem;
  color: ${colorsV2.darkgray};
  font-weight: 600;
`

const Paragraph = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colorsV2.darkgray};
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`
const DiscountInput = styled(InputField)({
  maxWidth: 220,
  minWidth: 220,
  marginRight: 34,
})

const ErrorText = styled.div`
  font-size: 0.75rem;
  line-height: 1.375rem;
  text-align: center;
  color: ${colorsV2.coral700};
`

const SubmitButton = styled(Button)``

const discountSchema = Yup.object({
  code: Yup.string().required(
    'Den där rabattkoden finns inte... Kolla att du skrivit rätt',
  ),
})

export const DiscountCodeModal: React.FC<Props> = ({ isOpen, close }) => (
  <Wrapper isOpen={isOpen}>
    <Container>
      <Title>Lägg till rabattkod</Title>
      <Paragraph>Har du en rabattkod? Lyckost! Skriv in den nedan.</Paragraph>
      <CloseButton onClick={close}>
        <Cross />
      </CloseButton>

      <RedeemCodeMutation>
        {(mutate) => (
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
                      'Den där rabattkoden finns inte... Kolla att du skrivit rätt',
                    )
                  }
                })
                .catch(() => {
                  actions.setFieldError(
                    'code',
                    'Den där rabattkoden finns inte... Kolla att du skrivit rätt',
                  )
                })
            }
          >
            {({ touched, errors }) => (
              <Form>
                <DiscountInput
                  placeholder="XXXXX"
                  name="code"
                  touched={touched.code}
                  errors={errors.code}
                />
                {errors.code && <ErrorText>{errors.code}</ErrorText>}
                <SubmitButton type="submit">Lägg till rabattkod</SubmitButton>
              </Form>
            )}
          </Formik>
        )}
      </RedeemCodeMutation>
    </Container>
  </Wrapper>
)
