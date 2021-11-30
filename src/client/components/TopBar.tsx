import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { useCurrentLocale } from 'l10n/useCurrentLocale'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import { LARGE_SCREEN_MEDIA_QUERY } from 'utils/mediaQueries'

export const TOP_BAR_Z_INDEX = 1000
export const TOP_BAR_HEIGHT = '4.5rem'

interface Props {
  isTransparent?: boolean
  centered?: boolean
}

const Wrapper = styled.div`
  width: 100%;
  top: 0;
  height: ${TOP_BAR_HEIGHT};
  background: ${colorsV3.gray900};
  position: absolute;
  z-index: ${TOP_BAR_Z_INDEX};
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.08);
  color: ${colorsV3.white};

  @media (min-width: 420px) {
    height: 5rem;
  }
`

const TransparentWrapper = styled(Wrapper)`
  background: transparent;
  box-shadow: none;
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

const LogoLink = styled.a`
  display: block;
  color: inherit;
  /* remove extra space under child SVG: https://stackoverflow.com/a/51161925 */
  font-size: 0;

  &:hover,
  &:focus {
    color: ${colorsV3.white};
  }
`

export const TopBar: React.FC<Props> = ({
  isTransparent,
  centered,
  children,
}) => {
  const { path } = useCurrentLocale()
  const ActualWrapper = isTransparent ? TransparentWrapper : Wrapper
  const ActualContainer = centered ? CenteredContainer : Container
  return (
    <ActualWrapper>
      <ActualContainer>
        <LogoLink href={'/' + path}>
          <HedvigLogo width={94} />
        </LogoLink>
        {children}
      </ActualContainer>
    </ActualWrapper>
  )
}
