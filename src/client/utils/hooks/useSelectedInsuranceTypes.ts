import { useParams } from 'react-router-dom'
import { useCallback, useState, useEffect } from 'react'
import { TypeOfContract } from 'data/graphql'

// TODO: we should get this from giraffe schema
export enum InsuranceType {
  SWEDISH_APARTMENT = 'SWEDISH_APARTMENT',
  SWEDISH_HOUSE = 'SWEDISH_HOUSE',
  SWEDISH_ACCIDENT = 'SWEDISH_ACCIDENT',
  SWEDISH_CAR = 'SWEDISH_CAR',
  NORWEGIAN_HOME_CONTENT = 'NORWEGIAN_HOME_CONTENT',
  NORWEGIAN_HOUSE = 'NORWEGIAN_HOUSE',
  NORWEGIAN_TRAVEL = 'NORWEGIAN_TRAVEL',
  NORWEGIAN_ACCIDENT = 'NORWEGIAN_ACCIDENT',
  DANISH_HOME_CONTENT = 'DANISH_HOME_CONTENT',
  DANISH_HOUSE = 'DANISH_HOUSE',
  DANISH_ACCIDENT = 'DANISH_ACCIDENT',
  DANISH_TRAVEL = 'DANISH_TRAVEL',
}

const INSURANCE_TYPES_EVENT = 'insuranceTypes'

type InsuranceTypesEventData = InsuranceType[] | TypeOfContract[]

const ALL_INSURANCE_TYPES = Object.values(InsuranceType)
const ALL_CONTRACT_TYPES = Object.values(TypeOfContract)
const SEARCH_PARAM_NAME = 'type'

const deserializeSearchParams = (searchParams: URLSearchParams) => {
  const matches = searchParams.getAll(SEARCH_PARAM_NAME)
  return validateInsuranceTypes(matches)
}

const serializeInsuranceTypes = (types: Array<string>) => types.join(',')
const deserializeInsuranceTypes = (raw: string) =>
  validateInsuranceTypes(raw.split(','))

export const validateInsuranceTypes = (
  rawTypes: Array<string>,
): InsuranceType[] | TypeOfContract[] =>
  rawTypes.filter(
    (type) =>
      ALL_INSURANCE_TYPES.includes((type as unknown) as InsuranceType) ||
      ALL_CONTRACT_TYPES.includes((type as unknown) as TypeOfContract),
  ) as Array<InsuranceType>

const SESSION_STORAGE_PREFIX = 'HEDVIG_'
const getStorageKey = (quoteCartId: string) =>
  `${SESSION_STORAGE_PREFIX}${quoteCartId}`

export const useSelectedInsuranceTypes = () => {
  const { id: quoteCartId } = useParams()
  const storageKey = getStorageKey(quoteCartId)

  const [insuranceTypes, setInsuranceTypes] = useState(() => {
    const raw = window.sessionStorage.getItem(storageKey)
    if (raw) {
      const storedInsuranceTypes = deserializeInsuranceTypes(raw)
      if (storedInsuranceTypes.length > 0) return storedInsuranceTypes
    }

    const searchParams = new URLSearchParams(location.search)
    const initialInsuranceTypes = deserializeSearchParams(searchParams)
    return initialInsuranceTypes
  })

  const changeSelectedInsuranceTypes = useCallback(
    (newTypes: InsuranceType[] | TypeOfContract[]) => {
      window.sessionStorage.setItem(
        storageKey,
        serializeInsuranceTypes(newTypes),
      )

      const event = new CustomEvent<InsuranceTypesEventData>(
        INSURANCE_TYPES_EVENT,
        {
          detail: newTypes,
          bubbles: true,
        },
      )
      document.dispatchEvent(event)
    },
    [storageKey],
  )

  useEffect(() => {
    const handler = (event: CustomEvent<InsuranceTypesEventData>) => {
      setInsuranceTypes(event.detail)
    }

    window.addEventListener(INSURANCE_TYPES_EVENT, handler as EventListener)
    return () =>
      window.removeEventListener(
        INSURANCE_TYPES_EVENT,
        handler as EventListener,
      )
  }, [storageKey])

  return [insuranceTypes, changeSelectedInsuranceTypes] as const
}
