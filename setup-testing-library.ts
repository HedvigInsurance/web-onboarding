import '@testing-library/jest-dom'

import { server } from 'mocks/server'

window['hedvigClientConfig'] = {
  adyenEnvironment: '',
  adyenOriginKey: '',
  contentServiceEndpoint: '',
  giraffeEndpoint: 'https://graphql.dev.hedvigit.com/graphql',
  giraffeWsEndpoint: 'wss://graphql.dev.hedvigit.com/subscriptions',
  appEnvironment: 'development',
}

// Establish API mocking before all tests
beforeAll(() => {
  server.listen({
    onUnhandledRequest: (req) => {
      // Ignore unhandled requests to /subscriptions since we don't care about them
      // on test environment
      if (req.url.href === 'https://graphql.dev.hedvigit.com/subscriptions') {
        return
      }

      console.error(
        `Found an unhandled ${req.method} request to ${req.url.href}`,
      )
    },
  })
})

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
