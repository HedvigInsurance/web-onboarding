import { useFeature, Features } from 'utils/hooks/useFeature'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { renderHook } from 'test/utils'

jest.mock('components/utils/CurrentLocale')
const mockedUseMarket = useMarket as jest.Mock

it('return array with true value if feature is enabled', () => {
  // @ts-ignore
  window.hedvigClientConfig = { appEnvironment: 'development' }
  mockedUseMarket.mockReturnValue(Market.Se)
  const { result } = renderHook(() => useFeature([Features.TEST_FEATURE]))
  expect(result.current).toEqual([true])
})

it('return array with false value if feature is disabled in environment', () => {
  // @ts-ignore
  window.hedvigClientConfig = { appEnvironment: 'production' }
  mockedUseMarket.mockReturnValue(Market.Se)
  const { result } = renderHook(() => useFeature([Features.TEST_FEATURE]))
  expect(result.current).toEqual([false])
})

it('return array with false value if feature is disabled in market', () => {
  // @ts-ignore
  window.hedvigClientConfig = { appEnvironment: 'development' }
  mockedUseMarket.mockReturnValue(Market.Dk)
  const { result } = renderHook(() => useFeature([Features.TEST_FEATURE]))
  expect(result.current).toEqual([false])
})

it('return array with multiple values if multiple features', () => {
  // @ts-ignore
  window.hedvigClientConfig = { appEnvironment: 'development' }
  mockedUseMarket.mockReturnValue(Market.Se)
  const { result } = renderHook(() =>
    useFeature([
      Features.OFFER_PAGE_INSURANCE_TOGGLE,
      Features.OFFER_PAGE_SWITCH_SAFETY,
    ]),
  )
  expect(result.current).toEqual([true, true])
})
