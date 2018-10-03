import { Container, ContainerProps } from 'constate'
import * as React from 'react'
import { StorageState } from '../App'

export const StorageContainer: React.SFC<ContainerProps<StorageState>> = (
  props,
) => <Container<StorageState> context="storage" {...props} />
