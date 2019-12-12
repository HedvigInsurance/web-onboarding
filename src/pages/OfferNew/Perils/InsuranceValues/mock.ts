import {
  getInsuranceAmountTextKey,
  InsuranceType,
  isHouseInsurance,
} from 'utils/insuranceDomainUtils'

const getStuffTooltipBodyTextKey = (insuranceType: InsuranceType) => {
  const map = {
    [InsuranceType.HOUSE]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY_HOUSE',
    [InsuranceType.BRF]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY',
    [InsuranceType.RENT]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY',
    [InsuranceType.STUDENT_BRF]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY_STUDENT',
    [InsuranceType.STUDENT_RENT]: 'COVERAGE_INFO_STUFF_TOOLTIP_BODY_STUDENT',
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
    value: 'Fullvärde',
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
    value: '1 500 kr',
    tooltipTitle: 'COVERAGE_INFO_DEDUCTIBLE_TOOLTIP_TITLE',
    tooltipBody: isHouseInsurance(insuranceType)
      ? 'COVERAGE_INFO_DEDUCTIBLE_TOOLTIP_BODY_HOUSE'
      : 'COVERAGE_INFO_DEDUCTIBLE_TOOLTIP_BODY',
  },
  TRAVEL_PROTECTION: {
    title: 'COVERAGE_INFO_TRAVEL_TITLE',
    value: '45 dagar',
    tooltipTitle: 'COVERAGE_INFO_TRAVEL_TOOLTIP_TITLE',
    tooltipBody: 'COVERAGE_INFO_TRAVEL_TOOLTIP_BODY',
  },
})
