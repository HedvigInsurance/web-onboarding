import React from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { useTextKeys } from 'utils/textKeys'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const Headline = styled.h1`
  width: 100%;
  margin-bottom: 3rem;
  font-size: 2rem;
  line-height: 40px;
  text-align: center;
  color: ${colorsV3.gray100};

  ${LARGE_SCREEN_MEDIA_QUERY} {
    margin: 0;
    display: flex;
    flex-direction: column;
    font-size: 3rem;
    line-height: 56px;
    text-align: left;
  }
`

export const DownloadHeadline: React.FC = () => {
  const textKeys = useTextKeys()

  return (
    <Headline>
      <span>{textKeys.ONBOARDING_DOWNLOAD_HEADLINE_PART_1() + ' '}</span>
      <span>{textKeys.ONBOARDING_DOWNLOAD_HEADLINE_PART_2()}</span>
    </Headline>
  )
}
