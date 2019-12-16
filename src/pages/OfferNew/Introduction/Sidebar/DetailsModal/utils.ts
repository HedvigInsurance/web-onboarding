import { ApartmentType, CompleteQuote, EditQuoteInput } from 'generated/graphql'
import { inputTypes, masks } from 'new-components/inputs/index'
import * as Yup from 'yup'
import { isApartment, isStudent } from '../../../utils'
import { ApartmentFieldSchema, FieldSchema } from './types'

export const isApartmentFieldSchema = (
  fieldSchema: FieldSchema,
  quote: CompleteQuote,
): fieldSchema is ApartmentFieldSchema => {
  return (
    (fieldSchema as ApartmentFieldSchema).apartment &&
    isApartment(quote.details)
  )
}

export const getFieldSchema = (quote: CompleteQuote): FieldSchema => {
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
    livingSpace: {
      label: 'Storlek',
      placeholder: 'Storlek',
      mask: masks.area,
      type: inputTypes.number,
      validation: Yup.number().required(),
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
      }
}
