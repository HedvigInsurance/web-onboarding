import { LocaleLabel } from 'l10n/locales'
import {
  DanishHomeContentsDetails,
  NorwegianHomeContentsDetails,
} from 'data/graphql'
import {
  seApartementBrf,
  seApartmentBrfAccident,
  noCombo,
  noComboYouth,
  noTravel,
  dkHomeContentOwn,
  dkHomeContentAccidentTravel,
} from 'utils/testData/offerDataMock'
import { possibleVariationsHomeAccidentSE } from 'utils/testData/possibleVariationsMock'
import {
  isBundle,
  isNorwegian,
  isSwedish,
  isDanish,
  isYouth,
  getMainQuote,
  getFormattedBirthdate,
  isBundleVariantMatchingQuoteIds,
  getBundleVariantFromQuoteIds,
  getUniqueQuotesFromVariantList,
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

  it('returns the Home quote from Swedish Home-Accident bundle', () => {
    const mainQuote = getMainQuote(seApartmentBrfAccident)
    expect(mainQuote.contractType).toBe('SE_APARTMENT_BRF')
  })
})

describe('getFormattedBirthdate function', () => {
  const swedishLocale: LocaleLabel = 'se'
  const norwegianLocale: LocaleLabel = 'no'
  const danishLocale: LocaleLabel = 'dk'

  describe('when birthDate on quote is the expected format', () => {
    const mockedQuoteBirthdate = '1990-09-19'

    it('returns birthDate unchanged when the described format in locales object is the same as the format we get from back-end', () => {
      const swedishFormattedBirthdate = getFormattedBirthdate({
        birthDate: mockedQuoteBirthdate,
        currentLocale: swedishLocale,
      })

      expect(swedishFormattedBirthdate).toBe(mockedQuoteBirthdate)
    })

    it('returns birthDate in the format that is described in the locales object', () => {
      const reversedFormattedBirthdate = '19-09-1990'

      const norwegianFormattedBirthdate = getFormattedBirthdate({
        birthDate: mockedQuoteBirthdate,
        currentLocale: norwegianLocale,
      })
      const danishFormattedBirthdate = getFormattedBirthdate({
        birthDate: mockedQuoteBirthdate,
        currentLocale: danishLocale,
      })

      expect(norwegianFormattedBirthdate).toBe(reversedFormattedBirthdate)
      expect(danishFormattedBirthdate).toBe(reversedFormattedBirthdate)
    })
  })

  describe('when birthDate on quote is not the expected format', () => {
    it('throws error 💥', () => {
      const mockedIncorrectQuoteBirthdate = '19-09-1990'

      const formattingFunction = () => {
        getFormattedBirthdate({
          birthDate: mockedIncorrectQuoteBirthdate,
          currentLocale: swedishLocale,
        })
      }

      expect(formattingFunction).toThrow()
    })
  })
})

describe('isBundleVariantMatchingQuoteIds function', () => {
  it('should return true if quoteIds are matching variant', () => {
    const isMatching = isBundleVariantMatchingQuoteIds(
      possibleVariationsHomeAccidentSE[0],
      [
        '418cf2f7-2c2b-4e84-9f6c-f4dcf0d51e46',
        'ecaecdd3-5e23-4cea-8f4e-981df29e4f73',
      ],
    )

    expect(isMatching).toBeTruthy()
  })

  it('should return true if quoteIds are matching variant in any order', () => {
    const isMatching = isBundleVariantMatchingQuoteIds(
      possibleVariationsHomeAccidentSE[0],
      [
        'ecaecdd3-5e23-4cea-8f4e-981df29e4f73',
        '418cf2f7-2c2b-4e84-9f6c-f4dcf0d51e46',
      ],
    )

    expect(isMatching).toBeTruthy()
  })

  it('should return false if quoteIds are not matching variant', () => {
    const isMatching = isBundleVariantMatchingQuoteIds(
      possibleVariationsHomeAccidentSE[0],
      ['ecaecdd3-5e23-4cea-8f4e-981df29e4f73'],
    )

    expect(isMatching).toBeFalsy()
  })
})

describe('getBundleVariantFromQuoteIds function', () => {
  it('should return BundleVariant if quoteIds are matching variant', () => {
    const match = getBundleVariantFromQuoteIds(
      [
        '418cf2f7-2c2b-4e84-9f6c-f4dcf0d51e46',
        'ecaecdd3-5e23-4cea-8f4e-981df29e4f73',
      ],
      possibleVariationsHomeAccidentSE,
    )

    expect(match).toBe(possibleVariationsHomeAccidentSE[0])
  })

  it('should return undefined if quoteIds not matching any variant', () => {
    const match = getBundleVariantFromQuoteIds(
      ['ecaecdd3-5e23-4cea-8f4e-981df29e4f73'],
      possibleVariationsHomeAccidentSE,
    )

    expect(match).toBe(undefined)
  })
})

describe('getUniqueQuotesFromVariantList function', () => {
  it('should return Quote list without duplicates', () => {
    const quotes = getUniqueQuotesFromVariantList(
      possibleVariationsHomeAccidentSE,
    )

    expect(quotes.length).toEqual(2)

    expect(quotes.map((x) => x.id)).toEqual([
      '418cf2f7-2c2b-4e84-9f6c-f4dcf0d51e46',
      'ecaecdd3-5e23-4cea-8f4e-981df29e4f73',
    ])
  })
})
