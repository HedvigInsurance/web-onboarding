import { isFeatureEnabled, Feature } from './feature'

const prevLocation = window.location

beforeEach(() => {
  delete window.location
})

afterEach(() => {
  window.location = prevLocation
})

it('return true if feature is enabled', () => {
  // @ts-ignore
  window.location = new URL('https://www.example.com/se/new-member')
  // @ts-ignore
  window.hedvigClientConfig = {
    appEnvironment: 'development',
  }

  const isEnabled = isFeatureEnabled(Feature.TEST_FEATURE)
  expect(isEnabled).toBe(true)
})

it('return false if feature is disabled in environment', () => {
  // @ts-ignore
  window.location = new URL('https://www.example.com/se/new-member')
  // @ts-ignore
  window.hedvigClientConfig = {
    appEnvironment: 'production',
  }

  const isEnabled = isFeatureEnabled(Feature.TEST_FEATURE)
  expect(isEnabled).toBe(false)
})

it('return false if feature is disabled in market', () => {
  // @ts-ignore
  window.location = new URL('https://www.example.com/dk/new-member')
  // @ts-ignore
  window.hedvigClientConfig = {
    appEnvironment: 'development',
  }

  const isEnabled = isFeatureEnabled(Feature.TEST_FEATURE)
  expect(isEnabled).toBe(false)
})
