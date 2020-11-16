import { match } from 'matchly'
import * as Yup from 'yup'
import { inputTypes, masks } from 'components/inputs'
import {
  ApartmentType,
  EditQuoteInput,
  ExtraBuilding,
  ExtraBuildingType,
  NorwegianHomeContentsDetails,
  NorwegianHomeContentsType,
  NorwegianTravelDetails,
  SwedishApartmentQuoteDetails,
  SwedishHouseQuoteDetails,
  DanishHomeContentsDetails,
  DanishHomeContentsType,
  QuoteBundleQuery,
} from 'data/graphql'
import { OfferQuote } from 'pages/OfferNew/types'
import {
  isStudent,
  isSwedishApartment,
  isSwedishHouse,
  isNorwegianHomeContents,
  isNorwegianTravel,
  isDanishHomeContents,
} from '../../../utils'
import {
  ApartmentFieldSchema,
  ArrayFieldType,
  FieldSchema,
  FieldType,
  HouseFieldSchema,
  NorwegianHomeContentFieldSchema,
  NorwegianTravelContentFieldSchema,
  RegularFieldType,
  DanishHomeContentFieldSchema,
} from './types'

export const isDanishHomeContentFieldSchema = (
  fieldSchema: FieldSchema,
  quote: OfferQuote,
): fieldSchema is DanishHomeContentFieldSchema => {
  return (
    'danishHomeContents' in fieldSchema &&
    isDanishHomeContents(quote.quoteDetails)
  )
}

export const isNorwegianHomeContentFieldSchema = (
  fieldSchema: FieldSchema,
  quote: OfferQuote,
): fieldSchema is NorwegianHomeContentFieldSchema => {
  return (
    'norwegianHomeContents' in fieldSchema &&
    isNorwegianHomeContents(quote.quoteDetails)
  )
}
export const isNorwegianTravelFieldSchema = (
  fieldSchema: FieldSchema,
  quote: OfferQuote,
): fieldSchema is NorwegianTravelContentFieldSchema => {
  return (
    'norwegianTravel' in fieldSchema && isNorwegianTravel(quote.quoteDetails)
  )
}

export const isApartmentFieldSchema = (
  fieldSchema: FieldSchema,
  quote: OfferQuote,
): fieldSchema is ApartmentFieldSchema => {
  return 'apartment' in fieldSchema && isSwedishApartment(quote.quoteDetails)
}

