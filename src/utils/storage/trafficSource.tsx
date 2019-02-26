import * as React from 'react'
import { MinimalStorage } from './MinimalStorage'

export const getTrafficSource = (trafficSourceStorage: MinimalStorage) => {
  try {
    return (
      JSON.parse(trafficSourceStorage.getItem('utm-params')!).source || null
    )
  } catch (_) {
    return null
  }
}

export interface WithTrafficSourceStorage {
  trafficSourceStorage: MinimalStorage
}

const TrafficSourceContext = React.createContext<
  Partial<WithTrafficSourceStorage>
>({})

export const TrafficSourceProvider = TrafficSourceContext.Provider

export const TrafficSourceConsumer = TrafficSourceContext.Consumer
