import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router'

import { localePathPattern } from './client/l10n/localePathPattern'
import { ConnectPayment } from './client/pages/ConnectPayment'
import { TrustlyFailPage } from './client/pages/ConnectPayment/components/TrustlyFailPage'
import { TrustlySpinnerPage } from './client/pages/ConnectPayment/components/TrustlySpinnerPage'
import { ConnectPaymentsDirectEntry } from './client/pages/ConnectPayment/ConnectPaymentsDirectEntry'
import { Debugger } from './client/pages/Debugger'
import { OfferDebugger } from './client/pages/OfferDebugger'
import { Download } from './client/pages/Download'
import { EmbarkRoot } from './client/pages/Embark'
import { Forever } from './client/pages/Forever'
import { FourOhFour } from './client/pages/FourOhFour'
import { Landing } from './client/pages/Landing/Landing'
import { LoginApp } from './client/pages/LoginApp'
import { OfferNew } from './client/pages/OfferNew'
import { SignLoading } from './client/pages/SignLoading'
import { OfferPage } from './client/pages/Offer'

enum EmbarkStory {
  DenmarkContentsWithAddressAutocomplete = 'Web Onboarding DK - Contents With Autocomplete',
  DenmarkContentsAccidentWithAddressAutocomplete = 'Web Onboarding DK - Danish Contents-Accident With Autocomplete',
  DenmarkContentsAccidentTravelWithAddressAutocomplete = 'Web Onboarding DK - Danish Contents-Accident-Travel With Autocomplete',

  NorwayContentsNorwegian = 'Web Onboarding NO - Norwegian Contents',
  NorwayContentsEnglish = 'Web Onboarding NO - English Contents',
  NorwayTravelNorwegian = 'Web Onboarding NO - Norwegian Travel',
  NorwayTravelEnglish = 'Web Onboarding NO - English Travel',
  NorwayComboNorwegian = 'Web Onboarding NO - Norwegian Combo',
  NorwayComboEnglish = 'Web Onboarding NO - English Combo',

  SwedenNeeder = 'Web Onboarding SE - Needer',
  SwedenSwitcher = 'Web Onboarding SE - Switcher',
  SwedenSwitcherWithoutAccident = 'Web Onboarding SE - Switcher Without Accident',
  SwedenQuoteCartNeeder = 'Web Onboarding SE - Quote Cart Needer',
}

export type ServerSideRoute = {
  titleTextKey: string
  metaDescriptionTextKey?: string
  ogImage?: string
  status?: number
}

type ClientSideRoute = {
  Component?: React.ComponentType<any>
  render?: (props: RouteComponentProps<any>) => React.ReactNode
  exact: boolean
  isHiddenInProd?: boolean
}

export type Route = {
  path: string | RegExp
  serverRouteData?: ServerSideRoute
  clientRouteData?: ClientSideRoute
}

export const landingRoute = '/new-member'
const onboardingLocaleBaseRoute = `${localePathPattern}${landingRoute}`

