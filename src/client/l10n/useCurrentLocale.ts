import { matchPath, useLocation } from 'react-router-dom'
import { LocaleLabel, locales } from './locales'
import { localePathPattern, PARAM_PLACEHOLDER } from './localePathPattern'

type LocaleUrlParam = {
  [PARAM_PLACEHOLDER]: LocaleLabel
}

export const getLocaleParamFromPath = (path: string): LocaleLabel => {
  const localeMatch = matchPath<LocaleUrlParam>(path, {
    path: localePathPattern + '/*',
  })

  if (!localeMatch) {
    throw new Error(`No locale match found in path "${path}"`)
  }

  const localeFromPath = localeMatch?.params[PARAM_PLACEHOLDER]

  return localeFromPath
}

export const useCurrentLocale = () => {
  const location = useLocation()
  const localeUrlParam = getLocaleParamFromPath(location.pathname.toLowerCase())
  const currentLocale = locales[localeUrlParam]
  return currentLocale
}
