import { InsuranceType } from 'generated/graphql'

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
  [key in InsuranceType]: string
} = {
  RENT: 'Hyresrätt',
  BRF: 'Bostadsrätt',
  STUDENT_RENT: 'Hyresrätt',
  STUDENT_BRF: 'Bostadsrätt',
  HOUSE: 'Hus',
}
