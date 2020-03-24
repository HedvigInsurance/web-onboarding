import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { Spinner } from 'new-components/utils'
import React from 'react'

const SpinnerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  font-size: 3rem;
  color: ${colorsV3.black};
`

export const SignLoading: React.FC = () => {
  return (
    <SpinnerWrapper>
      <div>
        <Spinner />
      </div>
      {/* TODO have some kind of "move forward" button? */}
    </SpinnerWrapper>
  )
}
