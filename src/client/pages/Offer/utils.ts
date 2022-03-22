import { BundledQuote } from 'data/graphql'

export interface Address {
  street: string
  zipCode: string
  apartment?: string
  floor?: number
}

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
