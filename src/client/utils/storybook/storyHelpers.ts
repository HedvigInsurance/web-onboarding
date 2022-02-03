import { LocaleLabel, LOCALE_URL_PARAMS, locales } from 'l10n/locales'
import { Locale } from 'data/graphql'

export const getTranslationsLocale = (localePath: LocaleLabel): Locale => {
  return locales[localePath].isoLocale
}

export const localeArgTypes = {
  localePath: {
    name: 'locale',
    options: LOCALE_URL_PARAMS,
    control: { type: 'select' },
  },
}
