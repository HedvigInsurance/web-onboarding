type Locale = 'se' | 'se-en' | 'no' | 'no-en' | 'dk' | 'dk-en'

type LandingPageData = Record<Locale, MarketData>

type MarketData = {
  cardData: CardData
}

type CardData = []

export const landingPageData: LandingPageData = {
  se: { cardData: [] },
  'se-en': { cardData: [] },
  no: { cardData: [] },
  'no-en': { cardData: [] },
  dk: { cardData: [] },
  'dk-en': { cardData: [] },
}

type AlternateLinkData = {
  hrefLang: string
  locale: Locale
}[]

export const alternateLinkData: AlternateLinkData = [
  { hrefLang: 'sv-se', locale: 'se' },
  { hrefLang: 'en-se', locale: 'se-en' },
  { hrefLang: 'nb-no', locale: 'no' },
  { hrefLang: 'en-no', locale: 'no-en' },
  { hrefLang: 'da-dk', locale: 'dk' },
  { hrefLang: 'en-dk', locale: 'dk-en' },
]
