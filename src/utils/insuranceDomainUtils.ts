export enum InsuranceType {
  RENT = 'RENT',
  BRF = 'BRF',
  STUDENT_RENT = 'STUDENT_RENT',
  STUDENT_BRF = 'STUDENT_BRF',
}

export const isApartmentOwner = (insuranceType: InsuranceType): boolean =>
  insuranceType === InsuranceType.BRF ||
  insuranceType === InsuranceType.STUDENT_BRF

export const isStudentInsurance = (insuranceType: InsuranceType): boolean =>
  insuranceType === InsuranceType.STUDENT_RENT ||
  insuranceType === InsuranceType.STUDENT_BRF

export const qualifiesForStudentInsurance = (details: {
  age: number
  squareMeters: number
  numberOfPeople: number
}): boolean => {
  const { age, squareMeters, numberOfPeople } = details
  return age < 30 && squareMeters < 50 && numberOfPeople < 3
}

export const mapToStudentVariant = (insuranceType: InsuranceType) => {
  if (insuranceType === InsuranceType.RENT) {
    return InsuranceType.STUDENT_RENT
  }
  if (insuranceType === InsuranceType.BRF) {
    return InsuranceType.STUDENT_BRF
  }

  throw new Error('Unreachable state') // I dont like this, is there a better way?
}
