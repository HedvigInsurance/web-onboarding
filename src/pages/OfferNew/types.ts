export interface InsuranceProperty {
  name: string
  description: string
}

export interface CompanyProperties {
  name: string
  propertyProtection: boolean | string
  travelProtection: boolean | string
  assaultProtection: boolean | string
  liabilityProtection: boolean | string
  legalProtection: boolean | string
  drulle: boolean | string
  deductible: number
  trustpilotScore: number
}

export type InsuranceProperties = {
  [key in keyof CompanyProperties]: InsuranceProperty
}
