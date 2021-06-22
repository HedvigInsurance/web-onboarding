import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router'

import { LOCALE_PATH_PATTERN } from 'shared/locale'
import { ConnectPayment } from './client/pages/ConnectPayment'
import { TrustlyFailPage } from './client/pages/ConnectPayment/components/TrustlyFailPage'
import { TrustlySpinnerPage } from './client/pages/ConnectPayment/components/TrustlySpinnerPage'
import { ConnectPaymentsDirectEntry } from './client/pages/ConnectPayment/ConnectPaymentsDirectEntry'
import { Debugger } from './client/pages/Debugger'
import { Download } from './client/pages/Download'
import { EmbarkRoot } from './client/pages/Embark'
import { Forever } from './client/pages/Forever'
import { FourOhFour } from './client/pages/FourOhFour'
import { Landing } from './client/pages/Landing/Landing'
import { LoginApp } from './client/pages/LoginApp'
import { OfferNew } from './client/pages/OfferNew'
import { SignLoading } from './client/pages/SignLoading'

enum EmbarkStory {
  DenmarkContents = 'Web Onboarding DK - Contents',
  DenmarkContentsWithAddressAutocomplete = 'Web Onboarding DK - Contents With Autocomplete',
  DenmarkContentsAccident = 'Web Onboarding DK - Danish Contents-Accident',

  NorwayContentsNorwegian = 'Web Onboarding NO - Norwegian Contents',
  NorwayContentsEnglish = 'Web Onboarding NO - English Contents',
  NorwayTravelNorwegian = 'Web Onboarding NO - Norwegian Travel',
  NorwayTravelEnglish = 'Web Onboarding NO - English Travel',
  NorwayComboNorwegian = 'Web Onboarding NO - Norwegian Combo',
  NorwayComboEnglish = 'Web Onboarding NO - English Combo',

  SwedenNeederSwedish = 'Web Onboarding - Swedish Needer',
  SwedenNeederEnglish = 'Web Onboarding - English Needer',
  SwedenSwitcherSwedish = 'Web Onboarding - Swedish Switcher',
  SwedenSwitcherEnglish = 'Web Onboarding - English Switcher',
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
    path: LOCALE_PATH_PATTERN + '/forever/:code?',
    titleTextKey: 'FOREVER_LANDINGPAGE_TITLE',
    metaDescriptionTextKey: 'FOREVER_LANDINGPAGE_DESCRIPTION',
    ogImage:
      'https://www.hedvig.com/new-member-assets/social/forever-notifications.jpg',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/download',
    titleTextKey: 'DOWNLOAD_PAGE_TITLE',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment/direct',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment/success',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment/fail',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment/retry',
    titleTextKey: 'ONBOARDING_CONNECT_DD_PAGE_TITLE',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/(offer|sign)',
    titleTextKey: 'OFFER_PAGE_TITLE',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/sign/success',
    titleTextKey: '',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/sign/fail',
    titleTextKey: '',
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/:name?/:id?',
    titleTextKey: 'START_PAGE_TITLE',
  },
  {
    path: LOCALE_PATH_PATTERN + '/login',
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
    path: LOCALE_PATH_PATTERN + '/forever/:code?',
    Component: Forever,
    exact: false,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/download',
    Component: Download,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment',
    Component: ConnectPayment,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment/direct',
    Component: ConnectPaymentsDirectEntry,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment/success',
    Component: TrustlySpinnerPage,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment/fail',
    Component: TrustlyFailPage,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/connect-payment/retry',
    Component: TrustlySpinnerPage,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/(offer|sign)',
    Component: OfferNew,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/sign/success',
    Component: SignLoading,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/sign/fail',
    Component: SignLoading,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/debugger',
    Component: Debugger,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/login',
    Component: LoginApp,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member',
    Component: Landing,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/:name/:id?',
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
                  name: EmbarkStory.DenmarkContentsAccident,
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
              case 'travel':
                return {
                  baseUrl: `/${locale}/new-member/travel`,
                  name:
                    locale === 'no'
                      ? EmbarkStory.NorwayTravelNorwegian
                      : EmbarkStory.NorwayTravelEnglish,
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
                  name:
                    locale === 'se'
                      ? EmbarkStory.SwedenNeederSwedish
                      : EmbarkStory.SwedenNeederEnglish,
                }
              case 'switch':
                return {
                  baseUrl: `/${locale}/new-member/switch`,
                  name:
                    locale === 'se'
                      ? EmbarkStory.SwedenSwitcherSwedish
                      : EmbarkStory.SwedenSwitcherEnglish,
                }
            }
            break
        }

        return null
      }

      const props = getProps()

      if (props === null) {
        return <Redirect to={`/${match.params.locale}/new-member`} />
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
