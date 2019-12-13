import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { Modal, ModalProps } from 'components/ModalNew'
import { Form, Formik } from 'formik'
import {
  CompleteQuote,
  EditQuoteInput,
  useEditQuoteMutation,
} from 'generated/graphql'
import { Button } from 'new-components/buttons'
import { InputGroup, Mask, TextInput } from 'new-components/inputs/index'
import * as React from 'react'
import * as Yup from 'yup'
import { isApartment } from '../../utils'

interface Props {
  quote: CompleteQuote
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

interface Schema {
  [key: string]: {
    label: string
    placeholder: string
    mask?: Mask
  }
}

const generateSchema = (quote: CompleteQuote): Schema => ({
  street: {
    label: 'Adress',
    placeholder: 'Adress',
  },
  zipCode: {
    label: 'Postnummer',
    placeholder: 'Postnummer',
    mask: 'ZipCode',
  },
  ...(isApartment(quote.details)
    ? {
        apartment: {
          label: 'Apartment',
          placeholder: 'Apartment',
        },
      }
    : {
        house: {
          label: 'House',
          placeholder: 'House',
        },
      }),
})

const validationSchema = Yup.object({
  street: Yup.string().required(),
  zipCode: Yup.string().required(),
  livingSpace: Yup.string().required(),
  householdSize: Yup.string().required(),
})

export const DetailsModal: React.FC<ModalProps & Props> = ({
  quote,
  isVisible,
  onClose,
}) => {
  const editQuote = useEditQuoteMutation({
    variables: { input: { id: quote.id } },
  })
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Container>
        <Formik
          validateOnBlur
          validationSchema={validationSchema}
          initialValues={{
            street: quote.details.street,
            zipCode: quote.details.zipCode,
            livingSpace: quote.details.livingSpace,
            householdSize: quote.details.householdSize,
          }}
          onSubmit={(form, actions) => {
            const schema = generateSchema(quote)
            console.log(schema)
            console.log(form)
          }}
        >
          {({ touched, errors, values }) => (
            <Form>
              <Headline>Dina detaljer</Headline>
              <Content>
                <ContentColumn>
                  {JSON.stringify(errors)}
                  <InputGroup>
                    <TextInput
                      label={'Adress'}
                      showErrorMessage={false}
                      placeholder={'Adress'}
                      name="street"
                      autoComplete="off"
                      touched={
                        touched.street ? touched.street.toString() : undefined
                      }
                      errors={errors.street}
                    />

                    <TextInput
                      label={'Postnummer'}
                      mask="ZipCode"
                      showErrorMessage={false}
                      placeholder={'Postnummer'}
                      name="zipCode"
                      autoComplete="off"
                      touched={
                        touched.zipCode ? touched.zipCode.toString() : undefined
                      }
                      errors={errors.zipCode}
                    />

                    <TextInput
                      label={'Storlek'}
                      showErrorMessage={false}
                      placeholder={'Storlek'}
                      name="livingSpace"
                      autoComplete="off"
                      touched={
                        touched.livingSpace
                          ? touched.livingSpace.toString()
                          : undefined
                      }
                      errors={errors.livingSpace}
                    />

                    <TextInput
                      label={'Antal försäkrade'}
                      showErrorMessage={false}
                      placeholder={'Antal försäkrade'}
                      name="householdSize"
                      autoComplete="off"
                      touched={
                        touched.householdSize
                          ? touched.householdSize.toString()
                          : undefined
                      }
                      errors={errors.householdSize}
                    />
                  </InputGroup>
                </ContentColumn>
                <ContentColumn>2</ContentColumn>
              </Content>
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
