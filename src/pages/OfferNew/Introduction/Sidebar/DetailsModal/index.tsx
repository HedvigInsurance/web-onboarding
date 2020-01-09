import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import { Modal, ModalProps } from 'components/ModalNew'
import { FieldArray, Form, Formik } from 'formik'
import {
  CompleteQuote,
  EditQuoteInput,
  ExtraBuildingInput,
  ExtraBuildingType,
  useEditQuoteMutation,
} from 'generated/graphql'
import { Button } from 'new-components/buttons'
import {
  InputGroup,
  InputGroupDeleteButton,
  InputGroupRow,
} from 'new-components/inputs/index'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { DetailInput } from './DetailInput'
import { SupportSection } from './SupportSection'
import {
  getFieldSchema,
  getInitialValues,
  getValidationSchema,
  isApartmentFieldSchema,
  isHouseFieldSchema,
} from './utils'

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
  font-family: ${fonts.GEOMANIST};
  font-size: 2.5rem;
  line-height: 3.5rem;
  color: ${colorsV2.black};

  @media (max-width: 600px) {
    font-size: 2rem;
    line-height: 3rem;
  }
`

const Content = styled.div`
  width: calc(100% + 2rem);
  display: flex;
  flex-direction: row;
  margin: 0 -1rem;
  margin-top: 2.5rem;

  @media (max-width: 800px) {
    width: 100%;
    margin: 1.5rem 0 0 0;
    flex-direction: column;
  }
`

const ContentColumn = styled.div`
  width: calc(50% - 2rem);
  margin: 0 1rem;

  @media (max-width: 800px) {
    width: 100%;
    margin: 0 0 2rem 0;

    :last-child {
      margin-bottom: 0;
    }
  }
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

  @media (max-width: 800px) {
    padding: 0;
  }
`

const ContentColumnTitleButton = styled.button`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
  color: ${colorsV2.gray};
  border-radius: 24px;
  border: 1px solid ${colorsV2.gray};
  cursor: pointer;
  transition: all 250ms;
  background: none;

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
  quote: CompleteQuote
  refetch: () => Promise<void>
}

