import { SignLoading } from 'pages/SignLoading'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { ConnectPayment } from './pages/ConnectPayment'
import { TrustlyFailPage } from './pages/ConnectPayment/components/TrustlyFailPage'
import { TrustlySpinnerPage } from './pages/ConnectPayment/components/TrustlySpinnerPage'
import { ConnectPaymentsDirectEntry } from './pages/ConnectPayment/ConnectPaymentsDirectEntry'
import { Download } from './pages/Download'
import { EmbarkRoot } from './pages/Embark'
import { FourOhFour } from './pages/FourOhFour'
import { OfferNew } from './pages/OfferNew'
import { Referral } from './pages/Referral'

export const LOCALE_PATH_PATTERN = '/:locale(se-en|se|no-en|no)'
export const serverSideRedirects = [
  { from: '/referrals/terms', to: '/invite/terms' },
  { from: '/new-member/hedvig', to: '/new-member' },
  { from: '/en/new-member/hedvig', to: '/en/new-member' },
]

interface ReactPageRoute {
  path: string
  serverPath?: string | RegExp
  Component?: React.ComponentType<any>
  render?: (props: RouteComponentProps<any>) => React.ReactNode
  exact?: boolean
}

export const reactPageRoutes: ReactPageRoute[] = [
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
    path: LOCALE_PATH_PATTERN + '/new-member/:name?/:id?',
    render: ({ match }: RouteComponentProps<any>) => {
      const getProps = () => {
        switch (match.params.locale) {
          case 'no':
            switch (match.params.name) {
              case 'contents':
                return {
                  baseUrl: '/no/new-member/contents',
                  name: 'Web Onboarding NO - Norwegian Contents',
                }
              case 'travel':
                return {
                  baseUrl: '/no/new-member/travel',
                  name: 'Web Onboarding NO - Norwegian Travel',
                }
              case 'combo':
                return {
                  baseUrl: '/no/new-member/combo',
                  name: 'Web Onboarding NO - Norwegian Combo',
                }
            }
            break
          case 'no-en':
            switch (match.params.name) {
              case 'contents':
                return {
                  baseUrl: '/no-en/new-member/contents',
                  name: 'Web Onboarding NO - English Contents',
                }
              case 'travel':
                return {
                  baseUrl: '/no-en/new-member/travel',
                  name: 'Web Onboarding NO - English Travel',
                }
              case 'combo':
                return {
                  baseUrl: '/no-en/new-member/combo',
                  name: 'Web Onboarding NO - English Combo',
                }
            }
            break
          case 'se-en':
            switch (match.params.name) {
              case 'new':
                return {
                  baseUrl: '/se-en/new-member/new',
                  name: 'Web Onboarding - English Needer',
                }
              case 'switch':
                return {
                  baseUrl: '/se-en/new-member/switch',
                  name: 'Web Onboarding - English Switcher',
                }
            }
            break
          default:
            switch (match.params.name) {
              case 'new':
                return {
                  baseUrl: '/se/new-member/new',
                  name: 'Web Onboarding - Swedish Needer',
                }
              case 'switch':
                return {
                  baseUrl: '/se/new-member/switch',
                  name: 'Web Onboarding - Swedish Switcher',
                }
              case 'switch-beta':
                return {
                  baseUrl: '/se/new-member/switch-beta',
                  name: 'Switcher Onboarding Playground',
                }
            }
        }

        return null
      }

      const props = getProps()

      return (
        <EmbarkRoot
          language={match.params.locale}
          name={(props && props.name) || undefined}
          baseUrl={(props && props.baseUrl) || undefined}
          showLanding={!props}
        />
      )
    },
    exact: false,
  },
  {
    path: LOCALE_PATH_PATTERN + '/referrals/:code',
    Component: Referral,
    exact: true,
  },
  {
    path: '/*',
    serverPath: /^(?!\/?new-member-assets).*$/,
    Component: FourOhFour,
  },
]
