import React, { createContext, ReactNode, useContext } from 'react'
import { useTrackOfferEvent } from 'src/client/utils/tracking/trackOfferEvent'

type TrackingHooks = {
  trackOfferEvent: ReturnType<typeof useTrackOfferEvent>
}

const initialValues: TrackingHooks = {
  trackOfferEvent: (_eventParams) => {
    // noop
  },
}

const TrackingContext = createContext<TrackingHooks>(initialValues)

export const useTrackingContext = () => useContext(TrackingContext)

export const TrackingContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const trackOfferEvent = useTrackOfferEvent()

  return (
    <TrackingContext.Provider value={{ trackOfferEvent }}>
      {children}
    </TrackingContext.Provider>
  )
}
