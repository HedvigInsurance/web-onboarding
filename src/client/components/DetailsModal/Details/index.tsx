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
} from './NorwegianHomeDetails'
import {
  NorwegianHouseDetails,
  getNorwegianHouseValidationSchema,
} from './NorwegianHouseDetails'
import {
  NorwegianDetails,
  getNorwegianValidationSchema,
} from './NorwegianDetails'

import {
  DanishHomeContentsDetails,
  getDanishHomeContentsValidationSchema,
} from './DanishHomeDetails'
import {
  DanishHouseDetails,
  getDanishHouseValidationSchema,
} from './DanishHouseDetails'
import { DanishDetails, getDanishValidationSchema } from './DanishDetails'

export const getValidationSchema = (
  market: MarketLabel,
  type: InsuranceType,
  textKeys: TextKeyMap,
) => {
  const isSwedishHouse = type === InsuranceType.SWEDISH_HOUSE
  const isSwedishCar = type === InsuranceType.SWEDISH_CAR
  const isDanishHome = type === InsuranceType.DANISH_HOME_CONTENT
  const isDanishHouse = type === InsuranceType.DANISH_HOUSE
  const isNorwegianHome = type === InsuranceType.NORWEGIAN_HOME_CONTENT
  const isNorwegianHouse = type === InsuranceType.NORWEGIAN_HOUSE

  switch (market) {
    case 'SE':
      return isSwedishCar
        ? getSwedishCarValidationSchema(textKeys)
        : isSwedishHouse
        ? getSwedishHouseValidationSchema(textKeys)
        : getSwedishApartmentValidationSchema(textKeys)
    case 'NO':
      if (isNorwegianHouse) {
        return getNorwegianHouseValidationSchema(textKeys)
      } else if (isNorwegianHome) {
        return getNorwegianHomeContentsValidationSchema(textKeys)
      }
      return getNorwegianValidationSchema(textKeys)
    case 'DK':
      if (isDanishHouse) {
        return getDanishHouseValidationSchema(textKeys)
      } else if (isDanishHome) {
        return getDanishHomeContentsValidationSchema(textKeys)
      }
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
  const isSwedishCar = type === InsuranceType.SWEDISH_CAR
  const isDanishHome = type === InsuranceType.DANISH_HOME_CONTENT
  const isDanishHouse = type === InsuranceType.DANISH_HOUSE
  const isNorwegianHome = type === InsuranceType.NORWEGIAN_HOME_CONTENT
  const isNorwegianHouse = type === InsuranceType.NORWEGIAN_HOUSE

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
      if (isNorwegianHouse) {
        return <NorwegianHouseDetails formikProps={formikProps} />
      } else if (isNorwegianHome) {
        return <NorwegianHomeContentsDetails formikProps={formikProps} />
      }
      return <NorwegianDetails formikProps={formikProps} />
    case 'DK':
      if (isDanishHouse) {
        return <DanishHouseDetails formikProps={formikProps} />
      } else if (isDanishHome) {
        return <DanishHomeContentsDetails formikProps={formikProps} />
      }
      return <DanishDetails formikProps={formikProps} />

    default:
      return null
  }
}
