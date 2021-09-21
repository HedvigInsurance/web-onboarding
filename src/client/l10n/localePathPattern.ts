const LOCALE_URL_PARAMS = ['se', 'se-en', 'no', 'no-en', 'dk', 'dk-en'] as const

export type LocaleUrlParams = typeof LOCALE_URL_PARAMS

export const PARAM_PLACEHOLDER = 'locale'

export const getLocalePathPattern = (
  permittedLocaleUrlParams: LocaleUrlParams,
) => {
  return `/:${PARAM_PLACEHOLDER}(${permittedLocaleUrlParams.join('|')})`
}

export const localePathPattern = getLocalePathPattern(LOCALE_URL_PARAMS)
