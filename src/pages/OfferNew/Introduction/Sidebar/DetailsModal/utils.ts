import {
  ApartmentType,
  CompleteQuote,
  EditQuoteInput,
  ExtraBuilding,
  ExtraBuildingType,
} from 'generated/graphql'
import { inputTypes, masks } from 'new-components/inputs/index'
import * as Yup from 'yup'
import { isApartment, isHouse, isStudent } from '../../../utils'
import { ApartmentFieldSchema, FieldSchema, HouseFieldSchema } from './types'

export const isApartmentFieldSchema = (
  fieldSchema: FieldSchema,
  quote: CompleteQuote,
): fieldSchema is ApartmentFieldSchema => {
  return (
    (fieldSchema as ApartmentFieldSchema).apartment &&
    isApartment(quote.details)
  )
}

export const isHouseFieldSchema = (
  fieldSchema: FieldSchema,
  quote: CompleteQuote,
): fieldSchema is HouseFieldSchema => {
  return (fieldSchema as HouseFieldSchema).house && isHouse(quote.details)
}

export const getFieldSchema = (quote: CompleteQuote): FieldSchema => {
  console.log(quote)
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
      type: inputTypes.number,
      validation: Yup.string().matches(/^[0-9]{3}[0-9]{2}$/),
    },
    householdSize: {
      label: 'Antal försäkrade',
      placeholder: 'Antal försäkrade',
      type: inputTypes.number,
      validation: Yup.number().required(),
    },
  }

  return isApartment(quote.details)
    ? {
        apartment: {
          ...base,
          livingSpace: {
            label: 'Storlek',
            placeholder: 'Storlek',
            mask: masks.area,
            type: inputTypes.number,
            validation: Yup.number().required(),
          },
          type: {
            label: 'Typ av boende',
            placeholder: 'Typ av boende',
            options: [
              ...(isStudent(quote.details)
                ? [
                    { label: 'Bostadsrätt', value: ApartmentType.StudentBrf },
                    { label: 'Hyresrätt', value: ApartmentType.StudentRent },
                  ]
                : [
                    { label: 'Bostadsrätt', value: ApartmentType.Brf },
                    { label: 'Hyresrätt', value: ApartmentType.Rent },
                  ]),
            ],
            validation: Yup.string().required(),
          },
        },
      }
    : {
        house: {
          ...base,
          livingSpace: {
            label: 'Boyta',
            placeholder: 'Boyta',
            mask: masks.area,
            type: inputTypes.number,
            validation: Yup.number().required(),
          },
          ancillarySpace: {
            label: 'Biyta',
            placeholder: 'Biyta',
            mask: masks.area,
            type: inputTypes.number,
            validation: Yup.number().required(),
          },
          numberOfBathrooms: {
            label: 'Antal badrum',
            placeholder: 'Antal badrum',
            type: inputTypes.number,
            validation: Yup.number().required(),
          },
          yearOfConstruction: {
            label: 'Byggnadsår',
            placeholder: 'Byggnadsår',
            type: inputTypes.number,
            validation: Yup.number().required(),
          },
          isSubleted: {
            label: 'Har hyresgäst',
            placeholder: 'Har hyresgäst',
            options: [
              { label: 'Ja', value: 'ja' },
              { label: 'Nej', value: 'nej' },
            ],
            validation: Yup.string().required(),
          },
          extraBuildings: {
            type: {
              label: 'Byggnadstyp',
              placeholder: 'Byggnadstyp',
              options: Object.values(ExtraBuildingType).map((value) => ({
                label: getExtraBuilding(value),
                value,
              })),
              validation: Yup.string().required(),
            },
            area: {
              label: 'Storlek',
              placeholder: 'Storlek',
              mask: masks.area,
              type: inputTypes.number,
              validation: Yup.number().required(),
            },
            hasWaterConnected: {
              label: 'Indraget vatten',
              placeholder: 'Indraget vatten',
              options: [
                { label: 'Ja', value: 'ja' },
                { label: 'Nej', value: 'nej' },
              ],
              validation: Yup.string().required(),
            },
          },
        },
      }
}

// TODO: fix any type
export const getValidationSchema = (
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

export const getExtraBuilding = (
  extraBuildingType: ExtraBuildingType,
): string => {
  const map = {
    [ExtraBuildingType.Attefall]: 'Attefall',
    [ExtraBuildingType.Barn]: 'Lada',
    [ExtraBuildingType.Boathouse]: 'Båthus',
    [ExtraBuildingType.Carport]: 'Carport',
    [ExtraBuildingType.Friggebod]: 'Friggebod',
    [ExtraBuildingType.Garage]: 'Garage',
    [ExtraBuildingType.Gazebo]: 'Lusthus',
    [ExtraBuildingType.Greenhouse]: 'Växthus',
    [ExtraBuildingType.Guesthouse]: 'Gästhus',
    [ExtraBuildingType.Other]: 'Annat',
    [ExtraBuildingType.Outhouse]: 'Uthus',
    [ExtraBuildingType.Sauna]: 'Bastu',
    [ExtraBuildingType.Shed]: 'Skjul',
    [ExtraBuildingType.Storehouse]: 'Förråd',
  }

  if (!map[extraBuildingType]) {
    throw new Error(`Invalid insurance type ${extraBuildingType}`)
  }

  return map[extraBuildingType]
}

export const extraBuildingTypes: {
  [key in Required<ExtraBuilding>['__typename']]: ExtraBuildingType
} = {
  ExtraBuildingAttefall: ExtraBuildingType.Attefall,
  ExtraBuildingBarn: ExtraBuildingType.Barn,
  ExtraBuildingBoathouse: ExtraBuildingType.Boathouse,
  ExtraBuildingCarport: ExtraBuildingType.Carport,
  ExtraBuildingFriggebod: ExtraBuildingType.Friggebod,
  ExtraBuildingGarage: ExtraBuildingType.Garage,
  ExtraBuildingGazebo: ExtraBuildingType.Gazebo,
  ExtraBuildingGreenhouse: ExtraBuildingType.Greenhouse,
  ExtraBuildingGuesthouse: ExtraBuildingType.Guesthouse,
  ExtraBuildingOther: ExtraBuildingType.Other,
  ExtraBuildingOuthouse: ExtraBuildingType.Outhouse,
  ExtraBuildingSauna: ExtraBuildingType.Sauna,
  ExtraBuildingShed: ExtraBuildingType.Shed,
  ExtraBuildingStorehouse: ExtraBuildingType.Storehouse,
}

export const getSchema = (quote: CompleteQuote): EditQuoteInput => {
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
        house: {
          ...base,
          ancillarySpace: quote.details.ancillarySpace,
          extraBuildings: quote.details.extraBuildings
            .filter((b) => !!b.__typename)
            .map((b) => ({
              type: extraBuildingTypes[b.__typename!],
              area: b.area,
              hasWaterConnected: b.hasWaterConnected,
            })),
        },
      }
}
