import { getLocaleParamFromPath } from './useCurrentLocale'
import { locales } from './locales'

export const getMarket = () => {
  const localeUrlParam = getLocaleParamFromPath(
    window.location.pathname.toLowerCase(),
  )
  const currentLocale = locales[localeUrlParam]
  return currentLocale.marketLabel
}
