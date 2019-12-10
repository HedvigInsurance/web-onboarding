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
import { NewMemberLanding } from './pages/NewMemberLanding'
import { Offering } from './pages/Offer'
import { OfferNew } from './pages/OfferNew'
import { Referral } from './pages/Referral'
import { Sign } from './pages/Sign'

export const LANGUAGE_PATH_PATTERN = '/:language(en)?'
export const serverSideRedirects = [
  { from: '/referrals/terms', to: '/invite/terms' },
]
export const reactPageRoutes = [
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member',
    Component: NewMemberLanding,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/hedvig',
    Component: Chat,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/offer',
    Component: Offering,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/offer-new',
    Component: OfferNew,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/download',
    Component: Download,
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/sign',
    Component: Sign,
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
    path: '/beta/new-member/:name?/:id?',
    render: ({ match }: RouteComponentProps<any>) => {
      const getProps = () => {
        switch (match.params.name) {
          case 'new':
            return {
              baseUrl: '/beta/new-member/new',
              name: 'Web Onboarding - Swedish Needer',
            }
          case 'switch':
            return {
              baseUrl: '/beta/new-member/switch',
              name: 'Web Onboarding - Swedish Switcher',
            }
        }

        return null
      }

      const props = getProps()

      return (
        <EmbarkRoot
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
