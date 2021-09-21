export const LOCALE_URL_PARAMS = [
  'se',
  'se-en',
  'no',
  'no-en',
  'dk',
  'dk-en',
] as const

export type LocaleUrlParams = typeof LOCALE_URL_PARAMS

export const getLocalePathPattern = (
  permittedLocaleUrlParams: LocaleUrlParams,
) => {
  return `/:locale(${permittedLocaleUrlParams.join('|')})`
}

export const localePathPattern = getLocalePathPattern(LOCALE_URL_PARAMS)
