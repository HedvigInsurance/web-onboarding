import { CompleteQuoteDetails } from 'generated/graphql'

export enum InsuranceType {
  Rent = 'RENT',
  Brf = 'BRF',
  StudentRent = 'STUDENT_RENT',
  StudentBrf = 'STUDENT_BRF',
  House = 'HOUSE',
}

export const getInsuranceTypeFromDetails = (
  details: CompleteQuoteDetails,
): InsuranceType => {
  if (details.__typename === 'CompleteApartmentQuoteDetails') {
    return (details.type as string) as InsuranceType
  }

  return InsuranceType.House
}

export const isApartmentOwner = (insuranceType: InsuranceType): boolean =>
  insuranceType === InsuranceType.Brf ||
  insuranceType === InsuranceType.StudentBrf

export const isStudentInsurance = (insuranceType: InsuranceType): boolean =>
  insuranceType === InsuranceType.StudentRent ||
  insuranceType === InsuranceType.StudentBrf

export const isHouseInsurance = (insuranceType: InsuranceType): boolean =>
  insuranceType === InsuranceType.House

export const qualifiesForStudentInsurance = (details: {
  age: number
  squareMeters: number
  numberOfPeople: number
}): boolean => {
  const { age, squareMeters, numberOfPeople } = details
  return age <= 30 && squareMeters <= 50 && numberOfPeople <= 2
}

export const mapToStudentVariant = (insuranceType: InsuranceType) => {
  if (insuranceType === InsuranceType.Rent) {
    return InsuranceType.StudentRent
  }
  if (insuranceType === InsuranceType.Brf) {
    return InsuranceType.StudentBrf
  }

  throw new Error(
    `Unreachable state when mapping student variant, expected either "RENT" or "BRF" but got "${insuranceType}"`,
  )
}

export const getPrebuyPDFTextKey = (insuranceType: InsuranceType): string => {
  const map = {
    [InsuranceType.Rent]: 'TERMS_PDF_PREBUY_RENT_URL',
    [InsuranceType.Brf]: 'TERMS_PDF_PREBUY_BRF_URL',
    [InsuranceType.StudentRent]: 'TERMS_PDF_PREBUY_STUDENT_RENT_URL',
    [InsuranceType.StudentBrf]: 'TERMS_PDF_PREBUY_STUDENT_BRF_URL',
    [InsuranceType.House]: 'TERMS_PDF_PREBUY_HOUSE_URL',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}

export const getInsurancePDFTextKey = (
  insuranceType: InsuranceType,
): string => {
  const map = {
    [InsuranceType.Rent]: 'TERMS_PDF_INSURANCE_RENT_URL',
    [InsuranceType.Brf]: 'TERMS_PDF_INSURANCE_BRF_URL',
    [InsuranceType.StudentRent]: 'TERMS_PDF_INSURANCE_STUDENT_RENT_URL',
    [InsuranceType.StudentBrf]: 'TERMS_PDF_INSURANCE_STUDENT_BRF_URL',
    [InsuranceType.House]: 'TERMS_PDF_INSURANCE_HOUSE_URL',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}

export const getInsuranceAmountTextKey = (
  insuranceType: InsuranceType,
): string => {
  const map = {
    [InsuranceType.Rent]: 'OFFER_INSURED_AMOUNT_COL_TWO_AMOUNT',
    [InsuranceType.Brf]: 'OFFER_INSURED_AMOUNT_COL_TWO_AMOUNT',
    [InsuranceType.StudentBrf]: 'OFFER_INSURED_AMOUNT_COL_TWO_AMOUNT_STUDENT',
    [InsuranceType.StudentRent]: 'OFFER_INSURED_AMOUNT_COL_TWO_AMOUNT_STUDENT',
    [InsuranceType.House]: 'OFFER_INSURED_AMOUNT_COL_TWO_AMOUNT_HOUSE',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }

  return map[insuranceType]
}

export const getAccidentalCoverageLimitTextKey = (
  insuranceType: InsuranceType,
) => {
  const map = {
    [InsuranceType.Rent]: 'OFFER_INSURED_AMOUNT_COL_THREE_AMOUNT',
    [InsuranceType.Brf]: 'OFFER_INSURED_AMOUNT_COL_THREE_AMOUNT',
    [InsuranceType.StudentBrf]: 'OFFER_INSURED_AMOUNT_COL_THREE_AMOUNT_STUDENT',
    [InsuranceType.StudentRent]:
      'OFFER_INSURED_AMOUNT_COL_THREE_AMOUNT_STUDENT',
    [InsuranceType.House]: 'OFFER_INSURED_AMOUNT_COL_THREE_AMOUNT',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }

  return map[insuranceType]
}
