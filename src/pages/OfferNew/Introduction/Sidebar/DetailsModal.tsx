import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { Modal, ModalProps } from 'components/ModalNew'
import { Form, Formik } from 'formik'
import {
  CompleteQuote,
  EditQuoteInput,
  useEditQuoteMutation,
  EditApartmentInput,
} from 'generated/graphql'
import { Button } from 'new-components/buttons'
import { InputGroup, Mask, TextInput } from 'new-components/inputs/index'
import * as React from 'react'
import * as Yup from 'yup'
import { isApartment } from '../../utils'

interface Props {
  quote: CompleteQuote
  refetch: () => void
}

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
  align-items: center;
  justify-content: center;
`

interface FieldType {
  label: string
  placeholder: string
  mask?: Mask
  validation: Yup.Schema<string | number>
}

interface FieldSchema {
  apartment?: {
    street?: FieldType
    householdSize?: FieldType
    livingSpace?: FieldType
    type?: FieldType
  }
  house?: {
    street?: FieldType
    householdSize?: FieldType
    livingSpace?: FieldType
    ancillarySpace?: FieldType
    yearOfConstruction?: FieldType
    numberOfBathrooms?: FieldType
    isSubleted?: FieldType
  }
}

const getFieldSchema = (quote: CompleteQuote): FieldSchema => {
  const base = {
    street: {
      label: 'Adress',
      placeholder: 'Adress',
      validation: Yup.string().required(),
    },
    zipCode: {
      label: 'Postnummer',
      placeholder: 'Postnummer',
      mask: 'ZipCode',
      validation: Yup.number().required(),
    },
  }

  return isApartment(quote.details)
    ? {
        apartment: {
          ...base,
        },
      }
    : {
        house: {
          ...base,
        },
      }
}

const getValidationSchema = (fieldSchema: FieldSchema): any =>
  Object.entries(fieldSchema).reduce((acc, [key, value]) => {
    if (value.hasOwnProperty('validation')) {
      return { ...acc, [key]: value.validation }
    }

    return {
      ...acc,
      [key]: getValidationSchema(value),
    }
  }, {})

const getSchema = (quote: CompleteQuote): EditQuoteInput => {
  const base = {
    street: quote.details.street,
    zipCode: quote.details.zipCode,
    householdSize: quote.details.householdSize,
    livingSpace: quote.details.livingSpace,
  }

  return isApartment(quote.details)
    ? {
        id: quote.id,
        apartment: {
          ...base,
          type: quote.details.type,
        },
      }
    : {
        id: quote.id,
      }
}

/*
const validationSchema = Yup.object({
  street: Yup.string().required(),
  zipCode: Yup.string().required(),
  livingSpace: Yup.string().required(),
  householdSize: Yup.string().required(),
})
*/
export const DetailsModal: React.FC<ModalProps & Props> = ({
  quote,
  refetch,
  isVisible,
  onClose,
}) => {
  const fieldSchema = getFieldSchema(quote)
  const validationSchema = getValidationSchema(fieldSchema)

  console.log('validation schema', validationSchema)

  const [editQuote, editQuoteResponse] = useEditQuoteMutation()

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Container>
        <Formik
          validateOnBlur
          validationSchema={validationSchema}
          initialValues={getSchema(quote)}
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
              .catch(() => {
                console.log('error')
              })
          }}
        >
          {({ touched, errors, values }) => (
            <Form>
              <Headline>Dina detaljer</Headline>
              <b>Errors</b> {JSON.stringify(errors)}
              <br></br>
              <br></br>
              <b>Values</b> {JSON.stringify(values)}
              <br></br>
              <br></br>
              <b>Touched</b> {JSON.stringify(touched)}
              <br></br>
              <br></br>
              <b>Mutation</b> {JSON.stringify(editQuoteResponse.data)}
              <br></br>
              <br></br>
              {isApartment(quote.details) && (
                <Content>
                  <ContentColumn>
                    <InputGroup>
                      <TextInput
                        label={fieldSchema.apartment?.street?.label || ''}
                        showErrorMessage={false}
                        placeholder={'Adress'}
                        name="apartment.street"
                        autoComplete="off"
                      />
                      <TextInput
                        label={'Postnummer'}
                        mask="ZipCode"
                        showErrorMessage={false}
                        placeholder={'Postnummer'}
                        name="apartment.zipCode"
                        autoComplete="off"
                      />
                      <TextInput
                        label={'Storlek'}
                        showErrorMessage={false}
                        placeholder={'Storlek'}
                        name="apartment.livingSpace"
                        autoComplete="off"
                      />
                      <TextInput
                        label={'Antal försäkrade'}
                        showErrorMessage={false}
                        placeholder={'Antal försäkrade'}
                        name="apartmeent.householdSize"
                        autoComplete="off"
                      />
                    </InputGroup>
                  </ContentColumn>
                  <ContentColumn>2</ContentColumn>
                </Content>
              )}
              <Footer>
                <Button type="submit">Uppdatera detaljer</Button>
              </Footer>
            </Form>
          )}
        </Formik>
      </Container>
    </Modal>
  )
}
