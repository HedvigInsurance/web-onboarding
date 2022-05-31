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
  SwedishCarDetails,
  getSwedishCarValidationSchema,
} from './SwedishCarDetails'

import {
  NorwegianHomeContentsDetails,
  getNorwegianHomeContentsValidationSchema,
} from './NorwegianDetails'

import {
  NorwegianHouseDetails,
  getNorwegianHouseValidationSchema,
} from './NorwegianHouseDetails'

import { DanishDetails, getDanishValidationSchema } from './DanishDetails'
import {
  DanishHouseDetails,
  getDanishHouseValidationSchema,
} from './DanishHouseDetails'

export const getValidationSchema = (
  market: MarketLabel,
  type: InsuranceType,
  textKeys: TextKeyMap,
) => {
  const isSwedishHouse = type === InsuranceType.SWEDISH_HOUSE
  const isNorwegianHouse = type === InsuranceType.NORWEGIAN_HOUSE
  const isDanishHouse = type === InsuranceType.DANISH_HOUSE
  const isSwedishCar = type === InsuranceType.SWEDISH_CAR

  switch (market) {
    case 'SE':
      return isSwedishCar
        ? getSwedishCarValidationSchema(textKeys)
        : isSwedishHouse
        ? getSwedishHouseValidationSchema(textKeys)
        : getSwedishApartmentValidationSchema(textKeys)
    case 'NO':
      return isNorwegianHouse
        ? getNorwegianHouseValidationSchema(textKeys)
        : getNorwegianHomeContentsValidationSchema(textKeys)
    case 'DK':
      return isDanishHouse
        ? getDanishHouseValidationSchema(textKeys)
        : getDanishValidationSchema(textKeys)
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
  const isNorwegianHouse = type === InsuranceType.NORWEGIAN_HOUSE
  const isDanishHouse = type === InsuranceType.DANISH_HOUSE
  const isSwedishCar = type === InsuranceType.SWEDISH_CAR

  switch (market) {
    case 'SE':
      return isSwedishCar ? (
        <SwedishCarDetails formikProps={formikProps} />
      ) : isSwedishHouse ? (
        <SwedishHouseDetails formikProps={formikProps} />
      ) : (
        <SwedishApartmentDetails formikProps={formikProps} />
      )
    case 'NO':
      return isNorwegianHouse ? (
        <NorwegianHouseDetails formikProps={formikProps} />
      ) : (
        <NorwegianHomeContentsDetails formikProps={formikProps} />
      )
    case 'DK':
      return isDanishHouse ? (
        <DanishHouseDetails formikProps={formikProps} />
      ) : (
        <DanishDetails formikProps={formikProps} />
      )

    default:
      return null
  }
}
