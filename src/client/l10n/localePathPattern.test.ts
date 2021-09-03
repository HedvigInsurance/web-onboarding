import { getLocalePathPattern, LOCALE_URL_PARAMS } from './localePathPattern'

describe('getLocalePathPattern function', () => {
  it('returns string with correct options for URL parameter "locale"', () => {
    const localePathPattern = getLocalePathPattern(LOCALE_URL_PARAMS)

    expect(localePathPattern).toBe('/:locale(se|se-en|no|no-en|dk|dk-en)')
  })
})
