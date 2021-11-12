import React from 'react'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'

const ActualDebugger = React.lazy(async () => {
  const module = await import(
    /* webpackChunkName: "offer-debugger" */ './Debugger'
  )
  return { default: module.Debugger }
})

export const OfferDebugger: React.FC = () => {
  if (window.hedvigClientConfig.appEnvironment === 'production') {
    return null
  }

  return (
    <React.Suspense fallback={<LoadingDots />}>
      <ActualDebugger />
    </React.Suspense>
  )
}
