import { BundledQuote } from 'data/graphql'
import { LocaleLabel, locales } from 'l10n/locales'

export interface Address {
  street: string
  zipCode: string
  apartment?: string
  floor?: number
}

const SE_CAR_REGISTRATION_NUMBER_REGEX = /[A-Za-z]{3}[0-9]{2}[A-Za-z0-9]{1}/

export const parseAddress = (address: Address) => {
  const { street, apartment, floor } = address

  return street
    .concat(floor && floor !== 0 ? `, ${floor}.` : '')
    .concat(apartment ? ` ${apartment}` : '')
}

const hasAddress = (quote: BundledQuote) => {
  const interestedInFields = ['street', 'zipCode'] as const
  return interestedInFields.every((field) => quote.data[field] != null)
}

export const getAddress = (quotes: BundledQuote[]) => {
  const quoteWithAddress = quotes.find(hasAddress)

  return quoteWithAddress
    ? parseAddress({
        street: quoteWithAddress.data.street,
        zipCode: quoteWithAddress.data.zipCode,
        apartment: quoteWithAddress.data.apartment,
        floor: quoteWithAddress.data.floor,
      })
    : ''
}

export const formatCarRegistrationNumberSE = (registrationNumber: string) => {
  if (!SE_CAR_REGISTRATION_NUMBER_REGEX.test(registrationNumber))
    return registrationNumber

  const letters = registrationNumber.match(/[A-Za-z]{3}/)?.[0] || ''

  return registrationNumber.replace(letters, `${letters} `)
}

export const formatNumber = (number: number, locale: LocaleLabel) => {
  if (typeof number !== 'number') return number

  return number.toLocaleString(locales[locale].htmlLang)
}
