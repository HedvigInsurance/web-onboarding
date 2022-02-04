import {
  FormikProps,
  GenericFieldHTMLAttributes,
  getIn,
  FieldArray,
} from 'formik'
import React from 'react'
import {
  ApartmentType,
  ExtraBuildingInput,
  ExtraBuildingType,
} from 'data/graphql'
import {
  InputField,
  CoreInputFieldProps,
  masks,
  inputTypes,
  InputGroup,
  InputGroupDeleteButton,
} from 'components/inputs'
import { MarketLabel } from 'l10n/locales'
import { useTextKeys } from 'utils/textKeys'
import { QuoteInput } from '../../types'
import { ContentColumnTitle, ContentColumnTitleButton } from './Details.styles'

interface DetailInputProps {
  field?: CoreInputFieldProps
  formikProps: FormikProps<QuoteInput>
  name: string
}

export const DetailInput: React.FC<DetailInputProps &
  GenericFieldHTMLAttributes> = ({ field, formikProps, name: formikName }) => {
  const textKeys = useTextKeys()

  return field ? (
    <InputField
      label={textKeys[field.label]()}
      placeholder={textKeys[field.placeholder ? field.placeholder : '']()}
      mask={field.mask}
      type={field.type}
      options={field.options?.map((o) => ({
        label: textKeys[o.label](),
        value: o.value,
      }))}
      showErrorMessage={false}
      errors={getIn(formikProps.errors, formikName)}
      touched={getIn(formikProps.touched, formikName)}
      {...formikProps.getFieldProps(formikName)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const value = field.mask
          ? field.mask.sanitize(e.target.value)
          : e.target.value

        if (field.type === 'number') {
          formikProps.setFieldValue(formikName, value && parseInt(value, 10))
        } else {
          formikProps.setFieldValue(
            formikName,
            /^(true|false)/.test(value) ? JSON.parse(value) : value,
          )
        }
      }}
    />
  ) : null
}

interface BirthDateInputProps {
  formikProps: FormikProps<QuoteInput>
  name: string
  placeholder: string
}

export const BirthDateInput: React.FC<BirthDateInputProps> = ({
  name,
  placeholder,
  formikProps,
}) => (
  <DetailInput
    name={name}
    field={{
      label: 'DETAILS_MODULE_TABLE_BIRTHDATE_CELL_LABEL',
      placeholder: placeholder,
    }}
    formikProps={formikProps}
  />
)

type TextInputProps = {
  name: string
  label: string
  formikProps: FormikProps<QuoteInput>
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  formikProps,
}) => (
  <DetailInput
    name={name}
    field={{
      label: label,
      placeholder: '',
    }}
    formikProps={formikProps}
  />
)

type BooleanInputProps = {
  name: string
  label: string
  formikProps: FormikProps<QuoteInput>
}

export const BooleanInput: React.FC<BooleanInputProps> = ({
  name,
  label,
  formikProps,
}) => (
  <DetailInput
    name={name}
    field={{
      label: label,
      placeholder: '',
      options: [
        { label: 'YES', value: 'true' },
        { label: 'NO', value: 'false' },
      ],
    }}
    formikProps={formikProps}
  />
)

type AreaInputProps = {
  name: string
  label: string
  formikProps: FormikProps<QuoteInput>
}

export const AreaInput: React.FC<AreaInputProps> = ({
  name,
  label,
  formikProps,
}) => (
  <DetailInput
    name={name}
    field={{
      label: label,
      placeholder: '',
      mask: masks.area,
      type: inputTypes.number,
    }}
    formikProps={formikProps}
  />
)

type HomeOwnershipTypeInputProps = {
  name: string
  formikProps: FormikProps<QuoteInput>
}

enum HomeOwnershipType {
  Rent = 'RENT',
  Own = 'OWN',
}

export const HomeOwnershipTypeInput: React.FC<HomeOwnershipTypeInputProps> = ({
  name,
  formikProps,
}) => (
  <DetailInput
    name={name}
    field={{
      label: 'DETAILS_MODULE_TABLE_RESIDENCE_TYPE_CELL_LABEL',
      placeholder: '',
      options: [
        {
          label: 'SIDEBAR_INSURANCE_TYPE_BRF',
          value: HomeOwnershipType.Own,
        },
        {
          label: 'SIDEBAR_INSURANCE_TYPE_RENT',
          value: HomeOwnershipType.Rent,
        },
      ],
    }}
    formikProps={formikProps}
  />
)

type SwedishApartmentOwnershipTypeInputProps = {
  name: string
  formikProps: FormikProps<QuoteInput>
}

export const SwedishApartmentOwnershipTypeInput: React.FC<SwedishApartmentOwnershipTypeInputProps> = ({
  name,
  formikProps,
}) => (
  <DetailInput
    name={name}
    field={{
      label: 'DETAILS_MODULE_TABLE_RESIDENCE_TYPE_CELL_LABEL',
      placeholder: '',
      options: [
        ...(formikProps.values.data.isStudent
          ? [
              {
                label: 'SIDEBAR_INSURANCE_TYPE_BRF',
                value: ApartmentType.StudentBrf,
              },
              {
                label: 'SIDEBAR_INSURANCE_TYPE_RENT',
                value: ApartmentType.StudentRent,
              },
            ]
          : [
              {
                label: 'SIDEBAR_INSURANCE_TYPE_BRF',
                value: ApartmentType.Brf,
              },
              {
                label: 'SIDEBAR_INSURANCE_TYPE_RENT',
                value: ApartmentType.Rent,
              },
            ]),
      ],
    }}
    formikProps={formikProps}
  />
)

