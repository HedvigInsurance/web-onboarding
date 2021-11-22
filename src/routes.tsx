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
}

export interface ServerSideRoute {
  path: string | RegExp
  titleTextKey: string
  metaDescriptionTextKey?: string
  ogImage?: string
  status?: number
}

export const serverSideRoutes: ServerSideRoute[] = [
  {
    path: localePathPattern + '/forever/:code?',
    titleTextKey: 'FOREVER_LANDINGPAGE_TITLE',
    metaDescriptionTextKey: 'FOREVER_LANDINGPAGE_DESCRIPTION',
    ogImage:
      'https://www.hedvig.com/new-member-assets/social/forever-notifications.jpg',
  },
  {
    path: localePathPattern + '/new-member/download',
    titleTextKey: 'DOWNLOAD_PAGE_TITLE',
  },
  {
    path: localePathPattern + '/new-member/connect-payment',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: localePathPattern + '/new-member/connect-payment/direct',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: localePathPattern + '/new-member/connect-payment/success',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: localePathPattern + '/new-member/connect-payment/fail',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: localePathPattern + '/new-member/connect-payment/retry',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: localePathPattern + '/new-member/(offer|sign)',
    titleTextKey: 'OFFER_PAGE_TITLE',
  },
  {
    path: localePathPattern + '/new-member/sign/success',
    titleTextKey: '',
  },
  {
    path: localePathPattern + '/new-member/sign/fail',
    titleTextKey: '',
  },
  {
    path: localePathPattern + '/new-member/:name?/:id?',
    titleTextKey: 'START_PAGE_TITLE',
  },
  {
    path: localePathPattern + '/login',
    titleTextKey: 'Text',
  },
  {
    path: /^(?!\/?new-member-assets).*$/,
    titleTextKey: 'FOUR_OH_FOUR_PAGE_TITLE',
    status: 404,
  },
]

interface ReactPageRoute {
  path: string
  Component?: React.ComponentType<any>
  render?: (props: RouteComponentProps<any>) => React.ReactNode
  exact?: boolean
}

export const reactPageRoutes: ReactPageRoute[] = [
  {
    path: localePathPattern + '/forever/:code?',
    Component: Forever,
    exact: false,
  },
  {
    path: localePathPattern + '/new-member/download',
    Component: Download,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/connect-payment',
    Component: ConnectPayment,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/connect-payment/direct',
    Component: ConnectPaymentsDirectEntry,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/connect-payment/success',
    Component: TrustlySpinnerPage,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/connect-payment/fail',
    Component: TrustlyFailPage,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/connect-payment/retry',
    Component: TrustlySpinnerPage,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/(offer|sign)',
    Component: OfferNew,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/sign/success',
    Component: SignLoading,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/sign/fail',
    Component: SignLoading,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/debugger',
    Component: Debugger,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/offer-debugger',
    Component: OfferDebugger,
    exact: true,
  },
  {
    path: localePathPattern + '/login',
    Component: LoginApp,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member',
    Component: Landing,
    exact: true,
  },
  {
    path: localePathPattern + '/new-member/:name/:id?',
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
                if (window.hedvigClientConfig.appEnvironment === 'production') {
                  return {
                    redirect: `/${locale}/new-member`,
                  }
                }
                return {
                  baseUrl: `/${locale}/new-member/home-accident-switcher`,
                  name: EmbarkStory.SwedenSwitcher,
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
  {
    path: '/*',
    Component: FourOhFour,
  },
]
