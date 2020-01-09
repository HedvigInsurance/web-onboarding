import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Chat } from './pages/Chat'
import { ConnectPayment } from './pages/ConnectPayment'
import { TrustlyFailPage } from './pages/ConnectPayment/components/TrustlyFailPage'
import { TrustlySpinnerPage } from './pages/ConnectPayment/components/TrustlySpinnerPage'
import { LazyDontPanic } from './pages/DontPanic'
import { Download } from './pages/Download'
import { EmbarkRoot } from './pages/Embark'
import { FourOhFour } from './pages/FourOhFour'
import { OfferNew } from './pages/OfferNew'
import { Referral } from './pages/Referral'

export const LANGUAGE_PATH_PATTERN = '/:language(en)?'
export const serverSideRedirects = [
  { from: '/referrals/terms', to: '/invite/terms' },
]
export const reactPageRoutes = [
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/hedvig',
    Component: Chat,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/download',
    Component: Download,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/connect-payment',
    Component: ConnectPayment,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/connect-payment/success',
    Component: TrustlySpinnerPage,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/connect-payment/fail',
    Component: TrustlyFailPage,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/connect-payment/retry',
    Component: TrustlySpinnerPage,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/(offer|sign)',
    Component: OfferNew,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/:name?/:id?',
    render: ({ match }: RouteComponentProps<any>) => {
      const getProps = () => {
        if (match.params.language === 'en') {
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
        } else {
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
          language={match.params.language}
          name={(props && props.name) || undefined}
          baseUrl={(props && props.baseUrl) || undefined}
          showLanding={!props}
        />
      )
    },
    exact: false,
  },
  { path: '/dont-panic/hedvig', Component: LazyDontPanic, exact: true },
  {
    path: LANGUAGE_PATH_PATTERN + '/referrals/:code',
    Component: Referral,
    exact: true,
  },
  { path: '/*', Component: FourOhFour },
]
