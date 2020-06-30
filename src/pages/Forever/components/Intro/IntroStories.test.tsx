import { stripTrailingS } from 'pages/Forever/components/Intro/IntroStories'

describe('stringTrailingS', () => {
  it("doesn't strip strings without trailing s", () => {
    expect(stripTrailingS('Blah')).toBe('Blah')
  })

  it('strips strings with one trailing s', () => {
    expect(stripTrailingS('Blahs')).toBe('Blah')
  })

  it("strips strings with multiple s'es", () => {
    expect(stripTrailingS('Blahss')).toBe('Blah')
  })

  it('strips capital S', () => {
    expect(stripTrailingS('BlahSs')).toBe('Blah')
  })
})
