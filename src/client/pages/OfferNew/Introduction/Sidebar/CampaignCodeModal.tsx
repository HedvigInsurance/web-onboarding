import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import hexToRgba from 'hex-to-rgba'
import { colorsV3 } from '@hedviginsurance/brand'

import { InputField } from 'components/inputs/index'
import { Button } from 'components/buttons'
import { CloseButton } from 'components/CloseButton/CloseButton'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'

import { useTextKeys } from 'utils/textKeys'

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
const ButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
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

const ButtonLoadingIndicator = styled(LoadingDots)`
  display: inline-flex;
  margin-left: 0.5rem;
`

const campaignCodeFormSchema = Yup.object({
  code: Yup.string().required('SIDEBAR_ADD_DISCOUNT_ERROR'),
})

export type CampaignCodeModalProps = {
  isOpen: boolean
  close: () => void
  onAddCampaignCode: (code: string) => Promise<{ hasError: boolean }>
}

export const CampaignCodeModal = ({
  isOpen,
  close,
  onAddCampaignCode,
}: CampaignCodeModalProps) => {
  const textKeys = useTextKeys()

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
        <Formik
          validateOnBlur
          validationSchema={campaignCodeFormSchema}
          initialValues={{ code: '' }}
          onSubmit={async ({ code }, actions) => {
            try {
              const { hasError } = await onAddCampaignCode(code)

              if (hasError) {
                actions.setFieldError('code', 'SIDEBAR_ADD_DISCOUNT_ERROR')
              } else {
                close()
              }
            } catch {
              actions.setFieldError('code', 'SIDEBAR_ADD_DISCOUNT_ERROR')
            }
          }}
        >
          {({ touched, errors, values, isSubmitting, resetForm }) => (
            <>
              <ButtonWrapper>
                <CloseButton
                  onClick={() => {
                    close()
                    resetForm()
                  }}
                />
              </ButtonWrapper>

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
                  <Button
                    type="submit"
                    fullWidth
                    disabled={!values.code || isSubmitting}
                  >
                    {textKeys.SIDEBAR_ADD_DISCOUNT_BUTTON()}
                    {isSubmitting && <ButtonLoadingIndicator />}
                  </Button>
                </Footer>
              </Form>
            </>
          )}
        </Formik>
      </Container>
    </Wrapper>
  )
}
