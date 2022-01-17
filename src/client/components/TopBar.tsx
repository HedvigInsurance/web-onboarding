import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colorsV3 } from '@hedviginsurance/brand'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

const { white, gray100, gray700, gray900 } = colorsV3

export const TOP_BAR_Z_INDEX = 1000
export const TOP_BAR_HEIGHT = '4.5rem'

type Props = {
  isTransparent?: boolean
  textColorVariant?: 'light' | 'dark'
  centered?: boolean
}

const Wrapper = styled.div<Props>`
  width: 100%;
  top: 0;
  height: ${TOP_BAR_HEIGHT};
  background-color: ${({ textColorVariant }) =>
    textColorVariant === 'dark' ? gray100 : gray900};
  position: absolute;
  z-index: ${TOP_BAR_Z_INDEX};
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.08);
  color: ${({ textColorVariant }) =>
    textColorVariant === 'dark' ? colorsV3.gray900 : colorsV3.white};
  ${({ isTransparent }) =>
    isTransparent &&
    css`
      background-color: transparent;
      box-shadow: none;
    `}

  @media (min-width: 420px) {
    height: 5rem;
  }
`

export const TopBarFiller = styled.div`
  height: 4.5rem;

  @media (min-width: 420px) {
    height: 5rem;
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  ${LARGE_SCREEN_MEDIA_QUERY} {
    padding: 0 2rem;
  }
`

const CenteredContainer = styled(Container)`
  justify-content: center;
`

const LogoLink = styled.a<Pick<Props, 'textColorVariant'>>`
  display: block;
  color: inherit;
  /* remove extra space under child SVG: https://stackoverflow.com/a/51161925 */
  font-size: 0;

  &:hover,
  &:focus {
    color: ${({ textColorVariant }) =>
      textColorVariant === 'dark' ? gray700 : white};
  }
`

export const TopBar: React.FC<Props> = ({
  isTransparent,
  textColorVariant = 'light',
  centered,
  children,
}) => {
  const { path } = useCurrentLocale()
  const ActualContainer = centered ? CenteredContainer : Container
  return (
    <Wrapper textColorVariant={textColorVariant} isTransparent={isTransparent}>
      <ActualContainer>
        <LogoLink href={'/' + path} textColorVariant={textColorVariant}>
          <HedvigLogo width={94} />
        </LogoLink>
        {children}
      </ActualContainer>
    </Wrapper>
  )
}