export const isHouseFieldSchema = (
  fieldSchema: FieldSchema,
  quote: OfferQuote,
): fieldSchema is HouseFieldSchema => {
  return 'house' in fieldSchema && isSwedishHouse(quote.quoteDetails)
}
const getSwedishSchema = (base: any, offerQuote: OfferQuote) => {
  const swedishBase = {
    ...base,
    householdSize: {
      label: 'DETAILS_MODULE_TABLE_INSUREDPEOPLE_CELL_LABEL',
      placeholder: 'DETAILS_MODULE_TABLE_INSUREDPEOPLE_CELL_LABEL',
      type: inputTypes.number,
      validation: Yup.number().required(),
    },
  }
  return isSwedishApartment(offerQuote.quoteDetails)
    ? {
        apartment: {
          ...swedishBase,
          livingSpace: {
            label: 'DETAILS_MODULE_TABLE_SIZE_CELL_LABEL_APARTMENT',
            placeholder: 'DETAILS_MODULE_TABLE_SIZE_CELL_LABEL_APARTMENT',
            mask: masks.area,
            type: inputTypes.number,
            validation: Yup.number()
              .min(1)
              .required(),
          },
          type: {
            label: 'DETAILS_MODULE_TABLE_RECIDENCY_TYPE_CELL_LABEL_APARTMENT',
            placeholder:
              'DETAILS_MODULE_TABLE_RECIDENCY_TYPE_CELL_LABEL_APARTMENT',
            options: [
              ...(isStudent(offerQuote.quoteDetails)
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
            validation: Yup.string().required(),
          },
        },
      }
    : {
        house: {
          ...swedishBase,
          livingSpace: {
            label: 'DETAILS_MODULE_TABLE_LIVINGSPACE_CELL_LABEL_HOUSE',
            placeholder: 'DETAILS_MODULE_TABLE_LIVINGSPACE_CELL_LABEL_HOUSE',
            mask: masks.area,
            type: inputTypes.number,
            validation: Yup.number()
              .min(1)
              .required(),
          },
          ancillarySpace: {
            label: 'DETAILS_MODULE_TABLE_ANCILLARYAREA_CELL_LABEL_HOUSE',
            placeholder: 'DETAILS_MODULE_TABLE_ANCILLARYAREA_CELL_LABEL_HOUSE',
            mask: masks.area,
            type: inputTypes.number,
            validation: Yup.number()
              .min(1)
              .required(),
          },
          numberOfBathrooms: {
            label: 'DETAILS_MODULE_TABLE_BATHROOMS_CELL_LABEL_HOUSE',
            placeholder: 'DETAILS_MODULE_TABLE_BATHROOMS_CELL_LABEL_HOUSE',
            type: inputTypes.number,
            validation: Yup.number()
              .min(0)
              .required(),
          },
          yearOfConstruction: {
            label: 'DETAILS_MODULE_TABLE_YEARBUILT_CELL_LABEL_HOUSE',
            placeholder: 'DETAILS_MODULE_TABLE_YEARBUILT_CELL_LABEL_HOUSE',
            mask: masks.year,
            type: inputTypes.number,
            validation: Yup.number().required(),
          },
          isSubleted: {
            label: 'DETAILS_MODULE_TABLE_SUBLETTING_CELL_LABEL_HOUSE',
            placeholder: 'DETAILS_MODULE_TABLE_SUBLETTING_CELL_LABEL_HOUSE',
            options: [
              { label: 'YES', value: 'true' },
              { label: 'NO', value: 'false' },
            ],
            validation: Yup.boolean().required(),
          },
          extraBuildings: {
            arrayValidation: Yup.array(),
            type: {
              label:
                'DETAILS_MODULE_EXTRABUILDINGS_TABLE_BUILDINGTYPE_CELL_LABEL_HOUSE',
              placeholder:
                'DETAILS_MODULE_EXTRABUILDINGS_TABLE_BUILDINGTYPE_CELL_LABEL_HOUSE',
              options: Object.values(ExtraBuildingType).map((value) => ({
                label: getExtraBuilding(value),
                value,
              })),
              validation: Yup.string().required(),
            },
            area: {
              label:
                'DETAILS_MODULE_EXTRABUILDINGS_TABLE_SIZE_CELL_LABEL_HOUSE',
              placeholder:
                'DETAILS_MODULE_EXTRABUILDINGS_TABLE_SIZE_CELL_LABEL_HOUSE',
              mask: masks.area,
              type: inputTypes.number,
              validation: Yup.number()
                .min(1)
                .required(),
            },
            hasWaterConnected: {
              label:
                'DETAILS_MODULE_EXTRABUILDINGS_TABLE_WATER_CELL_LABEL_HOUSE',
              placeholder:
                'DETAILS_MODULE_EXTRABUILDINGS_TABLE_WATER_CELL_LABEL_HOUSE',
              options: [
                { label: 'YES', value: 'true' },
                { label: 'NO', value: 'false' },
              ],
              validation: Yup.boolean().required(),
            },
          },
        },
      }
}
const getNorwegianSchema = (base: any, offerQuote: OfferQuote) => {
  const commonAttributes = {
    coInsured: {
      label: 'DETAILS_MODULE_TABLE_INSUREDPEOPLE_CELL_LABEL',
      placeholder: 'DETAILS_MODULE_TABLE_INSUREDPEOPLE_CELL_LABEL',
      type: inputTypes.number,
      validation: Yup.number().required(),
    },
    isYouth: {
      label: 'DETAILS_MODULE_TABLE_YOUTH_CELL_LABEL',
      placeholder: 'DETAILS_MODULE_TABLE_YOUTH_CELL_LABEL',
      options: [
        { label: 'YES', value: 'true' },
        { label: 'NO', value: 'false' },
      ],
      validation: Yup.boolean().required(),
    },
  }

  return isNorwegianHomeContents(offerQuote.quoteDetails)
    ? {
        norwegianHomeContents: {
          ...base,
          ...commonAttributes,
          livingSpace: {
            label: 'DETAILS_MODULE_TABLE_LIVINGSPACE_CELL_LABEL_HOUSE',
            placeholder: 'DETAILS_MODULE_TABLE_LIVINGSPACE_CELL_LABEL_HOUSE',
            type: inputTypes.number,
            validation: Yup.number().required(),
          },
          type: {
            label: 'DETAILS_MODULE_TABLE_RECIDENCY_TYPE_CELL_LABEL_APARTMENT',
            placeholder:
              'DETAILS_MODULE_TABLE_RECIDENCY_TYPE_CELL_LABEL_APARTMENT',
            options: [
              {
                label: 'SIDEBAR_INSURANCE_TYPE_BRF',
                value: NorwegianHomeContentsType.Own,
              },
              {
                label: 'SIDEBAR_INSURANCE_TYPE_RENT',
                value: NorwegianHomeContentsType.Rent,
              },
            ],
            validation: Yup.string().required(),
          },
        },
      }
    : { norwegianTravel: { ...commonAttributes } }
}

const getDanishSchema = (base: any) => {
  return {
    danishHomeContents: {
      ...base,
      coInsured: {
        label: 'DETAILS_MODULE_TABLE_INSUREDPEOPLE_CELL_LABEL',
        placeholder: 'DETAILS_MODULE_TABLE_INSUREDPEOPLE_CELL_LABEL',
        type: inputTypes.number,
        validation: Yup.number().required(),
      },
      isStudent: {
        label: 'DETAILS_MODULE_TABLE_STUDENT_CELL_LABEL',
        placeholder: 'DETAILS_MODULE_TABLE_STUDENT_CELL_LABEL',
        options: [
          { label: 'YES', value: 'true' },
          { label: 'NO', value: 'false' },
        ],
        validation: Yup.boolean().required(),
      },
      livingSpace: {
        label: 'DETAILS_MODULE_TABLE_LIVINGSPACE_CELL_LABEL_HOUSE',
        placeholder: 'DETAILS_MODULE_TABLE_LIVINGSPACE_CELL_LABEL_HOUSE',
        type: inputTypes.number,
        validation: Yup.number().required(),
      },
      type: {
        label: 'DETAILS_MODULE_TABLE_RECIDENCY_TYPE_CELL_LABEL_APARTMENT',
        placeholder: 'DETAILS_MODULE_TABLE_RECIDENCY_TYPE_CELL_LABEL_APARTMENT',
        options: [
          {
            label: 'SIDEBAR_INSURANCE_TYPE_BRF',
            value: DanishHomeContentsType.Own,
          },
          {
            label: 'SIDEBAR_INSURANCE_TYPE_RENT',
            value: DanishHomeContentsType.Rent,
          },
        ],
        validation: Yup.string().required(),
      },
    },
  }
}

export const getFieldSchema = (offerQuote: OfferQuote): FieldSchema => {
  const base = {
    street: {
      label: 'DETAILS_MODULE_TABLE_ADDRESS_CELL_LABEL',
      placeholder: 'DETAILS_MODULE_TABLE_ADDRESS_CELL_LABEL',
      validation: Yup.string().required(),
    },
    zipCode: {
      label: 'DETAILS_MODULE_TABLE_POSTALCODE_CELL_LABEL',
      placeholder: 'DETAILS_MODULE_TABLE_POSTALCODE_CELL_LABEL',
      mask: offerQuote.quoteDetails.__typename?.includes('Swedish')
        ? masks.zipCode
        : masks.zipCodeNoDk,
      type: inputTypes.string,
      validation: offerQuote.quoteDetails.__typename?.includes('Swedish')
        ? Yup.string().matches(/^[0-9]{3}[0-9]{2}$/)
        : Yup.string().matches(/^[0-9]{4}$/),
    },
  }
  if (offerQuote.quoteDetails.__typename?.includes('Norwegian')) {
    return getNorwegianSchema(base, offerQuote)
  } else if (offerQuote.quoteDetails.__typename?.includes('Danish')) {
    return getDanishSchema(base)
  }

  return getSwedishSchema(base, offerQuote)
}

const getMarketFields = (fieldSchema: FieldSchema, offerQuote: OfferQuote) => {
  if (offerQuote.quoteDetails.__typename?.includes('Norwegian')) {
    const isNorwegianHomeContent = isNorwegianHomeContentFieldSchema(
      fieldSchema,
      offerQuote,
    )
    return {
      fields: isNorwegianHomeContent
        ? (fieldSchema as NorwegianHomeContentFieldSchema).norwegianHomeContents
        : (fieldSchema as NorwegianTravelContentFieldSchema).norwegianTravel,
      key: isNorwegianHomeContent ? 'norwegianHomeContents' : 'norwegianTravel',
    }
  }
  if (offerQuote.quoteDetails.__typename?.includes('Danish')) {
    return {
      fields: (fieldSchema as DanishHomeContentFieldSchema).danishHomeContents,
      key: 'danishHomeContents',
    }
  }

  const isAppartment = isApartmentFieldSchema(fieldSchema, offerQuote)
  return {
    fields: isAppartment
      ? (fieldSchema as ApartmentFieldSchema).apartment
      : (fieldSchema as HouseFieldSchema).house,
    key: isAppartment ? 'apartment' : 'house',
  }
}

export const getValidationSchema = (
  fieldSchema: FieldSchema,
  offerQuote: OfferQuote,
): Yup.ObjectSchema<unknown> => {
  const { fields, key } = getMarketFields(fieldSchema, offerQuote)

  return Yup.object({
    [key]: Yup.object({
      ...Object.entries(fields).reduce(
        (acc, t) => ({
          ...acc,
          ...getValidationSchemaHelper(t),
        }),
        {},
      ),
    }),
  })
}

type FieldTuple<T> = [string, FieldType<T>]

const getValidationSchemaHelper = <T>([key, value]: FieldTuple<T>): any => {
  if (isRegularFieldType(value)) {
    return { [key]: value.validation }
  }

  if (isArrayFieldType(value)) {
    return {
      [key]: value.arrayValidation.of(
        Yup.object().shape(
          Object.assign(
            {},
            ...Object.entries(value)
              .filter(([k]) => k !== 'arrayValidation')
              .map((v) =>
                getValidationSchemaHelper(
                  (v as any) as [string, RegularFieldType],
                ),
              ),
          ),
        ),
      ),
    }
  }

  return { [key]: Yup.object().shape({ ...getValidationSchemaHelper(value) }) }
}

export const isRegularFieldType = <T>(
  field: FieldType<T>,
): field is RegularFieldType => {
  return {}.hasOwnProperty.call(field, 'validation')
}

export const isArrayFieldType = <T>(
  field: FieldType<T>,
): field is ArrayFieldType<T> => {
  return {}.hasOwnProperty.call(field, 'arrayValidation')
}

export const getExtraBuilding = (
  extraBuildingType: ExtraBuildingType,
): string => {
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

export const getInitialSwedishApartmentValues = (
  quoteId: string,
  details: SwedishApartmentQuoteDetails,
): EditQuoteInput => ({
  id: quoteId,
  apartment: {
    street: details.street,
    zipCode: details.zipCode,
    householdSize: details.householdSize,
    livingSpace: details.livingSpace,
    type: details.type,
  },
})

export const getInitialSwedishHouseValues = (
  quoteId: string,
  details: SwedishHouseQuoteDetails,
): EditQuoteInput => ({
  id: quoteId,
  house: {
    street: details.street,
    zipCode: details.zipCode,
    householdSize: details.householdSize,
    livingSpace: details.livingSpace,
    ancillarySpace: details.ancillarySpace,
    numberOfBathrooms: details.numberOfBathrooms,
    yearOfConstruction: details.yearOfConstruction,
    isSubleted: details.isSubleted,
    extraBuildings: details.extraBuildings
      .filter((b) => !!b.__typename)
      .map((b) => ({
        type: extraBuildingTypes[b.__typename!],
        area: b.area,
        hasWaterConnected: b.hasWaterConnected,
      })),
  },
})
type QueryQuoteDetails = QuoteBundleQuery['quoteBundle']['quotes'][0]['quoteDetails']

export const getInitialNorwegianHomeContentValues = (
  quoteId: string,
  quoteDetails: {
    __typename: 'NorwegianHomeContentsDetails'
  } & QueryQuoteDetails,
): EditQuoteInput => ({
  id: quoteId,
  norwegianHomeContents: {
    type: quoteDetails.norwegianHomeType,
    street: quoteDetails.street,
    zipCode: quoteDetails.zipCode,
    coInsured: quoteDetails.coInsured,
    isYouth: quoteDetails.isYouth,
    livingSpace: quoteDetails.livingSpace,
  },
})

export const getInitialDanishHomeContentValues = (
  quoteId: string,
  quoteDetails: {
    __typename: 'DanishHomeContentsDetails'
  } & QueryQuoteDetails,
): EditQuoteInput => {
  return {
    id: quoteId,
    danishHomeContents: {
      type: quoteDetails.danishHomeType,
      street: quoteDetails.street,
      zipCode: quoteDetails.zipCode,
      coInsured: quoteDetails.coInsured,
      isStudent: quoteDetails.isStudent,
      livingSpace: quoteDetails.livingSpace,
    },
  }
}

const getInitialNorwegianTravelValues = (
  quoteId: string,
  quoteDetails: NorwegianTravelDetails,
): EditQuoteInput => ({
  id: quoteId,
  norwegianTravel: {
    coInsured: quoteDetails.coInsured,
    isYouth: quoteDetails.isYouth,
  },
})

export const getInitialInputValues = (offerQuote: OfferQuote) =>
  match<string, EditQuoteInput>([
    [
      'SwedishHouseQuoteDetails',
      () =>
        getInitialSwedishHouseValues(
          offerQuote.id,
          offerQuote.quoteDetails as SwedishHouseQuoteDetails,
        ),
    ],
    [
      'SwedishApartmentQuoteDetails',
      () =>
        getInitialSwedishApartmentValues(
          offerQuote.id,
          offerQuote.quoteDetails as SwedishApartmentQuoteDetails,
        ),
    ],
    [
      'NorwegianHomeContentsDetails',
      () =>
        getInitialNorwegianHomeContentValues(
          offerQuote.id,
          (offerQuote.quoteDetails as QueryQuoteDetails) as QueryQuoteDetails & {
            __typename: 'NorwegianHomeContentsDetails'
          },
        ),
    ],
    [
      'NorwegianTravelDetails',
      () =>
        getInitialNorwegianTravelValues(
          offerQuote.id,
          offerQuote.quoteDetails as NorwegianTravelDetails,
        ),
    ],
    [
      'DanishHomeContentsDetails',
      () =>
        getInitialDanishHomeContentValues(
          offerQuote.id,
          (offerQuote.quoteDetails as QueryQuoteDetails) as {
            __typename: 'DanishHomeContentsDetails'
          } & QueryQuoteDetails,
        ),
    ],
  ])(offerQuote.quoteDetails.__typename as string) ??
  (() => {
    throw new window.Error(
      `Expected quote details to be a valid type but was "${offerQuote.quoteDetails.__typename}"`,
    )
  })()
