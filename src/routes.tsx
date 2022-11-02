import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router'

import { datadogRum } from '@datadog/browser-rum'
import { localePathPattern } from './client/l10n/localePathPattern'
import { ConnectPayment } from './client/pages/ConnectPayment'
import { TrustlyFailPage } from './client/pages/ConnectPayment/components/TrustlyFailPage'
import { TrustlySpinnerPage } from './client/pages/ConnectPayment/components/TrustlySpinnerPage'
import { ConnectPaymentsDirectEntry } from './client/pages/ConnectPayment/ConnectPaymentsDirectEntry'
import { Download } from './client/pages/Download'
import { EmbarkRoot } from './client/pages/Embark'
import { FourOhFour } from './client/pages/FourOhFour'
import { Landing } from './client/pages/Landing/Landing'
import { SignLoading } from './client/pages/SignLoading'
import { OfferPage } from './client/pages/Offer'
import { CheckoutDetails } from './client/pages/Checkout/CheckoutDetails/CheckoutDetails'
import { Checkout } from './client/pages/Checkout/CheckoutPayment'
import { Confirmation } from './client/pages/Confirmation'
import { LocalePath } from './client/components/utils/CurrentLocale'
import {
  LandingPageAlternateLinks,
  LandingPageCanonicalLinks,
} from './client/pages/Landing/landingPageData'
import { InitiateCarCancellationPage } from './client/pages/IntiateCarCancellation'
import { PaymentPage } from './client/pages/Payment/Payment'

enum EmbarkStory {
  DenmarkContentsWithAddressAutocomplete = 'Web Onboarding DK - Contents With Autocomplete',
  DenmarkContentsAccidentWithAddressAutocomplete = 'Web Onboarding DK - Danish Contents-Accident With Autocomplete',
  DenmarkContentsAccidentTravelWithAddressAutocomplete = 'Web Onboarding DK - Danish Contents-Accident-Travel With Autocomplete',
  DenmarkContentsQuoteCart = 'Web Onboarding DK - Quote Cart Home Content',
  DenmarkContentsAccidentQuoteCart = 'Web Onboarding DK - Quote Cart Home Content Accident',
  DenmarkContentsAccidentTravelQuoteCart = 'Web Onboarding DK - Quote Cart Home Content Accident Travel',

  NorwayContentsNorwegian = 'Web Onboarding NO - Norwegian Contents',
  NorwayContentsEnglish = 'Web Onboarding NO - English Contents',
  NorwayTravelNorwegian = 'Web Onboarding NO - Norwegian Travel',
  NorwayTravelEnglish = 'Web Onboarding NO - English Travel',
  NorwayComboNorwegian = 'Web Onboarding NO - Norwegian Combo',
  NorwayComboEnglish = 'Web Onboarding NO - English Combo',
  NorwayHomeContentEnglishQuoteCart = 'Web Onboarding NO - English Contents Quote Cart',
  NorwayHomeContentNorwegianQuoteCart = 'Web Onboarding NO - Norwegian Contents Quote Cart',
  NorwayComboEnglishQuoteCart = 'Web Onboarding NO - English Combo Quote Cart',
  NorwayComboNorwegianQuoteCart = 'Web Onboarding NO - Norwegian Combo Quote Cart',

  SwedenQuoteCartNeeder = 'Web Onboarding SE - Quote Cart Needer',
  SwedenQuoteCartSwitcher = 'Web Onboarding SE - Quote Cart Switcher',
  SwedenQuoteCartSwitcherV2 = 'Web Onboarding SE - Quote Cart Switcher-v2',
  SwedenCarV2 = 'SE-onboarding-car-v2',
  SwedenCarV3 = 'SE-onboarding-car-v3',
}

export type CanonicalLinksPerLocale = Record<LocalePath, string>

export type AlternateLinksData = {
  hrefLang: string
  locale: LocalePath
  href: string
}[]

export type ServerSideRoute = {
  titleTextKey: string
  metaDescriptionTextKey?: string
  ogImage?: string
  status?: number
  alternateLinks?: AlternateLinksData
  canonicalLinks?: CanonicalLinksPerLocale
}

type ClientSideRoute = {
  Component?: React.ComponentType<any>
  render?: (props: RouteComponentProps<any>) => React.ReactNode
  exact: boolean
}

