export enum InsuranceType {
  Rent = 'RENT',
  Brf = 'BRF',
  StudentRent = 'STUDENT_RENT',
  StudentBrf = 'STUDENT_BRF',
  House = 'HOUSE',
}

export enum TypeOfContract {
  SeHouse = 'SE_HOUSE',
  SeApartmentBrf = 'SE_APARTMENT_BRF',
  SeApartmentRent = 'SE_APARTMENT_RENT',
  SeApartmentStudentBrf = 'SE_APARTMENT_STUDENT_BRF',
  SeApartmentStudentRent = 'SE_APARTMENT_STUDENT_RENT',
  NoHomeContentOwn = 'NO_HOME_CONTENT_OWN',
  NoHomeContentRent = 'NO_HOME_CONTENT_RENT',
  NoHomeContentYouthOwn = 'NO_HOME_CONTENT_YOUTH_OWN',
  NoHomeContentYouthRent = 'NO_HOME_CONTENT_YOUTH_RENT',
  NoTravel = 'NO_TRAVEL',
  NoTravelYouth = 'NO_TRAVEL_YOUTH',
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

// TODO: Remove all usages of this one when deprecated
export const getInsuranceType = (
  contractType: TypeOfContract,
): InsuranceType => {
  const map = {
    [TypeOfContract.SeApartmentRent]: InsuranceType.Rent,
    [TypeOfContract.SeApartmentBrf]: InsuranceType.Brf,
    [TypeOfContract.SeApartmentStudentRent]: InsuranceType.StudentRent,
    [TypeOfContract.SeApartmentStudentBrf]: InsuranceType.StudentBrf,
    [TypeOfContract.SeHouse]: InsuranceType.House,
    [TypeOfContract.NoHomeContentRent]: InsuranceType.Rent,
    [TypeOfContract.NoHomeContentOwn]: InsuranceType.Rent,
    [TypeOfContract.NoHomeContentYouthRent]: InsuranceType.Rent,
    [TypeOfContract.NoHomeContentYouthOwn]: InsuranceType.Rent,
    [TypeOfContract.NoTravel]: InsuranceType.Rent,
    [TypeOfContract.NoTravelYouth]: InsuranceType.Rent,
  }

  if (!map[contractType]) {
    throw new Error(
      `Get Insurance Type: Invalid insurance type ${contractType}`,
    )
  }
  return map[contractType]
}

export const getPrebuyPDFTextKey = (contractType: TypeOfContract): string => {
  const map = {
    [TypeOfContract.SeApartmentRent]: 'TERMS_PDF_PREBUY_RENT_URL',
    [TypeOfContract.SeApartmentBrf]: 'TERMS_PDF_PREBUY_BRF_URL',
    [TypeOfContract.SeApartmentStudentRent]:
      'TERMS_PDF_PREBUY_STUDENT_RENT_URL',
    [TypeOfContract.SeApartmentStudentBrf]: 'TERMS_PDF_PREBUY_STUDENT_BRF_URL',
    [TypeOfContract.SeHouse]: 'TERMS_PDF_PREBUY_HOUSE_URL',
    [TypeOfContract.NoHomeContentRent]: 'TERMS_PDF_PREBUY_NO_CONTENTS_RENT_URL',
    [TypeOfContract.NoHomeContentOwn]: 'TERMS_PDF_PREBUY_NO_CONTENTS_OWN_URL',
    [TypeOfContract.NoHomeContentYouthRent]:
      'TERMS_PDF_PREBUY_NO_CONTENTS_YOUTH_RENT_URL',
    [TypeOfContract.NoHomeContentYouthOwn]:
      'TERMS_PDF_PREBUY_NO_CONTENTS_YOUTH_OWN_URL',
    [TypeOfContract.NoTravel]: 'TERMS_PDF_PREBUY_NO_TRAVEL_URL',
    [TypeOfContract.NoTravelYouth]: 'TERMS_PDF_PREBUY_NO_TRAVEL_YOUTH_URL',
  }

  if (!map[contractType]) {
    throw new Error(
      `Prebuy PDF Text Key: Invalid insurance type ${contractType}`,
    )
  }
  return map[contractType]
}

export const getInsurancePDFTextKey = (
  contractType: TypeOfContract,
): string => {
  const map = {
    [TypeOfContract.SeApartmentRent]: 'TERMS_PDF_INSURANCE_RENT_URL',
    [TypeOfContract.SeApartmentBrf]: 'TERMS_PDF_INSURANCE_BRF_URL',
    [TypeOfContract.SeApartmentStudentRent]:
      'TERMS_PDF_INSURANCE_STUDENT_RENT_URL',
    [TypeOfContract.SeApartmentStudentBrf]:
      'TERMS_PDF_INSURANCE_STUDENT_BRF_URL',
    [TypeOfContract.SeHouse]: 'TERMS_PDF_INSURANCE_HOUSE_URL',
    [TypeOfContract.NoHomeContentRent]:
      'TERMS_PDF_INSURANCE_NO_CONTENTS_RENT_URL',
    [TypeOfContract.NoHomeContentOwn]:
      'TERMS_PDF_INSURANCE_NO_CONTENTS_OWN_URL',
    [TypeOfContract.NoHomeContentYouthRent]:
      'TERMS_PDF_INSURANCE_NO_CONTENTS_YOUTH_RENT_URL',
    [TypeOfContract.NoHomeContentYouthOwn]:
      'TERMS_PDF_INSURANCE_NO_CONTENTS_YOUTH_OWN_URL',
    [TypeOfContract.NoTravel]: 'TERMS_PDF_INSURANCE_NO_TRAVEL_URL',
    [TypeOfContract.NoTravelYouth]: 'TERMS_PDF_INSURANCE_NO_TRAVEL_YOUTH_URL',
  }

  if (!map[contractType]) {
    throw new Error(
      `Insurance PDF Text Key: Invalid insurance type ${contractType}`,
    )
  }
  return map[contractType]
}

export const getEUPrebuyPDFTextKey = (contractType: TypeOfContract): string => {
  const map = {
    [TypeOfContract.SeApartmentRent]: 'TERMS_PDF_PREBUY_EU_RENT_URL',
    [TypeOfContract.SeApartmentBrf]: 'TERMS_PDF_PREBUY_EU_BRF_URL',
    [TypeOfContract.SeApartmentStudentRent]:
      'TERMS_PDF_PREBUY_EU_STUDENT_RENT_URL',
    [TypeOfContract.SeApartmentStudentBrf]:
      'TERMS_PDF_PREBUY_EU_STUDENT_BRF_URL',
    [TypeOfContract.SeHouse]: 'TERMS_PDF_PREBUY_EU_HOUSE_URL',
    [TypeOfContract.NoHomeContentRent]:
      'TERMS_PDF_PREBUY_EU_NO_CONTENTS_RENT_URL',
    [TypeOfContract.NoHomeContentOwn]:
      'TERMS_PDF_PREBUY_EU_NO_CONTENTS_OWN_URL',
    [TypeOfContract.NoHomeContentYouthRent]:
      'TERMS_PDF_PREBUY_EU_NO_CONTENTS_YOUTH_RENT_URL',
    [TypeOfContract.NoHomeContentYouthOwn]:
      'TERMS_PDF_PREBUY_EU_NO_CONTENTS_YOUTH_OWN_URL',
    [TypeOfContract.NoTravel]: 'TERMS_PDF_PREBUY_EU_NO_TRAVEL_URL',
    [TypeOfContract.NoTravelYouth]: 'TERMS_PDF_PREBUY_EU_NO_TRAVEL_YOUTH_URL',
  }

  if (!map[contractType]) {
    throw new Error(
      `EU Prebuy PDF Text Key: Invalid insurance type ${contractType}`,
    )
  }
  return map[contractType]
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
    throw new Error(
      `Insurance Amount Text Key: Invalid insurance type ${insuranceType}`,
    )
  }

  return map[insuranceType]
}
