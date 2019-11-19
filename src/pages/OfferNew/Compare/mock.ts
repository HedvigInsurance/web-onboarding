import { CompanyProperties, InsuranceProperties } from './types'

export const insuranceProperties: InsuranceProperties = {
  name: { name: 'Namn', description: 'Namm (beskrivning)' },
  propertyProtection: {
    name: 'Egendomsskydd',
    description: 'Egendomsskydd (beskrivning)',
  },
  travelProtection: {
    name: 'Reseskydd',
    description: 'Reseskydd (beskrivning)',
  },
  assaultProtection: {
    name: 'Överfallsskydd',
    description: 'Överfallsskydd (beskrivning)',
  },
  liabilityProtection: {
    name: 'Ansvarskydd',
    description: 'Ansvarskydd (beskrivning)',
  },
  legalProtection: {
    name: 'Rättsskydd',
    description: 'Rättsskydd (beskrivning)',
  },
  drulle: { name: 'Drulle', description: 'Drulle (beskrivning)' },
  deductible: {
    name: 'Grundsjälvrisk',
    description: 'Grundsjälvrisk (beskrivning)',
  },
  trustpilotScore: {
    name: 'Trustpilot Score',
    description: 'Trustpilot Score (beskrivning)',
  },
}

export const hedvigCompany: CompanyProperties = {
  name: 'Hedvig',
  propertyProtection: true,
  travelProtection: true,
  assaultProtection: true,
  liabilityProtection: true,
  legalProtection: true,
  drulle: true,
  deductible: 1500,
  trustpilotScore: 4.5,
}

export const otherCompanies: CompanyProperties[] = [
  {
    name: 'Folksam Bas',
    propertyProtection: true,
    travelProtection: true,
    assaultProtection: true,
    liabilityProtection: true,
    legalProtection: true,
    drulle: 'Tillval',
    deductible: 1500,
    trustpilotScore: 1.7,
  },
  {
    name: 'Trygg Hansa',
    propertyProtection: true,
    travelProtection: true,
    assaultProtection: true,
    liabilityProtection: true,
    legalProtection: true,
    drulle: 'Tillval',
    deductible: 1500,
    trustpilotScore: 1.7,
  },
  {
    name: 'If Hem',
    propertyProtection: true,
    travelProtection: true,
    assaultProtection: true,
    liabilityProtection: true,
    legalProtection: true,
    drulle: 'Tillval',
    deductible: 1500,
    trustpilotScore: 1.7,
  },
  {
    name: 'Ica',
    propertyProtection: true,
    travelProtection: true,
    assaultProtection: true,
    liabilityProtection: true,
    legalProtection: true,
    drulle: 'Tillval',
    deductible: 1500,
    trustpilotScore: 1.7,
  },
  {
    name: 'Länsförsäkringar',
    propertyProtection: true,
    travelProtection: true,
    assaultProtection: true,
    liabilityProtection: true,
    legalProtection: true,
    drulle: 'Tillval',
    deductible: 1500,
    trustpilotScore: 1.7,
  },
]
