import { matchPath, useLocation } from 'react-router-dom'
import { LocaleLabel, locales } from './locales'
import { localePathPattern, PARAM_PLACEHOLDER } from './localePathPattern'

type LocaleUrlParam = {
  [PARAM_PLACEHOLDER]: LocaleLabel
}

const FALLBACK_LOCALE: LocaleLabel = 'se-en'

const getLocaleFromPath = (path: string): LocaleLabel => {
  const localeMatch = matchPath<LocaleUrlParam>(path, {
    path: localePathPattern + '/*',
  })

  const localeFromPath = localeMatch?.params?.locale

  return localeFromPath ? localeFromPath : FALLBACK_LOCALE
}

export const useCurrentLocale = () => {
  const location = useLocation()
  const locale = getLocaleFromPath(location.pathname)
  const currentLocale = locales[locale]
  return currentLocale
}
