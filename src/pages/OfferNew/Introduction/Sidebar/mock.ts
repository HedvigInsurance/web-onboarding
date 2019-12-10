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

export const insuranceTypeMapping: {
  [key in keyof typeof InsuranceType]: string
} = {
  BRF: 'Bostadsrätt',
  RENT: 'Hyresrätt',
  STUDENT_BRF: 'Bostadsrätt',
  STUDENT_RENT: 'Hyresrätt',
  HOUSE: 'Hus',
}
