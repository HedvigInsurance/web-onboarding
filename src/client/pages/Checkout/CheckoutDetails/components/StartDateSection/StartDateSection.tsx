import React from 'react'
import styled from '@emotion/styled'
import { useTextKeys } from 'utils/textKeys'
import { useQuoteCartIdFromUrl } from 'utils/hooks/useQuoteCartIdFromUrl'
import { SubSection, Card } from '../SubSection'
import { StartDate } from '../../../../Offer/Introduction/Sidebar/StartDate'
export const StartDateSection = () => {
  const textKeys = useTextKeys()
  const { quoteCartId } = useQuoteCartIdFromUrl()

  const Wrapper = styled.div`
    position: relative;
    ${Card} {
      padding: 1rem;
    }
  `

  return (
    <Wrapper>
      <SubSection headlineText={textKeys.SIDEBAR_STARTDATE_CELL_LABEL()}>
        <StartDate quoteCartId={quoteCartId} modal size="sm" />
      </SubSection>
    </Wrapper>
  )
}
