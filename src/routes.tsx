import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { ConnectPayment } from './pages/ConnectPayment'
import { TrustlyFailPage } from './pages/ConnectPayment/components/TrustlyFailPage'
import { TrustlySpinnerPage } from './pages/ConnectPayment/components/TrustlySpinnerPage'
import { Debugger } from './pages/Debugger'
import { Download } from './pages/Download'
import { EmbarkRoot } from './pages/Embark'
import { FourOhFour } from './pages/FourOhFour'
import { OfferNew } from './pages/OfferNew'
import { Referral } from './pages/Referral'

export const LOCALE_PATH_PATTERN = '/:locale(en|no-en|no)?'
export const serverSideRedirects = [
  { from: '/referrals/terms', to: '/invite/terms' },
  { from: '/new-member/hedvig', to: '/new-member' },
  { from: '/en/new-member/hedvig', to: '/en/new-member' },
]

interface ReactPageRoute {
  path: string
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
    path: LOCALE_PATH_PATTERN + '/debugger',
    Component: Debugger,
    exact: true,
  },
  {
    path: LOCALE_PATH_PATTERN + '/new-member/:name?/:id?',
    render: ({ match }: RouteComponentProps<any>) => {
      const getProps = () => {
        switch (match.params.locale) {
          case 'no':
            switch (match.params.name) {
              case 'home-content':
                return {
                  baseUrl: '/no/new-member/home-content',
                  name: 'Web Onboarding - Norwegian Home Content',
                }
              case 'travel':
                return {
                  baseUrl: '/no/new-member/travel',
                  name: 'Web Onboarding - Norwegian Travel',
                }
            }
            break
          case 'no-en':
            switch (match.params.name) {
              case 'home-content':
                return {
                  baseUrl: '/no-en/new-member/home-content',
                  name: 'Web Onboarding - English Home Content',
                }
              case 'travel':
                return {
                  baseUrl: '/no-en/new-member/travel',
                  name: 'Web Onboarding - English Travel',
                }
            }
            break
          case 'en':
            switch (match.params.name) {
              case 'new':
                return {
                  baseUrl: '/en/new-member/new',
                  name: 'Web Onboarding - English Needer',
                }
              case 'switch':
                return {
                  baseUrl: '/en/new-member/switch',
                  name: 'Web Onboarding - English Switcher',
                }
            }
            break
          default:
            switch (match.params.name) {
              case 'new':
                return {
                  baseUrl: '/new-member/new',
                  name: 'Web Onboarding - Swedish Needer',
                }
              case 'switch':
                return {
                  baseUrl: '/new-member/switch',
                  name: 'Web Onboarding - Swedish Switcher',
                }
              case 'switch-beta':
                return {
                  baseUrl: '/new-member/switch-beta',
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
  { path: '/*', Component: FourOhFour },
]
