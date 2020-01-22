import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { Cross } from 'components/icons/Cross'
import { CookieStorage } from 'cookie-storage'
import { Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import { useRedeemCodeMutation } from 'generated/graphql'
import hexToRgba from 'hex-to-rgba'
import { Button } from 'new-components/buttons'
import { InputField } from 'new-components/inputs'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import * as Yup from 'yup'

interface Props {
  isOpen: boolean
  close: () => void
  refetch: () => Promise<void>
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
  border-radius: 8px;
`

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  flex-direction: column;
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
}) => {
  const textKeys = useTextKeys()
  const [redeemCode] = useRedeemCodeMutation()

  return (
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
        <Title>{textKeys.SIDEBAR_ADD_DISCOUNT_HEADLINE()}</Title>
        <Paragraph>{textKeys.SIDEBAR_ADD_DISCOUNT_BODY()}</Paragraph>
        <CloseButton onClick={close}>
          <Cross />
        </CloseButton>

        <Formik
          validateOnBlur
          validationSchema={discountSchema}
          initialValues={{ code: '' }}
          onSubmit={(form, actions) =>
            redeemCode({ variables: { code: form.code } })
              .then((result) => {
                if (!result) {
                  return
                }

                if (result.errors && result.errors.length > 0) {
                  actions.setFieldError('code', 'SIDEBAR_ADD_DISCOUNT_ERROR')
                  return
                }
              })
              .then(() => refetch())
              .then(() => {
                const cookieStorage = new CookieStorage()
                cookieStorage.setItem('_hvcode', form.code, { path: '/' })
              })
              .then(() => close())
              .catch(() => {
                actions.setFieldError('code', 'SIDEBAR_ADD_DISCOUNT_ERROR')
              })
          }
        >
          {({ touched, errors, values }) => (
            <Form>
              <DiscountInputWrapper>
                <InputField
                  label={textKeys.SIDEBAR_ADD_DISCOUNT_CELL_LABEL()}
                  placeholder={textKeys.SIDEBAR_ADD_DISCOUNT_CELL_PLACEHOLDER()}
                  name="code"
                  type="text"
                  autoComplete="off"
                  touched={touched.code}
                  errors={errors.code ? textKeys[errors.code]() : ''}
                />
              </DiscountInputWrapper>

              <Footer>
                <Button type="submit" disabled={!values.code}>
                  {textKeys.SIDEBAR_ADD_DISCOUNT_BUTTON()}
                </Button>
                <Terms>
                  {`${textKeys.SIDEBAR_ADD_DISCOUNT_FINEPRINT()} `}
                  <TermsLink href="" target="_blank" rel="noreferrer noopener">
                    {textKeys.SIDEBAR_ADD_DISCOUNT_FINEPRINT_LINK_TEXT()}
                  </TermsLink>
                </Terms>
              </Footer>
            </Form>
          )}
        </Formik>
      </Container>
    </Wrapper>
  )
}
