import React from 'react'
import { Container, ContainerProps, EffectMap, EffectProps } from 'constate'
import { IsomorphicSessionStorage, Session } from '../../shared/sessionStorage'

export interface StorageState {
  session: IsomorphicSessionStorage<Session>
}

export interface WithStorageProps {
  storage: StorageState
}

export interface StorageEffects {
  setToken: (token?: string) => void
}

export type Storage = StorageState & StorageEffects

type UnknownObject = Record<string, unknown>

export const StorageContainer: React.FunctionComponent<ContainerProps<
  StorageState,
  UnknownObject,
  UnknownObject,
  EffectMap<StorageState, StorageEffects>
>> = (props) => (
  <Container<
    StorageState,
    UnknownObject,
    UnknownObject,
    EffectMap<StorageState, StorageEffects>
  >
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

export const StorageContext = React.createContext<StorageState>(null as any)

export const useStorage = () => React.useContext(StorageContext)
