import React from 'react'
import { FormikProps } from 'formik'
import { MarketLabel } from 'l10n/locales'
import { InsuranceType } from 'utils/hooks/useSelectedInsuranceTypes'
import { TextKeyMap } from 'utils/textKeys'
import { QuoteInput } from '../types'
import {
  SwedishApartmentDetails,
  getSwedishApartmentValidationSchema,
} from './SwedishApartmentDetails'

import {
  SwedishHouseDetails,
  getSwedishHouseValidationSchema,
} from './SwedishHouseDetails'

import {
  NorwegianDetails,
  getNorwegianValidationSchema,
} from './NorwegianDetails'

import { DanishDetails, getDanishValidationSchema } from './DanishDetails'

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
        : getSwedishApartmentValidationSchema(textKeys)
    case 'NO':
      return getNorwegianValidationSchema(textKeys)
    case 'DK':
      return getDanishValidationSchema(textKeys)
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
