import React from 'react'
import styled from '@emotion/styled'
import { Form, Formik } from 'formik'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { Button } from 'components/buttons'
import { Modal, ModalProps } from 'components/ModalNew'
import { useCurrentLocale } from 'components/utils/CurrentLocale'
import {
  BundledQuote,
  EditQuoteInput,
  useEditQuoteMutation,
} from 'data/graphql'
import { LocaleLabel, locales } from 'l10n/locales'
import { OfferData } from 'pages/OfferNew/types'
import { useTextKeys } from 'utils/textKeys'
import { captureSentryError } from 'utils/sentry-client'
import { getMainQuote, isBundle } from '../../utils'
import { Details } from './Details'
import {
  getFieldSchema,
  getInitialInputValues,
  getValidationSchema,
  hasEditQuoteErrors,
  isUnderwritingLimitsHit,
  getEditQuoteInput,
} from './utils'

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
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
  color: ${colorsV3.black};

  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 3rem;
  }
`

const Footer = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Warning = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 1rem;
  color: ${colorsV3.gray900};
  text-align: center;
`

const Error = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 1rem;
  color: ${colorsV3.red500};
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

type DetailsModalProps = {
  offerData: OfferData
  allQuotes: BundledQuote[]
  refetch: () => Promise<void>
}

export const DetailsModal: React.FC<ModalProps & DetailsModalProps> = ({
  refetch,
  offerData,
  allQuotes,
  isVisible,
  onClose,
}) => {
  const textKeys = useTextKeys()
  const [editQuoteMutation, editQuoteResult] = useEditQuoteMutation()
  const mainOfferQuote = getMainQuote(offerData)
  const currentLocale = useCurrentLocale()
  const currentLocaleData = locales[currentLocale as LocaleLabel]
  const fieldSchema = getFieldSchema({
    offerQuote: mainOfferQuote,
    currentLocaleData,
  })
  const validationSchema = getValidationSchema(fieldSchema, mainOfferQuote)
  const initialValues = getInitialInputValues(offerData.person, mainOfferQuote)
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [
    isUnderwritingGuidelineHit,
    setIsUnderwritingGuidelineHit,
  ] = React.useState(false)

  const editQuotes = async (form: EditQuoteInput) => {
    return Promise.all(
      allQuotes.map(({ quoteDetails, id }) => {
        const editQuoteInput = getEditQuoteInput({
          id,
          quoteDetails,
          form,
          isPartOfBundle: isBundle(offerData),
        })

        return editQuoteMutation({
          variables: {
            input: editQuoteInput,
          },
        })
      }),
    )
  }

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
              const result = await editQuotes(form)
              if (hasEditQuoteErrors(result)) {
                setIsUpdating(false)
                return
              }
              if (isUnderwritingLimitsHit(result)) {
                setIsUnderwritingGuidelineHit(true)
                setIsUpdating(false)
                return
              }
              await refetch()
              onClose()
            } catch (e) {
              console.error(e)
              captureSentryError(e)
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
                offerQuote={mainOfferQuote}
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
