import { LocaleLabel } from 'l10n/locales'
import {
  DanishHomeContentsDetails,
  NorwegianHomeContentsDetails,
} from 'data/graphql'
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
  getFormattedBirthdate,
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

describe('getFormattedBirthdate function', () => {
  const swedishLocale: LocaleLabel = 'se'
  const norwegianLocale: LocaleLabel = 'no'
  const danishLocale: LocaleLabel = 'dk'

  describe('when birthdate on quote is the expected format', () => {
    const mockedQuoteBirthdate = '1990-09-19'

    it('returns birthdate unchanged when the described format in locales object is the same as the format we get from back-end', () => {
      const swedishFormattedBirthdate = getFormattedBirthdate({
        birthdate: mockedQuoteBirthdate,
        currentLocale: swedishLocale,
      })

      expect(swedishFormattedBirthdate).toBe(mockedQuoteBirthdate)
    })

    it('returns birthdate in the format that is described in the locales object', () => {
      const reversedFormattedBirthdate = '19-09-1990'

      const norwegianFormattedBirthdate = getFormattedBirthdate({
        birthdate: mockedQuoteBirthdate,
        currentLocale: norwegianLocale,
      })
      const danishFormattedBirthdate = getFormattedBirthdate({
        birthdate: mockedQuoteBirthdate,
        currentLocale: danishLocale,
      })

      expect(norwegianFormattedBirthdate).toBe(reversedFormattedBirthdate)
      expect(danishFormattedBirthdate).toBe(reversedFormattedBirthdate)
    })
  })

  describe('when birthdate on quote is not the expected format', () => {
    it('throws error 💥', () => {
      const mockedIncorrectQuoteBirthdate = '19-09-1990'

      const formattingFunction = () => {
        getFormattedBirthdate({
          birthdate: mockedIncorrectQuoteBirthdate,
          currentLocale: swedishLocale,
        })
      }

      expect(formattingFunction).toThrow()
    })
  })
})