type YearInputProps = {
  name: string
  label: string
  formikProps: FormikProps<QuoteInput>
}

export const YearInput: React.FC<YearInputProps> = ({
  name,
  label,
  formikProps,
}) => (
  <DetailInput
    field={{
      label: label,
      placeholder: '',
      mask: masks.year,
      type: inputTypes.number,
    }}
    formikProps={formikProps}
    name={name}
  />
)

type ZipcodeInputProps = {
  name: string
  market: MarketLabel
  formikProps: FormikProps<QuoteInput>
}

export const ZipcodeInput: React.FC<ZipcodeInputProps> = ({
  name,
  market,
  formikProps,
}) => {
  const isSweden = market === 'SE'
  return (
    <DetailInput
      field={{
        label: 'DETAILS_MODULE_TABLE_POSTALCODE_CELL_LABEL',
        placeholder: '',
        mask: isSweden ? masks.fiveDigitZipCode : masks.fourDigitZipCode,
        type: inputTypes.string,
      }}
      formikProps={formikProps}
      name={name}
    />
  )
}

const getExtraBuilding = (extraBuildingType: ExtraBuildingType): string => {
  const map = {
    [ExtraBuildingType.Attefall]: 'DETAILS_MODULE_EXTRABUILDINGS_ATTEFALL',
    [ExtraBuildingType.Barn]: 'DETAILS_MODULE_EXTRABUILDINGS_BARN',
    [ExtraBuildingType.Boathouse]: 'DETAILS_MODULE_EXTRABUILDINGS_BOATHOUSE',
    [ExtraBuildingType.Carport]: 'DETAILS_MODULE_EXTRABUILDINGS_CARPORT',
    [ExtraBuildingType.Friggebod]: 'DETAILS_MODULE_EXTRABUILDINGS_FRIGGEBOD',
    [ExtraBuildingType.Garage]: 'DETAILS_MODULE_EXTRABUILDINGS_GARAGE',
    [ExtraBuildingType.Gazebo]: 'DETAILS_MODULE_EXTRABUILDINGS_GAZEBO',
    [ExtraBuildingType.Greenhouse]: 'DETAILS_MODULE_EXTRABUILDINGS_GREENHOUSE',
    [ExtraBuildingType.Guesthouse]: 'DETAILS_MODULE_EXTRABUILDINGS_GUESTHOUSE',
    [ExtraBuildingType.Other]: 'DETAILS_MODULE_EXTRABUILDINGS_OTHER',
    [ExtraBuildingType.Outhouse]: 'DETAILS_MODULE_EXTRABUILDINGS_OUTHOUSE',
    [ExtraBuildingType.Sauna]: 'DETAILS_MODULE_EXTRABUILDINGS_SAUNA',
    [ExtraBuildingType.Shed]: 'DETAILS_MODULE_EXTRABUILDINGS_SHED',
    [ExtraBuildingType.Storehouse]: 'DETAILS_MODULE_EXTRABUILDINGS_STOREHOUSE',
  }

  if (!map[extraBuildingType]) {
    throw new Error(`Invalid insurance type ${extraBuildingType}`)
  }

  return map[extraBuildingType]
}

type ExtraBuildingsInputProps = {
  formikProps: FormikProps<QuoteInput>
}

export const ExtraBuildingsInput: React.FC<ExtraBuildingsInputProps> = ({
  formikProps,
}) => {
  const textKeys = useTextKeys()
  return (
    <FieldArray
      name="data.extraBuildings"
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

          {formikProps.values.data.extraBuildings?.map(
            (_: any, index: number) => (
              <InputGroup key={index}>
                <DetailInput
                  name={`extraBuildings.${index}.type`}
                  field={{
                    label:
                      'DETAILS_MODULE_EXTRABUILDINGS_TABLE_BUILDINGTYPE_CELL_LABEL_HOUSE',
                    placeholder: '',
                    options: Object.values(ExtraBuildingType).map((value) => ({
                      label: getExtraBuilding(value),
                      value,
                    })),
                  }}
                  formikProps={formikProps}
                />
                <AreaInput
                  name={`extraBuildings.${index}.area`}
                  label="DETAILS_MODULE_EXTRABUILDINGS_TABLE_SIZE_CELL_LABEL_HOUSE"
                  formikProps={formikProps}
                />
                <BooleanInput
                  name={`extraBuildings.${index}.hasWaterConnected`}
                  label="DETAILS_MODULE_EXTRABUILDINGS_TABLE_WATER_CELL_LABEL_HOUSE"
                  formikProps={formikProps}
                />
                <InputGroupDeleteButton
                  type="button"
                  onClick={() => {
                    const isLastItemLeft =
                      formikProps.values.data.extraBuildings?.length === 1

                    arrayHelpers.remove(index)

                    if (isLastItemLeft) {
                      formikProps.setValues({
                        ...formikProps.values,
                        data: {
                          ...formikProps.values.data,
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
  )
}
