import { replacePlaceholders } from 'utils/textKeys'
import { ServerSideRoute } from '../routes'
import enNo from '../translations/en_NO.json'
import enSe from '../translations/en_SE.json'
import enDk from '../translations/en_DK.json'
import nbNo from '../translations/nb_NO.json'
import svSe from '../translations/sv_SE.json'
import daDK from '../translations/da_DK.json'

const translations: Record<string, any> = {
  se: svSe,
  'se-en': enSe,
  no: nbNo,
  'no-en': enNo,
  dk: daDK,
  'dk-en': enDk,
}

export const getPageMeta = (
  locale: string,
  route: ServerSideRoute,
  code: string | null,
) => {
  if (!translations[locale]) {
    return null
  }
  const metaTitle = translations[locale]![route.titleTextKey]
  const ogDescription = getOgDescription(route, code, locale)

  return { metaTitle, ogDescription }
}

const getOgDescription = (
  route: ServerSideRoute,
  code: string | null,
  locale: string,
): string | null => {
  if (!route.metaDescriptionTextKey) {
    return null
  }

  let ogDescription: string

  if (code === null) {
    ogDescription = translations[locale][route.metaDescriptionTextKey]
  } else {
    const result = replacePlaceholders(
      translations[locale][route.metaDescriptionTextKey],
      { CODE: code.toUpperCase() },
    )
    ogDescription = Array.isArray(result) ? result.join('') : result
  }

  return ogDescription
}
