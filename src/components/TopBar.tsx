import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { HedvigLogo } from 'components/icons/HedvigLogo'
import * as React from 'react'
import { CurrentLocale } from './utils/CurrentLocale'

export const TOP_BAR_Z_INDEX = 1009

interface Props {
  transparent?: boolean
  centered?: boolean
}

const Wrapper = styled.div`
  width: 100%;
  top: 0;
  height: 5rem;
  background: ${colorsV3.gray900};
  position: absolute;
  z-index: ${TOP_BAR_Z_INDEX};
  box-shadow: 0 2px 14px rgba(0, 0, 0, 0.08);
  color: ${colorsV3.white};

  @media (max-width: 375px) {
    height: 4rem;
  }
`

const TransparentWrapper = styled(Wrapper)`
  background: transparent;
  box-shadow: none;
`

export const TopBarFiller = styled.div`
  height: 5rem;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 80rem;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto !important;
`

const CenteredContainer = styled(Container)`
  justify-content: center;
`

const LogoLink = styled.a`
  color: inherit;
  display: flex;

  &:hover,
  &:focus {
    color: ${colorsV3.white};
  }
`

export const TopBar: React.FC<Props> = ({
  transparent,
  centered,
  children,
}) => {
  const ActualWrapper = transparent ? TransparentWrapper : Wrapper
  const ActualContainer = centered ? CenteredContainer : Container
  return (
    <ActualWrapper>
      <ActualContainer>
        <CurrentLocale>
          {({ currentLocale }) => (
            <LogoLink href={'/' + currentLocale}>
              <HedvigLogo width={94} />
            </LogoLink>
          )}
        </CurrentLocale>

        {children}
      </ActualContainer>
    </ActualWrapper>
  )
}
