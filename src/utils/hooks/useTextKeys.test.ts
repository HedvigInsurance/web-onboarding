import { makeTextKeyResolver } from './useTextKeys'

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
})
