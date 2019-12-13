import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { Modal, ModalProps } from 'components/ModalNew'
import { Form, Formik, GenericFieldHTMLAttributes } from 'formik'
import {
  CompleteQuote,
  EditQuoteInput,
  useEditQuoteMutation,
  ApartmentType,
} from 'generated/graphql'
import { Button } from 'new-components/buttons'
import {
  CoreInputFieldProps,
  InputGroup,
  masks,
  TextInput,
} from 'new-components/inputs/index'
import * as React from 'react'
import * as Yup from 'yup'
import { isApartment } from '../../utils'

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

interface FieldType extends CoreInputFieldProps {
  validation: Yup.Schema<string | number>
}

interface ApartmentFieldSchema {
  apartment: {
    street?: FieldType
    zipCode?: FieldType
    householdSize?: FieldType
    livingSpace?: FieldType
    type?: FieldType
  }
}

interface HouseFieldSchema {
  house: {
    street?: FieldType
    zipCode?: FieldType
    householdSize?: FieldType
    livingSpace?: FieldType
    ancillarySpace?: FieldType
    yearOfConstruction?: FieldType
    numberOfBathrooms?: FieldType
    isSubleted?: FieldType
  }
}

type FieldSchema = ApartmentFieldSchema | HouseFieldSchema

const isApartmentFieldSchema = (
  fieldSchema: FieldSchema,
  quote: CompleteQuote,
): fieldSchema is ApartmentFieldSchema => {
  return (
    (fieldSchema as ApartmentFieldSchema).apartment &&
    isApartment(quote.details)
  )
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
      mask: masks.zipCode,
      validation: Yup.string().matches(/^[0-9]{3}[0-9]{2}$/),
    },
    livingSpace: {
      label: 'Storlek',
      placeholder: 'Storlek',
      validation: Yup.number().required(),
    },
    householdSize: {
      label: 'Antal försäkrade',
      placeholder: 'Antal försäkrade',
      validation: Yup.number().required(),
    },
  }

  return isApartment(quote.details)
    ? {
        apartment: {
          ...base,
          type: {
            label: 'Typ av boende',
            placeholder: 'Typ av boende',
            options: [
              { label: 'Bostadsrätt', value: ApartmentType.Brf },
              { label: 'Hyresrätt', value: ApartmentType.Rent },
              { label: 'Bostadsrätt', value: ApartmentType.StudentBrf },
              { label: 'Hyresrätt', value: ApartmentType.StudentRent },
            ],
            validation: Yup.string().required(),
          },
        },
      }
    : {
        house: {
          ...base,
        },
      }
}

// TODO: fix any type
const getValidationSchema = (
  fieldSchema: FieldSchema,
): Yup.ObjectSchema<unknown> =>
  Yup.object({
    ...Object.entries(fieldSchema).reduce(
      (acc, [key, value]) =>
        value.hasOwnProperty('validation')
          ? { ...acc, [key]: value.validation }
          : {
              ...acc,
              [key]: getValidationSchema(value),
            },
      {},
    ),
  })

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

interface DetailInputProps {
  field?: FieldType
  name: string
}

const DetailInput: React.FC<DetailInputProps & GenericFieldHTMLAttributes> = ({
  field,
  name,
}) =>
  field ? (
    <TextInput
      label={field.label}
      placeholder={field.placeholder}
      name={name}
      mask={field.mask}
      type={field.type}
      options={field.options}
      showErrorMessage={false}
      autoComplete="off"
    />
  ) : null

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

  console.log(validationSchema)

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
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
              {isApartmentFieldSchema(fieldSchema, quote) && (
                <Content>
                  <ContentColumn>
                    <InputGroup>
                      <DetailInput
                        field={fieldSchema.apartment.street}
                        name="apartment.street"
                      />

                      <DetailInput
                        field={fieldSchema.apartment.zipCode}
                        name="apartment.zipCode"
                      />

                      <DetailInput
                        field={fieldSchema.apartment.type}
                        name="apartment.type"
                      />

                      <DetailInput
                        field={fieldSchema.apartment.livingSpace}
                        name="apartment.livingSpace"
                      />

                      <DetailInput
                        field={fieldSchema.apartment.householdSize}
                        name="apartment.householdSize"
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
