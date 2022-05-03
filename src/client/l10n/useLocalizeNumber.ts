import { useCallback } from 'react'
import { useCurrentLocale } from './useCurrentLocale'

/**
 * Returns a localized number string
 * @param number
 * @param lang ISO two-letter language code, for example 'sv'
 * @returns Number formatted according to browser's language settings
 */
export const localizeNumber = (number: number, lang: string): string => {
  if (typeof number !== 'number') return number

  return number.toLocaleString(lang)
}

/**
 * Returns a function that returns a localized number string
 */
export const useLocalizeNumber = () => {
  const locale = useCurrentLocale()
  const lang = locale.htmlLang

  const localize = useCallback(
    (number: number) => localizeNumber(number, lang),
    [lang],
  )

  return localize
}
