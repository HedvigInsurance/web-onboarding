import { Market } from 'components/utils/CurrentLocale'
import { checkFeature } from 'utils/checkFeature'
import { Feature } from 'shared/clientConfig'
import { AlternateLinksData, CanonicalLinksPerLocale } from 'src/routes'

export const LandingPageAlternateLinks: AlternateLinksData = [
  {
    hrefLang: 'sv-se',
    locale: 'se',
    href: 'https://www.hedvig.com/se/new-member',
  },
  {
    hrefLang: 'en-se',
    locale: 'se-en',
    href: 'https://www.hedvig.com/se-en/new-member',
  },
  {
    hrefLang: 'nb-no',
    locale: 'no',
    href: 'https://www.hedvig.com/no/new-member',
  },
  {
    hrefLang: 'en-no',
    locale: 'no-en',
    href: 'https://www.hedvig.com/no-en/new-member',
  },
  {
    hrefLang: 'da-dk',
    locale: 'dk',
    href: 'https://www.hedvig.com/dk/new-member',
  },
  {
    hrefLang: 'en-dk',
    locale: 'dk-en',
    href: 'https://www.hedvig.com/dk-en/new-member',
  },
]

export const LandingPageCanonicalLinks: CanonicalLinksPerLocale = LandingPageAlternateLinks.reduce(
  (accumulated, { locale }) => ({
    ...accumulated,
    [locale]: `https://www.hedvig.com/${locale}/new-member`,
  }),
  {} as CanonicalLinksPerLocale,
)

type ProductData = {
  id: string
  linkSlug: string
  headline: string
  paragraph: string
  badge?: string
  disabled?: boolean
}[]

type ProductsData = Record<Market, ProductData>

export const getProductsData = (): ProductsData => {
  const isQuoteCartEnabled = checkFeature(Feature.QUOTE_CART_API)
  return {
    SE: [
      {
        id: 'swedishNew',
        linkSlug: isQuoteCartEnabled ? '/home-accident-needer' : '/new',
        headline: 'STARTPAGE_UNINSURED_HEADLINE',
        paragraph: 'STARTPAGE_UNINSURED_BODY',
      },
      {
        id: 'swedishSwitch',
        linkSlug: isQuoteCartEnabled ? '/home-switcher' : '/switch',
        headline: 'STARTPAGE_INSURED_HEADLINE',
        paragraph: 'STARTPAGE_INSURED_BODY',
        badge: 'STARTPAGE_SE_INSURED_BADGE',
      },
    ],
    NO: [
      {
        id: 'norwegianCombo',
        linkSlug: isQuoteCartEnabled ? '/home-travel' : '/combo',
        headline: 'STARTPAGE_COMBO_HEADLINE',
        paragraph: 'STARTPAGE_COMBO_BODY',
      },
      {
        id: 'norwegianContents',
        linkSlug: isQuoteCartEnabled ? '/home' : '/contents',
        headline: 'STARTPAGE_CONTENTS_HEADLINE',
        paragraph: 'STARTPAGE_CONTENTS_BODY',
      },
    ],
    DK: [
      {
        id: 'danishContents',
        linkSlug: isQuoteCartEnabled ? '/home-needer' : '/home',
        headline: 'STARTPAGE_DK_CONTENTS_HEADLINE',
        paragraph: 'STARTPAGE_DK_CONTENTS_BODY',
      },
      {
        id: 'danishContentsAccident',
        linkSlug: isQuoteCartEnabled
          ? '/home-accident-needer'
          : '/home-accident',
        headline: 'STARTPAGE_DK_CONTENTS_ACCIDENT_HEADLINE',
        paragraph: 'STARTPAGE_DK_CONTENTS_ACCIDENT_BODY',
        badge: 'STARTPAGE_DK_CONTENTS_ACCIDENT_BADGE',
      },
      {
        id: 'danishContentsAccidentTravel',
        linkSlug: isQuoteCartEnabled
          ? '/home-accident-travel-needer'
          : '/home-accident-travel',
        headline: 'STARTPAGE_DK_CONTENTS_ACCIDENT_TRAVEL_HEADLINE',
        paragraph: 'STARTPAGE_DK_CONTENTS_ACCIDENT_TRAVEL_BODY',
        badge: 'STARTPAGE_DK_CONTENTS_ACCIDENT_TRAVEL_BADGE',
      },
    ],
  }
}
