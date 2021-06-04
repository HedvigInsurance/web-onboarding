import { Locale as IsoLocale } from 'data/graphql'

export type LocaleLabel = 'se' | 'se-en' | 'no' | 'no-en' | 'dk' | 'dk-en'

export type LocaleData = {
  path: LocaleLabel
  isoLocale: IsoLocale
  marketLabel: MarketLabel
  htmlLang: 'en' | 'sv' | 'no' | 'da'
  adtractionScript?: string
  ssn: Ssn
  birthdate: Birthdate
}

type MarketLabel = 'SE' | 'NO' | 'DK'

type Ssn = {
  length: number
  formatExample: string
  formatRegex: RegExp
}

type Birthdate = {
  formatExample: string
  formatRegex: RegExp
  backendFormatExample: string
}

const ssnFormats: Record<MarketLabel, RegExp> = {
  SE: /^((19|20))([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])([0-9]{4})$/,
  NO: /^(0[1-9]|[1-2][0-9]|3[0-1])(0[1-9]|1[0-2])([0-9]{2})([0-9]{5})$/,
  DK: /^(0[1-9]|[1-2][0-9]|3[0-1])(0[1-9]|1[0-2])([0-9]{2})([0-9]{4})$/,
}

const ssnLengths: Record<MarketLabel, number> = {
  SE: 12,
  NO: 11,
  DK: 10,
}

const yearMonthDayFormat = /^(19[0-9]{2}|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
const dayMonthYearFormat = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-(19[0-9]{2}|20[0-9]{2})$/

export const birthdateFormats: Record<MarketLabel | 'default', RegExp> = {
  default: yearMonthDayFormat,
  SE: yearMonthDayFormat,
  NO: dayMonthYearFormat,
  DK: dayMonthYearFormat,
}

export const locales: Record<LocaleLabel, LocaleData> = {
  se: {
    path: 'se',
    isoLocale: IsoLocale.SvSe,
    marketLabel: 'SE',
    htmlLang: 'sv',
    adtractionScript: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    ssn: {
      length: ssnLengths.SE,
      formatExample: 'ÅÅÅÅMMDDXXXX',
      formatRegex: ssnFormats.SE,
    },
    birthdate: {
      formatExample: 'ÅÅÅÅ-MM-DD',
      formatRegex: birthdateFormats.SE,
      backendFormatExample: 'ÅÅÅÅ-MM-DD',
    },
  },
  'se-en': {
    path: 'se-en',
    isoLocale: IsoLocale.EnSe,
    marketLabel: 'SE',
    htmlLang: 'en',
    adtractionScript: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    ssn: {
      length: ssnLengths.SE,
      formatExample: 'YYYYMMDDXXXX',
      formatRegex: ssnFormats.SE,
    },
    birthdate: {
      formatExample: 'YYYY-MM-DD',
      formatRegex: birthdateFormats.SE,
      backendFormatExample: 'YYYY-MM-DD',
    },
  },
  no: {
    path: 'no',
    isoLocale: IsoLocale.NbNo,
    marketLabel: 'NO',
    htmlLang: 'no',
    adtractionScript: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    ssn: {
      length: ssnLengths.NO,
      formatExample: 'DDMMÅÅXXXXX',
      formatRegex: ssnFormats.NO,
    },
    birthdate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthdateFormats.NO,
      backendFormatExample: 'ÅÅÅÅ-MM-DD',
    },
  },
  'no-en': {
    path: 'no-en',
    isoLocale: IsoLocale.EnNo,
    marketLabel: 'NO',
    htmlLang: 'en',
    adtractionScript: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    ssn: {
      length: ssnLengths.NO,
      formatExample: 'DDMMYYXXXXX',
      formatRegex: ssnFormats.NO,
    },
    birthdate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthdateFormats.NO,
      backendFormatExample: 'YYYY-MM-DD',
    },
  },
  dk: {
    path: 'dk',
    isoLocale: IsoLocale.DaDk,
    marketLabel: 'DK',
    htmlLang: 'da',
    adtractionScript: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    ssn: {
      length: ssnLengths.DK,
      formatExample: 'DDMMÅÅSSSS',
      formatRegex: ssnFormats.DK,
    },
    birthdate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthdateFormats.DK,
      backendFormatExample: 'ÅÅÅÅ-MM-DD',
    },
  },
  'dk-en': {
    path: 'dk-en',
    isoLocale: IsoLocale.EnDk,
    marketLabel: 'DK',
    htmlLang: 'en',
    adtractionScript: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    ssn: {
      length: ssnLengths.DK,
      formatExample: 'DDMMYYSSSS',
      formatRegex: ssnFormats.DK,
    },
    birthdate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthdateFormats.DK,
      backendFormatExample: 'YYYY-MM-DD',
    },
  },
}
