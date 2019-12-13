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
