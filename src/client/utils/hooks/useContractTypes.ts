import { useState, useEffect, useCallback, useMemo } from 'react'
import { TypeOfContract } from 'data/graphql'

const STORAGE_KEY = 'HEDVIG_SELECTED_CONTRACT_TYPES'
const CONTRACT_TYPES = Object.values(TypeOfContract) as Array<string>
const QUERY_PARAMETER = 'type'

export const ContractTypes = {
  queryParameter: QUERY_PARAMETER,
  serialize: (contractTypes: Array<string>) => contractTypes.join(','),
  deserialize: (contractTypes: string) => contractTypes.split(','),
  get: () => {
    const serializedMatches = window.sessionStorage.getItem(STORAGE_KEY)
    const possibleMatches = serializedMatches
      ? ContractTypes.deserialize(serializedMatches)
      : []
    return ContractTypes.validate(possibleMatches)
  },
  save: (contractTypes: Array<TypeOfContract>) => {
    const serializedTypes = ContractTypes.serialize(contractTypes)
    window.sessionStorage.setItem(STORAGE_KEY, serializedTypes)
  },
  clear: () => window.sessionStorage.removeItem(STORAGE_KEY),
  validate: (rawTypes: Array<string>): Array<TypeOfContract> =>
    rawTypes.filter((type) => CONTRACT_TYPES.includes(type)) as Array<
      TypeOfContract
    >,
}

export const sessionStorageInitializer = () => ContractTypes.get()

export const useContractTypes = (initialTypes?: Array<TypeOfContract>) => {
  const [contractTypes, setContractTypes] = useState<Array<TypeOfContract>>(
    () => initialTypes ?? sessionStorageInitializer(),
  )

  useEffect(() => {
    const handle = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setContractTypes(
          event.newValue
            ? ContractTypes.validate(ContractTypes.deserialize(event.newValue))
            : [],
        )
      }
    }
    window.addEventListener('storage', handle)
    return () => window.removeEventListener('storage', handle)
  }, [contractTypes])

  const changeContractTypes = useCallback(
    (newContractTypes: Array<TypeOfContract>) => {
      setContractTypes(newContractTypes)
      ContractTypes.save(newContractTypes)
    },
    [],
  )

  return [contractTypes, changeContractTypes] as const
}

const queryParamInitializer = () => {
  const rawContractTypes = new URLSearchParams(window.location.search).getAll(
    QUERY_PARAMETER,
  )

  if (rawContractTypes.length === 0) {
    return null
  }

  return ContractTypes.validate(rawContractTypes)
}

export const useContractTypesFromQueryParam = () => {
  const contractTypes = useMemo(queryParamInitializer, [])

  useEffect(() => {
    if (contractTypes) {
      ContractTypes.save(contractTypes)
    }
  }, [contractTypes])

  return contractTypes
}
