import {
  noCombo,
  noComboYouth,
  dkHomeContentOwn,
} from 'utils/testData/offerDataMock'
import { isBundle, isNorwegian, isSwedish, isDanish, isYouth } from './utils'

describe('quote validation', () => {
  it('validates if quote is norwegian', () => {
    expect(isNorwegian(noComboYouth)).toBe(true)
    expect(isSwedish(noComboYouth)).toBe(false)
    expect(isDanish(noComboYouth)).toBe(false)
  })

  it('validates if quote is combo', () => {
    expect(isBundle(noComboYouth)).toBe(true)
    expect(isBundle(noCombo)).toBe(true)
  })

  it('validates if quote is youth', () => {
    expect(isYouth(noCombo)).toBe(false)
    expect(isYouth(noComboYouth)).toBe(true)
  })
  it('validates if quote is danish', () => {
    expect(isDanish(dkHomeContentOwn)).toBe(true)
    expect(isNorwegian(dkHomeContentOwn)).toBe(false)
    expect(isSwedish(dkHomeContentOwn)).toBe(false)
  })
})
