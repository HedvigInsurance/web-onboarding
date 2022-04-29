import { renderHook } from '@testing-library/react-hooks'
import { useLocalizeNumber } from './useLocalizeNumber'

jest.mock('./useCurrentLocale', () => {
  return {
    useCurrentLocale: () => {
      return { htmlLang: 'en' }
    },
  }
})

describe('useLocalizeNumber', () => {
  it.each([
    [123, '123'],
    [1000, '1,000'],
  ])(
    'should return the number %p but as a localized string',
    (input, expected) => {
      // align
      const { result } = renderHook(() => useLocalizeNumber())
      const localizeNumber = result.current

      // act
      const localized = localizeNumber(input)

      // assert
      expect(localized).toEqual(expected)
    },
  )
})