export const routes: Route[] = [
  {
    path: onboardingLocaleBaseRoute,
    clientRouteData: {
      Component: Landing,
      exact: true,
    },
  },
  {
    path: localePathPattern + '/forever/:code?',
    serverRouteData: {
      titleTextKey: 'FOREVER_LANDINGPAGE_TITLE',
      metaDescriptionTextKey: 'FOREVER_LANDINGPAGE_DESCRIPTION',
      ogImage:
        'https://www.hedvig.com/new-member-assets/social/forever-notifications.jpg',
    },
    clientRouteData: {
      Component: Forever,
      exact: false,
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
    path: `${onboardingLocaleBaseRoute}/connect-payment/direct`,
    serverRouteData: {
      titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
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
    path: `${onboardingLocaleBaseRoute}/(offer|sign)`,
    serverRouteData: {
      titleTextKey: 'OFFER_PAGE_TITLE',
    },
    clientRouteData: {
      Component: OfferNew,
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
    path: `${onboardingLocaleBaseRoute}/checkout/details`,
    serverRouteData: {
      titleTextKey: 'CHECKOUT_DETAILS_PAGE_TITLE',
    },
    clientRouteData: {
      exact: true,
      isHiddenInProd: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/checkout/payment`,
    serverRouteData: {
      titleTextKey: 'CHECKOUT_PAYMENT_PAGE_TITLE',
    },
    clientRouteData: {
      exact: true,
      isHiddenInProd: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/debugger`,
    clientRouteData: {
      Component: Debugger,
      exact: true,
      isHiddenInProd: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/offer-debugger`,
    clientRouteData: {
      Component: OfferDebugger,
      exact: true,
    },
  },
  {
    path: `${onboardingLocaleBaseRoute}/:name/:id?`,
    serverRouteData: {
      titleTextKey: 'START_PAGE_TITLE',
    },
    clientRouteData: {
      render: ({ match }: RouteComponentProps<any>) => {
        const getProps = () => {
          const { locale, name } = match.params
          switch (locale) {
            case 'dk':
            case 'dk-en':
              switch (name) {
                case 'home':
                  return {
                    baseUrl: `/${locale}/new-member/home`,
                    name: EmbarkStory.DenmarkContentsWithAddressAutocomplete,
                  }
                case 'home-accident':
                  return {
                    baseUrl: `/${locale}/new-member/home-accident`,
                    name:
                      EmbarkStory.DenmarkContentsAccidentWithAddressAutocomplete,
                  }
                case 'home-accident-travel':
                  return {
                    baseUrl: `/${locale}/new-member/home-accident-travel`,
                    name:
                      EmbarkStory.DenmarkContentsAccidentTravelWithAddressAutocomplete,
                  }
              }
              break
            case 'no':
            case 'no-en':
              switch (name) {
                case 'contents':
                  return {
                    baseUrl: `/${locale}/new-member/contents`,
                    name:
                      locale === 'no'
                        ? EmbarkStory.NorwayContentsNorwegian
                        : EmbarkStory.NorwayContentsEnglish,
                  }
                case 'combo':
                  return {
                    baseUrl: `/${locale}/new-member/combo`,
                    name:
                      locale === 'no'
                        ? EmbarkStory.NorwayComboNorwegian
                        : EmbarkStory.NorwayComboEnglish,
                  }
              }
              break
            case 'se':
            case 'se-en':
              switch (name) {
                case 'new':
                  return {
                    baseUrl: `/${locale}/new-member/new`,
                    name: EmbarkStory.SwedenNeeder,
                  }
                case 'switch':
                  return {
                    baseUrl: `/${locale}/new-member/switch`,
                    name: EmbarkStory.SwedenSwitcherWithoutAccident,
                  }
                case 'home-accident-switcher':
                  if (
                    window.hedvigClientConfig.appEnvironment === 'production'
                  ) {
                    return {
                      redirect: `/${locale}/new-member`,
                    }
                  }
                  return {
                    baseUrl: `/${locale}/new-member/home-accident-switcher`,
                    name: EmbarkStory.SwedenSwitcher,
                  }
                case 'home-accident-needer':
                  if (
                    window.hedvigClientConfig.appEnvironment === 'production'
                  ) {
                    return {
                      redirect: `/${locale}/new-member`,
                    }
                  }
                  return {
                    baseUrl: `/${locale}/new-member/home-accident-needer`,
                    name: EmbarkStory.SwedenQuoteCartNeeder,
                  }
              }
              break
          }

          return {
            redirect: `/${locale}/new-member`,
          }
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
          />
        )
      },
      exact: false,
    },
  },
  {
    /* 
    This route is only used as a web view in the apps
    for markets using Simple Sign, since we're missing some certificates
    */
    path: localePathPattern + '/login',
    serverRouteData: {
      titleTextKey: 'Text',
    },
    clientRouteData: {
      Component: LoginApp,
      exact: true,
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
