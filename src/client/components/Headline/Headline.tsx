import React from 'react'
import styled, { StyledComponent } from '@emotion/styled'
import { fonts, colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const { FAVORIT } = fonts
const { gray900 } = colorsV3

export type Props = {
  variant: 'xl' | 'l' | 'm' | 's' | 'xs' | 'overline'
  children: React.ReactNode
}

const HeadlineXL = styled.h2`
  margin: 0;
  font-family: ${FAVORIT};
  font-weight: 400;
  font-size: 3.5rem;
  line-height: 4rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 4.5rem;
    line-height: 4.5rem;
  }
`
const HeadlineL = styled.h3`
  margin: 0;
  font-family: ${FAVORIT};
  font-weight: 400;
  font-size: 2.5rem;
  line-height: 2.75rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3.5rem;
    line-height: 4rem;
  }
`
const HeadlineM = styled.h4`
  margin: 0;
  font-family: ${FAVORIT};
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.5rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
    line-height: 3.5rem;
  }
`
const HeadlineS = styled.h5`
  margin: 0;
  font-family: ${FAVORIT};
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`
const HeadlineXS = styled.h6`
  margin: 0;
  font-family: ${FAVORIT};
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`
const HeadlineOverline = styled.h6`
  margin: 0;
  font-family: ${FAVORIT};
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.375rem;
  letter-spacing: 0;
  color: ${gray900};
  text-transform: uppercase;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`

type Headlines = Record<
  Props['variant'],
  StyledComponent<unknown, unknown, any>
>

const headlines: Headlines = {
  xl: HeadlineXL,
  l: HeadlineL,
  m: HeadlineM,
  s: HeadlineS,
  xs: HeadlineXS,
  overline: HeadlineOverline,
}

export const Headline = ({ variant, children }: Props) => {
  const HeadlineComponent = headlines[variant]

  return <HeadlineComponent>{children}</HeadlineComponent>
}
