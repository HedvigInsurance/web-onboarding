import { Quote, ApartmentType } from 'generated/graphql'
import { InsuranceType } from 'utils/insuranceDomainUtils'

export interface InsuranceCompany {
  name: string
  switchable: boolean
}

export const otherInsuranceCompanies: InsuranceCompany[] = [
  { name: 'Folksam', switchable: true },
  { name: 'Trygg Hansa', switchable: true },
  { name: 'If Hem', switchable: true },
  { name: 'Ica', switchable: true },
  { name: 'Länsförsäkringar', switchable: false },
  { name: 'Moderna försäkringar', switchable: true },
]

export const getInsuranceType = (quote: Quote): string => {
  if (quote.details === null || quote.details === undefined) {
    return ''
  }

  if (
    quote.details.__typename === 'CompleteHouseQuoteDetails' ||
    quote.details.__typename === 'IncompleteHouseQuoteDetails'
  ) {
    return 'Hus'
  }

  if (
    (quote.details.__typename === 'CompleteApartmentQuoteDetails' ||
      quote.details.__typename === 'IncompleteApartmentQuoteDetails') &&
    !!quote.details.type
  ) {
    return apartmentTypeMapping[quote.details.type]
  }

  return ''
}

export const apartmentTypeMapping: {
  [key in ApartmentType]: string
} = {
  STUDENT_RENT: 'Hyresrätt',
  RENT: 'Hyresrätt',
  STUDENT_BRF: 'Bostadsrätt',
  BRF: 'Bostadsrätt',
}
