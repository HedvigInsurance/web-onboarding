import { noCombo, noComboYouth } from './offerDataMock'
import { isBundle, isNorwegian, isSwedish, isYouth } from './utils'

describe('quote validation', () => {
  it('validates if quote is norwegian', () => {
    expect(isNorwegian(noComboYouth)).toBe(true)
    expect(isSwedish(noComboYouth)).toBe(false)
  })

  it('validates if quote is combo', () => {
    expect(isBundle(noComboYouth)).toBe(true)
    expect(isBundle(noCombo)).toBe(true)
  })

  it('validates if quote is youth', () => {
    expect(isYouth(noCombo)).toBe(false)
    expect(isYouth(noComboYouth)).toBe(true)
  })
})
