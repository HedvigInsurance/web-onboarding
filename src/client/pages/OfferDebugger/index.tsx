import React from 'react'
import { Redirect } from 'react-router'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import { useCurrentLocale } from 'l10n/useCurrentLocale'

const ActualDebugger = React.lazy(async () => {
  const module = await import(
    /* webpackChunkName: "offer-debugger" */ './Debugger'
  )
  return { default: module.Debugger }
})

export const OfferDebugger: React.FC = () => {
  const { path: localePath } = useCurrentLocale()
  if (window.hedvigClientConfig.appEnvironment === 'production') {
    return <Redirect to={`/${localePath}/new-member`} />
  }

  return (
    <React.Suspense fallback={<LoadingDots />}>
      <ActualDebugger />
    </React.Suspense>
  )
}
