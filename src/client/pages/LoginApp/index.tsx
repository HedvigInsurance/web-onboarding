import React from 'react'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import { LoadingPage } from 'components/LoadingPage'

const LoginAppScreen = React.lazy(() =>
  import(/* webpackChunkName: "debugger" */ './LoginAppScreen').then((m) => ({
    default: m.LoginAppScreen,
  })),
)

export const LoginApp: React.FC = () => {
  const market = useMarket()

  if (market !== Market.No) {
    return null
  }

  return (
    <React.Suspense fallback={<LoadingPage centeredTopBar loading />}>
      <LoginAppScreen />
    </React.Suspense>
  )
}
