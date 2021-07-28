import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import {
  makeTextKeyResolver,
  useTextKeys,
  TextKeyProvider,
  Locale,
} from './textKeys'
interface AllProvidersProps {
  locale?: Locale
  locationSearch?: string
}

const AllProviders: React.FC<AllProvidersProps> = ({
  locale = 'en',
  locationSearch,
  children,
}) => (
  <TextKeyProvider locale={locale} locationSearch={locationSearch}>
    {children}
  </TextKeyProvider>
)

describe('useTextKeys', () => {
  describe('resolver', () => {
    it('should work', () => {
      const mockTextKeys = {
        SOME_KEY: 'foo',
        SOME_KEY_WITH_REPLACEMENTS: '{REPLACEMENT} baz',
      }

      const resolver = makeTextKeyResolver(mockTextKeys)

      expect(resolver.SOME_KEY()).toEqual('foo')
      expect(
        resolver.SOME_KEY_WITH_REPLACEMENTS({
          REPLACEMENT: 'bar',
        }),
      ).toEqual(['bar', ' baz'])
      expect(resolver.NON_EXISTING_KEY()).toEqual('NON_EXISTING_KEY')
      expect(
        resolver.SOME_KEY_WITH_REPLACEMENTS({
          /* noop */
        }),
      ).toEqual(['{REPLACEMENT}', ' baz'])
    })
  })
})

describe('TextKeyProvider', () => {
  it('lazy loads text keys and shows correct text', async () => {
    const { result, waitForNextUpdate } = renderHook(useTextKeys, {
      wrapper: AllProviders,
      initialProps: { locale: 'en' },
    })
    await waitForNextUpdate()
    expect(result.current.YES()).toBe('Yes')
  })

  it('enables debug mode', async () => {
    const { result, waitForNextUpdate } = renderHook(useTextKeys, {
      wrapper: AllProviders,
      initialProps: { locale: 'en', locationSearch: '?debug=textkeys' },
    })
    await waitForNextUpdate()
    expect(result.current.YES()).toBe('YES')
  })
})