export const DetailsModal: React.FC<ModalProps & DetailsModalProps> = ({
  quote,
  refetch,
  isVisible,
  onClose,
}) => {
  const textKeys = useTextKeys()
  const [editQuote, editQuoteResult] = useEditQuoteMutation()
  const fieldSchema = getFieldSchema(quote)
  const validationSchema = getValidationSchema(fieldSchema, quote)
  const initialValues = getInitialValues(quote)
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
              // tslint:disable-next-line no-console
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

              {isApartmentFieldSchema(fieldSchema, quote) && (
                <Content>
                  <ContentColumn>
                    <InputGroup>
                      <DetailInput
                        field={fieldSchema.apartment.street}
                        formikProps={formikProps}
                        nameRoot="apartment"
                        name="street"
                      />

                      <DetailInput
                        field={fieldSchema.apartment.zipCode}
                        formikProps={formikProps}
                        nameRoot="apartment"
                        name="zipCode"
                      />

                      <DetailInput
                        field={fieldSchema.apartment.type}
                        formikProps={formikProps}
                        nameRoot="apartment"
                        name="type"
                      />

                      <DetailInput
                        field={fieldSchema.apartment.livingSpace}
                        formikProps={formikProps}
                        nameRoot="apartment"
                        name="livingSpace"
                      />

                      <DetailInput
                        field={fieldSchema.apartment.householdSize}
                        formikProps={formikProps}
                        nameRoot="apartment"
                        name="householdSize"
                      />
                    </InputGroup>
                  </ContentColumn>
                  <ContentColumn>
                    <SupportSection onButtonClick={() => Intercom('show')} />
                  </ContentColumn>
                </Content>
              )}

              {isHouseFieldSchema(fieldSchema, quote) && (
                <Content>
                  <ContentColumn>
                    <ContentColumnTitle>
                      {textKeys.DETAILS_MODULE_TABLE_TITLE()}
                    </ContentColumnTitle>
                    <InputGroup>
                      <DetailInput
                        field={fieldSchema.house.street}
                        formikProps={formikProps}
                        nameRoot="house"
                        name="street"
                      />
                      <DetailInput
                        field={fieldSchema.house.zipCode}
                        formikProps={formikProps}
                        nameRoot="house"
                        name="zipCode"
                      />
                      <InputGroupRow>
                        <DetailInput
                          field={fieldSchema.house.livingSpace}
                          formikProps={formikProps}
                          nameRoot="house"
                          name="livingSpace"
                        />
                        <DetailInput
                          field={fieldSchema.house.ancillarySpace}
                          formikProps={formikProps}
                          nameRoot="house"
                          name="ancillarySpace"
                        />
                      </InputGroupRow>

                      <InputGroupRow>
                        <DetailInput
                          field={fieldSchema.house.numberOfBathrooms}
                          formikProps={formikProps}
                          nameRoot="house"
                          name="numberOfBathrooms"
                        />
                        <DetailInput
                          field={fieldSchema.house.yearOfConstruction}
                          formikProps={formikProps}
                          nameRoot="house"
                          name="yearOfConstruction"
                        />
                      </InputGroupRow>

                      <DetailInput
                        field={fieldSchema.house.householdSize}
                        formikProps={formikProps}
                        nameRoot="house"
                        name="householdSize"
                      />
                      <DetailInput
                        field={fieldSchema.house.isSubleted}
                        formikProps={formikProps}
                        nameRoot="house"
                        name="isSubleted"
                      />
                    </InputGroup>
                    <SupportSection onButtonClick={() => Intercom('show')} />
                  </ContentColumn>
                  <ContentColumn>
                    <FieldArray
                      name="house.extraBuildings"
                      render={(arrayHelpers) => (
                        <>
                          <ContentColumnTitle>
                            {textKeys.DETAILS_MODULE_EXTRABUILDINGS_TABLE_TITLE()}
                            <ContentColumnTitleButton
                              type="button"
                              onClick={() => {
                                const defaultExtraBuilding: ExtraBuildingInput = {
                                  type: ExtraBuildingType.Garage,
                                  area: 10,
                                  hasWaterConnected: false,
                                }
                                arrayHelpers.insert(0, defaultExtraBuilding)
                              }}
                            >
                              {textKeys.DETAILS_MODULE_EXTRABUILDINGS_TABLE_BUTTON()}
                            </ContentColumnTitleButton>
                          </ContentColumnTitle>

                          {formikProps.values.house?.extraBuildings?.map(
                            (_, index) => (
                              <InputGroup key={index}>
                                <DetailInput
                                  field={fieldSchema.house.extraBuildings.type}
                                  formikProps={formikProps}
                                  nameRoot="house"
                                  name={`extraBuildings.${index}.type`}
                                />

                                <DetailInput
                                  field={fieldSchema.house.extraBuildings.area}
                                  formikProps={formikProps}
                                  nameRoot="house"
                                  name={`extraBuildings.${index}.area`}
                                />

                                <DetailInput
                                  field={
                                    fieldSchema.house.extraBuildings
                                      .hasWaterConnected
                                  }
                                  formikProps={formikProps}
                                  nameRoot="house"
                                  name={`extraBuildings.${index}.hasWaterConnected`}
                                />

                                <InputGroupDeleteButton
                                  type="button"
                                  onClick={() => {
                                    const isLastItemLeft =
                                      formikProps.values.house?.extraBuildings
                                        ?.length === 1

                                    arrayHelpers.remove(index)

                                    if (isLastItemLeft) {
                                      formikProps.setValues({
                                        ...formikProps.values,
                                        house: {
                                          ...formikProps.values.house,
                                          extraBuildings: [],
                                        },
                                      })
                                    }
                                  }}
                                >
                                  {textKeys.DETAILS_MODULE_EXTRABUILDINGS_TABLE_REMOVE_BUILDING_BUTTON()}
                                </InputGroupDeleteButton>
                              </InputGroup>
                            ),
                          )}
                        </>
                      )}
                    />
                  </ContentColumn>
                </Content>
              )}
              <Footer>
                <Button type="submit">
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
