import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { Modal, ModalProps } from 'components/ModalNew'
import { Form, Formik, getIn } from 'formik'
import {
  CompleteQuote,
  EditQuoteInput,
  useEditQuoteMutation,
} from 'generated/graphql'
import { Button } from 'new-components/buttons'
import { InputGroup } from 'new-components/inputs/index'
import * as React from 'react'
import { DetailInput } from './DetailInput'
import { SupportSection } from './SupportSection'
import {
  getFieldSchema,
  getSchema,
  getValidationSchema,
  isApartmentFieldSchema,
} from './utils'

const Container = styled.div`
  width: 100%;
  height: 100;
  padding 4rem 5rem 1.5rem 5rem;
  display: flex;
  flex-direction: column;
`

const Headline = styled.div`
  font-family: ${fonts.GEOMANIST};
  font-size: 2.5rem;
  line-height: 3.5rem;
  color: ${colorsV2.black};
`

const Content = styled.div`
  width: calc(100% + 3rem);
  display: flex;
  flex-direction: row;
  margin: 0 -1.5rem;
  margin-top: 2.5rem;
`

const ContentColumn = styled.div`
  width: 50%;
  margin: 0 1.5rem;
`

const Footer = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Disclaimer = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;
  margin-top: 1rem;
  color: ${colorsV2.darkgray};
  text-align: center;
`

interface DetailsModalProps {
  quote: CompleteQuote
  refetch: () => void
}

export const DetailsModal: React.FC<ModalProps & DetailsModalProps> = ({
  quote,
  refetch,
  isVisible,
  onClose,
}) => {
  const [editQuote, editQuoteResponse] = useEditQuoteMutation()
  const fieldSchema = getFieldSchema(quote)
  const validationSchema = getValidationSchema(fieldSchema)

  return (
    <Modal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <Container>
        <Formik<EditQuoteInput>
          initialValues={getSchema(quote)}
          validationSchema={validationSchema}
          validateOnBlur
          onSubmit={(form) => {
            editQuote({ variables: { input: form } })
              .then(async (result) => {
                if (!result) {
                  return
                }

                if (result.errors && result.errors.length > 0) {
                  return
                }

                await refetch()
                onClose()
              })
              .catch((err) => {
                console.error(err)
              })
          }}
        >
          {({ touched, errors, values, setFieldValue }) => (
            <Form>
              <Headline>Dina detaljer</Headline>

              {isApartmentFieldSchema(fieldSchema, quote) && (
                <Content>
                  <ContentColumn>
                    <InputGroup>
                      <DetailInput
                        field={fieldSchema.apartment.street}
                        name="apartment.street"
                        errors={getIn(errors.apartment, 'street')}
                        touched={getIn(touched.apartment, 'street')}
                        setFieldValue={setFieldValue}
                      />

                      <DetailInput
                        field={fieldSchema.apartment.zipCode}
                        name="apartment.zipCode"
                        errors={getIn(errors.apartment, 'zipCode')}
                        touched={getIn(touched.apartment, 'zipCode')}
                        setFieldValue={setFieldValue}
                      />

                      <DetailInput
                        field={fieldSchema.apartment.type}
                        name="apartment.type"
                        errors={getIn(errors.apartment, 'type')}
                        touched={getIn(touched.apartment, 'type')}
                        setFieldValue={setFieldValue}
                      />

                      <DetailInput
                        field={fieldSchema.apartment.livingSpace}
                        name="apartment.livingSpace"
                        errors={getIn(errors.apartment, 'livingSpace')}
                        touched={getIn(touched.apartment, 'livingSpace')}
                        setFieldValue={setFieldValue}
                      />

                      <DetailInput
                        field={fieldSchema.apartment.householdSize}
                        name="apartment.householdSize"
                        errors={getIn(errors.apartment, 'householdSize')}
                        touched={getIn(touched.apartment, 'householdSize')}
                        setFieldValue={setFieldValue}
                        min={1}
                      />

                      <SupportSection />
                    </InputGroup>
                  </ContentColumn>
                  <ContentColumn>2</ContentColumn>
                </Content>
              )}
              <Footer>
                <Button type="submit">Uppdatera detaljer</Button>
                <Disclaimer>Ditt pris kan komma att uppdateras</Disclaimer>
              </Footer>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  )
}
