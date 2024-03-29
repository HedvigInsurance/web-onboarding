import { Locale as IsoLocale, Market as ApiMarket } from 'data/graphql'
import { MarketLabel as SharedMarketLabel } from 'shared/clientConfig'
import {
  ssnLengths,
  ssnFormats,
  birthDateFormats,
  phoneNumberFormats,
  phoneNumberPlaceholder,
} from './inputFormats'
import { CallCenterData, callCenters } from './callCenters'
import { AdTractionMarketConfig, adTractionConfig } from './adTractionConfigs'

export const LOCALE_URL_PARAMS = [
  'se',
  'se-en',
  'no',
  'no-en',
  'dk',
  'dk-en',
] as const
export type LocaleUrlParams = typeof LOCALE_URL_PARAMS
export type LocaleLabel = LocaleUrlParams[number]

export type MarketLabel = SharedMarketLabel

export type LocaleData = {
  path: LocaleLabel
  isoLocale: IsoLocale
  marketLabel: MarketLabel
  apiMarket: ApiMarket
  htmlLang: 'en' | 'sv' | 'no' | 'da'
  adtractionScriptSrc?: string
  ssn: {
    length: number
    formatExample: string
    formatRegex: RegExp
  }
  birthDate: {
    formatExample: string
    formatRegex: RegExp
    backendFormatExample: string
  }
  currencyLocale: 'en-SE' | 'sv-SE' | 'en-NO' | 'nb-NO' | 'en-DK' | 'da-DK'
  phoneNumber: {
    formatRegex: RegExp
    placeholder?: string
  }
  callCenter?: CallCenterData
  supportNumber?: CallCenterData
  adTractionConfig: AdTractionMarketConfig
  currencyCode: 'SEK' | 'NOK' | 'DKK'
}

export const locales: Record<LocaleLabel, LocaleData> = {
  se: {
    path: 'se',
    isoLocale: IsoLocale.SvSe,
    marketLabel: 'SE',
    apiMarket: ApiMarket.Sweden,
    htmlLang: 'sv',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    ssn: {
      length: ssnLengths.SE,
      formatExample: 'ÅÅÅÅMMDDXXXX',
      formatRegex: ssnFormats.SE,
    },
    birthDate: {
      formatExample: 'ÅÅÅÅ-MM-DD',
      formatRegex: birthDateFormats.SE,
      backendFormatExample: 'ÅÅÅÅ-MM-DD',
    },
    currencyLocale: 'sv-SE',
    phoneNumber: {
      formatRegex: phoneNumberFormats.SE,
      placeholder: phoneNumberPlaceholder.SE,
    },
    callCenter: callCenters.SE?.callCenter,
    supportNumber: callCenters.SE?.supportNumber,
    adTractionConfig: adTractionConfig.SE,
    currencyCode: 'SEK',
  },
  'se-en': {
    path: 'se-en',
    isoLocale: IsoLocale.EnSe,
    marketLabel: 'SE',
    apiMarket: ApiMarket.Sweden,
    htmlLang: 'en',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    ssn: {
      length: ssnLengths.SE,
      formatExample: 'YYYYMMDDXXXX',
      formatRegex: ssnFormats.SE,
    },
    birthDate: {
      formatExample: 'YYYY-MM-DD',
      formatRegex: birthDateFormats.SE,
      backendFormatExample: 'YYYY-MM-DD',
    },
    currencyLocale: 'en-SE',
    phoneNumber: {
      formatRegex: phoneNumberFormats.SE,
      placeholder: phoneNumberPlaceholder.SE,
    },
    callCenter: callCenters.SE?.callCenter,
    supportNumber: callCenters.SE?.supportNumber,
    adTractionConfig: adTractionConfig.SE,
    currencyCode: 'SEK',
  },
  no: {
    path: 'no',
    isoLocale: IsoLocale.NbNo,
    marketLabel: 'NO',
    apiMarket: ApiMarket.Norway,
    htmlLang: 'no',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    ssn: {
      length: ssnLengths.NO,
      formatExample: 'DDMMÅÅXXXXX',
      formatRegex: ssnFormats.NO,
    },
    birthDate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthDateFormats.NO,
      backendFormatExample: 'ÅÅÅÅ-MM-DD',
    },
    currencyLocale: 'nb-NO',
    phoneNumber: {
      formatRegex: phoneNumberFormats.NO,
      placeholder: phoneNumberPlaceholder.NO,
    },
    callCenter: callCenters.NO?.callCenter,
    supportNumber: callCenters.NO?.supportNumber,
    currencyCode: 'NOK',
    adTractionConfig: adTractionConfig.NO,
  },
  'no-en': {
    path: 'no-en',
    isoLocale: IsoLocale.EnNo,
    marketLabel: 'NO',
    apiMarket: ApiMarket.Norway,
    htmlLang: 'en',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    ssn: {
      length: ssnLengths.NO,
      formatExample: 'DDMMYYXXXXX',
      formatRegex: ssnFormats.NO,
    },
    birthDate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthDateFormats.NO,
      backendFormatExample: 'YYYY-MM-DD',
    },
    currencyLocale: 'en-NO',
    phoneNumber: {
      formatRegex: phoneNumberFormats.NO,
      placeholder: phoneNumberPlaceholder.NO,
    },
    callCenter: callCenters.NO?.callCenter,
    supportNumber: callCenters.NO?.supportNumber,
    currencyCode: 'NOK',
    adTractionConfig: adTractionConfig.NO,
  },
  dk: {
    path: 'dk',
    isoLocale: IsoLocale.DaDk,
    marketLabel: 'DK',
    apiMarket: ApiMarket.Denmark,
    htmlLang: 'da',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    ssn: {
      length: ssnLengths.DK,
      formatExample: 'DDMMÅÅSSSS',
      formatRegex: ssnFormats.DK,
    },
    birthDate: {
      formatExample: 'DD-MM-ÅÅÅÅ',
      formatRegex: birthDateFormats.DK,
      backendFormatExample: 'ÅÅÅÅ-MM-DD',
    },
    currencyLocale: 'da-DK',
    phoneNumber: {
      formatRegex: phoneNumberFormats.DK,
      placeholder: phoneNumberPlaceholder.DK,
    },
    currencyCode: 'DKK',
    adTractionConfig: adTractionConfig.DK,
  },
  'dk-en': {
    path: 'dk-en',
    isoLocale: IsoLocale.EnDk,
    marketLabel: 'DK',
    apiMarket: ApiMarket.Denmark,
    htmlLang: 'en',
    adtractionScriptSrc: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    ssn: {
      length: ssnLengths.DK,
      formatExample: 'DDMMYYSSSS',
      formatRegex: ssnFormats.DK,
    },
    birthDate: {
      formatExample: 'DD-MM-YYYY',
      formatRegex: birthDateFormats.DK,
      backendFormatExample: 'YYYY-MM-DD',
    },
    currencyLocale: 'en-DK',
    phoneNumber: {
      formatRegex: phoneNumberFormats.DK,
      placeholder: phoneNumberPlaceholder.DK,
    },
    currencyCode: 'DKK',
    adTractionConfig: adTractionConfig.DK,
  },
}
