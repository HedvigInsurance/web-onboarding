import React from 'react'
import { FormikProps } from 'formik'
import { MarketLabel } from 'l10n/locales'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { TextKeyMap } from 'utils/textKeys'
import { QuoteInput } from '../types'
import {
  SwedishApartmentDetails,
  SwedishApartmentValidationSchema,
} from './SwedishApartmentDetails'

import {
  SwedishHouseDetails,
  getSwedishHouseValidationSchema,
} from './SwedishHouseDetails'

import { NorwegianDetails, NorwegianValidationSchema } from './NorwegianDetails'

import { DanishDetails, DanishValidationSchema } from './DanishDetails'

export const getValidationSchema = (
  market: MarketLabel,
  type: InsuranceType,
  textKeys: TextKeyMap,
) => {
  const isSwedishHouse = type === InsuranceType.SWEDISH_HOUSE

  switch (market) {
    case 'SE':
      return isSwedishHouse
        ? getSwedishHouseValidationSchema(textKeys)
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
  type: InsuranceType
  formikProps: FormikProps<QuoteInput>
}> = ({ market, type, formikProps }) => {
  const isSwedishHouse = type === InsuranceType.SWEDISH_HOUSE

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
