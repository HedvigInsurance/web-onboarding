import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMarket } from 'components/utils/CurrentLocale'
import { languagePickerData } from './languagePickerData'

type ColorProps = {
  color: 'black' | 'white'
}

const getLinkStyles = ({ color }: ColorProps) => css`
  text-decoration: none;
  color: ${color === 'black' ? colorsV3.gray900 : colorsV3.gray100};
  font-size: 1rem;
  opacity: 0.5;

  &:hover {
    color: ${color === 'black' ? colorsV3.gray900 : colorsV3.gray100};
    opacity: 0.8;
  }

  &:active {
    color: ${color === 'black' ? colorsV3.gray900 : colorsV3.gray100};
    opacity: 1;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
`

export const ActiveOption = styled.div<ColorProps>`
  color: ${({ color }) =>
    color === 'black' ? colorsV3.gray900 : colorsV3.gray100};
  font-size: 1rem;
  cursor: default;
`

export const LinkOption = styled(Link)<ColorProps>`
  ${(colorProps) => getLinkStyles(colorProps)}
`

export const NativeLinkOption = styled('a')<ColorProps>`
  ${(colorProps) => getLinkStyles(colorProps)}
`

export const Divider = styled.span<ColorProps>`
  height: 100%;
  width: 1px;
  background-color: ${({ color }) =>
    color === 'black' ? colorsV3.gray900 : colorsV3.gray100};

  /* Override global Embark styling */
  && {
    margin: 0 0.5rem;
  }
`

type Props = ColorProps & {
  path?: string
  performClientSideNavigation?: boolean
}

export const LanguagePicker: React.FC<Props> = ({
  path = '/new-member',
  color = 'black',
  performClientSideNavigation = true,
}) => {
  const location = useLocation()
  const market = useMarket()

  return (
    <Wrapper>
      {languagePickerData[market].map(({ linkTo, shortTitle }, index) => (
        <React.Fragment key={linkTo}>
          {location.pathname.startsWith(`/${linkTo}/`) ? (
            <ActiveOption color={color}>{shortTitle}</ActiveOption>
          ) : performClientSideNavigation ? (
            <LinkOption color={color} to={`/${linkTo}${path}`}>
              {shortTitle}
            </LinkOption>
          ) : (
            <NativeLinkOption color={color} href={`/${linkTo}${path}`}>
              {shortTitle}
            </NativeLinkOption>
          )}
          {index < languagePickerData[market].length - 1 && (
            <Divider color={color} />
          )}
        </React.Fragment>
      ))}
    </Wrapper>
  )
}
