import {
  DanishHomeContentsDetails,
  NorwegianHomeContentsDetails,
} from 'src/client/data/graphql'
import {
  seApartementBrf,
  noCombo,
  noComboYouth,
  noTravel,
  dkHomeContentOwn,
  dkHomeContentAccidentTravel,
} from 'utils/testData/offerDataMock'
import {
  isBundle,
  isNorwegian,
  isSwedish,
  isDanish,
  isYouth,
  getMainQuote,
} from './utils'

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

describe('getMainQuote function', () => {
  it('returns the one quote if there is just one quote in the quote array', () => {
    const swedishBrfQuote = seApartementBrf.quotes[0]
    const mainSwedishBrfQuote = getMainQuote(seApartementBrf)
    expect(mainSwedishBrfQuote.id).toBe(swedishBrfQuote.id)

    const norwegianTravelQuote = noTravel.quotes[0]
    const mainTravelQuote = getMainQuote(noTravel)
    expect(mainTravelQuote.id).toBe(norwegianTravelQuote.id)

    const danishHomeContentsQuote = dkHomeContentOwn.quotes[0]
    const mainHomeContentsQuote = getMainQuote(dkHomeContentOwn)
    expect(mainHomeContentsQuote.id).toBe(danishHomeContentsQuote.id)
  })

  it('returns the Home Contents quote from Norwegian quote bundle', () => {
    const mainQuote = getMainQuote(noCombo)
    expect(mainQuote.contractType).toContain('HOME_CONTENT')
    expect(
      (mainQuote.quoteDetails as NorwegianHomeContentsDetails).street,
    ).toBeTruthy()
  })

  it('returns the Home Contents quote from Danish Home-Accident-Travel bundle', () => {
    const mainQuote = getMainQuote(dkHomeContentAccidentTravel)
    expect(mainQuote.contractType).toContain('HOME_CONTENT')
    expect(
      (mainQuote.quoteDetails as DanishHomeContentsDetails).street,
    ).toBeTruthy()
  })
})
