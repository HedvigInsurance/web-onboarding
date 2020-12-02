import { getSuccessPath } from './useRedeemCode'

const foreverCode = 'hedvig4ever'
const correctPath = '/se/forever/hedvig4ever'

describe('getSuccessPath', () => {
  it('returns path when pathname includes code', () => {
    const path = correctPath
    const successPath = getSuccessPath(path, foreverCode)
    expect(successPath).toBe(path)
  })
  it('returns path when path includes code, with trailing slash removed', () => {
    const path = '/se/forever/hedvig4ever/'
    const successPath = getSuccessPath(path, foreverCode)
    expect(successPath).toBe(correctPath)
  })
  it('returns path concatinated with forever code (separated by one slash) when path does not include code', () => {
    const path = '/se/forever/'
    const successPath = getSuccessPath(path, foreverCode)
    expect(successPath).toBe(correctPath)
  })
  it('returns path with everything that comes after "/forever/" replaced with forever code', () => {
    const path = '/se/forever/some-other-stuff/more-stuff'
    const successPath = getSuccessPath(path, foreverCode)
    expect(successPath).toBe(correctPath)
  })
  it('throws error when path does not include "forever"', () => {
    const path = '/se'
    expect(() => getSuccessPath(path, foreverCode)).toThrow()
  })
})
