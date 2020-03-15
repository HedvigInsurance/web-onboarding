import * as React from 'react'
import { matchPath, useLocation } from 'react-router'
import { LOCALE_PATH_PATTERN } from '../../routes'

export const getLocaleIsoCode = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'en_SE'
    case 'no':
      return 'nb_NO'
    case 'no/en':
      return 'en_NO'
    case '':
    default:
      return 'sv_SE'
  }
}
const getLocaleFromPath = (path: string) => {
  const match = matchPath<WithLocale>(path, {
    path: LOCALE_PATH_PATTERN + '/*',
  })
  return match?.params?.locale?.toLowerCase() || ''
}

export interface WithLocale {
  locale: string
}
type RenderProp = (props: { currentLocale: string }) => React.ReactNode

export const CurrentLocale: React.ComponentType<{
  children: RenderProp
}> = ({ children }) => {
  const location = useLocation()
  return (
    <>{children({ currentLocale: getLocaleFromPath(location.pathname) })}</>
  )
}

export const useCurrentLocale = () => {
  const location = useLocation()
  return getLocaleFromPath(location.pathname)
}
