import * as Yup from 'yup'
import { CoreInputFieldProps } from 'components/inputs'
import {
  EditNorwegianHomeContentsInput,
  EditNorwegianTravelInput,
  EditDanishHomeContentsInput,
  EditSwedishHouseInput,
  EditSwedishApartmentInput,
} from 'data/graphql'

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

export interface SwedishApartmentFieldSchema {
  swedishApartment: FieldSchemaBuilder<
    RequiredFields<EditSwedishApartmentInput>
  >
}

export interface SwedishHouseFieldSchema {
  swedishHouse: FieldSchemaBuilder<RequiredFields<EditSwedishHouseInput>>
}
export interface NorwegianHomeContentFieldSchema {
  norwegianHomeContents: FieldSchemaBuilder<
    RequiredFields<EditNorwegianHomeContentsInput>
  >
}
export interface NorwegianTravelContentFieldSchema {
  norwegianTravel: FieldSchemaBuilder<RequiredFields<EditNorwegianTravelInput>>
}

export type PartialEditDanishHomeContentsInput = Omit<
  EditDanishHomeContentsInput,
  'apartment' | 'floor' | 'city' | 'bbrId'
>

export interface DanishHomeContentFieldSchema {
  danishHomeContents: FieldSchemaBuilder<
    RequiredFields<PartialEditDanishHomeContentsInput>
  >
}

export type CommonFieldSchema = {
  firstName: RegularFieldType
  lastName: RegularFieldType
  birthDate: RegularFieldType
}

export type FieldSchemaBuilder<T> = {
  [P in keyof T]: T[P] extends string | number | boolean
    ? RegularFieldType
    : T[P] extends any[]
    ? ArrayFieldType<T[P]>
    : FieldSchemaBuilder<T[P]>
}

export type DetailsFieldSchema =
  | SwedishApartmentFieldSchema
  | SwedishHouseFieldSchema
  | NorwegianHomeContentFieldSchema
  | NorwegianTravelContentFieldSchema
  | DanishHomeContentFieldSchema

export type FieldSchema = DetailsFieldSchema & CommonFieldSchema

export type MarketFields =
  | FieldSchemaBuilder<RequiredFields<EditSwedishApartmentInput>>
  | FieldSchemaBuilder<RequiredFields<EditSwedishHouseInput>>
  | FieldSchemaBuilder<RequiredFields<EditNorwegianHomeContentsInput>>
  | FieldSchemaBuilder<RequiredFields<EditNorwegianTravelInput>>
  | FieldSchemaBuilder<RequiredFields<PartialEditDanishHomeContentsInput>>
