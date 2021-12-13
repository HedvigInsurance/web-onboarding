import React from 'react'
import { FormikProps } from 'formik'
import { MarketLabel } from 'l10n/locales'
import { CreateQuoteInsuranceType } from 'utils/insuranceType'
import { QuoteInput } from '../types'
import {
  SwedishApartmentDetails,
  SwedishApartmentValidationSchema,
} from './SwedishApartmentDetails'

import {
  SwedishHouseDetails,
  SwedishHouseValidationSchema,
} from './SwedishHouseDetails'

import { NorwegianDetails, NorwegianValidationSchema } from './NorwegianDetails'

import { DanishDetails, DanishValidationSchema } from './DanishDetails'

export const getValidationSchema = (
  market: MarketLabel,
  type: CreateQuoteInsuranceType,
) => {
  const isSwedishHouse = type === CreateQuoteInsuranceType.SwedishHouse

  switch (market) {
    case 'SE':
      return isSwedishHouse
        ? SwedishHouseValidationSchema
        : SwedishApartmentValidationSchema
    case 'NO':
      return NorwegianValidationSchema
    case 'DK':
      return DanishValidationSchema

    default:
      throw 'Unknown market'
  }
}

export const Details: React.FC<{
  market: MarketLabel
  type: CreateQuoteInsuranceType
  formikProps: FormikProps<QuoteInput>
}> = ({ market, type, formikProps }) => {
  const isSwedishHouse = type === CreateQuoteInsuranceType.SwedishHouse

  switch (market) {
    case 'SE':
      return isSwedishHouse ? (
        <SwedishHouseDetails formikProps={formikProps} />
      ) : (
        <SwedishApartmentDetails formikProps={formikProps} />
      )
    case 'NO':
      return <NorwegianDetails formikProps={formikProps} />
    case 'DK':
      return <DanishDetails formikProps={formikProps} />

    default:
      return null
  }
}
