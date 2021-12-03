import { useCallback, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router'

// TODO: we should get this from giraffe schema
export enum InsuranceType {
  SWEDISH_APARTMENT = 'SWEDISH_APARTMENT',
  SWEDISH_HOUSE = 'SWEDISH_HOUSE',
  SWEDISH_ACCIDENT = 'SWEDISH_ACCIDENT',
  NORWEGIAN_HOME_CONTENT = 'NORWEGIAN_HOME_CONTENT',
  NORWEGIAN_TRAVEL = 'NORWEGIAN_TRAVEL',
  DANISH_HOME_CONTENT = 'DANISH_HOME_CONTENT',
  DANISH_ACCIDENT = 'DANISH_ACCIDENT',
  DANISH_TRAVEL = 'DANISH_TRAVEL',
}

const ALL_INSURANCE_TYPES = Object.values(InsuranceType)

export const SelectedInsuranceTypes = {
  queryParameter: 'type',
  deserialize: (searchParams: URLSearchParams) => {
    const matches = searchParams.getAll(SelectedInsuranceTypes.queryParameter)
    return SelectedInsuranceTypes.validate(matches)
  },
  validate: (rawTypes: Array<string>): Array<InsuranceType> =>
    rawTypes.filter((type) =>
      ALL_INSURANCE_TYPES.includes((type as unknown) as InsuranceType),
    ) as Array<InsuranceType>,
}

export const useSelectedInsuranceTypes = () => {
  const location = useLocation()
  const history = useHistory()

  const searchParams = useMemo(() => new URLSearchParams(location.search), [
    location.search,
  ])
  const insuranceTypes = SelectedInsuranceTypes.deserialize(searchParams)

  const changeSelectedInsuranceTypes = useCallback(
    (newTypes: Array<InsuranceType>) => {
      searchParams.delete(SelectedInsuranceTypes.queryParameter)

      for (const type of newTypes) {
        searchParams.append(SelectedInsuranceTypes.queryParameter, type)
      }

      history.replace({
        search: searchParams.toString(),
      })
    },
    [searchParams, history],
  )

  return [insuranceTypes, changeSelectedInsuranceTypes] as const
}
