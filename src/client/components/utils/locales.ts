import { Locale as IsoLocale } from 'data/graphql'

export type LocaleLabel = 'se' | 'se-en' | 'no' | 'no-en' | 'dk' | 'dk-en'

type LocaleData = {
  path: LocaleLabel
  isoLocale: IsoLocale
  marketLabel: 'SE' | 'NO' | 'DK'
  htmlLang: 'en' | 'sv' | 'no' | 'da'
  ssn: Ssn
  birthDate?: BirthDate
}

type Ssn = {
  length: number
  formatExample: string
  formatRegex: RegExp
}

type BirthDate = {
  formatExample: string
  formatRegex: RegExp
}

const ssnFormats = {
  se: /^([1-2][0-9])([0-9]{2})([0,1][0-9])([0-3][0-9])([0-9]{4})$/,
  no: /^([0-3][0-9])([0,1][0-9])([0-9]{2})([0-9]{5})$/,
  dk: /^([0-3][0-9])([0,1][0-9])([0-9]{2})([0-9]{4})$/,
}

const birthDateFormats = {
  default: /^([1-2][0-9][0-9]{2})-([0,1][0-9])-([0-3][0-9])$/,
  no: /^([0-3][0-9])-([0,1][0-9])-([1-2][0-9][0-9]{2})$/,
  dk: /^([0-3][0-9])-([0,1][0-9])-([1-2][0-9][0-9]{2})$/,
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
      formatRegex: ssnFormats.se,
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
      formatRegex: ssnFormats.se,
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
      formatRegex: ssnFormats.no,
    },
    birthDate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthDateFormats.no,
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
      formatRegex: ssnFormats.no,
    },
    birthDate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthDateFormats.no,
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
      formatRegex: ssnFormats.dk,
    },
    birthDate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthDateFormats.dk,
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
      formatRegex: ssnFormats.dk,
    },
    birthDate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthDateFormats.dk,
    },
  },
}
