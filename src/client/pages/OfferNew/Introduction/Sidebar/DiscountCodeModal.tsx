import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { CookieStorage } from 'cookie-storage'
import { Form, Formik } from 'formik'
import { motion } from 'framer-motion'
import hexToRgba from 'hex-to-rgba'
import React from 'react'
import * as Yup from 'yup'
import { useTextKeys } from 'utils/textKeys'
import { useRedeemCodeMutation } from 'data/graphql'
import { InputField } from 'components/inputs'
import { Button } from 'components/buttons'
import { CloseButton } from 'components/CloseButton/CloseButton'

interface Props {
  isOpen: boolean
  close: () => void
  refetch: () => Promise<void>
}

const Wrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background: ${hexToRgba(colorsV3.white, 0.85)};
  top: 0;
  left: 0;
  transition: all 0.2s;
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  padding: 1rem;
  display: flex;
  align-items: flex-end;
  border-radius: 8px;
`

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: ${colorsV3.white};
  border: 1px solid ${colorsV3.gray300};
  position: relative;
`

const Title = styled.div`
  font-size: 1.25rem;
  line-height: 1.25rem;
  color: ${colorsV3.gray700};
  font-weight: 600;
`

const Paragraph = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colorsV3.gray700};
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
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
          stiffness: 500,
          damping: 50,
        }}
        variants={{
          visible: {
            opacity: 1,
            transform: 'translateY(0%) scale(1)',
            transition: {
              type: 'spring',
              stiffness: 500,
              damping: 50,
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
        <CloseButton onClick={close} />
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
              <InputField
                label={textKeys.SIDEBAR_ADD_DISCOUNT_CELL_LABEL()}
                placeholder={textKeys.SIDEBAR_ADD_DISCOUNT_CELL_PLACEHOLDER()}
                name="code"
                type="text"
                autoComplete="off"
                touched={touched.code}
                errors={errors.code ? textKeys[errors.code]() : ''}
              />

              <Footer>
                <Button type="submit" fullWidth disabled={!values.code}>
                  {textKeys.SIDEBAR_ADD_DISCOUNT_BUTTON()}
                </Button>
              </Footer>
            </Form>
          )}
        </Formik>
      </Container>
    </Wrapper>
  )
}
