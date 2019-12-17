import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { Modal, ModalProps } from 'components/ModalNew'
import { Form, Formik, getIn, FieldArray } from 'formik'
import {
  CompleteQuote,
  EditQuoteInput,
  useEditQuoteMutation,
  ExtraBuildingType,
} from 'generated/graphql'
import { Button } from 'new-components/buttons'
import {
  InputGroup,
  InputGroupRow,
  InputGroupDeleteButton,
} from 'new-components/inputs/index'
import * as React from 'react'
import { DetailInput } from './DetailInput'
import { SupportSection } from './SupportSection'
import {
  getFieldSchema,
  getSchema,
  getValidationSchema,
  isApartmentFieldSchema,
  isHouseFieldSchema,
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
  width: calc(100% + 2rem);
  display: flex;
  flex-direction: row;
  margin: 0 -1rem;
  margin-top: 2.5rem;
`

const ContentColumn = styled.div`
  width: calc(50% - 2rem);
  margin: 0 1rem;
`

const ContentColumnTitle = styled.div`
  font-size: 1rem;
  color: ${colorsV2.gray};
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 2rem;
`

const ContentColumnTitleButton = styled.button`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  color: ${colorsV2.gray};
  border-radius: 24px;
  border: 1px solid ${colorsV2.gray};
  cursor: pointer;
  transition: all 250ms;

  :focus {
    outline: none;
  }

  :hover {
    color: ${colorsV2.darkgray};
    border-color: ${colorsV2.darkgray};
  }
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
  const [editQuote] = useEditQuoteMutation()
  const fieldSchema = getFieldSchema(quote)
  const validationSchema = getValidationSchema(fieldSchema, quote)
  const schema = getSchema(quote)

  return (
    <Modal isVisible={isVisible} onClose={onClose} dynamicHeight>
      <Container>
        <Formik<EditQuoteInput>
          initialValues={schema}
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
          {({ touched, errors, values, setFieldValue }) => {
            return (
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
                      </InputGroup>
                    </ContentColumn>
                    <ContentColumn>
                      <SupportSection />
                    </ContentColumn>
                  </Content>
                )}

                {isHouseFieldSchema(fieldSchema, quote) && (
                  <Content>
                    <ContentColumn>
                      <ContentColumnTitle>Din bostad</ContentColumnTitle>
                      <InputGroup>
                        <DetailInput
                          field={fieldSchema.house.street}
                          name="house.street"
                          errors={getIn(errors.house, 'street')}
                          touched={getIn(touched.house, 'street')}
                          setFieldValue={setFieldValue}
                        />
                        <DetailInput
                          field={fieldSchema.house.zipCode}
                          name="house.zipCode"
                          errors={getIn(errors.house, 'zipCode')}
                          touched={getIn(touched.house, 'zipCode')}
                          setFieldValue={setFieldValue}
                        />
                        <InputGroupRow>
                          <DetailInput
                            field={fieldSchema.house.livingSpace}
                            name="house.livingSpace"
                            errors={getIn(errors.house, 'livingSpace')}
                            touched={getIn(touched.house, 'livingSpace')}
                            setFieldValue={setFieldValue}
                          />
                          <DetailInput
                            field={fieldSchema.house.ancillarySpace}
                            name="house.ancillarySpace"
                            errors={getIn(errors.house, 'ancillarySpace')}
                            touched={getIn(touched.house, 'ancillarySpace')}
                            setFieldValue={setFieldValue}
                          />
                        </InputGroupRow>

                        <InputGroupRow>
                          <DetailInput
                            field={fieldSchema.house.numberOfBathrooms}
                            name="house.numberOfBathrooms"
                            errors={getIn(errors.house, 'numberOfBathrooms')}
                            touched={getIn(touched.house, 'numberOfBathrooms')}
                            setFieldValue={setFieldValue}
                          />
                          <DetailInput
                            field={fieldSchema.house.yearOfConstruction}
                            name="house.yearOfConstruction"
                            errors={getIn(errors.house, 'yearOfConstruction')}
                            touched={getIn(touched.house, 'yearOfConstruction')}
                            setFieldValue={setFieldValue}
                          />
                        </InputGroupRow>

                        <DetailInput
                          field={fieldSchema.house.householdSize}
                          name="house.householdSize"
                          errors={getIn(errors.house, 'householdSize')}
                          touched={getIn(touched.house, 'householdSize')}
                          setFieldValue={setFieldValue}
                        />

                        <DetailInput
                          field={fieldSchema.house.isSubleted}
                          name="house.isSubleted"
                          errors={getIn(errors.house, 'isSubleted')}
                          touched={getIn(touched.house, 'isSubleted')}
                          setFieldValue={setFieldValue}
                        />
                      </InputGroup>
                      <SupportSection />
                    </ContentColumn>
                    <ContentColumn>
                      <FieldArray
                        name="house.extraBuildings"
                        render={(arrayHelpers) => (
                          <>
                            <ContentColumnTitle>
                              Övriga byggnader
                              <ContentColumnTitleButton
                                type="button"
                                onClick={() => {
                                  arrayHelpers.insert(
                                    values.house?.extraBuildings?.length || 0,
                                    {
                                      type: ExtraBuildingType.Garage,
                                      area: 10,
                                      hasWaterConnected: false,
                                    },
                                  )
                                }}
                              >
                                Lägg till byggnad
                              </ContentColumnTitleButton>
                            </ContentColumnTitle>
                            {values.house?.extraBuildings?.map((_, index) => (
                              <InputGroup key={index}>
                                <DetailInput
                                  field={fieldSchema.house.extraBuildings.type}
                                  name={`house.extraBuildings.${index}.type`}
                                  errors={getIn(
                                    errors.house,
                                    `extraBuildings.${index}.type`,
                                  )}
                                  touched={getIn(
                                    touched.apartment,
                                    `extraBuildings.${index}.type`,
                                  )}
                                  setFieldValue={setFieldValue}
                                />

                                <DetailInput
                                  field={fieldSchema.house.extraBuildings.area}
                                  name={`house.extraBuildings.${index}.area`}
                                  errors={getIn(
                                    errors.house,
                                    `extraBuildings.${index}.area`,
                                  )}
                                  touched={getIn(
                                    touched.apartment,
                                    `extraBuildings.${index}.area`,
                                  )}
                                  setFieldValue={setFieldValue}
                                />

                                <DetailInput
                                  field={
                                    fieldSchema.house.extraBuildings
                                      .hasWaterConnected
                                  }
                                  name={`house.extraBuildings.${index}.hasWaterConnected`}
                                  errors={getIn(
                                    errors.house,
                                    `extraBuildings.${index}.hasWaterConnected`,
                                  )}
                                  touched={getIn(
                                    touched.apartment,
                                    `extraBuildings.${index}.hasWaterConnected`,
                                  )}
                                  setFieldValue={setFieldValue}
                                />
                                <InputGroupDeleteButton
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  Ta bort byggnad
                                </InputGroupDeleteButton>
                              </InputGroup>
                            ))}
                          </>
                        )}
                      />
                    </ContentColumn>
                  </Content>
                )}
                <Footer>
                  <Button type="submit">Uppdatera detaljer</Button>
                  <Disclaimer>Ditt pris kan komma att uppdateras</Disclaimer>
                </Footer>
              </Form>
            )
          }}
        </Formik>
      </Container>
    </Modal>
  )
}
