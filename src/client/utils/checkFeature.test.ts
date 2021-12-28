import { Feature } from 'shared/clientConfig'
import { checkFeature } from './checkFeature'

describe('checkFeature', () => {
  beforeEach(() => {
    delete window.location
  })

  it('return true if feature is enabled', () => {
    window.hedvigClientConfig = {
      // @ts-ignore
      features: {
        TEST_FEATURE: ['SE'],
      },
    }
    // @ts-ignore
    window.location = new URL('https://www.hedvig.com/se/new-member')

    const result = checkFeature(Feature.TEST_FEATURE)
    expect(result).toBe(true)
  })

  it('return false if feature is disabled in market', () => {
    window.hedvigClientConfig = {
      // @ts-ignore
      features: {
        TEST_FEATURE: ['SE'],
      },
    }
    // @ts-ignore
    window.location = new URL('https://www.hedvig.com/dk/new-member')

    const result = checkFeature(Feature.TEST_FEATURE)
    expect(result).toBe(false)
  })
})
