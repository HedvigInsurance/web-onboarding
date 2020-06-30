import { stripTrailingCharacter } from './misc'

describe('stripTrailingCharacter', () => {
  it("doesn't strip strings without trailing s", () => {
    expect(stripTrailingCharacter('s', 'Blah')).toBe('Blah')
  })

  it('strips strings with one trailing s', () => {
    expect(stripTrailingCharacter('s', 'Blahs')).toBe('Blah')
  })

  it("strips strings with multiple s'es", () => {
    expect(stripTrailingCharacter('s', 'Blahss')).toBe('Blah')
  })

  it('strips capital S', () => {
    expect(stripTrailingCharacter('s', 'BlahSs')).toBe('Blah')
  })
})
