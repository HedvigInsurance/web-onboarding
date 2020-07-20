import { CoreInputFieldProps } from 'components/inputs'
import { EditApartmentInput, EditHouseInput } from 'data/graphql'
import * as Yup from 'yup'

type Unarray<T> = T extends Array<infer U> ? U : T

type RequiredFields<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

export interface RegularFieldType extends CoreInputFieldProps {
  validation: Yup.Schema<string | number | boolean>
}

export type ArrayFieldType<T> = {
  arrayValidation: Yup.ArraySchema<any[]>
} & FieldSchemaBuilder<Unarray<T>>

export type FieldType<T> = RegularFieldType | ArrayFieldType<T>

export interface ApartmentFieldSchema {
  apartment: FieldSchemaBuilder<RequiredFields<EditApartmentInput>>
}

export interface HouseFieldSchema {
  house: FieldSchemaBuilder<RequiredFields<EditHouseInput>>
}

export type FieldSchemaBuilder<T> = {
  [P in keyof T]: T[P] extends string | number | boolean
    ? RegularFieldType
    : T[P] extends any[]
    ? ArrayFieldType<T[P]>
    : FieldSchemaBuilder<T[P]>
}

export type FieldSchema = ApartmentFieldSchema | HouseFieldSchema
