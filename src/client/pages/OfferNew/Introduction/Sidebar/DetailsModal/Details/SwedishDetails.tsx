import React from 'react'
import { FieldArray, FormikProps } from 'formik'
import {
  InputGroup,
  InputGroupDeleteButton,
  InputGroupRow,
} from 'components/inputs'
import { ExtraBuildingInput, ExtraBuildingType } from 'data/graphql'
import { EditQuoteInput } from 'data/graphql'
import { TextKeyMap } from 'src/client/utils/textKeys'
import { isApartmentFieldSchema, isHouseFieldSchema } from '../utils'
import { ApartmentFieldSchema, HouseFieldSchema } from '../types'
import { DetailInput } from './components/DetailInput'
import { SupportSection } from './components/SupportSection'
import {
  Content,
  ContentColumnTitleButton,
  ContentColumnTitle,
  ContentColumn,
} from './components/Details.styles'
import { DetailsProps } from './types'

export const SwedishDetails = ({
  fieldSchema,
  formikProps,
  offerQuote,
  textKeys,
}: DetailsProps) => (
  <>
    {isApartmentFieldSchema(fieldSchema, offerQuote) && (
      <ApartmentDetails fieldSchema={fieldSchema} formikProps={formikProps} />
    )}

    {isHouseFieldSchema(fieldSchema, offerQuote) && (
      <HouseDetails
        fieldSchema={fieldSchema}
        formikProps={formikProps}
        textKeys={textKeys}
      />
    )}
  </>
)

type ApartmentDetails = {
  formikProps: FormikProps<EditQuoteInput>
  fieldSchema: ApartmentFieldSchema
}
const ApartmentDetails = ({ formikProps, fieldSchema }: ApartmentDetails) => (
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
)

type HouseDetails = {
  formikProps: FormikProps<EditQuoteInput>
  fieldSchema: HouseFieldSchema
  textKeys: TextKeyMap
}
const HouseDetails = ({ fieldSchema, formikProps, textKeys }: HouseDetails) => (
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

            {formikProps.values.house?.extraBuildings?.map((_, index) => (
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
                  field={fieldSchema.house.extraBuildings.hasWaterConnected}
                  formikProps={formikProps}
                  nameRoot="house"
                  name={`extraBuildings.${index}.hasWaterConnected`}
                />

                <InputGroupDeleteButton
                  type="button"
                  onClick={() => {
                    const isLastItemLeft =
                      formikProps.values.house?.extraBuildings?.length === 1

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
            ))}
          </>
        )}
      />
    </ContentColumn>
  </Content>
)
