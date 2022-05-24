import { BundledQuote, SwedishCarDetails } from 'data/graphql'

export interface Address {
  street: string
  zipCode: string
  apartment?: string
  floor?: number
}

export const SE_CAR_REGISTRATION_NUMBER_REGEX = /^[A-Za-z]{3}[0-9]{2}[A-Za-z0-9]{1}$/

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

const formatCarInfo = (quote: BundledQuote) => {
  return (
    [
      (quote.quoteDetails as SwedishCarDetails)?.info?.makeAndModel,
      (quote.quoteDetails as SwedishCarDetails)?.info?.model,
    ]
      .filter((x) => x)
      .join(' ')
      // split up every word so that we can remove duplicates between makeAndModel and model
      .split(' ')
      .filter((word, index, allWords) => index === allWords.indexOf(word))
      .join(' ')
      .trim()
  )
}

export const getCarMakeAndOrModel = (quotes: BundledQuote[]) => {
  const quoteWithCarInfo = quotes.find(
    (quote) =>
      (quote.quoteDetails as SwedishCarDetails)?.info?.makeAndModel ||
      (quote.quoteDetails as SwedishCarDetails)?.info?.model,
  )

  return quoteWithCarInfo ? formatCarInfo(quoteWithCarInfo) : ''
}

export const formatCarRegistrationNumberSE = (registrationNumber: string) => {
  if (!SE_CAR_REGISTRATION_NUMBER_REGEX.test(registrationNumber))
    return registrationNumber

  const letters = registrationNumber.match(/[A-Za-z]{3}/)?.[0] || ''

  return registrationNumber.replace(letters, `${letters} `).toUpperCase()
}
