import React from 'react'
import styled, { StyledComponent } from '@emotion/styled'
import { css } from '@emotion/core'
import { fonts, colorsV3 } from '@hedviginsurance/brand'
import { MEDIUM_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const { HEDVIG_LETTERS_STANDARD } = fonts
const { gray900, gray100 } = colorsV3

export type Props = {
  variant: 'xl' | 'l' | 'm' | 's' | 'xs' | 'overline'
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  colorVariant: 'dark' | 'light'
  textAlign?: 'center'
  children: React.ReactNode
}

type BaseStyles = Pick<Props, 'colorVariant' | 'textAlign'>

type StyleProps = {
  as: Props['headingLevel']
} & BaseStyles

const getBaseStyles = ({ colorVariant, textAlign }: BaseStyles) => {
  const color = colorVariant === 'light' ? gray100 : gray900

  return css`
    margin: 0;
    padding: 0;
    font-family: ${HEDVIG_LETTERS_STANDARD};
    font-weight: 400;
    color: ${color};
    text-align: ${textAlign};
  `
}

const HeadlineXL = styled.span<StyleProps>`
  ${(props) => getBaseStyles(props)}
  font-size: 3.5rem;
  line-height: 1.2;
  letter-spacing: -0.02em;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 4.5rem;
  }
`
const HeadlineL = styled.span<StyleProps>`
  ${(props) => getBaseStyles(props)}
  font-size: 2.5rem;
  line-height: 1.2;
  letter-spacing: -0.01em;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3.5rem;
    letter-spacing: -0.02em;
  }
`
const HeadlineM = styled.span<StyleProps>`
  ${(props) => getBaseStyles(props)}
  font-size: 2rem;
  line-height: 1.2;
  letter-spacing: -0.01em;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 3rem;
  }
`
const HeadlineS = styled.span<StyleProps>`
  ${(props) => getBaseStyles(props)}
  font-size: 1.5rem;
  line-height: 1.2;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 2rem;
    letter-spacing: -0.01em;
  }
`
const HeadlineXS = styled.span<StyleProps>`
  ${(props) => getBaseStyles(props)}
  font-size: 1.25rem;
  line-height: 1.2;

  ${MEDIUM_SCREEN_MEDIA_QUERY} {
    font-size: 1.5rem;
  }
`
const HeadlineOverline = styled.span<StyleProps>`
  ${(props) => getBaseStyles(props)}
  font-size: 0.875rem;
  line-height: 1.375rem;
  letter-spacing: 0;

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

export const Headline = ({
  variant,
  headingLevel,
  colorVariant,
  textAlign,
  children,
}: Props) => {
  const HeadlineComponent = headlines[variant]

  return (
    <HeadlineComponent
      as={headingLevel}
      colorVariant={colorVariant}
      textAlign={textAlign}
    >
      {children}
    </HeadlineComponent>
  )
}
