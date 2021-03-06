export interface InsuranceProperty {
  name: string
  tooltip?: {
    title: string
    body: string
  }
}

export interface CompanyProperties {
  name: string
  id: string
  propertyProtection: boolean | string
  travelProtection: boolean | string
  assaultProtection: boolean | string
  liabilityProtection: boolean | string
  legalProtection: boolean | string
  drulle: boolean | string
  trustpilotScore: number
}

export type InsuranceProperties = {
  [key in keyof Omit<CompanyProperties, 'name' | 'id'>]: InsuranceProperty
}
