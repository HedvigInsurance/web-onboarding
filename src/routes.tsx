import React from 'react'
import { RouteComponentProps } from 'react-router'

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
import { LoginApp } from './client/pages/LoginApp'
import { OfferNew } from './client/pages/OfferNew'
import { SignLoading } from './client/pages/SignLoading'

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
    path: LOCALE_PATH_PATTERN + '/new-member/:name?/:id?',
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
                  name: 'Web Onboarding DK - Contents',
                }
              case 'home-accident':
                return {
                  baseUrl: `/${locale}/new-member/home-accident`,
                  name: 'Web Onboarding DK - Danish Contents-Accident',
                }
            }
            break
          case 'no':
          case 'no-en':
            switch (name) {
              case 'contents':
                return {
                  baseUrl: `/${locale}/new-member/contents`,
                  name: `Web Onboarding NO - ${
                    locale === 'no' ? 'Norwegian Contents' : 'English Contents'
                  }`,
                }
              case 'travel':
                return {
                  baseUrl: `/${locale}/new-member/travel`,
                  name: `Web Onboarding NO - ${
                    locale === 'no' ? 'Norwegian Travel' : 'English Travel'
                  }`,
                }
              case 'combo':
                return {
                  baseUrl: `/${locale}/new-member/combo`,
                  name: `Web Onboarding NO - ${
                    locale === 'no' ? 'Norwegian Combo' : 'English Combo'
                  }`,
                }
            }
            break
          case 'se':
          case 'se-en':
            switch (name) {
              case 'new':
                return {
                  baseUrl: `/${locale}/new-member/new`,
                  name: `Web Onboarding - ${
                    locale === 'se' ? 'Swedish Needer' : 'English Needer'
                  }`,
                }
              case 'switch':
                return {
                  baseUrl: `/${locale}/new-member/switch`,
                  name: `Web Onboarding - ${
                    locale === 'se' ? 'Swedish Switcher' : 'English Switcher'
                  }`,
                }
            }
            break
        }

        return null
      }

      const props = getProps()

      return (
        <EmbarkRoot
          language={match.params.locale}
          name={props?.name}
          baseUrl={props?.baseUrl}
          showLanding={!props}
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
