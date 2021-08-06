import { useVariation } from 'utils/hooks/useVariation'
import { renderHook } from 'test/utils'

it('returns null on invalid variation', () => {
  const { result } = renderHook(() => useVariation(), {
    initialProps: { location: '/a-path?variation=blargh' },
  })
  expect(result.current).toBe(null)
})

it('returns ios on ios variation, case insensitively', () => {
  const { result } = renderHook(() => useVariation(), {
    initialProps: { location: '/a-path?variation=IOS' },
  })
  expect(result.current).toBe('ios')
})

it('stores and retrieves variations in sessionStorage', async () => {
  renderHook(() => useVariation(), {
    initialProps: { location: '/a-path?variation=IOS' },
  })

  expect(sessionStorage.getItem('hvg:variation')).toBe('"ios"')

  const { result } = renderHook(() => useVariation(), {
    initialProps: { location: '/a-path' },
  })

  expect(result.current).toBe('ios')
})
