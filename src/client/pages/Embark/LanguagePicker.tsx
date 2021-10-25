import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMarket } from 'components/utils/CurrentLocale'
import { languagePickerData } from './languagePickerData'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
`

const ActiveOption = styled.div`
  color: ${colorsV3.gray100};
  font-size: 1rem;
  cursor: default;
`

const LinkOption = styled(Link)`
  text-decoration: none;
  color: ${colorsV3.gray100};
  font-size: 1rem;
  opacity: 0.5;

  &:hover {
    color: ${colorsV3.gray100};
    opacity: 0.8;
  }

  &:active {
    color: ${colorsV3.gray100};
    opacity: 1;
  }
`

const Divider = styled.span`
  height: 100%;
  width: 1px;
  background-color: ${colorsV3.gray100};

  /* Override global Embark styling */
  && {
    margin: 0 0.5rem;
  }
`

interface Props {
  path?: string
}

export const LanguagePicker: React.FC<Props> = ({ path = '/new-member' }) => {
  const location = useLocation()
  const market = useMarket()

  return (
    <Wrapper>
      {languagePickerData[market].map(({ linkTo, shortTitle }, index) => (
        <React.Fragment key={linkTo}>
          {location.pathname.startsWith(`/${linkTo}/`) ? (
            <ActiveOption>{shortTitle}</ActiveOption>
          ) : (
            <LinkOption to={`/${linkTo}${path}`}>{shortTitle}</LinkOption>
          )}
          {index < languagePickerData[market].length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Wrapper>
  )
}
