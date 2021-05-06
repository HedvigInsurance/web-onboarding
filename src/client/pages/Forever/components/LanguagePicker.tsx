import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { useMarket } from 'components/utils/CurrentLocale'
import { languagePickerData } from '../../Embark/languagePickerData'

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

export const LanguagePicker: React.FC = () => {
  const market = useMarket()
  const urlParams: { locale: string; code?: string } = useParams()
  const code = urlParams.code ? urlParams.code : ''

  return (
    <LanguagePickerWrapper>
      {languagePickerData[market].map((item, index) => (
        <React.Fragment key={item.linkTo}>
          {index !== 0 && <Divider />}
          <Language to={`/${item.linkTo}/forever/${code}`}>
            {item.shortTitle}
          </Language>
        </React.Fragment>
      ))}
    </LanguagePickerWrapper>
  )
}
