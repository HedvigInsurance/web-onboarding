import { BundledQuote } from 'data/graphql'
import { Address } from 'pages/OfferNew/types'

export const parseAddress = (address: Address) => {
  const { street, apartment, floor } = address

  return street
    .concat(floor ? `, ${floor}.` : '')
    .concat(apartment ? ` ${apartment}` : '')
}

export const getAddress = (quotes: BundledQuote[]) => {
  const hasAddress = (quote: BundledQuote) => {
    const interestedInFields = ['street', 'zipCode'] as const
    return interestedInFields.every((field) => quote.data[field] != null)
  }

  const quoteWithAddress = quotes.find(hasAddress)

  return quoteWithAddress
    ? parseAddress({
        street: quoteWithAddress.data.street,
        zipCode: quoteWithAddress.data.zipCode,
        apartment: quoteWithAddress.data.apartment,
        floor: quoteWithAddress.data.floor?.toString(),
      })
    : ''
}
