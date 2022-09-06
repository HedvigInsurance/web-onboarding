import { useCurrentLocale } from 'l10n/useCurrentLocale'

export const useGetImageUrl = () => {
  const basePath = '/new-member-assets/download'

  const { htmlLang } = useCurrentLocale()

  switch (htmlLang) {
    case 'sv':
      return `${basePath}/app_still-life_daybed_se.jpg`
    case 'no':
      return `${basePath}/app_still-life_daybed_no.jpg`
    case 'da':
      return `${basePath}/app_still-life_daybed_dk.jpg`

    default:
      return `${basePath}/app_still-life_daybed_en.jpg`
  }
}
