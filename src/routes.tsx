import * as React from 'react'
import { Chat } from './pages/Chat'
import { EmbarkRoot } from './pages/Embark'
import { ConnectPayment } from './pages/ConnectPayment'
import { TrustlyFailPage } from './pages/ConnectPayment/components/TrustlyFailPage'
import { TrustlySpinnerPage } from './pages/ConnectPayment/components/TrustlySpinnerPage'
import { LazyDontPanic } from './pages/DontPanic'
import { Download } from './pages/Download'
import { FourOhFour } from './pages/FourOhFour'
import { NewMemberLanding } from './pages/NewMemberLanding'
import { Offering } from './pages/Offer'
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
    path: '/new',
    Component: () => {
      return <EmbarkRoot name="Web Onboarding - Swedish Needer" />
    },
    exact: true,
  },
  {
    path: '/switch',
    Component: () => {
      return <EmbarkRoot name="Web Onboarding - Swedish Switcher" />
    },
    exact: true,
  },
  {
    path: LANGUAGE_PATH_PATTERN + '/new-member/offer',
    Component: Offering,
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
  { path: '/dont-panic/hedvig', Component: LazyDontPanic, exact: true },
  {
    path: LANGUAGE_PATH_PATTERN + '/referrals/:code',
    Component: Referral,
    exact: true,
  },
  { path: '/*', Component: FourOhFour },
]
