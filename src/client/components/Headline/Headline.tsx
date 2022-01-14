import React from 'react'
import styled, { StyledComponent } from '@emotion/styled'
import { css } from '@emotion/core'
import { fonts, colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const { FAVORIT } = fonts
const { gray900 } = colorsV3

export type Props = {
  variant: 'xl' | 'l' | 'm' | 's' | 'xs' | 'overline'
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
}

type StyleProps = {
  as: Props['headingLevel']
}

const baseStyles = css`
  margin: 0;
  padding: 0;
  font-family: ${FAVORIT};
  font-weight: 400;
`

const HeadlineXL = styled.span`
  ${baseStyles}
  font-size: 3.5rem;
  line-height: 4rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 4.5rem;
    line-height: 4.5rem;
  }
`
const HeadlineL = styled.span`
  ${baseStyles}
  font-size: 2.5rem;
  line-height: 2.75rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3.5rem;
    line-height: 4rem;
  }
`
const HeadlineM = styled.span`
  ${baseStyles}
  font-size: 2rem;
  line-height: 2.5rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
    line-height: 3.5rem;
  }
`
const HeadlineS = styled.span`
  ${baseStyles}
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`
const HeadlineXS = styled.span`
  ${baseStyles}
  font-size: 1.25rem;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: ${gray900};

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`
const HeadlineOverline = styled.span`
  ${baseStyles}
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
  StyledComponent<unknown, StyleProps, any>
>

const headlines: Headlines = {
  xl: HeadlineXL,
  l: HeadlineL,
  m: HeadlineM,
  s: HeadlineS,
  xs: HeadlineXS,
  overline: HeadlineOverline,
}

export const Headline = ({ variant, headingLevel, children }: Props) => {
  const HeadlineComponent = headlines[variant]

  return <HeadlineComponent as={headingLevel}>{children}</HeadlineComponent>
}
