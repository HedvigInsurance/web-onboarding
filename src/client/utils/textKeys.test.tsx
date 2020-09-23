import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { nextTickAsync } from './misc'
import { makeTextKeyResolver, TextKeyProvider, useTextKeys } from './textKeys'

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
    const Component = () => {
      const textKeys = useTextKeys()

      return <>{textKeys.YES()}</>
    }

    const wrapper = mount(
      <TextKeyProvider locale="en">
        <Component />
      </TextKeyProvider>,
    )

    await act(() => nextTickAsync())
    wrapper.update()

    expect(wrapper.text()).toBe('Yes')
  })

  it('enables debug mode', async () => {
    const Component = () => {
      const textKeys = useTextKeys()

      return <>{textKeys.YES()}</>
    }

    const wrapper = mount(
      <TextKeyProvider locale="en" locationSearch="?debug=textkeys">
        <Component />
      </TextKeyProvider>,
    )

    await act(() => nextTickAsync())
    wrapper.update()

    expect(wrapper.text()).toBe('YES')
  })
})
