import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { Market, useMarket } from 'components/utils/CurrentLocale'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'

const LanguagePickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const Divider = styled.div`
  width: 1px;
  margin-left: 2px;
  margin-right: 2px;
  border-left: 1px solid #777;
`
const Language = styled(NavLink)`
  text-decoration: none;
  color: #777;

  &.active {
    color: ${colorsV3.white};
  }

  :hover,
  :focus {
    color: ${colorsV3.white};
  }
`

export const LanguagePickerComponent: React.FC<{ code?: string }> = ({
  code,
}) => {
  const market = useMarket()

  if (market === Market.No) {
    return (
      <LanguagePickerWrapper>
        <Language to={`/no/forever/${code ?? ''}`}>No</Language>
        <Divider />
        <Language to={`/no-en/forever/${code ?? ''}`}>En</Language>
      </LanguagePickerWrapper>
    )
  }
  return (
    <LanguagePickerWrapper>
      <Language to={`/se/forever/${code ?? ''}`}>Sv</Language>
      <Divider />
      <Language to={`/se-en/forever/${code ?? ''}`}>En</Language>
    </LanguagePickerWrapper>
  )
}

const withCodeFromRouteMatch = (
  Component: React.ComponentType<{ code?: string }>,
) => (props: RouteComponentProps<{ code?: string }>) => {
  return <Component code={props.match.params.code} />
}

export const LanguagePicker = withRouter(
  withCodeFromRouteMatch(LanguagePickerComponent),
)
