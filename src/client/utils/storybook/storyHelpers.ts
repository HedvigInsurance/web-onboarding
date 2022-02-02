import { TranslationsLocale } from 'utils/textKeys'
import { LocaleLabel, LOCALE_URL_PARAMS } from 'l10n/locales'

export const getTranslationsLocale = (
  localePath: LocaleLabel,
): TranslationsLocale => {
  switch (localePath) {
    case 'se':
      return 'sv_SE'
    case 'se-en':
      return 'en_SE'
    case 'no':
      return 'nb_NO'
    case 'no-en':
      return 'en_NO'
    case 'dk':
      return 'da_DK'
    case 'dk-en':
      return 'en_DK'
    default:
      return 'en'
  }
}

export const localeArgTypes = {
  localePath: {
    name: 'locale',
    options: LOCALE_URL_PARAMS,
    control: { type: 'select' },
  },
}
