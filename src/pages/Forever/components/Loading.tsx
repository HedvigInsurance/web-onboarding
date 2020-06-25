import styled from '@emotion/styled'
import { LoadingDots } from 'components/LoadingDots/LoadingDots'
import React from 'react'

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

export const Loading: React.FC = () => (
  <LoadingWrapper>
    <LoadingDots />
  </LoadingWrapper>
)
