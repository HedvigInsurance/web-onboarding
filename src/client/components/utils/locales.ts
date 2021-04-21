import { Locale as IsoLocale } from 'data/graphql'

type LocaleLabel = 'se' | 'se-en' | 'no' | 'no-en' | 'dk' | 'dk-en'

type LocaleData = {
  path: LocaleLabel
  isoLocale: IsoLocale
  marketLabel: 'se' | 'no' | 'dk'
  htmlLang: 'en' | 'sv' | 'no' | 'da'
  ssn: Ssn
  birthDate?: BirthDate
}

type Ssn = {
  formatExample: string
  formatRegex: RegExp
}

const ssnFormats = {
  se: /^([1-2][0-9])([0-9]{2})([0,1][0-9])([0-3][0-9])([0-9]{4})$/,
  no: /^([0-3][0-9])([0,1][0-9])([0-9]{2})([0-9]{5})$/,
  dk: /^([0-3][0-9])([0,1][0-9])([0-9]{2})([0-9]{4})$/,
}

type BirthDate = {
  formatExample: string
  formatRegex: RegExp
}

export const locales: Record<LocaleLabel, LocaleData> = {
  se: {
    path: 'se',
    isoLocale: IsoLocale.SvSe,
    marketLabel: 'se',
    htmlLang: 'sv',
    ssn: {
      formatExample: 'ÅÅÅÅMMDDXXXX',
      formatRegex: ssnFormats.se,
    },
  },
  'se-en': {
    path: 'se-en',
    isoLocale: IsoLocale.EnSe,
    marketLabel: 'se',
    htmlLang: 'en',
    ssn: {
      formatExample: 'YYYYMMDDXXXX',
      formatRegex: ssnFormats.se,
    },
  },
  no: {
    path: 'no',
    isoLocale: IsoLocale.NbNo,
    marketLabel: 'se',
    htmlLang: 'no',
    ssn: {
      formatExample: 'DDMMÅÅXXXXX',
      formatRegex: ssnFormats.no,
    },
  },
  'no-en': {
    path: 'no-en',
    isoLocale: IsoLocale.EnNo,
    marketLabel: 'se',
    htmlLang: 'en',
    ssn: {
      formatExample: 'DDMMYYXXXXX',
      formatRegex: ssnFormats.no,
    },
  },
  dk: {
    path: 'dk',
    isoLocale: IsoLocale.DaDk,
    marketLabel: 'se',
    htmlLang: 'da',
    ssn: {
      formatExample: 'DDMMÅÅSSSS',
      formatRegex: ssnFormats.dk,
    },
  },
  'dk-en': {
    path: 'dk-en',
    isoLocale: IsoLocale.EnDk,
    marketLabel: 'se',
    htmlLang: 'en',
    ssn: {
      formatExample: 'DDMMYYSSSS',
      formatRegex: ssnFormats.dk,
    },
  },
}
