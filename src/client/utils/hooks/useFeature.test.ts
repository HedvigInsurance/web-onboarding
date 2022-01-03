import { useFeature } from 'utils/hooks/useFeature'
import { renderHook } from 'test/utils'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { Feature } from 'shared/clientConfig'

jest.mock('l10n/useCurrentLocale')
const mockedUseCurrentLocale = useCurrentLocale as jest.Mock

it('return array with true value if feature is enabled', () => {
  // @ts-ignore
  window.hedvigClientConfig = { features: { TEST_FEATURE: ['SE'] } }
  mockedUseCurrentLocale.mockReturnValue({ marketLabel: 'SE' })
  const { result } = renderHook(() => useFeature([Feature.TEST_FEATURE]))
  expect(result.current).toEqual([true])
})

it('return array with false value if feature is disabled in market', () => {
  // @ts-ignore
  window.hedvigClientConfig = { features: { TEST_FEATURE: ['SE'] } }
  mockedUseCurrentLocale.mockReturnValue({ marketLabel: 'DK' })
  const { result } = renderHook(() => useFeature([Feature.TEST_FEATURE]))
  expect(result.current).toEqual([false])
})

it('return array with multiple values if multiple features', () => {
  window.hedvigClientConfig = {
    // @ts-ignore
    features: {
      OFFER_PAGE_INSURANCE_TOGGLE: ['SE'],
      CHECKOUT_CREDIT_CHECK: ['DK'],
    },
  }
  mockedUseCurrentLocale.mockReturnValue({ marketLabel: 'SE' })
  const { result } = renderHook(() =>
    useFeature([
      Feature.OFFER_PAGE_INSURANCE_TOGGLE,
      Feature.CHECKOUT_CREDIT_CHECK,
    ]),
  )
  expect(result.current).toEqual([true, false])
})
