export interface InsuranceValue {
  title: string
  value: string
  tooltip: string
}

export interface InsuranceValues {
  [key: string]: InsuranceValue
}

export const insuranceValues: InsuranceValues = {
  HOME: {
    title: 'Ditt hem är försäkrat till',
    value: 'Fullvärde',
    tooltip: 'Information',
  },
  STUFF: {
    title: 'Dina prylar är försäkrade till',
    value: '1 000 000 kr',
    tooltip: 'Information',
  },
  DEDUCTIBLE: {
    title: 'Självrisk',
    value: '1 500 kr',
    tooltip: 'Information',
  },
  TRAVEL_PROTECTION: {
    title: 'Reseskydd',
    value: '45 dagar',
    tooltip: 'Information',
  },
}
