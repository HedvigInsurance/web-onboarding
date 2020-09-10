import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand/dist'
import { TopBar } from 'components/TopBar'
import { Spinner } from 'components/utils'
import React from 'react'
import { useVariation, Variation } from 'utils/hooks/useVariation'

const OuterSpinnerWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${colorsV3.gray900};
`

const InnerSpinnerWrapper = styled('div')`
  font-size: 3rem;
  color: ${colorsV3.gray500};
  text-align: center;
`

const ContentWrapper = styled('div')`
  padding-top: 2rem;
  font-size: 1rem;
  color: ${colorsV3.white};
`

export const LoadingPage: React.FC<{ loading?: boolean }> = ({
  children,
  loading,
}) => {
  const variation = useVariation()

  return (
    <>
      {![Variation.IOS, Variation.ANDROID].includes(variation!) && <TopBar />}
      <OuterSpinnerWrapper>
        <InnerSpinnerWrapper>
          {loading && <Spinner />}
          {children && <ContentWrapper>{children}</ContentWrapper>}
        </InnerSpinnerWrapper>
      </OuterSpinnerWrapper>
    </>
  )
}
