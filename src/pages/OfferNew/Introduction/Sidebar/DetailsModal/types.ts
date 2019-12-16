import { CoreInputFieldProps } from 'new-components/inputs/index'
import * as Yup from 'yup'

export interface FieldType extends CoreInputFieldProps {
  validation: Yup.Schema<string | number>
}

export interface ApartmentFieldSchema {
  apartment: {
    street?: FieldType
    zipCode?: FieldType
    householdSize?: FieldType
    livingSpace?: FieldType
    type?: FieldType
  }
}

export interface HouseFieldSchema {
  house: {
    street?: FieldType
    zipCode?: FieldType
    householdSize?: FieldType
    livingSpace?: FieldType
    ancillarySpace?: FieldType
    yearOfConstruction?: FieldType
    numberOfBathrooms?: FieldType
    isSubleted?: FieldType
  }
}

export type FieldSchema = ApartmentFieldSchema | HouseFieldSchema
