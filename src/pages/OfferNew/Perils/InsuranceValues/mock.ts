import {
  getInsuranceAmountTextKey,
  InsuranceType,
  isHouseInsurance,
} from 'utils/insuranceDomainUtils'

const getStuffTooltipBodyTextKey = (insuranceType: InsuranceType) => {
  const map = {
    [InsuranceType.House]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY_HOUSE',
    [InsuranceType.Brf]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY',
    [InsuranceType.Rent]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY',
    [InsuranceType.StudentBrf]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY_STUDENT',
    [InsuranceType.StudentRent]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY_STUDENT',
  }
  if (!map[insuranceType]) {
    throw Error(`unsupported insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}

export interface InsuranceValue {
  title: string
  value: string
  tooltipBody: string
  tooltipTitle: string
}

export type InsuranceValues = Record<string, InsuranceValue>

export const insuranceValues = (
  insuranceType: InsuranceType,
): InsuranceValues => ({
  HOME: {
    title: 'COVERAGE_INFO_HOME_TITEL',
    value: 'COVERAGE_INFO_HOME_VALUE',
    tooltipBody: isHouseInsurance(insuranceType)
      ? 'COVERAGE_INFO_HOME_TOOLTIP_BODY_HOUSE'
      : 'COVERAGE_INFO_HOME_TOOLTIP_BODY',
    tooltipTitle: 'COVERAGE_INFO_HOME_TOOLTIP_TITLE',
  },
  STUFF: {
    title: 'COVERAGE_INFO_STUFF_TITEL',
    value: getInsuranceAmountTextKey(insuranceType),
    tooltipTitle: 'COVERAGE_INFO_STUFF_TOOLTIP_TITLE',
    tooltipBody: getStuffTooltipBodyTextKey(insuranceType),
  },
  DEDUCTIBLE: {
    title: 'COVERAGE_INFO_DEDUCTIBLE_TITLE',
    value: 'COVERAGE_INFO_DEDUCTIBLE_VALUE',
    tooltipTitle: 'COVERAGE_INFO_DEDUCTIBLE_TOOLTIP_TITLE',
    tooltipBody: isHouseInsurance(insuranceType)
      ? 'COVERAGE_INFO_DEDUCTIBLE_TOOLTIP_BODY_HOUSE'
      : 'COVERAGE_INFO_DEDUCTIBLE_TOOLTIP_BODY',
  },
  TRAVEL_PROTECTION: {
    title: 'COVERAGE_INFO_TRAVEL_TITLE',
    value: 'COVERAGE_INFO_TRAVEL_VALUE',
    tooltipTitle: 'COVERAGE_INFO_TRAVEL_TOOLTIP_TITLE',
    tooltipBody: 'COVERAGE_INFO_TRAVEL_TOOLTIP_BODY',
  },
})
