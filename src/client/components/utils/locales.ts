import { Locale as IsoLocale } from 'data/graphql'

export type LocaleLabel = 'se' | 'se-en' | 'no' | 'no-en' | 'dk' | 'dk-en'

type LocaleData = {
  path: LocaleLabel
  isoLocale: IsoLocale
  marketLabel: MarketLabel
  htmlLang: 'en' | 'sv' | 'no' | 'da'
  ssn: Ssn
  birthDate: BirthDate
}

type MarketLabel = 'SE' | 'NO' | 'DK'

type Ssn = {
  length: number
  formatExample: string
  formatRegex: RegExp
}

type BirthDate = {
  formatExample: string
  formatRegex: RegExp
}

const ssnFormats: Record<MarketLabel, RegExp> = {
  SE: /^([1-2][0-9])([0-9]{2})([0,1][0-9])([0-3][0-9])([0-9]{4})$/,
  NO: /^([0-3][0-9])([0,1][0-9])([0-9]{2})([0-9]{5})$/,
  DK: /^([0-3][0-9])([0,1][0-9])([0-9]{2})([0-9]{4})$/,
}

export const birthDateFormats: Record<MarketLabel | 'default', RegExp> = {
  default: /^([1-2][0-9][0-9]{2})-([0,1][0-9])-([0-3][0-9])$/,
  SE: /^([1-2][0-9][0-9]{2})-([0,1][0-9])-([0-3][0-9])$/,
  NO: /^([0-3][0-9])-([0,1][0-9])-([1-2][0-9][0-9]{2})$/,
  DK: /^([0-3][0-9])-([0,1][0-9])-([1-2][0-9][0-9]{2})$/,
}

export const locales: Record<LocaleLabel, LocaleData> = {
  se: {
    path: 'se',
    isoLocale: IsoLocale.SvSe,
    marketLabel: 'SE',
    htmlLang: 'sv',
    ssn: {
      length: 12,
      formatExample: 'ÅÅÅÅMMDDXXXX',
      formatRegex: ssnFormats.SE,
    },
    birthDate: {
      formatExample: 'ÅÅÅÅ-MM-DD',
      formatRegex: birthDateFormats.SE,
    },
  },
  'se-en': {
    path: 'se-en',
    isoLocale: IsoLocale.EnSe,
    marketLabel: 'SE',
    htmlLang: 'en',
    ssn: {
      length: 12,
      formatExample: 'YYYYMMDDXXXX',
      formatRegex: ssnFormats.SE,
    },
    birthDate: {
      formatExample: 'YYYY-MM-DD',
      formatRegex: birthDateFormats.SE,
    },
  },
  no: {
    path: 'no',
    isoLocale: IsoLocale.NbNo,
    marketLabel: 'NO',
    htmlLang: 'no',
    ssn: {
      length: 11,
      formatExample: 'DDMMÅÅXXXXX',
      formatRegex: ssnFormats.NO,
    },
    birthDate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthDateFormats.NO,
    },
  },
  'no-en': {
    path: 'no-en',
    isoLocale: IsoLocale.EnNo,
    marketLabel: 'NO',
    htmlLang: 'en',
    ssn: {
      length: 11,
      formatExample: 'DDMMYYXXXXX',
      formatRegex: ssnFormats.NO,
    },
    birthDate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthDateFormats.NO,
    },
  },
  dk: {
    path: 'dk',
    isoLocale: IsoLocale.DaDk,
    marketLabel: 'DK',
    htmlLang: 'da',
    ssn: {
      length: 10,
      formatExample: 'DDMMÅÅSSSS',
      formatRegex: ssnFormats.DK,
    },
    birthDate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthDateFormats.DK,
    },
  },
  'dk-en': {
    path: 'dk-en',
    isoLocale: IsoLocale.EnDk,
    marketLabel: 'DK',
    htmlLang: 'en',
    ssn: {
      length: 10,
      formatExample: 'DDMMYYSSSS',
      formatRegex: ssnFormats.DK,
    },
    birthDate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthDateFormats.DK,
    },
  },
}
