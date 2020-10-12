import queryString from 'querystring'
import { match } from 'matchly'
import React from 'react'
import { useHistory } from 'react-router'

export enum Variation {
  IOS = 'ios',
  ANDROID = 'android',
  AVY = 'avy',
}

const getVariation = match([
  ['ios', Variation.IOS],
  ['android', Variation.ANDROID],
  ['avy', Variation.AVY],
  [match.any(), null],
])

export const useVariation = (): Variation | null => {
  const sessionStorageMaybe =
    typeof sessionStorage !== 'undefined' ? sessionStorage : null
  const {
    location: { search },
  } = useHistory()
  const { variation: rawVariation } = queryString.parse(search.substr(1))
  const variation =
    getVariation(
      typeof rawVariation === 'object'
        ? rawVariation[0]?.toLowerCase()
        : rawVariation?.toLowerCase(),
    ) ?? JSON.parse(sessionStorageMaybe?.getItem('hvg:variation') ?? 'null')

  React.useEffect(() => {
    sessionStorage.setItem('hvg:variation', JSON.stringify(variation))
  }, [variation])

  return variation
}
