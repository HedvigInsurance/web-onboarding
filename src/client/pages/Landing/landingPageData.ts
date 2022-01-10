import { LocalePath, Market } from 'components/utils/CurrentLocale'
import { checkFeature } from 'utils/checkFeature'
import { Feature } from 'shared/clientConfig'

type AlternateLinksData = {
  hrefLang: string
  locale: LocalePath
}[]

export const alternateLinksData: AlternateLinksData = [
  { hrefLang: 'sv-se', locale: 'se' },
  { hrefLang: 'en-se', locale: 'se-en' },
  { hrefLang: 'nb-no', locale: 'no' },
  { hrefLang: 'en-no', locale: 'no-en' },
  { hrefLang: 'da-dk', locale: 'dk' },
  { hrefLang: 'en-dk', locale: 'dk-en' },
]

type ProductData = {
  id: string
  linkSlug: string
  headline: string
  paragraph: string
  badge?: string
  disabled?: boolean
}[]

type ProductsData = Record<Market, ProductData>

export const getProductsData = (): ProductsData => ({
  SE: [
    {
      id: 'swedishNew',
      linkSlug: checkFeature(Feature.QUOTE_CART_API)
        ? '/home-accident-needer'
        : '/new',
      headline: 'STARTPAGE_UNINSURED_HEADLINE',
      paragraph: 'STARTPAGE_UNINSURED_BODY',
    },
    {
      id: 'swedishSwitch',
      linkSlug: '/switch',
      headline: 'STARTPAGE_INSURED_HEADLINE',
      paragraph: 'STARTPAGE_INSURED_BODY',
      badge: 'STARTPAGE_SE_INSURED_BADGE',
    },
  ],
  NO: [
    {
      id: 'norwegianCombo',
      linkSlug: '/combo',
      headline: 'STARTPAGE_COMBO_HEADLINE',
      paragraph: 'STARTPAGE_COMBO_BODY',
      badge: 'STARTPAGE_COMBO_DISCOUNT_TEXT',
    },
    {
      id: 'norwegianContents',
      linkSlug: '/contents',
      headline: 'STARTPAGE_CONTENTS_HEADLINE',
      paragraph: 'STARTPAGE_CONTENTS_BODY',
    },
  ],
  DK: [
    {
      id: 'danishContents',
      linkSlug: '/home',
      headline: 'STARTPAGE_DK_CONTENTS_HEADLINE',
      paragraph: 'STARTPAGE_DK_CONTENTS_BODY',
    },
    {
      id: 'danishContentsAccident',
      linkSlug: '/home-accident',
      headline: 'STARTPAGE_DK_CONTENTS_ACCIDENT_HEADLINE',
      paragraph: 'STARTPAGE_DK_CONTENTS_ACCIDENT_BODY',
      badge: 'STARTPAGE_DK_CONTENTS_ACCIDENT_BADGE',
    },
    {
      id: 'danishContentsAccidentTravel',
      linkSlug: '/home-accident-travel',
      headline: 'STARTPAGE_DK_CONTENTS_ACCIDENT_TRAVEL_HEADLINE',
      paragraph: 'STARTPAGE_DK_CONTENTS_ACCIDENT_TRAVEL_BODY',
      badge: 'STARTPAGE_DK_CONTENTS_ACCIDENT_TRAVEL_BADGE',
    },
  ],
})
