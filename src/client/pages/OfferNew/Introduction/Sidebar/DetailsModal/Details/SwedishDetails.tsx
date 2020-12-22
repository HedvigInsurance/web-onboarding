import React from 'react'
import { FieldArray, FormikProps } from 'formik'
import {
  InputGroup,
  InputGroupDeleteButton,
  InputGroupRow,
} from 'components/inputs'
import {
  ExtraBuildingInput,
  ExtraBuildingType,
  EditQuoteInput,
} from 'data/graphql'
import { useTextKeys } from 'utils/textKeys'
import {
  isSwedishApartmentFieldSchema,
  isSwedishHouseFieldSchema,
} from '../utils'
import {
  SwedishApartmentFieldSchema,
  SwedishHouseFieldSchema,
  CommonFieldSchema,
} from '../types'
import { DetailInput } from './components/DetailInput'
import {
  Content,
  ContentColumnTitleButton,
  ContentColumnTitle,
  ContentColumn,
  ContentRow,
} from './components/Details.styles'
import { DetailsProps } from './types'

export const SwedishDetails: React.FC<DetailsProps> = ({
  fieldSchema,
  formikProps,
  offerQuote,
}) => (
  <>
    {isSwedishApartmentFieldSchema(fieldSchema, offerQuote) && (
      <ApartmentDetails fieldSchema={fieldSchema} formikProps={formikProps} />
    )}
    {isSwedishHouseFieldSchema(fieldSchema, offerQuote) && (
      <HouseDetails fieldSchema={fieldSchema} formikProps={formikProps} />
    )}
  </>
)

type ApartmentDetails = {
  formikProps: FormikProps<EditQuoteInput>
  fieldSchema: SwedishApartmentFieldSchema & CommonFieldSchema
}
const ApartmentDetails: React.FC<ApartmentDetails> = ({
  formikProps,
  fieldSchema,
}) => {
  const textKeys = useTextKeys()
  return (
    <Content>
      <ContentColumn>
        <ContentColumnTitle>
          {textKeys.DETAILS_MODULE_PERSONAL_INFORMATION()}
        </ContentColumnTitle>
        <InputGroup>
          <DetailInput
            field={fieldSchema.firstName}
            formikProps={formikProps}
            name="firstName"
          />
          <DetailInput
            field={fieldSchema.lastName}
            formikProps={formikProps}
            name="lastName"
          />
        </InputGroup>
      </ContentColumn>
      <ContentColumn>
        <ContentColumnTitle>
          {textKeys.DETAILS_MODULE_TABLE_TITLE()}
        </ContentColumnTitle>
        <InputGroup>
          <DetailInput
            field={fieldSchema.swedishApartment.street}
            formikProps={formikProps}
            nameRoot="swedishApartment"
            name="street"
          />
          <DetailInput
            field={fieldSchema.swedishApartment.zipCode}
            formikProps={formikProps}
            nameRoot="swedishApartment"
            name="zipCode"
          />
          <DetailInput
            field={fieldSchema.swedishApartment.type}
            formikProps={formikProps}
            nameRoot="swedishApartment"
            name="type"
          />

          <DetailInput
            field={fieldSchema.swedishApartment.livingSpace}
            formikProps={formikProps}
            nameRoot="swedishApartment"
            name="livingSpace"
          />

          <DetailInput
            field={fieldSchema.swedishApartment.householdSize}
            formikProps={formikProps}
            nameRoot="swedishApartment"
            name="householdSize"
          />
        </InputGroup>
      </ContentColumn>
    </Content>
  )
}

type HouseDetails = {
  formikProps: FormikProps<EditQuoteInput>
  fieldSchema: SwedishHouseFieldSchema & CommonFieldSchema
}
const HouseDetails: React.FC<HouseDetails> = ({ fieldSchema, formikProps }) => {
  const textKeys = useTextKeys()
  return (
    <>
      <Content>
        <ContentColumn>
          <ContentColumnTitle>
            {textKeys.DETAILS_MODULE_PERSONAL_INFORMATION()}
          </ContentColumnTitle>
          <InputGroup>
            <DetailInput
              field={fieldSchema.firstName}
              formikProps={formikProps}
              name="firstName"
            />
            <DetailInput
              field={fieldSchema.lastName}
              formikProps={formikProps}
              name="lastName"
            />
          </InputGroup>
        </ContentColumn>
        <ContentColumn>
          <ContentColumnTitle>
            {textKeys.DETAILS_MODULE_TABLE_TITLE()}
          </ContentColumnTitle>
          <InputGroup>
            <DetailInput
              field={fieldSchema.swedishHouse.street}
              formikProps={formikProps}
              nameRoot="swedishHouse"
              name="street"
            />
            <DetailInput
              field={fieldSchema.swedishHouse.zipCode}
              formikProps={formikProps}
              nameRoot="swedishHouse"
              name="zipCode"
            />
            <InputGroupRow>
              <DetailInput
                field={fieldSchema.swedishHouse.livingSpace}
                formikProps={formikProps}
                nameRoot="swedishHouse"
                name="livingSpace"
              />
              <DetailInput
                field={fieldSchema.swedishHouse.ancillarySpace}
                formikProps={formikProps}
                nameRoot="swedishHouse"
                name="ancillarySpace"
              />
            </InputGroupRow>

            <InputGroupRow>
              <DetailInput
                field={fieldSchema.swedishHouse.numberOfBathrooms}
                formikProps={formikProps}
                nameRoot="swedishHouse"
                name="numberOfBathrooms"
              />
              <DetailInput
                field={fieldSchema.swedishHouse.yearOfConstruction}
                formikProps={formikProps}
                nameRoot="swedishHouse"
                name="yearOfConstruction"
              />
            </InputGroupRow>

            <DetailInput
              field={fieldSchema.swedishHouse.householdSize}
              formikProps={formikProps}
              nameRoot="swedishHouse"
              name="householdSize"
            />
            <DetailInput
              field={fieldSchema.swedishHouse.isSubleted}
              formikProps={formikProps}
              nameRoot="swedishHouse"
              name="isSubleted"
            />
          </InputGroup>
        </ContentColumn>
        <ContentRow>
          <FieldArray
            name="swedishHouse.extraBuildings"
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

                {formikProps.values.swedishHouse?.extraBuildings?.map(
                  (_, index) => (
                    <InputGroup key={index}>
                      <DetailInput
                        field={fieldSchema.swedishHouse.extraBuildings.type}
                        formikProps={formikProps}
                        nameRoot="swedishHouse"
                        name={`extraBuildings.${index}.type`}
                      />

                      <DetailInput
                        field={fieldSchema.swedishHouse.extraBuildings.area}
                        formikProps={formikProps}
                        nameRoot="swedishHouse"
                        name={`extraBuildings.${index}.area`}
                      />

                      <DetailInput
                        field={
                          fieldSchema.swedishHouse.extraBuildings
                            .hasWaterConnected
                        }
                        formikProps={formikProps}
                        nameRoot="swedishHouse"
                        name={`extraBuildings.${index}.hasWaterConnected`}
                      />
                      <InputGroupDeleteButton
                        type="button"
                        onClick={() => {
                          const isLastItemLeft =
                            formikProps.values.swedishHouse?.extraBuildings
                              ?.length === 1

                          arrayHelpers.remove(index)

                          if (isLastItemLeft) {
                            formikProps.setValues({
                              ...formikProps.values,
                              swedishHouse: {
                                ...formikProps.values.swedishHouse,
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
        </ContentRow>
      </Content>
    </>
  )
}
