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
  const labelsString = permittedLocaleUrlParams.reduce(
    (accumulated, currentLabel) => {
      return accumulated.length
        ? `${accumulated}|${currentLabel}`
        : currentLabel
    },
    '',
  )

  return `/:locale(${labelsString})`
}

export const localePathPattern = getLocalePathPattern(LOCALE_URL_PARAMS)
