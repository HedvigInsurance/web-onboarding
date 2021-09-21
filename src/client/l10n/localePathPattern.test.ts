import {
  getLocalePathPattern,
  LocaleUrlParams,
  PARAM_PLACEHOLDER,
} from './localePathPattern'

const MOCKED_URL_PARAMS = ['se', 'se-en', 'no']

describe('getLocalePathPattern function', () => {
  it('returns string with correct options for URL parameter "locale"', () => {
    const localePathPattern = getLocalePathPattern(
      (MOCKED_URL_PARAMS as unknown) as LocaleUrlParams,
    )

    expect(localePathPattern.includes(PARAM_PLACEHOLDER)).toBe(true)
    expect(localePathPattern).toBe(`/:${PARAM_PLACEHOLDER}(se|se-en|no)`)
  })
})
