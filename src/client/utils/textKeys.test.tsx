import React from 'react'
import { renderHook } from '../test/utils'
import { makeTextKeyResolver, useTextKeys, TextKeyProvider } from './textKeys'

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
      wrapper: (props) => <TextKeyProvider locale="en" {...props} />,
    })
    await waitForNextUpdate()
    expect(result.current.YES()).toBe('Yes')
  })

  it('enables debug mode', async () => {
    const { result, waitForNextUpdate } = renderHook(useTextKeys, {
      wrapper: (props) => (
        <TextKeyProvider
          locale="en"
          locationSearch="?debug=textkeys"
          {...props}
        />
      ),
    })

    await waitForNextUpdate()
    expect(result.current.YES()).toBe('YES')
  })
})