export type Route = {
  path: string | RegExp
  serverRouteData?: ServerSideRoute
  clientRouteData?: ClientSideRoute
  isHiddenInProd?: boolean
}

type EmbarkRouteProps = {
  redirect?: string
  name?: string
  quoteCart?: boolean
  baseUrl?: string
}

// TODO: Replace all '/new-member' strings throughout the codebase with this variable
export const landingRoute = '/new-member'
const onboardingLocaleBaseRoute = `${localePathPattern}${landingRoute}`

export const routes: Route[] = [
  {
    // TODO: this should be removed after Car has fully launched, since all /new-member routes
    // will be pointing towards Racoon
    path: onboardingLocaleBaseRoute,
    serverRouteData: {
      titleTextKey: 'STARTPAGE_PAGE_TITLE',
      alternateLinks: LandingPageAlternateLinks,
      canonicalLinks: LandingPageCanonicalLinks,
    },
    clientRouteData: {
      Component: Landing,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/home-insurance`,
    serverRouteData: {
      titleTextKey: 'STARTPAGE_PAGE_TITLE',
      alternateLinks: LandingPageAlternateLinks,
      canonicalLinks: LandingPageCanonicalLinks,
    },
    clientRouteData: {
      Component: Landing,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/download`,
    serverRouteData: {
      titleTextKey: 'DOWNLOAD_PAGE_TITLE',
    },
    clientRouteData: {
      Component: Download,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/initiate-car-cancellation`,
    serverRouteData: {
      titleTextKey: 'INITIATE_CAR_CANCELLATION_PAGE_TITLE',
    },
    clientRouteData: {
      Component: InitiateCarCancellationPage,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/confirmation`,
    serverRouteData: {
      titleTextKey: 'CONFIRMATION_PAGE_TITLE',
    },
    clientRouteData: {
      Component: Confirmation,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/connect-payment`,
    serverRouteData: {
      titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
    },
    clientRouteData: {
      Component: ConnectPayment,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/payment`,
    serverRouteData: {
      titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
    },
    clientRouteData: {
      Component: PaymentPage,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/payment/:status`,
    serverRouteData: {
      titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
    },
    clientRouteData: {
      Component: TrustlySpinnerPage,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/connect-payment/direct`,
    serverRouteData: {
      titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
      ogImage:
        'https://www.hedvig.com/new-member-assets/social/hedvig-hemforsakring-2.jpg',
    },
    clientRouteData: {
      Component: ConnectPaymentsDirectEntry,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/connect-payment/success`,
    serverRouteData: {
      titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
    },
    clientRouteData: {
      Component: TrustlySpinnerPage,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/connect-payment/fail`,
    serverRouteData: {
      titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
    },
    clientRouteData: {
      Component: TrustlyFailPage,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/connect-payment/retry`,
    serverRouteData: {
      titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
    },
    clientRouteData: {
      Component: TrustlySpinnerPage,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/sign/success`,
    serverRouteData: {
      titleTextKey: '',
    },
    clientRouteData: {
      Component: SignLoading,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/sign/fail`,
    serverRouteData: {
      titleTextKey: '',
    },
    clientRouteData: {
      Component: SignLoading,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/(offer|sign)/:id`,
    serverRouteData: {
      titleTextKey: 'OFFER_PAGE_TITLE',
    },
    clientRouteData: {
      Component: OfferPage,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/checkout/details/:id`,
    isHiddenInProd: false,
    serverRouteData: {
      titleTextKey: 'CHECKOUT_DETAILS_PAGE_TITLE',
    },
    clientRouteData: {
      Component: CheckoutDetails,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/checkout/payment/:id/:payment?`,
    isHiddenInProd: false,
    serverRouteData: {
      titleTextKey: 'CHECKOUT_PAYMENT_PAGE_TITLE',
    },
    clientRouteData: {
      Component: Checkout,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/:name/:id?`,
    serverRouteData: {
      titleTextKey: 'START_PAGE_TITLE',
      ogImage:
        'https://www.hedvig.com/new-member-assets/social/hedvig-hemforsakring-2.jpg',
    },
    clientRouteData: {
      render: ({ match }: RouteComponentProps<any>) => {
        const getProps = (): EmbarkRouteProps => {
          const { locale, name } = match.params
          const baseUrl = `/${locale}/new-member/${name}`
          const landingPageRedirect = {
            redirect: `/${locale}/new-member`,
          }

          switch (locale) {
            case 'dk':
            case 'dk-en':
              switch (name) {
                case 'home':
                  return {
                    baseUrl,
                    name: EmbarkStory.DenmarkContentsWithAddressAutocomplete,
                  }
                case 'home-accident':
                  return {
                    baseUrl,
                    name:
                      EmbarkStory.DenmarkContentsAccidentWithAddressAutocomplete,
                  }
                case 'home-accident-travel':
                  return {
                    baseUrl,
                    name:
                      EmbarkStory.DenmarkContentsAccidentTravelWithAddressAutocomplete,
                  }
                case 'home-needer':
                  return {
                    baseUrl,
                    name: EmbarkStory.DenmarkContentsQuoteCart,
                    quoteCart: true,
                  }
                case 'home-accident-needer':
                  return {
                    baseUrl,
                    name: EmbarkStory.DenmarkContentsAccidentQuoteCart,
                    quoteCart: true,
                  }
                case 'home-accident-travel-needer':
                  return {
                    baseUrl,
                    name: EmbarkStory.DenmarkContentsAccidentTravelQuoteCart,
                    quoteCart: true,
                  }
                case 'onboarding':
                  return {
                    baseUrl,
                    name: window.hedvigClientConfig.embarkStory.DK,
                    quoteCart: true,
                  }
              }
              break
            case 'no':
            case 'no-en':
              switch (name) {
                case 'contents':
                  return {
                    baseUrl,
                    name:
                      locale === 'no'
                        ? EmbarkStory.NorwayContentsNorwegian
                        : EmbarkStory.NorwayContentsEnglish,
                  }
                case 'combo':
                  return {
                    baseUrl,
                    name:
                      locale === 'no'
                        ? EmbarkStory.NorwayComboNorwegian
                        : EmbarkStory.NorwayComboEnglish,
                  }
                case 'home':
                  return {
                    baseUrl,
                    name:
                      locale === 'no'
                        ? EmbarkStory.NorwayHomeContentNorwegianQuoteCart
                        : EmbarkStory.NorwayHomeContentEnglishQuoteCart,
                    quoteCart: true,
                  }
                case 'home-travel':
                  return {
                    baseUrl,
                    name:
                      locale === 'no'
                        ? EmbarkStory.NorwayComboNorwegianQuoteCart
                        : EmbarkStory.NorwayComboEnglishQuoteCart,
                    quoteCart: true,
                  }
                case 'onboarding':
                  return {
                    baseUrl,
                    name: window.hedvigClientConfig.embarkStory.NO,
                    quoteCart: true,
                  }
              }
              break
            case 'se':
            case 'se-en':
              switch (name) {
                case 'home-accident-needer':
                  return {
                    baseUrl,
                    name: EmbarkStory.SwedenQuoteCartNeeder,
                    quoteCart: true,
                  }
                case 'home-switcher':
                  return {
                    baseUrl,
                    name: EmbarkStory.SwedenQuoteCartSwitcherV2,
                    quoteCart: true,
                  }
                case 'car':
                  return {
                    baseUrl,
                    name: EmbarkStory.SwedenCarV2,
                    quoteCart: true,
                  }
                case 'car-v3':
                  return {
                    baseUrl,
                    name: EmbarkStory.SwedenCarV3,
                    quoteCart: true,
                  }
              }
              break
          }

          datadogRum.addError('Unsupported Embark flow', {
            url: match.url,
          })
          return landingPageRedirect
        }

        const props = getProps()

        if (props.redirect) {
          return <Redirect to={props.redirect} />
        }

        return (
          <EmbarkRoot
            language={match.params.locale}
            name={props.name}
            baseUrl={props.baseUrl}
            isUsingQuoteCart={props.quoteCart === true}
          />
        )
      },
      exact: false,
    },
  },
  {
    path: /^(?!\/?new-member-assets).*$/,
    serverRouteData: {
      titleTextKey: 'FOUR_OH_FOUR_PAGE_TITLE',
      status: 404,
    },
  },
  {
    path: '/*',
    clientRouteData: {
      Component: FourOhFour,
      exact: false,
    },
  },
]
