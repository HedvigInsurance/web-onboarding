import { InsuranceType } from 'utils/insuranceDomainUtils'

export const getInsuranceTextKey = (insuranceType: InsuranceType): string => {
  const map = {
    [InsuranceType.RENT]: 'TERMS_PDF_INSURANCE_RENT_URL',
    [InsuranceType.BRF]: 'TERMS_PDF_INSURANCE_BRF_URL',
    [InsuranceType.STUDENT_RENT]: 'TERMS_PDF_INSURANCE_STUDENT_RENT_URL',
    [InsuranceType.STUDENT_BRF]: 'TERMS_PDF_INSURANCE_STUDENT_BRF_URL',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}

export const getPrebuyPDFTextKey = (insuranceType: InsuranceType): string => {
  const map = {
    [InsuranceType.RENT]: 'TERMS_PDF_PREBUY_RENT_URL',
    [InsuranceType.BRF]: 'TERMS_PDF_PREBUY_BRF_URL',
    [InsuranceType.STUDENT_RENT]: 'TERMS_PDF_PREBUY_STUDENT_RENT_URL',
    [InsuranceType.STUDENT_BRF]: 'TERMS_PDF_PREBUY_STUDENT_BRF_URL',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}
