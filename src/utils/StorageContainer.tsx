import { Container, ContainerProps, EffectMap, EffectProps } from 'constate'
import * as React from 'react'
import { IsomorphicSessionStorage, Session } from './sessionStorage'

export interface StorageState {
  session: IsomorphicSessionStorage<Session>
}

export interface WithStorageProps {
  storage: StorageState
}

export interface StorageEffects {
  setToken: (token: string) => void
}

export const StorageContainer: React.SFC<
  ContainerProps<StorageState, {}, {}, EffectMap<StorageState, StorageEffects>>
> = (props) => (
  <Container<StorageState, {}, {}, EffectMap<StorageState, StorageEffects>>
    context="storage"
    {...props}
    effects={
      {
        setToken: (token: string) => ({
          state,
          setState,
        }: EffectProps<StorageState>) => {
          state.session.setSession({
            ...((state.session.getSession() || {}) as any),
            token,
          })
          setState({ session: state.session })
        },
      } as any
    }
  />
)
