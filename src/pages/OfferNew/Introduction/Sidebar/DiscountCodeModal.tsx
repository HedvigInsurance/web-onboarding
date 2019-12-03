import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { Cross } from 'components/icons/Cross'
import { Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import hexToRgba from 'hex-to-rgba'
import { Button } from 'new-components/buttons'
import { TextInput } from 'new-components/inputs'
import { RedeemCodeMutation } from 'pages/Offer/containers/RedeemCodeMutation'
import * as React from 'react'
import * as Yup from 'yup'

interface Props {
  isOpen: boolean
  close: () => void
  refetch: () => void
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

const Container = styled(motion.div)`
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

const DiscountInputWrapper = styled.div`
  margin: 0 -0.5rem;
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`

const Terms = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: center;
  color: ${colorsV2.darkgray};
  margin-top: 1rem;
`

const TermsLink = styled.a`
  color: ${colorsV2.violet500};
  text-decoration: none;

  :hover {
    color: ${colorsV2.violet700};
  }
`

const discountSchema = Yup.object({
  code: Yup.string().required('SIDEBAR_ADD_DISCOUNT_ERROR'),
})

export const DiscountCodeModal: React.FC<Props> = ({
  isOpen,
  close,
  refetch,
}) => (
  <Wrapper isOpen={isOpen}>
    <Container
      initial={'hidden'}
      animate={isOpen ? 'visible' : 'hidden'}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 100,
      }}
      variants={{
        visible: {
          opacity: 1,
          transform: 'translateY(0%) scale(1)',
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 100,
            delay: 0.15,
          },
        },
        hidden: {
          opacity: 0,
          transform: 'translateY(50%) scale(0.9)',
        },
      }}
    >
      <Title>
        <TranslationsConsumer textKey="SIDEBAR_ADD_DISCOUNT_HEADLINE">
          {(t) => t}
        </TranslationsConsumer>
      </Title>
      <Paragraph>
        <TranslationsConsumer textKey="SIDEBAR_ADD_DISCOUNT_BODY">
          {(t) => t}
        </TranslationsConsumer>
      </Paragraph>
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
                    refetch()
                    close()
                    return
                  }
                  if (result.errors && result.errors.length > 0) {
                    actions.setFieldError('code', 'SIDEBAR_ADD_DISCOUNT_ERROR')
                  }
                })
                .catch(() => {
                  actions.setFieldError('code', 'SIDEBAR_ADD_DISCOUNT_ERROR')
                })
            }
          >
            {({ touched, errors, values }) => (
              <Form>
                <DiscountInputWrapper>
                  <TranslationsConsumer textKey="SIDEBAR_ADD_DISCOUNT_CELL_LABEL">
                    {(label) => (
                      <TranslationsConsumer textKey={errors.code || ''}>
                        {(errorText) => (
                          <TextInput
                            label={label}
                            placeholder="XXXXX"
                            name="code"
                            autoComplete="off"
                            touched={
                              touched.code ? touched.code.toString() : undefined
                            }
                            errors={errorText}
                          />
                        )}
                      </TranslationsConsumer>
                    )}
                  </TranslationsConsumer>
                </DiscountInputWrapper>

                <Footer>
                  <Button type="submit" disabled={!values.code}>
                    <TranslationsConsumer textKey="SIDEBAR_ADD_DISCOUNT_BUTTON">
                      {(t) => t}
                    </TranslationsConsumer>
                  </Button>
                  <Terms>
                    Genom att klicka på "Lägg till rabattkod" så accepterar du{' '}
                    <TermsLink href="">villkoren</TermsLink>
                  </Terms>
                </Footer>
              </Form>
            )}
          </Formik>
        )}
      </RedeemCodeMutation>
    </Container>
  </Wrapper>
)
