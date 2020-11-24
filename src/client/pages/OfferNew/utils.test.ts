import {
  noCombo,
  noComboYouth,
  danishHomeContents,
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
    expect(isDanish(danishHomeContents)).toBe(true)
    expect(isNorwegian(danishHomeContents)).toBe(false)
    expect(isSwedish(danishHomeContents)).toBe(false)
  })
})
