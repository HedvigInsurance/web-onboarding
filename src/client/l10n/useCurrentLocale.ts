import { matchPath, useLocation } from 'react-router-dom'
import { LocaleLabel, locales } from './locales'
import { localePathPattern, PARAM_PLACEHOLDER } from './localePathPattern'

type LocaleUrlParam = {
  [PARAM_PLACEHOLDER]: LocaleLabel
}

const FALLBACK_LOCALE: LocaleLabel = 'se-en'

export const getLocaleParamFromPath = (path: string): LocaleLabel => {
  const localeMatch = matchPath<LocaleUrlParam>(path, {
    path: localePathPattern + '/*',
  })

  const localeFromPath = localeMatch?.params[PARAM_PLACEHOLDER]

  return localeFromPath ? localeFromPath : FALLBACK_LOCALE
}

export const useCurrentLocale = () => {
  const location = useLocation()
  const localeUrlParam = getLocaleParamFromPath(location.pathname.toLowerCase())
  const currentLocale = locales[localeUrlParam]
  return currentLocale
}
