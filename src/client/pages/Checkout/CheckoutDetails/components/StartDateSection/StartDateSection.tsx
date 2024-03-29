import React from 'react'
import styled from '@emotion/styled'
import { useTextKeys } from 'utils/textKeys'
import { SubSection, Card } from '../SubSection'
import {
  StartDate,
  StartDateProps,
} from '../../../../Offer/Introduction/Sidebar/StartDate'
export const StartDateSection = (props: StartDateProps) => {
  const textKeys = useTextKeys()
  const Wrapper = styled.div`
    position: relative;
    ${Card} {
      padding: 1rem;
    }
  `

  return (
    <Wrapper>
      <SubSection headlineText={textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}>
        <StartDate {...props} />
      </SubSection>
    </Wrapper>
  )
}
