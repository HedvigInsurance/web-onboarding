import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { Form, Formik } from 'formik'
import React from 'react'
import { Button } from 'components/buttons'
import { Modal, ModalProps } from 'components/ModalNew'
import { EditQuoteInput, useEditQuoteMutation } from 'data/graphql'
import { OfferQuote } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'
import {
  getFieldSchema,
  getInitialInputValues,
  getValidationSchema,
} from './utils'
import { Details } from './Details'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 4rem 5rem 1.5rem 5rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    padding: 3rem 3rem 1.5rem 3rem;
  }

  @media (max-width: 800px) {
    padding: 2rem 2rem 1.5rem 2rem;
  }

  @media (max-width: 500px) {
    padding: 2rem 1rem 1.5rem 1rem;
  }
`

const Headline = styled.div`
  font-family: ${fonts.FAVORIT};
  font-size: 2.5rem;
  line-height: 3.5rem;
  color: ${colorsV2.black};

  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 3rem;
  }
`

const Footer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Warning = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 1rem;
  color: ${colorsV2.darkgray};
  text-align: center;
`

const Error = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 1rem;
  color: ${colorsV2.coral500};
  text-align: center;
`

const LoadingDimmer = styled.div<{ visible: boolean }>`
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 350ms;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`

interface DetailsModalProps {
  offerQuote: OfferQuote
  refetch: () => Promise<void>
}

export const DetailsModal: React.FC<ModalProps & DetailsModalProps> = ({
  offerQuote,
  refetch,
  isVisible,
  onClose,
}) => {
  const textKeys = useTextKeys()
  const [editQuote, editQuoteResult] = useEditQuoteMutation()
  const fieldSchema = getFieldSchema(offerQuote)
  const validationSchema = getValidationSchema(fieldSchema, offerQuote)
  const initialValues = getInitialInputValues(offerQuote)
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [
    isUnderwritingGuidelineHit,
    setIsUnderwritingGuidelineHit,
  ] = React.useState(false)
  return (
    <Modal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <LoadingDimmer visible={isUpdating} />
      <Container>
        <Formik<EditQuoteInput>
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={async (form) => {
            setIsUpdating(true)
            setIsUnderwritingGuidelineHit(false)
            try {
              const result = await editQuote({ variables: { input: form } })
              if (!result || (result.errors && result.errors.length > 0)) {
                setIsUpdating(false)
                return
              }

              if (
                result.data?.editQuote.__typename === 'UnderwritingLimitsHit'
              ) {
                setIsUnderwritingGuidelineHit(true)
                setIsUpdating(false)
                return
              }
              await refetch()
              onClose()
            } catch (e) {
              console.error(e)
              if ('Sentry' in window) {
                ;(window as any).Sentry.captureException(e)
              }
              // noop
            }
            setIsUpdating(false)
          }}
        >
          {(formikProps) => (
            <Form>
              <Headline>{textKeys.DETAILS_MODULE_HEADLINE()}</Headline>
              <Details
                fieldSchema={fieldSchema}
                formikProps={formikProps}
                offerQuote={offerQuote}
              />
              <Footer>
                <Button type="submit" disabled={isUpdating}>
                  {textKeys.DETAILS_MODULE_BUTTON()}
                </Button>
                {editQuoteResult.error && (
                  <Error>{textKeys.DETAILS_MODULE_BUTTON_ERROR()}</Error>
                )}
                {isUnderwritingGuidelineHit && (
                  <Error>
                    {textKeys.DETAILS_MODULE_BUTTON_UNDERWRITING_GUIDELINE_HIT()}
                  </Error>
                )}
                {!editQuoteResult.error && !isUnderwritingGuidelineHit && (
                  <Warning>{textKeys.DETAILS_MODULE_BUTTON_WARNING()}</Warning>
                )}
              </Footer>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  )
}
