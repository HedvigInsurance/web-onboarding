import { useFeature, Features } from 'utils/hooks/useFeature'
import { renderHook } from 'test/utils'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

jest.mock('l10n/useCurrentLocale')
const mockedUseCurrentLocale = useCurrentLocale as jest.Mock

it('return array with true value if feature is enabled', () => {
  // @ts-ignore
  window.hedvigClientConfig = { appEnvironment: 'development' }
  mockedUseCurrentLocale.mockReturnValue({ marketLabel: 'SE' })
  const { result } = renderHook(() => useFeature([Features.TEST_FEATURE]))
  expect(result.current).toEqual([true])
})

it('return array with false value if feature is disabled in environment', () => {
  // @ts-ignore
  window.hedvigClientConfig = { appEnvironment: 'production' }
  mockedUseCurrentLocale.mockReturnValue({ marketLabel: 'SE' })
  const { result } = renderHook(() => useFeature([Features.TEST_FEATURE]))
  expect(result.current).toEqual([false])
})

it('return array with false value if feature is disabled in market', () => {
  // @ts-ignore
  window.hedvigClientConfig = { appEnvironment: 'development' }
  mockedUseCurrentLocale.mockReturnValue({ marketLabel: 'DK' })
  const { result } = renderHook(() => useFeature([Features.TEST_FEATURE]))
  expect(result.current).toEqual([false])
})

it('return array with multiple values if multiple features', () => {
  // @ts-ignore
  window.hedvigClientConfig = { appEnvironment: 'development' }
  mockedUseCurrentLocale.mockReturnValue({ marketLabel: 'SE' })
  const { result } = renderHook(() =>
    useFeature([
      Features.OFFER_PAGE_INSURANCE_TOGGLE,
      Features.CHECKOUT_CREDIT_CHECK,
    ]),
  )
  expect(result.current).toEqual([true, false])
})
